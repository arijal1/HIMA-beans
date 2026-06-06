"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { useLang } from '@/context/lang';

/* ============================================================
   Brand Tokens
   ============================================================ */
const C = {
  espresso: "#1F4D4F",
  cream: "#F6F1E9",
  stone: "#6B7F7E",
  gold: "#D4A55A",
  beige: "#D9DFDC",
  charcoal: "#1A2E2F",
} as const;

/* ============================================================
   Animation Presets
   ============================================================ */
const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, delay, ease },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.7, delay, ease },
  }),
};

/* ============================================================
   Roast Level
   ============================================================ */
type RoastLevel = "Light" | "Medium-Light" | "Medium" | "Dark" | "Blend";
type FilterKey = "All" | "Light" | "Medium" | "Dark";

const ROAST_DOTS: Record<RoastLevel, number> = {
  Light: 1,
  "Medium-Light": 2,
  Medium: 3,
  Dark: 4,
  Blend: 3,
};

const ROAST_COLOR: Record<RoastLevel, string> = {
  Light: "#C9A96E",
  "Medium-Light": "#B8843F",
  Medium: "#8B5A2B",
  Dark: "#4A2512",
  Blend: "#9B6B3A",
};

/* ============================================================
   Bean Data
   ============================================================ */
interface Bean {
  id: string;
  name: string;
  region: string;
  altitude: string;
  roast: RoastLevel;
  process: string;
  notes: string[];
  brew: string;
  description: string;
  accentColor: string;
  badge?: string;
}

const beans: Bean[] = [
  {
    id: "himalayan-reserve",
    name: "Himalayan Reserve",
    region: "Gulmi",
    altitude: "1,800 m",
    roast: "Light",
    process: "Washed",
    notes: ["Jasmine", "Stone Fruit", "Bright Acidity", "Light Body"],
    brew: "Pour Over",
    description:
      "Grown on Gulmi's volcanic slopes at the district's highest elevations, this lot offers a pristine light roast expression — luminous, floral, and delicately sweet.",
    accentColor: "#C9A96E",
  },
  {
    id: "valley-mist",
    name: "Valley Mist",
    region: "Palpa",
    altitude: "1,500 m",
    roast: "Medium",
    process: "Natural",
    notes: ["Dark Chocolate", "Berries", "Caramel", "Medium Body"],
    brew: "French Press",
    description:
      "Shade-grown beneath native trees in Palpa's mist-draped valleys, this natural-processed gem delivers deep berry sweetness and a lingering chocolate finish.",
    accentColor: "#8B5A2B",
  },
  {
    id: "summit-dark",
    name: "Summit Dark",
    region: "Syangja",
    altitude: "1,700 m",
    roast: "Dark",
    process: "Honey",
    notes: ["Dark Chocolate", "Smoky", "Brown Sugar", "Full Body"],
    brew: "Espresso",
    description:
      "River valley mist and cold Syangja nights yield a dense, full-bodied cherry. Our darkest roast profile unlocks rich caramelised depth with a clean, warming finish.",
    accentColor: "#4A2512",
  },
  {
    id: "morning-harvest",
    name: "Morning Harvest",
    region: "Kavre",
    altitude: "1,400 m",
    roast: "Medium-Light",
    process: "Washed",
    notes: ["Citrus", "Floral", "Walnut", "Clean Finish"],
    brew: "AeroPress",
    description:
      "Kavre's organic farming tradition shines through in this clean, balanced cup — bright citrus and soft florals over a walnut base, finishing with remarkable clarity.",
    accentColor: "#B8843F",
  },
  {
    id: "heritage-blend",
    name: "Heritage Blend",
    region: "Multi-Region",
    altitude: "Blend",
    roast: "Medium",
    process: "Mixed",
    notes: ["Balanced", "Chocolatey", "Smooth", "All-Day Drinker"],
    brew: "Any Method",
    description:
      "Our master blender's signature: Gulmi body, Palpa sweetness, and Kavre clarity harmonised into a consistently satisfying cup perfect for any brewing method, any hour.",
    accentColor: "#9B6B3A",
    badge: "Signature",
  },
  {
    id: "reserve-single-origin",
    name: "Reserve Single Origin",
    region: "Nuwakot",
    altitude: "1,600 m",
    roast: "Medium-Light",
    process: "Natural",
    notes: ["Complex", "Aged Rum", "Dried Fruit", "Rare"],
    brew: "Pour Over",
    description:
      "Cold Nuwakot nights stretch the cherry's maturation to its limit. The result: a cup of startling complexity — rich dried fruit and aged rum character found nowhere else on earth.",
    accentColor: "#A07040",
    badge: "Limited",
  },
];

