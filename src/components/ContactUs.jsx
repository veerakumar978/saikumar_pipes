import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  ExternalLink,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Send,
  X,
} from 'lucide-react';
import {
  businessInfo,
  formatIndianPhone,
  toTelHref,
  toWhatsAppHref,
} from '../config/business';

const CATEGORY_OPTIONS = [
  'CPVC Pipes & Fittings',
  'UPVC Pipes & Fittings',
  'PVC Pipes & Fittings',
  'Electrical Conduits & Fittings',
  'Sanitaryware & Bath Fittings',
  'Water Storage Tanks',
  'PVC Borewell Casing Pipes',
  'Valves & Cocks',
  'Solvent Cements & Adhesives',
  'Other / Not Sure',
];

const INITIAL_FORM = {
  fullName: '',
  phone: '',
  category: '',
  message: '',
};

function validateIndianPhone(value) {
  const trimmed = value.trim();
  if (!trimmed) {
    return 'Please enter your phone number.';
  }
  if (!/^[+\d\s()-]+$/.test(trimmed)) {
    return 'Please enter a valid phone number containing digits.';
  }
  const digits = trimmed.replace(/\D/g, '');
  const normalized =
    digits.length === 12 && digits.startsWith('91')
      ? digits.slice(2)
      : digits.length === 11 && digits.startsWith('0')
        ? digits.slice(1)
        : digits;

  if (normalized.length !== 10) {
    return 'Please enter a 10-digit Indian mobile number.';
  }
  if (!/^[6-9]\d{9}$/.test(normalized)) {
    return 'Please enter a valid Indian mobile number starting with 6, 7, 8, or 9.';
  }
  return '';
}

