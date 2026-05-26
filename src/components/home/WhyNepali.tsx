'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/lang';

// ---------------------------------------------------------------------------
// SVG Icons
// ---------------------------------------------------------------------------

function MountainIcon() {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Back peak */}
      <path
        d="M6 38L18 14l7 10 5-8L40 38H6Z"
        stroke="#D4A55A"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Snow cap */}
      <path
        d="M18 14l2.5 4L22 16l1.5 2.5L25 14"
        stroke="#D4A55A"
        strokeWidth="1.2"
        strokeLinejoin="round"
        fill="rgba(212,165,90,0.18)"
      />
      {/* Altitude marker */}
      <line x1="18" y1="14" x2="18" y2="9" stroke="#D4A55A" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="14.5" y1="9" x2="21.5" y2="9" stroke="#D4A55A" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function HandIcon() {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Palm + fingers */}
      <path
        d="M16 34V20a2.5 2.5 0 0 1 5 0v7"
        stroke="#D4A55A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 27V18a2.5 2.5 0 0 1 5 0v9"
        stroke="#D4A55A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26 27V19a2.5 2.5 0 0 1 5 0v8"
        stroke="#D4A55A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M31 27v-6a2.5 2.5 0 0 1 5 0v10a10 10 0 0 1-10 10h-2a10 10 0 0 1-10-10v-5"
        stroke="#D4A55A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Cherry on palm */}
      <circle cx="18.5" cy="26" r="2" fill="#D4A55A" opacity="0.45" />
    </svg>
  );
}

function BeanIcon() {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Bean body */}
      <ellipse
        cx="22"
        cy="22"
        rx="10"
        ry="15"
        transform="rotate(-18 22 22)"
        stroke="#D4A55A"
        strokeWidth="1.5"
        fill="rgba(212,165,90,0.06)"
      />
      {/* Crease */}
      <path
        d="M15 13c4 4 5 12 3 18"
        stroke="#D4A55A"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Origin dots */}
      <circle cx="29" cy="14" r="2" fill="#D4A55A" opacity="0.5" />
      <circle cx="33" cy="20" r="1.5" fill="#D4A55A" opacity="0.3" />
      <circle cx="31" cy="27" r="1" fill="#D4A55A" opacity="0.25" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Types & Data
// ---------------------------------------------------------------------------

interface Feature {
  icon: React.ReactNode;
  heading: string;
  subheading: string;
  description: string;
}


// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const headingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  },
};

// ---------------------------------------------------------------------------
// Feature Card
// ---------------------------------------------------------------------------

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

