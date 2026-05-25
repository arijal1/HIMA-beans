'use client';

import { motion } from 'framer-motion';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export default function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <section
      style={{
        background: '#1E1008',
        padding: 'clamp(5rem, 10vw, 8rem) 0 clamp(3rem, 6vw, 5rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(123,89,32,0.07) 0%, transparent 70%)',
        }}
      />
      <div className="site-container" style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              fontSize: '10px',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: '#7C5535',
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
              marginBottom: '1rem',
            }}
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.25rem, 6vw, 4.5rem)',
            fontWeight: 700,
            color: '#EDE0CC',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: subtitle ? '1.25rem' : 0,
          }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            style={{
              color: 'rgba(237,230,216,0.55)',
              fontSize: '1rem',
              lineHeight: 1.7,
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
              maxWidth: '540px',
              margin: '0 auto',
            }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
