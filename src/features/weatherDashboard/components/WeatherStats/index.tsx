import { type ReactNode } from 'react';
import { Sun, Moon } from 'lucide-react';
import styles from './WeatherStats.module.scss';

interface WeatherStat {
  label: string;
  value: string | number;
  icon: ReactNode;
}

interface WeatherStatsProps {
  readonly stats: WeatherStat[];
  readonly sunrise?: string;
  readonly sunset?: string;
  readonly className?: string;
}

const WeatherStats = ({ stats, sunrise, sunset, className }: WeatherStatsProps) => {
  return (
    <div className={className || styles.shelf}>
      {(sunrise || sunset) && (
        <div className={styles.statWide}>
          {sunrise && (
            <div className={styles.stat}>
              <div className={styles.statIconWrapper}>
                <Sun />
              </div>
              <div className={styles.statInfo}>
                <span className={styles.statLabel}>Sunrise</span>
                <span className={styles.statValue}>{sunrise}</span>
              </div>
            </div>
          )}
          {sunset && (
            <div className={styles.stat}>
              <div className={styles.statIconWrapper}>
                <Moon />
              </div>
              <div className={styles.statInfo}>
                <span className={styles.statLabel}>Sunset</span>
                <span className={styles.statValue}>{sunset}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {stats.map((stat, index) => (
        <div key={`${stat.label}-${index}`} className={styles.stat}>
          <div className={styles.statIconWrapper}>{stat.icon}</div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>{stat.label}</span>
            <span className={styles.statValue}>{stat.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeatherStats;
