import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Skeleton from '../index';

describe('Skeleton', () => {
  describe('accessibility', () => {
    it('has role="status"', () => {
      render(<Skeleton />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('has aria-busy="true"', () => {
      render(<Skeleton />);
      expect(screen.getByRole('status')).toHaveAttribute('aria-busy', 'true');
    });

    it('has aria-label "Loading..."', () => {
      render(<Skeleton />);
      expect(screen.getByLabelText('Loading...')).toBeInTheDocument();
    });
  });

  describe('className prop', () => {
    it('applies a custom className', () => {
      render(<Skeleton className="custom-width" />);
      expect(screen.getByRole('status')).toHaveClass('custom-width');
    });

    it('renders without crashing when className is omitted', () => {
      render(<Skeleton />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });
});
