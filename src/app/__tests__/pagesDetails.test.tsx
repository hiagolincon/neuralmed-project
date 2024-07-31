import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { beforeEach, describe, expect, it, MockedFunction, vi } from 'vitest';
import {
  getComics,
  getEvents,
  getHeroInfo,
  getSeries,
} from '@/app/server/actions';
import { EventsInfo, HeroDetailInfo } from '@/app/types';
import HeroesDetails from '@/app/[id]/page';

const heroInfo: HeroDetailInfo = {
  results: [
    {
      name: 'Hero Name',
      description: 'Hero Description',
      thumbnail: {
        path: 'hero_path',
        extension: 'jpg',
      },
    },
  ],
  total: 0,
  count: 0,
  offset: 0,
  limit: 0,
};

const eventsInfo: EventsInfo = {
  results: [],
  total: 0,
  count: 0,
  offset: 0,
  limit: 0,
};

const comicsInfo: EventsInfo = {
  results: [],
  total: 0,
  count: 0,
  offset: 0,
  limit: 0,
};

const seriesInfo: EventsInfo = {
  results: [],
  total: 0,
  count: 0,
  offset: 0,
  limit: 0,
};

vi.mock('@/app/server/actions', () => ({
  getHeroInfo: vi.fn(),
  getEvents: vi.fn(),
  getComics: vi.fn(),
  getSeries: vi.fn(),
}));

const queryClient = new QueryClient();

describe('HeroesDetails Component', () => {
  beforeEach(() => {
    (getHeroInfo as MockedFunction<typeof getHeroInfo>).mockResolvedValue(
      heroInfo,
    );
    (getEvents as MockedFunction<typeof getEvents>).mockResolvedValue(
      eventsInfo,
    );
    (getComics as MockedFunction<typeof getComics>).mockResolvedValue(
      comicsInfo,
    );
    (getSeries as MockedFunction<typeof getSeries>).mockResolvedValue(
      seriesInfo,
    );
  });

  it('should display spinner while loading data', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <HeroesDetails params={{ id: '1' }} />
      </QueryClientProvider>,
    );

    expect(screen.getByRole('status')).toBeDefined();
  });

  it('should display hero information and cards after data is loaded', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <HeroesDetails params={{ id: '1' }} />
      </QueryClientProvider>,
    );

    await waitFor(() => expect(screen.findByText('Hero Name')).toBeDefined());

    expect(screen.findByText('Hero Description')).toBeDefined();
  });
});
