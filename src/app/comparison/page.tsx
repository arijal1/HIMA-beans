'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

/* ============================================================
   Types
   ============================================================ */
interface OriginData {
  name: string;
  country: string;
  altitude: number;
  body: number;
  acidity: number;
  sweetness: number;
  floral: number;
  chocolate: number;
  rarity: number;
  sustainability: number;
  isNepal?: boolean;
}

interface Factor {
  key: keyof Omit<OriginData, 'name' | 'country' | 'isNepal' | 'altitude'>;
  label: string;
  maxValue: number;
}

/* ============================================================
   Data
   ============================================================ */
const ORIGINS: OriginData[] = [
  {
    name: 'Nepal',
    country: 'Himalayan Highlands',
    altitude: 2000,
    body: 3,
    acidity: 3,
    sweetness: 4,
    floral: 5,
    chocolate: 4,
    rarity: 5,
    sustainability: 5,
    isNepal: true,
  },
  {
    name: 'Ethiopia',
    country: 'Yirgacheffe',
    altitude: 2300,
    body: 3,
    acidity: 4,
    sweetness: 3,
    floral: 5,
    chocolate: 2,
    rarity: 3,
    sustainability: 3,
  },
  {
    name: 'Colombia',
    country: 'Huila',
    altitude: 1800,
    body: 4,
    acidity: 4,
    sweetness: 4,
    floral: 3,
    chocolate: 3,
    rarity: 2,
    sustainability: 4,
  },
  {
    name: 'Brazil',
    country: 'Minas Gerais',
    altitude: 1000,
    body: 5,
    acidity: 2,
    sweetness: 3,
    floral: 1,
    chocolate: 4,
    rarity: 1,
    sustainability: 3,
  },
  {
    name: 'Kenya',
    country: 'Nyeri',
    altitude: 1800,
    body: 3,
    acidity: 5,
    sweetness: 2,
    floral: 4,
    chocolate: 2,
    rarity: 3,
    sustainability: 3,
  },
];

const FACTORS: Factor[] = [
  { key: 'body', label: 'Body', maxValue: 5 },
  { key: 'acidity', label: 'Acidity', maxValue: 5 },
  { key: 'sweetness', label: 'Sweetness', maxValue: 5 },
  { key: 'floral', label: 'Floral Notes', maxValue: 5 },
  { key: 'chocolate', label: 'Chocolate Notes', maxValue: 5 },
  { key: 'rarity', label: 'Rarity', maxValue: 5 },
  { key: 'sustainability', label: 'Sustainability', maxValue: 5 },
];

const RADAR_AXES = ['Floral', 'Sweetness', 'Rarity', 'Sustainability', 'Chocolate'];
const RADAR_KEYS: Array<keyof OriginData> = [
  'floral',
  'sweetness',
  'rarity',
  'sustainability',
  'chocolate',
];

const RADAR_ORIGINS = [
  { name: 'Nepal', color: '#7C4828', opacity: 0.3 },
  { name: 'Ethiopia', color: '#7A6555', opacity: 0.2 },
  { name: 'Colombia', color: '#5a7a6a', opacity: 0.2 },
];

const DIFFERENTIATORS = [
  {
    title: 'Unmatched Floral Complexity',
    description:
      'Nepal\'s high-altitude terroir produces coffee with the highest floral aromatic intensity of any major origin — a profile shaped by cool nights, rich soils, and centuries of traditional cultivation.',
    icon: '❋',
  },
  {
    title: 'World\'s Rarest Specialty Origin',
    description:
      'With less than 0.1% of global coffee output, Himalayan beans are the most coveted specialty origin on Earth. Each batch represents a limited window into one of the last untapped coffee frontiers.',
    icon: '◆',
  },
  {
    title: 'Sustainability Without Compromise',
    description:
      'Every farm in our supply chain is shade-grown, fair-trade certified, and women-cooperative led. Nepal scores highest of all origins on environmental and social sustainability metrics.',
    icon: '◉',
  },
];

/* ============================================================
   Helper: Radar polygon points
   ============================================================ */
function getRadarPoints(
  origin: OriginData,
  cx: number,
  cy: number,
  radius: number,
  count: number
): string {
  return RADAR_KEYS.slice(0, count)
    .map((key, i) => {
      const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
      const value = (origin[key] as number) / 5;
      const x = cx + radius * value * Math.cos(angle);
      const y = cy + radius * value * Math.sin(angle);
      return `${x},${y}`;
    })
    .join(' ');
}

