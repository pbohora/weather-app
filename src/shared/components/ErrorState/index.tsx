import { type ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';
import styles from './ErrorState.module.scss';

interface ErrorStateProps {
  title?: string;
  message?: string;
  icon?: ReactNode;
  retryLabel?: string;
  onRetry?: () => void;
}

const ErrorState = ({
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  icon = <AlertCircle size={48} />,
  retryLabel = 'Try again',
  onRetry,
}: ErrorStateProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>{icon}</div>
      <h2>{title}</h2>
      <p>{message}</p>
      {onRetry && (
        <button className="btn btn-primary" onClick={onRetry}>
          {retryLabel}
        </button>
      )}
    </div>
  );
};

export default ErrorState;
