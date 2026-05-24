'use client';

import { useRef, useState, FormEvent } from 'react';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

/* ============================================================
   Types
   ============================================================ */
interface Benefit {
  icon: string;
  title: string;
  description: string;
}

interface PricingTier {
  name: string;
  volume: string;
  badge?: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}

interface FAQ {
  question: string;
  answer: string;
}

interface FormData {
  businessName: string;
  contactPerson: string;
  email: string;
  phone: string;
  monthlyVolume: string;
  roastPreference: string;
  message: string;
}

/* ============================================================
   Data
   ============================================================ */
const BENEFITS: Benefit[] = [
  {
    icon: '◎',
    title: 'Consistent Supply',
    description:
      'Reliable monthly shipments from our Nepali partner cooperatives. Every lot meets our strict Q-grader cupping standards before it leaves origin.',
  },
  {
    icon: '◈',
    title: 'Custom Roasting',
    description:
      'Work with our head roaster to dial in a roast profile that suits your espresso bar, filter setup, or cold-brew menu — then lock it in as your signature.',
  },
  {
    icon: '◆',
    title: 'Competitive Pricing',
    description:
      'Premium wholesale rates that make single-origin Himalayan coffee viable on your menu without breaking your GP. Volume brackets reviewed annually.',
  },
  {
    icon: '⊕',
    title: 'Origin Story',
    description:
      'Full farm traceability — farmer name, district, altitude, harvest date — ready for your menu card, chalk board, or website. We write it for you.',
  },
  {
    icon: '⊗',
    title: 'Staff Training',
    description:
      'Complimentary barista education sessions covering Himalayan terroir, optimal extraction, and the story of how to sell a premium origin to your guests.',
  },
  {
    icon: '◉',
    title: 'Dedicated Support',
    description:
      'A personal account manager who knows your café, your customers, and your volume cycle. Direct line, real human, no ticket queue.',
  },
];

const PRICING_TIERS: PricingTier[] = [
  {
    name: 'Starter',
    volume: '5 – 20 kg / month',
    features: [
      'Standard roast profile selection',
      'Fortnightly or monthly delivery',
      'Origin story card (digital)',
      'HIMA BEANS point-of-sale assets',
      'Email support',
    ],
    cta: 'Enquire as Starter',
    highlighted: false,
  },
  {
    name: 'Professional',
    volume: '20 – 100 kg / month',
    badge: 'Most Popular',
    features: [
      'Custom roast profile development',
      'Priority shipping & lead times',
      'Printed origin story cards',
      'Quarterly barista training session',
      'Dedicated account manager',
      'Priority new-lot access',
    ],
    cta: 'Enquire as Professional',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    volume: '100 kg+ / month',
    features: [
      'Exclusive single-origin allocations',
      'Custom white-label packaging',
      'Bespoke roast profile R&D',
      'Monthly farm-to-cup reporting',
      'Co-marketing opportunities',
      'Annual Nepal farm visit (on request)',
    ],
    cta: 'Enquire as Enterprise',
    highlighted: false,
  },
];

const FAQS: FAQ[] = [
  {
    question: 'What is the minimum order quantity (MOQ)?',
    answer:
      'Our minimum opening order is 5 kg. After your first order, ongoing minimums apply per your pricing tier — 5 kg/month for Starter, 20 kg/month for Professional, and 100 kg/month for Enterprise. We\'re flexible with seasonal adjustments and will never leave you over-stocked.',
  },
  {
    question: 'How long does shipping take from Nepal to Australia?',
    answer:
      'For retail orders, we ship air freight from Kathmandu with a standard lead time of 7–10 business days to your door. Wholesale Professional and Enterprise accounts on sea freight can expect 4–6 weeks lead time with advance scheduling — we plan seasonal allocations with you 8–12 weeks ahead.',
  },
  {
    question: 'Can I get a custom roast profile?',
    answer:
      'Absolutely — custom roasting is available from the Professional tier upwards. Our head roaster will schedule a discovery session with you or your head barista to understand your target extraction, grind setting, and preferred cup profile. We\'ll send you 3 trial roast samples before locking in your profile.',
  },
  {
    question: 'Do you offer white-label or private label packaging?',
    answer:
      'Enterprise partners have access to full custom label design and white-label packaging. Your brand, our beans. We work with a sustainable packaging supplier who can match our kraft board and soy-ink spec to your branding. Minimum label run applies (typically 500 units). Contact us to discuss.',
  },
  {
    question: 'What support do you offer for menu integration and staff training?',
    answer:
      'All partners receive our digital Origin Story Kit, which includes menu-ready copy, tasting notes, farm photography, and a QR-code trail your guests can scan. Starter partners get one complimentary virtual training session annually. Professional and Enterprise partners receive on-site barista training at your venue — we cover the travel.',
  },
];

