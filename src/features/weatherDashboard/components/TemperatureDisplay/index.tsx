import styles from './TemperatureDisplay.module.scss';
import clsx from 'clsx';

interface TemperatureDisplayProps {
  readonly temp: string;
  readonly secondaryLabel: string;
  readonly secondaryValue: string;
  readonly status: string;
  readonly className?: string;
  readonly size?: 'normal' | 'compact';
}

const TemperatureDisplay = ({
  temp,
  secondaryLabel,
  secondaryValue,
  status,
  className,
  size = 'normal',
}: TemperatureDisplayProps) => {
  return (
    <div className={clsx(styles.display, styles[size], className)}>
      <div className={styles.tempBadge}>
        <span className={styles.largeTemp}>{temp}</span>
        <div className={styles.secondaryInfo}>
          <span className={styles.secondaryLabel}>{secondaryLabel}</span>
          <span className={styles.secondaryValue}>{secondaryValue}</span>
        </div>
      </div>
      <h1 className={styles.statusText}>{status}</h1>
    </div>
  );
};

export default TemperatureDisplay;
