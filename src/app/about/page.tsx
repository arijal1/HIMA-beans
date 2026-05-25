"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import Navigation from '@/components/layout/Navigation'; 
import Footer from '@/components/layout/Footer';

/* ============================================================
   Brand Tokens
   ============================================================ */
const C = {
  espresso: "#1E1008",
  cream: "#F2E8D8",
  stone: "#87705A",
  gold: "#7C5535",
  beige: "#EDE0CC",
  charcoal: "#1A1008",
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
    transition: { duration: 0.9, delay, ease },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.8, delay, ease },
  }),
};

const slideLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, delay, ease },
  }),
};

const slideRight = {
  hidden: { opacity: 0, x: 60 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, delay, ease },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, delay, ease },
  }),
};

/* ============================================================
   Data
   ============================================================ */
const regions = [
  {
    name: "Gulmi",
    altitude: "1,400–1,800 m",
    characteristic: "Rich volcanic soil",
    flavor: "Dark chocolate & stone fruit",
    color: "#5C3D2E",
  },
  {
    name: "Palpa",
    altitude: "1,200–1,600 m",
    characteristic: "Shade-grown under native trees",
    flavor: "Floral jasmine & honey",
    color: "#6B4C3B",
  },
  {
    name: "Syangja",
    altitude: "1,300–1,700 m",
    characteristic: "River valley morning mist",
    flavor: "Bright citrus & caramel",
    color: "#7A5C4A",
  },
  {
    name: "Kavre",
    altitude: "1,100–1,500 m",
    characteristic: "Organic farming pioneer",
    flavor: "Clean walnut & green apple",
    color: "#4E3728",
  },
  {
    name: "Nuwakot",
    altitude: "1,200–1,600 m",
    characteristic: "Cold nights, slow maturation",
    flavor: "Complex aged rum & dried fruit",
    color: "#614232",
  },
  {
    name: "Lalitpur",
    altitude: "1,000–1,300 m",
    characteristic: "Heritage variety preservation",
    flavor: "Balanced brown sugar & spice",
    color: "#553B2C",
  },
];

const journeySteps = [
  {
    phase: "Flowering",
    period: "Jan – Feb",
    description:
      "Coffee plants burst into delicate white blossoms across the hillside terraces, filling the crisp mountain air with jasmine-like fragrance.",
    icon: "✦",
  },
  {
    phase: "Harvest",
    period: "Oct – Dec",
    description:
      "Skilled farmers hand-pick only the deepest crimson cherries at peak ripeness — a labour of love that machines could never replicate.",
    icon: "◈",
  },
  {
    phase: "Processing",
    period: "Nov – Jan",
    description:
      "Cherries are sorted and processed — washed, natural, or honey — each method unlocking a distinct flavour character unique to the lot.",
    icon: "◎",
  },
  {
    phase: "Drying",
    period: "Nov – Feb",
    description:
      "Parchment-covered beans dry slowly on raised African beds at altitude, bathed in Himalayan sun and swept by cool mountain winds.",
    icon: "◉",
  },
  {
    phase: "Export",
    period: "Mar – May",
    description:
      "Green beans, quality-graded and lot-traced, travel from Nepal's highlands to our roasting facility — provenance intact at every step.",
    icon: "▷",
  },
  {
    phase: "Roasting",
    period: "Year-round",
    description:
      "Our artisan roasters coax the full potential from each lot — light touches for floral complexity, deeper profiles for rich chocolate warmth.",
    icon: "◆",
  },
  {
    phase: "Your Cup",
    period: "Always",
    description:
      "The culmination of months of craft arrives in moments — a cup that carries the altitude, the culture, and the care of the Himalayas.",
    icon: "⬡",
  },
];

