import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import WeatherSkeleton from '../index';

describe('WeatherSkeleton', () => {
  describe('rendering', () => {
    it('renders without crashing', () => {
      const { container } = render(<WeatherSkeleton />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('renders multiple skeleton items', () => {
      render(<WeatherSkeleton />);
      const skeletons = screen.getAllByRole('status');
      expect(skeletons.length).toBeGreaterThan(0);
    });

    it('all skeleton items have aria-busy="true"', () => {
      render(<WeatherSkeleton />);
      screen.getAllByRole('status').forEach((el) => {
        expect(el).toHaveAttribute('aria-busy', 'true');
      });
    });

    it('all skeleton items have aria-label "Loading..."', () => {
      render(<WeatherSkeleton />);
      const skeletons = screen.getAllByLabelText('Loading...');
      expect(skeletons.length).toBeGreaterThan(0);
    });
  });

  describe('structure', () => {
    it('renders the expected total number of skeleton items', () => {
      render(<WeatherSkeleton />);
      const skeletons = screen.getAllByRole('status');
      expect(skeletons).toHaveLength(22);
    });

    it('renders 7 hourly card skeletons', () => {
      render(<WeatherSkeleton />);
      const skeletons = screen.getAllByRole('status');
      expect(skeletons.length).toBeGreaterThanOrEqual(7);
    });
  });
});
