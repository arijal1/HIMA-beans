'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useTransform,
  animate,
} from 'framer-motion';
import { Menu, X } from 'lucide-react';

/* ============================================================
   Constants
   ============================================================ */

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Our Beans', href: '/beans' },
  { label: 'Comparison', href: '/comparison' },
  { label: 'Sustainability', href: '/sustainability' },
  { label: 'Wholesale', href: '/wholesale' },
  { label: 'Journal', href: '/journal' },
  { label: 'Contact', href: '/contact' },
] as const;

/* ============================================================
   useScrollPosition hook
   ============================================================ */

function useScrollPosition(threshold = 50): boolean {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > threshold);
  }, [threshold]);

  useEffect(() => {
    // Sync immediately with current scroll position on mount
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return isScrolled;
}

/* ============================================================
   NavLink
   ============================================================ */

interface NavLinkProps {
  href: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}

function NavLink({ href, label, isActive, onClick }: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="relative group text-[#F5EFE6] text-[11px] tracking-[0.18em] font-normal uppercase py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B08D57] focus-visible:rounded"
      aria-current={isActive ? 'page' : undefined}
    >
      <span className="relative">
        {label}
        {/* Gold underline — expands from left on hover */}
        <span
          className={[
            'absolute -bottom-0.5 left-0 h-px bg-[#B08D57] transition-all duration-300 ease-out',
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
  const isScrolled = useScrollPosition(50);
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const headerRef = useRef<HTMLElement>(null);

  /* ----- Lock body scroll when mobile menu is open ----- */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  /* ----- Close mobile menu on route change ----- */
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  /* ----- Keyboard: close mobile menu on Escape ----- */
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) setMobileOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  /* ---- Framer Motion variants ---- */

  const navbarVariants = {
    hidden: {
      y: prefersReducedMotion ? 0 : -80,
      opacity: prefersReducedMotion ? 1 : 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.7,
        ease: [0.22, 1, 0.36, 1] as [number,number,number,number],
      },
    },
  };

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      clipPath: 'inset(0 0 100% 0)',
    },
    visible: {
      opacity: 1,
      clipPath: 'inset(0 0 0% 0)',
      transition: {
        duration: prefersReducedMotion ? 0 : 0.55,
        ease: [0.22, 1, 0.36, 1] as [number,number,number,number],
      },
    },
    exit: {
      opacity: 0,
      clipPath: 'inset(0 0 100% 0)',
      transition: {
        duration: prefersReducedMotion ? 0 : 0.4,
        ease: [0.64, 0, 0.78, 0] as [number,number,number,number],
      },
    },
  };

  const mobileLinkVariants = {
    hidden: { opacity: 0, x: -28 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: prefersReducedMotion ? 0 : 0.1 + i * 0.065,
        duration: prefersReducedMotion ? 0 : 0.45,
        ease: [0.22, 1, 0.36, 1] as [number,number,number,number],
      },
    }),
    exit: {
      opacity: 0,
      x: -20,
      transition: { duration: prefersReducedMotion ? 0 : 0.2 },
    },
  };

  const mobileFooterVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: prefersReducedMotion ? 0 : NAV_LINKS.length * 0.065 + 0.15,
        duration: 0.4,
      },
    },
    exit: { opacity: 0, transition: { duration: 0.15 } },
  };

  return (
    <>
      {/* --------------------------------------------------------
          Main header bar
          -------------------------------------------------------- */}
      <motion.header
        ref={headerRef}
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: isScrolled ? 'rgba(59, 42, 33, 0.92)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(14px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(14px)' : 'none',
          borderBottom: isScrolled
            ? '1px solid rgba(176, 141, 87, 0.18)'
            : '1px solid transparent',
          transition:
            'background-color 400ms ease, backdrop-filter 400ms ease, border-color 400ms ease',
        }}
      >
        <nav
          className="mx-auto max-w-7xl px-6 lg:px-10 h-20 flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex flex-col items-start group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B08D57] focus-visible:rounded"
            aria-label="HIMA BEANS — Home"
          >
            <span
              className="text-[#F5EFE6] text-xl md:text-2xl tracking-[0.12em] leading-none transition-opacity duration-300 group-hover:opacity-75"
              style={{ fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)' }}
            >
              HIMA BEANS
            </span>
            <span className="hidden min-[380px]:block text-[#B08D57] text-[8px] tracking-[0.3em] uppercase mt-[5px] leading-none">
              Est. 2024 &middot; Nepal → Australia
            </span>
          </Link>

          {/* Desktop nav */}
          <ul
            className="hidden lg:flex items-center gap-8 xl:gap-10"
            role="list"
            aria-label="Site pages"
          >
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <NavLink
                  href={link.href}
                  label={link.label}
                  isActive={pathname === link.href}
                />
              </li>
            ))}
          </ul>

          {/* Mobile hamburger toggle */}
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden relative z-50 flex items-center justify-center w-10 h-10 text-[#F5EFE6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B08D57] focus-visible:rounded"
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
                  transition={{ duration: 0.22, ease: 'easeOut' }}
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
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  aria-hidden="true"
                >
                  <Menu size={20} strokeWidth={1.5} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </nav>
      </motion.header>

      {/* --------------------------------------------------------
          Mobile full-screen overlay menu
          -------------------------------------------------------- */}
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
            className="fixed inset-0 z-40 flex flex-col bg-[#3B2A21] lg:hidden"
          >
            {/* Grain texture */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
                opacity: 0.03,
              }}
              aria-hidden="true"
            />

            {/* Large background watermark */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
              aria-hidden="true"
            >
              <span
                className="text-[#F5EFE6] leading-none tracking-widest whitespace-nowrap"
                style={{
                  fontFamily:
                    'var(--font-playfair, "Playfair Display", Georgia, serif)',
                  fontSize: 'clamp(60px, 22vw, 200px)',
                  opacity: 0.03,
                }}
              >
                HIMA
              </span>
            </div>

            {/* Menu content */}
            <div className="relative z-10 flex flex-col justify-center h-full px-6 sm:px-10 pt-24 pb-12">
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
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B08D57]',
                          'transition-opacity duration-200',
                          pathname === link.href
                            ? 'opacity-100'
                            : 'opacity-50 hover:opacity-100',
                        ].join(' ')}
                        aria-current={pathname === link.href ? 'page' : undefined}
                      >
                        {/* Animated dash */}
                        <motion.span
                          className="h-px bg-[#B08D57] flex-shrink-0 transition-all duration-300"
                          animate={{
                            width: pathname === link.href ? 32 : 14,
                            opacity: pathname === link.href ? 1 : 0.45,
                          }}
                          aria-hidden="true"
                        />
                        <span
                          className="text-[#F5EFE6] text-3xl sm:text-4xl tracking-wide"
                          style={{
                            fontFamily:
                              'var(--font-playfair, "Playfair Display", Georgia, serif)',
                          }}
                        >
                          {link.label}
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Bottom brand strip */}
              <motion.div
                variants={mobileFooterVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mt-auto pt-8 border-t border-[#F5EFE6]/10"
              >
                <p className="text-[#B08D57] text-[10px] tracking-[0.3em] uppercase">
                  Est. 2024 &middot; Nepal → Australia
                </p>
                <p className="text-[#F5EFE6]/35 text-xs mt-2 tracking-wide">
                  Crafted Above the Clouds
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
