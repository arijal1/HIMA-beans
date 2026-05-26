'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { useLang } from '@/context/lang';

/* ============================================================
   Types
   ============================================================ */
interface CommitmentSection {
  title: string;
  titleNP: string;
  subtitle: string;
  body: string[];
  bodyNP: string[];
  dark: boolean;
  gradientFrom: string;
  gradientTo: string;
  tag: string;
}

interface FarmerProfile {
  name: string;
  location: string;
  tenure: string;
  quote: string;
  detail: string;
  initial: string;
}

interface ImpactStat {
  value: number;
  suffix: string;
  label: string;
  labelNP: string;
  description: string;
}

interface Certification {
  name: string;
  body: string;
  icon: string;
}

/* ============================================================
   Data
   ============================================================ */
const COMMITMENTS: CommitmentSection[] = [
  {
    tag: 'Commitment 01',
    title: 'Ethical Sourcing',
    titleNP: 'नैतिक स्रोत',
    subtitle: 'Fair value, from farm to cup',
    body: [
      'Every kilogram of HIMA BEANS coffee carries a fair-trade premium that goes directly to the farming families who grow it. We pay above the international market rate — not as charity, but as a recognition of the exceptional craft and terroir these farmers steward.',
      'Our direct-relationship model means no exploitative middlemen, no opaque pricing, and no negotiating farmers into poverty. We sit at the table together, negotiate transparently, and sign multi-year agreements that give communities the stability to invest in their own futures.',
      'For us, ethical sourcing isn\'t a certification — it\'s the foundation of every business decision we make.',
    ],
    bodyNP: [
      'HIMA BEANS कफीको हरेक किलोग्राममा उचित-व्यापार प्रिमियम समाविष्ट छ जुन सिधै खेतीपाती गर्ने परिवारहरूकहाँ जान्छ।',
      'Our direct-relationship model means no exploitative middlemen, no opaque pricing, and no negotiating farmers into poverty. We sit at the table together, negotiate transparently, and sign multi-year agreements that give communities the stability to invest in their own futures.',
      'For us, ethical sourcing isn\'t a certification — it\'s the foundation of every business decision we make.',
    ],
    dark: true,
    gradientFrom: '#1F4D4F',
    gradientTo: '#2B4A4C',
  },
  {
    tag: 'Commitment 02',
    title: 'Shade Grown',
    titleNP: 'छायाँमा उगाइएको',
    subtitle: 'Coffee in its natural home',
    body: [
      'All HIMA BEANS coffee is grown beneath the canopy of native Himalayan trees. This traditional shade-growing practice isn\'t an add-on to our sourcing — it is the source of our coffee\'s character.',
      'Shade-grown cultivation slows the ripening of coffee cherries, concentrating sugars and aromatic compounds that create the floral, complex cup we\'re known for. It also maintains critical biodiversity corridors for over 60 migratory bird species that pass through Nepal\'s highland forests each season.',
      'By refusing to clear-cut for sun-cultivation monocultures, our farming partners preserve the living ecosystem that makes Himalayan coffee possible — for this generation and the next.',
    ],
    bodyNP: [
      'HIMA BEANS को सबै कफी मूल हिमालयी रूखहरूको छायाँमुनि उगाइन्छ। यो परम्परागत छायाँ-खेती अभ्यास हाम्रो स्रोतमा थपिएको होइन — यो हाम्रो कफीको चरित्रको स्रोत हो।',
      'Shade-grown cultivation slows the ripening of coffee cherries, concentrating sugars and aromatic compounds that create the floral, complex cup we\'re known for. It also maintains critical biodiversity corridors for over 60 migratory bird species that pass through Nepal\'s highland forests each season.',
      'By refusing to clear-cut for sun-cultivation monocultures, our farming partners preserve the living ecosystem that makes Himalayan coffee possible — for this generation and the next.',
    ],
    dark: false,
    gradientFrom: '#6B7F7E',
    gradientTo: '#A89D8E',
  },
  {
    tag: 'Commitment 03',
    title: 'Traceable Supply Chain',
    titleNP: 'पत्ता लगाउन सकिने आपूर्ति श्रृंखला',
    subtitle: 'Know every farmer, every farm',
    body: [
      'When you buy a bag of HIMA BEANS, you\'re not buying a commodity blend. Every batch is traceable to a specific farmer, cooperative, and district in Nepal. We publish full origin data — GPS coordinates, farmer profiles, harvest dates, and processing method — for every lot we sell.',
      'Our farm-to-roaster traceability system was built in partnership with Nepali cooperative leaders to ensure data sovereignty: farmers control their own story, and we share it with your permission and theirs.',
      'This isn\'t just transparency for marketing. It\'s accountability — a record of every hand that touched your coffee, and a guarantee that each one was paid fairly.',
    ],
    bodyNP: [
      'जब तपाईं HIMA BEANS को झोला किन्नुहुन्छ, तपाईं कमोडिटी मिश्रण किन्दै हुनुहुन्न। प्रत्येक ब्याच नेपालको एक विशेष किसान, सहकारी र जिल्लामा पत्ता लगाउन सकिन्छ।',
      'Our farm-to-roaster traceability system was built in partnership with Nepali cooperative leaders to ensure data sovereignty: farmers control their own story, and we share it with your permission and theirs.',
      'This isn\'t just transparency for marketing. It\'s accountability — a record of every hand that touched your coffee, and a guarantee that each one was paid fairly.',
    ],
    dark: true,
    gradientFrom: '#1A2E2F',
    gradientTo: '#1F4D4F',
  },
  {
    tag: 'Commitment 04',
    title: 'Sustainable Shipping',
    titleNP: 'दिगो ढुवानी',
    subtitle: 'Minimal footprint, maximum care',
    body: [
      'We offset 100% of the carbon generated by shipping through our partnership with certified reforestation projects in the Terai lowlands — the same region where Nepal\'s coffee culture was born.',
      'Our packaging uses recycled kraft board, soy-based inks, and a resealable valve bag with the smallest possible plastic footprint. We\'re actively trialling fully home-compostable pouches for 2025 release.',
      'We ship in consolidated freight runs to reduce per-kilo emissions, and we\'re working with our logistics partner on a sea-freight-first model for wholesale customers — cutting air-freight emissions by up to 90% on each pallet.',
    ],
    bodyNP: [
      'हामी प्रमाणित पुनर्वनीकरण परियोजनाहरूसँगको साझेदारीमार्फत ढुवानीले उत्पन्न गर्ने १००% कार्बन अफसेट गर्छौं।',
      'Our packaging uses recycled kraft board, soy-based inks, and a resealable valve bag with the smallest possible plastic footprint. We\'re actively trialling fully home-compostable pouches for 2025 release.',
      'We ship in consolidated freight runs to reduce per-kilo emissions, and we\'re working with our logistics partner on a sea-freight-first model for wholesale customers — cutting air-freight emissions by up to 90% on each pallet.',
    ],
    dark: false,
    gradientFrom: '#D4A55A',
    gradientTo: '#6B7F7E',
  },
];

