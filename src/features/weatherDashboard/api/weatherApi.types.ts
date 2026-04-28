import { z } from 'zod';

export const weatherApiResponseSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  timezone: z.string(),
  current: z.object({
    time: z.string(),
    temperature_2m: z.number(),
    weather_code: z.number(),
    wind_speed_10m: z.number(),
    wind_direction_10m: z.number().optional(),
    relative_humidity_2m: z.number(),
    apparent_temperature: z.number(),
    surface_pressure: z.number().optional(),
    visibility: z.number().optional(),
    precipitation: z.number().optional(),
    uv_index: z.number().optional(),
  }),
  hourly: z.object({
    time: z.array(z.string()),
    temperature_2m: z.array(z.number()),
    precipitation_probability: z.array(z.number()),
    weather_code: z.array(z.number()),
  }),
  daily: z.object({
    time: z.array(z.string()),
    weather_code: z.array(z.number()),
    temperature_2m_max: z.array(z.number()),
    temperature_2m_min: z.array(z.number()),
    precipitation_sum: z.array(z.number()),
    precipitation_probability_max: z.array(z.number()),
    wind_speed_10m_max: z.array(z.number()),
    sunrise: z.array(z.string()),
    sunset: z.array(z.string()),
    uv_index_max: z.array(z.number()),
    apparent_temperature_max: z.array(z.number()),
    apparent_temperature_min: z.array(z.number()),
  }),
});

export type WeatherApiResponse = z.infer<typeof weatherApiResponseSchema>;

export type TemperatureUnit = 'celsius' | 'fahrenheit';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface WeatherRequestParams extends Coordinates {
  unit: TemperatureUnit;
}
