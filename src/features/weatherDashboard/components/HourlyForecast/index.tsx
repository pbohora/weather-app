import { useMemo } from 'react';
import { type WeatherHour } from '../../types/weather.types';
import { formatTime, formatTemp } from '../../utils/formatWeather';
import WeatherIcon from '../WeatherCard/WeatherIcon';
import { Droplets } from 'lucide-react';
import styles from './HourlyForecast.module.scss';
import type { TemperatureUnit } from '../../api/weatherApi.types';
import { useHorizontalScroll } from '../../../../shared/hooks/useHorizontalScroll';
import ScrollButtons from '../../../../shared/components/ScrollButtons';

interface HourlyForecastProps {
  readonly hourlyData: WeatherHour[];
  readonly unit: TemperatureUnit;
}

const HourlyForecast = ({ hourlyData, unit }: HourlyForecastProps) => {
  const { scrollContainerRef, scroll } = useHorizontalScroll();

  // Show only next 24 hours of data
  const currentHourlyData = useMemo(() => {
    const now = new Date();
    const currentHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours());

    // Find the index of the first hour of the selected day
    const firstHourOfDayIndex = hourlyData.findIndex((hour) => {
      return new Date(hour.time) >= currentHour;
    });

    return hourlyData.slice(firstHourOfDayIndex, firstHourOfDayIndex + 24);
  }, [hourlyData]);

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Hourly Forecast</h3>
        <ScrollButtons onScroll={scroll} leftLabel="Scroll left" rightLabel="Scroll right" />
      </div>

      <div ref={scrollContainerRef} className={styles.hourlyList}>
        {currentHourlyData.map((hour, index) => (
          <div key={`${hour.time}-${index}`} className={styles.hourlyCard}>
            <span className={styles.time}>{formatTime(hour.time)}</span>
            <WeatherIcon name={hour.icon} className={styles.icon} />
            <span className={styles.temp}>{formatTemp(hour.temp, unit)}</span>
            {hour.precipitationProb > 0 && (
              <div className={styles.precip}>
                <Droplets size={12} />
                <span>{hour.precipitationProb}%</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HourlyForecast;
