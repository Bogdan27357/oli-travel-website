import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function HeroSection() {
  return (
    <section id="home" className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-transparent"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <div className="mb-8 flex justify-center">
            <div className="relative w-48 h-48 animate-float">
              <img 
                src="/img/ba1adb08-b692-455f-9800-71be9436d24a.jpg" 
                alt="OliTravel Logo" 
                className="w-full h-full object-contain drop-shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-2xl animate-pulse"></div>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary via-yellow-500 to-secondary bg-clip-text text-transparent leading-tight">
            Откройте своё путешествие
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10">
            Откройте мир вместе с OliTravel — туры из Санкт-Петербурга по лучшим ценам
          </p>
          <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <Button 
              size="lg" 
              onClick={() => document.getElementById('tours')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-primary to-yellow-500 hover:shadow-2xl transition-all duration-300 hover:scale-110 text-lg px-8 py-6"
            >
              <Icon name="Search" className="mr-2" size={20} />
              Подобрать тур
            </Button>
            <a href="tel:+79819812990">
              <Button size="lg" variant="outline" className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-white transition-all duration-300 hover:scale-110 text-lg px-8 py-6">
                <Icon name="Phone" className="mr-2" size={20} />
                Позвонить
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}