'use client';

import { useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface BeanCard {
  region: string;
  altitude: string;
  name: string;
  flavorNotes: string[];
  roastLevel: number; // 1–5
  roastLabel: string;
  processing: string;
  description: string;
  accentColor: string;
  /** Subtle gradient direction for the image placeholder */
  gradientAngle: number;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const BEANS: BeanCard[] = [
  {
    region: 'Gulmi',
    altitude: '1800m',
    name: 'Himalayan Reserve',
    flavorNotes: ['Floral', 'Chocolate', 'Citrus'],
    roastLevel: 3,
    roastLabel: 'Medium',
    processing: 'Washed',
    description:
      'Our flagship single-origin from Gulmi district. Grown by the Paudel family cooperative at 1,800 m, this washed-process bean reveals a pristine, luminous clarity rarely found outside elite specialty circles.',
    accentColor: '#D4A55A',
    gradientAngle: 135,
  },
  {
    region: 'Palpa',
    altitude: '2100m',
    name: 'Valley Mist',
    flavorNotes: ['Jasmine', 'Citrus', 'Honey'],
    roastLevel: 2,
    roastLabel: 'Light–Medium',
    processing: 'Natural',
    description:
      "Sourced from Palpa's high mist-draped ridges where coffee cherries dry slowly under the Himalayan sun. The natural process amplifies inherent sweetness into a radiant, perfumed cup.",
    accentColor: '#C4A97A',
    gradientAngle: 150,
  },
  {
    region: 'Syangja',
    altitude: '1950m',
    name: 'Summit Dark',
    flavorNotes: ['Bittersweet Cocoa', 'Cedar', 'Molasses'],
    roastLevel: 4,
    roastLabel: 'Dark',
    processing: 'Honey',
    description:
      "For those who prefer depth over delicacy. Syangja's dense-altitude beans respond beautifully to a darker roast, building rich bittersweet cocoa with cedar backbone and a long molasses finish.",
    accentColor: '#8C6A3F',
    gradientAngle: 120,
  },
];

// ---------------------------------------------------------------------------
// Roast level bar
// ---------------------------------------------------------------------------

function RoastBar({ level, accentColor }: { level: number; accentColor: string }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="text-[10px] tracking-[0.22em] uppercase shrink-0"
        style={{ color: '#6B7F7E' }}
      >
        Roast
      </span>
      <div className="flex gap-1 items-center">
        {[1, 2, 3, 4, 5].map((n) => (
          <div
            key={n}
            className="h-1.5 w-5 rounded-full transition-colors duration-300"
            style={{ backgroundColor: n <= level ? accentColor : '#D9DFDC' }}
          />
        ))}
        <span
          className="ml-2 text-[10px] tracking-[0.15em] uppercase"
          style={{ color: accentColor }}
        >
          {BEANS.find((b) => b.accentColor === accentColor)?.roastLabel ?? ''}
        </span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 3-D tilt card
// ---------------------------------------------------------------------------

interface TiltCardProps {
  bean: BeanCard;
  index: number;
}

function TiltCard({ bean, index }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setTilt({ rotateX: -y * 10, rotateY: x * 10 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setIsHovered(false);
  }, []);

  const cardVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1] as [number,number,number,number],
        delay: index * 0.15,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariant}
      style={{ perspective: '1100px' }}
      className="h-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          scale: isHovered ? 1.025 : 1,
          boxShadow: isHovered
            ? `0 32px 64px rgba(31,77,79,0.22), 0 0 0 1px ${bean.accentColor}4D`
            : `0 6px 28px rgba(31,77,79,0.07), 0 0 0 1px ${bean.accentColor}22`,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, mass: 0.65 }}
        className="relative flex flex-col h-full rounded-sm overflow-hidden"
        style={{
          backgroundColor: '#F6F1E9',
          transformStyle: 'preserve-3d',
          border: '1px solid transparent',
        }}
      >
        {/* Top accent bar */}
        <div className="h-[3px] w-full shrink-0" style={{ backgroundColor: bean.accentColor }} />

        {/* Gradient photo placeholder */}
        <div
          className="relative h-52 shrink-0 overflow-hidden"
          style={{
            background: `linear-gradient(${bean.gradientAngle}deg, ${bean.accentColor}2E 0%, #1F4D4F26 55%, #1A2E2F14 100%)`,
          }}
          aria-hidden="true"
        >
          {/* Watermark initials */}
          <span
            className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
            style={{
              color: bean.accentColor,
              opacity: 0.1,
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: '80px',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              transform: 'translateZ(20px)',
            }}
          >
            HB
          </span>

          {/* Region + altitude pill */}
          <div className="absolute top-4 left-4">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] tracking-[0.22em] uppercase rounded-full"
              style={{ backgroundColor: '#1F4D4F', color: '#F6F1E9' }}
            >
              {bean.region}
              <span style={{ color: bean.accentColor }}>·</span>
              {bean.altitude}
            </span>
          </div>

          {/* Processing pill */}
          <div className="absolute top-4 right-4">
            <span
              className="inline-flex items-center px-3 py-1 text-[10px] tracking-[0.2em] uppercase rounded-full"
              style={{
                backgroundColor: `${bean.accentColor}1A`,
                color: bean.accentColor,
                border: `1px solid ${bean.accentColor}40`,
              }}
            >
              {bean.processing}
            </span>
          </div>

          {/* Decorative mountain silhouette */}
          <svg
            viewBox="0 0 260 100"
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '55%',
              opacity: 0.12,
            }}
          >
            <path
              d="M0,100 L0,60 L40,30 L65,50 L90,20 L115,42 L140,10 L165,38 L190,25 L215,48 L240,30 L260,45 L260,100Z"
              fill={bean.accentColor}
            />
          </svg>
        </div>

        {/* Card body */}
        <div className="flex flex-col flex-1 p-7 gap-5">
          {/* Name */}
          <div>
            <h3
              className="text-2xl leading-snug mb-2"
              style={{
                color: '#1F4D4F',
                fontFamily: '"Playfair Display", Georgia, serif',
                fontWeight: 700,
              }}
            >
              {bean.name}
            </h3>
            <div className="h-px w-10" style={{ backgroundColor: bean.accentColor }} />
          </div>

          {/* Flavor notes */}
          <div className="flex flex-wrap gap-2">
            {bean.flavorNotes.map((note) => (
              <span
                key={note}
                className="text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 rounded-full"
                style={{
                  backgroundColor: `${bean.accentColor}16`,
                  color: bean.accentColor,
                  border: `1px solid ${bean.accentColor}2E`,
                }}
              >
                {note}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-sm leading-[1.8] flex-1" style={{ color: '#6B7F7E' }}>
            {bean.description}
          </p>

          {/* Roast bar */}
          <RoastBar level={bean.roastLevel} accentColor={bean.accentColor} />

          {/* Divider */}
          <div className="h-px w-full" style={{ backgroundColor: '#D9DFDC' }} />

          {/* CTA */}
          <Link
            href="/beans"
            className="group inline-flex items-center gap-2 text-sm font-medium tracking-wide transition-colors duration-300"
            style={{ color: bean.accentColor }}
            aria-label={`Discover more about ${bean.name}`}
          >
            <span className="relative">
              Discover More
              <span
                className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                style={{ backgroundColor: bean.accentColor }}
                aria-hidden="true"
              />
            </span>
            <span
              className="transform transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Section animation variants
// ---------------------------------------------------------------------------

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const headingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  },
};

// ---------------------------------------------------------------------------
// FeaturedBeans Section
// ---------------------------------------------------------------------------

export default function FeaturedBeans() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: '#F6F1E9' }}
      aria-labelledby="featured-beans-heading"
    >
      {/* Subtle background texture bars */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(212,165,90,0.04) 80px)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-28 md:py-36">

        {/* Section header */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16 md:mb-20 max-w-2xl"
        >
          <motion.p
            variants={headingVariants}
            className="text-[10px] tracking-[0.4em] uppercase mb-5"
            style={{ color: '#D4A55A' }}
          >
            Single Origin &middot; Nepal
          </motion.p>

          <motion.h2
            id="featured-beans-heading"
            variants={headingVariants}
            className="mb-6 leading-[1.1]"
            style={{
              color: '#1F4D4F',
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: 700,
              fontSize: 'clamp(2.25rem, 5.5vw, 4rem)',
            }}
          >
            Rare Beans,
            <br />
            <em style={{ fontStyle: 'italic', color: '#D4A55A' }}>Extraordinary Journey</em>
          </motion.h2>

          <motion.div
            variants={headingVariants}
            className="h-px w-20 mb-6"
            style={{ backgroundColor: '#D4A55A' }}
            aria-hidden="true"
          />

          <motion.p
            variants={headingVariants}
            className="text-base md:text-lg leading-[1.8]"
            style={{ color: '#6B7F7E' }}
          >
            Three distinct expressions of Nepal&rsquo;s Himalayan terroir. Each bean
            selected by hand, processed with care, and roasted to reveal its truest character.
          </motion.p>
        </motion.div>

        {/* Card grid */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          style={{ alignItems: 'stretch' }}
        >
          {BEANS.map((bean, i) => (
            <TiltCard key={bean.name} bean={bean} index={i} />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          className="mt-16 flex items-center justify-center"
        >
          <Link
            href="/beans"
            className="group relative inline-flex items-center gap-3 px-9 py-4 text-sm tracking-[0.18em] uppercase font-medium overflow-hidden rounded-sm transition-colors duration-300"
            style={{ backgroundColor: '#1F4D4F', color: '#F6F1E9' }}
          >
            <span className="relative z-10">View All Beans</span>
            <span
              className="relative z-10 transform transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
            {/* Slide-in hover fill */}
            <span
              className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"
              style={{ backgroundColor: '#D4A55A' }}
              aria-hidden="true"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
