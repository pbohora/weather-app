import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TemperatureUnit } from '../api/weatherApi.types';

interface WeatherState {
  unit: TemperatureUnit;
  setUnit: (unit: TemperatureUnit) => void;
}

export const useWeatherStore = create<WeatherState>()(
  persist(
    (set) => ({
      unit: 'celsius',
      setUnit: (unit) => set({ unit }),
    }),
    {
      name: 'weather-storage',
    },
  ),
);
