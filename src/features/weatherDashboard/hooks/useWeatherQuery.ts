import { useQuery } from '@tanstack/react-query';
import { fetchWeather } from '../api/weatherApi';
import { transformWeather } from '../utils/transformWeather';
import type { Location } from '../../location/types/location.types';
import type { TemperatureUnit } from '../api/weatherApi.types';

export function useWeatherQuery(location: Location | null, unit: TemperatureUnit) {
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
