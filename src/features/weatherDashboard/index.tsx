import CurrentWeather from './components/CurrentWeather';
import DailyForecast from './components/DailyForecast';
import HourlyForecast from './components/HourlyForecast';
import { useWeatherQuery } from './hooks/useWeatherQuery';

export const WeatherDashboard = () => {
  const {
    data: weather,
    isLoading,
    isError,
  } = useWeatherQuery({ latitude: 60.154512994425566, longitude: 24.74072006879877, id: 1234 }, 'celsius');

  if (isLoading || isError) return <p>Loading</p>;

  return (
    <div>
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
