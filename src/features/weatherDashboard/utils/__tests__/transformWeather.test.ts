import { describe, it, expect } from 'vitest';
import { transformWeather } from '../transformWeather';
import { makeRawWeather } from '../../../../test/fixtures';

describe('transformWeather', () => {
  describe('current weather', () => {
    it('maps temperature correctly', () => {
      const result = transformWeather(makeRawWeather());
      expect(result.current.temp).toBe(20);
    });

    it('maps apparent temperature correctly', () => {
      const result = transformWeather(makeRawWeather());
      expect(result.current.apparentTemp).toBe(18);
    });

    it('maps weather code correctly', () => {
      const result = transformWeather(makeRawWeather());
      expect(result.current.weatherCode).toBe(0);
    });

    it('maps wind speed correctly', () => {
      const result = transformWeather(makeRawWeather());
      expect(result.current.windSpeed).toBe(10);
    });

    it('maps wind direction correctly', () => {
      const result = transformWeather(makeRawWeather());
      expect(result.current.windDirection).toBe(180);
    });

    it('maps humidity correctly', () => {
      const result = transformWeather(makeRawWeather());
      expect(result.current.humidity).toBe(60);
    });

    it('maps precipitation correctly', () => {
      const result = transformWeather(makeRawWeather());
      expect(result.current.precipitation).toBe(0);
    });

    it('maps uv index correctly', () => {
      const result = transformWeather(makeRawWeather());
      expect(result.current.uvIndex).toBe(3);
    });

    it('converts visibility from meters to km', () => {
      const result = transformWeather(makeRawWeather());
      expect(result.current.visibility).toBe(10); // 10000m -> 10km
    });

    it('defaults wind direction to 0 when undefined', () => {
      const raw = makeRawWeather();
      raw.current.wind_direction_10m = undefined;
      const result = transformWeather(raw);
      expect(result.current.windDirection).toBe(0);
    });

    it('defaults precipitation to 0 when undefined', () => {
      const raw = makeRawWeather();
      raw.current.precipitation = undefined;
      const result = transformWeather(raw);
      expect(result.current.precipitation).toBe(0);
    });

    it('defaults pressure to 1013 when undefined', () => {
      const raw = makeRawWeather();
      raw.current.surface_pressure = undefined;
      const result = transformWeather(raw);
      expect(result.current.pressure).toBe(1013);
    });

    it('defaults visibility to 10km when undefined', () => {
      const raw = makeRawWeather();
      raw.current.visibility = undefined;
      const result = transformWeather(raw);
      expect(result.current.visibility).toBe(10);
    });

    it('defaults uv index to 0 when undefined', () => {
      const raw = makeRawWeather();
      raw.current.uv_index = undefined;
      const result = transformWeather(raw);
      expect(result.current.uvIndex).toBe(0);
    });
  });

  describe('isDay detection', () => {
    it('marks isDay true when current time is between sunrise and sunset', () => {
      const result = transformWeather(makeRawWeather()); // noon, sunrise 04:00, sunset 22:00
      expect(result.current.isDay).toBe(true);
    });

    it('marks isDay false when current time is before sunrise', () => {
      const raw = makeRawWeather();
      raw.current.time = '2024-06-15T03:00:00';
      const result = transformWeather(raw);
      expect(result.current.isDay).toBe(false);
    });

    it('marks isDay false when current time is after sunset', () => {
      const raw = makeRawWeather();
      raw.current.time = '2024-06-15T23:00:00';
      const result = transformWeather(raw);
      expect(result.current.isDay).toBe(false);
    });

    it('defaults isDay to true when sunrise array is empty', () => {
      const raw = makeRawWeather();
      raw.daily.sunrise = [];
      raw.daily.sunset = [];
      const result = transformWeather(raw);
      expect(result.current.isDay).toBe(true);
    });
  });

  describe('icon mapping (mapWmoToIcon)', () => {
    it('maps code 0 to "sun" during the day', () => {
      const result = transformWeather(makeRawWeather()); // isDay=true
      expect(result.current.icon).toBe('sun');
    });

    it('maps code 0 to "moon" at night', () => {
      const raw = makeRawWeather();
      raw.current.time = '2024-06-15T23:00:00';
      raw.current.weather_code = 0;
      const result = transformWeather(raw);
      expect(result.current.icon).toBe('moon');
    });

    it('maps code 1 to "cloud-sun" during the day', () => {
      const raw = makeRawWeather();
      raw.current.weather_code = 1;
      const result = transformWeather(raw);
      expect(result.current.icon).toBe('cloud-sun');
    });

    it('maps code 2 to "cloud-sun" during the day', () => {
      const raw = makeRawWeather();
      raw.current.weather_code = 2;
      const result = transformWeather(raw);
      expect(result.current.icon).toBe('cloud-sun');
    });

    it('maps code 3 to "cloud-sun" during the day', () => {
      const raw = makeRawWeather();
      raw.current.weather_code = 3;
      const result = transformWeather(raw);
      expect(result.current.icon).toBe('cloud-sun');
    });

    it('maps code 45 to "cloud"', () => {
      const raw = makeRawWeather();
      raw.current.weather_code = 45;
      const result = transformWeather(raw);
      expect(result.current.icon).toBe('cloud');
    });

    it('maps code 48 to "cloud"', () => {
      const raw = makeRawWeather();
      raw.current.weather_code = 48;
      const result = transformWeather(raw);
      expect(result.current.icon).toBe('cloud');
    });

    it('maps code 51 to "cloud-rain"', () => {
      const raw = makeRawWeather();
      raw.current.weather_code = 51;
      const result = transformWeather(raw);
      expect(result.current.icon).toBe('cloud-rain');
    });

    it('maps code 67 to "cloud-rain"', () => {
      const raw = makeRawWeather();
      raw.current.weather_code = 67;
      const result = transformWeather(raw);
      expect(result.current.icon).toBe('cloud-rain');
    });

    it('maps code 80 to "cloud-rain"', () => {
      const raw = makeRawWeather();
      raw.current.weather_code = 80;
      const result = transformWeather(raw);
      expect(result.current.icon).toBe('cloud-rain');
    });

    it('maps code 71 to "snowflake"', () => {
      const raw = makeRawWeather();
      raw.current.weather_code = 71;
      const result = transformWeather(raw);
      expect(result.current.icon).toBe('snowflake');
    });

    it('maps code 77 to "snowflake"', () => {
      const raw = makeRawWeather();
      raw.current.weather_code = 77;
      const result = transformWeather(raw);
      expect(result.current.icon).toBe('snowflake');
    });

    it('maps code 95 to "cloud-lightning"', () => {
      const raw = makeRawWeather();
      raw.current.weather_code = 95;
      const result = transformWeather(raw);
      expect(result.current.icon).toBe('cloud-lightning');
    });

    it('maps code 99 to "cloud-lightning"', () => {
      const raw = makeRawWeather();
      raw.current.weather_code = 99;
      const result = transformWeather(raw);
      expect(result.current.icon).toBe('cloud-lightning');
    });
  });

  describe('daily forecast', () => {
    it('returns correct number of daily entries', () => {
      const result = transformWeather(makeRawWeather());
      expect(result.daily).toHaveLength(2);
    });

    it('maps daily date correctly', () => {
      const result = transformWeather(makeRawWeather());
      expect(result.daily[0]!.date).toBe('2024-06-15');
    });

    it('maps daily max temperature', () => {
      const result = transformWeather(makeRawWeather());
      expect(result.daily[0]!.maxTemp).toBe(22);
    });

    it('maps daily min temperature', () => {
      const result = transformWeather(makeRawWeather());
      expect(result.daily[0]!.minTemp).toBe(14);
    });

    it('maps daily sunrise', () => {
      const result = transformWeather(makeRawWeather());
      expect(result.daily[0]!.sunrise).toBe('2024-06-15T04:00:00');
    });

    it('maps daily sunset', () => {
      const result = transformWeather(makeRawWeather());
      expect(result.daily[0]!.sunset).toBe('2024-06-15T22:00:00');
    });

    it('maps daily uv index', () => {
      const result = transformWeather(makeRawWeather());
      expect(result.daily[0]!.uvIndex).toBe(3);
    });

    it('maps daily precipitation sum', () => {
      const result = transformWeather(makeRawWeather());
      expect(result.daily[1]!.precipitation).toBe(1);
    });

    it('always uses daytime icon for daily entries', () => {
      const result = transformWeather(makeRawWeather());
      // code 0 -> daytime -> 'sun'
      expect(result.daily[0]!.icon).toBe('sun');
    });
  });

  describe('hourly forecast', () => {
    it('returns correct number of hourly entries', () => {
      const result = transformWeather(makeRawWeather());
      expect(result.hourly).toHaveLength(2);
    });

    it('maps hourly time correctly', () => {
      const result = transformWeather(makeRawWeather());
      expect(result.hourly[0]!.time).toBe('2024-06-15T00:00:00');
    });

    it('maps hourly temperature', () => {
      const result = transformWeather(makeRawWeather());
      expect(result.hourly[0]!.temp).toBe(15);
    });

    it('maps hourly precipitation probability', () => {
      const result = transformWeather(makeRawWeather());
      expect(result.hourly[1]!.precipitationProb).toBe(20);
    });

    it('maps hourly weather code', () => {
      const result = transformWeather(makeRawWeather());
      expect(result.hourly[1]!.weatherCode).toBe(1);
    });

    it('uses moon icon for night hours (before sunrise)', () => {
      // 00:00 is before sunrise at 04:00 -> night
      const result = transformWeather(makeRawWeather());
      expect(result.hourly[0]!.icon).toBe('moon'); // code 0 at night
    });
  });

  describe('timezone', () => {
    it('passes timezone through unchanged', () => {
      const result = transformWeather(makeRawWeather());
      expect(result.timezone).toBe('Europe/Helsinki');
    });
  });
});
