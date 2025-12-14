const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

export function generateWhatsAppLink(
  productName: string,
  size?: string,
  color?: string,
  price?: number
): string {
  let message = `Hi Eddjos Collections! I'm interested in the ${productName}`;

  if (size) {
    message += ` (Size: ${size})`;
  }

  if (color) {
    message += ` - Color: ${color}`;
  }

  if (price) {
    const originalPrice = price;
    const discountedPrice = Math.floor(originalPrice * 0.5);
    const savings = originalPrice - discountedPrice;
    message += `\n\nPricing:\nOriginal: KSh ${originalPrice.toLocaleString()}\n50% OFF: KSh ${discountedPrice.toLocaleString()}\nYou Save: KSh ${savings.toLocaleString()}`;
  }

  message += `\n\nPlease share availability and delivery info.`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

export function getWhatsAppFloatingLink(): string {
  const message = encodeURIComponent(
    "Hi Eddjos Collections! I'd like to browse your products and place an order."
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}
