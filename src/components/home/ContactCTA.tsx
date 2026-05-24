'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}

// ---------------------------------------------------------------------------
// Info item
// ---------------------------------------------------------------------------

function InfoItem({ icon, label, value, href }: InfoItemProps) {
  const content = (
    <div className="flex items-start gap-3 sm:gap-4 group">
      <div
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-300 group-hover:bg-white/10"
        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
        aria-hidden="true"
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p
          className="text-[10px] tracking-[0.25em] uppercase mb-0.5"
          style={{ color: 'rgba(245,239,230,0.4)' }}
        >
          {label}
        </p>
        <p
          className="text-sm break-all sm:break-normal transition-colors duration-300"
          style={{ color: href ? '#B08D57' : 'rgba(245,239,230,0.75)' }}
        >
          {value}
        </p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        className="block min-w-0"
        aria-label={`${label}: ${value}`}
      >
        {content}
      </a>
    );
  }

  return <div className="min-w-0">{content}</div>;
}

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

function EmailIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="2"
        y="4"
        width="14"
        height="10"
        rx="1.5"
        stroke="#B08D57"
        strokeWidth="1.25"
      />
      <path
        d="M2 6l7 5 7-5"
        stroke="#B08D57"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 2a5 5 0 0 1 5 5c0 3.5-5 9-5 9S4 10.5 4 7a5 5 0 0 1 5-5Z"
        stroke="#B08D57"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="7" r="1.75" stroke="#B08D57" strokeWidth="1.25" />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Decorative mountain silhouette
// ---------------------------------------------------------------------------

function MountainDecoration() {
  return (
    <svg
      viewBox="0 0 1440 160"
      preserveAspectRatio="xMidYMax meet"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute bottom-0 left-0 w-full pointer-events-none"
      aria-hidden="true"
      style={{ opacity: 0.06 }}
    >
      <path
        d="M0,160 L0,80 L100,40 L200,70 L300,20 L400,55 L500,10 L600,45 L700,5 L800,40 L900,15 L1000,50 L1100,8 L1200,44 L1300,18 L1440,35 L1440,160 Z"
        fill="#F5EFE6"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function ContactCTA() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: '#3B2A21' }}
      aria-labelledby="contact-heading"
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          backgroundSize: '200px 200px',
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 100%, rgba(176,141,87,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Gold top rule */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, #B08D57 30%, #B08D57 70%, transparent)',
        }}
        aria-hidden="true"
      />

      {/* Mountain silhouette */}
      <MountainDecoration />

      {/* Main content — clamp-based padding reduces vertical space on mobile */}
      <div
        className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-10 text-center"
        style={{
          paddingTop: 'clamp(4rem, 10vw, 10rem)',
          paddingBottom: 'clamp(4rem, 10vw, 10rem)',
        }}
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          className="text-xs tracking-[0.35em] uppercase mb-5 sm:mb-6"
          style={{ color: '#B08D57' }}
        >
          Crafted Above the Clouds
        </motion.p>

        {/* Main heading — clamp from 2.75rem on mobile up to 6rem on desktop.
            Fixed large sizes like text-6xl / text-8xl would overflow on narrow viewports. */}
        <motion.h2
          id="contact-heading"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          className="font-serif leading-[1.0] mb-6 sm:mb-8"
          style={{
            color: '#F5EFE6',
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(2.75rem, 10vw, 6rem)',
            letterSpacing: '-0.02em',
          }}
        >
          Begin Your
          <br />
          <em
            className="not-italic"
            style={{ color: '#B08D57' }}
          >
            Journey.
          </em>
        </motion.h2>

        {/* Body copy */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          className="text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-8 sm:mb-12"
          style={{ color: 'rgba(245,239,230,0.6)' }}
        >
          Whether you&apos;re a café owner, a coffee lover, or simply curious about
          Nepal&apos;s finest — we&apos;d love to hear from you.
        </motion.p>

        {/* CTA buttons — stack vertically on mobile, side-by-side on sm+ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.26, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-20"
        >
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-6 sm:px-7 py-3.5 text-sm tracking-[0.12em] uppercase font-semibold transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            style={{ background: '#B08D57', color: '#1a0f09' }}
          >
            Get in Touch
            <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>

          <Link
            href="/shop"
            className="group inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-6 sm:px-7 py-3.5 text-sm tracking-[0.12em] uppercase font-medium transition-all duration-200"
            style={{
              background: 'transparent',
              color: '#F5EFE6',
              border: '1.5px solid rgba(245,239,230,0.3)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = 'rgba(245,239,230,0.6)';
              el.style.background = 'rgba(245,239,230,0.05)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = 'rgba(245,239,230,0.3)';
              el.style.background = 'transparent';
            }}
          >
            Explore Our Beans
            <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </motion.div>

        {/* Contact info strip — stacks vertically on mobile, horizontal on sm+
            Divider line hidden on mobile to avoid stray vertical bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.34, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-10 lg:gap-12"
        >
          <InfoItem
            icon={<EmailIcon />}
            label="Email"
            value="hello@himabeans.com.au"
            href="mailto:hello@himabeans.com.au"
          />

          {/* Vertical divider — only shown on sm+ where layout is horizontal */}
          <span
            className="hidden sm:block w-px h-10 shrink-0"
            style={{ background: 'rgba(245,239,230,0.12)' }}
            aria-hidden="true"
          />

          <InfoItem
            icon={<LocationIcon />}
            label="Based in"
            value="Melbourne, Australia"
          />
        </motion.div>

        {/* Tagline footer — truncated on mobile to prevent horizontal overflow */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
          className="mt-12 sm:mt-20 text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.3em] uppercase overflow-hidden text-ellipsis whitespace-nowrap px-4"
          style={{ color: 'rgba(245,239,230,0.2)' }}
          aria-hidden="true"
        >
          Hima Beans · Nepal × Australia · Specialty Coffee
        </motion.p>
      </div>
    </section>
  );
}
