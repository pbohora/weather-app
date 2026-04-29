import { apiClient } from '../../../shared/api/axiosInstance';
import { type WeatherApiResponse, weatherApiResponseSchema, type WeatherRequestParams } from './weatherApi.types';

const BASE_URL = import.meta.env.VITE_WEATHER_API_URL || 'https://api.open-meteo.com/v1/forecast';

const CURRENT_FIELDS = [
  'temperature_2m',
  'weather_code',
  'wind_speed_10m',
  'wind_direction_10m',
  'relative_humidity_2m',
  'apparent_temperature',
  'surface_pressure',
  'visibility',
  'precipitation',
  'uv_index',
].join(',');

const HOURLY_FIELDS = ['temperature_2m', 'precipitation_probability', 'weather_code'].join(',');

const DAILY_FIELDS = [
  'weather_code',
  'temperature_2m_max',
  'temperature_2m_min',
  'precipitation_sum',
  'precipitation_probability_max',
  'wind_speed_10m_max',
  'sunrise',
  'sunset',
  'uv_index_max',
  'apparent_temperature_max',
  'apparent_temperature_min',
].join(',');

const STATIC_PARAMS = {
  current: CURRENT_FIELDS,
  hourly: HOURLY_FIELDS,
  daily: DAILY_FIELDS,
  wind_speed_unit: 'kmh',
  timezone: 'auto',
  forecast_days: 8,
} as const;

export async function fetchWeather(params: WeatherRequestParams): Promise<WeatherApiResponse> {
  const { data } = await apiClient.get<unknown>(BASE_URL, {
    params: {
      latitude: params.latitude,
      longitude: params.longitude,
      temperature_unit: params.unit,
      ...STATIC_PARAMS,
    },
  });

  return weatherApiResponseSchema.parse(data);
}
