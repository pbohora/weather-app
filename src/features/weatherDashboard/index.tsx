import ErrorState from '../../shared/components/ErrorState';
import CurrentWeather from './components/CurrentWeather';
import DailyForecast from './components/DailyForecast';
import HourlyForecast from './components/HourlyForecast';
import WeatherSkeleton from './components/WeatherSkeleton';
import { useWeatherQuery } from './hooks/useWeatherQuery';
import { useWeatherStore } from './store/weatherStore';
import styles from './WeatherDashboard.module.scss';
import { useLocationStore } from '../location/store/locationStore';
import { useGeolocation } from '../location/hooks/useGeolocation';
import EmptyState from '../../shared/components/EmptyState';
import { MapPin, LocateOff } from 'lucide-react';
import { getErrorMessage } from '../../shared/utils/errorMessage';

export const WeatherDashboard = () => {
  const { unit } = useWeatherStore();
  const { selectedLocation } = useLocationStore();
  const { isPending: isGeoLoading, error: geoError } = useGeolocation();
  const { data: weather, isLoading, isError, error, refetch } = useWeatherQuery(selectedLocation, unit);

  if (!selectedLocation) {
    if (geoError) {
      return (
        <EmptyState icon={<LocateOff size={80} />} title="Location unavailable" message={getErrorMessage(geoError)} />
      );
    }

    return (
      <EmptyState
        icon={<MapPin size={80} />}
        title={isGeoLoading ? 'Detecting your location...' : 'Where to?'}
        message={
          isGeoLoading
            ? 'Syncing with your local atmosphere for a moment.'
            : 'Pick a city to see the atmospheric magic. Instant weather updates for anywhere on Earth.'
        }
      />
    );
  }

  if (isLoading) return <WeatherSkeleton />;

  if (isError || !weather) {
    return (
      <ErrorState
        title="Connection Interrupted"
        message={getErrorMessage(error)}
        retryLabel="Retry"
        onRetry={refetch}
      />
    );
  }

  return (
    <div className={styles.container}>
      <CurrentWeather
        currentWeather={weather?.current}
        location={selectedLocation}
        unit={unit}
        sunrise={weather.daily[0]?.sunrise || ''}
        sunset={weather.daily[0]?.sunset || ''}
      />

      <HourlyForecast hourlyData={weather.hourly} unit={unit} />
      <DailyForecast dailyForecast={weather.daily} unit={unit} />
    </div>
  );
};

export default WeatherDashboard;
