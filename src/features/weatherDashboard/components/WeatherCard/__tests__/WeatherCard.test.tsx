import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import WeatherCard from '../index';

const defaultProps = {
  label: 'Humidity',
  value: '65%',
  icon: <svg aria-label="humidity-icon" />,
};

describe('WeatherCard', () => {
  describe('rendering', () => {
    it('renders as an article element', () => {
      const { container } = render(<WeatherCard {...defaultProps} />);
      expect(container.querySelector('article')).toBeInTheDocument();
    });

    it('renders the label', () => {
      render(<WeatherCard {...defaultProps} />);
      expect(screen.getByText('Humidity')).toBeInTheDocument();
    });

    it('renders the value', () => {
      render(<WeatherCard {...defaultProps} />);
      expect(screen.getByText('65%')).toBeInTheDocument();
    });

    it('renders the icon', () => {
      render(<WeatherCard {...defaultProps} />);
      expect(screen.getByLabelText('humidity-icon')).toBeInTheDocument();
    });

    it('renders label and value together', () => {
      render(<WeatherCard {...defaultProps} />);
      expect(screen.getByText('Humidity')).toBeInTheDocument();
      expect(screen.getByText('65%')).toBeInTheDocument();
    });
  });

  describe('className prop', () => {
    it('applies the custom className to the article', () => {
      const { container } = render(<WeatherCard {...defaultProps} className="custom" />);
      expect(container.querySelector('article')).toHaveClass('custom');
    });

    it('renders without crashing when className is omitted', () => {
      render(<WeatherCard {...defaultProps} />);
      expect(screen.getByText('Humidity')).toBeInTheDocument();
    });
  });

  describe('prop variations', () => {
    it('renders different label and value', () => {
      render(<WeatherCard {...defaultProps} label="Wind Speed" value="15 km/h" />);
      expect(screen.getByText('Wind Speed')).toBeInTheDocument();
      expect(screen.getByText('15 km/h')).toBeInTheDocument();
    });

    it('renders numeric-looking string values', () => {
      render(<WeatherCard {...defaultProps} label="UV Index" value="3" />);
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('renders a different icon', () => {
      render(<WeatherCard {...defaultProps} icon={<svg aria-label="wind-icon" />} />);
      expect(screen.getByLabelText('wind-icon')).toBeInTheDocument();
    });
  });
});
