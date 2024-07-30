'use server';

import { EventsInfo, HeroData, HeroDetailInfo } from '../types';
import { apiKey } from './apiMarvel';

export const getHeroes = async (offset: number): Promise<HeroData> => {
  const response = await fetch(
    `https://gateway.marvel.com/v1/public/characters?limit=10&offset=${offset}&${apiKey}`,
  );
  const data = await response.json();
  return data.data;
};

export const searchHeroes = async (searchValue: string): Promise<HeroData> => {
  const response = await fetch(
    `https://gateway.marvel.com/v1/public/characters?limit=10&nameStartsWith=${searchValue}&${apiKey}`,
  );
  const data = await response.json();

  return data.data;
};

export const getHeroInfo = async (id: string): Promise<HeroDetailInfo> => {
  const response = await fetch(
    `https://gateway.marvel.com/v1/public/characters/${id}?${apiKey}`,
  );
  const data = await response.json();

  return data.data;
};

export const getEvents = async (id: string): Promise<EventsInfo> => {
  const response = await fetch(
    `https://gateway.marvel.com/v1/public/characters/${id}/events?${apiKey}`,
  );
  const data = await response.json();

  return data.data;
};

export const getComics = async (id: string): Promise<EventsInfo> => {
  const response = await fetch(
    `https://gateway.marvel.com/v1/public/characters/${id}/comics?${apiKey}`,
  );
  const data = await response.json();

  return data.data;
};

export const getSeries = async (id: string): Promise<EventsInfo> => {
  const response = await fetch(
    `https://gateway.marvel.com/v1/public/characters/${id}/series?${apiKey}`,
  );
  const data = await response.json();

  return data.data;
};