export default function ContactUs() {
  const whatsappNumbers = businessInfo.whatsappEnabledNumbers ?? [];
  const defaultWhatsApp = whatsappNumbers[0] || '8985836691';
  const hasBackend = Boolean(businessInfo.enquiryEndpoint);

  const [formData, setFormData] = useState(INITIAL_FORM);
  const [selectedWhatsApp, setSelectedWhatsApp] = useState(defaultWhatsApp);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Modal State: null | { type: 'whatsapp' | 'backend-success' | 'backend-error', data?: any }
  const [modalState, setModalState] = useState(null);
  const closeButtonRef = useRef(null);

  // Prevent background scroll when modal is open and handle Escape key
  useEffect(() => {
    if (!modalState) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    // Auto-focus the close or proceed button
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalState]);

  const handleFieldChange = (field) => (event) => {
    const value = event.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.fullName.trim()) {
      nextErrors.fullName = 'Please enter your full name.';
    } else if (formData.fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter at least 2 characters for your name.';
    }

    const phoneError = validateIndianPhone(formData.phone);
    if (phoneError) {
      nextErrors.phone = phoneError;
    }

    if (!formData.category) {
      nextErrors.category = 'Please select a product category.';
    }

    if (!formData.message.trim()) {
      nextErrors.message = 'Please tell us which products, sizes or quantities you need.';
    } else if (formData.message.trim().length < 5) {
      nextErrors.message = 'Please provide a little more detail about your requirement.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    if (!validateForm()) {
      // Focus first error field
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        document.getElementById(`enquiry-${firstErrorField}`)?.focus();
      }
      return;
    }

    // Backend Submission Route
    if (hasBackend) {
      setIsSubmitting(true);
      try {
        const response = await fetch(businessInfo.enquiryEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName: formData.fullName.trim(),
            phone: formData.phone.trim(),
            category: formData.category,
            message: formData.message.trim(),
          }),
        });

        if (!response.ok) {
          throw new Error('Server returned error status');
        }

        setModalState({
          type: 'backend-success',
          data: {
            fullName: formData.fullName.trim(),
            category: formData.category,
          },
        });
        setFormData(INITIAL_FORM);
      } catch (err) {
        setModalState({
          type: 'backend-error',
          data: {
            error: err.message || 'Network error',
          },
        });
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // WhatsApp Direct Submission Route (Default Active)
    const targetNumber = selectedWhatsApp || defaultWhatsApp;
    const formattedMessage = [
      `Hello ${businessInfo.name},`,
      '',
      'I would like to enquire about plumbing and sanitary products:',
      '',
      `• *Name:* ${formData.fullName.trim()}`,
      `• *Phone:* ${formData.phone.trim()}`,
      `• *Category:* ${formData.category}`,
      `• *Requirement:* ${formData.message.trim()}`,
      '',
      'Please let me know product availability, specifications and pricing.',
      'Thank you!',
    ].join('\n');

    const waUrl = toWhatsAppHref(targetNumber, formattedMessage);

    // Open WhatsApp in a new tab
    try {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    } catch (e) {
      console.warn('Could not open WhatsApp window directly:', e);
    }

    // Show accessible confirmation modal dialog
    setModalState({
      type: 'whatsapp',
      data: {
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        category: formData.category,
        message: formData.message.trim(),
        targetNumber,
        waUrl,
      },
    });
  };

  const handleCloseModal = () => {
    setModalState(null);
    if (modalState?.type === 'whatsapp') {
      setFormData(INITIAL_FORM);
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-20 bg-[#F0F7FF] border-t border-[#E5EDF5] py-14 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-left sm:text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-[#DCEEFF] border border-[#C6E2FC] px-3 sm:px-3.5 py-1.5 text-[0.6875rem] sm:text-xs font-semibold tracking-[0.1em] sm:tracking-[0.12em] text-[#123B68] uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2785CE]" aria-hidden="true" />
            GET IN TOUCH
          </span>

          <h2
            id="contact-heading"
            className="mt-4 text-[1.625rem] min-[375px]:text-[1.75rem] sm:text-[2.15rem] lg:text-[2.4rem] font-extrabold tracking-[-0.02em] leading-[1.18] text-[#123B68]"
          >
            Let&apos;s Talk About What You Need
          </h2>

          <p className="mt-4 text-[0.9625rem] sm:text-base leading-[1.7] text-[#64748B]">
            Looking for pipes, valves, fittings or sanitary products? Contact
            SAAIKUMAR Valves &amp; Cocks or visit our store in Rajamahendravaram
            to enquire about your requirements.
          </p>
        </motion.div>

        {/* Two-Column Contact Layout */}
        <div className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Contact Information Panel */}
          <div className="lg:col-span-5 rounded-2xl border border-[#E5EDF5] bg-white p-5 sm:p-8 shadow-[0_14px_34px_-22px_rgba(18,59,104,0.16)]">
            <h3 className="text-lg font-bold text-[#123B68]">
              Contact Information
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-[#64748B]">
              Reach our team directly by phone, WhatsApp, or visit our retail store.
            </p>

            <div className="mt-6 space-y-6">
              {/* 1. Call Us */}
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#DCEEFF] text-[#2785CE]">
                  <Phone className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold text-[#123B68]">Call Us</h4>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    Speak with our sales counter team directly
                  </p>
                  <div className="mt-2.5 flex flex-col gap-2">
                    {businessInfo.phoneNumbers.map((num) => (
                      <a
                        key={num}
                        href={toTelHref(num)}
                        className="group inline-flex min-h-[44px] items-center justify-between rounded-xl border border-[#E5EDF5] bg-[#F8FBFF] px-3.5 py-2.5 text-sm font-semibold text-[#123B68] hover:border-[#2785CE] hover:bg-[#F0F7FF] hover:text-[#2785CE] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2785CE]"
                      >
                        <span className="whitespace-nowrap">
                          {formatIndianPhone(num)}
                        </span>
                        <span className="text-xs font-medium text-[#2785CE] group-hover:underline">
                          Call Now
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* 2. WhatsApp Us */}
              {whatsappNumbers.length > 0 && (
                <div className="pt-5 border-t border-[#E5EDF5] flex items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#DCEEFF] text-[#2785CE]">
                    <MessageCircle
                      className="h-[18px] w-[18px]"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-bold text-[#123B68]">
                      WhatsApp Us
                    </h4>
                    <p className="text-xs text-[#64748B] mt-0.5">
                      Send requirement lists, drawings or specifications
                    </p>
                    <div className="mt-2.5 flex flex-col gap-2">
                      {whatsappNumbers.map((num) => (
                        <a
                          key={num}
                          href={toWhatsAppHref(num, 'Hello SAAIKUMAR Valves & Cocks, I would like to enquire about your plumbing products.')}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex min-h-[44px] items-center justify-between rounded-xl border border-[#E5EDF5] bg-[#F8FBFF] px-3.5 py-2.5 text-sm font-semibold text-[#123B68] hover:border-[#2785CE] hover:bg-[#F0F7FF] hover:text-[#2785CE] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2785CE]"
                        >
                          <span className="whitespace-nowrap">
                            {formatIndianPhone(num)}
                          </span>
                          <span className="text-xs font-medium text-[#2785CE] group-hover:underline flex items-center gap-1">
                            Chat on WhatsApp
                            <ExternalLink className="h-3 w-3" aria-hidden="true" />
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 3. Visit Our Store & Google Maps Actions */}
              <div className="pt-5 border-t border-[#E5EDF5] flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#DCEEFF] text-[#2785CE]">
                  <MapPin className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold text-[#123B68]">
                    Visit Our Store
                  </h4>
                  <p className="mt-1 text-sm leading-relaxed text-[#263746]">
                    {businessInfo.address}
                  </p>

                  {/* Google Maps Actions: View Location & Get Directions */}
                  {businessInfo.googleMapsUrl && (
                    <div className="mt-3.5 flex flex-wrap items-center gap-2.5">
                      <a
                        href={businessInfo.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border border-[#CBDCEB] bg-white px-3.5 py-2 text-xs font-semibold text-[#123B68] hover:border-[#2785CE] hover:bg-[#F0F7FF] hover:text-[#2785CE] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2785CE]"
                      >
                        <MapPin className="h-3.5 w-3.5 text-[#2785CE]" aria-hidden="true" />
                        <span>View Location</span>
                        <ExternalLink className="h-3 w-3 text-[#94A3B8]" aria-hidden="true" />
                      </a>
                      <a
                        href={businessInfo.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl bg-[#123B68] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#1B4B7F] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2785CE]"
                      >
                        <Navigation className="h-3.5 w-3.5 text-[#7CC4FA]" aria-hidden="true" />
                        <span>Get Directions</span>
                        <ExternalLink className="h-3 w-3 text-white/70" aria-hidden="true" />
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* 4. Opening Hours — shown only when verified */}
              {businessInfo.openingHours && (
                <div className="pt-5 border-t border-[#E5EDF5] flex items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#DCEEFF] text-[#2785CE]">
                    <Clock className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-[#123B68]">
                      Opening Hours
                    </h4>
                    <p className="mt-1 text-sm leading-relaxed text-[#64748B]">
                      {businessInfo.openingHours}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Enquiry Form Panel */}
          <div className="lg:col-span-7 rounded-2xl border border-[#E5EDF5] bg-white p-5 sm:p-8 shadow-[0_14px_34px_-22px_rgba(18,59,104,0.16)]">
            <h3 className="text-lg font-bold text-[#123B68]">
              Send Us an Enquiry
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-[#64748B]">
              Tell us what products you need. Our team will review your requirement
              and get back to you with pricing, sizes, and availability.
            </p>

            <form
              onSubmit={handleSubmit}
              noValidate
              aria-label="Product enquiry form"
              className="mt-6 space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Field 1: Full Name */}
                <div>
                  <label
                    htmlFor="enquiry-fullName"
                    className="block text-sm font-semibold text-[#123B68]"
                  >
                    Full Name <span className="text-[#2785CE]">*</span>
                  </label>
                  <input
                    id="enquiry-fullName"
                    name="fullName"
                    type="text"
                    required
                    disabled={isSubmitting}
                    autoComplete="name"
                    placeholder="e.g. Rajesh Kumar"
                    value={formData.fullName}
                    onChange={handleFieldChange('fullName')}
                    aria-invalid={Boolean(errors.fullName)}
                    aria-describedby={
                      errors.fullName ? 'enquiry-fullName-error' : undefined
                    }
                    className={`mt-1.5 block min-h-[44px] w-full rounded-xl border px-3.5 py-2.5 text-sm text-[#263746] placeholder:text-[#94A3B8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2785CE]/25 focus:border-[#2785CE] ${
                      errors.fullName
                        ? 'border-red-400 bg-red-50/40'
                        : 'border-[#DCE5EF] bg-white'
                    }`}
                  />
                  {errors.fullName && (
                    <p
                      id="enquiry-fullName-error"
                      role="alert"
                      className="mt-1.5 text-xs font-medium text-red-600 flex items-center gap-1"
                    >
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* Field 2: Phone Number */}
                <div>
                  <label
                    htmlFor="enquiry-phone"
                    className="block text-sm font-semibold text-[#123B68]"
                  >
                    Phone Number <span className="text-[#2785CE]">*</span>
                  </label>
                  <input
                    id="enquiry-phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    required
                    disabled={isSubmitting}
                    autoComplete="tel"
                    placeholder="e.g. 98765 43210"
                    value={formData.phone}
                    onChange={handleFieldChange('phone')}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={
                      errors.phone ? 'enquiry-phone-error' : undefined
                    }
                    className={`mt-1.5 block min-h-[44px] w-full rounded-xl border px-3.5 py-2.5 text-sm text-[#263746] placeholder:text-[#94A3B8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2785CE]/25 focus:border-[#2785CE] ${
                      errors.phone
                        ? 'border-red-400 bg-red-50/40'
                        : 'border-[#DCE5EF] bg-white'
                    }`}
                  />
                  {errors.phone && (
                    <p
                      id="enquiry-phone-error"
                      role="alert"
                      className="mt-1.5 text-xs font-medium text-red-600 flex items-center gap-1"
                    >
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Field 3: Product Category */}
              <div>
                <label
                  htmlFor="enquiry-category"
                  className="block text-sm font-semibold text-[#123B68]"
                >
                  What are you looking for?{' '}
                  <span className="text-[#2785CE]">*</span>
                </label>
                <div className="relative mt-1.5">
                  <select
                    id="enquiry-category"
                    name="category"
                    required
                    disabled={isSubmitting}
                    value={formData.category}
                    onChange={handleFieldChange('category')}
                    aria-invalid={Boolean(errors.category)}
                    aria-describedby={
                      errors.category ? 'enquiry-category-error' : undefined
                    }
                    className={`block min-h-[44px] w-full rounded-xl border px-3.5 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#2785CE]/25 focus:border-[#2785CE] ${
                      formData.category ? 'text-[#263746] font-medium' : 'text-[#94A3B8]'
                    } ${
                      errors.category
                        ? 'border-red-400 bg-red-50/40'
                        : 'border-[#DCE5EF] bg-white'
                    }`}
                  >
                    <option value="" disabled>
                      Select a product category
                    </option>
                    {CATEGORY_OPTIONS.map((option) => (
                      <option
                        key={option}
                        value={option}
                        className="text-[#263746]"
                      >
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.category && (
                  <p
                    id="enquiry-category-error"
                    role="alert"
                    className="mt-1.5 text-xs font-medium text-red-600 flex items-center gap-1"
                  >
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>{errors.category}</span>
                  </p>
                )}
              </div>

              {/* Field 4: Message */}
              <div>
                <label
                  htmlFor="enquiry-message"
                  className="block text-sm font-semibold text-[#123B68]"
                >
                  Your Requirement Details <span className="text-[#2785CE]">*</span>
                </label>
                <textarea
                  id="enquiry-message"
                  name="message"
                  rows={4}
                  required
                  disabled={isSubmitting}
                  placeholder="Tell us which product specifications, pipe diameters (e.g. 1/2 inch, 1 inch), brands or quantities you need..."
                  value={formData.message}
                  onChange={handleFieldChange('message')}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? 'enquiry-message-error' : undefined
                  }
                  className={`mt-1.5 block w-full rounded-xl border px-3.5 py-2.5 text-sm text-[#263746] placeholder:text-[#94A3B8] resize-y transition-colors focus:outline-none focus:ring-2 focus:ring-[#2785CE]/25 focus:border-[#2785CE] ${
                    errors.message
                      ? 'border-red-400 bg-red-50/40'
                      : 'border-[#DCE5EF] bg-white'
                  }`}
                />
                {errors.message && (
                  <p
                    id="enquiry-message-error"
                    role="alert"
                    className="mt-1.5 text-xs font-medium text-red-600 flex items-center gap-1"
                  >
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              {/* WhatsApp Number Selector (when 2+ WhatsApp numbers exist) */}
              {!hasBackend && whatsappNumbers.length > 1 && (
                <div>
                  <span className="block text-xs font-semibold text-[#123B68]">
                    Send enquiry to:
                  </span>
                  <div className="mt-2 flex flex-wrap gap-2.5">
                    {whatsappNumbers.map((num) => (
                      <label
                        key={num}
                        className={`inline-flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors ${
                          selectedWhatsApp === num
                            ? 'border-[#2785CE] bg-[#F0F7FF] text-[#123B68]'
                            : 'border-[#DCE5EF] bg-white text-[#64748B] hover:border-[#C5DDF3]'
                        }`}
                      >
                        <input
                          type="radio"
                          name="whatsappNumber"
                          value={num}
                          checked={selectedWhatsApp === num}
                          onChange={() => setSelectedWhatsApp(num)}
                          className="accent-[#2785CE]"
                        />
                        <span>{formatIndianPhone(num)}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Submit Button & Clear Info Note */}
              <div className="pt-2 space-y-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#2785CE] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_20px_-6px_rgba(39,133,206,0.45)] hover:bg-[#1E6EAD] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2785CE] transition-all disabled:opacity-75 disabled:cursor-wait"
                >
                  <Send className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>
                    {isSubmitting ? 'Submitting Enquiry...' : 'Send Enquiry'}
                  </span>
                </button>

                {!hasBackend && (
                  <p className="text-xs leading-relaxed text-[#64748B] flex items-center gap-1.5">
                    <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 shrink-0" aria-hidden="true" />
                    <span>
                      Direct enquiry via WhatsApp. You will receive a confirmation screen and prompt reply.
                    </span>
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Confirmation Modal Popup Dialog */}
      <AnimatePresence>
        {modalState && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Modal Content Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl sm:rounded-3xl border border-[#DCE5EF] bg-white p-6 sm:p-8 shadow-2xl"
            >
              {/* Close Button */}
              <button
                ref={closeButtonRef}
                onClick={handleCloseModal}
                aria-label="Close dialog"
                className="absolute top-4 right-4 sm:top-6 sm:right-6 flex h-9 w-9 items-center justify-center rounded-xl text-[#64748B] hover:bg-[#F0F7FF] hover:text-[#123B68] focus-visible:outline-2 focus-visible:outline-[#2785CE] transition-colors"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>

              {modalState.type === 'whatsapp' && (
                <div>
                  {/* Icon Header */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                    <MessageCircle className="h-6 w-6" strokeWidth={2.2} aria-hidden="true" />
                  </div>

                  {/* Title & Description */}
                  <h3
                    id="modal-title"
                    className="mt-4 text-xl sm:text-2xl font-bold tracking-tight text-[#123B68]"
                  >
                    Your Enquiry Is Ready
                  </h3>
                  <p
                    id="modal-description"
                    className="mt-2 text-sm leading-relaxed text-[#64748B]"
                  >
                    WhatsApp will open with your enquiry details. Please press{' '}
                    <strong className="text-[#123B68] font-semibold">Send</strong> in WhatsApp
                    to complete your enquiry to our sales team.
                  </p>

                  {/* Enquiry Summary Card */}
                  <div className="mt-5 rounded-xl border border-[#E5EDF5] bg-[#F8FBFF] p-4 text-xs sm:text-sm space-y-2">
                    <div className="flex items-center justify-between border-b border-[#E5EDF5] pb-2">
                      <span className="text-[#64748B]">Customer Name:</span>
                      <span className="font-semibold text-[#123B68]">
                        {modalState.data?.fullName}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-[#E5EDF5] pb-2">
                      <span className="text-[#64748B]">Phone Number:</span>
                      <span className="font-semibold text-[#123B68]">
                        {modalState.data?.phone}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-[#E5EDF5] pb-2">
                      <span className="text-[#64748B]">Category:</span>
                      <span className="font-semibold text-[#2785CE]">
                        {modalState.data?.category}
                      </span>
                    </div>
                    <div className="pt-1">
                      <span className="text-[#64748B] block mb-1">Requirement:</span>
                      <p className="text-[#263746] bg-white p-2.5 rounded-lg border border-[#E5EDF5] italic text-xs leading-relaxed line-clamp-3">
                        &ldquo;{modalState.data?.message}&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex flex-col-reverse sm:flex-row items-center gap-3">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="w-full sm:w-auto flex-1 min-h-[44px] inline-flex items-center justify-center rounded-xl border border-[#CBDCEB] bg-white px-5 py-2.5 text-sm font-semibold text-[#64748B] hover:bg-[#F8FBFF] hover:text-[#123B68] transition-colors focus-visible:outline-2 focus-visible:outline-[#2785CE]"
                    >
                      Continue Browsing
                    </button>
                    <a
                      href={modalState.data?.waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto flex-1 min-h-[44px] inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_6px_18px_-4px_rgba(5,150,105,0.45)] hover:bg-emerald-700 transition-colors focus-visible:outline-2 focus-visible:outline-emerald-600"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      <span>Open WhatsApp</span>
                    </a>
                  </div>
                </div>
              )}

              {modalState.type === 'backend-success' && (
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                    <CheckCircle2 className="h-6 w-6" strokeWidth={2.2} aria-hidden="true" />
                  </div>
                  <h3
                    id="modal-title"
                    className="mt-4 text-xl sm:text-2xl font-bold tracking-tight text-[#123B68]"
                  >
                    Thank You, {modalState.data?.fullName}!
                  </h3>
                  <p
                    id="modal-description"
                    className="mt-2 text-sm leading-relaxed text-[#64748B]"
                  >
                    Your enquiry for{' '}
                    <strong className="text-[#123B68]">
                      {modalState.data?.category}
                    </strong>{' '}
                    has been submitted successfully. Our team will get back to you shortly.
                  </p>
                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="w-full min-h-[44px] inline-flex items-center justify-center rounded-xl bg-[#2785CE] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1E6EAD] transition-colors"
                    >
                      Continue Browsing
                    </button>
                  </div>
                </div>
              )}

              {modalState.type === 'backend-error' && (
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600 border border-red-100">
                    <AlertCircle className="h-6 w-6" strokeWidth={2.2} aria-hidden="true" />
                  </div>
                  <h3
                    id="modal-title"
                    className="mt-4 text-xl sm:text-2xl font-bold tracking-tight text-[#123B68]"
                  >
                    Unable to Submit Online
                  </h3>
                  <p
                    id="modal-description"
                    className="mt-2 text-sm leading-relaxed text-[#64748B]"
                  >
                    We were unable to complete your enquiry right now. Please call our sales
                    counter directly on{' '}
                    <a
                      href={toTelHref(businessInfo.phoneNumbers[0])}
                      className="font-semibold text-[#2785CE] underline underline-offset-2"
                    >
                      {formatIndianPhone(businessInfo.phoneNumbers[0])}
                    </a>{' '}
                    or message us via WhatsApp.
                  </p>
                  <div className="mt-6 flex gap-3">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="flex-1 min-h-[44px] inline-flex items-center justify-center rounded-xl border border-[#CBDCEB] bg-white px-5 py-2.5 text-sm font-semibold text-[#64748B] hover:bg-[#F8FBFF]"
                    >
                      Close
                    </button>
                    <a
                      href={toTelHref(businessInfo.phoneNumbers[0])}
                      className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-2 rounded-xl bg-[#2785CE] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1E6EAD]"
                    >
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      <span>Call Now</span>
                    </a>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
