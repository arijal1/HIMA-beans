'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mountain, ArrowRight, Send } from 'lucide-react';

function IconInstagram({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}
function IconFacebook({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}
function IconLinkedin({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

/* ============================================================
   Link data
   ============================================================ */

const EXPLORE_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Our Beans', href: '/beans' },
  { label: 'Comparison', href: '/comparison' },
] as const;

const LEARN_LINKS = [
  { label: 'Sustainability', href: '/sustainability' },
  { label: 'Journal', href: '/journal' },
  { label: 'FAQ', href: '/faq' },
] as const;

const CONNECT_LINKS = [
  { label: 'Wholesale', href: '/wholesale' },
  { label: 'Contact', href: '/contact' },
] as const;

const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/himabeans',
    Icon: IconInstagram,
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com/himabeans',
    Icon: IconFacebook,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/himabeans',
    Icon: IconLinkedin,
  },
] as const;

/* ============================================================
   Animation variants
   ============================================================ */

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  },
};

/* ============================================================
   Sub-components
   ============================================================ */

interface FooterLinkProps {
  href: string;
  label: string;
}

function FooterLink({ href, label }: FooterLinkProps) {
  const isExternal = href.startsWith('http');
  return (
    <li>
      <Link
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className="group inline-flex items-center gap-2.5 text-[#E6D8C9]/55 text-sm tracking-wide hover:text-[#F5EFE6] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B08D57] focus-visible:rounded py-0.5"
      >
        {/* Gold dash — expands on hover */}
        <span
          className="h-px w-0 bg-[#B08D57] flex-shrink-0 transition-all duration-300 group-hover:w-3.5 opacity-0 group-hover:opacity-100"
          aria-hidden="true"
        />
        {label}
      </Link>
    </li>
  );
}

interface FooterColumnProps {
  title: string;
  links: ReadonlyArray<{ href: string; label: string }>;
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h3
        className="text-[#B08D57] text-[10px] tracking-[0.3em] uppercase mb-5 font-medium"
        aria-label={`${title} links`}
      >
        {title}
      </h3>
      <ul className="space-y-3" role="list">
        {links.map((link) => (
          <FooterLink key={link.href} href={link.href} label={link.label} />
        ))}
      </ul>
    </div>
  );
}

