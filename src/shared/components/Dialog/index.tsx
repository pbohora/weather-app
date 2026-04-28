import { type ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';
import styles from './Dialog.module.scss';

interface DialogProps {
  readonly children: ReactNode;
  readonly onClose: () => void;
  readonly 'aria-label': string;
}

const Dialog = ({ children, onClose, 'aria-label': ariaLabel }: DialogProps) => {
  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div
      className={styles.overlay}
      role="presentation"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        className={styles.modal}
      >
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Dialog;
