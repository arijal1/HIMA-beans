'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  useMotionValue,
  useScroll,
  useTransform,
  motion,
  Variants,
} from 'framer-motion';
import * as THREE from 'three';
import MagneticButton from '@/components/ui/MagneticButton';

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const BEAN_COUNT = 80;
const MIST_COUNT = 30;
const STEAM_COUNT = 40;

// Cubic-bezier as a typed tuple so Framer Motion v12 accepts it
const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─────────────────────────────────────────────────────────────────────────────
// Three.js — Coffee Bean Particles (instanced mesh)
// ─────────────────────────────────────────────────────────────────────────────

function CoffeeBeansParticles() {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const beans = useMemo(
    () =>
      Array.from({ length: BEAN_COUNT }, () => ({
        x: (Math.random() - 0.5) * 22,
        y: (Math.random() - 0.5) * 14,
        z: (Math.random() - 0.5) * 8 - 2,
        speed: 0.008 + Math.random() * 0.012,
        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
        rotZ: Math.random() * Math.PI * 2,
        rotSpeedX: (Math.random() - 0.5) * 0.008,
        rotSpeedY: (Math.random() - 0.5) * 0.012,
        phase: Math.random() * Math.PI * 2,
      })),
    []
  );

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    beans.forEach((bean, i) => {
      // Drift upward slowly, wrap at bounds
      const yOff = ((bean.y + t * bean.speed * 14 + 7) % 14) - 7;
      const xOff = bean.x + Math.sin(t * 0.3 + bean.phase) * 0.5;

      dummy.position.set(xOff, yOff, bean.z);
      dummy.rotation.set(
        bean.rotX + t * bean.rotSpeedX,
        bean.rotY + t * bean.rotSpeedY,
        bean.rotZ
      );
      // Flatten into ellipsoid bean shape
      dummy.scale.set(0.07, 0.05, 0.045);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, BEAN_COUNT]}>
      <sphereGeometry args={[1, 8, 6]} />
      <meshStandardMaterial
        color="#3B2A21"
        roughness={0.85}
        metalness={0.05}
        transparent
        opacity={0.72}
      />
    </instancedMesh>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Three.js — Fog / Mist Particles
// ─────────────────────────────────────────────────────────────────────────────

function MistParticles() {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const mists = useMemo(
    () =>
      Array.from({ length: MIST_COUNT }, () => ({
        x: (Math.random() - 0.5) * 24,
        y: (Math.random() - 0.5) * 14,
        z: (Math.random() - 0.5) * 6,
        speed: 0.003 + Math.random() * 0.005,
        size: 0.25 + Math.random() * 0.55,
        phase: Math.random() * Math.PI * 2,
      })),
    []
  );

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    mists.forEach((m, i) => {
      const yOff = ((m.y + t * m.speed * 14 + 7) % 14) - 7;
      const xOff = m.x + Math.sin(t * 0.15 + m.phase) * 1.2;
      dummy.position.set(xOff, yOff, m.z);
      dummy.scale.setScalar(m.size);
      dummy.rotation.set(0, 0, t * 0.02);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, MIST_COUNT]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial
        color="#F5EFE6"
        transparent
        opacity={0.055}
        roughness={1}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Three.js — Steam Rising Particles
// ─────────────────────────────────────────────────────────────────────────────

function SteamParticles() {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const steams = useMemo(
    () =>
      Array.from({ length: STEAM_COUNT }, () => ({
        x: (Math.random() - 0.5) * 10,
        baseY: -7 + Math.random() * 1.5,
        z: (Math.random() - 0.5) * 3 - 1,
        speed: 0.025 + Math.random() * 0.03,
        size: 0.018 + Math.random() * 0.025,
        phase: Math.random() * Math.PI * 2,
      })),
    []
  );

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    steams.forEach((s, i) => {
      const elapsed = (t * s.speed + s.phase / (Math.PI * 2)) % 1;
      const yOff = s.baseY + elapsed * 10;
      const xOff = s.x + Math.sin(t * 0.4 + s.phase) * 0.3;

      dummy.position.set(xOff, yOff, s.z);
      dummy.scale.setScalar(s.size * (0.5 + elapsed * 1.5));
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, STEAM_COUNT]}>
      <sphereGeometry args={[1, 5, 5]} />
      <meshStandardMaterial
        color="#ffffff"
        transparent
        opacity={0.12}
        roughness={1}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Three.js — Full Atmospheric Scene
// ─────────────────────────────────────────────────────────────────────────────

function AtmosphericScene() {
  return (
    <>
      {/* Warm amber ambient fill */}
      <ambientLight intensity={0.35} color="#c8a97a" />
      {/* Key light from upper-right */}
      <directionalLight
        position={[5, 8, 4]}
        intensity={0.6}
        color="#F5EFE6"
        castShadow={false}
      />
      {/* Subtle fill from lower-left in gold */}
      <directionalLight
        position={[-4, -2, -3]}
        intensity={0.2}
        color="#B08D57"
      />
      {/* Atmospheric depth fog */}
      <fog attach="fog" args={['#1a0f09', 12, 30]} />

      <CoffeeBeansParticles />
      <MistParticles />
      <SteamParticles />
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
        fill="#1a0f09"
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
          {i < words.length - 1 && ' '}
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
        color: '#E6D8C9',
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
            background: '#B08D57',
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
          stroke="#B08D57"
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
        background: 'linear-gradient(to top, #1a0f09 0%, #2D1B12 50%, #4a3728 100%)',
        opacity: sectionOpacity,
      }}
    >
      {/* ── Three.js Canvas Overlay ─────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 10], fov: 60, near: 0.1, far: 100 }}
          gl={{ alpha: true, antialias: false }}
          style={{ width: '100%', height: '100%' }}
          dpr={[1, 1.5]}
        >
          <AtmosphericScene />
        </Canvas>
      </div>

      {/* ── Mountain Silhouette (parallax-scrolled) ─────────────────────────── */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
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
          zIndex: 4,
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
              color: '#B08D57',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                display: 'block',
                width: '2.5rem',
                height: '1px',
                background: '#B08D57',
                opacity: 0.7,
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
              Nepal · Altitude 2000M+
            </span>
            <span
              aria-hidden="true"
              style={{
                display: 'block',
                width: '2.5rem',
                height: '1px',
                background: '#B08D57',
                opacity: 0.7,
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
              color: '#F5EFE6',
              fontFamily: "'Playfair Display', var(--font-playfair), serif",
              fontSize: 'clamp(32px, 8vw, 96px)',
              fontWeight: 700,
            }}
          >
            <span style={{ display: 'block' }}>
              <AnimatedHeadline line="Himalayan Coffee," />
            </span>
            <span
              style={{
                display: 'block',
                color: '#E6D8C9',
                fontStyle: 'italic',
              }}
            >
              <AnimatedHeadline line="Perfected at Altitude" />
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
              color: 'rgba(245,239,230,0.68)',
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              fontWeight: 400,
            }}
          >
            Rare specialty beans from Nepal, crafted for Australia.
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
            {/* Primary — Explore Beans */}
            <MagneticButton>
              <button
                type="button"
                style={{
                  padding: '0.75rem 1.5rem',
                  width: '100%',
                  maxWidth: '280px',
                  background: '#B08D57',
                  color: '#1a0f09',
                  border: 'none',
                  borderRadius: '2px',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                  boxShadow: '0 4px 24px rgba(176,141,87,0.3)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = '#c9a26a';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = '#B08D57';
                }}
              >
                Explore Beans
              </button>
            </MagneticButton>

            {/* Secondary — Our Story */}
            <MagneticButton>
              <button
                type="button"
                style={{
                  padding: '0.75rem 1.5rem',
                  width: '100%',
                  maxWidth: '280px',
                  background: 'transparent',
                  color: '#F5EFE6',
                  border: '1.5px solid rgba(245,239,230,0.45)',
                  borderRadius: '2px',
                  fontSize: '13px',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s ease, background 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.borderColor = 'rgba(245,239,230,0.85)';
                  el.style.background = 'rgba(245,239,230,0.06)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.borderColor = 'rgba(245,239,230,0.45)';
                  el.style.background = 'transparent';
                }}
              >
                Our Story
              </button>
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
          background: 'linear-gradient(to top, #1a0f09 0%, transparent 100%)',
          zIndex: 5,
          pointerEvents: 'none',
        }}
      />
    </motion.section>
  );
}
