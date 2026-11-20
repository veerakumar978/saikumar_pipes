export const businessInfo = {
  name: 'SAAIKUMAR Valves & Cocks',

  phoneNumbers: [
    '8985836691',
    '8985806697',
  ],

  // Storefront location (customer-facing address)
  address: 'Main Road, near Chaitanya Furniture, Padmavathi Nagar, Rajamahendravaram, Andhra Pradesh 533106',

  // Google Maps search destination
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Saaikumar+Valves+%26+Cocks%2C+Main+Road%2C+near+Chaitanya+Furniture%2C+Padmavathi+Nagar%2C+Rajamahendravaram%2C+Andhra+Pradesh+533106',

  // Opening hours (kept null until specifically confirmed by owner)
  openingHours: null,

  // Business phone numbers available for WhatsApp enquiries
  whatsappEnabledNumbers: [
    '8985836691',
    '8985806697',
  ],

  // Optional backend enquiry endpoint URL once configured
  enquiryEndpoint: null,
};

export function formatIndianPhone(digits) {
  const clean = String(digits).replace(/\D/g, '');
  if (clean.length === 10) {
    return `${clean.slice(0, 5)} ${clean.slice(5)}`;
  }
  return String(digits);
}

export function toTelHref(digits) {
  const clean = String(digits).replace(/\D/g, '');
  if (clean.length === 10) {
    return `tel:+91${clean}`;
  }
  return `tel:+${clean}`;
}

export function toWhatsAppHref(digits, message = '') {
  const clean = String(digits).replace(/\D/g, '');
  const fullNumber = clean.length === 10 ? `91${clean}` : clean;
  if (!message) {
    return `https://wa.me/${fullNumber}`;
  }
  return `https://wa.me/${fullNumber}?text=${encodeURIComponent(message)}`;
}
