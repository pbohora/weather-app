import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import HourlyForecast from '../index';
import type { WeatherHour } from '../../../types/weather.types';

// make static now to test 24-hour slice
const FAKE_NOW = new Date('2024-06-15T10:00:00');
beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(FAKE_NOW);
});
afterEach(() => {
  vi.useRealTimers();
});

function makeHour(hour: number, overrides: Partial<WeatherHour> = {}): WeatherHour {
  const time = `2024-06-15T${String(hour).padStart(2, '0')}:00:00`;
  return {
    time,
    temp: 20 + hour,
    apparentTemp: 18 + hour,
    precipitationProb: 0,
    weatherCode: 0,
    icon: 'sun',
    ...overrides,
  };
}

// 48 hours spanning two days — component slices to next 24 from current hour
const hourlyData: WeatherHour[] = [
  ...Array.from({ length: 24 }, (_, i) => makeHour(i)),
  ...Array.from({ length: 24 }, (_, i) => makeHour(i, { time: `2024-06-16T${String(i).padStart(2, '0')}:00:00` })),
];

const defaultProps = { hourlyData, unit: 'celsius' as const };

describe('HourlyForecast', () => {
  describe('rendering', () => {
    it('renders the section heading', () => {
      render(<HourlyForecast {...defaultProps} />);
      expect(screen.getByText('Hourly Forecast')).toBeInTheDocument();
    });

    it('renders inside a section element', () => {
      const { container } = render(<HourlyForecast {...defaultProps} />);
      expect(container.querySelector('section')).toBeInTheDocument();
    });

    it('renders exactly 24 hourly cards from the current hour onwards', () => {
      render(<HourlyForecast {...defaultProps} />);
      // FAKE_NOW is 10:00 — so hours 10..24 (14 on day 1) + 10 from day 2 = 24 cards
      const times = screen.getAllByText(/^\d{2}:\d{2}$/);
      expect(times).toHaveLength(24);
    });

    it('does not render same-day hours before the current hour', () => {
      render(<HourlyForecast {...defaultProps} />);
      const times = screen.getAllByText(/^\d{2}:\d{2}$/);
      // First card must be the current hour, not an earlier one
      expect(times[0]).toHaveTextContent('10:00');
      // Hours 00:00–09:00 on day 1 must not appear as the first entry
      expect(times[0]).not.toHaveTextContent('00:00');
      expect(times[0]).not.toHaveTextContent('05:00');
    });

    it('renders the current hour as the first card', () => {
      render(<HourlyForecast {...defaultProps} />);
      const times = screen.getAllByText(/^\d{2}:\d{2}$/);
      expect(times[0]).toHaveTextContent('10:00');
    });
  });

  describe('temperature display', () => {
    it('renders temperatures in celsius', () => {
      render(<HourlyForecast {...defaultProps} />);
      // hour 10 → temp 30 (20 + 10)
      expect(screen.getByText('30°C')).toBeInTheDocument();
    });

    it('renders temperatures in fahrenheit', () => {
      render(<HourlyForecast {...defaultProps} unit="fahrenheit" />);
      expect(screen.getByText('30°F')).toBeInTheDocument();
    });

    it('renders feels-like temperature for each card', () => {
      render(<HourlyForecast {...defaultProps} />);
      // hour 10 → apparentTemp 28 (18 + 10)
      expect(screen.getByText('Feels 28°C')).toBeInTheDocument();
    });
  });

  describe('precipitation', () => {
    it('renders precipitation percentage when it is greater than 0', () => {
      const dataWithRain = [
        ...Array.from({ length: 24 }, (_, i) => makeHour(i, { precipitationProb: i >= 10 ? 40 : 0 })),
      ];
      render(<HourlyForecast hourlyData={dataWithRain} unit="celsius" />);
      expect(screen.getAllByText('40%').length).toBeGreaterThan(0);
    });

    it('does not render precipitation when probability is 0', () => {
      render(<HourlyForecast {...defaultProps} />);
      expect(screen.queryByText('0%')).not.toBeInTheDocument();
    });

    it('renders precipitation for only the hours that have it', () => {
      const mixed = Array.from({ length: 24 }, (_, i) => makeHour(i, { precipitationProb: i === 12 ? 75 : 0 }));
      render(<HourlyForecast hourlyData={mixed} unit="celsius" />);
      expect(screen.getByText('75%')).toBeInTheDocument();
      expect(screen.queryByText('0%')).not.toBeInTheDocument();
    });
  });

  describe('navigation buttons', () => {
    it('renders the scroll left button', () => {
      render(<HourlyForecast {...defaultProps} />);
      expect(screen.getByRole('button', { name: /scroll left/i })).toBeInTheDocument();
    });

    it('renders the scroll right button', () => {
      render(<HourlyForecast {...defaultProps} />);
      expect(screen.getByRole('button', { name: /scroll right/i })).toBeInTheDocument();
    });

    it('calls scrollBy on the container when right button is clicked', () => {
      render(<HourlyForecast {...defaultProps} />);
      const scrollBy = vi.fn();
      // Attach mock to the scroll container (first div inside section)
      const container = document.querySelector('[class*="hourlyList"]') as HTMLElement;
      if (container) container.scrollBy = scrollBy;

      fireEvent.click(screen.getByRole('button', { name: /scroll right/i }));
      expect(scrollBy).toHaveBeenCalledWith({ left: 400, behavior: 'smooth' });
    });

    it('calls scrollBy with negative value when left button is clicked', () => {
      render(<HourlyForecast {...defaultProps} />);
      const scrollBy = vi.fn();
      const container = document.querySelector('[class*="hourlyList"]') as HTMLElement;
      if (container) container.scrollBy = scrollBy;

      fireEvent.click(screen.getByRole('button', { name: /scroll left/i }));
      expect(scrollBy).toHaveBeenCalledWith({ left: -400, behavior: 'smooth' });
    });
  });

  describe('edge cases', () => {
    it('renders nothing when hourlyData is empty', () => {
      render(<HourlyForecast hourlyData={[]} unit="celsius" />);
      expect(screen.queryByText(/^\d{2}:\d{2}$/)).not.toBeInTheDocument();
    });

    it('renders fewer than 24 cards when less data is available', () => {
      const short = Array.from({ length: 5 }, (_, i) => makeHour(i + 10));
      render(<HourlyForecast hourlyData={short} unit="celsius" />);
      const times = screen.getAllByText(/^\d{2}:\d{2}$/);
      expect(times).toHaveLength(5);
    });
  });
});
