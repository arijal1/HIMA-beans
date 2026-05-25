'use client';

import Link from 'next/link';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────
   Animated number counter hook
   ───────────────────────────────────────────── */
function useCountUp(target: number, duration = 1.8, startOnView = false) {
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: duration * 1000, bounce: 0 });
  const display = useTransform(spring, (v) => Math.round(v).toString());
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (startOnView && inView) {
      motionValue.set(target);
    } else if (!startOnView) {
      motionValue.set(target);
    }
  }, [inView, startOnView, motionValue, target]);

  return { ref, display };
}

/* ─────────────────────────────────────────────
   Pillar data
   ───────────────────────────────────────────── */
interface Pillar {
  id: string;
  stat: number;
  statSuffix: string;
  statLabel: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const PILLARS: Pillar[] = [
  {
    id: 'ethical',
    stat: 100,
    statSuffix: '%',
    statLabel: 'Direct trade',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9">
        <path
          d="M20 4C14 4 8 9 8 16c0 5 3 9 7 11.5V34h10v-6.5C29 25 32 21 32 16c0-7-6-12-12-12Z"
          stroke="#7B5920" strokeWidth="1.5" strokeLinejoin="round"
        />
        <path d="M14 18l4 4 8-8" stroke="#7B5920" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Ethical Sourcing',
    description:
      'Every bag traces back to named farming families in Gulmi, Palpa, and Kaski. We pay 40% above the Fair Trade floor price — because the people who grow your coffee deserve more than a certificate.',
  },
  {
    id: 'shade',
    stat: 3200,
    statSuffix: '+',
    statLabel: 'Trees preserved',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9">
        <path
          d="M20 6C20 6 8 14 8 23a12 12 0 0 0 24 0C32 14 20 6 20 6Z"
          stroke="#7B5920" strokeWidth="1.5" strokeLinejoin="round"
        />
        <path d="M20 35V22" stroke="#7B5920" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 27l6-5 6 5" stroke="#7B5920" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Shade Grown',
    description:
      "Our coffee grows beneath the forest canopy at 1,400–2,100 m. No clear-cutting, no monocultures. The highland ecosystem stays intact — and the altitude gives the beans their remarkable complexity.",
  },
  {
    id: 'traceable',
    stat: 8,
    statSuffix: ' steps',
    statLabel: 'Full chain visible',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9">
        <circle cx="10" cy="20" r="3" stroke="#7B5920" strokeWidth="1.5" />
        <circle cx="30" cy="20" r="3" stroke="#7B5920" strokeWidth="1.5" />
        <circle cx="20" cy="10" r="3" stroke="#7B5920" strokeWidth="1.5" />
        <circle cx="20" cy="30" r="3" stroke="#7B5920" strokeWidth="1.5" />
        <path d="M13 20h14M20 13v14" stroke="#7B5920" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12.5 12.5l15 15M27.5 12.5l-15 15" stroke="#7B5920" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.4" />
      </svg>
    ),
    title: 'Traceable Origin',
    description:
      'Scan the QR on any bag and meet the farmer, the altitude, the harvest date, the mill, the shipping route. We publish our full supply chain — because transparency is the only honest luxury.',
  },
  {
    id: 'carbon',
    stat: 62,
    statSuffix: '%',
    statLabel: 'Lower emissions vs. air freight',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9">
        <path
          d="M8 26c0-5 4-9 8-9 1 0 2 .2 3 .6A8 8 0 0 1 36 24c0 4.4-3.6 8-8 8H12a4 4 0 0 1-4-6Z"
          stroke="#7B5920" strokeWidth="1.5" strokeLinejoin="round"
        />
        <path d="M20 22V10M16 14l4-4 4 4" stroke="#7B5920" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Minimal Carbon',
    description:
      "We ship exclusively by sea freight in biodegradable jute and kraft packaging. Our Melbourne warehouse runs on renewable energy. We're working toward carbon-neutral delivery by 2026.",
  },
];

/* ─────────────────────────────────────────────
   Animated counter display
   ───────────────────────────────────────────── */
interface CounterProps {
  target: number;
  suffix: string;
  label: string;
}

