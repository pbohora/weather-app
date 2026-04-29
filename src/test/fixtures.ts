import type { WeatherApiResponse } from '../features/weatherDashboard/api/weatherApi.types';
import type { CurrentWeather, WeatherDay } from '../features/weatherDashboard/types/weather.types';
import type { Location } from '../features/location/types/location.types';

export function makeRawWeather(overrides: Partial<WeatherApiResponse> = {}): WeatherApiResponse {
  return {
    latitude: 60.17,
    longitude: 24.94,
    timezone: 'Europe/Helsinki',
    current: {
      time: '2024-06-15T12:00:00',
      temperature_2m: 20,
      weather_code: 0,
      wind_speed_10m: 10,
      wind_direction_10m: 180,
      relative_humidity_2m: 60,
      apparent_temperature: 18,
      surface_pressure: 1013,
      visibility: 10000,
      precipitation: 0,
      uv_index: 3,
    },
    hourly: {
      time: ['2024-06-15T00:00:00', '2024-06-15T01:00:00'],
      temperature_2m: [15, 14],
      precipitation_probability: [10, 20],
      weather_code: [0, 1],
    },
    daily: {
      time: ['2024-06-15', '2024-06-16'],
      weather_code: [0, 1],
      temperature_2m_max: [22, 20],
      temperature_2m_min: [14, 12],
      precipitation_sum: [0, 1],
      precipitation_probability_max: [5, 40],
      wind_speed_10m_max: [12, 15],
      sunrise: ['2024-06-15T04:00:00', '2024-06-16T04:01:00'],
      sunset: ['2024-06-15T22:00:00', '2024-06-16T21:58:00'],
      uv_index_max: [3, 2],
      apparent_temperature_max: [21, 19],
      apparent_temperature_min: [13, 11],
    },
    ...overrides,
  };
}

export const mockCurrentWeather: CurrentWeather = {
  temp: 20,
  apparentTemp: 18,
  weatherCode: 0,
  icon: 'sun',
  windSpeed: 15,
  windDirection: 180,
  humidity: 65,
  precipitation: 0,
  pressure: 1013,
  visibility: 10,
  uvIndex: 3,
  isDay: true,
};

export const mockWeatherDay: WeatherDay = {
  date: '2024-06-16',
  maxTemp: 22,
  minTemp: 14,
  weatherCode: 0,
  icon: 'sun',
  precipitation: 0,
  precipitationProb: 5,
  maxWind: 12,
  sunrise: '2024-06-16T04:01:00',
  sunset: '2024-06-16T21:58:00',
  uvIndex: 3,
  apparentMaxTemp: 21,
  apparentMinTemp: 13,
};

export const mockDailyForecast: WeatherDay[] = [
  // index 0 = today (sliced out by DailyForecast)
  { ...mockWeatherDay, date: '2024-06-15', maxTemp: 20, minTemp: 12 },
  { ...mockWeatherDay, date: '2024-06-16' },
  { ...mockWeatherDay, date: '2024-06-17', maxTemp: 18, minTemp: 11, weatherCode: 61, icon: 'cloud-rain' },
  { ...mockWeatherDay, date: '2024-06-18', maxTemp: 15, minTemp: 10, weatherCode: 95, icon: 'cloud-lightning' },
];

export const mockStatsData = [
  { label: 'Wind Speed', value: '15 km/h' },
  { label: 'Humidity', value: '65%' },
  { label: 'UV Index', value: 3 },
] as const;

export const mockLocation: Location = {
  id: 1,
  name: 'Helsinki',
  country: 'FI',
  latitude: 60.17,
  longitude: 24.94,
};

export const mockLocations: Location[] = [
  { id: 1, name: 'Helsinki', country: 'Finland', latitude: 60.17, longitude: 24.94, admin1: 'Uusimaa' },
  { id: 2, name: 'Espoo', country: 'Finland', latitude: 60.25, longitude: 24.66, admin1: 'Uusimaa' },
  { id: 3, name: 'Tampere', country: 'Finland', latitude: 61.5, longitude: 23.76 },
];
