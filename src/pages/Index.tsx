import { useState, lazy, Suspense } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import BenefitsSection from '@/components/BenefitsSection';
import HotDealsSection from '@/components/HotDealsSection';
import ToursSection from '@/components/ToursSection';
import PopularDestinationsSection from '@/components/PopularDestinationsSection';
import ReviewsSection from '@/components/ReviewsSection';
import ContactForm from '@/components/ContactForm';
import ChatWidget from '@/components/ChatWidget';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import QuickContactButton from '@/components/QuickContactButton';

const FAQSection = lazy(() => import('@/components/FAQSection'));
const WhyChooseUsSection = lazy(() => import('@/components/WhyChooseUsSection'));

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
        <PopularDestinationsSection />
        <ToursSection />
        <Suspense fallback={<div className="h-32" />}>
          <WhyChooseUsSection />
        </Suspense>
        <ReviewsSection />
        <Suspense fallback={<div className="h-32" />}>
          <FAQSection />
        </Suspense>
        <ContactForm />
      </main>

      <Footer />
      <ChatWidget />
      <QuickContactButton />
      <ScrollToTop />
    </div>
  );
};

export default Index;