'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const REGIONS = [
  {
    name: 'Gulmi',
    alt: '1400–1800m',
    trait: 'Rich volcanic soil, dense beans',
    note: 'Stone fruit & dark chocolate',
  },
  {
    name: 'Palpa',
    alt: '1200–2100m',
    trait: 'Shade-grown under native trees',
    note: 'Floral · Citrus brightness',
  },
  {
    name: 'Syangja',
    alt: '1300–1950m',
    trait: 'River valley mist & cool nights',
    note: 'Smooth body, low acidity',
  },
  {
    name: 'Kavre',
    alt: '1100–1500m',
    trait: 'Organic farming pioneers',
    note: 'Caramel & walnut undertones',
  },
  {
    name: 'Nuwakot',
    alt: '1200–1600m',
    trait: 'Slow cold-night maturation',
    note: 'Complex & layered character',
  },
  {
    name: 'Lalitpur',
    alt: '1000–1300m',
    trait: 'Heritage varietals preserved',
    note: 'Delicate floral sweetness',
  },
];

const PHOTO_FRAMES = [
  {
    label: 'Gulmi Hillside · Dawn',
    gradient: 'linear-gradient(145deg, #3B2A21 0%, #2D1B12 55%, #1a0f09 100%)',
    rotation: -2.5,
    offsetY: 0,
    accentColor: '#B08D57',
  },
  {
    label: 'Palpa Ridge · Morning Mist',
    gradient: 'linear-gradient(155deg, #4a3728 0%, #3B2A21 50%, #2D1B12 100%)',
    rotation: 1.8,
    offsetY: -20,
    accentColor: '#C4A97A',
  },
  {
    label: 'Syangja Valley · Harvest',
    gradient: 'linear-gradient(130deg, #2D1B12 0%, #4a3728 45%, #3B2A21 100%)',
    rotation: -1.2,
    offsetY: -8,
    accentColor: '#8C6A3F',
  },
];

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
};

const childUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  },
};

const fadeCustom = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] },
  }),
};

// ---------------------------------------------------------------------------
// Framed photo placeholder
// ---------------------------------------------------------------------------

interface PhotoFrameProps {
  label: string;
  gradient: string;
  rotation: number;
  offsetY: number;
  accentColor: string;
  delay: number;
}

function PhotoFrame({ label, gradient, rotation, offsetY, accentColor, delay }: PhotoFrameProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 35 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
      className="relative overflow-hidden rounded-sm"
      style={{
        background: gradient,
        border: '1px solid rgba(176,141,87,0.18)',
        transform: `rotate(${rotation}deg) translateY(${offsetY}px)`,
        boxShadow: '0 22px 55px rgba(0,0,0,0.55), 0 4px 12px rgba(0,0,0,0.4)',
        aspectRatio: '4/3',
      }}
    >
      {/* Top accent */}
      <div className="h-[3px] w-full" style={{ backgroundColor: accentColor }} />

      {/* Mountain silhouette */}
      <svg
        viewBox="0 0 400 160"
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '55%',
          opacity: 0.22,
        }}
      >
        <path
          d="M0,160 L0,100 L60,50 L95,75 L140,25 L180,60 L220,15 L265,55 L305,35 L345,62 L380,42 L400,58 L400,160Z"
          fill={accentColor}
        />
        <path
          d="M0,160 L0,130 L50,100 L90,115 L140,80 L190,105 L240,70 L290,100 L340,85 L400,105 L400,160Z"
          fill="rgba(0,0,0,0.35)"
        />
      </svg>

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 20%, rgba(245,239,230,0.07) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Caption */}
      <div
        className="absolute bottom-0 inset-x-0 px-4 py-3"
        style={{ backgroundColor: 'rgba(26,15,9,0.72)', backdropFilter: 'blur(4px)' }}
      >
        <p
          className="text-[10px] tracking-[0.28em] uppercase"
          style={{ color: 'rgba(245,239,230,0.55)' }}
        >
          {label}
        </p>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// OriginStory
// ---------------------------------------------------------------------------

