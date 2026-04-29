import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useScrolled } from '../useScrolled';

beforeEach(() => {
  Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 0 });
});

describe('useScrolled', () => {
  describe('initial state', () => {
    it('returns false when scrollY is 0 and threshold is 0', () => {
      const { result } = renderHook(() => useScrolled());
      expect(result.current).toBe(false);
    });

    it('returns false when scrollY is at the default threshold', () => {
      Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 0 });
      const { result } = renderHook(() => useScrolled(0));
      expect(result.current).toBe(false);
    });

    it('returns false when scrollY is below a custom threshold', () => {
      Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 50 });
      const { result } = renderHook(() => useScrolled(100));
      // scrollY=50, threshold=100 → not scrolled
      expect(result.current).toBe(false);
    });
  });

  describe('scroll events', () => {
    it('returns true when scrollY exceeds the default threshold (0)', () => {
      const { result } = renderHook(() => useScrolled());

      act(() => {
        Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 1 });
        window.dispatchEvent(new Event('scroll'));
      });

      expect(result.current).toBe(true);
    });

    it('returns true when scrollY exceeds a custom threshold', () => {
      const { result } = renderHook(() => useScrolled(50));

      act(() => {
        Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 51 });
        window.dispatchEvent(new Event('scroll'));
      });

      expect(result.current).toBe(true);
    });

    it('returns false when scrollY equals the threshold (not strictly greater)', () => {
      const { result } = renderHook(() => useScrolled(50));

      act(() => {
        Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 50 });
        window.dispatchEvent(new Event('scroll'));
      });

      expect(result.current).toBe(false);
    });

    it('transitions from true back to false when scrolled back to top', () => {
      const { result } = renderHook(() => useScrolled());

      act(() => {
        Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 100 });
        window.dispatchEvent(new Event('scroll'));
      });
      expect(result.current).toBe(true);

      act(() => {
        Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 0 });
        window.dispatchEvent(new Event('scroll'));
      });
      expect(result.current).toBe(false);
    });

    it('handles many scroll events correctly', () => {
      const { result } = renderHook(() => useScrolled(100));

      act(() => {
        Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 50 });
        window.dispatchEvent(new Event('scroll'));
      });
      expect(result.current).toBe(false);

      act(() => {
        Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 150 });
        window.dispatchEvent(new Event('scroll'));
      });
      expect(result.current).toBe(true);

      act(() => {
        Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 80 });
        window.dispatchEvent(new Event('scroll'));
      });
      expect(result.current).toBe(false);
    });
  });

  describe('threshold changes', () => {
    it('re-registers listener when threshold changes', () => {
      const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
      const { rerender } = renderHook(({ threshold }) => useScrolled(threshold), {
        initialProps: { threshold: 0 },
      });

      rerender({ threshold: 100 });

      expect(addEventListenerSpy).toHaveBeenCalledTimes(2);
      addEventListenerSpy.mockRestore();
    });
  });

  describe('cleanup', () => {
    it('removes the scroll event listener on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
      const { unmount } = renderHook(() => useScrolled());

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
      removeEventListenerSpy.mockRestore();
    });

    it('attaches scroll listener with passive option', () => {
      const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
      renderHook(() => useScrolled());

      expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true });
      addEventListenerSpy.mockRestore();
    });
  });
});
