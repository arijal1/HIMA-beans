import type { Metadata } from 'next';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import CoffeePourAnimation from '@/components/home/CoffeePourAnimation';
import WhyNepali from '@/components/home/WhyNepali';
import FeaturedBeans from '@/components/home/FeaturedBeans';
import OriginStory from '@/components/home/OriginStory';
import Testimonials from '@/components/home/Testimonials';
import ContactCTA from '@/components/home/ContactCTA';

export const metadata: Metadata = {
  title: 'HIMA BEANS — Himalayan Coffee, Crafted Above the Clouds',
  description:
    'Single-origin specialty coffee sourced directly from high-altitude Himalayan farms in Nepal — roasted in Melbourne and delivered across Australia.',
  openGraph: {
    title: 'HIMA BEANS — Himalayan Coffee, Crafted Above the Clouds',
    description:
      'Single-origin Nepali specialty coffee from 2000m+ altitude, crafted for Australia.',
    url: 'https://himabeans.com.au',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
};

export default function HomePage() {
  return (
    <main>
      <Navigation />
      <Hero />
      <CoffeePourAnimation />
      <WhyNepali />
      <FeaturedBeans />
      <OriginStory />
      <Testimonials />
      <ContactCTA />
      <Footer />
    </main>
  );
}
