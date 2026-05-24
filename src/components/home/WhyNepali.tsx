'use client';

import React from 'react';
import { motion } from 'framer-motion';

// ---------------------------------------------------------------------------
// SVG Icons
// ---------------------------------------------------------------------------

function MountainIcon() {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Back peak */}
      <path
        d="M6 38L18 14l7 10 5-8L40 38H6Z"
        stroke="#B08D57"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Snow cap */}
      <path
        d="M18 14l2.5 4L22 16l1.5 2.5L25 14"
        stroke="#B08D57"
        strokeWidth="1.2"
        strokeLinejoin="round"
        fill="rgba(176,141,87,0.18)"
      />
      {/* Altitude marker */}
      <line x1="18" y1="14" x2="18" y2="9" stroke="#B08D57" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="14.5" y1="9" x2="21.5" y2="9" stroke="#B08D57" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function HandIcon() {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Palm + fingers */}
      <path
        d="M16 34V20a2.5 2.5 0 0 1 5 0v7"
        stroke="#B08D57"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 27V18a2.5 2.5 0 0 1 5 0v9"
        stroke="#B08D57"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26 27V19a2.5 2.5 0 0 1 5 0v8"
        stroke="#B08D57"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M31 27v-6a2.5 2.5 0 0 1 5 0v10a10 10 0 0 1-10 10h-2a10 10 0 0 1-10-10v-5"
        stroke="#B08D57"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Cherry on palm */}
      <circle cx="18.5" cy="26" r="2" fill="#B08D57" opacity="0.45" />
    </svg>
  );
}

function BeanIcon() {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Bean body */}
      <ellipse
        cx="22"
        cy="22"
        rx="10"
        ry="15"
        transform="rotate(-18 22 22)"
        stroke="#B08D57"
        strokeWidth="1.5"
        fill="rgba(176,141,87,0.06)"
      />
      {/* Crease */}
      <path
        d="M15 13c4 4 5 12 3 18"
        stroke="#B08D57"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Origin dots */}
      <circle cx="29" cy="14" r="2" fill="#B08D57" opacity="0.5" />
      <circle cx="33" cy="20" r="1.5" fill="#B08D57" opacity="0.3" />
      <circle cx="31" cy="27" r="1" fill="#B08D57" opacity="0.25" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Types & Data
// ---------------------------------------------------------------------------

interface Feature {
  icon: React.ReactNode;
  heading: string;
  subheading: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    icon: <MountainIcon />,
    heading: 'High Altitude',
    subheading: '2000m+',
    description:
      "Nepal's coffee grows at extraordinary elevations where cool nights and warm days force beans to develop slowly, concentrating natural sugars and building complex, layered flavors that lowland varieties simply cannot replicate.",
  },
  {
    icon: <HandIcon />,
    heading: 'Hand Picked',
    subheading: 'Artisan Harvest',
    description:
      'Small family farms across Gulmi, Palpa, and Syangja harvest each cherry by hand, selecting only ripe fruit at peak sweetness. This meticulous, generational care translates directly into every cup.',
  },
  {
    icon: <BeanIcon />,
    heading: 'Rare Origin',
    subheading: "Nepal's Best-Kept Secret",
    description:
      "Nepal's specialty coffee scene is one of the world's most exciting emerging origins. Fewer than 0.1% of global coffee drinkers have tasted it — until now. Each cup is a genuine, traceable discovery.",
  },
];

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const headingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  },
};

// ---------------------------------------------------------------------------
// Feature Card
// ---------------------------------------------------------------------------

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