const ROAST_OPTIONS = [
  'Filter / Light',
  'Omni-roast / Medium-Light',
  'Espresso / Medium',
  'Dark / Full City',
  'Custom (I\'d like to discuss)',
];

const VOLUME_OPTIONS = [
  '5–20 kg/month (Starter)',
  '20–100 kg/month (Professional)',
  '100 kg+/month (Enterprise)',
  'Not sure yet',
];

/* ============================================================
   Sub-components
   ============================================================ */

function BenefitCard({ benefit, index }: { benefit: Benefit; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 1, 0.5, 1] as [number,number,number,number] }}
      className="bg-[#F5EFE6] rounded-2xl p-8 flex flex-col gap-4 group hover:bg-[#3B2A21] transition-colors duration-300"
    >
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-xl transition-colors duration-300"
        style={{ backgroundColor: '#E6D8C9', color: '#B08D57' }}
      >
        {benefit.icon}
      </div>
      <h3 className="font-serif text-xl text-[#3B2A21] font-semibold group-hover:text-[#F5EFE6] transition-colors duration-300">
        {benefit.title}
      </h3>
      <p className="font-sans text-sm text-[#8C8477] leading-relaxed group-hover:text-[#E6D8C9] transition-colors duration-300">
        {benefit.description}
      </p>
    </motion.div>
  );
}

function PricingCard({ tier, index }: { tier: PricingTier; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.25, 1, 0.5, 1] as [number,number,number,number] }}
      className={`rounded-3xl overflow-hidden flex flex-col ${
        tier.highlighted
          ? 'shadow-2xl shadow-[#3B2A21]/20 ring-2 ring-[#B08D57] scale-[1.02]'
          : 'border border-[#E6D8C9]'
      }`}
      style={{
        backgroundColor: tier.highlighted ? '#3B2A21' : '#FFFFFF',
      }}
    >
      {/* Header */}
      <div
        className="px-8 pt-8 pb-6 relative"
        style={{
          borderBottom: `1px solid ${tier.highlighted ? '#5C3D2E' : '#E6D8C9'}`,
        }}
      >
        {tier.badge && (
          <span
            className="absolute top-6 right-6 text-xs font-sans font-semibold px-3 py-1 rounded-full"
            style={{ backgroundColor: '#B08D57', color: '#F5EFE6' }}
          >
            {tier.badge}
          </span>
        )}
        <p
          className="font-sans text-xs font-semibold tracking-[0.2em] uppercase mb-2"
          style={{ color: '#B08D57' }}
        >
          {tier.name}
        </p>
        <p
          className="font-serif text-2xl font-bold"
          style={{ color: tier.highlighted ? '#F5EFE6' : '#3B2A21' }}
        >
          {tier.volume}
        </p>
      </div>

      {/* Features */}
      <div className="px-8 py-6 flex-1">
        <ul className="space-y-3">
          {tier.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <span className="mt-0.5 text-[#B08D57] text-sm leading-none">✓</span>
              <span
                className="font-sans text-sm leading-relaxed"
                style={{ color: tier.highlighted ? '#E6D8C9' : '#8C8477' }}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="px-8 pb-8">
        <a
          href="#inquiry"
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-sans font-semibold text-sm tracking-widest uppercase transition-all duration-300 hover:scale-105"
          style={
            tier.highlighted
              ? { backgroundColor: '#B08D57', color: '#F5EFE6' }
              : { backgroundColor: '#3B2A21', color: '#F5EFE6' }
          }
        >
          {tier.cta}
        </a>
      </div>
    </motion.div>
  );
}

