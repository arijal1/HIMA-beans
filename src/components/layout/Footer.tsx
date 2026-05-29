'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLang } from '@/context/lang';

/* ── SVG icons ── */
function IconInstagram({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}
function IconFacebook({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}
function IconLinkedin({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

const NAV_LINKS = [
  { label: 'Home',           labelNP: 'गृहपृष्ठ',      href: '/' },
  { label: 'Products',       labelNP: 'उत्पादनहरू',    href: '/beans' },
  { label: 'About',          labelNP: 'हाम्रो बारे',   href: '/about' },
  { label: 'Sustainability', labelNP: 'दिगोपन',         href: '/sustainability' },
  { label: 'Wholesale',      labelNP: 'थोक',            href: '/wholesale' },
  { label: 'Journal',        labelNP: 'पत्रिका',        href: '/journal' },
  { label: 'FAQ',            labelNP: 'सामान्य प्रश्न', href: '/faq' },
  { label: 'Contact',        labelNP: 'सम्पर्क',        href: '/contact' },
];

const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com/himabeans',        Icon: IconInstagram },
  { label: 'Facebook',  href: 'https://facebook.com/himabeans',         Icon: IconFacebook },
  { label: 'LinkedIn',  href: 'https://linkedin.com/company/himabeans', Icon: IconLinkedin },
] as const;

export default function Footer() {
  const year = new Date().getFullYear();
  const { lang } = useLang();

  return (
    <footer
      aria-label="Site footer"
      style={{ backgroundColor: '#1C0D05', borderTop: '1px solid rgba(212,165,90,0.2)' }}
    >
      <div
        className="site-container"
        style={{ paddingTop: '2.5rem', paddingBottom: '2rem' }}
      >
        {/* ── Main row: logo · links · social ── */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '2rem',
          }}
        >
          {/* Logo */}
          <Link href="/" aria-label="HIMA BEANS – Home" style={{ display: 'inline-block', flexShrink: 0 }}>
            <Image
              src="/logo.PNG"
              alt="HIMA BEANS"
              width={96}
              height={64}
              style={{ display: 'block' }}
            />
          </Link>

          {/* Nav links */}
          <nav aria-label="Footer navigation" style={{ flex: '1 1 auto', minWidth: 0 }}>
            <ul
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.2rem 0',
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
                      fontSize: '11px',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'rgba(237,230,216,0.55)',
                      fontFamily: 'var(--font-inter, Inter, sans-serif)',
                      padding: '0.25rem 0',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#D4A55A')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(237,230,216,0.38)')}
                  >
                    {lang === 'EN' ? link.label : link.labelNP}
                  </Link>
                  {i < NAV_LINKS.length - 1 && (
                    <span aria-hidden="true" style={{ color: 'rgba(212,165,90,0.25)', margin: '0 0.65rem', fontSize: '9px' }}>
                      ·
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }} role="list" aria-label="Social media">
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
                  width: '32px',
                  height: '32px',
                  border: '1px solid rgba(237,230,216,0.1)',
                  borderRadius: '4px',
                  color: 'rgba(237,230,216,0.3)',
                  transition: 'color 0.2s, border-color 0.2s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.color = '#D4A55A';
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(212,165,90,0.4)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(237,230,216,0.3)';
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(237,230,216,0.1)';
                }}
              >
                <Icon size={13} />
              </a>
            ))}
          </div>
        </div>

        {/* ── Bottom bar: copyright ── */}
        <div
          style={{
            marginTop: '2rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid rgba(237,230,216,0.06)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.5rem 2rem',
            fontSize: '10px',
            letterSpacing: '0.06em',
            color: 'rgba(237,230,216,0.28)',
            fontFamily: 'var(--font-inter, Inter, sans-serif)',
          }}
        >
          <span>
            {lang === 'EN'
              ? 'Single-origin specialty coffee · Nepal → Australia · Est. 2024'
              : 'एकल-उत्पत्तिको विशेष कफी · नेपाल → अस्ट्रेलिया · स्थापित २०२४'}
          </span>
          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
            <span>&copy; {year} Hima Beans Pty Ltd</span>
            <span>ABN 00 000 000 000</span>
            <Link href="/privacy" style={{ color: 'rgba(237,230,216,0.18)', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(237,230,216,0.45)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(237,230,216,0.18)')}>
              Privacy
            </Link>
            <Link href="/terms" style={{ color: 'rgba(237,230,216,0.18)', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(237,230,216,0.45)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(237,230,216,0.18)')}>
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
