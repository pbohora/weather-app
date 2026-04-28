import { memo, useMemo } from 'react';
import { Wind, Droplets, Sun, Thermometer, CloudRain, ShieldCheck } from 'lucide-react';
import { type WeatherDay } from '../../types/weather.types';
import { formatTemp, formatWind, getWmoDescription, formatTime, formatDate } from '../../utils/formatWeather';
import TemperatureDisplay from '../TemperatureDisplay';
import Dialog from '../../../../shared/components/Dialog';
import styles from './ForecastDetailModal.module.scss';
import type { TemperatureUnit } from '../../api/weatherApi.types';
import WeatherStats from '../WeatherStats';

interface ForecastDetailModalProps {
  readonly day: WeatherDay;
  readonly unit: TemperatureUnit;
  readonly onClose: () => void;
}

export const ForecastDetailModal = memo(({ day, unit, onClose }: ForecastDetailModalProps) => {
  const description = getWmoDescription(day.weatherCode);

  const stats = useMemo(
    () => [
      { label: 'Apparent Max', value: formatTemp(day.apparentMaxTemp, unit), icon: <Thermometer /> },
      { label: 'UV Index', value: day.uvIndex.toFixed(1), icon: <Sun /> },
      { label: 'Rain Chance', value: `${day.precipitationProb}%`, icon: <Droplets /> },
      { label: 'Total Rain', value: `${day.precipitation} mm`, icon: <CloudRain /> },
      { label: 'Max Wind', value: formatWind(day.maxWind), icon: <Wind /> },
      { label: 'Weather Code', value: day.weatherCode, icon: <ShieldCheck /> },
    ],
    [day, unit],
  );

  return (
    <Dialog onClose={onClose} aria-label={`Forecast details for ${formatDate(day.date)}`}>
      <div className={styles.heroRow}>
        <div className={styles.mainDisplay}>
          <div className={styles.headerInfo}>
            <h2 className={styles.date}>{formatDate(day.date)}</h2>
            <p className={styles.description}>Forecast Overview</p>
          </div>

          <TemperatureDisplay
            temp={formatTemp(day.maxTemp, unit)}
            secondaryLabel="Low"
            secondaryValue={formatTemp(day.minTemp, unit)}
            status={description}
            size="compact"
          />
        </div>

        <div className={styles.shelfWrapper}>
          <WeatherStats
            stats={stats}
            sunrise={formatTime(day.sunrise)}
            sunset={formatTime(day.sunset)}
            className={styles.detailsShelf}
          />
        </div>
      </div>
    </Dialog>
  );
});

ForecastDetailModal.displayName = 'ForecastDetailModal';
