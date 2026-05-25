'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

/* ── SVG icons ── */
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

/* ── Link data ── */
const NAV_LINKS = [
  { label: 'Home',           href: '/' },
  { label: 'Products',       href: '/beans' },
  { label: 'About',          href: '/about' },
  { label: 'Sustainability', href: '/sustainability' },
  { label: 'Wholesale',      href: '/wholesale' },
  { label: 'Journal',        href: '/journal' },
  { label: 'FAQ',            href: '/faq' },
  { label: 'Contact',        href: '/contact' },
] as const;

const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com/himabeans',            Icon: IconInstagram },
  { label: 'Facebook',  href: 'https://facebook.com/himabeans',             Icon: IconFacebook },
  { label: 'LinkedIn',  href: 'https://linkedin.com/company/himabeans',     Icon: IconLinkedin },
] as const;

/* ── Footer ── */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{ backgroundColor: '#0A0704', borderTop: '1px solid rgba(124,72,40,0.18)' }}
      aria-label="Site footer"
    >
      <div className="site-container" style={{ paddingTop: 'clamp(3rem,6vw,5rem)', paddingBottom: 'clamp(2rem,4vw,3rem)' }}>

        {/* ── Top: brand + nav ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(2rem,4vw,3rem)',
            paddingBottom: 'clamp(2rem,4vw,3rem)',
            borderBottom: '1px solid rgba(237,230,216,0.07)',
          }}
        >
          {/* Brand */}
          <Link
            href="/"
            aria-label="HIMA BEANS – Home"
            style={{ display: 'inline-flex', flexDirection: 'column', gap: '0.35rem', width: 'fit-content' }}
          >
            <span
              style={{
                fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                color: '#EDE0CC',
                letterSpacing: '0.08em',
                lineHeight: 1,
              }}
            >
              HIMA BEANS
            </span>
            <span style={{ fontSize: '9px', letterSpacing: '0.38em', textTransform: 'uppercase', color: '#7C4828', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}>
              Nepal &rarr; Australia
            </span>
          </Link>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.25rem 0',
                listStyle: 'none',
                margin: 0,
                padding: 0,
              }}
            >
              {NAV_LINKS.map((link, i) => (
                <li key={link.href} style={{ display: 'flex', alignItems: 'center' }}>
                  <Link
                    href={link.href}
                    style={{
                      fontSize: '12px',
                      letterSpacing: '0.08em',
                      color: 'rgba(237,230,216,0.45)',
                      fontFamily: 'var(--font-inter, Inter, sans-serif)',
                      padding: '0.3rem 0',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#EDE0CC')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(237,230,216,0.45)')}
                  >
                    {link.label}
                  </Link>
                  {i < NAV_LINKS.length - 1 && (
                    <span aria-hidden="true" style={{ color: 'rgba(124,72,40,0.35)', margin: '0 0.75rem', fontSize: '10px' }}>
                      /
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>

        {/* ── Bottom: tagline + social + copyright ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            paddingTop: 'clamp(1.5rem,3vw,2rem)',
          }}
        >
          <p
            style={{
              fontSize: '12px',
              color: 'rgba(237,230,216,0.28)',
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
              lineHeight: 1.7,
              maxWidth: '420px',
              letterSpacing: '0.02em',
            }}
          >
            Single-origin specialty coffee from the high-altitude Himalayan farms of Nepal,
            above 2,000 m — delivered to Australian cups with care.
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
            }}
          >
            {/* Social */}
            <div style={{ display: 'flex', gap: '0.75rem' }} role="list" aria-label="Social media">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`HIMA BEANS on ${label}`}
                  role="listitem"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    border: '1px solid rgba(237,230,216,0.12)',
                    color: 'rgba(237,230,216,0.38)',
                    transition: 'color 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.color = '#7C4828';
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(124,72,40,0.45)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(237,230,216,0.38)';
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(237,230,216,0.12)';
                  }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>

            {/* Copyright */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem 1.5rem',
                alignItems: 'center',
                fontSize: '11px',
                color: 'rgba(237,230,216,0.22)',
                fontFamily: 'var(--font-inter, Inter, sans-serif)',
                letterSpacing: '0.04em',
              }}
            >
              <span>&copy; {year} Hima Beans Pty Ltd</span>
              <span>ABN 00 000 000 000</span>
              <Link href="/privacy" style={{ color: 'rgba(237,230,216,0.22)', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(237,230,216,0.55)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(237,230,216,0.22)')}>
                Privacy
              </Link>
              <Link href="/terms" style={{ color: 'rgba(237,230,216,0.22)', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(237,230,216,0.55)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(237,230,216,0.22)')}>
                Terms
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </footer>
  );
}