function FeatureCard({ feature, index }: FeatureCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      custom={index}
      className="group relative flex flex-col gap-5 sm:gap-6 p-7 sm:p-10 lg:p-12"
      style={{ backgroundColor: '#1A2E2F' }}
    >
      {/* Hover left-border accent */}
      <div
        className="absolute left-0 top-6 bottom-6 w-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ backgroundColor: '#D4A55A' }}
        aria-hidden="true"
      />

      {/* Icon container */}
      <div
        className="w-14 h-14 flex items-center justify-center rounded-sm"
        style={{ backgroundColor: 'rgba(212,165,90,0.08)' }}
      >
        {feature.icon}
      </div>

      {/* Text block */}
      <div className="flex flex-col gap-2 sm:gap-3">
        <p
          className="text-[10px] tracking-[0.3em] uppercase"
          style={{ color: '#D4A55A' }}
        >
          {feature.subheading}
        </p>
        <h3
          className="text-xl sm:text-2xl md:text-[1.65rem] leading-snug"
          style={{
            color: '#F6F1E9',
            fontFamily: '"Playfair Display", Georgia, serif',
            fontWeight: 700,
          }}
        >
          {feature.heading}
        </h3>
        <p className="text-sm leading-[1.8] font-light" style={{ color: '#6B7F7E' }}>
          {feature.description}
        </p>
      </div>

      {/* Bottom gold line, grows on hover */}
      <div
        className="h-px w-0 group-hover:w-14 transition-all duration-500"
        style={{ backgroundColor: '#D4A55A' }}
        aria-hidden="true"
      />
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------

export default function WhyNepali() {
  const { lang } = useLang();

  const FEATURES: Feature[] = [
    {
      icon: <MountainIcon />,
      heading: lang === 'EN' ? 'High Altitude' : 'उच्च उचाइ',
      subheading: lang === 'EN' ? '2000m+' : '२०००मि+',
      description: lang === 'EN'
        ? "Nepal's coffee grows at extraordinary elevations where cool nights and warm days force beans to develop slowly, concentrating natural sugars and building complex, layered flavors that lowland varieties simply cannot replicate."
        : "नेपालको कफी असाधारण उचाइमा बढ्छ जहाँ चिसो रातहरू र तातो दिनहरूले बिनहरूलाई बिस्तारै परिपक्व हुन बाध्य पार्छन्, प्राकृतिक चिनीहरू सङ्कलित गर्दै जटिल स्वादहरू विकास गर्दछन् जो तल्लो उचाइका किस्महरूले पुनःनिर्माण गर्न सक्दैनन्।",
    },
    {
      icon: <HandIcon />,
      heading: lang === 'EN' ? 'Hand Picked' : 'हातले टिपिएको',
      subheading: lang === 'EN' ? 'Artisan Harvest' : 'कारीगर कटाइ',
      description: lang === 'EN'
        ? 'Small family farms across Gulmi, Palpa, and Syangja harvest each cherry by hand, selecting only ripe fruit at peak sweetness. This meticulous, generational care translates directly into every cup.'
        : 'गुल्मी, पाल्पा र स्याङ्जाका साना पारिवारिक खेतहरूले हरेक चेरी हातले टिप्छन्, केवल पूर्ण पाकेको फल मात्र छान्छन्। यो सूक्ष्म, पुस्तान्तरित सेवा प्रत्येक कपमा सीधा प्रतिबिम्बित हुन्छ।',
    },
    {
      icon: <BeanIcon />,
      heading: lang === 'EN' ? 'Rare Origin' : 'दुर्लभ उत्पत्ति',
      subheading: lang === 'EN' ? "Nepal's Best-Kept Secret" : 'नेपालको सर्वोत्तम रहस्य',
      description: lang === 'EN'
        ? "Nepal's specialty coffee scene is one of the world's most exciting emerging origins. Fewer than 0.1% of global coffee drinkers have tasted it — until now. Each cup is a genuine, traceable discovery."
        : "नेपालको विशेष कफी दृश्य संसारका सबैभन्दा रोमाञ्चक उभरँदो उत्पत्तिहरूमध्ये एक हो। विश्वका ०.१% भन्दा कम कफी पिउनेहरूले यो चाखेका छन् — अहिलेसम्म। हरेक कप एक वास्तविक, पत्ता लगाउन सकिने खोज हो।",
    },
  ];

  const STATS_DATA = lang === 'EN'
    ? [
        { value: '2100m', label: 'Max Elevation' },
        { value: '3', label: 'Sourced Regions' },
        { value: '100%', label: 'Hand Picked' },
        { value: '<0.1%', label: 'Global Supply' },
      ]
    : [
        { value: '२१००मि', label: 'अधिकतम उचाइ' },
        { value: '३', label: 'स्रोत क्षेत्रहरू' },
        { value: '१००%', label: 'हातले टिपिएको' },
        { value: '<०.१%', label: 'विश्व आपूर्ति' },
      ];

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: '#1A2E2F' }}
      aria-labelledby="why-nepali-heading"
    >
      {/* Top divider */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, #D4A55A 40%, #D4A55A 60%, transparent)' }}
        aria-hidden="true"
      />

      {/* Watermark numeral */}
      <span
        className="pointer-events-none select-none absolute right-0 top-0 leading-none tracking-tighter"
        style={{
          color: '#F6F1E9',
          opacity: 0.025,
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: 'clamp(80px, 18vw, 260px)',
          lineHeight: 0.9,
        }}
        aria-hidden="true"
      >
        01
      </span>

      <div
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10"
        style={{ paddingTop: 'clamp(3.5rem, 8vw, 9rem)', paddingBottom: 'clamp(3.5rem, 8vw, 9rem)' }}
      >

        {/* ── Intro block ── */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-3xl mb-12 sm:mb-16 md:mb-20 lg:mb-28"
        >
          {/* Eyebrow */}
          <motion.p
            variants={headingVariants}
            className="text-[10px] tracking-[0.4em] uppercase mb-5 sm:mb-6"
            style={{ color: '#D4A55A' }}
          >
            {lang === 'EN' ? 'Origin · Craft · Excellence' : 'उत्पत्ति · कारीगरी · उत्कृष्टता'}
          </motion.p>

          {/* Main heading */}
          <motion.h2
            id="why-nepali-heading"
            variants={headingVariants}
            className="mb-6 sm:mb-8 leading-[1.1]"
            style={{
              color: '#F6F1E9',
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: 700,
              fontSize: 'clamp(2rem, 6vw, 4.5rem)',
            }}
          >
            {lang === 'EN' ? 'Why Nepali' : 'नेपाली कफी'}
            <br />
            <em style={{ fontStyle: 'italic', color: '#D4A55A' }}>{lang === 'EN' ? 'Coffee?' : 'किन?'}</em>
          </motion.h2>

          {/* Gold rule */}
          <motion.div
            variants={headingVariants}
            className="h-px w-20 mb-6 sm:mb-8"
            style={{ backgroundColor: '#D4A55A' }}
            aria-hidden="true"
          />

          {/* Intro paragraph */}
          <motion.p
            variants={headingVariants}
            className="text-base sm:text-lg md:text-xl leading-[1.8] font-light"
            style={{ color: '#6B7F7E' }}
          >
            {lang === 'EN' ? "The Himalayas have shaped some of the world's most dramatic landscapes — and some of its most extraordinary coffee. Grown between 1,400 m and 2,100 m, Nepali beans develop a density and flavor complexity that lower-altitude origins simply cannot match. Combined with generations of farming wisdom passed through small family cooperatives, what arrives in your cup is something genuinely rare." : "हिमालयले संसारका सबैभन्दा नाटकीय भू-दृश्यहरू मात्र होइन — उत्कृष्ट कफी पनि निर्माण गरेको छ। १,४०० मि. देखि २,१०० मि. बीच उब्जेका नेपाली बिनहरूमा यस्तो घनत्व र स्वाद-जटिलता हुन्छ जो तल्लो उचाइका उत्पत्तिहरूले मेल खाउन सक्दैनन्। सानो पारिवारिक सहकारीहरूद्वारा पुस्तौंदेखि हस्तान्तरित खेती ज्ञानसँग जोड्दा, तपाईंको कपमा आउने चिज साँच्चिकै दुर्लभ छ।"}
          </motion.p>
        </motion.div>

        {/* ── Feature columns — 1 col mobile, 3 col md ── */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px"
          style={{ backgroundColor: 'rgba(212,165,90,0.13)' }}
        >
          {FEATURES.map((feature, i) => (
            <FeatureCard key={i} feature={feature} index={i} />
          ))}
        </motion.div>

        {/* ── Stats row — 2 col mobile, 4 col md ── */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mt-10 sm:mt-14 lg:mt-20 grid grid-cols-2 md:grid-cols-4 gap-px"
          style={{ backgroundColor: 'rgba(212,165,90,0.08)' }}
        >
          {STATS_DATA.map(({ value, label }, i) => (
            <motion.div
              key={i}
              variants={headingVariants}
              className="flex flex-col gap-1.5 sm:gap-2 p-5 sm:p-8 md:p-10"
              style={{ backgroundColor: '#1A2E2F' }}
            >
              <span
                className="leading-none"
                style={{
                  color: '#D4A55A',
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: 'clamp(1.4rem, 4vw, 2.6rem)',
                  fontWeight: 700,
                }}
              >
                {value}
              </span>
              <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: '#6B7F7E' }}>
                {label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom divider */}
      <div
        className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, #D4A55A 40%, #D4A55A 60%, transparent)' }}
        aria-hidden="true"
      />
    </section>
  );
}
