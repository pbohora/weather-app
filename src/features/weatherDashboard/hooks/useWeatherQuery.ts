import { useQuery } from '@tanstack/react-query';
import { fetchWeather } from '../api/weatherApi';
import type { Coordinates, TemperatureUnit } from '../api/weatherApi.types';
import { transformWeather } from '../utils/transformWeather';

export function useWeatherQuery(location: Coordinates & { id: number }, unit: TemperatureUnit) {
  return useQuery({
    queryKey: ['weather', location?.id, unit],
    queryFn: () =>
      fetchWeather({
        latitude: location!.latitude,
        longitude: location!.longitude,
        unit,
      }),
    enabled: location !== null,
    select: transformWeather,
  });
}
