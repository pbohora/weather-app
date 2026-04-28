import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary } from '../index';

const ErrorChild = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) throw new Error('Test error message');
  return <div>Child content</div>;
};

// Suppress console.error for error boundary tests
const originalConsoleError = console.error;
beforeEach(() => {
  console.error = vi.fn();
});
afterEach(() => {
  console.error = originalConsoleError;
});

describe('ErrorBoundary', () => {
  describe('no error state', () => {
    it('renders children when there is no error', () => {
      render(
        <ErrorBoundary>
          <ErrorChild shouldThrow={false} />
        </ErrorBoundary>,
      );
      expect(screen.getByText('Child content')).toBeInTheDocument();
    });

    it('renders multiple children without error', () => {
      render(
        <ErrorBoundary>
          <p>First child</p>
          <p>Second child</p>
        </ErrorBoundary>,
      );
      expect(screen.getByText('First child')).toBeInTheDocument();
      expect(screen.getByText('Second child')).toBeInTheDocument();
    });

    it('does not render the error UI when there is no error', () => {
      render(
        <ErrorBoundary>
          <ErrorChild shouldThrow={false} />
        </ErrorBoundary>,
      );
      expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /try again/i })).not.toBeInTheDocument();
    });
  });

  describe('error state — default fallback', () => {
    it('renders "Something went wrong" heading when a child throws', () => {
      render(
        <ErrorBoundary>
          <ErrorChild shouldThrow={true} />
        </ErrorBoundary>,
      );
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });

    it('renders a "Try again" button when a child throws', () => {
      render(
        <ErrorBoundary>
          <ErrorChild shouldThrow={true} />
        </ErrorBoundary>,
      );
      expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
    });

    it('renders the error UI inside an element with role="alert"', () => {
      render(
        <ErrorBoundary>
          <ErrorChild shouldThrow={true} />
        </ErrorBoundary>,
      );
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('hides children when an error is thrown', () => {
      render(
        <ErrorBoundary>
          <ErrorChild shouldThrow={true} />
        </ErrorBoundary>,
      );
      expect(screen.queryByText('Child content')).not.toBeInTheDocument();
    });
  });

  describe('error state — custom fallback', () => {
    it('renders the custom fallback when provided and an error is thrown', () => {
      render(
        <ErrorBoundary fallback={<div>Custom fallback UI</div>}>
          <ErrorChild shouldThrow={true} />
        </ErrorBoundary>,
      );
      expect(screen.getByText('Custom fallback UI')).toBeInTheDocument();
    });

    it('does not render "Something went wrong" when a custom fallback is provided', () => {
      render(
        <ErrorBoundary fallback={<div>Custom fallback UI</div>}>
          <ErrorChild shouldThrow={true} />
        </ErrorBoundary>,
      );
      expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
    });

    it('does not render the "Try again" button when a custom fallback is provided', () => {
      render(
        <ErrorBoundary fallback={<p>Oops</p>}>
          <ErrorChild shouldThrow={true} />
        </ErrorBoundary>,
      );
      expect(screen.queryByRole('button', { name: /try again/i })).not.toBeInTheDocument();
    });
  });

  describe('recovery via Try again button', () => {
    it('resets the error state and re-renders children when "Try again" is clicked', () => {
      // We need a component whose throw status we can control after mount.
      let shouldThrow = true;
      const ControlledThrower = () => {
        if (shouldThrow) throw new Error('Controlled error');
        return <div>Recovered content</div>;
      };

      render(
        <ErrorBoundary>
          <ControlledThrower />
        </ErrorBoundary>,
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();

      // Stop throwing before clicking Try again
      shouldThrow = false;
      fireEvent.click(screen.getByRole('button', { name: /try again/i }));

      expect(screen.getByText('Recovered content')).toBeInTheDocument();
      expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
    });
  });

  describe('nested error boundaries', () => {
    it('inner boundary catches the error, outer boundary remains intact', () => {
      render(
        <ErrorBoundary>
          <div>Outer content</div>
          <ErrorBoundary>
            <ErrorChild shouldThrow={true} />
          </ErrorBoundary>
        </ErrorBoundary>,
      );
      expect(screen.getByText('Outer content')).toBeInTheDocument();
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });
  });
});
