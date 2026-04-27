import { apiClient } from "../../../shared/api/axiosInstance";
import {
  type WeatherApiResponse,
  weatherApiResponseSchema,
  type WeatherRequestParams,
} from "./weatherApi.types";

const BASE_URL =
  import.meta.env.VITE_API_URL || "https://api.open-meteo.com/v1/forecast";

export async function fetchWeather(
  params: WeatherRequestParams,
): Promise<WeatherApiResponse> {
  const { data } = await apiClient.get<unknown>(BASE_URL, {
    params: {
      latitude: params.latitude,
      longitude: params.longitude,
      current:
        "temperature_2m,weather_code,wind_speed_10m,wind_direction_10m,relative_humidity_2m,apparent_temperature,surface_pressure,visibility,precipitation,uv_index",
      hourly: "temperature_2m,precipitation_probability,weather_code",
      daily:
        "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,sunrise,sunset,uv_index_max,apparent_temperature_max,apparent_temperature_min",
      temperature_unit: params.unit,
      wind_speed_unit: "kmh",
      timezone: "auto",
      forecast_days: 7,
    },
  });

  return weatherApiResponseSchema.parse(data);
}
