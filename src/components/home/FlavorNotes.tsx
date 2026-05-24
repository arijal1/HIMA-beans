'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─────────────────────────────────────────────────────────────────────────────
   Types & Data
───────────────────────────────────────────────────────────────────────────── */

interface FlavorNote {
  label: string;
  intensity: number;
  color: string;
}

interface FlavorProfile {
  id: string;
  name: string;
  region: string;
  altitude: string;
  processing: string;
  notes: FlavorNote[];
  descriptor: string;
  pairingNote: string;
}

const PROFILES: FlavorProfile[] = [
  {
    id: 'himalayan-reserve',
    name: 'Himalayan Reserve',
    region: 'Gulmi',
    altitude: '1800m',
    processing: 'Washed',
    notes: [
      { label: 'Floral', intensity: 85, color: '#B08D57' },
      { label: 'Dark Chocolate', intensity: 92, color: '#8C6A3F' },
      { label: 'Stone Fruit', intensity: 78, color: '#A0784A' },
      { label: 'Caramel', intensity: 70, color: '#C49B6A' },
      { label: 'Citrus', intensity: 45, color: '#D4AA7A' },
    ],
    descriptor:
      'A pristine washed process bean with exceptional clarity. The high altitude of Gulmi creates a bean of remarkable density — slow-grown, deeply complex, and utterly distinct.',
    pairingNote: 'Exceptional as pour-over or Aeropress. Pairs with dark chocolate and stone fruit pastries.',
  },
  {
    id: 'valley-mist',
    name: 'Valley Mist',
    region: 'Palpa',
    altitude: '2100m',
    processing: 'Natural',
    notes: [
      { label: 'Jasmine', intensity: 95, color: '#B08D57' },
      { label: 'Honey', intensity: 88, color: '#C49B6A' },
      { label: 'Citrus Zest', intensity: 82, color: '#D4AA7A' },
      { label: 'Stone Fruit', intensity: 60, color: '#A0784A' },
      { label: 'Chocolate', intensity: 35, color: '#8C6A3F' },
    ],
    descriptor:
      "Nepal's highest-grown single origin. Natural processing under the Himalayan sun concentrates the cherry's sweetness into a brilliantly aromatic, layered cup.",
    pairingNote: 'Shines as filter or cold brew. Pairs with floral desserts, honey cake, and soft cheeses.',
  },
  {
    id: 'summit-dark',
    name: 'Summit Dark',
    region: 'Syangja',
    altitude: '1950m',
    processing: 'Honey',
    notes: [
      { label: 'Cocoa', intensity: 97, color: '#8C6A3F' },
      { label: 'Cedar', intensity: 80, color: '#9C7850' },
      { label: 'Molasses', intensity: 88, color: '#7A5838' },
      { label: 'Brown Sugar', intensity: 72, color: '#B08D57' },
      { label: 'Dried Fruit', intensity: 55, color: '#A0784A' },
    ],
    descriptor:
      'For those who seek depth and intensity. The honey process and dark roast combine to unlock the most complex, bold expression of Himalayan terroir.',
    pairingNote: 'Perfect as espresso or moka pot. Pairs with rich desserts, aged cheese, and dark spirits.',
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   Animated Flavor Bar
───────────────────────────────────────────────────────────────────────────── */

interface FlavorBarProps {
  label: string;
  intensity: number;
  color: string;
  index: number;
}

function FlavorBar({ label, intensity, color, index }: FlavorBarProps) {
  return (
    <div className="flex items-center gap-4">
      <span
        className="text-[11px] tracking-[0.12em] uppercase shrink-0"
        style={{ color: '#8C8477', width: '7rem', textAlign: 'right' }}
      >
        {label}
      </span>
      <div
        className="relative flex-1 rounded-full overflow-hidden"
        style={{ height: '2px', background: '#E6D8C9' }}
      >
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${intensity}%` }}
          transition={{ duration: 0.9, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
        />
      </div>
      <span
        className="text-[11px] shrink-0 w-7 text-right"
        style={{ color: '#B08D57' }}
      >
        {intensity}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Radar chart — SVG polygon
───────────────────────────────────────────────────────────────────────────── */

function FlavorRadar({ profile }: { profile: FlavorProfile }) {
  const cx = 100;
  const cy = 100;
  const maxR = 72;
  const n = profile.notes.length;

  const toPoint = (i: number, r: number) => {
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  };

  const gridLine = (r: number) =>
    Array.from({ length: n }, (_, i) => toPoint(i, r))
      .map((p) => `${p.x},${p.y}`)
      .join(' ');

  const dataPoints = profile.notes.map((note, i) => toPoint(i, (note.intensity / 100) * maxR));
  const dataStr = dataPoints.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden="true">
      {/* Grid rings */}
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <polygon
          key={f}
          points={gridLine(maxR * f)}
          fill="none"
          stroke="#E6D8C9"
          strokeWidth="1"
          opacity="0.7"
        />
      ))}
      {/* Spokes */}
      {Array.from({ length: n }, (_, i) => {
        const p = toPoint(i, maxR);
        return (
          <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#E6D8C9" strokeWidth="1" opacity="0.5" />
        );
      })}
      {/* Data fill */}
      <motion.polygon
        points={dataStr}
        fill="rgba(176,141,87,0.13)"
        stroke="#B08D57"
        strokeWidth="1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      />
      {/* Data dots */}
      {dataPoints.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="3"
          fill="#B08D57"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 + i * 0.07, duration: 0.3, ease: 'backOut' }}
          style={{ transformOrigin: `${p.x}px ${p.y}px` }}
        />
      ))}
      {/* Labels */}
      {profile.notes.map((note, i) => {
        const lp = toPoint(i, maxR + 15);
        return (
          <text
            key={i}
            x={lp.x}
            y={lp.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="7"
            fill="#8C8477"
            letterSpacing="1"
            style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', textTransform: 'uppercase' }}
          >
            {note.label.split(' ')[0]}
          </text>
        );
      })}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Bean selector tab
───────────────────────────────────────────────────────────────────────────── */

function BeanTab({
  profile,
  active,
  onClick,
}: {
  profile: FlavorProfile;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      className="relative flex flex-col items-start px-6 py-4 text-left transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B08D57]"
      style={{
        background: active ? '#3B2A21' : 'transparent',
        border: `1px solid ${active ? '#3B2A21' : '#E6D8C9'}`,
        minWidth: '150px',
      }}
      aria-pressed={active}
    >
      <span
        className="text-[10px] tracking-[0.25em] uppercase mb-1"
        style={{ color: active ? '#B08D57' : '#8C8477' }}
      >
        {profile.region}
      </span>
      <span
        className="text-sm font-serif leading-tight"
        style={{
          color: active ? '#F5EFE6' : '#3B2A21',
          fontFamily: '"Playfair Display", Georgia, serif',
        }}
      >
        {profile.name}
      </span>
      {active && (
        <motion.span
          layoutId="flavor-tab-indicator"
          className="absolute bottom-0 left-0 right-0 h-0.5"
          style={{ background: '#B08D57' }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
    </motion.button>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Main Component
───────────────────────────────────────────────────────────────────────────── */

export default function FlavorNotes() {
  const [activeId, setActiveId] = useState<string>(PROFILES[0].id);
  const active = PROFILES.find((p) => p.id === activeId) ?? PROFILES[0];

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: '#F5EFE6' }}
      aria-labelledby="flavor-notes-heading"
    >
      {/* Top gold rule */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, #B08D57 40%, #B08D57 60%, transparent)' }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-28 md:py-36">

        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
              className="text-xs tracking-[0.35em] uppercase mb-4"
              style={{ color: '#B08D57' }}
            >
              Tasting Notes
            </motion.p>
            <motion.h2
              id="flavor-notes-heading"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
              className="font-serif leading-[1.05]"
              style={{
                color: '#3B2A21',
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              }}
            >
              The Flavor of
              <br />
              <em style={{ color: '#B08D57' }}>Altitude.</em>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
            className="max-w-sm text-sm leading-relaxed"
            style={{ color: '#8C8477' }}
          >
            Each bean expresses Nepal&apos;s highlands differently. Explore the
            precise flavor architecture behind every single-origin selection.
          </motion.p>
        </div>

        {/* Bean selector tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          className="flex flex-wrap gap-3 mb-12"
          role="group"
          aria-label="Select bean flavor profile"
        >
          {PROFILES.map((p) => (
            <BeanTab
              key={p.id}
              profile={p}
              active={p.id === activeId}
              onClick={() => setActiveId(p.id)}
            />
          ))}
        </motion.div>

        {/* Active profile detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16"
          >
            {/* Left: meta + descriptor */}
            <div className="flex flex-col gap-6">
              {/* Meta tiles */}
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Region', value: active.region },
                  { label: 'Altitude', value: active.altitude },
                  { label: 'Process', value: active.processing },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex flex-col px-4 py-3"
                    style={{ background: '#fff', border: '1px solid #E6D8C9' }}
                  >
                    <span
                      className="text-[9px] tracking-[0.3em] uppercase mb-1"
                      style={{ color: '#B08D57' }}
                    >
                      {label}
                    </span>
                    <span className="text-sm font-medium" style={{ color: '#3B2A21' }}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Descriptor */}
              <p className="text-base leading-[1.8]" style={{ color: '#8C8477' }}>
                {active.descriptor}
              </p>

              {/* Pairing note */}
              <div
                className="p-5"
                style={{ background: 'rgba(176,141,87,0.06)', borderLeft: '2px solid #B08D57' }}
              >
                <p
                  className="text-[10px] tracking-[0.25em] uppercase mb-2"
                  style={{ color: '#B08D57' }}
                >
                  Best Enjoyed As
                </p>
                <p className="text-sm leading-relaxed italic" style={{ color: '#3B2A21' }}>
                  {active.pairingNote}
                </p>
              </div>
            </div>

            {/* Center: flavor bars */}
            <div className="flex flex-col justify-center gap-4">
              <p
                className="text-[10px] tracking-[0.3em] uppercase mb-2"
                style={{ color: '#8C8477' }}
              >
                Flavor Intensity
              </p>
              {active.notes.map((note, i) => (
                <FlavorBar
                  key={note.label}
                  label={note.label}
                  intensity={note.intensity}
                  color={note.color}
                  index={i}
                />
              ))}
            </div>

            {/* Right: radar chart */}
            <div className="flex flex-col items-center justify-center gap-4">
              <p
                className="text-[10px] tracking-[0.3em] uppercase"
                style={{ color: '#8C8477' }}
              >
                Flavor Profile
              </p>
              <div className="w-52 h-52">
                <FlavorRadar profile={active} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom rule */}
      <div
        className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, #E6D8C9 40%, #E6D8C9 60%, transparent)' }}
        aria-hidden="true"
      />
    </section>
  );
}