function FAQItem({ faq, index }: { faq: FAQ; index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 1, 0.5, 1] as [number,number,number,number] }}
      className="border-b border-[#E6D8C9] last:border-0"
    >
      <button
        className="w-full flex items-center justify-between gap-6 py-6 text-left group"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="font-serif text-lg text-[#3B2A21] font-semibold group-hover:text-[#B08D57] transition-colors duration-200">
          {faq.question}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0 w-7 h-7 rounded-full border border-[#E6D8C9] flex items-center justify-center text-[#B08D57] font-bold text-lg"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="faq-answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] as [number,number,number,number] }}
            className="overflow-hidden"
          >
            <p className="font-sans text-sm text-[#8C8477] leading-relaxed pb-6 max-w-3xl">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function WholesaleForm() {
  const ref = useRef<HTMLFormElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [formData, setFormData] = useState<FormData>({
    businessName: '',
    contactPerson: '',
    email: '',
    phone: '',
    monthlyVolume: '',
    roastPreference: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    // Simulate async submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  }

  const inputClass =
    'w-full px-4 py-3.5 rounded-xl border border-[#E6D8C9] bg-white font-sans text-sm text-[#3B2A21] placeholder-[#8C8477] focus:outline-none focus:ring-2 focus:ring-[#B08D57] focus:border-transparent transition-all duration-200';

  const labelClass = 'block font-sans text-xs font-semibold text-[#8C8477] tracking-wider uppercase mb-1.5';

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16 px-8"
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-6"
          style={{ backgroundColor: '#B08D57', color: '#F5EFE6' }}
        >
          ✓
        </div>
        <h3 className="font-serif text-3xl text-[#3B2A21] font-bold mb-4">Enquiry Received</h3>
        <p className="font-sans text-[#8C8477] text-base leading-relaxed max-w-md mx-auto">
          Thank you for reaching out. Your dedicated account manager will be in touch within one
          business day to discuss your partnership.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] as [number,number,number,number] }}
      onSubmit={handleSubmit}
      className="grid md:grid-cols-2 gap-6"
      noValidate
    >
      <div>
        <label htmlFor="businessName" className={labelClass}>
          Business Name *
        </label>
        <input
          id="businessName"
          name="businessName"
          type="text"
          required
          placeholder="Your Café or Company"
          value={formData.businessName}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="contactPerson" className={labelClass}>
          Contact Person *
        </label>
        <input
          id="contactPerson"
          name="contactPerson"
          type="text"
          required
          placeholder="Full name"
          value={formData.contactPerson}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email Address *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="hello@yourcafe.com.au"
          value={formData.email}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="phone" className={labelClass}>
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+61 4xx xxx xxx"
          value={formData.phone}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="monthlyVolume" className={labelClass}>
          Monthly Volume *
        </label>
        <select
          id="monthlyVolume"
          name="monthlyVolume"
          required
          value={formData.monthlyVolume}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="" disabled>
            Select your volume
          </option>
          {VOLUME_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="roastPreference" className={labelClass}>
          Roast Preference
        </label>
        <select
          id="roastPreference"
          name="roastPreference"
          value={formData.roastPreference}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">Select a roast preference</option>
          {ROAST_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className="md:col-span-2">
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell us about your café, your current coffee program, and any specific requirements..."
          value={formData.message}
          onChange={handleChange}
          className={`${inputClass} resize-none`}
        />
      </div>

      <div className="md:col-span-2 flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-sans font-semibold text-sm tracking-widest uppercase transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          style={{ backgroundColor: '#3B2A21', color: '#F5EFE6' }}
        >
          {submitting ? (
            <>
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                className="inline-block w-4 h-4 border-2 border-[#F5EFE6] border-t-transparent rounded-full"
              />
              Sending...
            </>
          ) : (
            <>
              Submit Enquiry
              <span>→</span>
            </>
          )}
        </button>
      </div>
    </motion.form>
  );
}

/* ============================================================
   Page
   ============================================================ */
export default function WholesalePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const partnersRef = useRef<HTMLDivElement>(null);
  const partnersInView = useInView(partnersRef, { once: true, margin: '-60px' });

  return (
    <>
      <Navigation />
      <main className="min-h-screen" style={{ backgroundColor: '#F5EFE6' }}>
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative min-h-[75vh] flex items-end pb-24 overflow-hidden"
        style={{ backgroundColor: '#3B2A21' }}
      >
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 75% 40%, #B08D57 0%, transparent 55%), radial-gradient(circle at 15% 70%, #8C8477 0%, transparent 50%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")',
          }}
        />

        {/* Decorative line */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-[#B08D57] opacity-20" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-sans text-[#B08D57] text-sm font-semibold tracking-[0.2em] uppercase mb-6"
          >
            Wholesale Partnerships
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 1, 0.5, 1] as [number,number,number,number] }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#F5EFE6] font-bold leading-[0.95] mb-8"
          >
            Partner With
            <br />
            <em className="text-[#B08D57]">Nepal&apos;s Finest</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-sans text-[#E6D8C9] text-lg max-w-xl leading-relaxed mb-10"
          >
            Bring the world&apos;s most compelling specialty origin to your Australian café. We offer
            more than great coffee — we offer a complete partnership built for long-term success.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <a
              href="#inquiry"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-sans font-semibold text-sm tracking-widest uppercase transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: '#B08D57', color: '#F5EFE6' }}
            >
              Start Partnering
              <span>→</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Partner Benefits ── */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-14">
          <p className="font-sans text-[#B08D57] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Why Partner With Us
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#3B2A21] font-bold leading-tight">
            Everything Your Café Needs
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((benefit, i) => (
            <BenefitCard key={benefit.title} benefit={benefit} index={i} />
          ))}
        </div>
      </section>

      {/* ── Partner Logos ── */}
      <section
        ref={partnersRef}
        className="py-16"
        style={{ backgroundColor: '#3B2A21' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={partnersInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] as [number,number,number,number] }}
            className="text-center"
          >
            <p className="font-sans text-[#B08D57] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
              Trusted By
            </p>
            <h2 className="font-serif text-3xl text-[#F5EFE6] font-bold mb-3">
              50+ Australian Café Partners
            </h2>
            <p className="font-sans text-[#8C8477] text-base mb-12">
              From Melbourne laneways to Sydney rooftops and Brisbane riverside — HIMA BEANS is
              pouring across Australia.
            </p>

            {/* Placeholder logo grid */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-6">
              {Array.from({ length: 10 }, (_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={partnersInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.05,
                    ease: [0.25, 1, 0.5, 1] as [number,number,number,number],
                  }}
                  className="aspect-[3/2] rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: '#2D1E16' }}
                >
                  <span className="font-sans text-xs text-[#8C8477] font-medium">
                    Café {String.fromCharCode(65 + i)}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Pricing Tiers ── */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-14">
          <p className="font-sans text-[#B08D57] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Pricing & Tiers
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#3B2A21] font-bold leading-tight mb-4">
            Find Your Partnership Level
          </h2>
          <p className="font-sans text-[#8C8477] text-base max-w-lg mx-auto leading-relaxed">
            All tiers include access to our full range of Himalayan single-origin lots. Pricing
            shared on inquiry.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {PRICING_TIERS.map((tier, i) => (
            <PricingCard key={tier.name} tier={tier} index={i} />
          ))}
        </div>
      </section>

      {/* ── Wholesale Inquiry Form ── */}
      <section
        id="inquiry"
        className="py-24"
        style={{ backgroundColor: '#F5EFE6' }}
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <p className="font-sans text-[#B08D57] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
              Get in Touch
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#3B2A21] font-bold leading-tight mb-4">
              Wholesale Enquiry
            </h2>
            <p className="font-sans text-[#8C8477] text-base max-w-lg mx-auto leading-relaxed">
              Fill in the form below and your dedicated account manager will contact you within one
              business day.
            </p>
          </div>
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#E6D8C9]">
            <WholesaleForm />
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 max-w-4xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-14">
          <p className="font-sans text-[#B08D57] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Common Questions
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#3B2A21] font-bold leading-tight">
            FAQ
          </h2>
        </div>
        <div className="bg-white rounded-3xl border border-[#E6D8C9] px-8 md:px-12 divide-y divide-[#E6D8C9]">
          {FAQS.map((faq, i) => (
            <FAQItem key={faq.question} faq={faq} index={i} />
          ))}
        </div>
      </section>

      {/* ── Contact ── */}
      <section
        className="py-24"
        style={{ backgroundColor: '#3B2A21' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-sans text-[#B08D57] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
                Direct Contact
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-[#F5EFE6] font-bold leading-tight mb-6">
                Let&apos;s Talk Coffee
              </h2>
              <p className="font-sans text-[#E6D8C9] text-base leading-relaxed">
                Prefer to talk before filling in a form? Reach us directly — we love talking
                coffee, origin, and how we can make your café stand out.
              </p>
            </div>
            <div className="space-y-6">
              {[
                {
                  label: 'Wholesale Enquiries',
                  value: 'wholesale@himabeans.com.au',
                  href: 'mailto:wholesale@himabeans.com.au',
                },
                {
                  label: 'Phone',
                  value: '+61 3 9xxx xxxx',
                  href: 'tel:+61390000000',
                },
                {
                  label: 'Head Office',
                  value: 'Melbourne, VIC, Australia',
                  href: null,
                },
              ].map((contact) => (
                <div
                  key={contact.label}
                  className="flex flex-col gap-1 p-6 rounded-2xl"
                  style={{ backgroundColor: '#2D1E16' }}
                >
                  <p className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-[#8C8477]">
                    {contact.label}
                  </p>
                  {contact.href ? (
                    <a
                      href={contact.href}
                      className="font-serif text-xl text-[#F5EFE6] hover:text-[#B08D57] transition-colors duration-200"
                    >
                      {contact.value}
                    </a>
                  ) : (
                    <p className="font-serif text-xl text-[#F5EFE6]">{contact.value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section
        className="py-20 text-center"
        style={{ backgroundColor: '#B08D57' }}
      >
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-serif text-4xl text-[#F5EFE6] font-bold leading-tight mb-6">
            Ready to Bring the Himalayas to Your Customers?
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#inquiry"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-sans font-semibold text-sm tracking-widest uppercase transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: '#3B2A21', color: '#F5EFE6' }}
            >
              Start Your Enquiry
              <span>→</span>
            </a>
            <Link
              href="/sustainability"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-sans font-semibold text-sm tracking-widest uppercase border-2 transition-all duration-300 hover:scale-105"
              style={{ borderColor: '#3B2A21', color: '#3B2A21' }}
            >
              Our Sustainability Story
            </Link>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}
