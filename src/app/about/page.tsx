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
    characteristicNP: "समृद्ध ज्वालामुखी माटो",
    flavor: "Dark chocolate & stone fruit",
    flavorNP: "गाढा चकलेट र ढुङ्गा फल",
    color: "#2B4A4C",
  },
  {
    name: "Palpa",
    altitude: "1,200–1,600 m",
    characteristic: "Shade-grown under native trees",
    characteristicNP: "देशी रूखहरूको छहारीमा उब्जेको",
    flavor: "Floral jasmine & honey",
    flavorNP: "फूलयुक्त जसमिन र मह",
    color: "#6B4C3B",
  },
  {
    name: "Syangja",
    altitude: "1,300–1,700 m",
    characteristic: "River valley morning mist",
    characteristicNP: "नदी उपत्यकाको बिहानी कुहिरो",
    flavor: "Bright citrus & caramel",
    flavorNP: "उज्यालो सिट्रस र क्यारामेल",
    color: "#7A5C4A",
  },
  {
    name: "Kavre",
    altitude: "1,100–1,500 m",
    characteristic: "Organic farming pioneer",
    characteristicNP: "जैविक खेतीको अग्रदूत",
    flavor: "Clean walnut & green apple",
    flavorNP: "सफा अखरोट र हरियो स्याउ",
    color: "#4E3728",
  },
  {
    name: "Nuwakot",
    altitude: "1,200–1,600 m",
    characteristic: "Cold nights, slow maturation",
    characteristicNP: "चिसो राति, ढिलो परिपक्वता",
    flavor: "Complex aged rum & dried fruit",
    flavorNP: "जटिल पुरानो रम र सुकेको फल",
    color: "#614232",
  },
  {
    name: "Lalitpur",
    altitude: "1,000–1,300 m",
    characteristic: "Heritage variety preservation",
    characteristicNP: "परम्परागत जातको संरक्षण",
    flavor: "Balanced brown sugar & spice",
    flavorNP: "सन्तुलित खैरो चिनी र मसला",
    color: "#553B2C",
  },
];

