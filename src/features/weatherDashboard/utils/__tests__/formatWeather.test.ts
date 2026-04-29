import { describe, it, expect } from 'vitest';
import { getWmoDescription, formatTemp, formatWind, formatDate, formatTime } from '../formatWeather';

describe('getWmoDescription', () => {
  it('returns "Clear Sky" for code 0', () => {
    expect(getWmoDescription(0)).toBe('Clear Sky');
  });

  it('returns "Mainly Clear" for code 1', () => {
    expect(getWmoDescription(1)).toBe('Mainly Clear');
  });

  it('returns "Partly Cloudy" for code 2', () => {
    expect(getWmoDescription(2)).toBe('Partly Cloudy');
  });

  it('returns "Overcast" for code 3', () => {
    expect(getWmoDescription(3)).toBe('Overcast');
  });

  it('returns "Foggy" for code 45', () => {
    expect(getWmoDescription(45)).toBe('Foggy');
  });

  it('returns "Depositing Rime Fog" for code 48', () => {
    expect(getWmoDescription(48)).toBe('Depositing Rime Fog');
  });

  it('returns "Light Drizzle" for code 51', () => {
    expect(getWmoDescription(51)).toBe('Light Drizzle');
  });

  it('returns "Moderate Drizzle" for code 53', () => {
    expect(getWmoDescription(53)).toBe('Moderate Drizzle');
  });

  it('returns "Dense Drizzle" for code 55', () => {
    expect(getWmoDescription(55)).toBe('Dense Drizzle');
  });

  it('returns "Slight Rain" for code 61', () => {
    expect(getWmoDescription(61)).toBe('Slight Rain');
  });

  it('returns "Moderate Rain" for code 63', () => {
    expect(getWmoDescription(63)).toBe('Moderate Rain');
  });

  it('returns "Heavy Rain" for code 65', () => {
    expect(getWmoDescription(65)).toBe('Heavy Rain');
  });

  it('returns "Slight Snow Fall" for code 71', () => {
    expect(getWmoDescription(71)).toBe('Slight Snow Fall');
  });

  it('returns "Moderate Snow Fall" for code 73', () => {
    expect(getWmoDescription(73)).toBe('Moderate Snow Fall');
  });

  it('returns "Heavy Snow Fall" for code 75', () => {
    expect(getWmoDescription(75)).toBe('Heavy Snow Fall');
  });

  it('returns "Snow Grains" for code 77', () => {
    expect(getWmoDescription(77)).toBe('Snow Grains');
  });

  it('returns "Slight Rain Showers" for code 80', () => {
    expect(getWmoDescription(80)).toBe('Slight Rain Showers');
  });

  it('returns "Violent Rain Showers" for code 82', () => {
    expect(getWmoDescription(82)).toBe('Violent Rain Showers');
  });

  it('returns "Thunderstorm" for code 95', () => {
    expect(getWmoDescription(95)).toBe('Thunderstorm');
  });

  it('returns "Thunderstorm with Slight Hail" for code 96', () => {
    expect(getWmoDescription(96)).toBe('Thunderstorm with Slight Hail');
  });

  it('returns "Thunderstorm with Heavy Hail" for code 99', () => {
    expect(getWmoDescription(99)).toBe('Thunderstorm with Heavy Hail');
  });

  it('returns "Uncertain Weather" for unknown code', () => {
    expect(getWmoDescription(999)).toBe('Uncertain Weather');
  });

  it('returns "Uncertain Weather" for negative code', () => {
    expect(getWmoDescription(-1)).toBe('Uncertain Weather');
  });
});

describe('formatTemp', () => {
  it('formats celsius temperature with °C suffix', () => {
    expect(formatTemp(25, 'celsius')).toBe('25°C');
  });

  it('formats fahrenheit temperature with °F suffix', () => {
    expect(formatTemp(77, 'fahrenheit')).toBe('77°F');
  });

  it('rounds decimal celsius values', () => {
    expect(formatTemp(24.6, 'celsius')).toBe('25°C');
  });

  it('rounds decimal fahrenheit values', () => {
    expect(formatTemp(98.4, 'fahrenheit')).toBe('98°F');
  });

  it('handles negative temperatures', () => {
    expect(formatTemp(-10, 'celsius')).toBe('-10°C');
  });

  it('handles zero temperature', () => {
    expect(formatTemp(0, 'celsius')).toBe('0°C');
  });

  it('rounds 0.5 up', () => {
    expect(formatTemp(0.5, 'celsius')).toBe('1°C');
  });
});

describe('formatWind', () => {
  it('formats wind speed with km/h suffix', () => {
    expect(formatWind(15)).toBe('15 km/h');
  });

  it('rounds decimal wind speeds', () => {
    expect(formatWind(15.7)).toBe('16 km/h');
  });

  it('handles zero wind speed', () => {
    expect(formatWind(0)).toBe('0 km/h');
  });

  it('handles large wind speeds', () => {
    expect(formatWind(120)).toBe('120 km/h');
  });
});

describe('formatDate', () => {
  it('returns a human-readable date string', () => {
    const result = formatDate('2024-06-15');
    // Actual output: "Sat, Jun 15"
    expect(result).toMatch(/\w{3},?\s\w{3}\s\d{1,2}/);
  });

  it('includes the day of the week', () => {
    const result = formatDate('2024-06-15'); // Saturday
    expect(result).toMatch(/Sat/);
  });

  it('includes the month abbreviation', () => {
    const result = formatDate('2024-06-15');
    expect(result).toMatch(/Jun/);
  });
});

describe('formatTime', () => {
  it('returns time in HH:MM format', () => {
    const result = formatTime('2024-06-15T08:30:00');
    expect(result).toMatch(/^\d{2}:\d{2}$/);
  });

  it('uses 24-hour format', () => {
    const result = formatTime('2024-06-15T14:45:00');
    expect(result).toMatch(/14:\d{2}/);
  });

  it('zero-pads hours below 10', () => {
    const result = formatTime('2024-06-15T07:05:00');
    expect(result).toMatch(/^0\d:\d{2}$/);
  });
});
