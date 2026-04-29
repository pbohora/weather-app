import { useRef, useCallback } from 'react';

interface UseHorizontalScrollOptions {
  scrollAmount?: number;
}

export const useHorizontalScroll = ({ scrollAmount = 400 }: UseHorizontalScrollOptions = {}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback(
    (direction: 'left' | 'right') => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollBy({
          left: direction === 'left' ? -scrollAmount : scrollAmount,
          behavior: 'smooth',
        });
      }
    },
    [scrollAmount],
  );

  return { scrollContainerRef, scroll };
};
