import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useState, useEffect, useRef } from 'react';

const slides = [
  {
    type: 'hero',
    title: 'TIME TO TRAVEL',
    subtitle: 'BOOK YOUR TRIP TODAY',
    image: 'https://cdn.poehali.dev/files/9f295ef9-dc4e-4a82-9017-70ce5ec2365c.png'
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

const getYouTubeEmbedUrl = (url: string) => {
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|shorts\/|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}?autoplay=1&loop=1&playlist=${match[2]}&mute=1&controls=1`;
  }
  return null;
};

const isYouTubeUrl = (url: string) => {
  return url.includes('youtube.com') || url.includes('youtu.be');
};

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [videoUrl, setVideoUrl] = useState(localStorage.getItem('hero_video_url') || '');
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const musicUrl = localStorage.getItem('hero_music_url') || '';

  useEffect(() => {
    if (musicUrl && !audioRef.current) {
      audioRef.current = new Audio(musicUrl);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }
  }, [musicUrl]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    
    if (musicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.log('Audio play failed:', err));
    }
    setMusicPlaying(!musicPlaying);
  };

  useEffect(() => {
    const storedUrl = localStorage.getItem('hero_video_url');
    if (storedUrl) {
      setVideoUrl(storedUrl);
    }

    const handleStorageChange = () => {
      const newUrl = localStorage.getItem('hero_video_url') || '';
      setVideoUrl(newUrl);
    };

    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(() => {
      const currentUrl = localStorage.getItem('hero_video_url') || '';
      if (currentUrl !== videoUrl) {
        setVideoUrl(currentUrl);
      }
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [videoUrl]);

  useEffect(() => {
    if (!videoUrl) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [videoUrl]);

  return (
    <section id="home" className="relative py-20 md:py-32 overflow-hidden">
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
          
          {/* Video or Slideshow */}
          <div className="mb-6 md:mb-8 relative group">
            {videoUrl && isYouTubeUrl(videoUrl) && getYouTubeEmbedUrl(videoUrl) ? (
              <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-2xl max-w-3xl mx-auto bg-black">
                <iframe
                  className="w-full aspect-video min-h-[300px] md:min-h-[400px]"
                  src={getYouTubeEmbedUrl(videoUrl)}
                  title="YouTube video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : videoUrl ? (
                  <video 
                    className="w-full max-h-[500px] object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    onError={() => {
                      console.error('Video load error:', videoUrl);
                      setVideoUrl('');
                    }}
                  >
                    <source src={videoUrl} type="video/mp4" />
                    Ваш браузер не поддерживает видео
                  </video>
                )}
              </div>
            ) : (
              <>
                {musicUrl && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMusic();
                    }}
                    className="absolute top-4 right-4 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg"
                  >
                    <Icon 
                      name={musicPlaying ? 'Volume2' : 'VolumeX'} 
                      size={20} 
                      className={musicPlaying ? 'text-primary' : 'text-gray-400'}
                    />
                  </button>
                )}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl max-w-3xl mx-auto h-[450px]">
                  {slides.map((slide, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
                    >
                      {slide.type === 'hero' ? (
                        <div className="w-full h-full relative">
                          <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <>
                          <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                <Icon name={slide.icon as any} size={24} />
                              </div>
                              <h3 className="text-2xl font-bold">{slide.title}</h3>
                            </div>
                            <p className="text-lg opacity-90">{slide.description}</p>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                  
                  {/* Slide indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentSlide(index);
                        }}
                        className={`w-2 h-2 rounded-full transition-all ${
                          currentSlide === index ? 'bg-white w-8' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

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