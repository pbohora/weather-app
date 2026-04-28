import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { Navbar } from '../index';

// Reset scroll position before each test
beforeEach(() => {
  Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 0 });
});

describe('Navbar', () => {
  describe('rendering', () => {
    it('renders a nav element', () => {
      render(<Navbar />);
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('renders the brand name text', () => {
      render(<Navbar />);
      expect(screen.getByText('Weather Forecast')).toBeInTheDocument();
    });

    it('renders the logo icon (svg)', () => {
      const { container } = render(<Navbar />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('scroll behaviour', () => {
    it('does not have scrolled state at the top of the page', () => {
      const { container } = render(<Navbar />);
      const nav = container.querySelector('nav');
      // The scrolled class should not be present when scrollY is 0
      expect(nav?.className).not.toMatch(/scrolled/);
    });

    it('applies scrolled class after scrolling down', () => {
      const { container } = render(<Navbar />);
      const nav = container.querySelector('nav');

      act(() => {
        Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 100 });
        window.dispatchEvent(new Event('scroll'));
      });

      expect(nav?.className).toMatch(/scrolled/);
    });

    it('removes scrolled class when scrolled back to top', () => {
      const { container } = render(<Navbar />);
      const nav = container.querySelector('nav');

      act(() => {
        Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 100 });
        window.dispatchEvent(new Event('scroll'));
      });

      expect(nav?.className).toMatch(/scrolled/);

      act(() => {
        Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 0 });
        window.dispatchEvent(new Event('scroll'));
      });

      expect(nav?.className).not.toMatch(/scrolled/);
    });

    it('cleans up scroll event listener on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
      const { unmount } = render(<Navbar />);
      unmount();
      expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
      removeEventListenerSpy.mockRestore();
    });
  });
});
