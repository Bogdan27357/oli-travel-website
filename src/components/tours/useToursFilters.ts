import { useMemo } from 'react';
import { Tour } from '@/data/tours';

interface UseToursFiltersParams {
  allTours: Tour[];
  priceRange: number[];
  searchQuery: string;
  transferFilter: string;
  priceCategory: string;
  sortBy: string;
}

export function useToursFilters({
  allTours,
  priceRange,
  searchQuery,
  transferFilter,
  priceCategory,
  sortBy
}: UseToursFiltersParams) {
  const getFilteredTours = (country: string | null) => {
    let tours = allTours;
    
    if (country) {
      tours = tours.filter(tour => tour.country === country);
    }

    tours = tours.filter(tour => {
      const priceMatch = tour.price >= priceRange[0] && tour.price <= priceRange[1];
      
      const searchLower = searchQuery.toLowerCase();
      const searchMatch = !searchQuery || 
        tour.title.toLowerCase().includes(searchLower) ||
        tour.country.toLowerCase().includes(searchLower) ||
        tour.city.toLowerCase().includes(searchLower) ||
        tour.hotel.toLowerCase().includes(searchLower);

      const transferMatch = transferFilter === 'all' || tour.fromSpb === transferFilter;
      
      let categoryMatch = true;
      if (priceCategory === 'budget') {
        categoryMatch = tour.price < 60000;
      } else if (priceCategory === 'medium') {
        categoryMatch = tour.price >= 60000 && tour.price < 150000;
      } else if (priceCategory === 'premium') {
        categoryMatch = tour.price >= 150000;
      }
      
      return priceMatch && searchMatch && transferMatch && categoryMatch;
    });

    if (sortBy === 'price-asc') {
      tours = [...tours].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      tours = [...tours].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'popularity') {
      tours = [...tours].sort((a, b) => a.id - b.id);
    }
    
    return tours;
  };

  const tourStats = useMemo(() => {
    return {
      total: allTours.length,
      direct: allTours.filter(t => t.fromSpb === 'direct').length,
      transfer: allTours.filter(t => t.fromSpb === 'transfer').length,
      countries: new Set(allTours.map(t => t.country)).size,
      budget: allTours.filter(t => t.price < 60000).length,
      medium: allTours.filter(t => t.price >= 60000 && t.price < 150000).length,
      premium: allTours.filter(t => t.price >= 150000).length
    };
  }, [allTours]);

  return { getFilteredTours, tourStats };
}