/* ============================================================
   Filter configuration
   ============================================================ */
const FILTERS: FilterKey[] = ["All", "Light", "Medium", "Dark"];

function beanMatchesFilter(bean: Bean, filter: FilterKey): boolean {
  if (filter === "All") return true;
  if (filter === "Light") return bean.roast === "Light" || bean.roast === "Medium-Light";
  if (filter === "Medium") return bean.roast === "Medium" || bean.roast === "Blend";
  if (filter === "Dark") return bean.roast === "Dark";
  return true;
}

/* ============================================================
   Roast Indicator
   ============================================================ */
function RoastIndicator({ roast, lang }: { roast: RoastLevel; lang: 'EN' | 'NP' }) {
  const total = 4;
  const filled = ROAST_DOTS[roast];
  const color = ROAST_COLOR[roast];

  const roastLabel: Record<RoastLevel, string> = lang === 'NP'
    ? { Light: 'हल्का', 'Medium-Light': 'मध्यम-हल्का', Medium: 'मध्यम', Dark: 'गाढा', Blend: 'मिश्रण' }
    : { Light: 'Light', 'Medium-Light': 'Medium-Light', Medium: 'Medium', Dark: 'Dark', Blend: 'Blend' };

  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full transition-all duration-300"
          style={{
            backgroundColor: i < filled ? color : `${color}25`,
            transform: i < filled ? "scale(1)" : "scale(0.85)",
          }}
        />
      ))}
      <span className="text-xs ml-1 font-medium" style={{ color: C.stone }}>
        {roastLabel[roast]}
      </span>
    </div>
  );
}

/* ============================================================
   Tasting Note Tag
   ============================================================ */
function NoteTag({ note }: { note: string }) {
  return (
    <span
      className="text-xs px-2.5 py-1 rounded-full border font-medium"
      style={{
        borderColor: `${C.gold}30`,
        color: C.stone,
        backgroundColor: `${C.gold}08`,
      }}
    >
      {note}
    </span>
  );
}

/* ============================================================
   3D Tilt Card
   ============================================================ */
