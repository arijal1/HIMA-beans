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

/* ============================================================
   Brand Tokens
   ============================================================ */
const C = {
  espresso: "#3B2A21",
  cream: "#F5EFE6",
  stone: "#8C8477",
  gold: "#B08D57",
  beige: "#E6D8C9",
  charcoal: "#222222",
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
function RoastIndicator({ roast }: { roast: RoastLevel }) {
  const total = 4;
  const filled = ROAST_DOTS[roast];
  const color = ROAST_COLOR[roast];

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
        {roast}
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
}: {
  bean: Bean;
  index: number;
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

  return (
    <motion.div
      ref={ref}
      custom={index * 0.07}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          backgroundColor: C.cream,
          border: `1px solid ${C.beige}`,
          boxShadow: hovered
            ? "0 24px 48px rgba(59,42,33,0.18), 0 8px 16px rgba(59,42,33,0.10)"
            : "0 4px 16px rgba(59,42,33,0.07)",
          transition: "box-shadow 0.3s ease",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-2xl overflow-hidden flex flex-col h-full min-h-[420px] sm:min-h-[480px]"
      >
        {/* Hover glow */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 pointer-events-none rounded-2xl z-0"
              style={{
                background: `radial-gradient(circle at ${glowX.get()}% ${glowY.get()}%, rgba(176,141,87,0.12) 0%, transparent 60%)`,
              }}
            />
          )}
        </AnimatePresence>

        {/* Accent top bar */}
        <div
          className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl z-10"
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
          <RoastIndicator roast={bean.roast} />
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
              Process:
            </span>
            <span className="text-xs font-medium" style={{ color: C.espresso }}>
              {bean.process}
            </span>
          </div>

          {/* Tasting notes */}
          <div>
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: `${C.gold}90` }}>
              Tasting Notes
            </p>
            <div className="flex flex-wrap gap-1.5">
              {bean.notes.map((note) => (
                <NoteTag key={note} note={note} />
              ))}
            </div>
          </div>

          {/* Brew recommendation */}
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl"
            style={{ backgroundColor: `${C.espresso}08` }}
          >
            <span className="text-base" aria-hidden>
              ☕
            </span>
            <div>
              <p className="text-xs uppercase tracking-widest" style={{ color: C.stone }}>
                Recommended Brew
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
            <span>Learn More</span>
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
   Filter Bar
   ============================================================ */
function FilterBar({
  active,
  onChange,
}: {
  active: FilterKey;
  onChange: (f: FilterKey) => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      variants={fadeIn}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="flex flex-wrap gap-2 justify-center"
    >
      {FILTERS.map((filter) => {
        const isActive = active === filter;
        return (
          <button
            key={filter}
            onClick={() => onChange(filter)}
            className="relative px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 outline-none"
            style={{
              color: isActive ? C.espresso : C.stone,
              backgroundColor: isActive ? C.gold : "transparent",
              border: `1px solid ${isActive ? C.gold : `${C.stone}40`}`,
            }}
          >
            {isActive && (
              <motion.div
                layoutId="filter-pill"
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: C.gold }}
                transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] as [number,number,number,number] }}
              />
            )}
            <span className="relative z-10">{filter}</span>
          </button>
        );
      })}
    </motion.div>
  );
}

/* ============================================================
   Hero Section
   ============================================================ */
