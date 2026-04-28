import ErrorState from '../../shared/components/ErrorState';
import CurrentWeather from './components/CurrentWeather';
import DailyForecast from './components/DailyForecast';
import HourlyForecast from './components/HourlyForecast';
import WeatherSkeleton from './components/WeatherSkeleton';
import { useWeatherQuery } from './hooks/useWeatherQuery';
import styles from './WeatherDashboard.module.scss';

export const WeatherDashboard = () => {
  const {
    data: weather,
    isLoading,
    isError,
    refetch,
  } = useWeatherQuery({ latitude: 60.154512994425566, longitude: 24.74072006879877, id: 1234 }, 'celsius');

  if (isLoading) return <WeatherSkeleton />;

  if (isError || !weather) {
    return (
      <ErrorState
        title="Connection Interrupted"
        message="We couldn't reach the weather satellite. Check your connection and try again."
        retryLabel="Retry Satellite Sync"
        onRetry={refetch}
      />
    );
  }

  return (
    <div className={styles.container}>
      {weather && (
        <>
          <CurrentWeather
            currentWeather={weather?.current}
            location={{
              id: 1234,
              name: 'Helsinki',
              country: 'Finland',
              latitude: 60.154512994425566,
              longitude: 24.74072006879877,
            }}
            unit={'celsius'}
            sunrise={weather.daily[0]?.sunrise || ''}
            sunset={weather.daily[0]?.sunset || ''}
          />

          <HourlyForecast hourlyData={weather.hourly} unit={'celsius'} />
          <DailyForecast dailyForecast={weather.daily} unit={'celsius'} />
        </>
      )}
    </div>
  );
};

export default WeatherDashboard;
