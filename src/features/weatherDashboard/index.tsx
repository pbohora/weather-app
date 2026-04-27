import { useWeatherQuery } from "./hooks/useWeatherQuery";

export const WeatherDashboard = () => {
  const {
    data: weather,
    isLoading,
    isError,
  } = useWeatherQuery(
    { latitude: 60.154512994425566, longitude: 24.74072006879877, id: 1234 },
    "celsius",
  );

  console.log(isLoading, isError, weather);

  return <div>Weather</div>;
};

export default WeatherDashboard;
