import { useState } from 'react';
import { X, ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { generateWhatsAppLink } from '../lib/whatsapp';
import PaymentMethodSelector, { PaymentMethod } from './PaymentMethodSelector';
import PayPalButton from './PayPalButton';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, loading, updateQuantity, removeFromCart, totalItems, totalAmount } = useCart();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('paypal');
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = () => {
    if (items.length === 0 || selectedPaymentMethod === 'paypal') return;

    let totalOriginal = 0;
    const orderDetails = items
      .map(item => {
        const itemOriginal = item.product.price * item.quantity;
        const itemDiscounted = Math.floor(itemOriginal * 0.5);
        totalOriginal += itemOriginal;
        let line = `${item.product.name} (Qty: ${item.quantity})`;
        if (item.size) line += ` - Size: ${item.size}`;
        if (item.color) line += ` - Color: ${item.color}`;
        line += `\n  Original: KSh ${itemOriginal.toLocaleString()} | 50% OFF: KSh ${itemDiscounted.toLocaleString()}`;
        return line;
      })
      .join('\n\n');

    const totalSavings = totalOriginal - totalAmount;
    const paymentInfo = selectedPaymentMethod === 'mpesa'
      ? '\nPayment Method: M-Pesa'
      : '\nPayment Method: Credit Card';

    const message = `Hi Eddjos Collections! I'd like to place an order:\n\n${orderDetails}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━\nOriginal Total: KSh ${totalOriginal.toLocaleString()}\n50% Discount: -KSh ${totalSavings.toLocaleString()}\nFinal Total: KSh ${totalAmount.toLocaleString()}${paymentInfo}\n━━━━━━━━━━━━━━━━━━━━━━━━━\n\nPlease confirm availability and delivery details.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}?text=${encodedMessage}`;

    window.open(whatsappLink, '_blank');
  };

  const handlePayPalSuccess = () => {
    setPaymentSuccess(true);
    setTimeout(() => {
      onClose();
      setPaymentSuccess(false);
      setSelectedPaymentMethod('paypal');
    }, 2000);
  };

  const handlePayPalError = (error: string) => {
    setPaymentError(error);
    setTimeout(() => setPaymentError(null), 5000);
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      ></div>

      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6" />
            <h2 className="text-2xl font-bold">Cart ({totalItems})</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        ) : items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
            <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
            <p className="text-gray-600 mb-6">Start adding some products to your cart</p>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-100">
                  <div className="w-20 h-20 rounded bg-gray-100 flex-shrink-0 overflow-hidden">
                    {item.product.image_url ? (
                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl">
                        👕
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 line-clamp-2 mb-1">
                      {item.product.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      {item.size && <span>Size: {item.size}</span>}
                      {item.size && item.color && <span>•</span>}
                      {item.color && <span>Color: {item.color}</span>}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="mt-2 space-y-0.5">
                      <p className="text-xs text-gray-500 line-through">
                        KSh {(item.product.price * item.quantity).toLocaleString()}
                      </p>
                      <p className="text-sm font-semibold text-green-600">
                        KSh {Math.floor((item.product.price * item.quantity) * 0.5).toLocaleString()}
                        <span className="text-xs text-green-500 ml-1">50% OFF</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 p-6 space-y-6">
              <PaymentMethodSelector
                selectedMethod={selectedPaymentMethod}
                onSelect={setSelectedPaymentMethod}
              />

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between text-gray-600">
                  <span>Original Total:</span>
                  <span className="line-through">KSh {items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-green-600 font-semibold">
                  <span>50% Discount:</span>
                  <span>-KSh {(items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0) - totalAmount).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-lg font-bold border-t pt-2">
                  <span>Final Total:</span>
                  <span className="text-green-600">KSh {totalAmount.toLocaleString()}</span>
                </div>
              </div>

              {paymentError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                  {paymentError}
                </div>
              )}

              {paymentSuccess && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700 font-medium">
                  Payment successful! Closing cart...
                </div>
              )}

              {selectedPaymentMethod === 'paypal' ? (
                <>
                  <PayPalButton
                    onSuccess={handlePayPalSuccess}
                    onError={handlePayPalError}
                  />
                  <button
                    onClick={onClose}
                    className="w-full py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleCheckout}
                    className="w-full py-4 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Proceed to Checkout
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
