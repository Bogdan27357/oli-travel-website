import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

export default function HeroSection() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section id="home" className="relative py-20 md:py-32 overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-transparent"></div>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-10 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-10 left-20 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <div className="mb-8">
            <div className="inline-block mb-4 px-6 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg">
              <span className="text-sm font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                🌍 Более 70 направлений по всему миру
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-4 leading-tight">
              <span className="bg-gradient-to-r from-primary via-yellow-500 to-secondary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift">
                OliTravel
              </span>
            </h1>
            <div className="h-1 w-48 mx-auto bg-gradient-to-r from-primary via-yellow-500 to-secondary rounded-full animate-pulse"></div>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-6 font-medium">
            Откройте мир вместе с нами — туры из Санкт-Петербурга по лучшим ценам
          </p>
          
          <p className="text-base md:text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Прямые рейсы и с пересадками • Рассрочка 0% • Гарантия лучшей цены
          </p>
          
          {/* Video preview */}
          <div className="mb-8 relative group cursor-pointer" onClick={() => setShowVideo(true)}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl max-w-3xl mx-auto">
              <img 
                src="/img/496b4f04-d693-4e43-b4c3-526b487a4c42.jpg" 
                alt="OliTravel Welcome" 
                className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-all">
                <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon name="Play" size={40} className="text-primary ml-1" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white text-left">
                <h3 className="text-xl font-bold mb-1">Добро пожаловать в OliTravel!</h3>
                <p className="text-sm opacity-90">Нажмите, чтобы узнать больше о нас</p>
              </div>
            </div>
          </div>

          {/* Video Modal */}
          {showVideo && (
            <div 
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              onClick={() => setShowVideo(false)}
            >
              <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
                <button 
                  onClick={() => setShowVideo(false)}
                  className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
                >
                  <Icon name="X" size={32} />
                </button>
                <div className="bg-white rounded-2xl p-8">
                  <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Добро пожаловать в OliTravel!
                  </h2>
                  <div className="space-y-4 text-left text-gray-700">
                    <p className="text-lg">
                      🌴 <strong>Мы - ваши эксперты по путешествиям!</strong> С 2009 года помогаем тысячам туристов находить идеальные туры по всему миру.
                    </p>
                    <p>
                      ✈️ <strong>Прямые перелёты из СПб</strong> - никаких утомительных пересадок! Вылетайте комфортно и прибывайте отдохнувшими.
                    </p>
                    <p>
                      💰 <strong>Рассрочка 0%</strong> - путешествуйте сейчас, платите потом! Без переплат и скрытых комиссий.
                    </p>
                    <p>
                      🏆 <strong>Гарантия лучшей цены</strong> - нашли дешевле? Мы вернём разницу или сделаем лучшее предложение!
                    </p>
                    <p>
                      🎯 <strong>Индивидуальный подход</strong> - наши менеджеры подберут тур именно под ваши пожелания и бюджет.
                    </p>
                    <div className="pt-4 border-t mt-6">
                      <p className="text-center text-xl font-semibold text-primary">
                        📞 Позвоните нам: <a href="tel:+79819812990" className="underline hover:text-secondary transition-colors">+7 (981) 981-29-90</a>
                      </p>
                      <p className="text-center text-sm text-gray-600 mt-2">
                        Или напишите в чат - мы онлайн и готовы помочь! 💬
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up mb-8" style={{ animationDelay: '200ms' }}>
            <Button 
              size="lg" 
              onClick={() => document.getElementById('tours')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-primary to-yellow-500 hover:shadow-2xl transition-all duration-300 hover:scale-110 text-lg px-8 py-6 font-semibold"
            >
              <Icon name="Search" className="mr-2" size={20} />
              Подобрать тур
            </Button>
            <a href="tel:+79819812990">
              <Button size="lg" variant="outline" className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-white transition-all duration-300 hover:scale-110 text-lg px-8 py-6 font-semibold">
                <Icon name="Phone" className="mr-2" size={20} />
                Позвонить
              </Button>
            </a>
          </div>
          
          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Icon name="Shield" size={16} className="text-green-600" />
              <span>Надёжная компания</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Star" size={16} className="text-yellow-500" />
              <span>2000+ отзывов</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Award" size={16} className="text-blue-600" />
              <span>15 лет опыта</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}