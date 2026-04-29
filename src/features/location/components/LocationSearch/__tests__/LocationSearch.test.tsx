import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LocationSearch } from '../index';
import { useLocationStore } from '../../../store/locationStore';
import * as useLocationSearchModule from '../../../hooks/useLocationSearch';
import { mockLocations } from '../../../../../test/fixtures';

// Reset store before each test
beforeEach(() => {
  useLocationStore.setState({ selectedLocation: null, searchHistory: [] });
});

function renderWithQuery(ui: React.ReactElement) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>);
}

// Default mock — idle (query not enabled)
function mockSearch(overrides: Partial<ReturnType<typeof useLocationSearchModule.useLocationSearch>> = {}) {
  vi.spyOn(useLocationSearchModule, 'useLocationSearch').mockReturnValue({
    data: undefined,
    isLoading: false,
    isError: false,
    ...overrides,
  } as ReturnType<typeof useLocationSearchModule.useLocationSearch>);
}

describe('LocationSearch', () => {
  describe('rendering', () => {
    it('renders the search input', () => {
      mockSearch();
      renderWithQuery(<LocationSearch />);
      expect(screen.getByRole('combobox', { name: /search location/i })).toBeInTheDocument();
    });

    it('renders the placeholder text', () => {
      mockSearch();
      renderWithQuery(<LocationSearch />);
      expect(screen.getByPlaceholderText('Search for a city...')).toBeInTheDocument();
    });

    it('does not show suggestions initially', () => {
      mockSearch();
      renderWithQuery(<LocationSearch />);
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  describe('query behaviour', () => {
    it('does not show suggestions when query is 2 characters or fewer', () => {
      mockSearch();
      renderWithQuery(<LocationSearch />);
      const input = screen.getByRole('combobox');
      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: 'He' } });
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('shows suggestions dropdown when query is more than 2 characters and focused', () => {
      mockSearch({ data: mockLocations });
      renderWithQuery(<LocationSearch />);
      const input = screen.getByRole('combobox');
      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: 'Hel' } });
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('shows skeleton rows while loading', () => {
      mockSearch({ isLoading: true, data: undefined });
      renderWithQuery(<LocationSearch />);
      const input = screen.getByRole('combobox');
      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: 'Hel' } });
      expect(screen.getAllByRole('status').length).toBeGreaterThan(0);
    });

    it('shows error message on fetch failure', () => {
      mockSearch({ isError: true, error: new Error('Failed to fetch locations'), data: undefined });
      renderWithQuery(<LocationSearch />);
      const input = screen.getByRole('combobox');
      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: 'Hel' } });
      expect(screen.getByText('Failed to fetch locations')).toBeInTheDocument();
    });

    it('renders suggestion names when data is returned', () => {
      mockSearch({ data: mockLocations });
      renderWithQuery(<LocationSearch />);
      const input = screen.getByRole('combobox');
      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: 'Hel' } });
      expect(screen.getByText('Helsinki')).toBeInTheDocument();
      expect(screen.getByText('Espoo')).toBeInTheDocument();
    });
  });

  describe('selecting a location', () => {
    it('updates the store when a suggestion is selected', () => {
      mockSearch({ data: mockLocations });
      renderWithQuery(<LocationSearch />);
      const input = screen.getByRole('combobox');
      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: 'Hel' } });
      fireEvent.click(screen.getByTestId('suggestion-1'));
      expect(useLocationStore.getState().selectedLocation).toEqual(mockLocations[0]);
    });

    it('clears the input after selecting a location', () => {
      mockSearch({ data: mockLocations });
      renderWithQuery(<LocationSearch />);
      const input = screen.getByRole('combobox') as HTMLInputElement;
      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: 'Hel' } });
      fireEvent.click(screen.getByTestId('suggestion-1'));
      expect(input.value).toBe('');
    });

    it('adds the location to search history', () => {
      mockSearch({ data: mockLocations });
      renderWithQuery(<LocationSearch />);
      const input = screen.getByRole('combobox');
      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: 'Hel' } });
      fireEvent.click(screen.getByTestId('suggestion-1'));
      expect(useLocationStore.getState().searchHistory).toHaveLength(1);
      expect(useLocationStore.getState().searchHistory[0]).toEqual(mockLocations[0]);
    });

    it('closes the suggestions after selecting', () => {
      mockSearch({ data: mockLocations });
      renderWithQuery(<LocationSearch />);
      const input = screen.getByRole('combobox');
      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: 'Hel' } });
      fireEvent.click(screen.getByTestId('suggestion-1'));
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  describe('click outside', () => {
    it('closes suggestions when clicking outside the container', () => {
      mockSearch({ data: mockLocations });
      renderWithQuery(<LocationSearch />);
      const input = screen.getByRole('combobox');
      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: 'Hel' } });
      expect(screen.getByRole('listbox')).toBeInTheDocument();

      act(() => {
        fireEvent.mouseDown(document.body);
      });
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  describe('search history', () => {
    it('shows history when focused with a short query and history exists', () => {
      useLocationStore.setState({ selectedLocation: null, searchHistory: mockLocations });
      mockSearch();
      renderWithQuery(<LocationSearch />);
      const input = screen.getByRole('combobox');
      fireEvent.focus(input);
      // query is empty (≤ 2 chars) — should show history
      expect(screen.getByRole('listbox')).toBeInTheDocument();
      expect(screen.getByText('Helsinki')).toBeInTheDocument();
    });

    it('does not show history when there is no history', () => {
      mockSearch();
      renderWithQuery(<LocationSearch />);
      const input = screen.getByRole('combobox');
      fireEvent.focus(input);
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });
});