const FARMERS: FarmerProfile[] = [
  {
    name: 'Rama Gurung',
    location: 'Gulmi District, Gandaki Province',
    tenure: '15 years of specialty farming',
    quote:
      '"My grandfather planted these trees. I learned to read the cherries from my mother. Now my daughter is learning too. HIMA BEANS gives us the reason to keep going."',
    detail:
      'Rama grows on a 2.4-hectare farm at 2,100 metres. She leads a 22-member women\'s cooperative that has increased collective income by 38% since joining our direct-trade programme in 2021. Her lots are prized for exceptional jasmine florals.',
    initial: 'RG',
  },
  {
    name: 'Sita Thapa',
    location: 'Palpa District, Lumbini Province',
    tenure: '3rd generation coffee farmer',
    quote:
      '"My grandmother didn\'t know her coffee would one day be served in Australia. I think she would have laughed — and then she would have made you the best cup you\'ve ever had."',
    detail:
      'Sita manages the Thapa family farm that has been shade-growing coffee for over 70 years. As a third-generation farmer, she has pioneered wet-processing techniques in Palpa that produce the region\'s cleanest, most consistently high-scoring lots.',
    initial: 'ST',
  },
];

const IMPACT_STATS: ImpactStat[] = [
  {
    value: 150,
    suffix: '+',
    label: 'Farmers Supported',
    labelNP: 'समर्थित किसान परिवारहरू',
    description: 'Direct-trade relationships across Nepal',
  },
  {
    value: 2000,
    suffix: 'kg',
    label: 'Avg. Fair-Trade Premium',
    labelNP: 'भुक्तान गरिएको उचित-व्यापार प्रिमियम',
    description: 'Above market rate paid per season',
  },
  {
    value: 85,
    suffix: '%',
    label: 'Women-Led Cooperatives',
    labelNP: 'महिला-नेतृत्व सहकारीहरू',
    description: 'Of our partner farming groups',
  },
  {
    value: 0,
    suffix: '',
    label: 'Forced Labour',
    labelNP: 'शून्य बाध्य श्रम',
    description: 'Zero tolerance across our entire supply chain',
  },
];

