import { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import BenefitsSection from '@/components/BenefitsSection';
import ToursSection from '@/components/ToursSection';
import CountriesSection from '@/components/CountriesSection';
import DestinationsSection from '@/components/DestinationsSection';
import HotelsSection from '@/components/HotelsSection';
import AboutSection from '@/components/AboutSection';
import ReviewsSection from '@/components/ReviewsSection';
import PromotionsSection from '@/components/PromotionsSection';
import ContactsSection from '@/components/ContactsSection';
import Footer from '@/components/Footer';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header activeSection={activeSection} scrollToSection={scrollToSection} />
      
      <main>
        <HeroSection />
        <BenefitsSection />
        <ToursSection />
        <CountriesSection />
        <DestinationsSection />
        <HotelsSection />
        <AboutSection />
        <ReviewsSection />
        <PromotionsSection />
        <ContactsSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
