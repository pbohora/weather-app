import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import DailyForecast from '../index';
import { mockDailyForecast } from '../../../../../test/fixtures';

// Mock TemperatureChart to avoid rendering SVG in unit tests
vi.mock('../../TemperatureChart', () => ({
  default: () => <div data-testid="temperature-chart" />,
}));

const defaultProps = {
  dailyForecast: mockDailyForecast,
  unit: 'celsius' as const,
};

describe('DailyForecast', () => {
  describe('rendering', () => {
    it('renders the section heading', () => {
      render(<DailyForecast {...defaultProps} />);
      expect(screen.getByText('Daily Forecast')).toBeInTheDocument();
    });

    it('renders inside a section element', () => {
      const { container } = render(<DailyForecast {...defaultProps} />);
      expect(container.querySelector('section')).toBeInTheDocument();
    });

    it('renders the temperature chart', () => {
      render(<DailyForecast {...defaultProps} />);
      expect(screen.getByTestId('temperature-chart')).toBeInTheDocument();
    });

    it('skips today (index 0) and renders only future days', () => {
      render(<DailyForecast {...defaultProps} />);
      // mockDailyForecast has 4 entries; index 0 is today (sliced out)
      const dayCards = screen.getAllByRole('button').filter((btn) => btn.getAttribute('aria-pressed') !== null);
      expect(dayCards).toHaveLength(3);
    });

    it('renders scroll left and right buttons', () => {
      render(<DailyForecast {...defaultProps} />);
      expect(screen.getByRole('button', { name: /scroll left/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /scroll right/i })).toBeInTheDocument();
    });

    it('renders max and min temperatures for each future day', () => {
      render(<DailyForecast {...defaultProps} />);
      expect(screen.getByText('22°C')).toBeInTheDocument();
      expect(screen.getByText('14°C')).toBeInTheDocument();
    });
  });

  describe('day selection', () => {
    it('does not show the modal initially', () => {
      render(<DailyForecast {...defaultProps} />);
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('opens the modal when a day card is clicked', () => {
      render(<DailyForecast {...defaultProps} />);
      const dayCards = screen.getAllByRole('button').filter((btn) => btn.getAttribute('aria-pressed') !== null);
      fireEvent.click(dayCards[0]!);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('marks the clicked card as selected (aria-pressed="true")', () => {
      render(<DailyForecast {...defaultProps} />);
      const dayCards = screen.getAllByRole('button').filter((btn) => btn.getAttribute('aria-pressed') !== null);
      fireEvent.click(dayCards[0]!);
      expect(dayCards[0]).toHaveAttribute('aria-pressed', 'true');
    });

    it('closes the modal when the Dialog close button is clicked', () => {
      render(<DailyForecast {...defaultProps} />);
      const dayCards = screen.getAllByRole('button').filter((btn) => btn.getAttribute('aria-pressed') !== null);
      fireEvent.click(dayCards[0]!);
      expect(screen.getByRole('dialog')).toBeInTheDocument();

      fireEvent.click(screen.getByRole('button', { name: /close dialog/i }));
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('closes the modal when Escape is pressed', () => {
      render(<DailyForecast {...defaultProps} />);
      const dayCards = screen.getAllByRole('button').filter((btn) => btn.getAttribute('aria-pressed') !== null);
      fireEvent.click(dayCards[0]!);
      fireEvent.keyDown(window, { key: 'Escape' });
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('shows the correct day data in the modal', () => {
      render(<DailyForecast {...defaultProps} />);
      const dayCards = screen.getAllByRole('button').filter((btn) => btn.getAttribute('aria-pressed') !== null);
      fireEvent.click(dayCards[0]!);
      // First future day is index 1 of mockDailyForecast: maxTemp 22, minTemp 14
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getAllByText('22°C').length).toBeGreaterThan(0);
    });
  });
});
