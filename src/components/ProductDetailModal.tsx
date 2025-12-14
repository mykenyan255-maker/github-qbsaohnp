import { useState } from 'react';
import { X, ShoppingBag, MessageCircle } from 'lucide-react';
import { Product } from '../lib/supabase';
import { generateWhatsAppLink } from '../lib/whatsapp';
import { useCart } from '../contexts/CartContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'M'
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors && product.colors.length > 0 ? product.colors[0] : (product.color || 'Default')
  );
  const { addToCart } = useCart();

  const displayPrice = product.price ? Math.floor(product.price as any) : 0;
  const discountedPrice = Math.floor(displayPrice * 0.5);

  const handleAddToCart = async () => {
    try {
      await addToCart(product, 1, selectedSize, selectedColor);
      alert('Added to cart!');
      onClose();
    } catch (error) {
      alert('Failed to add to cart');
    }
  };

  const handleWhatsApp = () => {
    const whatsappLink = generateWhatsAppLink(
      product.name,
      selectedSize,
      selectedColor,
      displayPrice
    );
    window.open(whatsappLink, '_blank');
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      ></div>

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 flex items-center justify-between p-6 border-b border-gray-200 bg-white">
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Images */}
              <div>
                <div className="mb-6">
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                    <img
                      src={product.image_url || 'https://i.postimg.cc/FRkVjK26/316c4caea73bb89b04e80d7d08f6fa57.jpg'}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[1, 2, 3, 4].map((idx) => (
                    <div
                      key={idx}
                      className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
                    >
                      <div className="text-center">
                        <div className="text-gray-400 text-2xl mb-1">+</div>
                        <p className="text-xs text-gray-500">Add Photo</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Category</h3>
                  <p className="text-lg capitalize">{product.category}</p>
                </div>

                {product.color && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Color</h3>
                    <p className="text-lg">{product.color}</p>
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Pricing</h3>
                  <div className="space-y-2">
                    <p className="text-sm line-through text-gray-500">
                      Original Price: KSh {displayPrice.toLocaleString()}
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      KSh {discountedPrice.toLocaleString()}
                    </p>
                    <p className="text-sm font-semibold text-green-500">50% OFF - Save KSh {(displayPrice - discountedPrice).toLocaleString()}</p>
                  </div>
                </div>

                {product.description && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Description</h3>
                    <p className="text-gray-700 leading-relaxed">{product.description}</p>
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">Available Sizes</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes && product.sizes.length > 0 ? (
                      product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-3 py-1.5 border rounded-full text-sm font-medium transition-all ${
                            selectedSize === size
                              ? 'border-black bg-black text-white'
                              : 'border-gray-300 hover:border-black'
                          }`}
                        >
                          {size}
                        </button>
                      ))
                    ) : (
                      ['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-3 py-1.5 border rounded-full text-sm font-medium transition-all ${
                            selectedSize === size
                              ? 'border-black bg-black text-white'
                              : 'border-gray-300 hover:border-black'
                          }`}
                        >
                          {size}
                        </button>
                      ))
                    )}
                  </div>
                </div>

                {product.colors && product.colors.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">Available Colors</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-3 py-1.5 border rounded-full text-sm font-medium transition-all ${
                            selectedColor === color
                              ? 'border-black bg-black text-white'
                              : 'border-gray-300 hover:border-black'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t pt-6 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Add to Cart
                </button>
                <button
                  onClick={handleWhatsApp}
                  className="py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </button>
              </div>
              <button
                onClick={onClose}
                className="w-full py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
