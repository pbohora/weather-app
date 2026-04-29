import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../useDebounce';

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

describe('useDebounce', () => {
  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('hello', 500));
    expect(result.current).toBe('hello');
  });

  it('does not update before the delay has elapsed', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
      initialProps: { value: 'hello' },
    });

    rerender({ value: 'world' });
    act(() => vi.advanceTimersByTime(499));
    expect(result.current).toBe('hello');
  });

  it('updates after the delay has elapsed', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
      initialProps: { value: 'hello' },
    });

    rerender({ value: 'world' });
    act(() => vi.advanceTimersByTime(500));
    expect(result.current).toBe('world');
  });

  it('resets the timer on each value change', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
      initialProps: { value: 'a' },
    });

    rerender({ value: 'b' });
    act(() => vi.advanceTimersByTime(300));
    rerender({ value: 'c' });
    act(() => vi.advanceTimersByTime(300));
    // Only 300ms since last change — still debouncing
    expect(result.current).toBe('a');

    act(() => vi.advanceTimersByTime(200));
    expect(result.current).toBe('c');
  });

  it('works with numeric values', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: 1 },
    });

    rerender({ value: 42 });
    act(() => vi.advanceTimersByTime(300));
    expect(result.current).toBe(42);
  });

  it('clears the timeout on unmount', () => {
    const clearTimeoutSpy = vi.spyOn(globalThis, 'clearTimeout');
    const { unmount } = renderHook(() => useDebounce('test', 500));
    unmount();
    expect(clearTimeoutSpy).toHaveBeenCalled();
    clearTimeoutSpy.mockRestore();
  });
});
