'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ArticleCategory = 'Origin' | 'Culture' | 'Brewing';

interface Article {
  id: string;
  category: ArticleCategory;
  title: string;
  excerpt: string;
  readTime: string;
  slug: string;
  // Placeholder gradient index used to generate decorative visuals
  gradient: string;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const ARTICLES: Article[] = [
  {
    id: 'a1',
    category: 'Origin',
    title: 'The Art of Altitude: How Nepal\'s Mountains Shape Exceptional Coffee',
    excerpt:
      'At over 1,400 metres above sea level, Nepal\'s coffee cherries develop slowly — producing a density of flavour that lower altitudes simply cannot replicate. We explore the science and poetry behind elevation.',
    readTime: '5 min read',
    slug: 'art-of-altitude-nepal-mountains-coffee',
    gradient:
      'linear-gradient(135deg, #2D1B12 0%, #3B2A21 40%, #4a3728 70%, #1a0f09 100%)',
  },
  {
    id: 'a2',
    category: 'Culture',
    title: 'A Morning in Gulmi: Meeting the Farmers Behind Your Cup',
    excerpt:
      'Gulmi district sits in Nepal\'s mid-hills, where terraced coffee farms cling to slopes above the Modi River. A photo essay from our last origin trip.',
    readTime: '8 min read',
    slug: 'morning-in-gulmi-farmers-behind-your-cup',
    gradient:
      'linear-gradient(135deg, #3B2A21 0%, #5c3d28 50%, #3B2A21 100%)',
  },
  {
    id: 'a3',
    category: 'Brewing',
    title: 'Brewing Guide: Getting the Most from Himalayan Specialty Beans',
    excerpt:
      'High-altitude beans reward precise temperature and ratio control. Our head barista shares the recipes that let Nepal\'s terroir speak for itself.',
    readTime: '6 min read',
    slug: 'brewing-guide-himalayan-specialty-beans',
    gradient:
      'linear-gradient(135deg, #1a0f09 0%, #2D1B12 60%, #3B2A21 100%)',
  },
];

// ---------------------------------------------------------------------------
// Category tag colors
// ---------------------------------------------------------------------------

const CATEGORY_COLORS: Record<ArticleCategory, { bg: string; text: string }> = {
  Origin: { bg: 'rgba(176,141,87,0.18)', text: '#B08D57' },
  Culture: { bg: 'rgba(140,132,119,0.18)', text: '#8C8477' },
  Brewing: { bg: 'rgba(59,42,33,0.18)', text: '#8C8477' },
};

// ---------------------------------------------------------------------------
// Category tag component
// ---------------------------------------------------------------------------

function CategoryTag({ category }: { category: ArticleCategory }) {
  const colors = CATEGORY_COLORS[category];
  return (
    <span
      className="inline-block text-[10px] tracking-[0.25em] uppercase px-2.5 py-1 font-medium"
      style={{ background: colors.bg, color: colors.text }}
    >
      {category}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Arrow icon
// ---------------------------------------------------------------------------

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Decorative image placeholder
// ---------------------------------------------------------------------------

function ArticleImagePlaceholder({
  gradient,
  category,
}: {
  gradient: string;
  category: ArticleCategory;
}) {
  return (
    <div
      className="absolute inset-0"
      style={{ background: gradient }}
      aria-hidden="true"
    >
      {/* Topographic pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.08]"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <ellipse
            key={i}
            cx="200"
            cy="150"
            rx={60 + i * 30}
            ry={40 + i * 20}
            fill="none"
            stroke="#F5EFE6"
            strokeWidth="1"
            opacity={1 - i * 0.1}
          />
        ))}
      </svg>
      {/* Category watermark */}
      <span
        className="absolute bottom-4 right-4 text-[10px] tracking-[0.3em] uppercase opacity-30"
        style={{ color: '#F5EFE6' }}
      >
        {category}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Featured article card (large, left column)
// ---------------------------------------------------------------------------

function FeaturedArticleCard({ article }: { article: Article }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
      className="relative flex flex-col"
    >
      <Link
        href={`/journal/${article.slug}`}
        className="group block"
        aria-label={`Read article: ${article.title}`}
      >
        {/* Image area */}
        <div className="relative overflow-hidden" style={{ height: '420px' }}>
          <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-700 ease-out">
            <ArticleImagePlaceholder
              gradient={article.gradient}
              category={article.category}
            />
          </div>

          {/* Gradient overlay for readability */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgba(26,15,9,0.85) 0%, rgba(26,15,9,0.2) 50%, transparent 100%)',
            }}
            aria-hidden="true"
          />

          {/* Overlay content */}
          <div className="absolute inset-0 flex flex-col justify-end p-8">
            <div className="mb-3">
              <CategoryTag category={article.category} />
            </div>
            <h3
              className="text-2xl md:text-3xl font-serif leading-[1.2] mb-2"
              style={{
                color: '#F5EFE6',
                fontFamily: '"Playfair Display", Georgia, serif',
              }}
            >
              {article.title}
            </h3>
            <p
              className="text-sm leading-relaxed mb-4 line-clamp-2"
              style={{ color: 'rgba(245,239,230,0.65)' }}
            >
              {article.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <span
                className="text-xs tracking-[0.15em] uppercase"
                style={{ color: '#B08D57' }}
              >
                {article.readTime}
              </span>
              <span
                className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase transition-all duration-300 group-hover:gap-3"
                style={{ color: '#B08D57' }}
              >
                Read Article
                <ArrowIcon />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

// ---------------------------------------------------------------------------
// Secondary article card (smaller, right column)
// ---------------------------------------------------------------------------

interface SecondaryArticleCardProps {
  article: Article;
  index: number;
}

function SecondaryArticleCard({ article, index }: SecondaryArticleCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1] as [number,number,number,number],
      }}
      className="group flex gap-5 items-start"
    >
      <Link
        href={`/journal/${article.slug}`}
        className="flex gap-5 items-start w-full"
        aria-label={`Read article: ${article.title}`}
      >
        {/* Thumbnail */}
        <div
          className="relative overflow-hidden shrink-0"
          style={{ width: '110px', height: '110px' }}
        >
          <div className="absolute inset-0 group-hover:scale-110 transition-transform duration-600 ease-out">
            <ArticleImagePlaceholder
              gradient={article.gradient}
              category={article.category}
            />
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col justify-center min-w-0 flex-1 py-1">
          <div className="mb-2">
            <CategoryTag category={article.category} />
          </div>
          <h3
            className="text-base font-serif leading-snug mb-2 line-clamp-2"
            style={{
              color: '#3B2A21',
              fontFamily: '"Playfair Display", Georgia, serif',
            }}
          >
            {article.title}
          </h3>
          <div className="flex items-center gap-3">
            <span
              className="text-xs tracking-[0.12em] uppercase"
              style={{ color: '#8C8477' }}
            >
              {article.readTime}
            </span>
            <span
              className="inline-flex items-center gap-1.5 text-xs tracking-[0.12em] uppercase transition-all duration-300 group-hover:gap-2.5"
              style={{ color: '#B08D57' }}
            >
              Read
              <ArrowIcon />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function JournalPreview() {
  const [featured, ...secondary] = ARTICLES;

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: '#F5EFE6' }}
      aria-labelledby="journal-heading"
    >
      {/* Top rule */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, #E6D8C9 30%, #E6D8C9 70%, transparent)',
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-28 lg:py-36">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
              className="text-xs tracking-[0.3em] uppercase mb-4"
              style={{ color: '#B08D57' }}
            >
              Stories &amp; Craft
            </motion.p>

            <motion.h2
              id="journal-heading"
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
              From the
              <br />
              <em className="not-italic" style={{ color: '#8C8477' }}>
                Journal.
              </em>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          >
            <Link
              href="/journal"
              className="group inline-flex items-center gap-3 text-sm tracking-[0.15em] uppercase transition-colors duration-300"
              style={{ color: '#B08D57' }}
            >
              <span
                className="h-px w-8 transition-all duration-300 group-hover:w-14"
                style={{ background: '#B08D57' }}
              />
              All Articles
              <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </motion.div>
        </div>

        {/* Editorial layout: featured left, secondary right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-10">
          {/* Featured card */}
          <FeaturedArticleCard article={featured} />

          {/* Right column: secondary cards + dividers */}
          <div className="flex flex-col gap-0">
            {secondary.map((article, i) => (
              <div key={article.id}>
                {i > 0 && (
                  <span
                    className="block h-px my-6"
                    style={{ background: '#E6D8C9' }}
                    aria-hidden="true"
                  />
                )}
                <SecondaryArticleCard article={article} index={i} />
              </div>
            ))}

            {/* Bottom CTA in right column */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.35, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
              className="mt-10 pt-8"
              style={{ borderTop: '1px solid #E6D8C9' }}
            >
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: '#8C8477' }}
              >
                Origin stories, brewing guides, and the people who grow the world&apos;s
                most underrated specialty coffee — all in the Hima Beans Journal.
              </p>
              <Link
                href="/journal"
                className="group inline-flex items-center gap-3 px-6 py-3 text-sm tracking-[0.12em] uppercase font-medium transition-all duration-200 hover:opacity-90"
                style={{ background: '#3B2A21', color: '#F5EFE6' }}
              >
                Explore All Stories
                <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
