import { SHOP_DETAILS } from '../data/shop';

export const generateWhatsAppUrl = (
  itemTitle,
  size = '',
  categoryName = '',
  targetNumber = SHOP_DETAILS.whatsappPrimary
) => {
  const sizePart = size ? `%0A*Requested Size:* ${encodeURIComponent(size)}` : '';
  const catPart = categoryName ? `%0A*Category:* ${encodeURIComponent(categoryName)}` : '';
  const message = `Vanakkam HI-5 Karuppu Kadai!%0A%0AI would like to check this item:%0A%0A*Item:* ${encodeURIComponent(itemTitle)}${catPart}${sizePart}%0A*Shop:* Gandhi Street, RS Mangalam, Ramanathapuram%0A%0ACould you please share the current price and availability? Thank you!`;
  return `https://wa.me/${targetNumber}?text=${message}`;
};

export const generateContactWhatsAppUrl = ({
  name,
  phone,
  category,
  message,
  targetNumber = SHOP_DETAILS.whatsappPrimary,
}) => {
  const cleanName = (name || '').trim();
  const cleanPhone = (phone || '').trim();
  const cleanCategory = (category || '').trim();
  const cleanMessage = (message || '').trim();
  const text = `Vanakkam HI-5 Karuppu Kadai!%0A%0A*Customer details*%0AName: ${encodeURIComponent(cleanName)}%0AMobile: ${encodeURIComponent(cleanPhone)}%0ACategory: ${encodeURIComponent(cleanCategory)}%0A%0A*Inquiry*%0A${encodeURIComponent(cleanMessage)}%0A%0APlease let me know about availability and next steps. Thank you!`;
  return `https://wa.me/${targetNumber}?text=${text}`;
};
