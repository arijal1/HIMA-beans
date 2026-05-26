'use client';

import { useRef, useState, FormEvent } from 'react';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { useLang } from '@/context/lang';

/* ============================================================
   Types
   ============================================================ */
interface Benefit {
  icon: string;
  title: string;
  titleNP: string;
  description: string;
  descriptionNP: string;
}

interface PricingTier {
  name: string;
  nameNP: string;
  volume: string;
  badge?: string;
  features: string[];
  cta: string;
  ctaNP: string;
  highlighted: boolean;
}

interface FAQ {
  question: string;
  questionNP: string;
  answer: string;
  answerNP: string;
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
    titleNP: 'निरन्तर आपूर्ति',
    description:
      'Reliable monthly shipments from our Nepali partner cooperatives. Every lot meets our strict Q-grader cupping standards before it leaves origin.',
    descriptionNP:
      'हाम्रा नेपाली साझेदार सहकारीहरूबाट भरपर्दो मासिक ढुवानी। प्रत्येक लट उत्पत्ति छोड्नुअघि हाम्रो कडा Q-ग्रेडर कपिङ मापदण्ड पूरा गर्छ।',
  },
  {
    icon: '◈',
    title: 'Custom Roasting',
    titleNP: 'कस्टम रोस्टिङ',
    description:
      'Work with our head roaster to dial in a roast profile that suits your espresso bar, filter setup, or cold-brew menu — then lock it in as your signature.',
    descriptionNP:
      'तपाईंको एस्प्रेसो बार, फिल्टर सेटअप, वा कोल्ड-ब्रु मेनुमा उपयुक्त रोस्ट प्रोफाइल तयार पार्न हाम्रो प्रमुख रोस्टरसँग काम गर्नुहोस्।',
  },
  {
    icon: '◆',
    title: 'Competitive Pricing',
    titleNP: 'प्रतिस्पर्धी मूल्य निर्धारण',
    description:
      'Premium wholesale rates that make single-origin Himalayan coffee viable on your menu without breaking your GP. Volume brackets reviewed annually.',
    descriptionNP:
      'प्रिमियम थोक दरहरू जसले तपाईंको मेनुमा एकल-उत्पत्ति हिमालयी कफीलाई व्यवहार्य बनाउँछ।',
  },
  {
    icon: '⊕',
    title: 'Origin Story',
    titleNP: 'उत्पत्ति कथा',
    description:
      'Full farm traceability — farmer name, district, altitude, harvest date — ready for your menu card, chalk board, or website. We write it for you.',
    descriptionNP:
      'पूर्ण फार्म ट्रेसेबिलिटी — किसानको नाम, जिल्ला, उचाइ, फसल मिति — तपाईंको मेनु कार्ड, चकबोर्ड, वा वेबसाइटका लागि तयार।',
  },
  {
    icon: '⊗',
    title: 'Staff Training',
    titleNP: 'कर्मचारी तालिम',
    description:
      'Complimentary barista education sessions covering Himalayan terroir, optimal extraction, and the story of how to sell a premium origin to your guests.',
    descriptionNP:
      'हिमालयी टेरोयर, इष्टतम निष्कर्षण र तपाईंका अतिथिहरूलाई प्रिमियम उत्पत्ति कसरी बेच्ने भन्ने कथा समेटिएको निःशुल्क बरिस्ता शिक्षा सत्रहरू।',
  },
  {
    icon: '◉',
    title: 'Dedicated Support',
    titleNP: 'समर्पित समर्थन',
    description:
      'A personal account manager who knows your café, your customers, and your volume cycle. Direct line, real human, no ticket queue.',
    descriptionNP:
      'एक व्यक्तिगत खाता प्रबन्धक जसले तपाईंको क्याफे, तपाईंका ग्राहकहरू र तपाईंको भोल्युम चक्र जान्दछन्।',
  },
];

const PRICING_TIERS: PricingTier[] = [
  {
    name: 'Starter',
    nameNP: 'प्रारम्भिक',
    volume: '5 – 20 kg / month',
    features: [
      'Standard roast profile selection',
      'Fortnightly or monthly delivery',
      'Origin story card (digital)',
      'HIMA BEANS point-of-sale assets',
      'Email support',
    ],
    cta: 'Enquire as Starter',
    ctaNP: 'प्रारम्भिकको रूपमा सोधपुछ गर्नुहोस्',
    highlighted: false,
  },
  {
    name: 'Professional',
    nameNP: 'व्यावसायिक',
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
    ctaNP: 'व्यावसायिकको रूपमा सोधपुछ गर्नुहोस्',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    nameNP: 'उद्यम',
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
    ctaNP: 'उद्यमको रूपमा सोधपुछ गर्नुहोस्',
    highlighted: false,
  },
];