export default function OriginStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const watermarkY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  return (
    <section
      ref={sectionRef}
      style={{ backgroundColor: '#3B2A21', position: 'relative', overflow: 'hidden' }}
      aria-labelledby="origin-story-heading"
    >
      {/* ── NEPAL watermark ── */}
      <motion.div
        style={{ y: watermarkY }}
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <span
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(110px, 22vw, 340px)',
            fontWeight: 900,
            color: 'rgba(245,239,230,0.032)',
            letterSpacing: '-0.04em',
            lineHeight: 1,
            whiteSpace: 'nowrap',
          }}
        >
          NEPAL
        </span>
      </motion.div>

      {/* Top gold line */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background:
            'linear-gradient(to right, transparent, #B08D57 30%, #B08D57 70%, transparent)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 py-28 md:py-36">

        {/* ── Header ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-20"
        >
          <motion.p
            variants={childUp}
            className="text-[10px] tracking-[0.4em] uppercase mb-5"
            style={{ color: '#B08D57' }}
          >
            Heritage &middot; Land &middot; Legacy
          </motion.p>

          <motion.h2
            id="origin-story-heading"
            variants={childUp}
            className="leading-[1.1] max-w-2xl"
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(2.25rem, 5.5vw, 4.25rem)',
              fontWeight: 700,
              color: '#F5EFE6',
              letterSpacing: '-0.02em',
            }}
          >
            Born in the Clouds,
            <br />
            <em style={{ fontStyle: 'italic', color: '#B08D57' }}>Grown by Hand</em>
          </motion.h2>
        </motion.div>

        {/* ── Two-column ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start mb-24 md:mb-32">

          {/* Left: story text */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="flex flex-col gap-7"
          >
            {/* Gold rule */}
            <motion.div
              variants={childUp}
              className="h-px w-20"
              style={{ backgroundColor: '#B08D57' }}
              aria-hidden="true"
            />

            <motion.div variants={childUp} className="flex flex-col gap-5">
              <p
                className="text-base md:text-[1.05rem] leading-[1.9] font-light"
                style={{ color: 'rgba(245,239,230,0.72)' }}
              >
                Nestled in the Himalayan foothills, Nepal&rsquo;s coffee farms sit between
                1,000 and 2,100 metres above sea level — an altitude that fundamentally
                transforms the bean. Cool mountain air slows cherry development, allowing
                natural sugars to concentrate and flavours to deepen into something
                extraordinary. Thin air, wide temperature swings, and volcanic soils do what
                no roaster ever could.
              </p>
              <p
                className="text-base md:text-[1.05rem] leading-[1.9] font-light"
                style={{ color: 'rgba(245,239,230,0.72)' }}
              >
                Nepal&rsquo;s coffee story began quietly in the 1970s, carried by a few
                visionary farmers in{' '}
                <span style={{ color: '#B08D57', fontWeight: 500 }}>Gulmi</span> and{' '}
                <span style={{ color: '#B08D57', fontWeight: 500 }}>Palpa</span>. Today the
                growing regions of{' '}
                <span style={{ color: '#B08D57', fontWeight: 500 }}>Syangja</span>,{' '}
                <span style={{ color: '#B08D57', fontWeight: 500 }}>Kavre</span>, and beyond
                have joined the story — each valley adding its own terroir signature to
                what is becoming specialty coffee&rsquo;s best-kept secret.
              </p>
              <p
                className="text-base md:text-[1.05rem] leading-[1.9] font-light"
                style={{ color: 'rgba(245,239,230,0.72)' }}
              >
                Every HIMA BEANS selection is hand-picked at peak ripeness by families who
                have cultivated these terraced hillsides for generations. No machines. No
                shortcuts. Just patience, altitude, and craft — and a direct relationship
                with the land that cannot be faked.
              </p>
            </motion.div>

            {/* Pull quote */}
            <motion.blockquote
              variants={childUp}
              className="relative border-l-2 pl-6 py-1"
              style={{ borderColor: '#B08D57' }}
            >
              <p
                className="text-xl md:text-2xl leading-[1.55] font-light"
                style={{
                  color: '#F5EFE6',
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontStyle: 'italic',
                }}
              >
                &ldquo;Every cup tells the story of mountains, mist, and morning
                harvests.&rdquo;
              </p>
              <footer
                className="mt-4 text-[10px] tracking-[0.3em] uppercase"
                style={{ color: '#8C8477' }}
              >
                — Hima Beans, Origin Promise
              </footer>
            </motion.blockquote>

            {/* Region chips */}
            <motion.div variants={childUp} className="flex flex-wrap gap-2.5 pt-1">
              {['Gulmi', 'Palpa', 'Syangja', 'Kavre', 'Nuwakot'].map((region) => (
                <span
                  key={region}
                  className="inline-flex items-center gap-2 px-4 py-2 text-[10px] tracking-[0.2em] uppercase rounded-full"
                  style={{
                    backgroundColor: 'rgba(176,141,87,0.1)',
                    color: '#B08D57',
                    border: '1px solid rgba(176,141,87,0.22)',
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: '#B08D57' }}
                    aria-hidden="true"
                  />
                  {region}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: stacked photo frames */}
          <div className="relative flex flex-col gap-5 pt-4 lg:pt-6">
            {PHOTO_FRAMES.map((f, i) => (
              <PhotoFrame
                key={f.label}
                label={f.label}
                gradient={f.gradient}
                rotation={f.rotation}
                offsetY={f.offsetY}
                accentColor={f.accentColor}
                delay={i * 0.18}
              />
            ))}

            {/* Dot grid decorations */}
            <div
              className="absolute -bottom-4 -right-4 w-20 h-20 pointer-events-none"
              aria-hidden="true"
              style={{
                backgroundImage:
                  'radial-gradient(circle, rgba(176,141,87,0.22) 1px, transparent 1px)',
                backgroundSize: '10px 10px',
              }}
            />
            <div
              className="absolute -top-4 -left-6 w-16 h-16 pointer-events-none"
              aria-hidden="true"
              style={{
                backgroundImage:
                  'radial-gradient(circle, rgba(176,141,87,0.16) 1px, transparent 1px)',
                backgroundSize: '8px 8px',
              }}
            />
          </div>
        </div>

        {/* ── Growing regions grid ── */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
            className="mb-8 leading-tight"
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              fontWeight: 700,
              color: '#F5EFE6',
              letterSpacing: '-0.02em',
            }}
          >
            Our Growing Regions
          </motion.h3>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 overflow-hidden rounded-sm"
            style={{ border: '1px solid rgba(176,141,87,0.14)' }}
          >
            {REGIONS.map((region, i) => (
              <motion.div
                key={region.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={fadeCustom}
                className="group relative flex flex-col gap-2 p-7"
                style={{
                  backgroundColor: 'rgba(245,239,230,0.025)',
                  borderRight:
                    i % 3 !== 2 ? '1px solid rgba(176,141,87,0.12)' : 'none',
                  borderBottom:
                    i < 3 ? '1px solid rgba(176,141,87,0.12)' : 'none',
                }}
              >
                {/* Left accent on hover */}
                <div
                  className="absolute left-0 top-4 bottom-4 w-px opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ backgroundColor: '#B08D57' }}
                  aria-hidden="true"
                />

                <div className="flex justify-between items-start">
                  <h4
                    className="text-xl leading-snug"
                    style={{
                      fontFamily: '"Playfair Display", Georgia, serif',
                      fontWeight: 600,
                      color: '#F5EFE6',
                    }}
                  >
                    {region.name}
                  </h4>
                  <span
                    className="text-[9px] tracking-[0.18em] uppercase pt-1 shrink-0"
                    style={{ color: '#B08D57' }}
                  >
                    {region.alt}
                  </span>
                </div>

                <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,239,230,0.6)' }}>
                  {region.trait}
                </p>

                <p
                  className="text-sm"
                  style={{
                    color: '#B08D57',
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontStyle: 'italic',
                  }}
                >
                  {region.note}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gold line */}
      <div
        className="absolute bottom-0 inset-x-0 h-px"
        style={{
          background:
            'linear-gradient(to right, transparent, #B08D57 30%, #B08D57 70%, transparent)',
        }}
        aria-hidden="true"
      />
    </section>
  );
}
