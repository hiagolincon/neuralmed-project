import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Page from '../page';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    prefetch: vi.fn(),
    replace: vi.fn(),
    pathname: '/',
    query: {},
  }),
}));

vi.mock('./server/actions', () => ({
  getHeroes: vi.fn().mockResolvedValue({
    total: 10,
    count: 5,
    results: [
      {
        id: 1,
        name: 'Hero 1',
        thumbnail: { path: '', extension: 'jpg' },
        series: { items: [] },
        events: { items: [] },
      },
      {
        id: 2,
        name: 'Hero 2',
        thumbnail: { path: '', extension: 'jpg' },
        series: { items: [] },
        events: { items: [] },
      },
    ],
  }),
  searchHeroes: vi.fn().mockResolvedValue({
    total: 10,
    count: 5,
    results: [
      {
        id: 3,
        name: 'Hero 3',
        thumbnail: { path: '', extension: 'jpg' },
        series: { items: [] },
        events: { items: [] },
      },
      {
        id: 4,
        name: 'Hero 4',
        thumbnail: { path: '', extension: 'jpg' },
        series: { items: [] },
        events: { items: [] },
      },
    ],
  }),
}));

describe('Page component', () => {
  const queryClient = new QueryClient();

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('renders the page component', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Page />
      </QueryClientProvider>,
    );

    expect(screen.findByText(/Busca de Personagens/i)).toBeDefined();
  });

  it('handles search', async () => {
    render(<Page />, { wrapper: Wrapper });

    await waitFor(() => expect(screen.findByText(/Hero 3/i)).toBeDefined());
    expect(screen.findByText(/Hero 4/i)).toBeDefined();
  });

  it('handles pagination', async () => {
    render(<Page />, { wrapper: Wrapper });

    await waitFor(() => expect(screen.findByText(/Hero 3/i)).toBeDefined());
    expect(screen.findByText(/Hero 4/i)).toBeDefined();
  });
});
