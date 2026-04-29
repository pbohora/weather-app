import { useQuery } from '@tanstack/react-query';
import { reverseGeocode } from '../api/nominatimApi';
import { useLocationStore } from '../store/locationStore';

function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 10000 }),
  );
}

export function useGeolocation() {
  const { selectedLocation, setLocation } = useLocationStore();

  return useQuery({
    queryKey: ['geolocation'],
    queryFn: async () => {
      const {
        coords: { latitude, longitude },
      } = await getCurrentPosition();
      const location = await reverseGeocode({ latitude, longitude });
      setLocation(location);
      return location;
    },
    enabled: !selectedLocation && 'geolocation' in navigator,
    retry: false,
  });
}