const journeySteps = [
  {
    phase: "Flowering",
    phaseNP: "फूल फुल्ने",
    period: "Jan – Feb",
    description:
      "Coffee plants burst into delicate white blossoms across the hillside terraces, filling the crisp mountain air with jasmine-like fragrance.",
    descriptionNP:
      "कफी बिरुवाहरू पहाडका सोपानहरूमा नाजुक सेता फूलहरूले भरिन्छन्, जसमिन जस्तो सुगन्धले चिसो पहाडी हावालाई भर्छन्।",
    icon: "✦",
  },
  {
    phase: "Harvest",
    phaseNP: "कटाइ",
    period: "Oct – Dec",
    description:
      "Skilled farmers hand-pick only the deepest crimson cherries at peak ripeness — a labour of love that machines could never replicate.",
    descriptionNP:
      "दक्ष किसानहरूले मात्र सबैभन्दा गाढा रातो चेरीहरू हातले टिप्छन् — मेसिनले कहिल्यै नसक्ने माया र मिहिनेतको काम।",
    icon: "◈",
  },
  {
    phase: "Processing",
    phaseNP: "प्रशोधन",
    period: "Nov – Jan",
    description:
      "Cherries are sorted and processed — washed, natural, or honey — each method unlocking a distinct flavour character unique to the lot.",
    descriptionNP:
      "चेरीहरूलाई छानेर प्रशोधन गरिन्छ — धोइएको, प्राकृतिक, वा हनी — प्रत्येक विधिले एउटा विशिष्ट स्वाद खोल्छ।",
    icon: "◎",
  },
  {
    phase: "Drying",
    phaseNP: "सुकाइ",
    period: "Nov – Feb",
    description:
      "Parchment-covered beans dry slowly on raised African beds at altitude, bathed in Himalayan sun and swept by cool mountain winds.",
    descriptionNP:
      "चर्मपत्रले ढाकिएका बिनहरू उचाइमा उठाइएका अफ्रिकी शय्यामा बिस्तारै सुक्छन्, हिमालयको घाममा नुहाएर चिसो पहाडी हावाले बढारिन्छन्।",
    icon: "◉",
  },
  {
    phase: "Export",
    phaseNP: "निर्यात",
    period: "Mar – May",
    description:
      "Green beans, quality-graded and lot-traced, travel from Nepal's highlands to our roasting facility — provenance intact at every step.",
    descriptionNP:
      "गुणस्तर श्रेणीकृत र लट-ट्रेस गरिएका हरिया बिनहरू नेपालको पहाडबाट हाम्रो रोस्टिङ सुविधामा पुग्छन् — हरेक चरणमा उत्पत्ति सुरक्षित।",
    icon: "▷",
  },
  {
    phase: "Roasting",
    phaseNP: "भुट्याइ",
    period: "Year-round",
    description:
      "Our artisan roasters coax the full potential from each lot — light touches for floral complexity, deeper profiles for rich chocolate warmth.",
    descriptionNP:
      "हाम्रा कारीगर रोस्टरहरूले प्रत्येक लटको पूर्ण क्षमता बाहिर ल्याउँछन् — फूलयुक्त जटिलताको लागि हल्का स्पर्श, समृद्ध चकलेट न्यानोपनको लागि गहिरो प्रोफाइल।",
    icon: "◆",
  },
  {
    phase: "Your Cup",
    phaseNP: "तपाईंको कप",
    period: "Always",
    periodNP: "सधैं",
    description:
      "The culmination of months of craft arrives in moments — a cup that carries the altitude, the culture, and the care of the Himalayas.",
    descriptionNP:
      "महिनौंको कारीगरीको परिणति पलभरमा आइपुग्छ — हिमालयको उचाइ, संस्कृति र हेरचाह बोकेको एक कप।",
    icon: "⬡",
  },
];

const qualities = [
  {
    label: "Floral Aroma",
    labelNP: "फूलयुक्त सुगन्ध",
    description:
      "High altitude slows cherry development, concentrating complex floral aromatics rivalling the finest Ethiopian Yirgacheffe.",
    descriptionNP:
      "उच्च उचाइले चेरीको विकास ढिलो गर्छ, जटिल फूलयुक्त सुगन्ध संकेन्द्रित गर्छ जुन उत्कृष्ट इथियोपियन यिर्गाचेफ्फेसँग प्रतिस्पर्धा गर्छ।",
  },
  {
    label: "Chocolate Notes",
    labelNP: "चकलेट नोट",
    description:
      "Volcanic soils and misty mornings produce the deep cocoa undertones found in only the most celebrated Colombian single-origins.",
    descriptionNP:
      "ज्वालामुखी माटो र कुहिरे बिहानहरूले गहिरो कोको अन्डरटोन उत्पादन गर्छन् जुन केवल सबैभन्दा प्रसिद्ध कोलम्बियन सिङ्गल-अरिजिनहरूमा पाइन्छ।",
  },
  {
    label: "Citrus Brightness",
    labelNP: "सिट्रस उज्यालो",
    description:
      "Cool nights at elevation preserve malic and citric acids, delivering a lively brightness that opens the palate beautifully.",
    descriptionNP:
      "उचाइमा चिसो राति म्यालिक र सिट्रिक एसिडहरू जोगाउँछन्, जसले तालुलाई सुन्दर रूपमा खोल्ने जीवन्त उज्यालो प्रदान गर्छ।",
  },
  {
    label: "Low Bitterness",
    labelNP: "कम तितोपन",
    description:
      "Slow ripening at altitude means cherries mature gently — yielding naturally sweet, low-bitterness cups that need no sugar.",
    descriptionNP:
      "उचाइमा ढिलो पाक्ने भनेको चेरीहरू बिस्तारै परिपक्व हुन्छन् — प्राकृतिक रूपमा मीठो, कम तितो कप दिन्छ जसलाई चिनी चाहिँदैन।",
  },
  {
    label: "Smooth Body",
    labelNP: "मुलायम बडी",
    description:
      "Careful processing preserves silky mouthfeel — a smoothness comparable to the most prized Guatemalan Antiguans.",
    descriptionNP:
      "सावधानीपूर्वक प्रशोधनले रेशमी माउथफिल जोगाउँछ — सबैभन्दा प्रिय ग्वाटेमालन अन्टिगुअन्ससँग तुलनीय मुलायमपन।",
  },
  {
    label: "Balanced Acidity",
    labelNP: "सन्तुलित अम्लता",
    description:
      "Neither sharp nor flat — Nepali coffee's acidity is a masterclass in balance, bright enough to excite yet gentle enough to savour.",
    descriptionNP:
      "न तीखो न चेप्टो — नेपाली कफीको अम्लता सन्तुलनको एक उत्कृष्ट उदाहरण हो, उत्साहित पार्न पर्याप्त उज्यालो तर आनन्द लिन पर्याप्त कोमल।",
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
function Overline({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      className="text-xs font-medium tracking-[0.35em] uppercase mb-4"
      style={{ color: light ? 'rgba(217,223,220,0.45)' : C.gold }}
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
      style={{ color: light ? "rgba(217,223,220,0.75)" : C.stone }}
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
          ? "rgba(212,165,90,0.3)"
          : "rgba(212,165,90,0.25)",
      }}
    />
  );
}