const qualities = [
  {
    label: "Floral Aroma",
    description:
      "High altitude slows cherry development, concentrating complex floral aromatics rivalling the finest Ethiopian Yirgacheffe.",
  },
  {
    label: "Chocolate Notes",
    description:
      "Volcanic soils and misty mornings produce the deep cocoa undertones found in only the most celebrated Colombian single-origins.",
  },
  {
    label: "Citrus Brightness",
    description:
      "Cool nights at elevation preserve malic and citric acids, delivering a lively brightness that opens the palate beautifully.",
  },
  {
    label: "Low Bitterness",
    description:
      "Slow ripening at altitude means cherries mature gently — yielding naturally sweet, low-bitterness cups that need no sugar.",
  },
  {
    label: "Smooth Body",
    description:
      "Careful processing preserves silky mouthfeel — a smoothness comparable to the most prized Guatemalan Antiguans.",
  },
  {
    label: "Balanced Acidity",
    description:
      "Neither sharp nor flat — Nepali coffee's acidity is a masterclass in balance, bright enough to excite yet gentle enough to savour.",
  },
];

/* ============================================================
   Section Wrapper Helper
   ============================================================ */
function SectionWrapper({
  children,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <section
      className={`relative ${className}`}
      style={style}
    >
      <div className="site-container">
        {children}
      </div>
    </section>
  );
}

/* ============================================================
   Overline Label
   ============================================================ */
function Overline({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-xs font-medium tracking-[0.35em] uppercase mb-4"
      style={{ color: C.gold }}
    >
      {children}
    </p>
  );
}

/* ============================================================
   Animated Section Title
   ============================================================ */
