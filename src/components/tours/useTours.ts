import { useState, useEffect } from 'react';
import { allTours as fallbackTours, Tour } from '@/data/tours';

const ADMIN_API_URL = 'https://functions.poehali.dev/2ebb973a-0dd8-4f3b-8168-e788b062dbef';

export function useTours() {
  const [allTours, setAllTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTours();
  }, []);

  const loadTours = async () => {
    try {
      const response = await fetch(`${ADMIN_API_URL}?resource=tours&is_active=true&limit=100`);
      const data = await response.json();
      
      if (data.success && data.tours && data.tours.length > 0) {
        const mappedTours = data.tours.map((tour: any) => ({
          id: tour.id,
          title: `${tour.country}, ${tour.city}`,
          country: tour.country,
          city: tour.city,
          hotel: tour.title || tour.hotel,
          stars: tour.stars,
          dates: tour.dates,
          duration: tour.duration,
          price: tour.price,
          fromSpb: tour.flight_included ? 'direct' : 'transfer',
          image: tour.image_url,
          includes: Array.isArray(tour.includes) ? tour.includes : []
        }));
        setAllTours(mappedTours);
      } else {
        setAllTours(fallbackTours);
      }
    } catch (error) {
      console.log('Loading tours from static data');
      setAllTours(fallbackTours);
    } finally {
      setLoading(false);
    }
  };

  return { allTours, loading };
}
