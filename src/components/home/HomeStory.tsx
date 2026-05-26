'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLang } from '@/context/lang';

const fade = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
});

export default function HomeStory() {
  const { lang } = useLang();

  const STATS = lang === 'EN'
    ? [
        { value: '150+',   label: 'Farming families' },
        { value: '2,000m', label: 'Average altitude' },
        { value: '0',      label: 'Intermediaries' },
      ]
    : [
        { value: '१५०+',    label: 'किसान परिवारहरू' },
        { value: '२,०००मि', label: 'औसत उचाइ' },
        { value: '०',       label: 'बिचौलिया' },
      ];

  return (
    <section style={{ backgroundColor: '#355E3B' }} className="section-gap">
      <div className="site-container">

        {/* Eyebrow */}
        <motion.p
          variants={fade(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="text-[10px] tracking-[0.4em] uppercase text-center mb-8"
          style={{ color: 'rgba(217,223,220,0.45)', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}
        >
          {lang === 'EN' ? 'Nepal · 2,000m above sea level' : 'नेपाल · समुद्र सतहभन्दा २,०००मी माथि'}
        </motion.p>

        {/* Quote */}
        <motion.blockquote
          variants={fade(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="text-center mx-auto"
          style={{ maxWidth: '720px' }}
        >
          <p
            className="text-[#F6F1E9] italic leading-[1.4]"
            style={{
              fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
              fontSize: 'clamp(1.4rem, 3.5vw, 2.25rem)',
            }}
          >
            {lang === 'EN'
              ? '"The best coffee in the world grows where the air is thinnest, the nights are coldest, and the farmers know every tree by name."'
              : '"संसारको उत्तम कफी त्यहाँ उब्जन्छ जहाँ हावा सबैभन्दा पातलो छ, रातहरू सबैभन्दा चिसो छन्, र किसानहरूले हरेक रूखलाई नामले चिन्छन्।"'}
          </p>
        </motion.blockquote>

        {/* Divider */}
        <motion.div
          variants={fade(0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          style={{ width: '40px', height: '1px', backgroundColor: '#D4A55A', margin: '2.5rem auto' }}
        />

        {/* Body */}
        <motion.p
          variants={fade(0.25)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="text-center mx-auto leading-relaxed"
          style={{
            maxWidth: '560px',
            color: 'rgba(217,223,220,0.5)',
            fontSize: '0.95rem',
            fontFamily: 'var(--font-inter, Inter, sans-serif)',
          }}
        >
          {lang === 'EN'
            ? 'Our farming families in Gulmi, Palpa and Syangja have grown coffee above 1,800 metres for generations. We buy directly from them — no brokers, no compromises — and bring their work to your cup.'
            : 'हाम्रा गुल्मी, पाल्पा र स्याङ्जाका किसान परिवारहरूले पुस्तौंदेखि १,८०० मिटरभन्दा माथि कफी उमार्दै आएका छन्। हामी सीधै उनीहरूसँग किन्छौं — कुनै बिचौलिया छैन — र उनीहरूको मेहनत तपाईंको कपमा ल्याउँछौं।'}
        </motion.p>

        {/* Stats */}
        <motion.div
          variants={fade(0.35)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="flex flex-wrap items-start justify-center gap-10 md:gap-16 mt-14"
        >
          {STATS.map((s) => (
            <div key={s.value} className="text-center">
              <p
                className="text-[#D9DFDC] font-bold"
                style={{
                  fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                  fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                  lineHeight: 1,
                }}
              >
                {s.value}
              </p>
              <p
                className="text-[#6B7F7E] text-[11px] tracking-[0.2em] uppercase mt-2"
                style={{ fontFamily: 'var(--font-inter, Inter, sans-serif)' }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fade(0.45)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="text-center mt-14"
        >
          <Link
            href="/about"
            className="inline-flex items-center gap-3 text-[#F6F1E9] text-[11px] tracking-[0.25em] uppercase hover:text-[#D4A55A] transition-colors duration-300 group"
            style={{ fontFamily: 'var(--font-inter, Inter, sans-serif)' }}
          >
            {lang === 'EN' ? 'Our Story' : 'हाम्रो कथा'}
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
