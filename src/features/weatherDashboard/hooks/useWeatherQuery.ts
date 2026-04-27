import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "../api/weatherApi";
import type { Coordinates, Unit } from "../api/weatherApi.types";

export function useWeatherQuery(
  location: Coordinates & { id: number },
  unit: Unit,
) {
  return useQuery({
    queryKey: ["weather", location?.id, unit],
    queryFn: () =>
      fetchWeather({
        latitude: location!.latitude,
        longitude: location!.longitude,
        unit,
      }),
    enabled: location !== null,
  });
}
