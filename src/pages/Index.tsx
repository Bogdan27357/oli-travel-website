import { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import BenefitsSection from '@/components/BenefitsSection';
import HotDealsSection from '@/components/HotDealsSection';
import TourFinderForm from '@/components/TourFinderForm';
import ToursSection from '@/components/ToursSection';
import RussiaToursSection from '@/components/RussiaToursSection';
import PopularDestinationsSection from '@/components/PopularDestinationsSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import CountriesSection from '@/components/CountriesSection';
import HotelsSection from '@/components/HotelsSection';
import StatsSection from '@/components/StatsSection';
import AboutSection from '@/components/AboutSection';
import ReviewsSection from '@/components/ReviewsSection';
import FAQSection from '@/components/FAQSection';
import TrustSignalsSection from '@/components/TrustSignalsSection';
import ContactForm from '@/components/ContactForm';
import Newsletter from '@/components/Newsletter';
import ChatWidget from '@/components/ChatWidget';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import QuickContactButton from '@/components/QuickContactButton';

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
        <PopularDestinationsSection />
        <ToursSection />
        <RussiaToursSection />
        <WhyChooseUsSection />
        <HotelsSection />
        <CountriesSection />
        <ReviewsSection />
        <StatsSection />
        <TrustSignalsSection />
        <FAQSection />
        <AboutSection />
        <ContactForm />
        <Newsletter />
      </main>

      <Footer />
      <ChatWidget />
      <QuickContactButton />
      <ScrollToTop />
    </div>
  );
};

export default Index;