import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CurrentWeather from '../index';
import { mockCurrentWeather, mockLocation } from '../../../../../test/fixtures';

const defaultProps = {
  currentWeather: mockCurrentWeather,
  location: mockLocation,
  unit: 'celsius' as const,
  sunrise: '2024-06-15T04:30:00',
  sunset: '2024-06-15T22:00:00',
};

describe('CurrentWeather', () => {
  describe('location display', () => {
    it('renders the city name', () => {
      render(<CurrentWeather {...defaultProps} />);
      expect(screen.getByText(/Helsinki/)).toBeInTheDocument();
    });

    it('renders the country code', () => {
      render(<CurrentWeather {...defaultProps} />);
      expect(screen.getByText(/FI/)).toBeInTheDocument();
    });

    it('renders location as "City, Country" format', () => {
      render(<CurrentWeather {...defaultProps} />);
      expect(screen.getByText('Helsinki, FI')).toBeInTheDocument();
    });

    it('renders a different city correctly', () => {
      const londonLocation = { ...mockLocation, name: 'London', country: 'GB' };
      render(<CurrentWeather {...defaultProps} location={londonLocation} />);
      expect(screen.getByText('London, GB')).toBeInTheDocument();
    });
  });

  describe('temperature display', () => {
    it('renders the current temperature in celsius', () => {
      render(<CurrentWeather {...defaultProps} />);
      expect(screen.getByText('20°C')).toBeInTheDocument();
    });

    it('renders the apparent temperature in celsius', () => {
      render(<CurrentWeather {...defaultProps} />);
      expect(screen.getByText('18°C')).toBeInTheDocument();
    });

    it('renders temperature in fahrenheit when unit is fahrenheit', () => {
      render(<CurrentWeather {...defaultProps} unit="fahrenheit" />);
      expect(screen.getByText('20°F')).toBeInTheDocument();
    });

    it('renders "Feels like" label', () => {
      render(<CurrentWeather {...defaultProps} />);
      expect(screen.getByText('Feels like')).toBeInTheDocument();
    });

    it('renders negative temperatures correctly', () => {
      const coldWeather = { ...mockCurrentWeather, temp: -5, apparentTemp: -8 };
      render(<CurrentWeather {...defaultProps} currentWeather={coldWeather} />);
      expect(screen.getByText('-5°C')).toBeInTheDocument();
    });
  });

  describe('weather description', () => {
    it('renders "Clear Sky" for weather code 0', () => {
      render(<CurrentWeather {...defaultProps} />);
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Clear Sky');
    });

    it('renders "Thunderstorm" for weather code 95', () => {
      const stormyWeather = { ...mockCurrentWeather, weatherCode: 95 };
      render(<CurrentWeather {...defaultProps} currentWeather={stormyWeather} />);
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Thunderstorm');
    });

    it('renders "Heavy Rain" for weather code 65', () => {
      const rainyWeather = { ...mockCurrentWeather, weatherCode: 65 };
      render(<CurrentWeather {...defaultProps} currentWeather={rainyWeather} />);
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Heavy Rain');
    });

    it('renders "Uncertain Weather" for unknown weather codes', () => {
      const unknownWeather = { ...mockCurrentWeather, weatherCode: 999 };
      render(<CurrentWeather {...defaultProps} currentWeather={unknownWeather} />);
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Uncertain Weather');
    });
  });

  describe('weather stats', () => {
    it('renders Wind Speed stat', () => {
      render(<CurrentWeather {...defaultProps} />);
      expect(screen.getByText('Wind Speed')).toBeInTheDocument();
      expect(screen.getByText('15 km/h')).toBeInTheDocument();
    });

    it('renders wind direction stat', () => {
      render(<CurrentWeather {...defaultProps} />);
      expect(screen.getByText('Direction')).toBeInTheDocument();
      expect(screen.getByText('180°')).toBeInTheDocument();
    });

    it('renders humidity stat', () => {
      render(<CurrentWeather {...defaultProps} />);
      expect(screen.getByText('Humidity')).toBeInTheDocument();
      expect(screen.getByText('65%')).toBeInTheDocument();
    });

    it('renders precipitation stat', () => {
      render(<CurrentWeather {...defaultProps} />);
      expect(screen.getByText('Precipitation')).toBeInTheDocument();
      expect(screen.getByText('0 mm')).toBeInTheDocument();
    });

    it('renders UV Index stat', () => {
      render(<CurrentWeather {...defaultProps} />);
      expect(screen.getByText('UV Index')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('renders Visibility stat', () => {
      render(<CurrentWeather {...defaultProps} />);
      expect(screen.getByText('Visibility')).toBeInTheDocument();
      expect(screen.getByText('10 km')).toBeInTheDocument();
    });
  });

  describe('sunrise and sunset', () => {
    it('renders Sunrise label', () => {
      render(<CurrentWeather {...defaultProps} />);
      expect(screen.getByText('Sunrise')).toBeInTheDocument();
    });

    it('renders Sunset label', () => {
      render(<CurrentWeather {...defaultProps} />);
      expect(screen.getByText('Sunset')).toBeInTheDocument();
    });

    it('formats sunrise time in HH:MM format', () => {
      render(<CurrentWeather {...defaultProps} />);
      // formatTime('2024-06-15T04:30:00') -> '04:30'
      expect(screen.getByText('04:30')).toBeInTheDocument();
    });
  });

  describe('renders as a section element', () => {
    it('wraps content in a section', () => {
      const { container } = render(<CurrentWeather {...defaultProps} />);
      expect(container.querySelector('section')).toBeInTheDocument();
    });
  });
});