function getAxisPoint(
  i: number,
  count: number,
  cx: number,
  cy: number,
  radius: number
): { x: number; y: number } {
  const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
  return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
}

/* ============================================================
   Sub-components
   ============================================================ */

function AnimatedBar({
  value,
  maxValue,
  isNepal,
  delay,
}: {
  value: number;
  maxValue: number;
  isNepal: boolean;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const pct = (value / maxValue) * 100;

  return (
    <div ref={ref} className="flex items-center gap-2 w-full">
      <div className="flex-1 bg-[#EDE0CC] rounded-full h-2 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: isNepal ? '#7C4828' : '#7A6555' }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : { width: 0 }}
          transition={{ duration: 0.7, delay, ease: [0.25, 1, 0.5, 1] as [number,number,number,number] }}
        />
      </div>
      <span
        className="text-xs font-semibold w-4 text-right font-sans"
        style={{ color: isNepal ? '#7C4828' : '#7A6555' }}
      >
        {value}
      </span>
    </div>
  );
}

function ComparisonBarGrid({ activeFilter }: { activeFilter: string | null }) {
  const filteredFactors = activeFilter
    ? FACTORS.filter((f) => f.key === activeFilter)
    : FACTORS;

  return (
    <div className="space-y-10">
      {filteredFactors.map((factor) => (
        <div key={factor.key} className="rounded-2xl overflow-hidden border border-[#EDE0CC]">
          {/* Factor header */}
          <div className="px-4 sm:px-6 py-4 bg-[#0E0A07]">
            <h3 className="font-serif text-lg text-[#F5EDE0] font-semibold">{factor.label}</h3>
          </div>
          {/* Origin bars */}
          <div className="divide-y divide-[#EDE0CC]">
            {ORIGINS.map((origin, oi) => (
              <div
                key={origin.name}
                className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4"
                style={{ backgroundColor: origin.isNepal ? '#FBF7F2' : '#FFFFFF' }}
              >
                <div className="w-16 sm:w-24 shrink-0">
                  <p
                    className="font-sans text-xs sm:text-sm font-semibold"
                    style={{ color: origin.isNepal ? '#7C4828' : '#0E0A07' }}
                  >
                    {origin.name}
                  </p>
                  <p className="font-sans text-xs text-[#7A6555] hidden sm:block">{origin.country}</p>
                </div>
                <div className="flex-1">
                  <AnimatedBar
                    value={origin[factor.key] as number}
                    maxValue={factor.maxValue}
                    isNepal={!!origin.isNepal}
                    delay={oi * 0.08}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function AltitudeRow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} className="rounded-2xl overflow-hidden border border-[#EDE0CC] mb-10">
      <div className="px-4 sm:px-6 py-4 bg-[#0E0A07]">
        <h3 className="font-serif text-lg text-[#F5EDE0] font-semibold">Altitude (m)</h3>
      </div>
      <div className="divide-y divide-[#EDE0CC]">
        {ORIGINS.map((origin, oi) => {
          const pct = (origin.altitude / 2500) * 100;
          return (
            <div
              key={origin.name}
              className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4"
              style={{ backgroundColor: origin.isNepal ? '#FBF7F2' : '#FFFFFF' }}
            >
              <div className="w-16 sm:w-24 shrink-0">
                <p
                  className="font-sans text-xs sm:text-sm font-semibold"
                  style={{ color: origin.isNepal ? '#7C4828' : '#0E0A07' }}
                >
                  {origin.name}
                </p>
                <p className="font-sans text-xs text-[#7A6555] hidden sm:block">{origin.country}</p>
              </div>
              <div className="flex-1 flex items-center gap-2">
                <div className="flex-1 bg-[#EDE0CC] rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: origin.isNepal ? '#7C4828' : '#7A6555' }}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${pct}%` } : { width: 0 }}
                    transition={{ duration: 0.7, delay: oi * 0.08, ease: [0.25, 1, 0.5, 1] as [number,number,number,number] }}
                  />
                </div>
                <span
                  className="text-xs font-semibold w-12 text-right font-sans"
                  style={{ color: origin.isNepal ? '#7C4828' : '#7A6555' }}
                >
                  {origin.altitude}m
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RadarChart() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const cx = 200;
  const cy = 200;
  const radius = 140;
  const count = 5;

  const radarOriginsData = RADAR_ORIGINS.map((ro) => {
    const found = ORIGINS.find((o) => o.name === ro.name)!;
    return { ...ro, data: found };
  });

  return (
    <div className="flex flex-col items-center">
      <svg
        ref={ref}
        viewBox="0 0 400 400"
        className="w-full max-w-sm mx-auto"
        aria-label="Radar chart comparing coffee origins"
      >
        {/* Grid rings */}
        {[1, 2, 3, 4, 5].map((ring) => {
          const r = (radius * ring) / 5;
          const pts = Array.from({ length: count }, (_, i) => {
            const pt = getAxisPoint(i, count, cx, cy, r);
            return `${pt.x},${pt.y}`;
          }).join(' ');
          return (
            <polygon
              key={ring}
              points={pts}
              fill="none"
              stroke="#EDE0CC"
              strokeWidth={ring === 5 ? 1.5 : 1}
            />
          );
        })}

        {/* Axis lines */}
        {Array.from({ length: count }, (_, i) => {
          const pt = getAxisPoint(i, count, cx, cy, radius);
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={pt.x}
              y2={pt.y}
              stroke="#EDE0CC"
              strokeWidth={1}
            />
          );
        })}

        {/* Data polygons */}
        {radarOriginsData.map((ro) => (
          <motion.polygon
            key={ro.name}
            points={getRadarPoints(ro.data, cx, cy, radius, count)}
            fill={ro.color}
            fillOpacity={ro.opacity}
            stroke={ro.color}
            strokeWidth={2}
            strokeLinejoin="round"
            initial={{ opacity: 0, scale: 0.3 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] as [number,number,number,number] }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          />
        ))}

        {/* Axis labels */}
        {RADAR_AXES.map((label, i) => {
          const pt = getAxisPoint(i, count, cx, cy, radius + 22);
          return (
            <text
              key={label}
              x={pt.x}
              y={pt.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#0E0A07"
              fontSize="11"
              fontFamily="var(--font-inter), sans-serif"
              fontWeight="600"
            >
              {label}
            </text>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-6 mt-6">
        {radarOriginsData.map((ro) => (
          <div key={ro.name} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: ro.color }}
            />
            <span className="font-sans text-sm text-[#0E0A07] font-medium">{ro.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DifferentiatorCard({
  item,
  index,
}: {
  item: (typeof DIFFERENTIATORS)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 1, 0.5, 1] as [number,number,number,number] }}
      className="bg-white rounded-2xl p-5 sm:p-8 border border-[#EDE0CC] flex flex-col gap-4"
    >
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
        style={{ backgroundColor: '#F5EDE0', color: '#7C4828' }}
      >
        {item.icon}
      </div>
      <h3 className="font-serif text-xl text-[#0E0A07] font-semibold leading-snug">
        {item.title}
      </h3>
      <p className="font-sans text-[#7A6555] text-sm leading-relaxed">{item.description}</p>
    </motion.div>
  );
}

/* ============================================================
   Page
   ============================================================ */
export default function ComparisonPage() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <>
      <Navigation />
      <main className="min-h-screen" style={{ backgroundColor: '#F5EDE0' }}>
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative min-h-[60vh] sm:min-h-[70vh] flex items-end pb-12 sm:pb-16 md:pb-20 pt-28 sm:pt-0 overflow-hidden"
        style={{ backgroundColor: '#0E0A07' }}
      >
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, #7C4828 0%, transparent 60%), radial-gradient(circle at 80% 20%, #7A6555 0%, transparent 50%)',
          }}
        />

        {/* Grain overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")',
          }}
        />

        <div className="relative z-10 site-container w-full">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-sans text-[#7C4828] text-sm font-semibold tracking-[0.2em] uppercase mb-6"
          >
            Origin Comparison
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 1, 0.5, 1] as [number,number,number,number] }}
            className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-[#F5EDE0] font-bold leading-[0.95] mb-8"
          >
            The World&apos;s Best,
            <br />
            <em className="text-[#7C4828]">Side by Side</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="font-sans text-[#EDE0CC] text-lg max-w-2xl leading-relaxed"
          >
            We don&apos;t ask you to take our word for it. Compare Nepal against the world&apos;s most
            celebrated specialty origins — and let the data speak.
          </motion.p>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="py-12 sm:py-16 md:py-20 site-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <p className="font-sans text-[#7C4828] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
              A New Benchmark
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#0E0A07] font-bold leading-tight mb-6">
              Nepal Has Arrived in the World&apos;s Top Tier
            </h2>
          </div>
          <div>
            <p className="font-sans text-[#7A6555] text-base leading-relaxed mb-4">
              For decades, Ethiopia, Colombia, and Kenya dominated specialty coffee conversations.
              Then Nepal emerged — a hidden-altitude origin with floral complexity that rivals
              Yirgacheffe, a rarity that surpasses Blue Mountain, and a sustainability story
              unmatched anywhere on Earth.
            </p>
            <p className="font-sans text-[#7A6555] text-base leading-relaxed">
              Grown above 2,000 metres in the shadow of the Himalayas, our beans carry a terroir
              shaped by glacial meltwater, mineral-rich volcanic soil, and the cold, slow-ripening
              nights that concentrate every aromatic compound into a cup of extraordinary depth.
            </p>
          </div>
        </div>
      </section>

      {/* ── Filter Bar ── */}
      <section className="site-container mb-6 md:mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-sans text-sm text-[#7A6555] font-medium mr-2">Filter by:</span>
          <button
            onClick={() => setActiveFilter(null)}
            className="px-4 py-1.5 rounded-full text-sm font-sans font-medium transition-all duration-200"
            style={{
              backgroundColor: activeFilter === null ? '#0E0A07' : '#EDE0CC',
              color: activeFilter === null ? '#F5EDE0' : '#0E0A07',
            }}
          >
            All Factors
          </button>
          {FACTORS.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(activeFilter === f.key ? null : f.key)}
              className="px-4 py-1.5 rounded-full text-sm font-sans font-medium transition-all duration-200"
              style={{
                backgroundColor: activeFilter === f.key ? '#7C4828' : '#EDE0CC',
                color: activeFilter === f.key ? '#F5EDE0' : '#0E0A07',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      {/* ── Altitude Row ── */}
      <section className="site-container">
        {(!activeFilter) && <AltitudeRow />}
      </section>

      {/* ── Animated Bar Charts ── */}
      <section className="site-container pb-12 sm:pb-16 md:pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter ?? 'all'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ComparisonBarGrid activeFilter={activeFilter} />
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ── Radar Chart ── */}
      <section
        className="py-12 sm:py-16 md:py-24"
        style={{ backgroundColor: '#0E0A07' }}
      >
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <p className="font-sans text-[#7C4828] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
                Flavour Profile Radar
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-[#F5EDE0] font-bold leading-tight mb-6">
                See the Shape of Each Origin
              </h2>
              <p className="font-sans text-[#EDE0CC] text-base leading-relaxed mb-4">
                A balanced, outward-reaching polygon signals versatility and complexity. Nepal&apos;s
                profile is uniquely complete — excelling in floral, sweetness, rarity, and
                sustainability simultaneously.
              </p>
              <p className="font-sans text-[#7A6555] text-base leading-relaxed">
                Ethiopia matches Nepal&apos;s florals but lacks rarity and sustainability. Colombia
                leads on body and sweetness but falls back on floral intensity. Nepal occupies a
                rare centre of excellence.
              </p>
            </div>
            <div className="bg-[#F5EDE0] rounded-3xl p-4 sm:p-8">
              <RadarChart />
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Nepal Wins ── */}
      <section className="py-12 sm:py-16 md:py-24 site-container">
        <div className="text-center mb-10 md:mb-14">
          <p className="font-sans text-[#7C4828] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            The Verdict
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#0E0A07] font-bold leading-tight">
            Why Nepal Wins
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DIFFERENTIATORS.map((item, i) => (
            <DifferentiatorCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-12 sm:py-16 md:py-24 text-center"
        style={{ backgroundColor: '#7C4828' }}
      >
        <div className="site-container" style={{maxWidth:"680px"}}>
          <h2 className="font-serif text-4xl md:text-5xl text-[#F5EDE0] font-bold leading-tight mb-6">
            Ready to Experience the Difference?
          </h2>
          <p className="font-sans text-[#F5EDE0] text-base leading-relaxed mb-10 opacity-90">
            Explore our range of Himalayan single-origin beans — each lot selected for peak
            expression of the characteristics that make Nepal extraordinary.
          </p>
          <Link
            href="/beans"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-sans font-semibold text-sm tracking-widest uppercase transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: '#0E0A07', color: '#F5EDE0' }}
          >
            Explore Our Beans
            <span className="text-base">→</span>
          </Link>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}
