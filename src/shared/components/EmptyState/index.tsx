import { type ReactNode } from 'react';
import styles from './EmptyState.module.scss';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  message: string;
}

const EmptyState = ({ icon, title, message }: EmptyStateProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>{icon}</div>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};

export default EmptyState;
