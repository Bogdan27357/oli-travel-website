import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Tour } from '@/data/tours';
import { useState } from 'react';
import OptimizedImage from '@/components/ui/optimized-image';

interface TourCardProps {
  tour: Tour;
  index: number;
  isInCompareList: boolean;
  onTourClick: (tour: Tour) => void;
  onBooking: (tour: Tour) => void;
  onToggleCompare: (tourId: number) => void;
}

export default function TourCard({
  tour,
  index,
  isInCompareList,
  onTourClick,
  onBooking,
  onToggleCompare
}: TourCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const galleryImages = tour.gallery_images && tour.gallery_images.length > 0 
    ? [tour.image, ...tour.gallery_images]
    : [tour.image];

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <Card 
      key={tour.id}
      className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer animate-fade-in flex flex-col"
      style={{ animationDelay: `${index * 50}ms` }}
      onClick={() => onTourClick(tour)}
    >
      <div className="relative h-40 overflow-hidden">
        <OptimizedImage
          src={galleryImages[currentImageIndex]} 
          alt={tour.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          priority={index < 4}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        
        {galleryImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all opacity-0 group-hover:opacity-100 z-10"
            >
              <Icon name="ChevronLeft" size={16} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all opacity-0 group-hover:opacity-100 z-10"
            >
              <Icon name="ChevronRight" size={16} />
            </button>
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-1 z-10">
              {galleryImages.map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    i === currentImageIndex ? 'bg-white w-4' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
        
        <div className="absolute top-3 right-3 flex gap-2">
          {tour.fromSpb === 'direct' ? (
            <Badge className="bg-green-500 hover:bg-green-600">
              <Icon name="Plane" size={12} className="mr-1" />
              Прямой
            </Badge>
          ) : (
            <Badge className="bg-blue-500 hover:bg-blue-600">
              <Icon name="MapPin" size={12} className="mr-1" />
              Пересадка
            </Badge>
          )}
        </div>

        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className="bg-primary">
            {'⭐'.repeat(tour.stars)}
          </Badge>
          <div 
            className="bg-white/90 backdrop-blur-sm p-2 rounded-lg cursor-pointer hover:bg-white transition-all"
            onClick={(e) => {
              e.stopPropagation();
              onToggleCompare(tour.id);
            }}
          >
            <Checkbox 
              checked={isInCompareList}
              className="pointer-events-none"
            />
          </div>
        </div>
        
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h4 className="font-bold text-lg mb-1">{tour.title}</h4>
          <p className="text-xs opacity-90 line-clamp-1">{tour.hotel}</p>
        </div>
      </div>
      
      <div className="p-3 bg-white flex-1 flex flex-col">
        <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
          <Icon name="Calendar" size={12} />
          <span>{tour.dates}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
          <Icon name="Clock" size={12} />
          <span>{tour.duration}</span>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-2">
          {tour.includes.slice(0, 2).map((item, i) => (
            <span 
              key={i}
              className="px-1.5 py-0.5 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary text-[10px] rounded-full"
            >
              {item}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-auto">
          <div>
            <p className="text-[10px] text-gray-500">от</p>
            <p className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {tour.price.toLocaleString()} ₽
            </p>
          </div>
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              onBooking(tour);
            }}
            size="sm"
            className="bg-gradient-to-r from-primary to-secondary hover:shadow-xl transition-all duration-300 hover:scale-105 h-8 px-3 text-xs"
          >
            <Icon name="Send" size={12} className="mr-1" />
            Купить
          </Button>
        </div>
      </div>
    </Card>
  );
}