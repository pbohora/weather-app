import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import UnitToggle from '../index';
import { useWeatherStore } from '../../../store/weatherStore';

beforeEach(() => {
  useWeatherStore.setState({ unit: 'celsius' });
});

describe('UnitToggle', () => {
  describe('rendering', () => {
    it('renders the °C button', () => {
      render(<UnitToggle />);
      expect(screen.getByTitle('Celsius')).toBeInTheDocument();
      expect(screen.getByText('°C')).toBeInTheDocument();
    });

    it('renders the °F button', () => {
      render(<UnitToggle />);
      expect(screen.getByTitle('Fahrenheit')).toBeInTheDocument();
      expect(screen.getByText('°F')).toBeInTheDocument();
    });

    it('renders two buttons', () => {
      render(<UnitToggle />);
      expect(screen.getAllByRole('button')).toHaveLength(2);
    });
  });

  describe('initial state (celsius)', () => {
    it('marks °C as active (aria-pressed="true")', () => {
      render(<UnitToggle />);
      expect(screen.getByTitle('Celsius')).toHaveAttribute('aria-pressed', 'true');
    });

    it('marks °F as inactive (aria-pressed="false")', () => {
      render(<UnitToggle />);
      expect(screen.getByTitle('Fahrenheit')).toHaveAttribute('aria-pressed', 'false');
    });
  });

  describe('switching units', () => {
    it('sets unit to fahrenheit when °F is clicked', () => {
      render(<UnitToggle />);
      fireEvent.click(screen.getByTitle('Fahrenheit'));
      expect(useWeatherStore.getState().unit).toBe('fahrenheit');
    });

    it('marks °F as active after clicking it', () => {
      render(<UnitToggle />);
      fireEvent.click(screen.getByTitle('Fahrenheit'));
      expect(screen.getByTitle('Fahrenheit')).toHaveAttribute('aria-pressed', 'true');
    });

    it('marks °C as inactive after switching to fahrenheit', () => {
      render(<UnitToggle />);
      fireEvent.click(screen.getByTitle('Fahrenheit'));
      expect(screen.getByTitle('Celsius')).toHaveAttribute('aria-pressed', 'false');
    });

    it('switches back to celsius when °C is clicked after fahrenheit', () => {
      useWeatherStore.setState({ unit: 'fahrenheit' });
      render(<UnitToggle />);
      fireEvent.click(screen.getByTitle('Celsius'));
      expect(useWeatherStore.getState().unit).toBe('celsius');
    });

    it('clicking the already active unit does not change state', () => {
      render(<UnitToggle />);
      fireEvent.click(screen.getByTitle('Celsius'));
      expect(useWeatherStore.getState().unit).toBe('celsius');
    });
  });
});
