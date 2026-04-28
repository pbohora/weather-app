import { useMemo, useState } from 'react';
import { type WeatherDay } from '../../types/weather.types';
import { formatTemp, formatDate } from '../../utils/formatWeather';
import WeatherIcon from '../WeatherCard/WeatherIcon';
import TemperatureChart from '../TemperatureChart';
import styles from './DailyForecast.module.scss';
import { clsx } from 'clsx';
import type { TemperatureUnit } from '../../api/weatherApi.types';
import { useHorizontalScroll } from '../../../../shared/hooks/useHorizontalScroll';
import ScrollButtons from '../../../../shared/components/ScrollButtons';
import { ForecastDetailModal } from './ForecastDetailModal';

interface DailyForecastProps {
  readonly dailyForecast: WeatherDay[];
  readonly unit: TemperatureUnit;
}

const DailyForecast = ({ dailyForecast, unit }: DailyForecastProps) => {
  // Filter out Today for the cards, but keep full data for chart
  const futureDays = useMemo(() => dailyForecast.slice(1), [dailyForecast]);

  const [selectedDay, setSelectedDay] = useState<WeatherDay | null>(null);
  const { scrollContainerRef, scroll } = useHorizontalScroll();

  const chartData = useMemo(() => {
    return dailyForecast.map((day) => ({
      date: formatDate(day.date).split(',')[0] ?? formatDate(day.date),
      max: day.maxTemp,
      min: day.minTemp,
    }));
  }, [dailyForecast]);

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Daily Forecast</h3>
        <ScrollButtons onScroll={scroll} />
      </div>

      <div ref={scrollContainerRef} className={styles.grid}>
        {futureDays.map((day) => {
          const isSelected = selectedDay?.date === day.date;

          return (
            <button
              key={day.date}
              className={clsx(styles.card, isSelected && styles.selected)}
              onClick={() => setSelectedDay(day)}
              aria-pressed={isSelected}
            >
              <span className={styles.dayName}>{formatDate(day.date).split(',')[0]}</span>
              <WeatherIcon name={day.icon} className={styles.icon} />
              <div className={styles.temperatures}>
                <span className={styles.max}>{formatTemp(day.maxTemp, unit)}</span>
                <span className={styles.min}>{formatTemp(day.minTemp, unit)}</span>
              </div>
            </button>
          );
        })}
      </div>

      <TemperatureChart data={chartData} unit={unit} />

      {selectedDay && <ForecastDetailModal day={selectedDay} unit={unit} onClose={() => setSelectedDay(null)} />}
    </section>
  );
};

export default DailyForecast;
