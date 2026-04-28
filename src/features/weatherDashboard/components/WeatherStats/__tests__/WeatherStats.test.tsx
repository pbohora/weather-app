import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import WeatherStats from '../index';
import type { ReactNode } from 'react';
import { mockStatsData } from '../../../../../test/fixtures';

const mockIcon = (label: string): ReactNode => <svg aria-label={label} />;

const defaultStats = mockStatsData.map((s) => ({ ...s, icon: mockIcon(s.label) }));

describe('WeatherStats', () => {
  describe('rendering stats', () => {
    it('renders all stat labels', () => {
      render(<WeatherStats stats={defaultStats} />);
      expect(screen.getByText('Wind Speed')).toBeInTheDocument();
      expect(screen.getByText('Humidity')).toBeInTheDocument();
      expect(screen.getByText('UV Index')).toBeInTheDocument();
    });

    it('renders all stat values', () => {
      render(<WeatherStats stats={defaultStats} />);
      expect(screen.getByText('15 km/h')).toBeInTheDocument();
      expect(screen.getByText('65%')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('renders numeric stat values correctly', () => {
      render(<WeatherStats stats={[{ label: 'UV Index', value: 0, icon: null }]} />);
      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('renders an empty stats list without crashing', () => {
      render(<WeatherStats stats={[]} />);
      expect(screen.queryByText('Wind Speed')).not.toBeInTheDocument();
    });

    it('renders the correct number of stat items', () => {
      render(<WeatherStats stats={defaultStats} />);
      // Each stat renders a label element
      const labels = screen.getAllByText(/Wind Speed|Humidity|UV Index/);
      expect(labels).toHaveLength(3);
    });
  });

  describe('sunrise and sunset', () => {
    it('renders sunrise when provided', () => {
      render(<WeatherStats stats={defaultStats} sunrise="06:15" />);
      expect(screen.getByText('Sunrise')).toBeInTheDocument();
      expect(screen.getByText('06:15')).toBeInTheDocument();
    });

    it('renders sunset when provided', () => {
      render(<WeatherStats stats={defaultStats} sunset="21:45" />);
      expect(screen.getByText('Sunset')).toBeInTheDocument();
      expect(screen.getByText('21:45')).toBeInTheDocument();
    });

    it('renders both sunrise and sunset when both provided', () => {
      render(<WeatherStats stats={defaultStats} sunrise="06:15" sunset="21:45" />);
      expect(screen.getByText('Sunrise')).toBeInTheDocument();
      expect(screen.getByText('Sunset')).toBeInTheDocument();
    });

    it('does not render sunrise section when neither sunrise nor sunset is provided', () => {
      render(<WeatherStats stats={defaultStats} />);
      expect(screen.queryByText('Sunrise')).not.toBeInTheDocument();
      expect(screen.queryByText('Sunset')).not.toBeInTheDocument();
    });

    it('renders sunrise section when only sunrise is given', () => {
      render(<WeatherStats stats={defaultStats} sunrise="06:15" />);
      expect(screen.getByText('Sunrise')).toBeInTheDocument();
      expect(screen.queryByText('Sunset')).not.toBeInTheDocument();
    });

    it('renders sunset section when only sunset is given', () => {
      render(<WeatherStats stats={defaultStats} sunset="21:45" />);
      expect(screen.queryByText('Sunrise')).not.toBeInTheDocument();
      expect(screen.getByText('Sunset')).toBeInTheDocument();
    });
  });

  describe('className prop', () => {
    it('renders without crashing when className is provided', () => {
      render(<WeatherStats stats={defaultStats} className="custom" />);
      expect(screen.getByText('Wind Speed')).toBeInTheDocument();
    });

    it('renders without crashing when className is omitted', () => {
      render(<WeatherStats stats={defaultStats} />);
      expect(screen.getByText('Wind Speed')).toBeInTheDocument();
    });
  });

  describe('icon rendering', () => {
    it('renders stat icons', () => {
      render(<WeatherStats stats={defaultStats} />);
      expect(screen.getByLabelText('Wind Speed')).toBeInTheDocument();
      expect(screen.getByLabelText('Humidity')).toBeInTheDocument();
    });

    it('handles null icons without crashing', () => {
      const statsWithNullIcon = [{ label: 'Pressure', value: '1013 hPa', icon: null }];
      render(<WeatherStats stats={statsWithNullIcon} />);
      expect(screen.getByText('Pressure')).toBeInTheDocument();
    });
  });

  describe('multiple stats', () => {
    it('renders 6 stats as used in CurrentWeather', () => {
      const sixStats = [
        { label: 'Wind Speed', value: '10 km/h', icon: null },
        { label: 'Direction', value: '180°', icon: null },
        { label: 'Humidity', value: '60%', icon: null },
        { label: 'Precipitation', value: '0 mm', icon: null },
        { label: 'UV Index', value: 3, icon: null },
        { label: 'Visibility', value: '10 km', icon: null },
      ];
      render(<WeatherStats stats={sixStats} sunrise="04:30" sunset="22:00" />);

      expect(screen.getByText('Wind Speed')).toBeInTheDocument();
      expect(screen.getByText('Direction')).toBeInTheDocument();
      expect(screen.getByText('Humidity')).toBeInTheDocument();
      expect(screen.getByText('Precipitation')).toBeInTheDocument();
      expect(screen.getByText('UV Index')).toBeInTheDocument();
      expect(screen.getByText('Visibility')).toBeInTheDocument();
      expect(screen.getByText('Sunrise')).toBeInTheDocument();
      expect(screen.getByText('Sunset')).toBeInTheDocument();
    });
  });
});