const FAQS: FAQ[] = [
  {
    question: 'What is the minimum order quantity (MOQ)?',
    questionNP: 'न्यूनतम अर्डर मात्रा (MOQ) के हो?',
    answer:
      'Our minimum opening order is 5 kg. After your first order, ongoing minimums apply per your pricing tier — 5 kg/month for Starter, 20 kg/month for Professional, and 100 kg/month for Enterprise. We\'re flexible with seasonal adjustments and will never leave you over-stocked.',
    answerNP:
      'हाम्रो न्यूनतम प्रारम्भिक अर्डर ५ किलोग्राम हो।',
  },
  {
    question: 'How long does shipping take from Nepal to Australia?',
    questionNP: 'नेपालबाट अस्ट्रेलियासम्म ढुवानीमा कति समय लाग्छ?',
    answer:
      'For retail orders, we ship air freight from Kathmandu with a standard lead time of 7–10 business days to your door. Wholesale Professional and Enterprise accounts on sea freight can expect 4–6 weeks lead time with advance scheduling — we plan seasonal allocations with you 8–12 weeks ahead.',
    answerNP:
      'खुद्रा अर्डरहरूका लागि, हामी काठमाडौंबाट हवाई मालवाहनमा ७–१० व्यापार दिनको मानक लिड समयसहित ढुवानी गर्छौं।',
  },
  {
    question: 'Can I get a custom roast profile?',
    questionNP: 'के म कस्टम रोस्ट प्रोफाइल पाउन सक्छु?',
    answer:
      'Absolutely — custom roasting is available from the Professional tier upwards. Our head roaster will schedule a discovery session with you or your head barista to understand your target extraction, grind setting, and preferred cup profile. We\'ll send you 3 trial roast samples before locking in your profile.',
    answerNP:
      'बिल्कुल — कस्टम रोस्टिङ व्यावसायिक स्तरदेखि माथि उपलब्ध छ।',
  },
  {
    question: 'Do you offer white-label or private label packaging?',
    questionNP: 'के तपाईं व्हाइट-लेबल वा प्राइभेट लेबल प्याकेजिङ प्रदान गर्नुहुन्छ?',
    answer:
      'Enterprise partners have access to full custom label design and white-label packaging. Your brand, our beans. We work with a sustainable packaging supplier who can match our kraft board and soy-ink spec to your branding. Minimum label run applies (typically 500 units). Contact us to discuss.',
    answerNP:
      'उद्यम साझेदारहरूले पूर्ण कस्टम लेबल डिजाइन र व्हाइट-लेबल प्याकेजिङमा पहुँच पाउँछन्।',
  },
  {
    question: 'What support do you offer for menu integration and staff training?',
    questionNP: 'मेनु एकीकरण र कर्मचारी तालिमका लागि तपाईं कस्तो समर्थन प्रदान गर्नुहुन्छ?',
    answer:
      'All partners receive our digital Origin Story Kit, which includes menu-ready copy, tasting notes, farm photography, and a QR-code trail your guests can scan. Starter partners get one complimentary virtual training session annually. Professional and Enterprise partners receive on-site barista training at your venue — we cover the travel.',
    answerNP:
      'सबै साझेदारहरूले हाम्रो डिजिटल ओरिजिन स्टोरी किट प्राप्त गर्छन्, जसमा मेनु-तयार प्रति, स्वाद नोटहरू र फार्म फोटोग्राफी समावेश छ।',
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

function BenefitCard({ benefit, index, lang }: { benefit: Benefit; index: number; lang: 'EN' | 'NP' }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 1, 0.5, 1] as [number,number,number,number] }}
      className="bg-[#D9DFDC] p-5 sm:p-8 flex flex-col gap-4 group hover:bg-[#1F4D4F] transition-colors duration-300"
    >
      <div
        className="w-10 h-10 flex items-center justify-center text-lg transition-colors duration-300"
        style={{ backgroundColor: 'rgba(26,46,47,0.06)', color: '#D4A55A' }}
      >
        {benefit.icon}
      </div>
      <h3 className="font-serif text-xl text-[#1F4D4F] font-semibold group-hover:text-[#F6F1E9] transition-colors duration-300">
        {lang === 'NP' ? benefit.titleNP : benefit.title}
      </h3>
      <p className="font-sans text-sm text-[#6B7F7E] leading-relaxed group-hover:text-[#D9DFDC] transition-colors duration-300">
        {lang === 'NP' ? benefit.descriptionNP : benefit.description}
      </p>
    </motion.div>
  );
}