const CERTIFICATIONS: Certification[] = [
  {
    name: 'Fair Trade Certified',
    body: 'Fair Trade International',
    icon: '⊕',
  },
  {
    name: 'Rainforest Alliance',
    body: 'Rainforest Alliance Inc.',
    icon: '◈',
  },
  {
    name: 'Organic',
    body: 'NASAA Certified Organic',
    icon: '◎',
  },
  {
    name: 'B Corporation',
    body: 'B Lab Australia',
    icon: '◆',
  },
];

/* ============================================================
   Animated Counter
   ============================================================ */
function AnimatedCounter({
  value,
  suffix,
  duration = 1.8,
}: {
  value: number;
  suffix: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (value === 0) {
      setDisplay(0);
      return;
    }
    const startTime = performance.now();
    const endValue = value;

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      // Ease out quart
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplay(Math.round(eased * endValue));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

/* ============================================================
   Sub-components
   ============================================================ */

function CommitmentBlock({
  section,
  index,
  lang,
}: {
  section: CommitmentSection;
  index: number;
  lang: 'EN' | 'NP';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const isEven = index % 2 === 0;

  const displayTitle = lang === 'NP' ? section.titleNP : section.title;
  const displayBody = lang === 'NP' ? section.bodyNP : section.body;

  return (
    <section
      style={{
        backgroundColor: section.dark ? '#1A2E2F' : '#F6F1E9',
      }}
    >
      <div
        ref={ref}
        className={`site-container py-14 md:py-20 lg:py-24 grid lg:grid-cols-2 gap-10 lg:gap-20 items-center ${
          !isEven ? 'lg:grid-flow-dense' : ''
        }`}
      >
        {/* Image placeholder */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -40 : 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] as [number,number,number,number] }}
          className={`rounded-3xl overflow-hidden aspect-[4/3] ${!isEven ? 'lg:col-start-2' : ''}`}
          style={{
            background: `linear-gradient(135deg, ${section.gradientFrom} 0%, ${section.gradientTo} 100%)`,
          }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <span
              className="font-serif text-7xl opacity-20 select-none"
              style={{ color: '#F6F1E9' }}
            >
              {index + 1 < 10 ? `0${index + 1}` : index + 1}
            </span>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? 40 : -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 1, 0.5, 1] as [number,number,number,number] }}
          className={!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}
        >
          <p
            className="font-sans text-xs font-semibold tracking-[0.2em] uppercase mb-3"
            style={{ color: section.dark ? 'rgba(217,223,220,0.45)' : '#D4A55A' }}
          >
            {section.tag}
          </p>
          <h2
            className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-3"
            style={{ color: section.dark ? '#F6F1E9' : '#1F4D4F' }}
          >
            {displayTitle}
          </h2>
          <p
            className="font-serif text-xl italic mb-8"
            style={{ color: section.dark ? 'rgba(217,223,220,0.55)' : '#D4A55A' }}
          >
            {section.subtitle}
          </p>
          <div className="space-y-4">
            {displayBody.map((para, i) => (
              <p
                key={i}
                className="font-sans text-base leading-relaxed"
                style={{ color: section.dark ? '#D9DFDC' : '#6B7F7E' }}
              >
                {para}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FarmerCard({ farmer, index }: { farmer: FarmerProfile; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 1, 0.5, 1] as [number,number,number,number] }}
      className="overflow-hidden border border-[rgba(26,46,47,0.1)]"
      style={{ backgroundColor: '#D9DFDC' }}
    >
      {/* Avatar banner */}
      <div
        className="h-28 flex items-end px-8 pb-0 relative"
        style={{
          background: 'linear-gradient(135deg, #1F4D4F 0%, #2B4A4C 100%)',
        }}
      >
        <div
          className="w-16 h-16 flex items-center justify-center translate-y-8 font-serif text-lg font-bold border-2 border-[#D9DFDC]"
          style={{ backgroundColor: '#D4A55A', color: '#F6F1E9' }}
        >
          {farmer.initial}
        </div>
      </div>

      <div className="px-8 pt-12 pb-8">
        <h3 className="font-serif text-2xl text-[#1F4D4F] font-semibold mb-1">{farmer.name}</h3>
        <p className="font-sans text-xs text-[#D4A55A] font-medium tracking-wider uppercase mb-0.5">{farmer.location}</p>
        <p className="font-sans text-xs text-[#6B7F7E] mb-6">{farmer.tenure}</p>

        <blockquote className="font-serif text-base italic text-[#1A2E2F] leading-relaxed mb-6 border-l-2 border-[rgba(26,46,47,0.2)] pl-4">
          {farmer.quote}
        </blockquote>

        <p className="font-sans text-sm text-[#6B7F7E] leading-relaxed">{farmer.detail}</p>
      </div>
    </motion.div>
  );
}

function ImpactCard({ stat, index, lang }: { stat: ImpactStat; index: number; lang: 'EN' | 'NP' }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 1, 0.5, 1] as [number,number,number,number] }}
      className="text-center px-4 sm:px-6 py-6 sm:py-8"
    >
      <div className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-2" style={{ color: '#D9DFDC' }}>
        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
      </div>
      <p className="font-serif text-xl text-[#F6F1E9] font-semibold mb-2">
        {lang === 'NP' ? stat.labelNP : stat.label}
      </p>
      <p className="font-sans text-sm" style={{ color: 'rgba(217,223,220,0.45)' }}>{stat.description}</p>
    </motion.div>
  );
}

