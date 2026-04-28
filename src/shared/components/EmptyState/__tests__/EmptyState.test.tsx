import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import EmptyState from '../index';

const defaultProps = {
  icon: <svg aria-label="empty-icon" />,
  title: 'No data found',
  message: 'There is nothing to display.',
};

describe('EmptyState', () => {
  describe('rendering', () => {
    it('renders the title as an h2', () => {
      render(<EmptyState {...defaultProps} />);
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('No data found');
    });

    it('renders the message', () => {
      render(<EmptyState {...defaultProps} />);
      expect(screen.getByText('There is nothing to display.')).toBeInTheDocument();
    });

    it('renders the icon', () => {
      render(<EmptyState {...defaultProps} />);
      expect(screen.getByLabelText('empty-icon')).toBeInTheDocument();
    });
  });

  describe('prop variations', () => {
    it('renders a different title', () => {
      render(<EmptyState {...defaultProps} title="No results" />);
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('No results');
    });

    it('renders a different message', () => {
      render(<EmptyState {...defaultProps} message="Try searching for something else." />);
      expect(screen.getByText('Try searching for something else.')).toBeInTheDocument();
    });

    it('renders a different icon', () => {
      render(<EmptyState {...defaultProps} icon={<svg aria-label="search-icon" />} />);
      expect(screen.getByLabelText('search-icon')).toBeInTheDocument();
    });
  });
});
