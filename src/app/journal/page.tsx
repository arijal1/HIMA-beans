'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Metadata } from 'next';
import Link from 'next/link';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Category = 'All' | 'Origin' | 'Culture' | 'Brewing' | 'Sustainability' | 'Education';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: Exclude<Category, 'All'>;
  readTime: string;
  date: string;
  slug: string;
  accentColor?: string;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const CATEGORIES: Category[] = ['All', 'Origin', 'Culture', 'Brewing', 'Sustainability', 'Education'];

const ARTICLES: Article[] = [
  {
    id: 1,
    title: 'A Morning in Gulmi: Meeting the Farmers Behind Your Cup',
    excerpt:
      'Before sunrise, smoke rises from small stone kitchens across Gulmi\'s terraced hillsides. We spent three days with the families who grow your coffee — and discovered a culture as rich as the beans themselves.',
    category: 'Origin',
    readTime: '8 min',
    date: 'May 10, 2025',
    slug: 'morning-in-gulmi',
  },
  {
    id: 2,
    title: 'Brewing Guide: Pour Over Technique for Himalayan Beans',
    excerpt:
      'Himalayan beans respond differently to water temperature and pour rate than lowland varieties. Their elevated density requires a gentler approach — here is the exact method we use at origin.',
    category: 'Brewing',
    readTime: '6 min',
    date: 'Apr 28, 2025',
    slug: 'pour-over-himalayan',
  },
  {
    id: 3,
    title: 'Why Nepal\'s Coffee Rivals Ethiopia and Colombia',
    excerpt:
      'Ethiopia and Colombia have dominated specialty coffee conversation for decades. A growing chorus of roasters and cuppers believe Nepal is about to change that narrative entirely.',
    category: 'Origin',
    readTime: '5 min',
    date: 'Apr 14, 2025',
    slug: 'nepal-rivals-ethiopia-colombia',
  },
  {
    id: 4,
    title: 'The Science of High Altitude Coffee: Density, Flavor, Complexity',
    excerpt:
      'Why does altitude matter? The science behind Himalayan coffee\'s exceptional cup profile comes down to bean density, slower cellular development, and the chemistry of natural processing at elevation.',
    category: 'Education',
    readTime: '7 min',
    date: 'Mar 31, 2025',
    slug: 'science-high-altitude',
  },
  {
    id: 5,
    title: 'Shade-Grown Coffee: How Trees Shape Your Cup',
    excerpt:
      'In Nepal\'s highlands, coffee grows beneath a canopy of alders and chestnuts. The shade is not incidental — it is the defining feature of the terroir, slowing ripening and deepening complexity.',
    category: 'Sustainability',
    readTime: '4 min',
    date: 'Mar 17, 2025',
    slug: 'shade-grown-trees',
  },
  {
    id: 6,
    title: 'Traditional Nepali Coffee Culture: From Village to World Stage',
    excerpt:
      'Nepal has a centuries-old tradition of cultivating and consuming coffee in the mid-hills. Only now is the world beginning to understand the depth of what these communities have always known.',
    category: 'Culture',
    readTime: '9 min',
    date: 'Mar 3, 2025',
    slug: 'nepali-coffee-culture',
  },
  {
    id: 7,
    title: 'The Perfect Nepali Cold Brew: A Summer Recipe',
    excerpt:
      'Cold brew made from Himalayan beans develops a naturally sweet, low-acid cup with prominent chocolate and stone fruit notes. Our twelve-hour recipe makes the most of the bean\'s unique character.',
    category: 'Brewing',
    readTime: '3 min',
    date: 'Feb 18, 2025',
    slug: 'nepali-cold-brew',
  },
  {
    id: 8,
    title: 'Hand Harvesting: Why Machines Can Never Replace Human Judgment',
    excerpt:
      'On Nepal\'s steep terraces, mechanised harvesting is impossible. But even where it is feasible, hand-picking remains the gold standard — and the farmers of Gulmi and Palpa know exactly why.',
    category: 'Culture',
    readTime: '6 min',
    date: 'Feb 3, 2025',
    slug: 'hand-harvesting',
  },
];

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay: i * 0.08 },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// ---------------------------------------------------------------------------
// Category tag colour mapping
// ---------------------------------------------------------------------------