/* ============================================================
   Region Card
   ============================================================ */
function RegionCard({ region, index, lang }: { region: (typeof regions)[0]; index: number; lang: string }) {
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
        borderBottom: '1px solid rgba(107,127,126,0.15)',
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
          {lang === 'EN' ? region.characteristic : region.characteristicNP}
        </p>
        <p className="text-sm italic mt-2" style={{ color: C.charcoal }}>
          {lang === 'EN' ? region.flavor : region.flavorNP}
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
  lang,
}: {
  step: (typeof journeySteps)[0];
  index: number;
  lang: string;
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
      {/* Step number */}
      <div className="relative flex-shrink-0 flex flex-col items-center">
        <span
          className="text-[10px] tracking-[0.2em] font-medium tabular-nums"
          style={{ color: C.gold }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        {index < journeySteps.length - 1 && (
          <div className="w-px flex-1 mt-2 min-h-[3rem]" style={{ backgroundColor: `${C.gold}20` }} />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-8">
        <div className="flex items-baseline gap-3 mb-2">
          <h3 className="font-serif text-xl font-semibold" style={{ color: C.espresso }}>
            {lang === 'EN' ? step.phase : step.phaseNP}
          </h3>
          <span className="text-xs tracking-wider" style={{ color: C.gold }}>
            {lang === 'EN' ? step.period : (step.periodNP ?? step.period)}
          </span>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: C.stone }}>
          {lang === 'EN' ? step.description : step.descriptionNP}
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
  lang,
}: {
  item: (typeof qualities)[0];
  index: number;
  lang: string;
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
      className="flex flex-col gap-3 py-6"
      style={{ borderBottom: '1px solid rgba(217,223,220,0.1)' }}
    >
      <p
        className="font-serif text-lg font-semibold"
        style={{ color: C.cream }}
      >
        {lang === 'EN' ? item.label : item.labelNP}
      </p>
      <p className="text-sm leading-relaxed" style={{ color: 'rgba(217,223,220,0.55)' }}>
        {lang === 'EN' ? item.description : item.descriptionNP}
      </p>
    </motion.div>
  );
}

/* ============================================================
   Hero Section
   ============================================================ */
