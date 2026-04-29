import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchSuggestions from '../index';
import { mockLocations } from '../../../../../test/fixtures';

const defaultProps = {
  suggestions: mockLocations,
  isLoading: false,
  error: null,
  onSelect: vi.fn(),
  isOpen: true,
};

describe('SearchSuggestions', () => {
  describe('visibility', () => {
    it('renders nothing when isOpen is false', () => {
      const { container } = render(<SearchSuggestions {...defaultProps} isOpen={false} error={null} />);
      expect(container.firstChild).toBeNull();
    });

    it('renders the listbox when isOpen is true', () => {
      render(<SearchSuggestions {...defaultProps} />);
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
  });

  describe('suggestions', () => {
    it('renders all suggestion names', () => {
      render(<SearchSuggestions {...defaultProps} />);
      expect(screen.getByText('Helsinki')).toBeInTheDocument();
      expect(screen.getByText('Espoo')).toBeInTheDocument();
      expect(screen.getByText('Tampere')).toBeInTheDocument();
    });

    it('renders admin1 and country as details when admin1 is present', () => {
      render(<SearchSuggestions {...defaultProps} />);
      expect(screen.getAllByText('Uusimaa, Finland').length).toBeGreaterThan(0);
    });

    it('renders only country when admin1 is absent', () => {
      render(<SearchSuggestions {...defaultProps} />);
      expect(screen.getByText('Finland')).toBeInTheDocument();
    });

    it('calls onSelect with the correct location when a suggestion is clicked', () => {
      const onSelect = vi.fn();
      render(<SearchSuggestions {...defaultProps} onSelect={onSelect} />);
      fireEvent.click(screen.getByTestId('suggestion-1'));
      expect(onSelect).toHaveBeenCalledWith(mockLocations[0]);
      expect(onSelect).toHaveBeenCalledTimes(1);
    });

    it('renders each suggestion as a button', () => {
      render(<SearchSuggestions {...defaultProps} />);
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(3);
    });
  });

  describe('loading state', () => {
    it('renders skeleton items when isLoading is true', () => {
      render(<SearchSuggestions {...defaultProps} isLoading={true} suggestions={[]} />);
      const skeletons = screen.getAllByRole('status');
      expect(skeletons.length).toBeGreaterThan(0);
    });

    it('renders 3 skeleton rows when loading', () => {
      render(<SearchSuggestions {...defaultProps} isLoading={true} suggestions={[]} />);
      // 2 skeletons per row (name + details) × 3 rows = 6
      expect(screen.getAllByRole('status')).toHaveLength(6);
    });

    it('does not render suggestions while loading', () => {
      render(<SearchSuggestions {...defaultProps} isLoading={true} />);
      expect(screen.queryByText('Helsinki')).not.toBeInTheDocument();
    });
  });

  describe('error state', () => {
    it('renders error message when isError is true', () => {
      render(<SearchSuggestions {...defaultProps} error={new Error('Failed to fetch locations')} suggestions={[]} />);
      expect(screen.getByText('Failed to fetch locations')).toBeInTheDocument();
    });

    it('does not render suggestions on error', () => {
      render(<SearchSuggestions {...defaultProps} error={new Error('Failed to fetch locations')} />);
      expect(screen.queryByText('Helsinki')).not.toBeInTheDocument();
    });
  });

  describe('empty state', () => {
    it('renders "No locations found" when suggestions are empty and not loading', () => {
      render(<SearchSuggestions {...defaultProps} suggestions={[]} />);
      expect(screen.getByText('No locations found')).toBeInTheDocument();
    });

    it('does not render "No locations found" when isHistory is true', () => {
      render(<SearchSuggestions {...defaultProps} suggestions={[]} isHistory={true} />);
      expect(screen.queryByText('No locations found')).not.toBeInTheDocument();
    });
  });
});
