import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Dialog from '../index';

const defaultProps = {
  onClose: vi.fn(),
  'aria-label': 'Test dialog',
};

beforeEach(() => {
  defaultProps.onClose = vi.fn();
});

describe('Dialog', () => {
  describe('rendering', () => {
    it('renders with role="dialog"', () => {
      render(
        <Dialog {...defaultProps}>
          <p>Content</p>
        </Dialog>,
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('renders with aria-modal="true"', () => {
      render(
        <Dialog {...defaultProps}>
          <p>Content</p>
        </Dialog>,
      );
      expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
    });

    it('renders with the provided aria-label', () => {
      render(
        <Dialog {...defaultProps} aria-label="My dialog">
          <p>Content</p>
        </Dialog>,
      );
      expect(screen.getByRole('dialog')).toHaveAttribute('aria-label', 'My dialog');
    });

    it('renders children inside the dialog', () => {
      render(
        <Dialog {...defaultProps}>
          <p>Dialog content</p>
        </Dialog>,
      );
      expect(screen.getByText('Dialog content')).toBeInTheDocument();
    });

    it('renders the close button', () => {
      render(
        <Dialog {...defaultProps}>
          <p>Content</p>
        </Dialog>,
      );
      expect(screen.getByRole('button', { name: /close dialog/i })).toBeInTheDocument();
    });
  });

  describe('closing behaviour', () => {
    it('calls onClose when the close button is clicked', () => {
      render(
        <Dialog {...defaultProps}>
          <p>Content</p>
        </Dialog>,
      );
      fireEvent.click(screen.getByRole('button', { name: /close dialog/i }));
      expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when the overlay (backdrop) is clicked', () => {
      const { container } = render(
        <Dialog {...defaultProps}>
          <p>Content</p>
        </Dialog>,
      );
      const overlay = container.firstChild as HTMLElement;
      fireEvent.click(overlay);
      expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    });

    it('does not call onClose when clicking inside the modal content', () => {
      render(
        <Dialog {...defaultProps}>
          <p>Content</p>
        </Dialog>,
      );
      fireEvent.click(screen.getByRole('dialog'));
      expect(defaultProps.onClose).not.toHaveBeenCalled();
    });

    it('calls onClose when Escape key is pressed', () => {
      render(
        <Dialog {...defaultProps}>
          <p>Content</p>
        </Dialog>,
      );
      fireEvent.keyDown(window, { key: 'Escape' });
      expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    });

    it('does not call onClose for other key presses', () => {
      render(
        <Dialog {...defaultProps}>
          <p>Content</p>
        </Dialog>,
      );
      fireEvent.keyDown(window, { key: 'Enter' });
      fireEvent.keyDown(window, { key: 'Tab' });
      expect(defaultProps.onClose).not.toHaveBeenCalled();
    });
  });

  describe('scroll lock', () => {
    it('sets body overflow to hidden when mounted', () => {
      render(
        <Dialog {...defaultProps}>
          <p>Content</p>
        </Dialog>,
      );
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('restores body overflow when unmounted', () => {
      const { unmount } = render(
        <Dialog {...defaultProps}>
          <p>Content</p>
        </Dialog>,
      );
      unmount();
      expect(document.body.style.overflow).toBe('');
    });
  });

  describe('keyboard listener cleanup', () => {
    it('removes the keydown listener on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
      const { unmount } = render(
        <Dialog {...defaultProps}>
          <p>Content</p>
        </Dialog>,
      );
      unmount();
      expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
      removeEventListenerSpy.mockRestore();
    });
  });
});
