import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './ScrollButtons.module.scss';

interface ScrollButtonsProps {
  readonly onScroll: (direction: 'left' | 'right') => void;
  readonly leftLabel?: string;
  readonly rightLabel?: string;
}

const ScrollButtons = ({ onScroll, leftLabel = 'Scroll left', rightLabel = 'Scroll right' }: ScrollButtonsProps) => {
  return (
    <div className={styles.navButtons}>
      <button className={styles.navButton} onClick={() => onScroll('left')} aria-label={leftLabel} title={leftLabel}>
        <ChevronLeft size={20} />
      </button>
      <button className={styles.navButton} onClick={() => onScroll('right')} aria-label={rightLabel} title={rightLabel}>
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default ScrollButtons;
