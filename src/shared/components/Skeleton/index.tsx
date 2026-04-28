import styles from './Skeleton.module.scss';
import { clsx } from 'clsx';

interface SkeletonProps {
  readonly className?: string | undefined;
}

const Skeleton = ({ className }: SkeletonProps) => {
  return <div className={clsx(styles.skeleton, className)} role="status" aria-busy="true" aria-label="Loading..." />;
};

export default Skeleton;
