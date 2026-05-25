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
      'linear-gradient(135deg, #2D1B12 0%, #182118 40%, #4a3728 70%, #0F1710 100%)',
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
      'linear-gradient(135deg, #182118 0%, #5c3d28 50%, #182118 100%)',
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
      'linear-gradient(135deg, #0F1710 0%, #2D1B12 60%, #182118 100%)',
  },
];

// ---------------------------------------------------------------------------
// Category tag colors
// ---------------------------------------------------------------------------

const CATEGORY_COLORS: Record<ArticleCategory, { bg: string; text: string }> = {
  Origin: { bg: 'rgba(123,89,32,0.18)', text: '#7B5920' },
  Culture: { bg: 'rgba(140,132,119,0.18)', text: '#6E675F' },
  Brewing: { bg: 'rgba(24,33,24,0.18)', text: '#6E675F' },
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
            stroke="#F3EFE6"
            strokeWidth="1"
            opacity={1 - i * 0.1}
          />
        ))}
      </svg>
      {/* Category watermark */}
      <span
        className="absolute bottom-4 right-4 text-[10px] tracking-[0.3em] uppercase opacity-30"
        style={{ color: '#F3EFE6' }}
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
        {/* Image area — clamp ensures flexibility on all screen sizes:
            min 240px on mobile, scales with viewport, capped at 480px on desktop */}
        <div
          className="relative overflow-hidden"
          style={{ height: 'clamp(240px, 50vw, 480px)' }}
        >
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
          <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8">
            <div className="mb-2 sm:mb-3">
              <CategoryTag category={article.category} />
            </div>
            <h3
              className="font-serif leading-[1.2] mb-2"
              style={{
                color: '#F3EFE6',
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 'clamp(1.125rem, 3.5vw, 1.875rem)',
              }}
            >
              {article.title}
            </h3>
            <p
              className="text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-2"
              style={{ color: 'rgba(245,239,230,0.65)' }}
            >
              {article.excerpt}
            </p>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span
                className="text-xs tracking-[0.15em] uppercase"
                style={{ color: '#7B5920' }}
              >
                {article.readTime}
              </span>
              <span
                className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase transition-all duration-300 group-hover:gap-3"
                style={{ color: '#7B5920' }}
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
        className="flex gap-4 sm:gap-5 items-start w-full min-w-0"
        aria-label={`Read article: ${article.title}`}
      >
        {/* Thumbnail — clamp width/height so it never shrinks below 72px or grows too large */}
        <div
          className="relative overflow-hidden shrink-0"
          style={{
            width: 'clamp(72px, 22vw, 110px)',
            height: 'clamp(72px, 22vw, 110px)',
          }}
        >
          <div className="absolute inset-0 group-hover:scale-110 transition-transform duration-600 ease-out">
            <ArticleImagePlaceholder
              gradient={article.gradient}
              category={article.category}
            />
          </div>
        </div>

        {/* Text — min-w-0 + flex-1 prevent text overflow */}
        <div className="flex flex-col justify-center min-w-0 flex-1 py-1">
          <div className="mb-2">
            <CategoryTag category={article.category} />
          </div>
          <h3
            className="text-sm sm:text-base font-serif leading-snug mb-2 line-clamp-2"
            style={{
              color: '#182118',
              fontFamily: '"Playfair Display", Georgia, serif',
            }}
          >
            {article.title}
          </h3>
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className="text-xs tracking-[0.12em] uppercase"
              style={{ color: '#6E675F' }}
            >
              {article.readTime}
            </span>
            <span
              className="inline-flex items-center gap-1.5 text-xs tracking-[0.12em] uppercase transition-all duration-300 group-hover:gap-2.5"
              style={{ color: '#7B5920' }}
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
      style={{ background: '#F3EFE6' }}
      aria-labelledby="journal-heading"
    >
      {/* Top rule */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, #EDE6D8 30%, #EDE6D8 70%, transparent)',
        }}
        aria-hidden="true"
      />

      {/* Section padding: clamp-based to scale gracefully from mobile to desktop */}
      <div
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10"
        style={{ paddingTop: 'clamp(4rem, 8vw, 8rem)', paddingBottom: 'clamp(4rem, 8vw, 8rem)' }}
      >
        {/* Section header — stacks to column on mobile, flex-row on md+ */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 md:mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
              className="text-xs tracking-[0.3em] uppercase mb-4"
              style={{ color: '#7B5920' }}
            >
              Stories &amp; Craft
            </motion.p>

            <motion.h2
              id="journal-heading"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
              className="font-serif leading-[1.05]"
              style={{
                color: '#182118',
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 'clamp(2.25rem, 6vw, 3.75rem)',
              }}
            >
              From the
              <br />
              <em className="not-italic" style={{ color: '#6E675F' }}>
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
              style={{ color: '#7B5920' }}
            >
              <span
                className="h-px w-8 transition-all duration-300 group-hover:w-14"
                style={{ background: '#7B5920' }}
              />
              All Articles
              <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </motion.div>
        </div>

        {/* Editorial layout:
            - Single column on mobile (< lg)
            - Two columns on lg+ (featured left, secondary cards right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Featured card — full width on mobile, left column on lg+ */}
          <FeaturedArticleCard article={featured} />

          {/* Right column: secondary cards stacked with dividers */}
          <div className="flex flex-col gap-0">
            {secondary.map((article, i) => (
              <div key={article.id}>
                {i > 0 && (
                  <span
                    className="block h-px my-5 sm:my-6"
                    style={{ background: '#EDE6D8' }}
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
              className="mt-8 sm:mt-10 pt-6 sm:pt-8"
              style={{ borderTop: '1px solid #EDE6D8' }}
            >
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: '#6E675F' }}
              >
                Origin stories, brewing guides, and the people who grow the world&apos;s
                most underrated specialty coffee — all in the Hima Beans Journal.
              </p>
              <Link
                href="/journal"
                className="group inline-flex items-center gap-3 px-5 sm:px-6 py-3 text-sm tracking-[0.12em] uppercase font-medium transition-all duration-200 hover:opacity-90"
                style={{ background: '#182118', color: '#F3EFE6' }}
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
