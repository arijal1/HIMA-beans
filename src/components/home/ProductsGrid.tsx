'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const PRODUCTS = [
  {
    slug: 'himalayan-reserve',
    name: 'Himalayan Reserve',
    region: 'Gulmi District',
    altitude: '1,800m',
    roast: 'Light Roast',
    flavor: 'Jasmine · Dark Chocolate · Citrus',
    gradient: 'linear-gradient(160deg, #1F4D4F 0%, #2B4A4C 60%, #7A5035 100%)',
  },
  {
    slug: 'valley-mist',
    name: 'Valley Mist',
    region: 'Palpa District',
    altitude: '2,100m',
    roast: 'Medium Roast',
    flavor: 'Stone Fruit · Brown Sugar · Floral',
    gradient: 'linear-gradient(160deg, #2D3B35 0%, #1F4D4F 55%, #2B4A4C 100%)',
  },
  {
    slug: 'summit-dark',
    name: 'Summit Dark',
    region: 'Syangja District',
    altitude: '1,950m',
    roast: 'Dark Roast',
    flavor: 'Cocoa · Walnut · Molasses',
    gradient: 'linear-gradient(160deg, #162E30 0%, #1E4042 55%, #1F4D4F 100%)',
  },
] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function ProductsGrid() {
  return (
    <section style={{ backgroundColor: '#F6F1E9' }} className="section-gap">
      <div className="site-container">

        {/* Header */}
        <div className="mb-12 md:mb-16">
          <p
            className="text-[#D4A55A] text-[10px] tracking-[0.4em] uppercase mb-3"
            style={{ fontFamily: 'var(--font-inter, Inter, sans-serif)' }}
          >
            Our Coffee
          </p>
          <h2
            className="text-[#1F4D4F] text-3xl md:text-4xl lg:text-5xl font-bold"
            style={{ fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)' }}
          >
            Three Origins.
            <br />
            <em className="font-normal" style={{ color: '#D4A55A' }}>One Altitude.</em>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {PRODUCTS.map((p, i) => (
            <motion.div
              key={p.slug}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              <Link href="/beans" className="group block">
                {/* Image area */}
                <div
                  className="relative overflow-hidden mb-5"
                  style={{ height: 'clamp(200px, 28vw, 280px)', background: p.gradient }}
                >
                  {/* Altitude badge */}
                  <span
                    className="absolute top-3 right-3 text-[10px] tracking-[0.2em] uppercase"
                    style={{
                      color: 'rgba(217,223,220,0.7)',
                      backgroundColor: 'rgba(53,94,59,0.7)',
                      padding: '4px 8px',
                      fontFamily: 'var(--font-inter, Inter, sans-serif)',
                    }}
                  >
                    {p.altitude}
                  </span>

                  {/* Bean name overlay at bottom */}
                  <div
                    className="absolute inset-x-0 bottom-0 p-5"
                    style={{ background: 'linear-gradient(to top, rgba(53,94,59,0.75) 0%, transparent 100%)' }}
                  >
                    <p
                      className="text-[#F6F1E9] text-[9px] tracking-[0.3em] uppercase"
                      style={{ fontFamily: 'var(--font-inter, Inter, sans-serif)' }}
                    >
                      {p.roast}
                    </p>
                  </div>

                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(212,165,90,0.12)' }}
                  >
                    <span
                      className="text-[#F6F1E9] text-[10px] tracking-[0.25em] uppercase border border-[#F6F1E9]/40 px-4 py-2"
                      style={{ fontFamily: 'var(--font-inter, Inter, sans-serif)' }}
                    >
                      View Bean
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div>
                  <h3
                    className="text-[#1F4D4F] text-lg font-semibold mb-1 group-hover:text-[#D4A55A] transition-colors duration-300"
                    style={{ fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)' }}
                  >
                    {p.name}
                  </h3>
                  <p
                    className="text-[#D4A55A] text-[10px] tracking-[0.25em] uppercase mb-2"
                    style={{ fontFamily: 'var(--font-inter, Inter, sans-serif)' }}
                  >
                    {p.region}
                  </p>
                  <p
                    className="text-[#6B7F7E] text-sm leading-relaxed"
                    style={{ fontFamily: 'var(--font-inter, Inter, sans-serif)' }}
                  >
                    {p.flavor}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer link */}
        <div className="mt-12 md:mt-16 text-center">
          <Link
            href="/beans"
            className="text-[#D4A55A] text-sm tracking-[0.15em] uppercase hover:text-[#1F4D4F] transition-colors duration-300 inline-flex items-center gap-3 group"
            style={{ fontFamily: 'var(--font-inter, Inter, sans-serif)' }}
          >
            View All Beans
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
