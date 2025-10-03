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

const getYouTubeEmbedUrl = (url: string, muted: boolean = true) => {
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|shorts\/|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}?autoplay=1&loop=1&playlist=${match[2]}&mute=${muted ? 1 : 0}&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&fs=0&enablejsapi=1`;
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
  const [videoMuted, setVideoMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
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

  const toggleVideoSound = () => {
    setVideoMuted(!videoMuted);
    if (videoRef.current) {
      videoRef.current.muted = !videoMuted;
    }
  };

  return (
    <section id="home" className="relative overflow-hidden min-h-screen flex flex-col">
      {/* Background Video or Slideshow */}
      {videoUrl && isYouTubeUrl(videoUrl) && getYouTubeEmbedUrl(videoUrl, videoMuted) ? (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <iframe
            key={videoMuted ? 'muted' : 'unmuted'}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.77777778vh] h-[56.25vw] min-h-full min-w-full"
            src={getYouTubeEmbedUrl(videoUrl, videoMuted)}
            title="Background video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            style={{ border: 'none', pointerEvents: 'none' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
          <button
            onClick={toggleVideoSound}
            className="absolute top-4 right-4 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg"
          >
            <Icon 
              name={videoMuted ? 'VolumeX' : 'Volume2'} 
              size={20} 
              className={videoMuted ? 'text-gray-400' : 'text-primary'}
            />
          </button>
        </div>
      ) : videoUrl ? (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video 
            ref={videoRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover"
            autoPlay
            loop
            muted={videoMuted}
            playsInline
            onError={() => {
              console.error('Video load error:', videoUrl);
              setVideoUrl('');
            }}
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
          <button
            onClick={toggleVideoSound}
            className="absolute top-4 right-4 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg"
          >
            <Icon 
              name={videoMuted ? 'VolumeX' : 'Volume2'} 
              size={20} 
              className={videoMuted ? 'text-gray-400' : 'text-primary'}
            />
          </button>
        </div>
      ) : (
        <div className="absolute inset-0 w-full h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
            >
              <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
            </div>
          ))}
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
        </div>
      )}
      
      {/* Content - positioned at bottom to not overlap video text */}
      <div className="flex-1"></div>
      
      <div className="container mx-auto px-4 relative z-10 pb-12 md:pb-20">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <div className="mb-6">
            <div className="inline-block mb-4 px-6 py-2 bg-white/95 backdrop-blur-md rounded-full shadow-2xl">
              <span className="text-sm font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                🌍 Более 70 направлений по всему миру
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-4 leading-tight">
              <span className="text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
                OliTravel
              </span>
            </h1>
            <div className="h-1 w-48 mx-auto bg-gradient-to-r from-primary via-yellow-500 to-secondary rounded-full shadow-lg"></div>
          </div>
          
          <div className="bg-black/50 backdrop-blur-md rounded-2xl p-6 md:p-8 mb-6 shadow-2xl">
            <p className="text-xl md:text-2xl text-white mb-4 font-medium">
              Откройте мир вместе с нами — туры из Санкт-Петербурга по лучшим ценам
            </p>
            
            <p className="text-base md:text-lg text-white/90 mb-6">
              Прямые рейсы и с пересадками • Рассрочка 0% • Гарантия лучшей цены
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => document.getElementById('tours')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-primary to-yellow-500 hover:shadow-2xl transition-all duration-300 hover:scale-105 text-lg px-8 py-6 font-semibold"
              >
                <Icon name="Search" className="mr-2" size={20} />
                Подобрать тур
              </Button>
              <a href="tel:+79819812990">
                <Button size="lg" className="bg-white hover:bg-white/90 text-primary border-2 border-white transition-all duration-300 hover:scale-105 text-lg px-8 py-6 font-semibold">
                  <Icon name="Phone" className="mr-2" size={20} />
                  Позвонить
                </Button>
              </a>
            </div>
          </div>
          
          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 text-sm">
            <div className="flex items-center gap-2 bg-white/25 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <Icon name="Shield" size={16} className="text-green-300" />
              <span className="text-white font-semibold">Надёжная компания</span>
            </div>
            <div className="flex items-center gap-2 bg-white/25 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <Icon name="Star" size={16} className="text-yellow-300" />
              <span className="text-white font-semibold">2000+ отзывов</span>
            </div>
            <div className="flex items-center gap-2 bg-white/25 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <Icon name="Award" size={16} className="text-blue-300" />
              <span className="text-white font-semibold">15 лет опыта</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}