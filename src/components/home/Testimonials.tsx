'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
  initials: string;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    quote:
      'The floral notes and smooth body are unlike anything from Ethiopian or Colombian origins. Hima Beans is our new house blend.',
    author: 'Alex R.',
    role: 'Head Barista',
    location: 'Melbourne',
    initials: 'AR',
  },
  {
    id: 't2',
    quote:
      "Exceptional sourcing story, impeccable quality. Our customers can't stop asking where the beans are from.",
    author: 'Sarah T.',
    role: 'Café Owner',
    location: 'Sydney',
    initials: 'ST',
  },
  {
    id: 't3',
    quote:
      "I've been importing specialty coffee for 15 years. Nepal's altitude creates something truly special.",
    author: 'James K.',
    role: 'Coffee Importer',
    location: 'Brisbane',
    initials: 'JK',
  },
  {
    id: 't4',
    quote:
      'The perfect balance of complexity and smoothness. This is what specialty coffee should taste like.',
    author: 'Emma L.',
    role: 'Coffee Enthusiast',
    location: 'Adelaide',
    initials: 'EL',
  },
];

// ---------------------------------------------------------------------------
// Gold quote mark SVG
// ---------------------------------------------------------------------------

function QuoteMark() {
  return (
    <svg
      width="40"
      height="32"
      viewBox="0 0 40 32"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 32V19.2C0 10.4 5.6 4.16 16.8 0L19.2 3.68C13.52 5.76 10.16 9.68 9.6 14.4H16V32H0ZM24 32V19.2C24 10.4 29.6 4.16 40.8 0L43.2 3.68C37.52 5.76 34.16 9.68 33.6 14.4H40V32H24Z"
        fill="#B08D57"
        fillOpacity="0.25"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Avatar initials circle
// ---------------------------------------------------------------------------

function Avatar({ initials }: { initials: string }) {
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-xs font-semibold tracking-wider"
      style={{ background: '#3B2A21', color: '#B08D57' }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Star row
// ---------------------------------------------------------------------------

function Stars() {
  return (
    <div className="flex gap-0.5 mb-5" aria-label="5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="#B08D57"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7 1l1.5 3.5 3.5.5-2.5 2.5.5 3.5L7 9.5 4 11l.5-3.5L2 5l3.5-.5L7 1z" />
        </svg>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Single testimonial card
// ---------------------------------------------------------------------------

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.7,
        delay: index * 0.11,
        ease: [0.22, 1, 0.36, 1] as [number,number,number,number],
      }}
      className="group relative flex flex-col p-8 transition-shadow duration-300"
      style={{
        background: '#F5EFE6',
        border: '1px solid #E6D8C9',
        minWidth: '300px',
      }}
      aria-label={`Testimonial from ${testimonial.author}`}
    >
      {/* Hover gold top border */}
      <span
        className="absolute top-0 left-0 right-0 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
        style={{ background: '#B08D57' }}
        aria-hidden="true"
      />

      {/* Quote mark */}
      <div className="mb-4">
        <QuoteMark />
      </div>

      {/* Stars */}
      <Stars />

      {/* Quote text */}
      <blockquote className="flex-1 mb-8">
        <p
          className="text-base leading-[1.75] italic"
          style={{ color: '#3B2A21' }}
        >
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </blockquote>

      {/* Divider */}
      <span
        className="block h-px mb-6"
        style={{ background: '#E6D8C9' }}
        aria-hidden="true"
      />

      {/* Attribution */}
      <div className="flex items-center gap-3">
        <Avatar initials={testimonial.initials} />
        <div>
          <p
            className="text-sm font-semibold leading-snug"
            style={{ color: '#3B2A21' }}
          >
            {testimonial.author}
          </p>
          <p className="text-xs leading-snug" style={{ color: '#8C8477' }}>
            {testimonial.role}
            <span aria-hidden="true"> · </span>
            {testimonial.location}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: '#E6D8C9' }}
      aria-labelledby="testimonials-heading"
    >
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          backgroundSize: '200px 200px',
        }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-28 lg:py-36">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
              className="text-xs tracking-[0.3em] uppercase mb-4"
              style={{ color: '#B08D57' }}
            >
              What People Are Saying
            </motion.p>

            <motion.h2
              id="testimonials-heading"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
              className="text-5xl md:text-6xl font-serif leading-[1.05]"
              style={{
                color: '#3B2A21',
                fontFamily: '"Playfair Display", Georgia, serif',
              }}
            >
              Voices from
              <br />
              <em className="not-italic" style={{ color: '#8C8477' }}>
                the Trade.
              </em>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
            className="max-w-sm text-sm leading-relaxed md:text-right"
            style={{ color: '#8C8477' }}
          >
            Trusted by baristas, café owners, and coffee lovers across Australia
            who believe Nepal deserves a place in every serious cup.
          </motion.p>
        </div>

        {/* Testimonial grid — scrollable on mobile, 4-col on large */}
        <div
          ref={scrollRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} index={i} />
          ))}
        </div>

        {/* Aggregate social proof strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          className="mt-14 flex flex-wrap items-center gap-8"
        >
          {/* Rating */}
          <div className="flex items-baseline gap-2">
            <span
              className="text-4xl font-serif"
              style={{
                color: '#3B2A21',
                fontFamily: '"Playfair Display", Georgia, serif',
              }}
            >
              4.9
            </span>
            <div>
              <div className="flex gap-0.5" aria-label="4.9 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    width="12"
                    height="12"
                    viewBox="0 0 14 14"
                    fill="#B08D57"
                    aria-hidden="true"
                  >
                    <path d="M7 1l1.5 3.5 3.5.5-2.5 2.5.5 3.5L7 9.5 4 11l.5-3.5L2 5l3.5-.5L7 1z" />
                  </svg>
                ))}
              </div>
              <p className="text-xs mt-0.5" style={{ color: '#8C8477' }}>
                Average rating
              </p>
            </div>
          </div>

          <span
            className="hidden sm:block w-px h-10"
            style={{ background: '#E6D8C9' }}
            aria-hidden="true"
          />

          <div>
            <p
              className="text-2xl font-serif"
              style={{
                color: '#3B2A21',
                fontFamily: '"Playfair Display", Georgia, serif',
              }}
            >
              50+
            </p>
            <p className="text-xs" style={{ color: '#8C8477' }}>
              Australian café partners
            </p>
          </div>

          <span
            className="hidden sm:block w-px h-10"
            style={{ background: '#E6D8C9' }}
            aria-hidden="true"
          />

          <div>
            <p
              className="text-2xl font-serif"
              style={{
                color: '#3B2A21',
                fontFamily: '"Playfair Display", Georgia, serif',
              }}
            >
              98%
            </p>
            <p className="text-xs" style={{ color: '#8C8477' }}>
              Would recommend
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
