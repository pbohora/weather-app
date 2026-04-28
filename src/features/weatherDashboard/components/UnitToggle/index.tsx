import { useWeatherStore } from '../../store/weatherStore';
import { clsx } from 'clsx';
import styles from './UnitToggle.module.scss';

const UnitToggle = () => {
  const { unit, setUnit } = useWeatherStore();

  return (
    <div className={styles.container}>
      <div className={clsx(styles.indicator, unit === 'fahrenheit' && styles.isF)} />
      <button
        onClick={() => setUnit('celsius')}
        className={clsx(styles.button, unit === 'celsius' && styles.active)}
        aria-pressed={unit === 'celsius'}
        title="Celsius"
      >
        °C
      </button>
      <button
        onClick={() => setUnit('fahrenheit')}
        className={clsx(styles.button, unit === 'fahrenheit' && styles.active)}
        aria-pressed={unit === 'fahrenheit'}
        title="Fahrenheit"
      >
        °F
      </button>
    </div>
  );
};

export default UnitToggle;
