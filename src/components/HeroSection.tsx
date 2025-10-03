import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useState, useEffect } from 'react';

const slides = [
  {
    type: 'hero',
    title: 'TIME TO TRAVEL',
    subtitle: 'BOOK YOUR TRIP TODAY',
    image: '/img/0d62016f-b37b-4cb3-9315-5e474e6f1ac3.jpg'
  },
  {
    type: 'benefit',
    icon: 'Plane',
    title: 'Прямые рейсы и с пересадками',
    description: 'Выбирайте удобный вариант из СПб: прямые для комфорта или с пересадками для экономии',
    image: '/img/41b5736e-24a7-41c1-9c33-fac454c6508a.jpg'
  },
  {
    type: 'benefit',
    icon: 'CreditCard',
    title: 'Рассрочка 0%',
    description: 'Путешествуйте сейчас, платите потом! Без переплат и скрытых комиссий',
    image: '/img/07dae78f-45b3-413a-a25a-4b306011834c.jpg'
  },
  {
    type: 'benefit',
    icon: 'Award',
    title: '15 лет опыта',
    description: 'С 2009 года помогаем тысячам туристов находить идеальные туры',
    image: '/img/a44c474f-2a33-4162-b2db-68c78f5d4068.jpg'
  },
  {
    type: 'benefit',
    icon: 'Shield',
    title: 'Гарантия лучшей цены',
    description: 'Нашли дешевле? Вернём разницу или сделаем лучшее предложение!',
    image: '/img/41b5736e-24a7-41c1-9c33-fac454c6508a.jpg'
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroPosition, setHeroPosition] = useState(localStorage.getItem('hero_position') || 'center');
  const [heroTitle, setHeroTitle] = useState(localStorage.getItem('hero_title') || 'Откройте мир вместе с нами');
  const [heroSubtitle, setHeroSubtitle] = useState(localStorage.getItem('hero_subtitle') || 'Туры из Санкт-Петербурга по лучшим ценам');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const newPosition = localStorage.getItem('hero_position') || 'center';
      const newTitle = localStorage.getItem('hero_title') || 'Откройте мир вместе с нами';
      const newSubtitle = localStorage.getItem('hero_subtitle') || 'Туры из Санкт-Петербурга по лучшим ценам';
      setHeroPosition(newPosition);
      setHeroTitle(newTitle);
      setHeroSubtitle(newSubtitle);
    };

    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(() => {
      const currentPosition = localStorage.getItem('hero_position') || 'center';
      const currentTitle = localStorage.getItem('hero_title') || 'Откройте мир вместе с нами';
      const currentSubtitle = localStorage.getItem('hero_subtitle') || 'Туры из Санкт-Петербурга по лучшим ценам';
      if (currentPosition !== heroPosition) {
        setHeroPosition(currentPosition);
      }
      if (currentTitle !== heroTitle) {
        setHeroTitle(currentTitle);
      }
      if (currentSubtitle !== heroSubtitle) {
        setHeroSubtitle(currentSubtitle);
      }
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [heroPosition, heroTitle, heroSubtitle]);

  const positionClasses = {
    top: 'justify-start pt-20 md:pt-32',
    center: 'justify-center',
    bottom: 'justify-end pb-20 md:pb-32'
  };

  return (
    <section id="home" className={`relative overflow-hidden min-h-screen flex flex-col ${positionClasses[heroPosition as keyof typeof positionClasses]}`}>
      {/* Background Slideshow */}
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
          >
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
          </div>
        ))}
        
        {/* Slide indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentSlide === index ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 animate-fade-in-down">
            <div className="inline-block mb-4 px-6 py-2 bg-white/95 backdrop-blur-md rounded-full shadow-2xl animate-bounce-slow">
              <span className="text-sm font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                ✨ Более 70 направлений по всему миру
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-4 leading-tight animate-scale-in">
              <span className="text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text">
                OliTravel
              </span>
            </h1>
            <div className="h-1 w-48 mx-auto bg-gradient-to-r from-primary via-yellow-500 to-secondary rounded-full shadow-lg animate-pulse"></div>
          </div>
          
          <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 md:p-8 mb-8 shadow-2xl animate-fade-in-up">
            <p className="text-2xl md:text-4xl text-white mb-4 font-bold animate-slide-in-right">
              {heroTitle}
            </p>
            
            <p className="text-lg md:text-xl text-white/95 mb-2 font-medium animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
              {heroSubtitle}
            </p>
            
            <p className="text-base md:text-lg text-white/90 mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Прямые рейсы • Рассрочка 0% • Гарантия лучшей цены
            </p>

            <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Button 
                size="lg" 
                onClick={() => document.getElementById('tours')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-primary to-yellow-500 hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:rotate-1 text-lg px-8 py-6 font-semibold animate-pulse-slow"
              >
                <Icon name="Search" className="mr-2" size={20} />
                Подобрать тур
              </Button>
              <a href="tel:+79819812990">
                <Button size="lg" className="bg-white hover:bg-white/90 text-primary border-2 border-white transition-all duration-300 hover:scale-110 hover:-rotate-1 text-lg px-8 py-6 font-semibold">
                  <Icon name="Phone" className="mr-2" size={20} />
                  Позвонить
                </Button>
              </a>
            </div>
          </div>
          
          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 text-sm animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-2 bg-white/25 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg hover:bg-white/35 transition-all">
              <Icon name="Shield" size={16} className="text-green-300" />
              <span className="text-white font-semibold">Надёжная компания</span>
            </div>
            <div className="flex items-center gap-2 bg-white/25 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg hover:bg-white/35 transition-all">
              <Icon name="Star" size={16} className="text-yellow-300" />
              <span className="text-white font-semibold">2000+ отзывов</span>
            </div>
            <div className="flex items-center gap-2 bg-white/25 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg hover:bg-white/35 transition-all">
              <Icon name="Award" size={16} className="text-blue-300" />
              <span className="text-white font-semibold">15 лет опыта</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}