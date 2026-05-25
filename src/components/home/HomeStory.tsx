'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const fade = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
});

const STATS = [
  { value: '150+', label: 'Farming families' },
  { value: '2,000m', label: 'Average altitude' },
  { value: '0', label: 'Intermediaries' },
] as const;

export default function HomeStory() {
  return (
    <section style={{ backgroundColor: '#0A0704' }} className="section-gap">
      <div className="site-container">

        {/* Eyebrow */}
        <motion.p
          variants={fade(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="text-[10px] tracking-[0.4em] uppercase text-center mb-8"
          style={{ color: 'rgba(237,224,204,0.45)', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}
        >
          Nepal · 2,000m above sea level
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
            className="text-[#F5EDE0] italic leading-[1.4]"
            style={{
              fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
              fontSize: 'clamp(1.4rem, 3.5vw, 2.25rem)',
            }}
          >
            "The best coffee in the world grows where the air is thinnest,
            the nights are coldest, and the farmers know every tree by name."
          </p>
        </motion.blockquote>

        {/* Divider */}
        <motion.div
          variants={fade(0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          style={{ width: '40px', height: '1px', backgroundColor: '#7C4828', margin: '2.5rem auto' }}
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
            color: 'rgba(237,224,204,0.5)',
            fontSize: '0.95rem',
            fontFamily: 'var(--font-inter, Inter, sans-serif)',
          }}
        >
          Our farming families in Gulmi, Palpa and Syangja have grown coffee above 1,800 metres
          for generations. We buy directly from them — no brokers, no compromises — and bring
          their work to your cup.
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
                className="text-[#EDE0CC] font-bold"
                style={{
                  fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                  fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                  lineHeight: 1,
                }}
              >
                {s.value}
              </p>
              <p
                className="text-[#7A6555] text-[11px] tracking-[0.2em] uppercase mt-2"
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
            className="inline-flex items-center gap-3 text-[#F5EDE0] text-[11px] tracking-[0.25em] uppercase hover:text-[#7C4828] transition-colors duration-300 group"
            style={{ fontFamily: 'var(--font-inter, Inter, sans-serif)' }}
          >
            Our Story
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