function BeanCard({
  bean,
  index,
  lang,
}: {
  bean: Bean;
  index: number;
  lang: 'EN' | 'NP';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 25,
  });
  const glowX = useSpring(useTransform(x, [-0.5, 0.5], [20, 80]), {
    stiffness: 200,
    damping: 25,
  });
  const glowY = useSpring(useTransform(y, [-0.5, 0.5], [20, 80]), {
    stiffness: 200,
    damping: 25,
  });

  const [hovered, setHovered] = useState(false);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    setHovered(false);
  }

  const t = {
    process: lang === 'NP' ? 'प्रक्रिया' : 'Process:',
    tastingNotes: lang === 'NP' ? 'स्वाद नोटहरू' : 'Tasting Notes',
    brewRec: lang === 'NP' ? 'ब्रु सिफारिसहरू' : 'Recommended Brew',
    learnMore: lang === 'NP' ? 'थप जान्नुहोस्' : 'Learn More',
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 56, scale: 0.93 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 56, scale: 0.93 }}
      transition={{ duration: 0.72, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={cardRef}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          backgroundColor: C.cream,
          border: `1px solid rgba(26,46,47,0.06)`,
          boxShadow: hovered
            ? `0 28px 56px rgba(31,77,79,0.16), 0 8px 20px rgba(31,77,79,0.10), 0 0 0 1px ${bean.accentColor}30`
            : "0 4px 16px rgba(31,77,79,0.07)",
          transition: "box-shadow 0.35s ease",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative overflow-hidden flex flex-col h-full min-h-[420px] sm:min-h-[480px]"
      >
        {/* Accent top bar — roast colour per card */}
        <motion.div
          className="absolute top-0 left-0 right-0 z-10"
          animate={{ height: hovered ? '3px' : '2px', opacity: hovered ? 1 : 0.55 }}
          transition={{ duration: 0.25 }}
          style={{ backgroundColor: bean.accentColor }}
        />

        {/* Header area */}
        <div className="pt-6 sm:pt-8 px-5 sm:px-6 pb-4 relative z-10">
          {/* Badges row */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span
                className="text-xs font-medium px-2.5 py-1 rounded-full"
                style={{ backgroundColor: `${C.espresso}12`, color: C.stone }}
              >
                {bean.region}
              </span>
              {bean.altitude !== "Blend" && (
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: C.espresso, color: C.gold }}
                >
                  {bean.altitude}
                </span>
              )}
            </div>
            {bean.badge && (
              <span
                className="text-xs font-bold px-3 py-1 rounded-full tracking-wider uppercase"
                style={{ backgroundColor: C.gold, color: C.espresso }}
              >
                {bean.badge}
              </span>
            )}
          </div>

          {/* Bean name */}
          <h3
            className="font-serif text-2xl font-bold leading-tight mb-3"
            style={{ color: C.espresso }}
          >
            {bean.name}
          </h3>

          {/* Roast indicator */}
          <RoastIndicator roast={bean.roast} lang={lang} />
        </div>

        {/* Divider */}
        <div
          className="mx-5 sm:mx-6 h-px"
          style={{ backgroundColor: `${C.stone}18` }}
        />

        {/* Details */}
        <div className="px-5 sm:px-6 py-4 flex flex-col gap-4 flex-1 relative z-10">
          {/* Description */}
          <p
            className="text-sm leading-relaxed"
            style={{ color: C.stone }}
          >
            {bean.description}
          </p>

          {/* Process */}
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest" style={{ color: `${C.gold}90` }}>
              {t.process}
            </span>
            <span className="text-xs font-medium" style={{ color: C.espresso }}>
              {bean.process}
            </span>
          </div>

          {/* Tasting notes */}
          <div>
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: `${C.gold}90` }}>
              {t.tastingNotes}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {bean.notes.map((note) => (
                <NoteTag key={note} note={note} />
              ))}
            </div>
          </div>

          {/* Brew recommendation */}
          <div
            className="flex items-center gap-2 px-3 py-2"
            style={{ backgroundColor: `${C.espresso}08` }}
          >
            <span className="text-base" aria-hidden>
              ☕
            </span>
            <div>
              <p className="text-xs uppercase tracking-widest" style={{ color: C.stone }}>
                {t.brewRec}
              </p>
              <p className="text-xs font-semibold mt-0.5" style={{ color: C.espresso }}>
                {bean.brew}
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="px-5 sm:px-6 pb-5 sm:pb-6 relative z-10">
          <motion.button
            initial={false}
            animate={hovered ? { backgroundColor: C.espresso } : { backgroundColor: "transparent" }}
            transition={{ duration: 0.25 }}
            className="w-full py-3 rounded-xl text-sm font-semibold border transition-colors duration-300 flex items-center justify-center gap-2"
            style={{
              borderColor: `${C.espresso}30`,
              color: hovered ? C.gold : C.espresso,
            }}
          >
            <span>{t.learnMore}</span>
            <motion.span
              animate={hovered ? { x: 4, opacity: 1 } : { x: 0, opacity: 0.5 }}
              transition={{ duration: 0.2 }}
              aria-hidden
            >
              →
            </motion.span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ============================================================
   Filter Bar  — segmented pill control
   ============================================================ */
