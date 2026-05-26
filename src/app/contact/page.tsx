'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { useLang } from '@/context/lang';

/* ─────────────────────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────────────────────── */

type Subject = 'General Inquiry' | 'Wholesale' | 'Media' | 'Careers' | 'Other';

interface FormState {
  name: string;
  email: string;
  subject: Subject;
  message: string;
}

const SUBJECTS: Subject[] = ['General Inquiry', 'Wholesale', 'Media', 'Careers', 'Other'];

/* ─────────────────────────────────────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────────────────────────────────── */

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.9rem 1.1rem',
  background: 'rgba(31,77,79,0.06)',
  border: '1px solid rgba(31,77,79,0.15)',
  borderRadius: '2px',
  fontSize: '0.9rem',
  color: '#1F4D4F',
  fontFamily: 'var(--font-inter), Inter, sans-serif',
  outline: 'none',
  transition: 'border-color 0.2s ease',
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        style={{
          display: 'block',
          fontSize: '11px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#6B7F7E',
          fontFamily: 'var(--font-inter), Inter, sans-serif',
          marginBottom: '0.5rem',
          fontWeight: 500,
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────────────────────────── */

export default function ContactPage() {
  const { lang } = useLang();
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const validate = () => {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = lang === 'EN' ? 'Required' : 'आवश्यक छ';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = lang === 'EN' ? 'Valid email required' : 'मान्य इमेल आवश्यक छ';
    if (!form.message.trim()) e.message = lang === 'EN' ? 'Required' : 'आवश्यक छ';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setSubmitted(true);
  };

  const update = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <>
      <Navigation />

      <main style={{ background: '#F6F1E9', minHeight: '100vh' }}>
        {/* Hero */}
        <section style={{ background: '#1F4D4F', padding: 'clamp(5rem, 10vw, 8rem) 0 clamp(3rem, 6vw, 5rem)', position: 'relative', overflow: 'hidden' }}>
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(212,165,90,0.08) 0%, transparent 70%)',
            }}
          />
          <div className="max-w-3xl mx-auto px-[clamp(1.25rem,5vw,3rem)] relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(217,223,220,0.45)', fontFamily: 'var(--font-inter), Inter, sans-serif', marginBottom: '1rem' }}
            >
              {lang === 'EN' ? 'Reach Out' : 'सम्पर्कमा आउनुहोस्'}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(36px, 6vw, 72px)',
                fontWeight: 700,
                color: '#F6F1E9',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                marginBottom: '1rem',
              }}
            >
              {lang === 'EN' ? 'Get in Touch' : 'कुराकानी सुरु गरौं'}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              style={{ color: 'rgba(217,223,220,0.65)', fontSize: '1.05rem', fontFamily: 'var(--font-inter), Inter, sans-serif', maxWidth: '560px', lineHeight: 1.7 }}
            >
              {lang === 'EN'
                ? 'We source from Nepal, we serve Australia — and we love hearing from curious coffee minds.'
                : 'कफीको बारेमा होस् वा साझेदारीको बारेमा — हामी सुन्न यहाँ छौं।'}
            </motion.p>
          </div>
        </section>

        {/* Main content */}
        <section style={{ padding: 'clamp(3rem, 6vw, 5rem) 0 clamp(4rem, 8vw, 8rem)' }}>
          <div className="site-container">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16">

              {/* ── Form (3/5) ── */}
              <motion.div
                className="lg:col-span-3"
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
              >
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
                    style={{
                      padding: '3rem',
                      background: '#1F4D4F',
                      borderRadius: '2px',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(212,165,90,0.2)', border: '1.5px solid #D4A55A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        <path d="M4 10L8.5 14.5L16 6" stroke="#D4A55A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: '#F6F1E9', marginBottom: '0.75rem' }}>
                      {lang === 'EN' ? 'Message Received' : 'सन्देश प्राप्त भयो'}
                    </h3>
                    <p style={{ color: 'rgba(217,223,220,0.65)', fontFamily: 'var(--font-inter), Inter, sans-serif', lineHeight: 1.7 }}>
                      {lang === 'EN'
                        ? "Thank you for reaching out. We'll be in touch within one business day."
                        : 'सम्पर्क गर्नुभएकोमा धन्यवाद। हामी एक कार्य दिनभित्र सम्पर्कमा आउनेछौं।'}
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label={lang === 'EN' ? 'Full Name' : 'तपाईंको नाम'}>
                          <input
                            type="text"
                            value={form.name}
                            onChange={update('name')}
                            placeholder={lang === 'EN' ? 'Your name' : 'तपाईंको नाम'}
                            style={{
                              ...inputStyle,
                              borderColor: errors.name ? '#c0392b' : 'rgba(31,77,79,0.15)',
                            }}
                          />
                          {errors.name && (
                            <p style={{ color: '#c0392b', fontSize: '11px', marginTop: '0.3rem', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>{errors.name}</p>
                          )}
                        </Field>

                        <Field label={lang === 'EN' ? 'Email Address' : 'इमेल ठेगाना'}>
                          <input
                            type="email"
                            value={form.email}
                            onChange={update('email')}
                            placeholder="your@email.com"
                            style={{
                              ...inputStyle,
                              borderColor: errors.email ? '#c0392b' : 'rgba(31,77,79,0.15)',
                            }}
                          />
                          {errors.email && (
                            <p style={{ color: '#c0392b', fontSize: '11px', marginTop: '0.3rem', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>{errors.email}</p>
                          )}
                        </Field>
                      </div>

                      <Field label={lang === 'EN' ? 'Subject' : 'विषय'}>
                        <select
                          value={form.subject}
                          onChange={update('subject')}
                          style={{ ...inputStyle, appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 7L11 1' stroke='%238C8477' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', paddingRight: '2.5rem', cursor: 'pointer' }}
                        >
                          {SUBJECTS.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </Field>

                      <Field label={lang === 'EN' ? 'Message' : 'सन्देश'}>
                        <textarea
                          value={form.message}
                          onChange={update('message')}
                          placeholder={lang === 'EN' ? "Tell us what's on your mind..." : 'तपाईंको मनमा के छ बताउनुहोस्...'}
                          rows={6}
                          style={{
                            ...inputStyle,
                            resize: 'vertical',
                            minHeight: '140px',
                            borderColor: errors.message ? '#c0392b' : 'rgba(31,77,79,0.15)',
                          }}
                        />
                        {errors.message && (
                          <p style={{ color: '#c0392b', fontSize: '11px', marginTop: '0.3rem', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>{errors.message}</p>
                        )}
                      </Field>

                      <motion.button
                        type="submit"
                        disabled={submitting}
                        whileHover={{ scale: submitting ? 1 : 1.01 }}
                        whileTap={{ scale: submitting ? 1 : 0.98 }}
                        style={{
                          padding: '1rem 2.5rem',
                          background: submitting ? '#6B7F7E' : '#D4A55A',
                          color: '#355E3B',
                          border: 'none',
                          borderRadius: '2px',
                          fontSize: '13px',
                          fontWeight: 600,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          fontFamily: 'var(--font-inter), Inter, sans-serif',
                          cursor: submitting ? 'not-allowed' : 'pointer',
                          alignSelf: 'stretch',
                          transition: 'background 0.2s ease',
                          boxShadow: '0 4px 20px rgba(212,165,90,0.2)',
                        }}
                      >
                        {submitting
                          ? (lang === 'EN' ? 'Sending…' : 'पठाउँदै...')
                          : (lang === 'EN' ? 'Send Message' : 'सन्देश पठाउनुहोस्')}
                      </motion.button>
                    </div>
                  </form>
                )}
              </motion.div>

              {/* ── Info column (2/5) ── */}
              <motion.div
                className="lg:col-span-2"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
                style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
              >
                {/* Contact details */}
                <div>
                  <p style={{ fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#D4A55A', fontFamily: 'var(--font-inter), Inter, sans-serif', marginBottom: '1.5rem' }}>
                    {lang === 'EN' ? 'Contact Details' : 'सम्पर्क विवरण'}
                  </p>

                  {[
                    { label: lang === 'EN' ? 'Email' : 'इमेल', value: 'hello@himabeans.com.au', href: 'mailto:hello@himabeans.com.au' },
                    { label: lang === 'EN' ? 'Phone' : 'फोन', value: '+61 3 9000 0000', href: 'tel:+61390000000' },
                    { label: lang === 'EN' ? 'Address' : 'ठेगाना', value: 'Melbourne, Victoria, Australia', href: undefined },
                  ].map(({ label, value, href }) => (
                    <div key={label} style={{ marginBottom: '1.25rem' }}>
                      <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6B7F7E', fontFamily: 'var(--font-inter), Inter, sans-serif', marginBottom: '0.25rem' }}>
                        {label}
                      </p>
                      {href ? (
                        <a href={href} style={{ fontSize: '0.95rem', color: '#1F4D4F', fontFamily: "'Playfair Display', serif", fontStyle: 'italic', borderBottom: '1px solid rgba(31,77,79,0.2)', paddingBottom: '1px' }}>
                          {value}
                        </a>
                      ) : (
                        <p style={{ fontSize: '0.95rem', color: '#1F4D4F', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>{value}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div style={{ height: '1px', background: 'rgba(31,77,79,0.1)' }} />

                {/* Social links */}
                <div>
                  <p style={{ fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#D4A55A', fontFamily: 'var(--font-inter), Inter, sans-serif', marginBottom: '1rem' }}>
                    {lang === 'EN' ? 'Follow Our Journey' : 'हाम्रो यात्रा पछ्याउनुहोस्'}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {[
                      { name: 'Instagram', handle: '@himabeans' },
                      { name: 'Facebook', handle: 'HIMA BEANS' },
                      { name: 'LinkedIn', handle: 'HIMA BEANS' },
                    ].map(({ name, handle }) => (
                      <div key={name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.85rem', color: '#6B7F7E', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>{name}</span>
                        <span style={{ fontSize: '0.85rem', color: '#1F4D4F', fontFamily: 'var(--font-inter), Inter, sans-serif', fontStyle: 'italic' }}>{handle}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div style={{ height: '1px', background: 'rgba(31,77,79,0.1)' }} />

                {/* Wholesale CTA */}
                <div style={{ padding: '1.75rem', background: '#1F4D4F', borderRadius: '2px' }}>
                  <p style={{ fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(217,223,220,0.45)', fontFamily: 'var(--font-inter), Inter, sans-serif', marginBottom: '0.75rem' }}>
                    {lang === 'EN' ? 'Café & Restaurant' : 'क्याफे र रेस्टुरेन्ट'}
                  </p>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: '#F6F1E9', marginBottom: '0.75rem', lineHeight: 1.5 }}>
                    {lang === 'EN' ? 'Interested in wholesale?' : 'थोकमा रुचि छ?'}
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(217,223,220,0.6)', fontFamily: 'var(--font-inter), Inter, sans-serif', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    {lang === 'EN'
                      ? 'Explore our café partnership program — custom roasting, competitive pricing, and a story your customers will love.'
                      : 'हाम्रो क्याफे साझेदारी कार्यक्रम अन्वेषण गर्नुहोस् — कस्टम रोस्टिङ, प्रतिस्पर्धी मूल्य निर्धारण र तपाईंका ग्राहकहरूले मन पराउने कथा।'}
                  </p>
                  <a
                    href="/wholesale"
                    style={{
                      display: 'inline-block',
                      fontSize: '11px',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: '#D4A55A',
                      fontFamily: 'var(--font-inter), Inter, sans-serif',
                      borderBottom: '1px solid rgba(212,165,90,0.4)',
                      paddingBottom: '2px',
                    }}
                  >
                    {lang === 'EN' ? 'Explore Wholesale →' : 'थोक सोधपुछ →'}
                  </a>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Map placeholder */}
        <section style={{ padding: '0 0 clamp(4rem, 8vw, 8rem)' }}>
          <div className="site-container">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{
                height: 'clamp(180px, 30vw, 280px)',
                borderRadius: '2px',
                background: 'linear-gradient(135deg, #1F4D4F 0%, #2B4A4C 30%, #6B7F7E 70%, #D9DFDC 100%)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(212,165,90,0.1) 0%, transparent 70%)' }} />
              <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
                <p style={{ fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#D4A55A', fontFamily: 'var(--font-inter), Inter, sans-serif', marginBottom: '0.5rem' }}>
                  {lang === 'EN' ? 'Find us in' : 'हामीलाई यहाँ भेट्नुहोस्'}
                </p>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 4vw, 40px)', color: '#F6F1E9', fontWeight: 700, letterSpacing: '-0.02em' }}>
                  Melbourne, Australia
                </p>
                <p style={{ fontSize: '0.85rem', color: 'rgba(217,223,220,0.5)', fontFamily: 'var(--font-inter), Inter, sans-serif', marginTop: '0.5rem' }}>
                  Nepal → Australia · Est. 2024
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