/* ---- Newsletter form ---- */

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    setStatus('loading');

    try {
      // Replace with a real API endpoint (Mailchimp, Klaviyo, etc.)
      await new Promise<void>((resolve) => setTimeout(resolve, 900));
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Newsletter signup">
      {/* max-w-sm keeps text from stretching too wide on large screens */}
      <p className="text-[#E6D8C9]/55 text-sm tracking-wide mb-5 leading-relaxed max-w-sm">
        Stories from the highlands. Seasonal releases. Wholesale updates.
        <br />
        No noise — just altitude.
      </p>

      {status === 'success' ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          className="flex items-center gap-3 py-3"
          role="status"
          aria-live="polite"
        >
          <span
            className="flex-shrink-0 w-5 h-5 rounded-full bg-[#B08D57]/20 flex items-center justify-center"
            aria-hidden="true"
          >
            <span className="text-[#B08D57] text-xs">✓</span>
          </span>
          <p className="text-[#B08D57] text-sm tracking-wide">
            Welcome to the community — check your inbox.
          </p>
        </motion.div>
      ) : (
        <>
          {/* flex-col on mobile → flex-row on sm+ */}
          <div className="flex flex-col sm:flex-row gap-3">
            <label htmlFor="footer-email" className="sr-only">
              Email address
            </label>
            <input
              id="footer-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              disabled={status === 'loading'}
              aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
              className="
                flex-1 min-w-0 bg-transparent
                border border-[#F5EFE6]/18 rounded-none
                px-4 py-3 text-[#F5EFE6] text-sm
                placeholder:text-[#F5EFE6]/28
                focus:outline-none focus:border-[#B08D57]
                transition-colors duration-300
                disabled:opacity-40
              "
            />
            <motion.button
              type="submit"
              disabled={status === 'loading' || !email.trim()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="
                flex items-center justify-center gap-2 flex-shrink-0
                bg-[#B08D57] text-[#F5EFE6]
                px-6 py-3 text-[10px] tracking-[0.22em] uppercase font-medium
                hover:bg-[#9a7a49] transition-colors duration-300
                disabled:opacity-40 disabled:cursor-not-allowed
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-[#B08D57] focus-visible:ring-offset-2
                focus-visible:ring-offset-[#3B2A21]
                whitespace-nowrap
              "
            >
              {status === 'loading' ? (
                <span
                  className="inline-block w-4 h-4 border-2 border-[#F5EFE6]/40 border-t-[#F5EFE6] rounded-full animate-spin"
                  aria-label="Subscribing..."
                  aria-hidden="true"
                />
              ) : (
                <>
                  Subscribe
                  <Send size={12} strokeWidth={1.5} aria-hidden="true" />
                </>
              )}
            </motion.button>
          </div>

          {status === 'error' && (
            <motion.p
              id="newsletter-error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              role="alert"
              className="mt-2 text-red-400/80 text-xs tracking-wide"
            >
              Something went wrong — please try again.
            </motion.p>
          )}
        </>
      )}
    </form>
  );
}

/* ============================================================
   Footer (default export)
   ============================================================ */

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative bg-[#3B2A21] overflow-hidden"
      aria-label="Site footer"
    >
      {/* Large background watermark
           overflow-hidden on the parent footer already clips this, but we
           additionally clip inside this div and cap the font size lower on
           mobile so it never triggers horizontal scroll. */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="text-[#F5EFE6] leading-none tracking-widest whitespace-nowrap"
          style={{
            fontFamily:
              'var(--font-playfair, "Playfair Display", Georgia, serif)',
            // clamp: 48 px on the smallest screens → scales to 18vw → capped at 240 px
            fontSize: 'clamp(48px, 18vw, 240px)',
            opacity: 0.03,
          }}
        >
          HIMA BEANS
        </span>
      </div>

      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          opacity: 0.025,
        }}
        aria-hidden="true"
      />

      {/* Top gradient divider */}
      <div
        className="relative h-px bg-gradient-to-r from-transparent via-[#B08D57]/35 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 pt-12 sm:pt-16 pb-8 sm:pb-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* ---- Brand + Newsletter row
               Single column on mobile, 2-col on lg+ ---- */}
          <motion.div
            variants={fadeUpVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 pb-12 lg:pb-14"
          >
            {/* Brand identity */}
            <div>
              <Link
                href="/"
                className="inline-flex flex-col gap-1.5 mb-6 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B08D57] focus-visible:rounded"
                aria-label="HIMA BEANS – Home"
              >
                <span
                  className="text-[#F5EFE6] text-3xl tracking-[0.1em] leading-none group-hover:opacity-75 transition-opacity duration-300"
                  style={{
                    fontFamily:
                      'var(--font-playfair, "Playfair Display", Georgia, serif)',
                  }}
                >
                  HIMA BEANS
                </span>
                <span className="text-[#B08D57] text-[9px] tracking-[0.35em] uppercase mt-0.5">
                  Crafted Above the Clouds
                </span>
              </Link>

              {/* max-w-sm prevents text stretching awkwardly on wide single-column mobile */}
              <p className="text-[#E6D8C9]/55 text-sm leading-relaxed max-w-sm tracking-wide">
                Single-origin specialty coffee sourced from high-altitude
                Himalayan farms above 2,000 m in Nepal — brought to Australian
                cups with care and precision.
              </p>

              {/* Nepal → Australia badge */}
              <div className="flex items-center gap-2.5 mt-7">
                <Mountain
                  size={13}
                  className="text-[#B08D57] flex-shrink-0"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <span className="text-[#B08D57] text-[10px] tracking-[0.28em] uppercase">
                  Nepal → Australia
                </span>
              </div>

              {/* Social links — flex-wrap so they never overflow on tiny screens */}
              <div
                className="flex flex-wrap items-center gap-3 mt-8"
                role="list"
                aria-label="Social media links"
              >
                {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`HIMA BEANS on ${label}`}
                    role="listitem"
                    whileHover={{ scale: 1.12, y: -2 }}
                    whileTap={{ scale: 0.93 }}
                    className="
                      flex items-center justify-center w-9 h-9
                      border border-[#F5EFE6]/18
                      text-[#F5EFE6]/45 hover:text-[#B08D57]
                      hover:border-[#B08D57]/50
                      transition-colors duration-300
                      focus-visible:outline-none focus-visible:ring-2
                      focus-visible:ring-[#B08D57]
                    "
                  >
                    <Icon size={14} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h2 className="text-[#B08D57] text-[10px] tracking-[0.3em] uppercase mb-5 font-medium">
                Stay Connected
              </h2>
              <NewsletterForm />
            </div>
          </motion.div>

          {/* Divider */}
          <motion.div
            variants={fadeUpVariants}
            className="h-px bg-gradient-to-r from-transparent via-[#F5EFE6]/10 to-transparent mb-10 lg:mb-14"
            aria-hidden="true"
          />

          {/* ---- Navigation columns
               2-col on mobile (Explore + Learn), 3-col on sm+ (+ Connect) ---- */}
          <motion.div
            variants={fadeUpVariants}
            className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10 md:gap-8"
          >
            <FooterColumn title="Explore" links={EXPLORE_LINKS} />
            <FooterColumn title="Learn" links={LEARN_LINKS} />
            {/* On mobile this falls into the second row (col-span handled by grid auto-flow) */}
            <FooterColumn title="Connect" links={CONNECT_LINKS} />
          </motion.div>

          {/* Bottom divider */}
          <motion.div
            variants={fadeUpVariants}
            className="h-px bg-gradient-to-r from-transparent via-[#F5EFE6]/10 to-transparent mt-10 lg:mt-14 mb-6 lg:mb-8"
            aria-hidden="true"
          />

          {/* ---- Copyright bar
               Stacks vertically on mobile, side-by-side on sm+ ---- */}
          <motion.div
            variants={fadeUpVariants}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[#F5EFE6]/28 text-[11px] tracking-wide"
          >
            <p>
              &copy; {year} Hima Beans Pty Ltd. All rights reserved.
            </p>
            {/* Wrap on very small screens to prevent overflow */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <p>ABN 00 000 000 000</p>
              <Link
                href="/privacy"
                className="hover:text-[#F5EFE6]/60 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B08D57] focus-visible:rounded"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="hover:text-[#F5EFE6]/60 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B08D57] focus-visible:rounded"
              >
                Terms
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
