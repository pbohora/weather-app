export type WeatherIcon =
  | 'sun'
  | 'moon'
  | 'cloud'
  | 'cloud-sun'
  | 'cloud-moon'
  | 'cloud-rain'
  | 'cloud-lightning'
  | 'snowflake';
export type TrendDirection = 'up' | 'down' | 'neutral';

export interface WeatherDay {
  date: string;
  maxTemp: number;
  minTemp: number;
  weatherCode: number;
  icon: WeatherIcon;
  precipitation: number;
  precipitationProb: number;
  maxWind: number;
  sunrise: string;
  sunset: string;
  uvIndex: number;
  apparentMaxTemp: number;
  apparentMinTemp: number;
}

export interface WeatherHour {
  time: string;
  temp: number;
  precipitationProb: number;
  weatherCode: number;
  icon: WeatherIcon;
}

export interface CurrentWeather {
  temp: number;
  apparentTemp: number;
  weatherCode: number;
  icon: WeatherIcon;
  windSpeed: number;
  windDirection: number;
  humidity: number;
  precipitation: number;
  pressure: number;
  visibility: number;
  uvIndex: number;
  isDay: boolean;
}

export interface WeatherDomain {
  current: CurrentWeather;
  daily: WeatherDay[];
  hourly: WeatherHour[];
  timezone: string;
}