function HeroSection() {
  const { lang } = useLang();
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
            background: `radial-gradient(ellipse 80% 60% at 50% 40%, rgba(212,165,90,0.12) 0%, transparent 70%)`,
          }}
        />
        {/* Decorative rings */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
          style={{ border: "1px solid rgba(212,165,90,0.07)" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full"
          style={{ border: "1px solid rgba(212,165,90,0.05)" }}
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
          style={{ color: 'rgba(217,223,220,0.45)' }}
        >
          {lang === 'EN' ? 'Crafted Above the Clouds' : 'बादलभन्दा माथि बनाइएको'}
        </motion.p>

        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.4, ease }}
            className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-bold leading-none"
            style={{ color: C.cream }}
          >
            {lang === 'EN' ? 'Our Story' : 'हाम्रो कथा'}
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8, ease }}
          className="text-lg md:text-xl font-light tracking-wide"
          style={{ color: "rgba(217,223,220,0.65)" }}
        >
          {lang === 'EN' ? 'From the peaks of the Himalayas to your cup' : 'हिमालयका चुचुराहरूबाट तपाईंको कपसम्म'}
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-widest uppercase" style={{ color: `${C.gold}80` }}>
            {lang === 'EN' ? 'Scroll' : 'स्क्रोल'}
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
  const { lang } = useLang();
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
              <Overline>{lang === 'EN' ? "Nepal’s Coffee Legacy" : "नेपालको कफी सम्पदा"}</Overline>
            </motion.div>

            <AnimatedHeading>
              {lang === 'EN' ? (
                <>A Hidden Origin<br /><em>Revealed</em></>
              ) : (
                <>एक लुकेको उत्पत्ति<br /><em>उजागर</em></>
              )}
            </AnimatedHeading>

            <div className="mt-8 space-y-5">
              <AnimatedParagraph delay={0.1}>
                {lang === 'EN'
                  ? "Nepal’s coffee story began quietly in the mid-twentieth century, when a handful of pioneering farmers in the mid-hills introduced Coffea arabica to terraced slopes that would prove unexpectedly well-suited to the crop."
                  : "नेपालको कफी कथा बीसौं शताब्दीको मध्यमा शान्तरूपमा सुरु भयो, जब मध्य-पहाडका केही अग्रणी किसानहरूले सोपान ढलानहरूमा कफिया अरेबिका परिचय गराए जुन फसलको लागि अप्रत्याशित रूपमा उपयुक्त साबित भयो।"}
              </AnimatedParagraph>
              <AnimatedParagraph delay={0.2}>
                {lang === 'EN'
                  ? "It was only in the early 2000s that the specialty coffee world took notice. International cuppers, travelling to remote districts of Gulmi, Palpa, and Syangja, returned home astonished — describing cups with the floral complexity of Ethiopia, the chocolate depth of Colombia, and a clarity entirely their own."
                  : "२०००को दशकको सुरुमा मात्र स्पेशल्टी कफी जगत्ले ध्यान दियो। गुल्मी, पाल्पा र स्याङ्जाका दुर्गम जिल्लाहरूमा यात्रा गर्ने अन्तर्राष्ट्रिय क्यूपरहरू अचम्मित भएर घर फर्किए — इथियोपियाको फूलयुक्त जटिलता, कोलम्बियाको चकलेट गहिराइ र आफ्नै स्पष्टताका कपहरूको वर्णन गर्दै।"}
              </AnimatedParagraph>
              <AnimatedParagraph delay={0.3}>
                {lang === 'EN'
                  ? "By 2010, Nepal had begun winning recognition at the Cup of Excellence & World Coffee Research events. Today, a growing cohort of discerning roasters across Australia, Japan, and Europe seek out Nepali lots by name — treating them with the same reverence once reserved for Ethiopia and Panama."
                  : "२०१० सम्म, नेपालले कप अफ एक्सेलेन्स र वर्ल्ड कफी रिसर्च कार्यक्रमहरूमा पुरस्कार जित्न थाल्यो। आज, अस्ट्रेलिया, जापान र युरोपभरका समझदार रोस्टरहरूको बढ्दो समूहले नाम लिएर नेपाली लटहरू खोज्छन् — एकपटक इथियोपिया र पनामाको लागि राखिएको उही सम्मानका साथ।"}
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
              { value: "2,000+", label: lang === 'EN' ? "Metres above sea level" : "समुद्र सतहभन्दा मिटर माथि" },
              { value: lang === 'EN' ? "Early 2000s" : "२०००को दशकको सुरु", label: lang === 'EN' ? "Global recognition era" : "विश्व मान्यता युग" },
              { value: "6", label: lang === 'EN' ? "Premier growing regions" : "प्रमुख उत्पादन क्षेत्रहरू" },
              { value: "100%", label: lang === 'EN' ? "Arabica varieties only" : "केवल अरेबिका जातहरू" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 sm:p-6 flex flex-col gap-2"
                style={{
                  backgroundColor: C.beige,
                  borderBottom: `1px solid ${C.stone}15`, borderLeft: `2px solid ${C.gold}`,
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
  const { lang } = useLang();
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
              style={{ backgroundColor: "#1A3C3E" }}
            >
              {/* Layered mountain shapes */}
              <div className="absolute inset-0">
                <svg viewBox="0 0 800 500" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                  {/* Sky gradient */}
                  <defs>
                    <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#355E3B" />
                      <stop offset="100%" stopColor="#1F4D4F" />
                    </linearGradient>
                    <linearGradient id="goldGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#D4A55A" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#D4A55A" stopOpacity="0" />
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
                    fill="rgba(31,77,79,0.6)"
                  />
                  {/* Front hills */}
                  <polygon
                    points="0,460 120,380 250,430 380,350 500,400 620,360 750,420 800,390 800,500 0,500"
                    fill="#1F4D4F"
                  />
                  {/* Terraced lines */}
                  {[350, 370, 390, 410, 430, 450].map((y, i) => (
                    <line
                      key={i}
                      x1={100 + i * 20}
                      y1={y}
                      x2={700 - i * 20}
                      y2={y + 5}
                      stroke="rgba(212,165,90,0.15)"
                      strokeWidth="1"
                    />
                  ))}
                  {/* Golden sunrise glow */}
                  <ellipse cx="400" cy="200" rx="200" ry="100" fill="url(#goldGlow)" />
                  {/* Stars */}
                  {[[100,80],[250,50],[600,70],[700,100],[500,40],[350,90],[150,110]].map(([cx,cy], i) => (
                    <circle key={i} cx={cx} cy={cy} r="1.5" fill="rgba(212,165,90,0.6)" />
                  ))}
                </svg>
              </div>

              {/* Overlay text */}
              <div className="relative z-10 text-center pb-8 px-6">
                <p className="font-serif text-3xl font-bold" style={{ color: C.cream }}>
                  {lang === 'EN' ? 'Above the Clouds' : 'बादलभन्दा माथि'}
                </p>
                <p className="text-sm mt-1" style={{ color: `${C.gold}90` }}>
                  {lang === 'EN' ? '2,000 m altitude farming' : '२,००० मि. उचाइको खेती'}
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
                {lang === 'EN' ? <>High<br />Altitude</> : <>उच्च<br />उचाइ</>}
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
              <Overline light>{lang === 'EN' ? 'Himalayan Farming Culture' : 'हिमालयन खेती संस्कृति'}</Overline>
            </motion.div>

            <AnimatedHeading light>
              {lang === 'EN' ? (
                <>Terraced Hillsides,<br /><em>Ancient Craft</em></>
              ) : (
                <>सोपान पहाड,<br /><em>प्राचीन शिल्प</em></>
              )}
            </AnimatedHeading>

            <div className="mt-8 space-y-5">
              <AnimatedParagraph delay={0.1} light>
                {lang === 'EN'
                  ? "Coffee in Nepal is grown on steep, terraced hillsides carved from mountain slopes over generations. These hand-built terraces — some centuries old — manage rainfall, prevent erosion, and create the micro-climates that give Nepali coffee its distinctive character."
                  : "नेपालमा कफी पुस्तौंपुस्ता पहाडी ढलानहरूबाट खोदिएका ठाडा सोपान पहाडहरूमा उब्जाइन्छ। यी हातले बनाइएका सोपानहरू — केही शताब्दी पुराना — वर्षा व्यवस्थापन गर्छन्, कटान रोक्छन् र माइक्रो-जलवायु सिर्जना गर्छन् जसले नेपाली कफीलाई आफ्नो विशिष्ट चरित्र दिन्छ।"}
              </AnimatedParagraph>
              <AnimatedParagraph delay={0.2} light>
                {lang === 'EN'
                  ? "Farmers here work at elevations between 1,000 and 2,000 metres, where cool nights and bright days create the ideal stress conditions for slow cherry development. The result: denser beans with higher sugar concentrations, richer aromatics, and a natural low bitterness that no processing method can replicate."
                  : "यहाँका किसानहरू १,००० देखि २,००० मिटरको उचाइमा काम गर्छन्, जहाँ चिसो राति र उज्यालो दिनहरूले ढिलो चेरी विकासको लागि आदर्श तनाव अवस्था सिर्जना गर्छन्। परिणाम: उच्च चिनी सांद्रता, समृद्ध सुगन्ध र कुनै प्रशोधन विधिले नदोहोर्याउन सक्ने प्राकृतिक कम तितोपना भएका घना बिनहरू।"}
              </AnimatedParagraph>
              <AnimatedParagraph delay={0.3} light>
                {lang === 'EN'
                  ? "Most farms are family-owned, spanning one to three hectares. Coffee is intercropped with cardamom, citrus, and native shade trees — a system that preserves biodiversity while imparting subtle terroir influences that sophisticated cuppers can detect in the cup."
                  : "अधिकांश खेतहरू परिवार-स्वामित्वमा छन्, एक देखि तीन हेक्टेयरसम्म फैलिएका। कफी एलाइची, सिट्रस र देशी छाया रूखहरूसँग अन्तरबाली गरिन्छ — एउटा प्रणाली जसले जैविक विविधता जोगाउँदै परिष्कृत क्यूपरहरूले कपमा पत्ता लगाउन सक्ने सूक्ष्म टेरोइर प्रभावहरू प्रदान गर्छ।"}
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
  const { lang } = useLang();
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
            <Overline>{lang === 'EN' ? 'The Growing Regions' : 'उत्पादन क्षेत्रहरू'}</Overline>
          </motion.div>
          <AnimatedHeading className="mx-auto max-w-2xl">
            {lang === 'EN' ? (
              <>Six Districts,<br /><em>Infinite Nuance</em></>
            ) : (
              <>छ जिल्लाहरू,<br /><em>अनन्त सूक्ष्मता</em></>
            )}
          </AnimatedHeading>
          <AnimatedParagraph delay={0.15} className="mt-6 mx-auto max-w-xl">
            {lang === 'EN'
              ? "Each district brings its own altitude, microclimate, and centuries of agricultural heritage — producing coffees as varied as the landscapes they come from."
              : "प्रत्येक जिल्लाले आफ्नै उचाइ, माइक्रोक्लाइमेट र शताब्दीयौंको कृषि सम्पदा ल्याउँछ — आफू आउने परिदृश्यजत्तिकै विविध कफीहरू उत्पादन गर्दै।"}
          </AnimatedParagraph>
        </div>

        <div style={{ borderTop: '1px solid rgba(107,127,126,0.15)' }}>
          {regions.map((region, index) => (
            <RegionCard key={region.name} region={region} index={index} lang={lang} />
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
  const { lang } = useLang();
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
              <Overline>{lang === 'EN' ? 'The Bean Journey' : 'बिनको यात्रा'}</Overline>
            </motion.div>
            <AnimatedHeading>
              {lang === 'EN' ? (
                <>Seed to Cup,<br /><em>Step by Step</em></>
              ) : (
                <>बिउदेखि कपसम्म,<br /><em>चरण दर चरण</em></>
              )}
            </AnimatedHeading>
            <AnimatedParagraph delay={0.15} className="mt-6">
              {lang === 'EN'
                ? "Every sip carries the weight of twelve months of care. From the first blossom on a hillside farm to the moment coffee meets hot water in your home — each step is executed with unhurried intentionality."
                : "प्रत्येक चुस्कीमा बाह्र महिनाको हेरचाहको भार छ। पहाडी खेतमा पहिलो फूलदेखि तपाईंको घरमा कफी तातो पानीसँग भेट्ने पलसम्म — हरेक चरण बिना हतार उद्देश्यपूर्वक कार्यान्वयन गरिन्छ।"}
            </AnimatedParagraph>
            <AnimatedParagraph delay={0.25} className="mt-4">
              {lang === 'EN'
                ? "We trace every lot from seed to shipment, partnering with cooperatives that share our belief: the best coffee is grown by farmers who are paid fairly and treated as craftspeople."
                : "हामी प्रत्येक लट बिउदेखि ढुवानीसम्म ट्रेस गर्छौं, हाम्रो विश्वास साझा गर्ने सहकारीहरूसँग साझेदारी गर्दै: सबैभन्दा राम्रो कफी उन किसानहरूले उब्जाउँछन् जसलाई उचित पारिश्रमिक दिइन्छ र शिल्पकारको रूपमा व्यवहार गरिन्छ।"}
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
              {lang === 'EN'
                ? "“We don’t rush the Himalayas. Neither does the coffee.”"
                : "“हामी हिमालयलाई हतार गर्दैनौं। कफी पनि गर्दैन।”"}
            </motion.blockquote>
          </div>

          {/* Right: timeline */}
          <div className="pt-4">
            {journeySteps.map((step, index) => (
              <JourneyStep key={step.phase} step={step} index={index} lang={lang} />
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
  const { lang } = useLang();
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
            <Overline light>{lang === 'EN' ? "Why Nepali Coffee Rivals the World’s Best" : "किन नेपाली कफी?"}</Overline>
          </motion.div>
          <AnimatedHeading light className="mx-auto max-w-3xl">
            {lang === 'EN' ? (
              <>Where Ethiopia Meets Colombia,<br /><em style={{ color: C.cream }}>At Himalayan Altitude</em></>
            ) : (
              <>नेपालको कफी असाधारण किन छ<br /><em style={{ color: C.cream }}>हिमालयको उचाइमा</em></>
            )}
          </AnimatedHeading>
          <AnimatedParagraph delay={0.15} light className="mt-6 mx-auto max-w-2xl">
            {lang === 'EN'
              ? "The coffee world has long celebrated Ethiopian florals and Colombian chocolate. Nepali coffee delivers both — and adds a quietude, a smoothness born from altitude, that neither origin can claim alone."
              : "कफी जगत्ले लामो समयदेखि इथियोपियन फूलहरू र कोलम्बियन चकलेट उत्सव मनाउँदै आएको छ। नेपाली कफीले दुवै प्रदान गर्छ — र उचाइबाट जन्मेको एक शान्तता, एक मुलायमपन थप्छ, जुन कुनै पनि एकल उत्पत्तिले एक्लै दाबी गर्न सक्दैन।"}
          </AnimatedParagraph>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mt-8 md:mt-12">
          {qualities.map((item, index) => (
            <QualityCard key={item.label} item={item} index={index} lang={lang} />
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
            {lang === 'EN' ? 'In the company of legends' : 'महान् उत्पत्तिहरूको साथमा'}
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
                    color: i === 3 ? C.espresso : "rgba(217,223,220,0.6)",
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
  const { lang } = useLang();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const promises = lang === 'EN'
    ? [
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
      ]
    : [
        {
          title: "किसान-प्रथम मूल्य निर्धारण",
          body: "हामी हाम्रो साझेदारी गर्ने प्रत्येक सहकारीलाई फेयरट्रेड तल्लो मूल्यभन्दा कम्तिमा ४०% माथि तिर्छौं, खेती गर्ने परिवारहरूको लागि दिगो जीविका सुनिश्चित गर्दै।",
        },
        {
          title: "पूर्ण ट्रेसेबिलिटी",
          body: "प्रत्येक झोलामा खेत, कटाइ मिति र प्रशोधन स्टेसनसम्म ट्रेस गर्न सकिने लट कोड हुन्छ — पारदर्शिता मानकको रूपमा, प्रिमियम होइन।",
        },
        {
          title: "शून्य सम्झौता गुणस्तर",
          body: "हामी SCA क्यूपिङ स्केलमा ८५ भन्दा कम स्कोर गर्ने कुनै पनि लट अस्वीकार गर्छौं। गुणस्तर कहिल्यै वार्तालाप गरिँदैन, मात्रा वा आपूर्ति दबाब जे भए पनि।",
        },
        {
          title: "वातावरणीय संरक्षण",
          body: "हामी प्रत्येक साझेदार जिल्लामा देशी रूख पुनः रोपण कार्यक्रमहरू वित्त पोषण गर्छौं र सबै साझेदार खेतहरूबाट राम्रो कृषि अभ्यास प्रमाणीकरण आवश्यक पर्छ।",
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
              <Overline light>{lang === 'EN' ? 'Our Promise' : 'हाम्रो प्रतिज्ञा'}</Overline>
            </motion.div>
            <AnimatedHeading light>
              {lang === 'EN' ? (
                <>Ethical Sourcing,<br /><em>Without Exception</em></>
              ) : (
                <>नैतिक स्रोत प्राप्ति,<br /><em>कुनै अपवाद बिना</em></>
              )}
            </AnimatedHeading>
            <AnimatedParagraph delay={0.15} light className="mt-6">
              {lang === 'EN'
                ? "We believe the finest coffee in the world should also produce the finest outcomes for the people who grow it. Our sourcing model is built on long-term relationships, transparent pricing, and a shared commitment to the Himalayan communities that make HIMA BEANS possible."
                : "हामी विश्वास गर्छौं कि संसारको सबैभन्दा उत्कृष्ट कफीले यसलाई उब्जाउने मानिसहरूको लागि पनि सबैभन्दा उत्कृष्ट परिणाम उत्पादन गर्नुपर्छ। हाम्रो स्रोत प्राप्ति मोडेल दीर्घकालीन सम्बन्ध, पारदर्शी मूल्य निर्धारण र HIMA BEANS सम्भव बनाउने हिमालयी समुदायहरूप्रति साझा प्रतिबद्धतामा आधारित छ।"}
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
                className="inline-flex items-center gap-2 px-7 py-3.5 text-[11px] tracking-[0.18em] uppercase font-medium transition-all duration-300 hover:opacity-80"
                style={{ backgroundColor: C.beige, color: C.espresso }}
              >
                {lang === 'EN' ? 'Explore Our Beans' : 'हाम्रा बिनहरू अन्वेषण गर्नुहोस्'}
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/wholesale"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-[11px] tracking-[0.18em] uppercase font-medium border transition-all duration-300 hover:border-[#D9DFDC]"
                style={{ borderColor: `rgba(217,223,220,0.25)`, color: 'rgba(217,223,220,0.7)' }}
              >
                {lang === 'EN' ? 'Wholesale Enquiries' : 'थोक सोधपुछ'}
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
                className="py-5 border-b"
                style={{ borderColor: "rgba(217,223,220,0.08)" }}
              >
                <p className="font-serif text-base font-semibold mb-2" style={{ color: C.beige }}>
                  {promise.title}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(217,223,220,0.65)" }}>
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