function AnimatedHeading({
  children,
  className = "",
  light = false,
}: {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.h2
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight ${className}`}
      style={{ color: light ? C.cream : C.espresso }}
    >
      {children}
    </motion.h2>
  );
}

/* ============================================================
   Animated Paragraph
   ============================================================ */
function AnimatedParagraph({
  children,
  delay = 0,
  className = "",
  light = false,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  light?: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.p
      ref={ref}
      custom={delay}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`leading-relaxed text-base md:text-lg ${className}`}
      style={{ color: light ? "rgba(245,239,230,0.75)" : C.stone }}
    >
      {children}
    </motion.p>
  );
}

/* ============================================================
   Decorative Divider
   ============================================================ */
function GoldDivider({ light = false }: { light?: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ scaleX: 0, opacity: 0 }}
      animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
      transition={{ duration: 0.9, ease }}
      className="h-px my-8 origin-left"
      style={{
        backgroundColor: light
          ? "rgba(123,89,32,0.3)"
          : "rgba(123,89,32,0.25)",
      }}
    />
  );
}

/* ============================================================
   Region Card
   ============================================================ */
function RegionCard({ region, index }: { region: (typeof regions)[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      custom={index * 0.07}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      style={{
        paddingTop: '1.5rem',
        paddingBottom: '1.5rem',
        borderBottom: '1px solid rgba(135,112,90,0.15)',
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: '0.75rem 1.5rem',
        alignItems: 'start',
      }}
    >
      {/* Name + characteristic */}
      <div>
        <h3
          className="font-serif text-xl font-bold mb-1"
          style={{ color: C.espresso }}
        >
          {region.name}
        </h3>
        <p className="text-sm" style={{ color: C.stone }}>
          {region.characteristic}
        </p>
        <p className="text-sm italic mt-2" style={{ color: C.charcoal }}>
          {region.flavor}
        </p>
      </div>

      {/* Altitude badge — minimal pill */}
      <span
        style={{
          fontSize: '10px',
          letterSpacing: '0.12em',
          color: C.gold,
          fontFamily: 'var(--font-inter, Inter, sans-serif)',
          whiteSpace: 'nowrap',
          paddingTop: '3px',
        }}
      >
        {region.altitude}
      </span>
    </motion.div>
  );
}

/* ============================================================
   Journey Step
   ============================================================ */
function JourneyStep({
  step,
  index,
}: {
  step: (typeof journeySteps)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      custom={index * 0.1}
      variants={index % 2 === 0 ? slideLeft : slideRight}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="flex items-start gap-4 sm:gap-6 group"
    >
      {/* Step marker */}
      <div className="relative flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full"
        style={{ backgroundColor: "rgba(123,89,32,0.12)", border: `1px solid ${C.gold}40` }}
      >
        <span className="text-lg" style={{ color: C.gold }}>
          {step.icon}
        </span>
        {/* Connector line — all except last */}
        {index < journeySteps.length - 1 && (
          <div
            className="absolute top-full left-1/2 -translate-x-1/2 w-px h-10"
            style={{ backgroundColor: `${C.gold}25` }}
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-10">
        <div className="flex items-center gap-3 mb-2">
          <h3
            className="font-serif text-xl font-semibold"
            style={{ color: C.espresso }}
          >
            {step.phase}
          </h3>
          <span
            className="text-xs font-medium tracking-wider px-2 py-0.5 rounded-full"
            style={{ backgroundColor: `${C.gold}18`, color: C.gold }}
          >
            {step.period}
          </span>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: C.stone }}>
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

/* ============================================================
   Quality Card
   ============================================================ */
function QualityCard({
  item,
  index,
}: {
  item: (typeof qualities)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      custom={index * 0.07}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="p-6 rounded-2xl flex flex-col gap-3"
      style={{
        backgroundColor: "rgba(245,239,230,0.06)",
        border: "1px solid rgba(123,89,32,0.2)",
      }}
    >
      <p
        className="font-serif text-lg font-semibold"
        style={{ color: C.gold }}
      >
        {item.label}
      </p>
      <p className="text-sm leading-relaxed" style={{ color: "rgba(245,239,230,0.65)" }}>
        {item.description}
      </p>
    </motion.div>
  );
}

/* ============================================================
   Hero Section
   ============================================================ */
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, 120]), {
    stiffness: 60,
    damping: 20,
  });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4"
      style={{ backgroundColor: C.espresso }}
    >
      {/* Parallax grain bg */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Radial glow */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% 40%, rgba(123,89,32,0.12) 0%, transparent 70%)`,
          }}
        />
        {/* Decorative rings */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
          style={{ border: "1px solid rgba(123,89,32,0.07)" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full"
          style={{ border: "1px solid rgba(123,89,32,0.05)" }}
        />
      </motion.div>

      {/* Hero content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.3em" }}
          animate={{ opacity: 1, letterSpacing: "0.45em" }}
          transition={{ duration: 1.0, delay: 0.2 }}
          className="text-xs font-medium uppercase mb-8"
          style={{ color: C.gold }}
        >
          Crafted Above the Clouds
        </motion.p>

        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.4, ease }}
            className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-bold leading-none"
            style={{ color: C.cream }}
          >
            Our Story
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8, ease }}
          className="text-lg md:text-xl font-light tracking-wide"
          style={{ color: "rgba(245,239,230,0.65)" }}
        >
          From the peaks of the Himalayas to your cup
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-widest uppercase" style={{ color: `${C.gold}80` }}>
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8"
            style={{ backgroundColor: `${C.gold}60` }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ============================================================
   Nepal History Section
   ============================================================ */
function HistorySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionWrapper
      className="py-16 sm:py-20 md:py-28 lg:py-40"
      style={{ backgroundColor: C.cream }}
    >
      <div ref={ref} className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left: Text */}
          <div>
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeIn}
            >
              <Overline>Nepal&apos;s Coffee Legacy</Overline>
            </motion.div>

            <AnimatedHeading>
              A Hidden Origin
              <br />
              <em>Revealed</em>
            </AnimatedHeading>

            <div className="mt-8 space-y-5">
              <AnimatedParagraph delay={0.1}>
                Nepal&apos;s coffee story began quietly in the mid-twentieth century,
                when a handful of pioneering farmers in the mid-hills introduced
                Coffea arabica to terraced slopes that would prove unexpectedly
                well-suited to the crop.
              </AnimatedParagraph>
              <AnimatedParagraph delay={0.2}>
                It was only in the early 2000s that the specialty coffee world took
                notice. International cuppers, travelling to remote districts of
                Gulmi, Palpa, and Syangja, returned home astonished — describing
                cups with the floral complexity of Ethiopia, the chocolate depth of
                Colombia, and a clarity entirely their own.
              </AnimatedParagraph>
              <AnimatedParagraph delay={0.3}>
                By 2010, Nepal had begun winning recognition at the Cup of
                Excellence &amp; World Coffee Research events. Today, a growing
                cohort of discerning roasters across Australia, Japan, and Europe
                seek out Nepali lots by name — treating them with the same
                reverence once reserved for Ethiopia and Panama.
              </AnimatedParagraph>
            </div>
          </div>

          {/* Right: decorative stat blocks */}
          <motion.div
            custom={0.3}
            variants={slideRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { value: "2,000+", label: "Metres above sea level" },
              { value: "Early 2000s", label: "Global recognition era" },
              { value: "6", label: "Premier growing regions" },
              { value: "100%", label: "Arabica varieties only" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 sm:p-6 rounded-2xl flex flex-col gap-2"
                style={{
                  backgroundColor: C.beige,
                  border: `1px solid ${C.stone}22`,
                }}
              >
                <span
                  className="font-serif text-3xl font-bold"
                  style={{ color: C.espresso }}
                >
                  {stat.value}
                </span>
                <span className="text-xs uppercase tracking-wider" style={{ color: C.stone }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ============================================================
   Farming Culture Section
   ============================================================ */
function FarmingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionWrapper
      className="py-16 sm:py-20 md:py-28 lg:py-40"
      style={{ backgroundColor: C.espresso }}
    >
      <div ref={ref} className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left: Decorative visual */}
          <motion.div
            custom={0}
            variants={slideLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative"
          >
            {/* Mountain silhouette illustration (pure CSS) */}
            <div
              className="relative rounded-3xl overflow-hidden aspect-[4/3] flex items-end justify-center"
              style={{ backgroundColor: "#2B1E17" }}
            >
              {/* Layered mountain shapes */}
              <div className="absolute inset-0">
                <svg viewBox="0 0 800 500" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                  {/* Sky gradient */}
                  <defs>
                    <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#160C05" />
                      <stop offset="100%" stopColor="#1E1008" />
                    </linearGradient>
                    <linearGradient id="goldGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7C5535" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#7C5535" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <rect width="800" height="500" fill="url(#skyGrad)" />

                  {/* Back range */}
                  <polygon
                    points="0,350 150,180 280,280 400,120 520,230 650,160 800,240 800,500 0,500"
                    fill="rgba(255,255,255,0.03)"
                  />
                  {/* Mid range */}
                  <polygon
                    points="0,420 100,280 220,360 350,200 470,310 600,220 720,300 800,260 800,500 0,500"
                    fill="rgba(30,16,8,0.6)"
                  />
                  {/* Front hills */}
                  <polygon
                    points="0,460 120,380 250,430 380,350 500,400 620,360 750,420 800,390 800,500 0,500"
                    fill="#1E1008"
                  />
                  {/* Terraced lines */}
                  {[350, 370, 390, 410, 430, 450].map((y, i) => (
                    <line
                      key={i}
                      x1={100 + i * 20}
                      y1={y}
                      x2={700 - i * 20}
                      y2={y + 5}
                      stroke="rgba(123,89,32,0.15)"
                      strokeWidth="1"
                    />
                  ))}
                  {/* Golden sunrise glow */}
                  <ellipse cx="400" cy="200" rx="200" ry="100" fill="url(#goldGlow)" />
                  {/* Stars */}
                  {[[100,80],[250,50],[600,70],[700,100],[500,40],[350,90],[150,110]].map(([cx,cy], i) => (
                    <circle key={i} cx={cx} cy={cy} r="1.5" fill="rgba(123,89,32,0.6)" />
                  ))}
                </svg>
              </div>

              {/* Overlay text */}
              <div className="relative z-10 text-center pb-8 px-6">
                <p className="font-serif text-3xl font-bold" style={{ color: C.cream }}>
                  Above the Clouds
                </p>
                <p className="text-sm mt-1" style={{ color: `${C.gold}90` }}>
                  2,000 m altitude farming
                </p>
              </div>
            </div>

            {/* Floating accent */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 w-20 h-20 rounded-full flex items-center justify-center"
              style={{ backgroundColor: C.gold, color: C.espresso }}
            >
              <span className="font-serif text-xs font-bold text-center leading-tight px-2">
                High<br />Altitude
              </span>
            </motion.div>
          </motion.div>

          {/* Right: Text */}
          <div>
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeIn}
            >
              <Overline>Himalayan Farming Culture</Overline>
            </motion.div>

            <AnimatedHeading light>
              Terraced Hillsides,
              <br />
              <em>Ancient Craft</em>
            </AnimatedHeading>

            <div className="mt-8 space-y-5">
              <AnimatedParagraph delay={0.1} light>
                Coffee in Nepal is grown on steep, terraced hillsides carved from
                mountain slopes over generations. These hand-built terraces — some
                centuries old — manage rainfall, prevent erosion, and create the
                micro-climates that give Nepali coffee its distinctive character.
              </AnimatedParagraph>
              <AnimatedParagraph delay={0.2} light>
                Farmers here work at elevations between 1,000 and 2,000 metres,
                where cool nights and bright days create the ideal stress conditions
                for slow cherry development. The result: denser beans with higher
                sugar concentrations, richer aromatics, and a natural low bitterness
                that no processing method can replicate.
              </AnimatedParagraph>
              <AnimatedParagraph delay={0.3} light>
                Most farms are family-owned, spanning one to three hectares. Coffee
                is intercropped with cardamom, citrus, and native shade trees — a
                system that preserves biodiversity while imparting subtle terroir
                influences that sophisticated cuppers can detect in the cup.
              </AnimatedParagraph>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ============================================================
   Growing Regions Section
   ============================================================ */
function RegionsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <SectionWrapper
      className="py-16 sm:py-20 md:py-28 lg:py-40"
      style={{ backgroundColor: C.cream }}
    >
      <div ref={ref} className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeIn}
          >
            <Overline>The Growing Regions</Overline>
          </motion.div>
          <AnimatedHeading className="mx-auto max-w-2xl">
            Six Districts,
            <br />
            <em>Infinite Nuance</em>
          </AnimatedHeading>
          <AnimatedParagraph delay={0.15} className="mt-6 mx-auto max-w-xl">
            Each district brings its own altitude, microclimate, and centuries of
            agricultural heritage — producing coffees as varied as the landscapes
            they come from.
          </AnimatedParagraph>
        </div>

        <div style={{ borderTop: '1px solid rgba(135,112,90,0.15)' }}>
          {regions.map((region, index) => (
            <RegionCard key={region.name} region={region} index={index} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ============================================================
   Bean Journey Section
   ============================================================ */
function JourneySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <SectionWrapper
      className="py-16 sm:py-20 md:py-28 lg:py-40"
      style={{ backgroundColor: C.beige }}
    >
      <div ref={ref} className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left: intro */}
          <div>
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeIn}
            >
              <Overline>The Bean Journey</Overline>
            </motion.div>
            <AnimatedHeading>
              Seed to Cup,
              <br />
              <em>Step by Step</em>
            </AnimatedHeading>
            <AnimatedParagraph delay={0.15} className="mt-6">
              Every sip carries the weight of twelve months of care. From the
              first blossom on a hillside farm to the moment coffee meets hot
              water in your home — each step is executed with unhurried
              intentionality.
            </AnimatedParagraph>
            <AnimatedParagraph delay={0.25} className="mt-4">
              We trace every lot from seed to shipment, partnering with
              cooperatives that share our belief: the best coffee is grown by
              farmers who are paid fairly and treated as craftspeople.
            </AnimatedParagraph>

            {/* Decorative quote */}
            <motion.blockquote
              custom={0.35}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="mt-10 pl-6 border-l-2 italic text-lg leading-relaxed"
              style={{ borderColor: C.gold, color: C.espresso }}
            >
              &ldquo;We don&apos;t rush the Himalayas. Neither does the coffee.&rdquo;
            </motion.blockquote>
          </div>

          {/* Right: timeline */}
          <div className="pt-4">
            {journeySteps.map((step, index) => (
              <JourneyStep key={step.phase} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ============================================================
   Why Nepali Coffee Section
   ============================================================ */
function QualitySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <SectionWrapper
      className="py-16 sm:py-20 md:py-28 lg:py-40"
      style={{ backgroundColor: C.charcoal }}
    >
      <div ref={ref} className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeIn}
          >
            <Overline>Why Nepali Coffee Rivals the World&apos;s Best</Overline>
          </motion.div>
          <AnimatedHeading light className="mx-auto max-w-3xl">
            Where Ethiopia Meets Colombia,
            <br />
            <em style={{ color: C.gold }}>At Himalayan Altitude</em>
          </AnimatedHeading>
          <AnimatedParagraph delay={0.15} light className="mt-6 mx-auto max-w-2xl">
            The coffee world has long celebrated Ethiopian florals and Colombian
            chocolate. Nepali coffee delivers both — and adds a quietude, a
            smoothness born from altitude, that neither origin can claim alone.
          </AnimatedParagraph>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mt-8 md:mt-12">
          {qualities.map((item, index) => (
            <QualityCard key={item.label} item={item} index={index} />
          ))}
        </div>

        {/* Comparison note */}
        <motion.div
          custom={0.4}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-14 text-center"
        >
          <p className="text-sm uppercase tracking-widest mb-4" style={{ color: `${C.gold}70` }}>
            In the company of legends
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {["Ethiopian Yirgacheffe", "Colombian Huila", "Guatemalan Antigua", "Nepali Himalayan"].map(
              (origin, i) => (
                <span
                  key={origin}
                  className="text-sm font-medium px-4 py-2 rounded-full"
                  style={{
                    backgroundColor:
                      i === 3
                        ? C.gold
                        : "rgba(255,255,255,0.06)",
                    color: i === 3 ? C.espresso : "rgba(245,239,230,0.6)",
                    border: i === 3 ? "none" : "1px solid rgba(255,255,255,0.1)",
                    fontWeight: i === 3 ? 700 : 400,
                  }}
                >
                  {origin}
                </span>
              )
            )}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

/* ============================================================
   Our Promise Section
   ============================================================ */
function PromiseSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const promises = [
    {
      title: "Farmer-First Pricing",
      body: "We pay a minimum of 40% above Fairtrade floor price to every cooperative we work with, ensuring sustainable livelihoods for farming families.",
    },
    {
      title: "Full Traceability",
      body: "Every bag carries a lot code traceable to the farm, the harvest date, and the processing station — transparency as standard, not a premium.",
    },
    {
      title: "Zero Compromise Quality",
      body: "We reject any lot scoring below 85 on the SCA cupping scale. Quality is never negotiated, regardless of volume or supply pressure.",
    },
    {
      title: "Environmental Stewardship",
      body: "We fund native tree replanting programmes in each partner district and require Good Agricultural Practices certification from all partner farms.",
    },
  ];

  return (
    <SectionWrapper
      className="py-16 sm:py-20 md:py-28 lg:py-40"
      style={{ backgroundColor: C.espresso }}
    >
      <div ref={ref} className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left */}
          <div>
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeIn}
            >
              <Overline>Our Promise</Overline>
            </motion.div>
            <AnimatedHeading light>
              Ethical Sourcing,
              <br />
              <em>Without Exception</em>
            </AnimatedHeading>
            <AnimatedParagraph delay={0.15} light className="mt-6">
              We believe the finest coffee in the world should also produce the
              finest outcomes for the people who grow it. Our sourcing model is
              built on long-term relationships, transparent pricing, and a shared
              commitment to the Himalayan communities that make HIMA BEANS possible.
            </AnimatedParagraph>

            <motion.div
              custom={0.3}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="mt-10 flex flex-col sm:flex-row flex-wrap gap-4"
            >
              <Link
                href="/beans"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:opacity-90 hover:scale-105"
                style={{ backgroundColor: C.gold, color: C.espresso }}
              >
                Explore Our Beans
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/wholesale"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium border transition-all duration-300 hover:bg-white/10"
                style={{ borderColor: `${C.cream}40`, color: C.cream }}
              >
                Wholesale Enquiries
              </Link>
            </motion.div>
          </div>

          {/* Right: promise cards */}
          <div className="space-y-4">
            {promises.map((promise, index) => (
              <motion.div
                key={promise.title}
                custom={index * 0.1}
                variants={slideRight}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="p-6 rounded-2xl"
                style={{
                  backgroundColor: "rgba(245,239,230,0.05)",
                  border: "1px solid rgba(123,89,32,0.2)",
                }}
              >
                <p className="font-serif text-base font-semibold mb-2" style={{ color: C.gold }}>
                  {promise.title}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(245,239,230,0.65)" }}>
                  {promise.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ============================================================
   Page Export
   ============================================================ */
export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <HistorySection />
        <FarmingSection />
        <RegionsSection />
        <JourneySection />
        <QualitySection />
        <PromiseSection />
      </main>
      <Footer />
    </>
  );
}