function AnimatedCounter({ target, suffix, label }: CounterProps) {
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1800, bounce: 0 });
  const display = useTransform(spring, (v) =>
    target >= 1000 ? Math.round(v).toLocaleString() : Math.round(v).toString()
  );
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (inView) motionValue.set(target);
  }, [inView, motionValue, target]);

  return (
    <div ref={ref} className="mb-5 sm:mb-6">
      <div className="flex items-baseline gap-0.5">
        <motion.span
          className="font-serif tracking-tight"
          style={{
            color: '#7B5920',
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(1.75rem, 5vw, 2.25rem)',
          }}
        >
          {display}
        </motion.span>
        <span
          className="text-xl sm:text-2xl font-serif"
          style={{ color: '#7B5920', fontFamily: '"Playfair Display", Georgia, serif' }}
        >
          {suffix}
        </span>
      </div>
      <p className="text-xs tracking-[0.2em] uppercase mt-1" style={{ color: '#6E675F' }}>
        {label}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Pillar card
   ───────────────────────────────────────────── */
interface PillarCardProps {
  pillar: Pillar;
  index: number;
}

function PillarCard({ pillar, index }: PillarCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
      className="group flex flex-col p-6 sm:p-8 border border-white/[0.07] relative overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.025)' }}
    >
      {/* Hover accent fill */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'rgba(123,89,32,0.05)' }}
      />

      {/* Gold left border on hover */}
      <span
        className="absolute left-0 top-0 bottom-0 w-px origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500"
        style={{ background: '#7B5920' }}
        aria-hidden="true"
      />

      {/* Icon */}
      <div className="mb-6 sm:mb-8 relative z-10">{pillar.icon}</div>

      {/* Animated counter */}
      <div className="relative z-10">
        <AnimatedCounter
          target={pillar.stat}
          suffix={pillar.statSuffix}
          label={pillar.statLabel}
        />
      </div>

      {/* Title */}
      <h3
        className="text-lg sm:text-xl font-serif mb-3 sm:mb-4 relative z-10"
        style={{ color: '#F3EFE6', fontFamily: '"Playfair Display", Georgia, serif' }}
      >
        {pillar.title}
      </h3>

      {/* Description */}
      <p
        className="text-sm leading-relaxed relative z-10 flex-1"
        style={{ color: '#6E675F' }}
      >
        {pillar.description}
      </p>
    </motion.article>
  );
}

/* ─────────────────────────────────────────────
   Main component
   ───────────────────────────────────────────── */
export default function SustainabilitySection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: '#1a1a1a' }}
      aria-labelledby="sustainability-heading"
    >
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
        }}
        aria-hidden="true"
      />

      {/* Gold horizontal rule top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #7B5920 30%, #7B5920 70%, transparent)' }}
        aria-hidden="true"
      />

      <div
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10"
        style={{ paddingTop: 'clamp(3.5rem, 8vw, 9rem)', paddingBottom: 'clamp(3.5rem, 8vw, 9rem)' }}
      >

        {/* Section header */}
        <div className="mb-10 sm:mb-14 lg:mb-20 max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
            className="text-xs tracking-[0.3em] uppercase mb-4 sm:mb-5"
            style={{ color: '#7B5920' }}
          >
            Our Earth Promise
          </motion.p>

          <motion.h2
            id="sustainability-heading"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
            className="font-serif leading-[1.05] mb-5 sm:mb-6"
            style={{
              color: '#F3EFE6',
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(2rem, 6vw, 3.75rem)',
            }}
          >
            Earth First,
            <br />
            <em className="not-italic" style={{ color: '#7B5920' }}>Cup Second.</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.16, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
            className="text-sm sm:text-base leading-relaxed max-w-xl"
            style={{ color: '#6E675F' }}
          >
            Premium coffee and environmental stewardship aren&apos;t at odds — they&apos;re inseparable.
            Every decision we make starts with the land, the community, and the future.
          </motion.p>
        </div>

        {/* Pillars grid — 1 col mobile, 2 col sm, 4 col lg */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px"
          style={{ background: 'rgba(255,255,255,0.07)' }}
        >
          {PILLARS.map((pillar, i) => (
            <PillarCard key={pillar.id} pillar={pillar} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          className="mt-10 sm:mt-14 lg:mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-6"
        >
          <Link
            href="/sustainability"
            className="group inline-flex items-center gap-3 text-sm tracking-[0.15em] uppercase transition-colors duration-300"
            style={{ color: '#7B5920' }}
          >
            <span className="h-px w-8 transition-all duration-300 group-hover:w-14" style={{ background: '#7B5920' }} />
            Read our full sustainability report
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none" viewBox="0 0 16 16"
              stroke="currentColor" strokeWidth="1.5"
            >
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* Gold horizontal rule bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #7B5920 30%, #7B5920 70%, transparent)' }}
        aria-hidden="true"
      />
    </section>
  );
}
