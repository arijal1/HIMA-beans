'use client';

import { useState, useRef, FormEvent } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SocialProofBadgeProps {
  text: string;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 8l3.5 3.5L13 4.5"
        stroke="#B08D57"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SocialProofBadge({ text }: SocialProofBadgeProps) {
  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
      style={{ background: 'rgba(176,141,87,0.15)', border: '1px solid rgba(176,141,87,0.35)' }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full animate-pulse"
        style={{ background: '#B08D57' }}
        aria-hidden="true"
      />
      <span
        className="text-xs tracking-[0.15em] uppercase font-medium"
        style={{ color: '#B08D57' }}
      >
        {text}
      </span>
    </div>
  );
}

const PERKS: string[] = [
  'Dedicated wholesale pricing from 5kg',
  'Monthly curated seasonal selections',
  'Free sample packs for qualified partners',
  'Co-branding & origin story materials',
];

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function WholesaleCTA() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError('Please enter a valid email address.');
      inputRef.current?.focus();
      return;
    }
    setError('');
    // In production this would POST to an API route.
    setSubmitted(true);
  }

  return (
    <section
      className="relative overflow-hidden"
      aria-labelledby="wholesale-heading"
    >
      {/* ── Split background ── */}
      <div className="absolute inset-0 flex pointer-events-none" aria-hidden="true">
        <div className="w-1/2 h-full" style={{ background: '#3B2A21' }} />
        <div className="w-1/2 h-full" style={{ background: '#B08D57' }} />
      </div>

      {/* ── Diagonal divider ── */}
      <div
        className="absolute inset-y-0 left-1/2 -translate-x-full w-24 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'linear-gradient(to bottom right, #3B2A21 50%, #B08D57 50%)',
          clipPath: 'polygon(100% 0, 100% 100%, 0 100%, 0 0)',
          zIndex: 1,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── Left: Copy ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          >
            {/* Social proof badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
              className="mb-6"
            >
              <SocialProofBadge text="Join 50+ Australian Cafés" />
            </motion.div>

            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
              className="text-xs tracking-[0.3em] uppercase mb-4"
              style={{ color: 'rgba(245,239,230,0.55)' }}
            >
              Wholesale &amp; Trade
            </motion.p>

            {/* Heading */}
            <motion.h2
              id="wholesale-heading"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
              className="text-5xl md:text-6xl font-serif leading-[1.05] mb-6"
              style={{
                color: '#F5EFE6',
                fontFamily: '"Playfair Display", Georgia, serif',
              }}
            >
              Partner
              <br />
              <em className="not-italic" style={{ color: '#E6D8C9' }}>
                with Us.
              </em>
            </motion.h2>

            {/* Body copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.28, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
              className="text-base leading-relaxed mb-8 max-w-md"
              style={{ color: 'rgba(245,239,230,0.65)' }}
            >
              We supply specialty-grade Himalayan beans to cafés, restaurants, and
              roasters across Australia. Offer your customers a traceable origin
              story they&apos;ll remember — direct from Nepal&apos;s high-altitude farms
              to your espresso bar.
            </motion.p>

            {/* Perks list */}
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.35, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
              className="space-y-3 mb-10"
              role="list"
            >
              {PERKS.map((perk) => (
                <li key={perk} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0">
                    <CheckIcon />
                  </span>
                  <span
                    className="text-sm leading-relaxed"
                    style={{ color: 'rgba(245,239,230,0.72)' }}
                  >
                    {perk}
                  </span>
                </li>
              ))}
            </motion.ul>

            {/* CTA link to full page */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.42, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
            >
              <Link
                href="/wholesale"
                className="group inline-flex items-center gap-3 text-sm tracking-[0.15em] uppercase transition-colors duration-300"
                style={{ color: '#B08D57' }}
              >
                <span
                  className="h-px w-8 transition-all duration-300 group-hover:w-14"
                  style={{ background: '#B08D57' }}
                />
                View wholesale details
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5"
                  fill="none"
                  viewBox="0 0 16 16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </motion.div>
          </motion.div>

          {/* ── Right: Inquiry form ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
            className="relative"
          >
            <div
              className="relative p-8 lg:p-10"
              style={{
                background: 'rgba(245,239,230,0.08)',
                border: '1px solid rgba(245,239,230,0.15)',
                backdropFilter: 'blur(8px)',
              }}
            >
              {/* Corner accent */}
              <span
                className="absolute top-0 right-0 w-12 h-px"
                style={{ background: '#F5EFE6', opacity: 0.5 }}
                aria-hidden="true"
              />
              <span
                className="absolute top-0 right-0 w-px h-12"
                style={{ background: '#F5EFE6', opacity: 0.5 }}
                aria-hidden="true"
              />
              <span
                className="absolute bottom-0 left-0 w-12 h-px"
                style={{ background: '#F5EFE6', opacity: 0.5 }}
                aria-hidden="true"
              />
              <span
                className="absolute bottom-0 left-0 w-px h-12"
                style={{ background: '#F5EFE6', opacity: 0.5 }}
                aria-hidden="true"
              />

              <h3
                className="text-2xl font-serif mb-2"
                style={{
                  color: '#1a0f09',
                  fontFamily: '"Playfair Display", Georgia, serif',
                }}
              >
                Start the Conversation
              </h3>
              <p
                className="text-sm leading-relaxed mb-8"
                style={{ color: 'rgba(26,15,9,0.65)' }}
              >
                Drop your email and we&apos;ll reach out within one business day with
                pricing, samples, and more.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="py-8 text-center"
                >
                  {/* Check circle */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: 'rgba(26,15,9,0.12)' }}
                    aria-hidden="true"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#1a0f09"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p
                    className="text-base font-medium mb-1"
                    style={{ color: '#1a0f09' }}
                  >
                    Inquiry received.
                  </p>
                  <p className="text-sm" style={{ color: 'rgba(26,15,9,0.6)' }}>
                    We&apos;ll be in touch within one business day.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-4">
                    <label
                      htmlFor="wholesale-email"
                      className="block text-xs tracking-[0.15em] uppercase mb-2 font-medium"
                      style={{ color: 'rgba(26,15,9,0.6)' }}
                    >
                      Business Email
                    </label>
                    <input
                      ref={inputRef}
                      id="wholesale-email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError('');
                      }}
                      placeholder="your@café.com.au"
                      className="w-full px-4 py-3 text-sm outline-none transition-all duration-200"
                      style={{
                        background: 'rgba(26,15,9,0.07)',
                        border: error
                          ? '1px solid #c0392b'
                          : '1px solid rgba(26,15,9,0.2)',
                        color: '#1a0f09',
                      }}
                      aria-describedby={error ? 'wholesale-email-error' : undefined}
                      aria-invalid={!!error}
                    />
                    {error && (
                      <p
                        id="wholesale-email-error"
                        role="alert"
                        className="mt-1.5 text-xs"
                        style={{ color: '#c0392b' }}
                      >
                        {error}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 text-sm tracking-[0.15em] uppercase font-semibold transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                    style={{
                      background: '#3B2A21',
                      color: '#F5EFE6',
                    }}
                  >
                    Request Wholesale Info
                  </button>

                  <p
                    className="mt-4 text-xs text-center"
                    style={{ color: 'rgba(26,15,9,0.45)' }}
                  >
                    No spam. Wholesale inquiries only.
                  </p>
                </form>
              )}
            </div>

            {/* Decorative quote beside card */}
            <p
              className="absolute -bottom-6 right-0 text-xs tracking-[0.12em] uppercase hidden lg:block"
              style={{ color: 'rgba(26,15,9,0.35)' }}
              aria-hidden="true"
            >
              Melbourne-based distribution
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
