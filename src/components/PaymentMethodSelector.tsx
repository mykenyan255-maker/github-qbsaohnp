import { CreditCard, Smartphone } from 'lucide-react';

export type PaymentMethod = 'card' | 'mpesa' | 'paypal';

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
}

export default function PaymentMethodSelector({
  selectedMethod,
  onSelect,
}: PaymentMethodSelectorProps) {
  const methods = [
    {
      id: 'paypal' as PaymentMethod,
      name: 'PayPal',
      description: 'Direct card payment',
      icon: CreditCard,
    },
    {
      id: 'card' as PaymentMethod,
      name: 'Credit Card',
      description: 'Visa, Mastercard, Amex',
      icon: CreditCard,
    },
    {
      id: 'mpesa' as PaymentMethod,
      name: 'M-Pesa',
      description: 'Pay via M-Pesa',
      icon: Smartphone,
    },
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
        Payment Method
      </h3>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-3">
        {methods.map((method) => {
          const Icon = method.icon;
          return (
            <button
              key={method.id}
              onClick={() => onSelect(method.id)}
              className={`p-4 border-2 rounded-lg transition-all text-left ${
                selectedMethod === method.id
                  ? 'border-black bg-black/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Icon className="w-6 h-6 mb-2" />
              <p className="text-sm font-semibold text-gray-900">{method.name}</p>
              <p className="text-xs text-gray-600 mt-1">{method.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
