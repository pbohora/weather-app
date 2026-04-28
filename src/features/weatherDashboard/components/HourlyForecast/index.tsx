import { useMemo, useRef } from 'react';
import { type WeatherHour } from '../../types/weather.types';
import { formatTime, formatTemp } from '../../utils/formatWeather';
import WeatherIcon from '../WeatherCard/WeatherIcon';
import { Droplets, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './HourlyForecast.module.scss';
import type { TemperatureUnit } from '../../api/weatherApi.types';

interface HourlyForecastProps {
  readonly hourlyData: WeatherHour[];
  readonly unit: TemperatureUnit;
}

const HourlyForecast = ({ hourlyData, unit }: HourlyForecastProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Hourly Forecast</h3>
        <div className={styles.navButtons}>
          <button
            className={styles.navButton}
            onClick={() => scroll('left')}
            aria-label="Scroll left"
            title="Previous hours"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className={styles.navButton}
            onClick={() => scroll('right')}
            aria-label="Scroll right"
            title="Next hours"
          >
            <ChevronRight size={20} />
          </button>
        </div>
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
