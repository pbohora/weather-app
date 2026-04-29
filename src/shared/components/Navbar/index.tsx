import { CloudSunRain } from 'lucide-react';
import styles from './Navbar.module.scss';
import { clsx } from 'clsx';
import { useScrolled } from '../../hooks/useScrolled';
import UnitToggle from '../../../features/weatherDashboard/components/UnitToggle';
import { LocationSearch } from '../../../features/location/components/LocationSearch';

export const Navbar = () => {
  const isScrolled = useScrolled();

  return (
    <nav className={clsx(styles.navbar, isScrolled && styles.scrolled)}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.logoGroup}>
            <CloudSunRain size={24} />
            <span className={styles.logoText}>Weather Forecast</span>
          </div>
        </div>
        <UnitToggle />

        <LocationSearch />
      </div>
    </nav>
  );
};
