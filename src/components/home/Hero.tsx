'use client';

import React, { useRef } from 'react';
import {
  useMotionValue,
  useScroll,
  useTransform,
  motion,
  Variants,
} from 'framer-motion';
import MagneticButton from '@/components/ui/MagneticButton';

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

// Cubic-bezier as a typed tuple so Framer Motion v12 accepts it
const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─────────────────────────────────────────────────────────────────────────────
// CSS Floating Bean Particle Data
// Each bean has fixed position, animation duration, and delay — no JS loops
// ─────────────────────────────────────────────────────────────────────────────

interface BeanParticle {
  left: string;
  top: string;
  width: string;
  height: string;
  opacity: number;
  duration: string;
  delay: string;
  rotate: string;
  driftX: string;
}

const BEAN_PARTICLES: BeanParticle[] = [
  { left: '5%',  top: '75%', width: '9px',  height: '6px',  opacity: 0.18, duration: '22s', delay: '0s',    rotate: '15deg',  driftX: '18px'  },
  { left: '12%', top: '82%', width: '7px',  height: '5px',  opacity: 0.22, duration: '28s', delay: '3s',    rotate: '-20deg', driftX: '-14px' },
  { left: '20%', top: '68%', width: '11px', height: '7px',  opacity: 0.15, duration: '34s', delay: '7s',    rotate: '35deg',  driftX: '22px'  },
  { left: '28%', top: '88%', width: '8px',  height: '5px',  opacity: 0.28, duration: '19s', delay: '1.5s',  rotate: '-10deg', driftX: '-10px' },
  { left: '35%', top: '72%', width: '10px', height: '6px',  opacity: 0.20, duration: '25s', delay: '9s',    rotate: '45deg',  driftX: '16px'  },
  { left: '42%', top: '91%', width: '6px',  height: '4px',  opacity: 0.32, duration: '31s', delay: '4s',    rotate: '-30deg', driftX: '-20px' },
  { left: '50%', top: '78%', width: '12px', height: '8px',  opacity: 0.14, duration: '40s', delay: '12s',   rotate: '8deg',   driftX: '12px'  },
  { left: '58%', top: '85%', width: '7px',  height: '5px',  opacity: 0.25, duration: '23s', delay: '6s',    rotate: '-42deg', driftX: '-16px' },
  { left: '65%', top: '70%', width: '9px',  height: '6px',  opacity: 0.19, duration: '37s', delay: '2s',    rotate: '22deg',  driftX: '20px'  },
  { left: '72%', top: '93%', width: '8px',  height: '5px',  opacity: 0.30, duration: '20s', delay: '8s',    rotate: '-15deg', driftX: '-12px' },
  { left: '80%', top: '76%', width: '10px', height: '7px',  opacity: 0.17, duration: '29s', delay: '14s',   rotate: '50deg',  driftX: '14px'  },
  { left: '88%', top: '88%', width: '6px',  height: '4px',  opacity: 0.24, duration: '33s', delay: '5s',    rotate: '-38deg', driftX: '-18px' },
  { left: '93%', top: '65%', width: '11px', height: '7px',  opacity: 0.16, duration: '26s', delay: '10s',   rotate: '28deg',  driftX: '10px'  },
  { left: '8%',  top: '55%', width: '7px',  height: '5px',  opacity: 0.20, duration: '44s', delay: '16s',   rotate: '-25deg', driftX: '-8px'  },
  { left: '78%', top: '58%', width: '8px',  height: '5px',  opacity: 0.18, duration: '38s', delay: '11s',   rotate: '18deg',  driftX: '16px'  },
  { left: '47%', top: '60%', width: '6px',  height: '4px',  opacity: 0.14, duration: '48s', delay: '18s',   rotate: '-12deg', driftX: '-6px'  },
  { left: '32%', top: '50%', width: '9px',  height: '6px',  opacity: 0.12, duration: '52s', delay: '22s',   rotate: '40deg',  driftX: '10px'  },
  { left: '62%', top: '48%', width: '7px',  height: '5px',  opacity: 0.13, duration: '46s', delay: '20s',   rotate: '-32deg', driftX: '-14px' },
];

// ─────────────────────────────────────────────────────────────────────────────
// CSS Keyframe Injection (runs once, appended to <head>)
// We do this in a style tag rather than globals.css so the component is
// self-contained and the keyframes are scoped to this usage.
// ─────────────────────────────────────────────────────────────────────────────

const BEAN_KEYFRAMES = `
@keyframes floatBean {
  0%   { transform: translateY(0px)   translateX(0px)   rotate(var(--bean-rotate)); opacity: 0; }
  8%   { opacity: var(--bean-opacity); }
  92%  { opacity: var(--bean-opacity); }
  100% { transform: translateY(-110vh) translateX(var(--bean-drift-x)) rotate(var(--bean-rotate)); opacity: 0; }
}
`;

function BeanKeyframesStyle() {
  return <style>{BEAN_KEYFRAMES}</style>;
}

// ─────────────────────────────────────────────────────────────────────────────
// CSS-only Floating Coffee Bean Particles
// ─────────────────────────────────────────────────────────────────────────────

