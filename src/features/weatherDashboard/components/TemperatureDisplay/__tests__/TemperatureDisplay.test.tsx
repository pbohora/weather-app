import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TemperatureDisplay from '../index';

const defaultProps = {
  temp: '22°C',
  secondaryLabel: 'Feels like',
  secondaryValue: '20°C',
  status: 'Clear Sky',
};

describe('TemperatureDisplay', () => {
  describe('rendering', () => {
    it('renders the main temperature', () => {
      render(<TemperatureDisplay {...defaultProps} />);
      expect(screen.getByText('22°C')).toBeInTheDocument();
    });

    it('renders the secondary label', () => {
      render(<TemperatureDisplay {...defaultProps} />);
      expect(screen.getByText('Feels like')).toBeInTheDocument();
    });

    it('renders the secondary value', () => {
      render(<TemperatureDisplay {...defaultProps} />);
      expect(screen.getByText('20°C')).toBeInTheDocument();
    });

    it('renders the weather status as an h1', () => {
      render(<TemperatureDisplay {...defaultProps} />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('Clear Sky');
    });

    it('renders all four pieces of content together', () => {
      render(<TemperatureDisplay {...defaultProps} />);
      expect(screen.getByText('22°C')).toBeInTheDocument();
      expect(screen.getByText('Feels like')).toBeInTheDocument();
      expect(screen.getByText('20°C')).toBeInTheDocument();
      expect(screen.getByText('Clear Sky')).toBeInTheDocument();
    });
  });

  describe('size prop', () => {
    it('renders without crashing when size is "normal" (default)', () => {
      render(<TemperatureDisplay {...defaultProps} size="normal" />);
      expect(screen.getByText('22°C')).toBeInTheDocument();
    });

    it('renders without crashing when size is "compact"', () => {
      render(<TemperatureDisplay {...defaultProps} size="compact" />);
      expect(screen.getByText('22°C')).toBeInTheDocument();
    });

    it('defaults to normal size when size prop is omitted', () => {
      render(<TemperatureDisplay {...defaultProps} />);
      expect(screen.getByText('22°C')).toBeInTheDocument();
    });
  });

  describe('className prop', () => {
    it('accepts an optional className without crashing', () => {
      render(<TemperatureDisplay {...defaultProps} className="custom-class" />);
      expect(screen.getByText('22°C')).toBeInTheDocument();
    });
  });

  describe('prop variations', () => {
    it('renders fahrenheit temperature', () => {
      render(<TemperatureDisplay {...defaultProps} temp="72°F" secondaryValue="68°F" />);
      expect(screen.getByText('72°F')).toBeInTheDocument();
      expect(screen.getByText('68°F')).toBeInTheDocument();
    });

    it('renders negative temperatures', () => {
      render(<TemperatureDisplay {...defaultProps} temp="-5°C" secondaryValue="-8°C" />);
      expect(screen.getByText('-5°C')).toBeInTheDocument();
    });

    it('renders a long weather status description', () => {
      render(<TemperatureDisplay {...defaultProps} status="Thunderstorm with Heavy Hail" />);
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Thunderstorm with Heavy Hail',
      );
    });

    it('renders a different secondary label', () => {
      render(<TemperatureDisplay {...defaultProps} secondaryLabel="Max" />);
      expect(screen.getByText('Max')).toBeInTheDocument();
    });
  });
});
