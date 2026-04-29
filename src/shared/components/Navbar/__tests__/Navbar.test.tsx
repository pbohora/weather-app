import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navbar } from '../index';
import { useWeatherStore } from '../../../../features/weatherDashboard/store/weatherStore';
import { useLocationStore } from '../../../../features/location/store/locationStore';

function renderNavbar() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <Navbar />
    </QueryClientProvider>,
  );
}

beforeEach(() => {
  Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 0 });
  useWeatherStore.setState({ unit: 'celsius' });
  useLocationStore.setState({ selectedLocation: null, searchHistory: [] });
});

describe('Navbar', () => {
  describe('rendering', () => {
    it('renders a nav element', () => {
      renderNavbar();
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('renders the brand name text', () => {
      renderNavbar();
      expect(screen.getByText('Weather Forecast')).toBeInTheDocument();
    });

    it('renders the logo icon (svg)', () => {
      const { container } = renderNavbar();
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('scroll behaviour', () => {
    it('does not have scrolled state at the top of the page', () => {
      const { container } = renderNavbar();
      const nav = container.querySelector('nav');
      // The scrolled class should not be present when scrollY is 0
      expect(nav?.className).not.toMatch(/scrolled/);
    });

    it('applies scrolled class after scrolling down', () => {
      const { container } = renderNavbar();
      const nav = container.querySelector('nav');

      act(() => {
        Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 100 });
        window.dispatchEvent(new Event('scroll'));
      });

      expect(nav?.className).toMatch(/scrolled/);
    });

    it('removes scrolled class when scrolled back to top', () => {
      const { container } = renderNavbar();
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
      const { unmount } = renderNavbar();
      unmount();
      expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
      removeEventListenerSpy.mockRestore();
    });
  });
});
