import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, MockedFunction } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HeroData } from '@/app/types';
import { getHeroes } from '@/app/server/actions';
import Page from '@/app/page';

vi.mock('@/app/server/actions', () => ({
  getHeroes: vi.fn(),
  searchHeroes: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    prefetch: vi.fn(),
    replace: vi.fn(),
    pathname: '/',
    query: {},
  }),
}));

describe('Page component', () => {
  it('should render the search component and handle user interactions', async () => {
    const mockHeroData: HeroData = {
      results: [
        {
          name: 'Spider-Man',
          id: 1,
          thumbnail: { path: 'path/to/spiderman', extension: 'jpg' },
          series: { items: [{ name: 'Amazing Spider-Man' }] },
          events: { items: [{ name: 'Spider-Verse' }] },
        },
      ],
      total: 1,
      count: 1,
      offset: 0,
      limit: 1,
    };

    (getHeroes as MockedFunction<typeof getHeroes>).mockResolvedValue(
      mockHeroData,
    );

    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <Page />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText('Busca de Personagens')).toBeDefined();
    });

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Spider-Man' },
    });

    await waitFor(() => {
      expect(screen.getByText('Spider-Man')).toBeDefined();
      expect(screen.getByText('Amazing Spider-Man')).toBeDefined();
      expect(screen.getByText('Spider-Verse')).toBeDefined();
    });
  });
});
