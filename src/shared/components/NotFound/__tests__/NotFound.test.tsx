import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import NotFound from '../index';

// Mock useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

function renderNotFound() {
  return render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>,
  );
}

describe('NotFound', () => {
  describe('rendering', () => {
    it('renders the 404 code', () => {
      renderNotFound();
      expect(screen.getByText('404')).toBeInTheDocument();
    });

    it('renders the not found title', () => {
      renderNotFound();
      expect(screen.getByText('The requested resource could not be found!')).toBeInTheDocument();
    });

    it('renders the descriptive message', () => {
      renderNotFound();
      expect(screen.getByText('Please check the URL and try again.')).toBeInTheDocument();
    });

    it('renders the "Back to Home" button', () => {
      renderNotFound();
      expect(screen.getByRole('button', { name: /back to home/i })).toBeInTheDocument();
    });

    it('renders the title as an h1', () => {
      renderNotFound();
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('The requested resource could not be found!');
    });
  });

  describe('navigation', () => {
    it('calls navigate("/") when the "Back to Home" button is clicked', () => {
      const mockNavigate = vi.fn();
      vi.mocked(useNavigate).mockReturnValue(mockNavigate);

      renderNotFound();
      fireEvent.click(screen.getByRole('button', { name: /back to home/i }));

      expect(mockNavigate).toHaveBeenCalledWith('/');
      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });

    it('does not navigate on render, only on button click', () => {
      const mockNavigate = vi.fn();
      vi.mocked(useNavigate).mockReturnValue(mockNavigate);

      renderNotFound();

      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
});