function PricingCard({ tier, index, lang }: { tier: PricingTier; index: number; lang: 'EN' | 'NP' }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.25, 1, 0.5, 1] as [number,number,number,number] }}
      className={`overflow-hidden flex flex-col ${
        tier.highlighted
          ? 'shadow-xl shadow-[#1F4D4F]/15 ring-1 ring-[#D4A55A]/60 md:scale-[1.02]'
          : 'border border-[rgba(26,46,47,0.1)]'
      }`}
      style={{
        backgroundColor: tier.highlighted ? '#1F4D4F' : '#FFFFFF',
      }}
    >
      {/* Header */}
      <div
        className="px-5 sm:px-8 pt-6 sm:pt-8 pb-5 sm:pb-6 relative"
        style={{
          borderBottom: `1px solid ${tier.highlighted ? '#2B4A4C' : '#D9DFDC'}`,
        }}
      >
        {tier.badge && (
          <span
            className="absolute top-6 right-6 text-xs font-sans font-semibold px-3 py-1 rounded-full"
            style={{ backgroundColor: '#D4A55A', color: '#F6F1E9' }}
          >
            {tier.badge}
          </span>
        )}
        <p
          className="font-sans text-xs font-semibold tracking-[0.2em] uppercase mb-2"
          style={{ color: '#D4A55A' }}
        >
          {lang === 'NP' ? tier.nameNP : tier.name}
        </p>
        <p
          className="font-serif text-2xl font-bold"
          style={{ color: tier.highlighted ? '#F6F1E9' : '#1F4D4F' }}
        >
          {tier.volume}
        </p>
      </div>

      {/* Features */}
      <div className="px-5 sm:px-8 py-5 sm:py-6 flex-1">
        <ul className="space-y-3">
          {tier.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <span className="mt-0.5 text-[#D4A55A] text-sm leading-none">✓</span>
              <span
                className="font-sans text-sm leading-relaxed"
                style={{ color: tier.highlighted ? '#D9DFDC' : '#6B7F7E' }}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="px-5 sm:px-8 pb-5 sm:pb-8">
        <a
          href="#inquiry"
          className="flex items-center justify-center gap-2 w-full py-3.5 font-sans font-semibold text-[11px] tracking-[0.18em] uppercase transition-all duration-300 hover:opacity-80"
          style={
            tier.highlighted
              ? { backgroundColor: '#D4A55A', color: '#F6F1E9' }
              : { backgroundColor: '#1F4D4F', color: '#F6F1E9' }
          }
        >
          {lang === 'NP' ? tier.ctaNP : tier.cta}
        </a>
      </div>
    </motion.div>
  );
}

