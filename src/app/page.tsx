import type { Metadata } from 'next';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import ProductsGrid from '@/components/home/ProductsGrid';
import HomeStory from '@/components/home/HomeStory';
import ContactCTA from '@/components/home/ContactCTA';

export const metadata: Metadata = {
  title: 'HIMA BEANS — Himalayan Coffee, Crafted Above the Clouds',
  description:
    'Single-origin specialty coffee sourced directly from high-altitude Himalayan farms in Nepal — roasted in Melbourne, delivered across Australia.',
  openGraph: {
    title: 'HIMA BEANS — Himalayan Coffee, Crafted Above the Clouds',
    description: 'Single-origin Nepali specialty coffee from 2,000m+ altitude.',
    url: 'https://himabeans.com.au',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
};

export default function HomePage() {
  return (
    <main>
      <Navigation />
      <Hero />
      <ProductsGrid />
      <HomeStory />
      <ContactCTA />
      <Footer />
    </main>
  );
}
