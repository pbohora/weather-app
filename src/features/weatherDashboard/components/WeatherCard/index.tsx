import { type ReactNode } from 'react';
import styles from './WeatherCard.module.scss';
import { clsx } from 'clsx';

interface WeatherCardProps {
  readonly label: string;
  readonly value: string;
  readonly icon: ReactNode;
  readonly className?: string | undefined;
}

const WeatherCard = ({ label, value, icon, className }: WeatherCardProps) => (
  <article className={clsx(styles.card, className)}>
    <div className={styles.iconWrapper}>{icon}</div>
    <div className={styles.info}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
    </div>
  </article>
);

export default WeatherCard;