function FAQItem({ faq, index, lang }: { faq: FAQ; index: number; lang: 'EN' | 'NP' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 1, 0.5, 1] as [number,number,number,number] }}
      className="border-b border-[rgba(26,46,47,0.08)] last:border-0"
    >
      <button
        className="w-full flex items-center justify-between gap-4 sm:gap-6 py-5 sm:py-6 text-left group min-h-[56px]"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="font-serif text-lg text-[#1F4D4F] font-semibold group-hover:text-[#D4A55A] transition-colors duration-200">
          {lang === 'NP' ? faq.questionNP : faq.question}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0 w-7 h-7 rounded-full border border-[#D9DFDC] flex items-center justify-center text-[#D4A55A] font-bold text-lg"
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
            <p className="font-sans text-sm text-[#6B7F7E] leading-relaxed pb-6 max-w-3xl">
              {lang === 'NP' ? faq.answerNP : faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function WholesaleForm({ lang }: { lang: 'EN' | 'NP' }) {
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
    'w-full px-0 py-3 bg-transparent border-0 border-b font-sans text-sm text-[#1F4D4F] placeholder:text-[#6B7F7E]/50 focus:outline-none transition-all duration-200'
    + ' border-[rgba(26,46,47,0.15)] focus:border-[#D4A55A]';

  const labelClass = 'block font-sans text-xs font-semibold text-[#6B7F7E] tracking-wider uppercase mb-1.5';

  const t = {
    successHeading: lang === 'NP' ? 'सोधपुछ प्राप्त भयो' : 'Enquiry Received',
    successBody: lang === 'NP'
      ? 'सम्पर्क गर्नुभएकोमा धन्यवाद। तपाईंको समर्पित खाता प्रबन्धक साझेदारी छलफल गर्न एक व्यापार दिनभित्र सम्पर्क गर्नेछन्।'
      : 'Thank you for reaching out. Your dedicated account manager will be in touch within one business day to discuss your partnership.',
    labelBusiness: lang === 'NP' ? 'व्यवसायको नाम *' : 'Business Name *',
    placeholderBusiness: lang === 'NP' ? 'तपाईंको क्याफे वा कम्पनी' : 'Your Café or Company',
    labelContact: lang === 'NP' ? 'सम्पर्क व्यक्ति *' : 'Contact Person *',
    placeholderContact: lang === 'NP' ? 'पूरा नाम' : 'Full name',
    labelEmail: lang === 'NP' ? 'इमेल ठेगाना *' : 'Email Address *',
    labelPhone: lang === 'NP' ? 'फोन नम्बर' : 'Phone Number',
    labelVolume: lang === 'NP' ? 'मासिक मात्रा *' : 'Monthly Volume *',
    placeholderVolume: lang === 'NP' ? 'आफ्नो मात्रा छान्नुहोस्' : 'Select your volume',
    labelRoast: lang === 'NP' ? 'रोस्ट प्राथमिकता' : 'Roast Preference',
    placeholderRoast: lang === 'NP' ? 'रोस्ट प्राथमिकता छान्नुहोस्' : 'Select a roast preference',
    labelMessage: lang === 'NP' ? 'सन्देश' : 'Message',
    placeholderMessage: lang === 'NP'
      ? 'तपाईंको क्याफे, वर्तमान कफी कार्यक्रम र कुनै विशेष आवश्यकताहरूको बारेमा बताउनुहोस्...'
      : 'Tell us about your café, your current coffee program, and any specific requirements...',
    submitBtn: lang === 'NP' ? 'सोधपुछ पेश गर्नुहोस्' : 'Submit Enquiry',
    sending: lang === 'NP' ? 'पठाउँदै...' : 'Sending...',
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16 px-8"
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-6"
          style={{ backgroundColor: '#D4A55A', color: '#F6F1E9' }}
        >
          ✓
        </div>
        <h3 className="font-serif text-3xl text-[#1F4D4F] font-bold mb-4">{t.successHeading}</h3>
        <p className="font-sans text-[#6B7F7E] text-base leading-relaxed max-w-md mx-auto">
          {t.successBody}
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
          {t.labelBusiness}
        </label>
        <input
          id="businessName"
          name="businessName"
          type="text"
          required
          placeholder={t.placeholderBusiness}
          value={formData.businessName}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="contactPerson" className={labelClass}>
          {t.labelContact}
        </label>
        <input
          id="contactPerson"
          name="contactPerson"
          type="text"
          required
          placeholder={t.placeholderContact}
          value={formData.contactPerson}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          {t.labelEmail}
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
          {t.labelPhone}
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
          {t.labelVolume}
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
            {t.placeholderVolume}
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
          {t.labelRoast}
        </label>
        <select
          id="roastPreference"
          name="roastPreference"
          value={formData.roastPreference}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">{t.placeholderRoast}</option>
          {ROAST_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className="md:col-span-2">
        <label htmlFor="message" className={labelClass}>
          {t.labelMessage}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder={t.placeholderMessage}
          value={formData.message}
          onChange={handleChange}
          className={`${inputClass} resize-none`}
        />
      </div>

      <div className="md:col-span-2 flex justify-stretch sm:justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 font-sans font-semibold text-[11px] tracking-[0.18em] uppercase transition-all duration-300 hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ backgroundColor: '#1F4D4F', color: '#F6F1E9' }}
        >
          {submitting ? (
            <>
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                className="inline-block w-4 h-4 border-2 border-[#F6F1E9] border-t-transparent rounded-full"
              />
              {t.sending}
            </>
          ) : (
            <>
              {t.submitBtn}
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
  const { lang } = useLang();
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const partnersRef = useRef<HTMLDivElement>(null);
  const partnersInView = useInView(partnersRef, { once: true, margin: '-60px' });

  const t = {
    heroEyebrow: lang === 'NP' ? 'थोक साझेदारी' : 'Wholesale Partnerships',
    heroH1: lang === 'NP' ? 'सँग साझेदारी गर्नुहोस्' : 'Partner With',
    heroH1Em: lang === 'NP' ? 'नेपालको सर्वोत्तमसँग' : "Nepal's Finest",
    heroBody: lang === 'NP'
      ? 'तपाईंको अस्ट्रेलियाली क्याफेमा संसारको सबैभन्दा आकर्षक विशेष उत्पत्ति ल्याउनुहोस्।'
      : "Bring the world's most compelling specialty origin to your Australian café. We offer more than great coffee — we offer a complete partnership built for long-term success.",
    heroCta: lang === 'NP' ? 'साझेदारी सुरु गर्नुहोस्' : 'Start Partnering',
    benefitsEyebrow: lang === 'NP' ? 'हामीसँग साझेदारी किन?' : 'Why Partner With Us',
    benefitsHeading: lang === 'NP' ? 'तपाईंको क्याफेलाई चाहिने सबै कुरा' : 'Everything Your Café Needs',
    partnersEyebrow: lang === 'NP' ? 'विश्वास गरिएका' : 'Trusted By',
    partnersHeading: lang === 'NP' ? '५०+ अस्ट्रेलियाली क्याफे साझेदारहरू' : '50+ Australian Café Partners',
    partnersBody: lang === 'NP'
      ? 'मेलबर्न गल्लीहरूदेखि सिड्नी छतहरू र ब्रिस्बेन नदी किनारसम्म — HIMA BEANS अस्ट्रेलियाभर सेवा गर्दैछ।'
      : 'From Melbourne laneways to Sydney rooftops and Brisbane riverside — HIMA BEANS is pouring across Australia.',
    pricingEyebrow: lang === 'NP' ? 'मूल्य निर्धारण र स्तरहरू' : 'Pricing & Tiers',
    pricingHeading: lang === 'NP' ? 'आफ्नो साझेदारी स्तर खोज्नुहोस्' : 'Find Your Partnership Level',
    pricingBody: lang === 'NP'
      ? 'सबै स्तरहरूमा हाम्रा हिमालयी एकल-उत्पत्ति लटहरूको पूर्ण दायरामा पहुँच समावेश छ।'
      : 'All tiers include access to our full range of Himalayan single-origin lots. Pricing shared on inquiry.',
    formEyebrow: lang === 'NP' ? 'सम्पर्कमा आउनुहोस्' : 'Get in Touch',
    formHeading: lang === 'NP' ? 'थोक सोधपुछ' : 'Wholesale Enquiry',
    formBody: lang === 'NP'
      ? 'तलको फारम भर्नुहोस् र तपाईंको समर्पित खाता प्रबन्धक एक व्यापार दिनभित्र सम्पर्क गर्नेछन्।'
      : 'Fill in the form below and your dedicated account manager will contact you within one business day.',
    faqEyebrow: lang === 'NP' ? 'सामान्य प्रश्नहरू' : 'Common Questions',
    faqHeading: lang === 'NP' ? 'बारम्बार सोधिने प्रश्न' : 'FAQ',
    contactEyebrow: lang === 'NP' ? 'प्रत्यक्ष सम्पर्क' : 'Direct Contact',
    contactHeading: lang === 'NP' ? 'कफीको कुरा गरौं' : "Let's Talk Coffee",
    contactBody: lang === 'NP'
      ? 'फारम भर्नुअघि कुरा गर्न चाहनुहुन्छ? हामीलाई सिधै सम्पर्क गर्नुहोस् — हामी कफी, उत्पत्ति र तपाईंको क्याफे कसरी अलग्याउने भन्ने कुरा गर्न रमाइलो मान्छौं।'
      : "Prefer to talk before filling in a form? Reach us directly — we love talking coffee, origin, and how we can make your café stand out.",
    contactLabelWholesale: lang === 'NP' ? 'थोक सोधपुछहरू' : 'Wholesale Enquiries',
    contactLabelPhone: lang === 'NP' ? 'फोन' : 'Phone',
    contactLabelOffice: lang === 'NP' ? 'प्रमुख कार्यालय' : 'Head Office',
    finalHeading: lang === 'NP'
      ? 'आफ्ना ग्राहकहरूकहाँ हिमालय ल्याउन तयार हुनुहुन्छ?'
      : 'Ready to Bring the Himalayas to Your Customers?',
    finalBody: lang === 'NP'
      ? 'माथिको सोधपुछ फारम भर्नुहोस् वा हामीलाई सिधै सम्पर्क गर्नुहोस् — तपाईंको समर्पित साझेदार प्रबन्धक एक व्यापार दिनभित्र सम्पर्क गर्नेछन्।'
      : 'Fill in the enquiry form above or reach us directly — your dedicated partner manager will be in touch within one business day.',
    finalBtn1: lang === 'NP' ? 'आफ्नो सोधपुछ सुरु गर्नुहोस्' : 'Start Your Enquiry',
    finalBtn2: lang === 'NP' ? 'दिगो कथा' : 'Sustainability Story',
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen" style={{ backgroundColor: '#F6F1E9' }}>
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative min-h-[65vh] sm:min-h-[75vh] flex items-end pb-16 sm:pb-20 md:pb-24 pt-28 sm:pt-0 overflow-hidden"
        style={{ backgroundColor: '#1F4D4F' }}
      >
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 75% 40%, #D4A55A 0%, transparent 55%), radial-gradient(circle at 15% 70%, #6B7F7E 0%, transparent 50%)',
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
        <div className="absolute top-1/2 left-0 right-0 h-px bg-[#D4A55A] opacity-20" />

        <div className="relative z-10 site-container w-full">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-sans text-sm font-semibold tracking-[0.2em] uppercase mb-6"
          style={{ color: 'rgba(217,223,220,0.45)' }}
          >
            {t.heroEyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 1, 0.5, 1] as [number,number,number,number] }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#F6F1E9] font-bold leading-[0.95] mb-8"
          >
            {t.heroH1}
            <br />
            <em className="text-[#D9DFDC]">{t.heroH1Em}</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-sans text-[#D9DFDC] text-lg max-w-xl leading-relaxed mb-10"
          >
            {t.heroBody}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <a
              href="#inquiry"
              className="inline-flex items-center gap-3 px-8 py-4 font-sans font-semibold text-[11px] tracking-[0.18em] uppercase transition-all duration-300 hover:opacity-80"
              style={{ backgroundColor: '#D9DFDC', color: '#1F4D4F' }}
            >
              {t.heroCta}
              <span>→</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Partner Benefits ── */}
      <section className="py-12 sm:py-16 md:py-24 site-container">
        <div className="text-center mb-10 md:mb-14">
          <p className="font-sans text-[#D4A55A] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            {t.benefitsEyebrow}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#1F4D4F] font-bold leading-tight">
            {t.benefitsHeading}
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((benefit, i) => (
            <BenefitCard key={benefit.title} benefit={benefit} index={i} lang={lang} />
          ))}
        </div>
      </section>

      {/* ── Partner Logos ── */}
      <section
        ref={partnersRef}
        className="py-16"
        style={{ backgroundColor: '#1F4D4F' }}
      >
        <div className="site-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={partnersInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] as [number,number,number,number] }}
            className="text-center"
          >
            <p className="font-sans text-sm font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: 'rgba(217,223,220,0.45)' }}>
              {t.partnersEyebrow}
            </p>
            <h2 className="font-serif text-3xl text-[#F6F1E9] font-bold mb-3">
              {t.partnersHeading}
            </h2>
            <p className="font-sans text-base mb-12" style={{ color: 'rgba(217,223,220,0.5)' }}>
              {t.partnersBody}
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
                  style={{ backgroundColor: '#1E4042' }}
                >
                  <span className="font-sans text-xs text-[#6B7F7E] font-medium">
                    Café {String.fromCharCode(65 + i)}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Pricing Tiers ── */}
      <section className="py-12 sm:py-16 md:py-24 site-container">
        <div className="text-center mb-10 md:mb-14">
          <p className="font-sans text-[#D4A55A] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            {t.pricingEyebrow}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#1F4D4F] font-bold leading-tight mb-4">
            {t.pricingHeading}
          </h2>
          <p className="font-sans text-[#6B7F7E] text-base max-w-lg mx-auto leading-relaxed">
            {t.pricingBody}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {PRICING_TIERS.map((tier, i) => (
            <PricingCard key={tier.name} tier={tier} index={i} lang={lang} />
          ))}
        </div>
      </section>

      {/* ── Wholesale Inquiry Form ── */}
      <section
        id="inquiry"
        className="py-12 sm:py-16 md:py-24"
        style={{ backgroundColor: '#F6F1E9' }}
      >
        <div className="site-container">
          <div className="text-center mb-14 max-w-xl mx-auto">
            <p className="font-sans text-[#D4A55A] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
              {t.formEyebrow}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#1F4D4F] font-bold leading-tight mb-4">
              {t.formHeading}
            </h2>
            <p className="font-sans text-[#6B7F7E] text-base leading-relaxed">
              {t.formBody}
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <WholesaleForm lang={lang} />
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-12 sm:py-16 md:py-24" style={{ backgroundColor: '#D9DFDC' }}>
        <div className="site-container">
          <div className="text-center mb-10 md:mb-14 max-w-xl mx-auto">
            <p className="font-sans text-[#D4A55A] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
              {t.faqEyebrow}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#1F4D4F] font-bold leading-tight">
              {t.faqHeading}
            </h2>
          </div>
          <div className="max-w-3xl mx-auto divide-y divide-[rgba(26,46,47,0.08)]">
            {FAQS.map((faq, i) => (
              <FAQItem key={faq.question} faq={faq} index={i} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section
        className="py-12 sm:py-16 md:py-24"
        style={{ backgroundColor: '#1F4D4F' }}
      >
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <p className="font-sans text-sm font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: 'rgba(217,223,220,0.45)' }}>
                {t.contactEyebrow}
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-[#F6F1E9] font-bold leading-tight mb-6">
                {t.contactHeading}
              </h2>
              <p className="font-sans text-[#D9DFDC] text-base leading-relaxed">
                {t.contactBody}
              </p>
            </div>
            <div className="space-y-6">
              {[
                {
                  label: t.contactLabelWholesale,
                  value: 'wholesale@himabeans.com.au',
                  href: 'mailto:wholesale@himabeans.com.au',
                },
                {
                  label: t.contactLabelPhone,
                  value: '+61 3 9xxx xxxx',
                  href: 'tel:+61390000000',
                },
                {
                  label: t.contactLabelOffice,
                  value: 'Melbourne, VIC, Australia',
                  href: null,
                },
              ].map((contact) => (
                <div
                  key={contact.label}
                  className="flex flex-col gap-1 py-5 border-b"
                  style={{ borderColor: 'rgba(217,223,220,0.08)' }}
                >
                  <p className="font-sans text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: 'rgba(217,223,220,0.4)' }}>
                    {contact.label}
                  </p>
                  {contact.href ? (
                    <a
                      href={contact.href}
                      className="font-serif text-xl text-[#F6F1E9] transition-opacity duration-200 hover:opacity-70"
                    >
                      {contact.value}
                    </a>
                  ) : (
                    <p className="font-serif text-xl text-[#F6F1E9]">{contact.value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section
        className="section-gap"
        style={{ backgroundColor: '#F6F1E9' }}
      >
        <div className="site-container">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-end">
            <div>
              <div className="w-8 h-px mb-6" style={{ backgroundColor: '#D4A55A' }} />
              <h2 className="font-serif text-3xl md:text-4xl text-[#1F4D4F] font-bold leading-tight mb-5">
                {t.finalHeading}
              </h2>
              <p className="font-sans text-base leading-relaxed" style={{ color: '#6B7F7E' }}>
                {t.finalBody}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#inquiry"
                className="inline-flex items-center gap-3 px-7 py-3.5 font-sans font-semibold text-[11px] tracking-[0.18em] uppercase transition-all duration-300 hover:opacity-80"
                style={{ backgroundColor: '#1F4D4F', color: '#F6F1E9' }}
              >
                {t.finalBtn1}
                <span>→</span>
              </a>
              <Link
                href="/sustainability"
                className="inline-flex items-center gap-3 px-7 py-3.5 font-sans font-semibold text-[11px] tracking-[0.18em] uppercase border transition-all duration-300 hover:border-[#1F4D4F]"
                style={{ borderColor: 'rgba(26,46,47,0.2)', color: '#1F4D4F' }}
              >
                {t.finalBtn2}
              </Link>
            </div>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}
