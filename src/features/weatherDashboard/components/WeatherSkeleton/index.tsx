import Skeleton from '../../../../shared/components/Skeleton';
import styles from './WeatherSkeleton.module.scss';

const WeatherSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.heroRow}>
          <div className={styles.mainDisplay}>
            <div className={styles.locationHeader}>
              <Skeleton className={styles.locationName} />
            </div>

            <div className={styles.tempDisplay}>
              <div className={styles.tempBadge}>
                <Skeleton className={styles.largeTemp} />
                <Skeleton className={styles.feelsLike} />
              </div>
              <Skeleton className={styles.statusText} />
            </div>
          </div>

          <div className={styles.detailsShelf}>
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className={styles.statItem} />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <Skeleton className={styles.sectionTitle} />
        <div className={styles.hourlyRow}>
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} className={styles.hourlyCard} />
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <Skeleton className={styles.sectionTitle} />
        <Skeleton className={styles.chart} />
      </div>
    </div>
  );
};

export default WeatherSkeleton;
