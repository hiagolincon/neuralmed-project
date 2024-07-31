/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getHeroes,
  searchHeroes,
  getHeroInfo,
  getEvents,
  getComics,
  getSeries,
} from '@/app/server/actions';
import { apiKey } from '@/app/server/apiMarvel';
const mockFetch = vi.fn();

global.fetch = mockFetch;

describe('API Marvel functions', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('should fetch heroes with correct URL', async () => {
    const mockResponse = { data: { results: [] } };
    mockFetch.mockResolvedValueOnce({
      json: async () => mockResponse,
    } as Response);

    const offset = 0;
    const heroes = await getHeroes(offset);
    expect(mockFetch).toHaveBeenCalledWith(
      `https://gateway.marvel.com/v1/public/characters?limit=10&offset=${offset}&${apiKey}`,
    );
    expect(heroes).toEqual(mockResponse.data);
  });

  it('should search heroes with correct URL', async () => {
    const searchValue = 'Spider';
    const mockResponse = { data: { results: [] } };
    mockFetch.mockResolvedValueOnce({
      json: async () => mockResponse,
    } as Response);

    const heroes = await searchHeroes(searchValue);
    expect(mockFetch).toHaveBeenCalledWith(
      `https://gateway.marvel.com/v1/public/characters?limit=10&nameStartsWith=${searchValue}&${apiKey}`,
    );
    expect(heroes).toEqual(mockResponse.data);
  });

  it('should get hero info with correct URL', async () => {
    const heroId = '12345';
    const mockResponse = { data: {} };
    mockFetch.mockResolvedValueOnce({
      json: async () => mockResponse,
    } as Response);

    const heroInfo = await getHeroInfo(heroId);
    expect(mockFetch).toHaveBeenCalledWith(
      `https://gateway.marvel.com/v1/public/characters/${heroId}?${apiKey}`,
    );
    expect(heroInfo).toEqual(mockResponse.data);
  });

  it('should get events with correct URL', async () => {
    const heroId = '12345';
    const mockResponse = { data: { results: [] } };
    mockFetch.mockResolvedValueOnce({
      json: async () => mockResponse,
    } as Response);

    const events = await getEvents(heroId);
    expect(mockFetch).toHaveBeenCalledWith(
      `https://gateway.marvel.com/v1/public/characters/${heroId}/events?${apiKey}`,
    );
    expect(events).toEqual(mockResponse.data);
  });

  it('should get comics with correct URL', async () => {
    const heroId = '12345';
    const mockResponse = { data: { results: [] } };
    mockFetch.mockResolvedValueOnce({
      json: async () => mockResponse,
    } as Response);

    const comics = await getComics(heroId);
    expect(mockFetch).toHaveBeenCalledWith(
      `https://gateway.marvel.com/v1/public/characters/${heroId}/comics?${apiKey}`,
    );
    expect(comics).toEqual(mockResponse.data);
  });

  it('should get series with correct URL', async () => {
    const heroId = '12345';
    const mockResponse = { data: { results: [] } };
    mockFetch.mockResolvedValueOnce({
      json: async () => mockResponse,
    } as Response);

    const series = await getSeries(heroId);
    expect(mockFetch).toHaveBeenCalledWith(
      `https://gateway.marvel.com/v1/public/characters/${heroId}/series?${apiKey}`,
    );
    expect(series).toEqual(mockResponse.data);
  });
});
