'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import {
  getComics,
  getEvents,
  getHeroInfo,
  getSeries,
} from '../server/actions';
import { EventsInfo, HeroDetailInfo } from '../types';
import Spinner from '../components/Spinner';
import Cards from '../components/Cards';

export default function HeroesDetails({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const heroInfoQuery: UseQueryResult<HeroDetailInfo, Error> = useQuery({
    queryKey: ['heroInfo'],
    queryFn: () => getHeroInfo(params.id),
    refetchOnWindowFocus: false,
  });

  const eventQuery: UseQueryResult<EventsInfo, Error> = useQuery({
    queryKey: ['event'],
    queryFn: () => getEvents(params.id),
    refetchOnWindowFocus: false,
  });

  const comicsQuery: UseQueryResult<EventsInfo, Error> = useQuery({
    queryKey: ['comics'],
    queryFn: () => getComics(params.id),
    refetchOnWindowFocus: false,
  });

  const seriesQuery: UseQueryResult<EventsInfo, Error> = useQuery({
    queryKey: ['series'],
    queryFn: () => getSeries(params.id),
    refetchOnWindowFocus: false,
  });

  const isLoading =
    heroInfoQuery.isFetching &&
    eventQuery.isFetching &&
    comicsQuery.isFetching &&
    seriesQuery.isFetching;
  if (isLoading) {
    return (
      <div className="flex h-screen w-full justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      {!heroInfoQuery.isFetching ? (
        <div className="flex items-center bg-[#0F172A]">
          <img
            src={`${heroInfoQuery.data?.results[0].thumbnail.path}.${heroInfoQuery.data?.results[0].thumbnail.extension}`}
            alt={heroInfoQuery.data?.results[0].name}
            className="w-72"
          />
          <div className="mx-auto flex w-full max-w-[1000px] flex-col gap-5">
            <h1 className="text-3xl">{heroInfoQuery.data?.results[0].name}</h1>
            <p className="mb-5 text-lg text-[#94A3B8]">
              {heroInfoQuery.data?.results[0].description
                ? heroInfoQuery.data?.results[0].description
                : 'Sem descrição'}
            </p>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
      <div className="m-12 mx-auto w-full max-w-[1100px]">
        <h2 className="mb-5 text-lg text-[#94A3B8]">Eventos</h2>
        <Cards cards={eventQuery} />
        <h2 className="mb-5 text-lg text-[#94A3B8]">Histórias em quadrinhos</h2>
        <Cards cards={comicsQuery} />
        <h2 className="mb-5 text-lg text-[#94A3B8]">Séries</h2>
        <Cards cards={seriesQuery} />
      </div>
    </>
  );
}
