import type { Metadata } from 'next';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import CoffeePourAnimation from '@/components/home/CoffeePourAnimation';
import WhyNepali from '@/components/home/WhyNepali';
import FeaturedBeans from '@/components/home/FeaturedBeans';
import OriginStory from '@/components/home/OriginStory';
import FlavorNotes from '@/components/home/FlavorNotes';
import SustainabilitySection from '@/components/home/SustainabilitySection';
import WholesaleCTA from '@/components/home/WholesaleCTA';
import Testimonials from '@/components/home/Testimonials';
import JournalPreview from '@/components/home/JournalPreview';
import ContactCTA from '@/components/home/ContactCTA';

export const metadata: Metadata = {
  title: 'HIMA BEANS — Himalayan Coffee, Perfected at Altitude',
  description:
    'HIMA BEANS sources rare single-origin specialty coffee from high-altitude Himalayan farms in Nepal and delivers it across Australia. Crafted Above the Clouds.',
  openGraph: {
    title: 'HIMA BEANS — Himalayan Coffee, Perfected at Altitude',
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
      <FlavorNotes />
      <SustainabilitySection />
      <WholesaleCTA />
      <Testimonials />
      <JournalPreview />
      <ContactCTA />
      <Footer />
    </main>
  );
}