function FilterBar({
  active,
  onChange,
  lang,
}: {
  active: FilterKey;
  onChange: (f: FilterKey) => void;
  lang: 'EN' | 'NP';
}) {
  const filterLabel: Record<FilterKey, string> = lang === 'NP'
    ? { All: 'सबै', Light: 'हल्का', Medium: 'मध्यम', Dark: 'गाढा' }
    : { All: 'All', Light: 'Light', Medium: 'Medium', Dark: 'Dark' };

  const roastDot: Record<FilterKey, string | null> = {
    All: null,
    Light: '#C9A96E',
    Medium: '#8B5A2B',
    Dark: '#4A2512',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.25, ease }}
      className="flex justify-center"
    >
      <div
        className="inline-flex items-center p-1"
        style={{
          backgroundColor: 'rgba(26,46,47,0.07)',
          border: '1px solid rgba(26,46,47,0.12)',
          borderRadius: '100px',
          gap: '2px',
        }}
      >
        {FILTERS.map((filter) => {
          const isActive = active === filter;
          const dot = roastDot[filter];
          return (
            <button
              key={filter}
              onClick={() => onChange(filter)}
              className="relative flex items-center gap-1.5 px-5 py-2 text-[11px] font-semibold tracking-[0.1em] uppercase rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A55A]"
              style={{ color: isActive ? C.cream : C.stone, minWidth: '64px', justifyContent: 'center' }}
            >
              {isActive && (
                <motion.div
                  layoutId="filter-active-bg"
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: C.espresso }}
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                />
              )}
              {dot && (
                <span
                  className="relative z-10 w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: isActive ? dot : `${dot}70` }}
                />
              )}
              <span className="relative z-10">{filterLabel[filter]}</span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ============================================================
   Hero Section
   ============================================================ */
function BeansHero({ lang }: { lang: 'EN' | 'NP' }) {
  return (
    <section
      className="relative min-h-[70vh] flex items-end pb-16 sm:pb-20 md:pb-24 pt-28 sm:pt-36 md:pt-40 overflow-hidden"
      style={{ backgroundColor: C.espresso }}
    >
      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial glow */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 100% 70% at 60% 30%, rgba(212,165,90,0.1) 0%, transparent 65%)`,
          }}
        />
        {/* Decorative element — coffee bean shape (CSS ellipse rings) */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:block">
          {[1, 0.6, 0.3].map((opacity, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 400 - i * 80,
                height: 400 - i * 80,
                border: `1px solid rgba(212,165,90,${opacity * 0.12})`,
                top: `${i * 40}px`,
                left: `${i * 40}px`,
              }}
            />
          ))}
          {/* Bean silhouette */}
          <svg
            width="280"
            height="280"
            viewBox="0 0 200 200"
            style={{ opacity: 0.06, position: "absolute", top: 60, left: 60 }}
          >
            <ellipse cx="100" cy="100" rx="75" ry="90" fill="#D4A55A" />
            <path
              d="M100 10 Q130 100 100 190"
              stroke="#1F4D4F"
              strokeWidth="8"
              fill="none"
            />
          </svg>
        </div>

        {/* Subtle radial glow */}
        <div
          className="absolute inset-0 opacity-40"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(212,165,90,0.06) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 site-container w-full">
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          animate={{ opacity: 1, letterSpacing: "0.4em" }}
          transition={{ duration: 1, delay: 0.2, ease }}
          className="text-xs font-medium uppercase mb-6"
          style={{ color: "rgba(217,223,220,0.45)" }}
        >
          {lang === 'NP' ? 'हाम्रा बिनहरू' : 'Specialty Coffee'}
        </motion.p>

        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.35, ease }}
            className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-none"
            style={{ color: C.cream }}
          >
            {lang === 'NP' ? 'हिमालयन सङ्ग्रह' : (
              <>
                Our Signature
                <br />
                Beans
              </>
            )}
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease }}
          className="text-base md:text-lg max-w-2xl leading-relaxed"
          style={{ color: "rgba(217,223,220,0.65)" }}
        >
          {lang === 'NP'
            ? 'छवटा असाधारण लट, प्रत्येक आफ्नो हिमालयी उत्पत्तिको चित्रण।'
            : 'Six exceptional lots, each a portrait of its Himalayan origin. Grown at altitude, harvested by hand, and roasted to honour every nuance the mountain sees fit to bestow.'}
        </motion.p>
      </div>
    </section>
  );
}

/* ============================================================
   Intro Strip
   ============================================================ */
function IntroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      className="py-12 sm:py-16 md:py-20 "
      style={{ backgroundColor: C.beige }}
    >
      <div ref={ref} className="site-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {[
            {
              label: "Rarity by Design",
              body: "Each lot is sourced in small quantities from individual farms or cooperatives — never blended to fill a quota, always curated to tell a singular story.",
            },
            {
              label: "Craft at Every Step",
              body: "From selective hand-picking to lot-specific roast profiling, every decision serves the coffee — not the calendar, not the commodity market.",
            },
            {
              label: "Altitude as Advantage",
              body: "High-altitude growing conditions compress flavour into every bean. What takes months at sea level happens slowly, deliberately, at 1,500 m above the world.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              custom={i * 0.1}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="flex flex-col gap-3"
            >
              <div
                className="w-8 h-px"
                style={{ backgroundColor: C.gold }}
              />
              <h3
                className="font-serif text-xl font-semibold"
                style={{ color: C.espresso }}
              >
                {item.label}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: C.stone }}>
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Bean Grid Section
   ============================================================ */
function BeanGridSection({ lang }: { lang: 'EN' | 'NP' }) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const filteredBeans = beans.filter((bean) =>
    beanMatchesFilter(bean, activeFilter)
  );

  const t = {
    eyebrow: lang === 'NP' ? 'सङ्ग्रह' : 'The Collection',
    heading: lang === 'NP' ? 'आफ्नो उत्पत्ति छान्नुहोस्' : 'Select Your Origin',
    filterIntro: lang === 'NP'
      ? 'आफ्नो स्वाद, ब्रु विधि र क्षणअनुसार उपयुक्त प्रोफाइल पत्ता लगाउन रोस्ट तीव्रताद्वारा फिल्टर गर्नुहोस्।'
      : 'Filter by roast intensity to discover the profile that suits your palate, your brew method, and your moment.',
    noMatch: lang === 'NP' ? 'यस फिल्टरसँग मेल खाने बिनहरू छैनन्।' : 'No beans match this filter.',
  };

  return (
    <section
      className="py-16 sm:py-20 md:py-24 "
      style={{ backgroundColor: "#D9DFDC" }}
    >
      <div className="site-container">
        {/* Section header */}
        <div ref={ref} className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.2em' }}
            animate={isInView ? { opacity: 1, letterSpacing: '0.35em' } : {}}
            transition={{ duration: 0.9, delay: 0, ease }}
            className="text-xs font-medium uppercase mb-4 inline-block"
            style={{ color: C.gold }}
          >
            {t.eyebrow}
          </motion.p>

          <div className="overflow-hidden mb-4">
            <motion.h2
              initial={{ y: 70, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.85, delay: 0.1, ease }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold"
              style={{ color: C.espresso }}
            >
              {t.heading}
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.22, ease }}
            className="text-base max-w-lg mx-auto mb-10 leading-relaxed"
            style={{ color: C.stone }}
          >
            {t.filterIntro}
          </motion.p>

          {/* Filter bar */}
          <FilterBar active={activeFilter} onChange={setActiveFilter} lang={lang} />
        </div>

        {/* Bean cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
          >
            {filteredBeans.map((bean, index) => (
              <BeanCard key={bean.id} bean={bean} index={index} lang={lang} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredBeans.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 text-base"
            style={{ color: C.stone }}
          >
            {t.noMatch}
          </motion.p>
        )}
      </div>
    </section>
  );
}

/* ============================================================
   Custom Roasting Section
   ============================================================ */
function CustomRoastingSection({ lang }: { lang: 'EN' | 'NP' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const t = {
    eyebrow: lang === 'NP' ? 'थोक र कस्टम रोस्टिङ' : 'Wholesale & Custom Roasting',
    heading: lang === 'NP' ? 'कस्टम रोस्टिङ' : 'Custom Roasting',
    headingEm: lang === 'NP' ? 'उपलब्ध' : 'Available',
    body: lang === 'NP'
      ? 'क्याफे, रेस्टुरेन्ट र विशिष्ट थोक खरिदकर्ताहरूका लागि, हामी हाम्रा हिमालयी लटहरूमा विशेष रोस्ट प्रोफाइलिङ प्रदान गर्छौं।'
      : 'For cafes, restaurants, and discerning wholesale buyers, we offer bespoke roast profiling on any of our Himalayan lots. Work directly with our head roaster to dial in the exact expression — roast degree, resting protocol, grind specification — that serves your menu.',
    body2: 'Minimum order quantities start at 10 kg per lot. White-label and co-branded packaging available. Origin traceability certificates included with every wholesale order.',
    cta: lang === 'NP' ? 'थोकको बारेमा सोधपुछ गर्नुहोस्' : 'Enquire About Wholesale',
  };

  return (
    <section
      className="py-16 sm:py-20 md:py-28 lg:py-36 relative overflow-hidden"
      style={{ backgroundColor: C.espresso }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 60% 80% at 80% 50%, rgba(212,165,90,0.08) 0%, transparent 70%)`,
          }}
        />
        {/* Decorative large text */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 font-serif text-[18rem] font-bold leading-none select-none hidden xl:block"
          style={{ color: "rgba(212,165,90,0.04)", userSelect: "none" }}
          aria-hidden
        >
          HB
        </div>
      </div>

      <div ref={ref} className="site-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left: text */}
          <div>
            <motion.p
              custom={0}
              variants={fadeIn}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="text-xs font-medium uppercase tracking-[0.35em] mb-4"
              style={{ color: "rgba(217,223,220,0.45)" }}
            >
              {t.eyebrow}
            </motion.p>

            <motion.h2
              custom={0.1}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              style={{ color: C.cream }}
            >
              {t.heading}
              <br />
              <em style={{ color: "#D9DFDC", fontStyle: "italic" }}>{t.headingEm}</em>
            </motion.h2>

            <motion.p
              custom={0.2}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="text-base leading-relaxed mb-4"
              style={{ color: "rgba(217,223,220,0.7)" }}
            >
              {t.body}
            </motion.p>

            <motion.p
              custom={0.3}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="text-base leading-relaxed mb-10"
              style={{ color: "rgba(217,223,220,0.7)" }}
            >
              {t.body2}
            </motion.p>

            <motion.div
              custom={0.4}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <Link
                href="/wholesale"
                className="inline-flex items-center gap-3 px-8 py-4 text-[11px] tracking-[0.18em] font-semibold uppercase transition-all duration-300 hover:opacity-80"
                style={{ backgroundColor: C.beige, color: C.espresso }}
              >
                {t.cta}
                <span aria-hidden>→</span>
              </Link>
            </motion.div>
          </div>

          {/* Right: feature list */}
          <motion.div
            custom={0.2}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-4"
          >
            {[
              {
                icon: "◆",
                title: "Bespoke Roast Profiling",
                body: "Light, medium, or dark — dialled to your specification by our SCA-certified head roaster.",
              },
              {
                icon: "◈",
                title: "Single-Origin Traceability",
                body: "Every wholesale lot comes with full farm-to-ship provenance documentation.",
              },
              {
                icon: "◎",
                title: "White-Label Packaging",
                body: "Branded bags available for cafes and hospitality groups seeking a premium house coffee.",
              },
              {
                icon: "▷",
                title: "Flexible Minimum Orders",
                body: "From 10 kg micro-lots to full-container volumes — we scale with your business.",
              },
              {
                icon: "✦",
                title: "Dedicated Account Manager",
                body: "Direct access to our sourcing team for origin stories, tasting notes, and staff training materials.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                custom={0.25 + i * 0.07}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="flex items-start gap-4 py-5 border-b"
                style={{ borderColor: "rgba(217,223,220,0.08)" }}
              >
                <span
                  className="text-base mt-0.5 flex-shrink-0"
                  style={{ color: C.gold }}
                >
                  {item.icon}
                </span>
                <div>
                  <p
                    className="font-serif text-base font-semibold mb-1"
                    style={{ color: C.cream }}
                  >
                    {item.title}
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(217,223,220,0.55)" }}
                  >
                    {item.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Bottom CTA Strip
   ============================================================ */
function BottomCTA({ lang }: { lang: 'EN' | 'NP' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const t = {
    heading: lang === 'NP' ? (
      <>बिनको पछाडिको<br />कथा</>
    ) : (
      <>The Story Behind<br />the Bean</>
    ),
    body: lang === 'NP'
      ? 'नेपालको कफी विरासत पाँच उगाउने क्षेत्रहरूमा फैलिएको छ, प्रत्येक उचाइ, माटो र पुस्तौंदेखिको खेतीज्ञानले आकारिएको।'
      : "Nepal's coffee heritage spans five growing regions, each shaped by altitude, soil, and generations of farming knowledge. Follow the journey.",
    btn1: lang === 'NP' ? 'हाम्रो उत्पत्ति कथा' : 'Our Origin Story',
    btn2: lang === 'NP' ? 'थोक सोधपुछ' : 'Wholesale Enquiry',
  };

  return (
    <section
      className="section-gap"
      style={{ backgroundColor: C.beige }}
    >
      <div ref={ref} className="site-container">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-end">
          <div>
            <motion.div
              custom={0}
              variants={fadeIn}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="w-8 h-px mb-6"
              style={{ backgroundColor: C.gold }}
            />
            <motion.h3
              custom={0.1}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="font-serif text-3xl md:text-4xl font-bold mb-5"
              style={{ color: C.espresso }}
            >
              {t.heading}
            </motion.h3>
            <motion.p
              custom={0.2}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="text-base leading-relaxed"
              style={{ color: C.stone }}
            >
              {t.body}
            </motion.p>
          </div>
          <motion.div
            custom={0.3}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/about"
              className="inline-flex items-center gap-3 px-7 py-3.5 text-[11px] tracking-[0.18em] uppercase font-medium transition-all duration-300 hover:opacity-80"
              style={{ backgroundColor: C.espresso, color: C.cream }}
            >
              {t.btn1}
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/wholesale"
              className="inline-flex items-center gap-3 px-7 py-3.5 text-[11px] tracking-[0.18em] uppercase font-medium border transition-all duration-300 hover:border-[#1A2E2F]"
              style={{ borderColor: `rgba(26,46,47,0.2)`, color: C.espresso }}
            >
              {t.btn2}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Page Export
   ============================================================ */
export default function BeansPage() {
  const { lang } = useLang();

  return (
    <>
      <Navigation />
      <main>
      <BeansHero lang={lang} />
      <IntroSection />
      <BeanGridSection lang={lang} />
      <CustomRoastingSection lang={lang} />
      <BottomCTA lang={lang} />
      </main>
      <Footer />
    </>
  );
}