function CertBadge({ cert, index }: { cert: Certification; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 1, 0.5, 1] as [number,number,number,number] }}
      className="flex flex-col items-center gap-3 p-8 border border-[rgba(26,46,47,0.1)]"
      style={{ backgroundColor: '#D9DFDC' }}
    >
      <div
        className="w-12 h-12 flex items-center justify-center text-xl"
        style={{ backgroundColor: 'rgba(26,46,47,0.06)', color: '#D4A55A' }}
      >
        {cert.icon}
      </div>
      <p className="font-serif text-lg text-[#1F4D4F] font-semibold text-center">{cert.name}</p>
      <p className="font-sans text-xs text-[#6B7F7E] text-center">{cert.body}</p>
    </motion.div>
  );
}

/* ============================================================
   Page
   ============================================================ */
export default function SustainabilityPage() {
  const { lang } = useLang();
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  const t = {
    heroEyebrow: lang === 'NP' ? 'हाम्रो प्रतिबद्धता' : 'Our Earth Promise',
    heroH1Line1: lang === 'NP' ? 'हाम्रो पृथ्वी' : 'Our Earth',
    heroH1Em: lang === 'NP' ? 'प्रतिज्ञा' : 'Promise',
    heroBody: lang === 'NP'
      ? 'हामी गर्ने हरेक निर्णय — हामी कसरी स्रोत गर्छौं देखि हामी कसरी पठाउँछौं — एकल प्रतिबद्धताद्वारा निर्देशित छ: पहाडहरूलाई हामीले भेट्टाएभन्दा राम्रो छोड्नु।'
      : "Every decision we make — from how we source to how we ship — is guided by a single commitment: to leave the mountains better than we found them.",
    farmersEyebrow: lang === 'NP' ? 'कपको पछाडिका मान्छेहरू' : 'The People Behind the Cup',
    farmersHeading: lang === 'NP' ? 'किसान कथाहरू' : 'Farmer Stories',
    farmersBody: lang === 'NP'
      ? 'HIMA BEANS को हरेक झोलाको पछाडि पुस्तौंको ज्ञान र जान्नु लायक कथा भएको खेती परिवार छ।'
      : 'Behind every bag of HIMA BEANS is a farming family with generations of knowledge and a story worth knowing.',
    impactEyebrow: lang === 'NP' ? 'मापिएको प्रभाव' : 'Measured Impact',
    impactHeading: lang === 'NP' ? 'संख्याहरूमा' : 'By the Numbers',
    certEyebrow: lang === 'NP' ? 'तेस्रो पक्षद्वारा प्रमाणित' : 'Verified by Third Parties',
    certHeading: lang === 'NP' ? 'हाम्रा प्रमाणपत्रहरू' : 'Our Certifications',
    certBody: lang === 'NP'
      ? 'हामी स्वतन्त्र प्रमाणीकरणमार्फत आफूलाई जवाफदेही राख्छौं। यी प्रमाणपत्रहरू हामीले पूरा गर्ने मापदण्डहरू प्रतिबिम्बित गर्छन्।'
      : 'We hold ourselves accountable through independent verification. These certifications reflect the standards we meet — and the higher standards we aim for.',
    ctaHeading: lang === 'NP' ? 'राम्रो गर्ने कफी पिउनुहोस्' : 'Drink Coffee That Does Good',
    ctaBody: lang === 'NP'
      ? 'प्रत्येक खरिदले सिधै नेपाली खेती परिवारहरू र पुनर्योजनात्मक आपूर्ति श्रृंखलालाई समर्थन गर्छ।'
      : 'Every purchase directly supports Nepali farming families and a regenerative supply chain. Shop our full bean range and taste the difference ethical sourcing makes.',
    ctaBtn1: lang === 'NP' ? 'हाम्रा बिनहरू किन्नुहोस्' : 'Shop Our Beans',
    ctaBtn2: lang === 'NP' ? 'थोक सोधपुछ' : 'Wholesale Inquiry',
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen" style={{ backgroundColor: '#F6F1E9' }}>
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative min-h-[70vh] md:min-h-[80vh] flex items-end pb-16 md:pb-24 overflow-hidden"
        style={{ backgroundColor: '#1A2E2F' }}
      >
        {/* Mountain gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 100%, #1F4D4F 0%, transparent 60%), radial-gradient(ellipse at 80% 30%, #6B7F7E 0%, transparent 50%), radial-gradient(ellipse at 20% 60%, #1F4D4F 0%, transparent 40%)',
          }}
        />

        {/* Silhouette mountain shape */}
        <div className="absolute bottom-0 inset-x-0 overflow-hidden">
          <svg
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            className="w-full h-64 opacity-20"
            fill="#6B7F7E"
          >
            <path d="M0,320 L0,200 L200,80 L400,180 L600,40 L720,120 L840,20 L1000,140 L1200,60 L1440,160 L1440,320 Z" />
          </svg>
        </div>

        <div className="relative z-10 site-container w-full">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-sans text-sm font-semibold tracking-[0.2em] uppercase mb-6"
            style={{ color: 'rgba(217,223,220,0.45)' }}
          >
            {t.heroEyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 1, 0.5, 1] as [number,number,number,number] }}
            className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-[#F6F1E9] font-bold leading-[0.95] mb-6 md:mb-8"
          >
            {t.heroH1Line1}
            <br />
            <em className="text-[#D9DFDC]">{t.heroH1Em}</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-sans text-[#D9DFDC] text-lg max-w-xl leading-relaxed"
          >
            {t.heroBody}
          </motion.p>
        </div>
      </section>

      {/* ── Commitment Sections ── */}
      {COMMITMENTS.map((section, index) => (
        <CommitmentBlock key={section.tag} section={section} index={index} lang={lang} />
      ))}

      {/* ── Farmer Stories ── */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#F6F1E9' }}>
        <div className="site-container">
          <div className="text-center mb-10 md:mb-14">
            <p className="font-sans text-[#D4A55A] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
              {t.farmersEyebrow}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#1F4D4F] font-bold leading-tight mb-4">
              {t.farmersHeading}
            </h2>
            <p className="font-sans text-[#6B7F7E] text-base max-w-lg mx-auto leading-relaxed">
              {t.farmersBody}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {FARMERS.map((farmer, i) => (
              <FarmerCard key={farmer.name} farmer={farmer} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Impact Numbers ── */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#1F4D4F' }}>
        <div className="site-container">
          <div className="text-center mb-10 md:mb-14">
            <p className="font-sans text-sm font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: 'rgba(217,223,220,0.45)' }}>
              {t.impactEyebrow}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#F6F1E9] font-bold leading-tight">
              {t.impactHeading}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 divide-x divide-y divide-[rgba(217,223,220,0.08)] border border-[rgba(217,223,220,0.08)] overflow-hidden">
            {IMPACT_STATS.map((stat, i) => (
              <ImpactCard key={stat.label} stat={stat} index={i} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Certifications ── */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#F6F1E9' }}>
        <div className="site-container">
          <div className="text-center mb-10 md:mb-14">
            <p className="font-sans text-[#D4A55A] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
              {t.certEyebrow}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#1F4D4F] font-bold leading-tight mb-4">
              {t.certHeading}
            </h2>
            <p className="font-sans text-[#6B7F7E] text-base max-w-lg mx-auto leading-relaxed">
              {t.certBody}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CERTIFICATIONS.map((cert, i) => (
              <CertBadge key={cert.name} cert={cert} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-16 md:py-24 text-center"
        style={{ backgroundColor: '#1F4D4F' }}
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#F6F1E9] font-bold leading-tight mb-6">
            {t.ctaHeading}
          </h2>
          <p className="font-sans text-[#D9DFDC] text-base leading-relaxed mb-10 opacity-90">
            {t.ctaBody}
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center">
            <Link
              href="/beans"
              className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 md:px-10 py-4 font-sans font-semibold text-[11px] tracking-[0.18em] uppercase transition-all duration-300 hover:opacity-80"
              style={{ backgroundColor: '#D9DFDC', color: '#1F4D4F' }}
            >
              {t.ctaBtn1}
              <span>→</span>
            </Link>
            <Link
              href="/wholesale"
              className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 md:px-10 py-4 font-sans font-semibold text-[11px] tracking-[0.18em] uppercase border transition-all duration-300 hover:border-[#D9DFDC]"
              style={{ borderColor: 'rgba(217,223,220,0.25)', color: 'rgba(217,223,220,0.7)' }}
            >
              {t.ctaBtn2}
            </Link>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}
