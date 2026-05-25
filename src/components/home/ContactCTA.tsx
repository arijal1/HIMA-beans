'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ContactCTA() {
  return (
    <section style={{ backgroundColor: '#1E1008' }} className="section-gap">
      <div className="site-container text-center">

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[#7C5535] text-[10px] tracking-[0.4em] uppercase mb-5"
          style={{ fontFamily: 'var(--font-inter, Inter, sans-serif)' }}
        >
          Get in Touch
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="text-[#F2E8D8] font-bold mx-auto"
          style={{
            fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
            fontSize: 'clamp(1.75rem, 5vw, 3rem)',
            lineHeight: 1.2,
            maxWidth: '560px',
          }}
        >
          Ready to Taste the Clouds?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="mx-auto mt-5 leading-relaxed"
          style={{
            maxWidth: '440px',
            color: 'rgba(245,239,230,0.55)',
            fontSize: '0.9rem',
            fontFamily: 'var(--font-inter, Inter, sans-serif)',
          }}
        >
          Whether you&apos;re a café owner, a coffee lover, or simply curious — we&apos;d love to hear from you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.24 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-[11px] tracking-[0.2em] uppercase font-medium transition-all duration-300 hover:opacity-85"
            style={{
              backgroundColor: '#7C5535',
              color: '#160C05',
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
              minWidth: '180px',
            }}
          >
            Contact Us
          </Link>
          <Link
            href="/wholesale"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-[11px] tracking-[0.2em] uppercase font-medium transition-all duration-300 hover:border-[#F2E8D8]/60"
            style={{
              border: '1px solid rgba(123,89,32,0.45)',
              color: '#7C5535',
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
              minWidth: '180px',
            }}
          >
            Wholesale Inquiry
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