function CSSBeanParticles() {
  return (
    <>
      <BeanKeyframesStyle />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        {BEAN_PARTICLES.map((bean, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: bean.left,
              top: bean.top,
              width: bean.width,
              height: bean.height,
              // Coffee bean oval shape
              borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
              background: 'radial-gradient(ellipse at 35% 40%, #5a3820, #0E0A07)',
              // CSS custom properties feed the keyframe
              ['--bean-rotate' as string]: bean.rotate,
              ['--bean-opacity' as string]: bean.opacity,
              ['--bean-drift-x' as string]: bean.driftX,
              animation: `floatBean ${bean.duration} ${bean.delay} infinite linear`,
              willChange: 'transform, opacity',
            }}
          />
        ))}
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SVG — Multi-layer Mountain Silhouette
// ─────────────────────────────────────────────────────────────────────────────

function MountainSilhouette({ yOffset }: { yOffset: number }) {
  return (
    <svg
      viewBox="0 0 1440 500"
      preserveAspectRatio="xMidYMax meet"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '65%',
        transform: `translateY(${yOffset}px)`,
        willChange: 'transform',
        pointerEvents: 'none',
      }}
    >
      {/* Far range — lightest dark, creates distance */}
      <path
        d="M0,500 L0,280 L90,200 L180,255 L280,140 L370,190 L460,110
           L560,170 L640,95 L730,160 L820,100 L920,155 L1010,70
           L1110,130 L1200,85 L1300,145 L1380,105 L1440,150 L1440,500 Z"
        fill="#2a1810"
      />
      {/* Mid range */}
      <path
        d="M0,500 L0,340 L80,280 L160,310 L260,220 L340,265 L430,195
           L520,240 L610,175 L700,225 L790,165 L880,215 L970,155
           L1060,200 L1150,160 L1240,205 L1330,175 L1440,220 L1440,500 Z"
        fill="#221409"
      />
      {/* Near range — darkest, most dominant */}
      <path
        d="M0,500 L0,390 L100,330 L200,370 L310,295 L400,340 L500,275
           L590,320 L680,260 L770,305 L860,250 L950,300 L1040,235
           L1130,280 L1220,250 L1310,290 L1440,265 L1440,500 Z"
        fill="#0A0704"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Animation Variants
// ─────────────────────────────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const fadeSlideUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: EASE_OUT_EXPO },
  },
};

