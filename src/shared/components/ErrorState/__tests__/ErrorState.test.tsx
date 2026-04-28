import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorState from '../index';

describe('ErrorState', () => {
  describe('default props', () => {
    it('renders the default title', () => {
      render(<ErrorState />);
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Something went wrong');
    });

    it('renders the default message', () => {
      render(<ErrorState />);
      expect(screen.getByText('An unexpected error occurred. Please try again.')).toBeInTheDocument();
    });

    it('renders the default icon', () => {
      const { container } = render(<ErrorState />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('does not render a retry button when onRetry is not provided', () => {
      render(<ErrorState />);
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });

  describe('custom props', () => {
    it('renders a custom title', () => {
      render(<ErrorState title="Network error" />);
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Network error');
    });

    it('renders a custom message', () => {
      render(<ErrorState message="Check your internet connection." />);
      expect(screen.getByText('Check your internet connection.')).toBeInTheDocument();
    });

    it('renders a custom icon', () => {
      render(<ErrorState icon={<svg aria-label="custom-error-icon" />} />);
      expect(screen.getByLabelText('custom-error-icon')).toBeInTheDocument();
    });
  });

  describe('retry button', () => {
    it('renders the retry button when onRetry is provided', () => {
      render(<ErrorState onRetry={vi.fn()} />);
      expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
    });

    it('calls onRetry when the retry button is clicked', () => {
      const onRetry = vi.fn();
      render(<ErrorState onRetry={onRetry} />);
      fireEvent.click(screen.getByRole('button', { name: /try again/i }));
      expect(onRetry).toHaveBeenCalledTimes(1);
    });

    it('renders a custom retry label', () => {
      render(<ErrorState onRetry={vi.fn()} retryLabel="Reload" />);
      expect(screen.getByRole('button', { name: /reload/i })).toBeInTheDocument();
    });

    it('does not render retry button when onRetry is undefined', () => {
      render(<ErrorState retryLabel="Reload" />);
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });
});
