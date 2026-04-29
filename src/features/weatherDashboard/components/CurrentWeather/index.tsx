import { useMemo } from 'react';
import { Wind, Droplets, Sun, Navigation, Eye, CloudRain } from 'lucide-react';
import { type CurrentWeather as CurrentWeatherType } from '../../types/weather.types';
import { formatTemp, formatWind, getWmoDescription, formatTime } from '../../utils/formatWeather';
import styles from './CurrentWeather.module.scss';
import TemperatureDisplay from '../TemperatureDisplay';
import WeatherStats from '../WeatherStats';
import type { TemperatureUnit } from '../../api/weatherApi.types';
import type { Location } from '../../../location/types/location.types';

interface CurrentWeatherProps {
  readonly currentWeather: CurrentWeatherType;
  readonly location: Location;
  readonly unit: TemperatureUnit;
  readonly sunrise: string;
  readonly sunset: string;
}

const CurrentWeather = ({ currentWeather, location, unit, sunrise, sunset }: CurrentWeatherProps) => {
  const description = useMemo(() => getWmoDescription(currentWeather.weatherCode), [currentWeather.weatherCode]);

  const stats = useMemo(
    () => [
      {
        label: 'Wind Speed',
        value: formatWind(currentWeather.windSpeed),
        icon: <Wind />,
      },
      {
        label: 'Direction',
        value: `${currentWeather.windDirection}°`,
        icon: (
          <Navigation
            style={{
              transform: `rotate(${currentWeather.windDirection}deg)`,
            }}
          />
        ),
      },
      {
        label: 'Humidity',
        value: `${currentWeather.humidity}%`,
        icon: <Droplets />,
      },
      {
        label: 'Precipitation',
        value: `${currentWeather.precipitation} mm`,
        icon: <CloudRain />,
      },
      {
        label: 'UV Index',
        value: currentWeather.uvIndex,
        icon: <Sun />,
      },
      {
        label: 'Visibility',
        value: `${currentWeather.visibility} km`,
        icon: <Eye />,
      },
    ],
    [currentWeather],
  );

  return (
    <section className={styles.container}>
      <div className={styles.heroRow}>
        <div className={styles.mainDisplay}>
          <div className={styles.locationHeader}>
            <p className={styles.locationName}>
              {location.name}, {location.country}
            </p>
          </div>

          <TemperatureDisplay
            temp={formatTemp(currentWeather.temp, unit)}
            secondaryLabel="Feels like"
            secondaryValue={formatTemp(currentWeather.apparentTemp, unit)}
            status={description}
          />
        </div>

        <div className={styles.shelfWrapper}>
          <WeatherStats
            stats={stats}
            sunrise={formatTime(sunrise)}
            sunset={formatTime(sunset)}
            className={styles.detailsShelf || ''}
          />
        </div>
      </div>
    </section>
  );
};

export default CurrentWeather;
