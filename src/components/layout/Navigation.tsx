'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLang, type Lang } from '@/context/lang';

/* ============================================================
   Nav link data
   ============================================================ */

const NAV_LINKS: { label: string; labelNP: string; href: string }[] = [
  { label: 'Home',          labelNP: 'गृहपृष्ठ',    href: '/' },
  { label: 'Products',      labelNP: 'उत्पादनहरू',   href: '/beans' },
  { label: 'About',         labelNP: 'हाम्रो बारे',  href: '/about' },
  { label: 'Sustainability', labelNP: 'दिगोपन',       href: '/sustainability' },
  { label: 'Wholesale',     labelNP: 'थोक',           href: '/wholesale' },
  { label: 'Journal',       labelNP: 'पत्रिका',       href: '/journal' },
  { label: 'Contact',       labelNP: 'सम्पर्क',       href: '/contact' },
];

/* ============================================================
   useScrollPosition
   ============================================================ */

function useScrollPosition(threshold = 40): boolean {
  const [isScrolled, setIsScrolled] = useState(false);
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > threshold);
  }, [threshold]);
  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
  return isScrolled;
}

/* ============================================================
   Language Toggle
   ============================================================ */

function LangToggle({ lang, onToggle }: { lang: Lang; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      aria-label={lang === 'EN' ? 'Switch to Nepali' : 'Switch to English'}
      className="flex items-stretch text-[9px] tracking-[0.12em] uppercase rounded-sm overflow-hidden border border-[#7C4828]/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C4828] flex-shrink-0"
    >
      <span
        className={`px-2 py-1 transition-colors duration-200 leading-none flex items-center ${
          lang === 'EN'
            ? 'bg-[#7C4828] text-[#0d0a07] font-semibold'
            : 'text-[#7C4828]/55 hover:text-[#7C4828]'
        }`}
      >
        EN
      </span>
      <span
        className={`px-2 py-1 transition-colors duration-200 leading-none flex items-center ${
          lang === 'NP'
            ? 'bg-[#7C4828] text-[#0d0a07] font-semibold'
            : 'text-[#7C4828]/55 hover:text-[#7C4828]'
        }`}
        style={{ fontFamily: 'system-ui, sans-serif', fontSize: '10px' }}
      >
        NP
      </span>
    </button>
  );
}

/* ============================================================
   NavLink
   ============================================================ */

