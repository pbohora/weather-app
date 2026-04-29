import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type Location } from '../types/location.types';

interface LocationState {
  selectedLocation: Location | null;
  searchHistory: Location[];
  setLocation: (loc: Location) => void;
  clearLocation: () => void;
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      selectedLocation: null,
      searchHistory: [],
      setLocation: (loc) =>
        set((state) => {
          const filteredHistory = state.searchHistory.filter((h) => h.id !== loc.id);
          const newHistory = [loc, ...filteredHistory].slice(0, 5);
          return { selectedLocation: loc, searchHistory: newHistory };
        }),
      clearLocation: () => set({ selectedLocation: null }),
    }),
    {
      name: 'location-storage',
    },
  ),
);
