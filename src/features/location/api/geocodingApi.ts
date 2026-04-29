import { apiClient } from '../../../shared/api/axiosInstance';
import { geocodingResponseSchema } from './geocodingApi.types';
import type { Location } from '../types/location.types';

const BASE_URL = import.meta.env.VITE_GEOCODING_API_URL || 'https://geocoding-api.open-meteo.com/v1/search';

export async function searchLocations(query: string): Promise<Location[]> {
  if (!query) return [];

  const { data } = await apiClient.get<unknown>(BASE_URL, {
    params: {
      name: query,
      count: 5,
      language: 'en',
      format: 'json',
    },
  });

  const parsed = geocodingResponseSchema.parse(data);

  return parsed.results || [];
}