const labelVariant: Variants = {
  hidden: { opacity: 0, y: 16, scaleX: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scaleX: 1,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Animated Headline — word-level slide-up reveal
// ─────────────────────────────────────────────────────────────────────────────

function AnimatedHeadline({ line }: { line: string }) {
  const words = line.split(' ');

  return (
    <>
      {words.map((word, i) => (
        <React.Fragment key={i}>
          {/* Overflow clip container per word */}
          <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
            <motion.span
              variants={{
                hidden: { y: '110%' },
                visible: {
                  y: 0,
                  transition: {
                    duration: 0.9,
                    ease: EASE_OUT_EXPO,
                    delay: i * 0.07,
                  },
                },
              }}
              style={{ display: 'inline-block' }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 && ' '}
        </React.Fragment>
      ))}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Scroll Indicator — animated mouse + chevron
// ─────────────────────────────────────────────────────────────────────────────

function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.2, duration: 0.8 }}
      aria-hidden="true"
      style={{
        position: 'absolute',
        bottom: '2.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.4rem',
        color: '#EDE0CC',
        zIndex: 20,
        cursor: 'default',
        userSelect: 'none',
      }}
    >
      <span
        style={{
          fontSize: '10px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          opacity: 0.55,
          fontFamily: 'var(--font-inter), Inter, sans-serif',
        }}
      >
        Scroll
      </span>

      {/* Mouse outline */}
      <div
        style={{
          width: '22px',
          height: '34px',
          border: '1.5px solid rgba(230,216,201,0.45)',
          borderRadius: '11px',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '5px',
        }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: '3px',
            height: '6px',
            borderRadius: '2px',
            background: '#7C4828',
          }}
        />
      </div>

      {/* Chevron arrow */}
      <motion.svg
        width="14"
        height="8"
        viewBox="0 0 14 8"
        fill="none"
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
      >
        <path
          d="M1 1L7 7L13 1"
          stroke="#7C4828"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Hero — Main Export
// ─────────────────────────────────────────────────────────────────────────────

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollY } = useScroll();

  // Mountains scroll up slower than the viewport (parallax depth)
  const mountainY = useTransform(scrollY, [0, 600], [0, 80]);
  // Content floats slightly upward on scroll
  const contentY = useTransform(scrollY, [0, 600], [0, -60]);
  // Entire section fades out as user scrolls past
  const sectionOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  // Bridge MotionValue → plain number for MountainSilhouette's style prop
  const mountainYNum = useMotionValue(0);
  mountainY.on('change', (v) => mountainYNum.set(v));

  return (
    <motion.section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        // Deep gradient: dark espresso at bottom, lighter at top
        background: 'linear-gradient(to top, #0A0704 0%, #2D1B12 50%, #4a3728 100%)',
        opacity: sectionOpacity,
      }}
    >
      {/* ── CSS-only Floating Coffee Bean Particles ──────────────────────────── */}
      <CSSBeanParticles />

      {/* ── Radial glow behind text centre — warm gold bloom ─────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          background:
            'radial-gradient(ellipse 60% 40% at 50% 60%, rgba(124,72,40,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Mountain Silhouette (parallax-scrolled) ─────────────────────────── */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 4,
          pointerEvents: 'none',
          y: mountainY,
        }}
      >
        <MountainSilhouette yOffset={0} />
      </motion.div>

      {/* ── Radial vignette for cinematic depth ─────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 5,
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, transparent 30%, rgba(26,15,9,0.4) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Main Content ────────────────────────────────────────────────────── */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 1.5rem',
          y: contentY,
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem',
          }}
        >
          {/* ── Origin Label ──────────────────────────────────────────────── */}
          <motion.div
            variants={labelVariant}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              color: 'rgba(237,224,204,0.45)',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                display: 'block',
                width: '2.5rem',
                height: '1px',
                background: 'rgba(237,224,204,0.3)',
              }}
            />
            <span
              style={{
                fontSize: '11px',
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-inter), Inter, sans-serif',
                fontWeight: 500,
              }}
            >
              Est. 2024 · Nepal → Australia
            </span>
            <span
              aria-hidden="true"
              style={{
                display: 'block',
                width: '2.5rem',
                height: '1px',
                background: 'rgba(237,224,204,0.3)',
              }}
            />
          </motion.div>

          {/* ── Headline ──────────────────────────────────────────────────── */}
          <motion.h1
            variants={containerVariants}
            style={{
              margin: 0,
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              fontFamily: "'Playfair Display', var(--font-playfair), serif",
              fontSize: 'clamp(32px, 8vw, 96px)',
              fontWeight: 700,
            }}
          >
            {/* Line 1 — cream */}
            <span style={{ display: 'block', color: '#F5EDE0' }}>
              <AnimatedHeadline line="Crafted Above" />
            </span>
            {/* Line 2 — cream italic */}
            <span
              style={{
                display: 'block',
                color: 'rgba(237,224,204,0.75)',
                fontStyle: 'italic',
              }}
            >
              <AnimatedHeadline line="the Clouds" />
            </span>
          </motion.h1>

          {/* ── Sub-headline ──────────────────────────────────────────────── */}
          <motion.p
            variants={fadeSlideUp}
            style={{
              margin: 0,
              maxWidth: '600px',
              fontSize: 'clamp(15px, 4vw, 18px)',
              lineHeight: 1.7,
              color: 'rgba(237,224,204,0.68)',
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              fontWeight: 400,
            }}
          >
            Single-origin specialty coffee from Nepal&apos;s Himalayan highlands — sourced above 2,000 metres, roasted in Melbourne.
          </motion.p>

          {/* ── Intimate Quote ────────────────────────────────────────────── */}
          <motion.p
            variants={fadeSlideUp}
            style={{
              margin: '-0.5rem 0 0',
              fontFamily: "'Playfair Display', var(--font-playfair), serif",
              fontStyle: 'italic',
              fontSize: 'clamp(12px, 2vw, 14px)',
              letterSpacing: '0.08em',
              color: 'rgba(237,224,204,0.5)',
              maxWidth: '400px',
            }}
          >
            &ldquo;Every cup carries a story 2,000 metres high.&rdquo;
          </motion.p>

          {/* ── CTA Buttons ───────────────────────────────────────────────── */}
          <motion.div
            variants={fadeSlideUp}
            style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginTop: '0.5rem',
            }}
          >
            {/* Primary — Explore Our Beans */}
            <MagneticButton>
              <a
                href="/beans"
                style={{
                  display: 'inline-block',
                  padding: '0.75rem 1.75rem',
                  background: '#7C4828',
                  color: '#0A0704',
                  border: 'none',
                  borderRadius: '2px',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  transition: 'background 0.2s ease',
                  boxShadow: '0 4px 24px rgba(124,72,40,0.3)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = '#c9a26a';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = '#7C4828';
                }}
              >
                Explore Our Beans
              </a>
            </MagneticButton>

            {/* Secondary — Our Story */}
            <MagneticButton>
              <a
                href="/about"
                style={{
                  display: 'inline-block',
                  padding: '0.75rem 1.75rem',
                  background: 'transparent',
                  color: '#F5EDE0',
                  border: '1.5px solid rgba(237,224,204,0.45)',
                  borderRadius: '2px',
                  fontSize: '13px',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s ease, background 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = 'rgba(237,224,204,0.85)';
                  el.style.background = 'rgba(237,224,204,0.06)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = 'rgba(237,224,204,0.45)';
                  el.style.background = 'transparent';
                }}
              >
                Our Story
              </a>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── Scroll Indicator ────────────────────────────────────────────────── */}
      <ScrollIndicator />

      {/* ── Bottom vignette — blends into next section ──────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '200px',
          background: 'linear-gradient(to top, #0A0704 0%, transparent 100%)',
          zIndex: 6,
          pointerEvents: 'none',
        }}
      />
    </motion.section>
  );
}
