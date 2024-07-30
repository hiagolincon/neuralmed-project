import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Search from '@/app/components/Search';

vi.mock('@/app/utils/debounce', () => ({
  useDebounce: (value: string) => value,
}));

describe('Search Component', () => {
  it('renders correctly', () => {
    const setDebouncedQuery = vi.fn();
    render(<Search setDebouncedQuery={setDebouncedQuery} />);

    expect(screen.getByLabelText(/Nome do personagem/i)).toBeDefined();
    expect(screen.getByAltText(/Icone de busca/i)).toBeDefined();
  });

  it('updates the input value and calls setDebouncedQuery', async () => {
    const setDebouncedQuery = vi.fn();
    render(<Search setDebouncedQuery={setDebouncedQuery} />);

    await waitFor(() => {
      expect(setDebouncedQuery).toHaveBeenCalled();
    });
  });
});