function BeansHero() {
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
            background: `radial-gradient(ellipse 100% 70% at 60% 30%, rgba(176,141,87,0.1) 0%, transparent 65%)`,
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
                border: `1px solid rgba(176,141,87,${opacity * 0.12})`,
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
            <ellipse cx="100" cy="100" rx="75" ry="90" fill="#B08D57" />
            <path
              d="M100 10 Q130 100 100 190"
              stroke="#3B2A21"
              strokeWidth="8"
              fill="none"
            />
          </svg>
        </div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(176,141,87,1) 1px, transparent 1px), linear-gradient(90deg, rgba(176,141,87,1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 site-container md:px-12 lg:px-20 w-full">
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          animate={{ opacity: 1, letterSpacing: "0.4em" }}
          transition={{ duration: 1, delay: 0.2, ease }}
          className="text-xs font-medium uppercase mb-6"
          style={{ color: C.gold }}
        >
          Specialty Coffee
        </motion.p>

        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.35, ease }}
            className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-none"
            style={{ color: C.cream }}
          >
            Our Signature
            <br />
            <span style={{ color: C.gold }}>Beans</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease }}
          className="text-base md:text-lg max-w-2xl leading-relaxed"
          style={{ color: "rgba(245,239,230,0.65)" }}
        >
          Six exceptional lots, each a portrait of its Himalayan origin. Grown at
          altitude, harvested by hand, and roasted to honour every nuance the
          mountain sees fit to bestow.
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
      className="py-12 sm:py-16 md:py-20 px-6 md:px-12 lg:px-20"
      style={{ backgroundColor: C.beige }}
    >
      <div ref={ref} className="max-w-7xl mx-auto">
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
function BeanGridSection() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const filteredBeans = beans.filter((bean) =>
    beanMatchesFilter(bean, activeFilter)
  );

  return (
    <section
      className="py-16 sm:py-20 md:py-24 px-6 md:px-12 lg:px-20"
      style={{ backgroundColor: C.cream }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div ref={ref} className="text-center mb-12">
          <motion.p
            custom={0}
            variants={fadeIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-xs font-medium uppercase tracking-[0.35em] mb-4"
            style={{ color: C.gold }}
          >
            The Collection
          </motion.p>
          <motion.h2
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="font-serif text-4xl md:text-5xl font-bold mb-4"
            style={{ color: C.espresso }}
          >
            Select Your Origin
          </motion.h2>
          <motion.p
            custom={0.2}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-base max-w-xl mx-auto mb-10"
            style={{ color: C.stone }}
          >
            Filter by roast intensity to discover the profile that suits your
            palate, your brew method, and your moment.
          </motion.p>

          {/* Filter bar */}
          <FilterBar active={activeFilter} onChange={setActiveFilter} />
        </div>

        {/* Bean cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredBeans.map((bean, index) => (
              <BeanCard key={bean.id} bean={bean} index={index} />
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
            No beans match this filter.
          </motion.p>
        )}
      </div>
    </section>
  );
}

/* ============================================================
   Custom Roasting Section
   ============================================================ */
function CustomRoastingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="py-16 sm:py-20 md:py-28 lg:py-36 px-6 md:px-12 lg:px-20 relative overflow-hidden"
      style={{ backgroundColor: C.espresso }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 60% 80% at 80% 50%, rgba(176,141,87,0.08) 0%, transparent 70%)`,
          }}
        />
        {/* Decorative large text */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 font-serif text-[18rem] font-bold leading-none select-none hidden xl:block"
          style={{ color: "rgba(176,141,87,0.04)", userSelect: "none" }}
          aria-hidden
        >
          HB
        </div>
      </div>

      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left: text */}
          <div>
            <motion.p
              custom={0}
              variants={fadeIn}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="text-xs font-medium uppercase tracking-[0.35em] mb-4"
              style={{ color: C.gold }}
            >
              Wholesale &amp; Custom Roasting
            </motion.p>

            <motion.h2
              custom={0.1}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              style={{ color: C.cream }}
            >
              Custom Roasting
              <br />
              <em style={{ color: C.gold }}>Available</em>
            </motion.h2>

            <motion.p
              custom={0.2}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="text-base leading-relaxed mb-4"
              style={{ color: "rgba(245,239,230,0.7)" }}
            >
              For cafes, restaurants, and discerning wholesale buyers, we offer
              bespoke roast profiling on any of our Himalayan lots. Work directly
              with our head roaster to dial in the exact expression — roast
              degree, resting protocol, grind specification — that serves your
              menu.
            </motion.p>

            <motion.p
              custom={0.3}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="text-base leading-relaxed mb-10"
              style={{ color: "rgba(245,239,230,0.7)" }}
            >
              Minimum order quantities start at 10 kg per lot. White-label and
              co-branded packaging available. Origin traceability certificates
              included with every wholesale order.
            </motion.p>

            <motion.div
              custom={0.4}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <Link
                href="/wholesale"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300 hover:opacity-90 hover:scale-105 active:scale-100"
                style={{ backgroundColor: C.gold, color: C.espresso }}
              >
                Enquire About Wholesale
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: C.espresso }}
                  aria-hidden
                >
                  <span style={{ color: C.gold, fontSize: "0.7rem" }}>→</span>
                </span>
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
                className="flex items-start gap-4 p-5 rounded-2xl"
                style={{
                  backgroundColor: "rgba(245,239,230,0.05)",
                  border: "1px solid rgba(176,141,87,0.15)",
                }}
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
                    style={{ color: "rgba(245,239,230,0.55)" }}
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
function BottomCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section
      className="py-12 sm:py-16 md:py-20 px-6 md:px-12 lg:px-20 text-center"
      style={{ backgroundColor: C.beige }}
    >
      <div ref={ref} className="max-w-2xl mx-auto">
        <motion.p
          custom={0}
          variants={fadeIn}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-xs uppercase tracking-[0.35em] mb-4"
          style={{ color: C.gold }}
        >
          Learn More
        </motion.p>
        <motion.h3
          custom={0.1}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="font-serif text-3xl md:text-4xl font-bold mb-4"
          style={{ color: C.espresso }}
        >
          Curious About the Origin?
        </motion.h3>
        <motion.p
          custom={0.2}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-base mb-8"
          style={{ color: C.stone }}
        >
          Discover the story behind Nepal&apos;s remarkable coffee heritage —
          the regions, the farming culture, and the journey from seed to your cup.
        </motion.p>
        <motion.div
          custom={0.3}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:opacity-90 hover:scale-105"
            style={{ backgroundColor: C.espresso, color: C.cream }}
          >
            Read Our Story
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/wholesale"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium border transition-all duration-300 hover:bg-espresso/5"
            style={{ borderColor: `${C.espresso}30`, color: C.espresso }}
          >
            Wholesale Enquiry
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   Page Export
   ============================================================ */
export default function BeansPage() {
  return (
    <>
      <Navigation />
      <main>
      <BeansHero />
      <IntroSection />
      <BeanGridSection />
      <CustomRoastingSection />
      <BottomCTA />
      </main>
      <Footer />
    </>
  );
}