function FeatureCard({ feature, index }: FeatureCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      custom={index}
      className="group relative flex flex-col gap-5 sm:gap-6 p-7 sm:p-10 lg:p-12"
      style={{ backgroundColor: '#222222' }}
    >
      {/* Hover left-border accent */}
      <div
        className="absolute left-0 top-6 bottom-6 w-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ backgroundColor: '#B08D57' }}
        aria-hidden="true"
      />

      {/* Icon container */}
      <div
        className="w-14 h-14 flex items-center justify-center rounded-sm"
        style={{ backgroundColor: 'rgba(176,141,87,0.08)' }}
      >
        {feature.icon}
      </div>

      {/* Text block */}
      <div className="flex flex-col gap-2 sm:gap-3">
        <p
          className="text-[10px] tracking-[0.3em] uppercase"
          style={{ color: '#B08D57' }}
        >
          {feature.subheading}
        </p>
        <h3
          className="text-xl sm:text-2xl md:text-[1.65rem] leading-snug"
          style={{
            color: '#F5EFE6',
            fontFamily: '"Playfair Display", Georgia, serif',
            fontWeight: 700,
          }}
        >
          {feature.heading}
        </h3>
        <p className="text-sm leading-[1.8] font-light" style={{ color: '#8C8477' }}>
          {feature.description}
        </p>
      </div>

      {/* Bottom gold line, grows on hover */}
      <div
        className="h-px w-0 group-hover:w-14 transition-all duration-500"
        style={{ backgroundColor: '#B08D57' }}
        aria-hidden="true"
      />
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------

export default function WhyNepali() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: '#222222' }}
      aria-labelledby="why-nepali-heading"
    >
      {/* Top divider */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, #B08D57 40%, #B08D57 60%, transparent)' }}
        aria-hidden="true"
      />

      {/* Watermark numeral */}
      <span
        className="pointer-events-none select-none absolute right-0 top-0 leading-none tracking-tighter"
        style={{
          color: '#F5EFE6',
          opacity: 0.025,
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: 'clamp(80px, 18vw, 260px)',
          lineHeight: 0.9,
        }}
        aria-hidden="true"
      >
        01
      </span>

      <div
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10"
        style={{ paddingTop: 'clamp(3.5rem, 8vw, 9rem)', paddingBottom: 'clamp(3.5rem, 8vw, 9rem)' }}
      >

        {/* ── Intro block ── */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-3xl mb-12 sm:mb-16 md:mb-20 lg:mb-28"
        >
          {/* Eyebrow */}
          <motion.p
            variants={headingVariants}
            className="text-[10px] tracking-[0.4em] uppercase mb-5 sm:mb-6"
            style={{ color: '#B08D57' }}
          >
            Origin &middot; Craft &middot; Excellence
          </motion.p>

          {/* Main heading */}
          <motion.h2
            id="why-nepali-heading"
            variants={headingVariants}
            className="mb-6 sm:mb-8 leading-[1.1]"
            style={{
              color: '#F5EFE6',
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: 700,
              fontSize: 'clamp(2rem, 6vw, 4.5rem)',
            }}
          >
            Why Nepali
            <br />
            <em style={{ fontStyle: 'italic', color: '#B08D57' }}>Coffee?</em>
          </motion.h2>

          {/* Gold rule */}
          <motion.div
            variants={headingVariants}
            className="h-px w-20 mb-6 sm:mb-8"
            style={{ backgroundColor: '#B08D57' }}
            aria-hidden="true"
          />

          {/* Intro paragraph */}
          <motion.p
            variants={headingVariants}
            className="text-base sm:text-lg md:text-xl leading-[1.8] font-light"
            style={{ color: '#8C8477' }}
          >
            The Himalayas have shaped some of the world&rsquo;s most dramatic landscapes —
            and some of its most extraordinary coffee. Grown between 1,400&nbsp;m and
            2,100&nbsp;m, Nepali beans develop a density and flavor complexity that
            lower-altitude origins simply cannot match. Combined with generations of farming
            wisdom passed through small family cooperatives, what arrives in your cup is
            something genuinely rare.
          </motion.p>
        </motion.div>

        {/* ── Feature columns — 1 col mobile, 3 col md ── */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px"
          style={{ backgroundColor: 'rgba(176,141,87,0.13)' }}
        >
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.heading} feature={feature} index={i} />
          ))}
        </motion.div>

        {/* ── Stats row — 2 col mobile, 4 col md ── */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mt-10 sm:mt-14 lg:mt-20 grid grid-cols-2 md:grid-cols-4 gap-px"
          style={{ backgroundColor: 'rgba(176,141,87,0.08)' }}
        >
          {[
            { value: '2100m', label: 'Max Elevation' },
            { value: '3', label: 'Sourced Regions' },
            { value: '100%', label: 'Hand Picked' },
            { value: '<0.1%', label: 'Global Supply' },
          ].map(({ value, label }) => (
            <motion.div
              key={label}
              variants={headingVariants}
              className="flex flex-col gap-1.5 sm:gap-2 p-5 sm:p-8 md:p-10"
              style={{ backgroundColor: '#222222' }}
            >
              <span
                className="leading-none"
                style={{
                  color: '#B08D57',
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: 'clamp(1.4rem, 4vw, 2.6rem)',
                  fontWeight: 700,
                }}
              >
                {value}
              </span>
              <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: '#8C8477' }}>
                {label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom divider */}
      <div
        className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, #B08D57 40%, #B08D57 60%, transparent)' }}
        aria-hidden="true"
      />
    </section>
  );
}
