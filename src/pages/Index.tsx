import { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import BenefitsSection from '@/components/BenefitsSection';
import HotDealsSection from '@/components/HotDealsSection';
import TourFinderForm from '@/components/TourFinderForm';
import TourCalendar from '@/components/TourCalendar';
import ToursSection from '@/components/ToursSection';
import CountriesSection from '@/components/CountriesSection';
import DestinationsSection from '@/components/DestinationsSection';
import HotelsSection from '@/components/HotelsSection';
import AboutSection from '@/components/AboutSection';
import ReviewsSection from '@/components/ReviewsSection';
import PromotionsSection from '@/components/PromotionsSection';
import ContactForm from '@/components/ContactForm';
import ContactsSection from '@/components/ContactsSection';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

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
        <HotDealsSection />
        <TourFinderForm />
        <TourCalendar />
        <ToursSection />
        <CountriesSection />
        <DestinationsSection />
        <HotelsSection />
        <AboutSection />
        <ReviewsSection />
        <PromotionsSection />
        <ContactForm />
        <ContactsSection />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;