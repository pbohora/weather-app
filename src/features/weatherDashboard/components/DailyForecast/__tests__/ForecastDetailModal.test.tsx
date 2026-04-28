import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ForecastDetailModal } from '../ForecastDetailModal';
import { mockWeatherDay } from '../../../../../test/fixtures';

const defaultProps = {
  day: mockWeatherDay,
  unit: 'celsius' as const,
  onClose: vi.fn(),
};

beforeEach(() => {
  defaultProps.onClose = vi.fn();
});

describe('ForecastDetailModal', () => {
  describe('rendering', () => {
    it('renders inside a Dialog (role="dialog")', () => {
      render(<ForecastDetailModal {...defaultProps} />);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('renders the formatted date as a heading', () => {
      render(<ForecastDetailModal {...defaultProps} />);
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    });

    it('renders "Forecast Overview" label', () => {
      render(<ForecastDetailModal {...defaultProps} />);
      expect(screen.getByText('Forecast Overview')).toBeInTheDocument();
    });

    it('renders max temperature in celsius', () => {
      render(<ForecastDetailModal {...defaultProps} />);
      expect(screen.getByText('22°C')).toBeInTheDocument();
    });

    it('renders min temperature as secondary value', () => {
      render(<ForecastDetailModal {...defaultProps} />);
      expect(screen.getByText('14°C')).toBeInTheDocument();
    });

    it('renders max temperature in fahrenheit', () => {
      render(<ForecastDetailModal {...defaultProps} unit="fahrenheit" />);
      expect(screen.getByText('22°F')).toBeInTheDocument();
    });

    it('renders the weather description for code 0', () => {
      render(<ForecastDetailModal {...defaultProps} />);
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Clear Sky');
    });

    it('renders "Low" as the secondary label', () => {
      render(<ForecastDetailModal {...defaultProps} />);
      expect(screen.getByText('Low')).toBeInTheDocument();
    });
  });

  describe('stats', () => {
    it('renders Apparent Max stat', () => {
      render(<ForecastDetailModal {...defaultProps} />);
      expect(screen.getByText('Apparent Max')).toBeInTheDocument();
      expect(screen.getByText('21°C')).toBeInTheDocument();
    });

    it('renders UV Index stat', () => {
      render(<ForecastDetailModal {...defaultProps} />);
      expect(screen.getByText('UV Index')).toBeInTheDocument();
      expect(screen.getByText('3.0')).toBeInTheDocument();
    });

    it('renders Rain Chance stat', () => {
      render(<ForecastDetailModal {...defaultProps} />);
      expect(screen.getByText('Rain Chance')).toBeInTheDocument();
      expect(screen.getByText('5%')).toBeInTheDocument();
    });

    it('renders Total Rain stat', () => {
      render(<ForecastDetailModal {...defaultProps} />);
      expect(screen.getByText('Total Rain')).toBeInTheDocument();
      expect(screen.getByText('0 mm')).toBeInTheDocument();
    });

    it('renders Max Wind stat', () => {
      render(<ForecastDetailModal {...defaultProps} />);
      expect(screen.getByText('Max Wind')).toBeInTheDocument();
      expect(screen.getByText('12 km/h')).toBeInTheDocument();
    });

    it('renders Sunrise and Sunset', () => {
      render(<ForecastDetailModal {...defaultProps} />);
      expect(screen.getByText('Sunrise')).toBeInTheDocument();
      expect(screen.getByText('Sunset')).toBeInTheDocument();
    });
  });

  describe('closing', () => {
    it('calls onClose when close button is clicked', () => {
      render(<ForecastDetailModal {...defaultProps} />);
      fireEvent.click(screen.getByRole('button', { name: /close dialog/i }));
      expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when Escape is pressed', () => {
      render(<ForecastDetailModal {...defaultProps} />);
      fireEvent.keyDown(window, { key: 'Escape' });
      expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    });
  });
});
