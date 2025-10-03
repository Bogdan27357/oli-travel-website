import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function HeroSection() {
  return (
    <section id="home" className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-transparent"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-yellow-500 to-secondary bg-clip-text text-transparent leading-tight">
            Discover Your Journey
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10">
            Откройте мир вместе с OliTravel — туры из Санкт-Петербурга по лучшим ценам
          </p>
          <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <Button size="lg" className="bg-gradient-to-r from-primary to-yellow-500 hover:shadow-2xl transition-all duration-300 hover:scale-110 text-lg px-8 py-6">
              <Icon name="Search" className="mr-2" size={20} />
              Подобрать тур
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-white transition-all duration-300 hover:scale-110 text-lg px-8 py-6">
              <Icon name="Calendar" className="mr-2" size={20} />
              Горящие туры
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
