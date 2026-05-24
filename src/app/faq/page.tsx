'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Metadata } from 'next';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

/* ─────────────────────────────────────────────────────────────────────────────
   Types & Data
───────────────────────────────────────────────────────────────────────────── */

type Category = 'About Our Coffee' | 'Ordering & Shipping' | 'Wholesale' | 'Sustainability';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_DATA: Record<Category, FAQItem[]> = {
  'About Our Coffee': [
    {
      question: 'Where is your coffee sourced?',
      answer:
        'All HIMA BEANS coffee is single-origin, sourced directly from small family farms across Nepal\'s Himalayan growing regions — primarily Gulmi, Palpa, Syangja, Kavre, Nuwakot, and Lalitpur. We have direct trade relationships with each farm and visit origin at least twice annually.',
    },
    {
      question: 'What makes Nepali coffee special?',
      answer:
        'Nepal\'s Himalayan altitude (1,000–2,100m) creates exceptional growing conditions. The cool air slows cherry maturation, concentrating sugars and building complex flavour structures impossible at lower altitudes. The result: a cup with floral aromatics, dark chocolate body, citrus brightness, and almost no bitterness. Nepal is one of specialty coffee\'s most exciting emerging origins.',
    },
    {
      question: 'What roast profiles do you offer?',
      answer:
        'We offer Light, Medium-Light, Medium, and Dark roast profiles depending on the bean. Each origin is roasted to bring out its natural character — our Gulmi beans shine at light roast for their floral clarity, while our Syangja honey-process beans are developed darker to unlock their cocoa depth.',
    },
    {
      question: 'Are your beans single origin?',
      answer:
        'Most of our range is single-origin, traceable to a specific farm and harvest lot. We also offer a carefully crafted Heritage Blend that combines beans from multiple regions for a balanced, approachable everyday cup without sacrificing quality.',
    },
    {
      question: 'What certifications do you have?',
      answer:
        'Our supply chain is audited annually for fair trade compliance, and we are working towards formal Rainforest Alliance and Fair Trade certification. All our farming partners are independently verified for sustainable practices, and we publish full traceability reports for each harvest lot.',
    },
  ],
  'Ordering & Shipping': [
    {
      question: 'Do you ship across Australia?',
      answer:
        'Yes — we ship to all Australian states and territories. Standard shipping is via Australia Post eParcel, and express options are available at checkout. We use specialty coffee packaging with one-way degassing valves to preserve freshness during transit.',
    },
    {
      question: 'What are shipping times?',
      answer:
        'Standard shipping typically takes 3–7 business days depending on your location. Express shipping is 1–3 business days. We roast to order on Tuesdays and Fridays, so your beans arrive at peak freshness — usually within 3–10 days of roasting.',
    },
    {
      question: 'Do you offer subscriptions?',
      answer:
        'Yes — our subscription program is one of our most popular offerings. Choose your preferred bean, grind size, quantity, and frequency (weekly, fortnightly, or monthly). Subscribers receive 10% off every order and are first to access limited seasonal lots. You can pause, skip, or cancel any time.',
    },
    {
      question: "What's your minimum order?",
      answer:
        'For retail orders, there is no minimum — you can order a single 250g bag. For wholesale accounts, minimum order quantities apply depending on your tier (see Wholesale page for details).',
    },
    {
      question: 'What is your returns policy?',
      answer:
        'If you\'re not completely satisfied with your purchase, contact us within 14 days and we\'ll offer a replacement or full refund — no questions asked. Coffee is a sensory product and we stand behind every bag we ship.',
    },
  ],
  'Wholesale': [
    {
      question: 'What is the minimum order quantity for wholesale?',
      answer:
        'Wholesale accounts start from 5kg per order. Our Starter tier covers 5–20kg/month, Professional 20–100kg/month, and Enterprise 100kg+. All wholesale pricing is available on our Wholesale page or by contacting our team directly.',
    },
    {
      question: 'Can we get custom roasting?',
      answer:
        'Absolutely. Professional and Enterprise accounts can work with our roaster to develop bespoke roast profiles that match their café\'s house style. We also offer custom label packaging for Enterprise partners — your brand, our beans.',
    },
    {
      question: 'What is the lead time from Nepal?',
      answer:
        'We maintain a 3–6 month buffer of green bean inventory in our Melbourne facility, so you\'re ordering from stock that\'s already in Australia. Fresh lots typically arrive from Nepal twice per year. Roasted-to-order turnaround is 2–3 business days for wholesale orders.',
    },
    {
      question: 'Do you offer exclusivity arrangements?',
      answer:
        'For Enterprise accounts, we can discuss geographic exclusivity arrangements for specific single-origin lots. This means no other café in your postcode area will carry that particular bean. Contact us to discuss what\'s possible.',
    },
    {
      question: 'How does wholesale pricing work?',
      answer:
        'Wholesale pricing is tiered by volume — the more you order, the better the per-kg rate. We offer 30-day payment terms for established accounts. Pricing is available on our Wholesale page or by requesting a quote from our team.',
    },
  ],
  'Sustainability': [
    {
      question: 'Are your beans ethically sourced?',
      answer:
        'Ethical sourcing is the foundation of everything we do. We pay a significant premium above commodity and Fair Trade floor prices directly to farmers, bypassing unnecessary intermediaries. Every farming partner is visited in person and every transaction is documented.',
    },
    {
      question: 'How are farmers compensated?',
      answer:
        'Farmers receive a direct premium of 40–60% above commodity price. We also invest in community infrastructure — water access, processing equipment, and educational resources — as part of our long-term farm partnership model. Farmer wellbeing is a business priority, not an afterthought.',
    },
    {
      question: 'What is your environmental impact?',
      answer:
        'Our coffee is shade-grown under native forest canopy, which preserves biodiversity and prevents soil erosion. We use fully recyclable and compostable packaging. Our Melbourne operations run on 100% green electricity, and we carbon-offset all international freight.',
    },
    {
      question: 'Is your packaging recyclable?',
      answer:
        'Yes. Our retail bags are made from kraft paper with a compostable inner liner. The one-way degassing valve is also compostable. Wholesale packaging uses reusable grain bags. We\'re committed to eliminating all virgin plastic from our supply chain by 2026.',
    },
    {
      question: 'How do you verify fair trade practices?',
      answer:
        'Beyond third-party certification, we conduct annual on-site audits of every partner farm. We document labour practices, wage levels, and working conditions. Our full sustainability report — including farm-level data — is published each year on our website and available to wholesale partners.',
    },
  ],
};

