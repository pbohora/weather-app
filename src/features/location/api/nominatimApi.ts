import { z } from 'zod';
import { apiClient } from '../../../shared/api/axiosInstance';
import type { Coordinates, Location } from '../types/location.types';

const NOMINATIM_URL = import.meta.env.VITE_NOMINATIM_API_URL || 'https://nominatim.openstreetmap.org/reverse';

const reverseGeocodeSchema = z.object({
  address: z.object({
    city: z.string().optional(),
    town: z.string().optional(),
    village: z.string().optional(),
    country: z.string().optional(),
  }),
});

export async function reverseGeocode(coords: Coordinates): Promise<Location> {
  const { data } = await apiClient.get<unknown>(NOMINATIM_URL, {
    params: { lat: coords.latitude, lon: coords.longitude, format: 'json' },
  });

  const parsed = reverseGeocodeSchema.parse(data);
  const name = parsed.address.city ?? parsed.address.town ?? parsed.address.village ?? 'Current Location';

  return {
    id: `geo-${coords.latitude.toFixed(4)}-${coords.longitude.toFixed(4)}`,
    name,
    country: parsed.address.country ?? '',
    latitude: coords.latitude,
    longitude: coords.longitude,
  };
}
