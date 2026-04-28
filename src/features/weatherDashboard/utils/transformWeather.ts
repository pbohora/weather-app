import { type WeatherApiResponse } from '../api/weatherApi.types';
import { type WeatherDomain, type WeatherIcon } from '../types/weather.types';

function mapWmoToIcon(code: number, isDay: boolean): WeatherIcon {
  if (code === 0) return isDay ? 'sun' : 'moon';
  if (code === 1 || code === 2 || code === 3) return isDay ? 'cloud-sun' : 'cloud-moon';
  if (code >= 45 && code <= 48) return 'cloud';
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return 'cloud-rain';
  if (code >= 71 && code <= 77) return 'snowflake';
  if (code >= 95) return 'cloud-lightning';
  return 'cloud';
}

export function transformWeather(raw: WeatherApiResponse): WeatherDomain {
  const isDay =
    Array.isArray(raw.daily.sunrise) && raw.daily.sunrise.length > 0
      ? new Date(raw.current.time) > new Date(raw.daily.sunrise[0]!) &&
        new Date(raw.current.time) < new Date(raw.daily.sunset[0]!)
      : true;

  const current = {
    temp: raw.current.temperature_2m,
    apparentTemp: raw.current.apparent_temperature,
    weatherCode: raw.current.weather_code,
    icon: mapWmoToIcon(raw.current.weather_code, isDay),
    windSpeed: raw.current.wind_speed_10m,
    windDirection: raw.current.wind_direction_10m ?? 0,
    humidity: raw.current.relative_humidity_2m,
    precipitation: raw.current.precipitation ?? 0,
    pressure: raw.current.surface_pressure ?? 1013,
    visibility: (raw.current.visibility ?? 10000) / 1000,
    uvIndex: raw.current.uv_index ?? 0,
    isDay,
  };

  const daily = raw.daily.time.map((d, index) => ({
    date: d,
    maxTemp: raw.daily.temperature_2m_max[index] ?? 0,
    minTemp: raw.daily.temperature_2m_min[index] ?? 0,
    weatherCode: raw.daily.weather_code[index] ?? 0,
    icon: mapWmoToIcon(raw.daily.weather_code[index] ?? 0, true),
    precipitation: raw.daily.precipitation_sum[index] ?? 0,
    precipitationProb: raw.daily.precipitation_probability_max[index] ?? 0,
    maxWind: raw.daily.wind_speed_10m_max[index] ?? 0,
    sunrise: raw.daily.sunrise[index] ?? '',
    sunset: raw.daily.sunset[index] ?? '',
    uvIndex: raw.daily.uv_index_max[index] ?? 0,
    apparentMaxTemp: raw.daily.apparent_temperature_max[index] ?? 0,
    apparentMinTemp: raw.daily.apparent_temperature_min[index] ?? 0,
  }));

  const hourly = raw.hourly.time.map((t, index) => {
    const dayIndex = Math.floor(index / 24);
    const hourDate = new Date(t);
    const daySunrise = new Date(raw.daily.sunrise[dayIndex] ?? 0);
    const daySunset = new Date(raw.daily.sunset[dayIndex] ?? 0);
    const hourIsDay = hourDate >= daySunrise && hourDate < daySunset;

    return {
      time: t,
      temp: raw.hourly.temperature_2m[index] ?? 0,
      precipitationProb: raw.hourly.precipitation_probability[index] ?? 0,
      weatherCode: raw.hourly.weather_code[index] ?? 0,
      icon: mapWmoToIcon(raw.hourly.weather_code[index] ?? 0, hourIsDay),
    };
  });

  return {
    current,
    daily,
    hourly,
    timezone: raw.timezone,
  };
}