const CATEGORIES = Object.keys(FAQ_DATA) as Category[];

/* ─────────────────────────────────────────────────────────────────────────────
   Accordion Item
───────────────────────────────────────────────────────────────────────────── */

function AccordionItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
      style={{ borderBottom: '1px solid rgba(59,42,33,0.1)' }}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          padding: '1.25rem 0',
          background: 'none',
          border: 'none',
          textAlign: 'left',
          cursor: 'pointer',
          gap: '1rem',
          minHeight: '56px',
        }}
      >
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
            color: '#3B2A21',
            fontWeight: 600,
            lineHeight: 1.4,
            flex: 1,
          }}
        >
          {item.question}
        </span>

        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            border: '1.5px solid #B08D57',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            marginTop: '2px',
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M5 1V9M1 5H9" stroke="#B08D57" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
            style={{ overflow: 'hidden' }}
          >
            <p
              style={{
                paddingBottom: '1.5rem',
                color: '#8C8477',
                lineHeight: 1.8,
                fontSize: '0.95rem',
                fontFamily: 'var(--font-inter), Inter, sans-serif',
                maxWidth: '680px',
              }}
            >
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────────────────────────── */

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('About Our Coffee');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleCategoryChange = (cat: Category) => {
    setActiveCategory(cat);
    setOpenIndex(null);
  };

  const handleToggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <>
      <Navigation />

      <main style={{ background: '#F5EFE6', minHeight: '100vh' }}>
        {/* Hero */}
        <section style={{ background: '#3B2A21', padding: 'clamp(5rem, 10vw, 8rem) 0 clamp(3rem, 6vw, 5rem)', position: 'relative', overflow: 'hidden' }}>
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(176,141,87,0.08) 0%, transparent 70%)',
            }}
          />
          <div className="max-w-3xl mx-auto px-[clamp(1.25rem,5vw,3rem)] text-center relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#B08D57', fontFamily: 'var(--font-inter), Inter, sans-serif', marginBottom: '1rem' }}
            >
              Help & Support
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(36px, 6vw, 72px)',
                fontWeight: 700,
                color: '#F5EFE6',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                marginBottom: '1.25rem',
              }}
            >
              Frequently Asked Questions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              style={{ color: 'rgba(245,239,230,0.65)', fontSize: '1.05rem', lineHeight: 1.7, fontFamily: 'var(--font-inter), Inter, sans-serif' }}
            >
              Everything you need to know about HIMA BEANS — from sourcing to shipping.
            </motion.p>
          </div>
        </section>

        {/* Content */}
        <section style={{ padding: 'clamp(2.5rem, 5vw, 5rem) 0 clamp(4rem, 8vw, 8rem)' }}>
          <div className="max-w-3xl mx-auto px-[clamp(1.25rem,5vw,3rem)]">
            {/* Category tabs */}
            <div
              style={{
                display: 'flex',
                gap: '0.25rem',
                flexWrap: 'wrap',
                marginBottom: '2rem',
                borderBottom: '1px solid rgba(59,42,33,0.1)',
                paddingBottom: '0',
                overflowX: 'auto',
              }}
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  style={{
                    padding: '0.875rem 1rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '13px',
                    letterSpacing: '0.05em',
                    fontFamily: 'var(--font-inter), Inter, sans-serif',
                    fontWeight: activeCategory === cat ? 600 : 400,
                    color: activeCategory === cat ? '#3B2A21' : '#8C8477',
                    borderBottom: activeCategory === cat ? '2px solid #B08D57' : '2px solid transparent',
                    transition: 'all 0.2s ease',
                    marginBottom: '-1px',
                    whiteSpace: 'nowrap',
                    minHeight: '44px',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* FAQ items */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
              >
                {FAQ_DATA[activeCategory].map((item, i) => (
                  <AccordionItem
                    key={i}
                    item={item}
                    index={i}
                    isOpen={openIndex === i}
                    onToggle={() => handleToggle(i)}
                  />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Still have questions? */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                marginTop: 'clamp(2.5rem, 5vw, 5rem)',
                padding: 'clamp(1.5rem, 4vw, 3rem)',
                background: '#3B2A21',
                borderRadius: '2px',
                textAlign: 'center',
              }}
            >
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: '#F5EFE6', marginBottom: '0.75rem', fontWeight: 600 }}>
                Still have questions?
              </h3>
              <p style={{ color: 'rgba(245,239,230,0.65)', fontFamily: 'var(--font-inter), Inter, sans-serif', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                Our team is always happy to help. Reach out and we'll get back to you within one business day.
              </p>
              <a
                href="/contact"
                style={{
                  display: 'inline-block',
                  padding: '0.8rem 2rem',
                  background: '#B08D57',
                  color: '#1a0f09',
                  borderRadius: '2px',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                  transition: 'background 0.2s ease',
                }}
              >
                Contact Us
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