function NavLink({
  href, label, isActive, onClick,
}: {
  href: string; label: string; isActive: boolean; onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="relative group text-[#DDD5CA] text-[11px] tracking-[0.18em] font-normal uppercase py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C4828] focus-visible:rounded"
      aria-current={isActive ? 'page' : undefined}
    >
      <span className="relative">
        {label}
        <span
          className={[
            'absolute -bottom-0.5 left-0 h-px bg-[#7C4828] transition-all duration-300 ease-out',
            isActive
              ? 'w-full opacity-100'
              : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100',
          ].join(' ')}
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}

/* ============================================================
   Navigation (default export)
   ============================================================ */

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, toggle: toggleLang } = useLang();
  const isScrolled = useScrollPosition(40);
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) setMobileOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  const navbarVariants = {
    hidden: { y: prefersReducedMotion ? 0 : -70, opacity: prefersReducedMotion ? 1 : 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: prefersReducedMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, clipPath: 'inset(0 0 100% 0)' },
    visible: {
      opacity: 1,
      clipPath: 'inset(0 0 0% 0)',
      transition: { duration: prefersReducedMotion ? 0 : 0.48, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
    exit: {
      opacity: 0,
      clipPath: 'inset(0 0 100% 0)',
      transition: { duration: prefersReducedMotion ? 0 : 0.32, ease: [0.64, 0, 0.78, 0] as [number, number, number, number] },
    },
  };

  const mobileLinkVariants = {
    hidden: { opacity: 0, x: -28 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: prefersReducedMotion ? 0 : 0.08 + i * 0.055,
        duration: prefersReducedMotion ? 0 : 0.38,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    }),
    exit: { opacity: 0, x: -20, transition: { duration: prefersReducedMotion ? 0 : 0.16 } },
  };

  return (
    <>
      {/* ── Header bar ── */}
      <motion.header
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: '#0E0A07',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(237,224,204,0.07)',
        }}
      >
        <nav
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 h-[68px] flex items-center justify-between gap-4"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex flex-col items-start group flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C4828] focus-visible:rounded"
            aria-label="HIMA BEANS — Home"
          >
            <span
              className="text-[#F5EDE0] text-xl md:text-[22px] tracking-[0.12em] leading-none transition-opacity duration-300 group-hover:opacity-75"
              style={{ fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)' }}
            >
              HIMA BEANS
            </span>
            <span className="hidden min-[380px]:block text-[#7C4828] text-[7.5px] tracking-[0.28em] uppercase mt-[5px] leading-none opacity-75">
              {lang === 'EN' ? 'Est. 2024 · Nepal → Australia' : 'स्थापित २०२४ · नेपाल → अस्ट्रेलिया'}
            </span>
          </Link>

          {/* Desktop nav */}
          <ul
            className="hidden lg:flex items-center gap-7 xl:gap-9 flex-1 justify-center"
            role="list"
            aria-label="Site pages"
          >
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <NavLink
                  href={link.href}
                  label={lang === 'EN' ? link.label : link.labelNP}
                  isActive={pathname === link.href}
                />
              </li>
            ))}
          </ul>

          {/* Right: lang toggle + mobile button */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <LangToggle lang={lang} onToggle={toggleLang} />
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={() => setMobileOpen((p) => !p)}
              className="lg:hidden z-50 flex items-center justify-center w-10 h-10 text-[#F5EDE0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C4828] focus-visible:rounded"
              aria-label={mobileOpen ? 'Close menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    aria-hidden="true"
                  >
                    <X size={20} strokeWidth={1.5} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ opacity: 0, rotate: 45, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -45, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    aria-hidden="true"
                  >
                    <Menu size={20} strokeWidth={1.5} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* ── Mobile overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 flex flex-col lg:hidden"
            style={{ background: '#0E0A07', backdropFilter: 'blur(24px)' }}
          >
            {/* Grain */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
                opacity: 0.035,
              }}
              aria-hidden="true"
            />
            {/* HIMA watermark */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
              aria-hidden="true"
            >
              <span
                style={{
                  fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                  fontSize: 'clamp(60px, 22vw, 200px)',
                  color: '#F5EDE0',
                  opacity: 0.025,
                  letterSpacing: '0.1em',
                  whiteSpace: 'nowrap',
                }}
              >
                HIMA
              </span>
            </div>

            <div className="relative z-10 flex flex-col justify-center h-full px-6 sm:px-10 pt-24 pb-12">
              {/* Mobile lang toggle */}
              <motion.div
                custom={-1}
                variants={mobileLinkVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mb-8"
              >
                <LangToggle lang={lang} onToggle={toggleLang} />
              </motion.div>

              <nav aria-label="Mobile navigation">
                <ul className="space-y-0.5" role="list">
                  {NAV_LINKS.map((link, i) => (
                    <motion.li
                      key={link.href}
                      custom={i}
                      variants={mobileLinkVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={[
                          'group flex items-center gap-5 py-3.5 min-h-[44px] rounded px-1',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C4828]',
                          'transition-opacity duration-200',
                          pathname === link.href ? 'opacity-100' : 'opacity-40 hover:opacity-100',
                        ].join(' ')}
                        aria-current={pathname === link.href ? 'page' : undefined}
                      >
                        <motion.span
                          className="h-px bg-[#7C4828] flex-shrink-0"
                          animate={{ width: pathname === link.href ? 32 : 14, opacity: pathname === link.href ? 1 : 0.45 }}
                          aria-hidden="true"
                        />
                        <span
                          className="text-[#F5EDE0] text-3xl sm:text-4xl tracking-wide"
                          style={{ fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)' }}
                        >
                          {lang === 'EN' ? link.label : link.labelNP}
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Footer strip */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { delay: prefersReducedMotion ? 0 : NAV_LINKS.length * 0.055 + 0.12, duration: 0.35 },
                  },
                  exit: { opacity: 0, transition: { duration: 0.12 } },
                }}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mt-auto pt-8 border-t border-[#F5EDE0]/10"
              >
                <p className="text-[#7C4828] text-[10px] tracking-[0.3em] uppercase">
                  {lang === 'EN' ? 'Est. 2024 · Nepal → Australia' : 'स्थापित २०२४ · नेपाल → अस्ट्रेलिया'}
                </p>
                <p className="text-[#F5EDE0]/30 text-xs mt-2 tracking-wide">
                  {lang === 'EN' ? 'Crafted Above the Clouds' : 'बादलभन्दा माथि बनाइएको'}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