const CATEGORY_COLORS: Record<Exclude<Category, 'All'>, string> = {
  Origin: '#B08D57',
  Culture: '#8C8477',
  Brewing: '#3B2A21',
  Sustainability: '#5a7a52',
  Education: '#4a6080',
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function CategoryPill({
  label,
  active,
  onClick,
}: {
  label: Category;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className="relative px-5 py-2 text-xs tracking-[0.25em] uppercase transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B08D57]"
      style={{
        background: active ? '#3B2A21' : 'transparent',
        color: active ? '#F5EFE6' : '#8C8477',
        border: `1px solid ${active ? '#3B2A21' : '#E6D8C9'}`,
      }}
      aria-pressed={active}
    >
      {label}
    </motion.button>
  );
}

function ArticleCard({ article, index }: { article: Article; index: number }) {
  const accentColor = CATEGORY_COLORS[article.category];

  return (
    <motion.article
      variants={fadeUp}
      custom={index}
      className="group relative flex flex-col overflow-hidden bg-white"
      style={{ border: '1px solid #E6D8C9' }}
    >
      {/* Image placeholder with gradient */}
      <div className="relative overflow-hidden" style={{ height: '220px' }}>
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${accentColor}22 0%, #E6D8C9 50%, ${accentColor}15 100%)`,
          }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
        />
        {/* Decorative pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, ${accentColor} 2px, transparent 2px), radial-gradient(circle at 75% 75%, ${accentColor} 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
          aria-hidden="true"
        />
        {/* Article number watermark */}
        <span
          className="absolute bottom-4 right-5 font-serif text-6xl leading-none select-none pointer-events-none"
          style={{
            color: accentColor,
            opacity: 0.12,
            fontFamily: '"Playfair Display", Georgia, serif',
          }}
          aria-hidden="true"
        >
          {String(article.id).padStart(2, '0')}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-7">
        {/* Category + read time row */}
        <div className="flex items-center justify-between mb-4">
          <span
            className="text-[10px] tracking-[0.3em] uppercase font-medium px-2 py-1"
            style={{ background: `${accentColor}18`, color: accentColor }}
          >
            {article.category}
          </span>
          <span className="text-[11px] tracking-wider" style={{ color: '#8C8477' }}>
            {article.readTime} read
          </span>
        </div>

        {/* Title with underline animation */}
        <h3
          className="font-serif text-xl leading-snug mb-3"
          style={{
            color: '#3B2A21',
            fontFamily: '"Playfair Display", Georgia, serif',
          }}
        >
          <span
            className="relative inline"
            style={{
              backgroundImage: `linear-gradient(${accentColor}, ${accentColor})`,
              backgroundSize: '0% 1px',
              backgroundPosition: '0 100%',
              backgroundRepeat: 'no-repeat',
              transition: 'background-size 0.4s ease',
            }}
          >
            {article.title}
          </span>
        </h3>

        <p
          className="text-sm leading-relaxed flex-1 mb-5"
          style={{ color: '#8C8477' }}
        >
          {article.excerpt}
        </p>

        {/* Footer row */}
        <div
          className="flex items-center justify-between pt-4"
          style={{ borderTop: '1px solid #E6D8C9' }}
        >
          <span className="text-[11px] tracking-wide" style={{ color: '#8C8477' }}>
            {article.date}
          </span>
          <motion.span
            className="text-xs tracking-[0.15em] uppercase font-medium flex items-center gap-2 transition-colors duration-300"
            style={{ color: accentColor }}
            whileHover={{ x: 4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            Read More
            <span aria-hidden="true" style={{ fontSize: '14px' }}>→</span>
          </motion.span>
        </div>
      </div>

      {/* Hover left accent border */}
      <div
        className="absolute left-0 top-0 bottom-0 w-0.5 transition-all duration-500 opacity-0 group-hover:opacity-100"
        style={{ background: accentColor }}
        aria-hidden="true"
      />
    </motion.article>
  );
}

function FeaturedArticle() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay: 0.3 }}
      className="group relative overflow-hidden mb-20"
      style={{ background: '#3B2A21' }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 80%, #B08D57 2px, transparent 2px), radial-gradient(circle at 80% 20%, #F5EFE6 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      {/* Mountain silhouette decoration */}
      <svg
        viewBox="0 0 1200 200"
        preserveAspectRatio="xMidYMax meet"
        className="absolute bottom-0 left-0 w-full opacity-10 pointer-events-none"
        aria-hidden="true"
      >
        <path
          d="M0,200 L0,120 L120,50 L240,90 L360,30 L480,70 L600,10 L720,55 L840,20 L960,65 L1080,35 L1200,70 L1200,200 Z"
          fill="#B08D57"
        />
      </svg>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Left: image placeholder */}
        <div
          className="relative overflow-hidden"
          style={{ minHeight: '360px', background: 'linear-gradient(135deg, #2D1B12 0%, #4a3728 60%, #3B2A21 100%)' }}
        >
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
            style={{
              background:
                'linear-gradient(135deg, #2D1B12 0%, #4a3728 50%, #B08D5720 100%)',
            }}
          />
          {/* Featured label overlay */}
          <div className="absolute top-8 left-8">
            <span
              className="text-[10px] tracking-[0.35em] uppercase font-medium px-3 py-1.5"
              style={{ background: '#B08D57', color: '#F5EFE6' }}
            >
              Featured
            </span>
          </div>
          {/* Decorative number */}
          <span
            className="absolute bottom-8 right-8 font-serif leading-none select-none pointer-events-none"
            style={{
              color: '#B08D57',
              opacity: 0.15,
              fontSize: 'clamp(80px, 12vw, 140px)',
              fontFamily: '"Playfair Display", Georgia, serif',
            }}
            aria-hidden="true"
          >
            00
          </span>
        </div>

        {/* Right: content */}
        <div className="flex flex-col justify-center px-10 py-14 lg:px-16">
          <div className="flex items-center gap-3 mb-6">
            <span
              className="h-px w-8"
              style={{ background: '#B08D57' }}
              aria-hidden="true"
            />
            <span
              className="text-[10px] tracking-[0.35em] uppercase"
              style={{ color: '#B08D57' }}
            >
              Origin &middot; 12 min read
            </span>
          </div>

          <h2
            className="font-serif leading-tight mb-6"
            style={{
              color: '#F5EFE6',
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(28px, 4vw, 48px)',
            }}
          >
            The Art of Altitude: How Nepal&apos;s Mountains Create Exceptional Coffee
          </h2>

          <p
            className="text-base leading-relaxed mb-8"
            style={{ color: '#8C8477' }}
          >
            At over two thousand metres, the air is thin, the nights are cold, and the coffee cherries grow extraordinarily slowly. That slowness is everything. We trace the journey from Himalayan hillside to your cup — and meet the forces of nature that make Nepali beans unlike anything else on earth.
          </p>

          <div className="flex items-center justify-between">
            <span className="text-xs tracking-wide" style={{ color: '#8C8477' }}>
              May 24, 2025
            </span>
            <motion.button
              whileHover={{ x: 6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="flex items-center gap-3 text-sm tracking-[0.15em] uppercase font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B08D57] rounded"
              style={{ color: '#B08D57' }}
            >
              Read the Story
              <span aria-hidden="true" className="text-base">→</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function JournalPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const filtered = activeCategory === 'All'
    ? ARTICLES
    : ARTICLES.filter((a) => a.category === activeCategory);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5EFE6' }}>
      {/* ── Page Header ── */}
      <header
        className="relative overflow-hidden pt-40 pb-24"
        style={{ backgroundColor: '#F5EFE6' }}
      >
        {/* Watermark */}
        <span
          className="pointer-events-none select-none absolute inset-0 flex items-center justify-end pr-8 font-serif leading-none tracking-tighter overflow-hidden"
          style={{
            color: '#3B2A21',
            opacity: 0.04,
            fontSize: 'clamp(80px, 18vw, 220px)',
            fontFamily: '"Playfair Display", Georgia, serif',
          }}
          aria-hidden="true"
        >
          Journal
        </span>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-4 mb-6">
              <span
                className="h-px w-10"
                style={{ background: '#B08D57' }}
                aria-hidden="true"
              />
              <span
                className="text-[10px] tracking-[0.4em] uppercase font-medium"
                style={{ color: '#B08D57' }}
              >
                Stories from the highlands
              </span>
            </div>

            {/* Main heading */}
            <h1
              className="font-serif leading-[1.05]"
              style={{
                color: '#3B2A21',
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 'clamp(56px, 10vw, 120px)',
                letterSpacing: '-0.03em',
              }}
            >
              The
              <br />
              <em
                className="not-italic"
                style={{ color: '#B08D57' }}
              >
                Journal
              </em>
            </h1>
          </motion.div>

          {/* Divider */}
          <motion.div
            className="h-px mt-12 mb-0"
            style={{ background: 'linear-gradient(to right, #B08D57, transparent)' }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay: 0.4 }}
            aria-hidden="true"
          />
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
        {/* Featured article */}
        <FeaturedArticle />

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay: 0.5 }}
          className="flex flex-wrap gap-3 mb-14"
          role="group"
          aria-label="Filter articles by category"
        >
          {CATEGORIES.map((cat) => (
            <CategoryPill
              key={cat}
              label={cat}
              active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            />
          ))}
        </motion.div>

        {/* Articles grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={stagger}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filtered.map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <p className="text-lg" style={{ color: '#8C8477' }}>
              No articles in this category yet.
            </p>
          </motion.div>
        )}

        {/* Bottom editorial CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          className="mt-24 pt-16 text-center"
          style={{ borderTop: '1px solid #E6D8C9' }}
        >
          <p
            className="text-xs tracking-[0.35em] uppercase mb-4"
            style={{ color: '#B08D57' }}
          >
            Stay current
          </p>
          <h2
            className="font-serif text-4xl md:text-5xl mb-6"
            style={{
              color: '#3B2A21',
              fontFamily: '"Playfair Display", Georgia, serif',
            }}
          >
            Subscribe to the Journal
          </h2>
          <p
            className="text-base max-w-md mx-auto mb-8 leading-relaxed"
            style={{ color: '#8C8477' }}
          >
            Origin stories, brewing guides, and seasonal releases — directly to your inbox.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 text-sm tracking-[0.15em] uppercase font-medium transition-colors duration-300"
            style={{ background: '#3B2A21', color: '#F5EFE6' }}
          >
            Get in Touch
            <span aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
