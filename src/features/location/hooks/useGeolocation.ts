import { useQuery } from '@tanstack/react-query';
import { reverseGeocode } from '../api/nominatimApi';
import { useLocationStore } from '../store/locationStore';

function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise(
    // wait for 1 minutes to get users location if does not get by that time show error message in the ui and user needs to select location using seach bar
    (resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 60000 }),
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
    staleTime: Infinity, // position is captured once per session
    retry: false,
  });
}
