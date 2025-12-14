import { useEffect, useRef } from 'react';
import { AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useCart } from '../contexts/CartContext';

interface PayPalButtonProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

declare global {
  namespace paypal {
    function Buttons(options: {
      createOrder: (data: unknown, actions: { order: { create: (details: unknown) => Promise<string> } }) => Promise<string>;
      onApprove: (data: { orderID: string }, actions: { order: { capture: () => Promise<{ id: string; payer: { name: { given_name: string }; email: string } } & unknown> } }) => Promise<void>;
      onError: (error: unknown) => void;
    }): { render: (selector: string) => Promise<void> };
  }
}

export default function PayPalButton({ onSuccess, onError }: PayPalButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { items, totalAmount, clearCart } = useCart();
  const renderedRef = useRef(false);

  useEffect(() => {
    if (items.length === 0 || renderedRef.current) return;

    const renderPayPalButton = async () => {
      if (!window.paypal || !containerRef.current) {
        setTimeout(renderPayPalButton, 100);
        return;
      }

      try {
        renderedRef.current = true;

        const buttons = window.paypal.Buttons({
          createOrder: async (data, actions) => {
            const orderID = await actions.order.create({
              intent: 'CAPTURE',
              purchase_units: [
                {
                  amount: {
                    currency_code: 'KES',
                    value: totalAmount.toFixed(2),
                  },
                  description: `Order for ${items.length} product(s)`,
                },
              ],
            });
            return orderID;
          },

          onApprove: async (data, actions) => {
            try {
              const orderDetails = await actions.order.capture();

              const sessionId = localStorage.getItem('cart_session_id') || '';
              const paymentData = {
                paypal_order_id: orderDetails.id,
                customer_name: orderDetails.payer?.name?.given_name || '',
                customer_email: orderDetails.payer?.email || '',
                total_amount: totalAmount,
                original_amount: items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
                discount_amount: items.reduce((sum, item) => sum + item.product.price * item.quantity, 0) - totalAmount,
                items_count: items.length,
                session_id: sessionId,
                status: 'completed',
                payment_method: 'paypal',
              };

              const { error } = await supabase.from('payments').insert([paymentData]);

              if (error) {
                throw error;
              }

              await clearCart();

              if (onSuccess) {
                onSuccess();
              }
            } catch (error) {
              const errorMessage = error instanceof Error ? error.message : 'Payment processing failed';
              if (onError) {
                onError(errorMessage);
              }
            }
          },

          onError: (error) => {
            const errorMessage = error instanceof Error ? error.message : 'Payment failed. Please try again.';
            if (onError) {
              onError(errorMessage);
            }
          },
        });

        await buttons.render(containerRef.current);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to load PayPal button';
        if (onError) {
          onError(errorMessage);
        }
      }
    };

    renderPayPalButton();
  }, [items, totalAmount, clearCart, onSuccess, onError]);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-2">
        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-700">
          You will be charged <span className="font-semibold">KSh {totalAmount.toLocaleString()}</span> with PayPal
        </p>
      </div>
      <div ref={containerRef} />
    </div>
  );
}
