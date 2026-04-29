import { useQuery } from '@tanstack/react-query';
import { searchLocations } from '../api/geocodingApi';

export function useLocationSearch(debouncedQuery: string) {
  return useQuery({
    queryKey: ['locationSearch', debouncedQuery],
    queryFn: () => searchLocations(debouncedQuery),
    enabled: debouncedQuery.length > 2,
    staleTime: 10 * 60 * 1000, // 10 minutes cache
  });
}
