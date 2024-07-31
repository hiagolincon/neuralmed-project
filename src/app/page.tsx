'use client';

import { useEffect, useState } from 'react';
import Search from '@/app/components/Search';
import { getHeroes, searchHeroes } from '@/app/server/actions';
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';
import { useRouter } from 'next/navigation';
import { HeroData } from '@/app/types';
import Spinner from '@/app/components/Spinner';

export default function Page() {
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const queryClient = useQueryClient();
  const [pageCount, setPageCount] = useState(1);
  const [pageOffset, setPageOffset] = useState(0);
  const [initialPage, setInitialPage] = useState(0);
  const router = useRouter();

  const queryCache = queryClient.getQueryCache();
  const heroesCache = queryCache.findAll().find((query) => query.queryKey);

  const allNamesQuery: UseQueryResult<HeroData, Error> = useQuery({
    queryKey: ['heroes', pageOffset],
    queryFn: () => getHeroes(pageOffset),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    enabled: !debouncedQuery,
    initialData: heroesCache?.state?.data,
    refetchOnMount: false,
  });

  const searchNamesQuery: UseQueryResult<HeroData, Error> = useQuery({
    queryKey: ['searchHeroes', debouncedQuery],
    queryFn: () => searchHeroes(debouncedQuery),
    refetchOnWindowFocus: false,
    enabled: !!debouncedQuery,
  });
  const isFetching = allNamesQuery.isFetching || searchNamesQuery.isFetching;
  const isError = allNamesQuery.isError || searchNamesQuery.isError;

  const data = debouncedQuery ? searchNamesQuery.data : allNamesQuery.data;

  useEffect(() => {
    if (!debouncedQuery) {
      queryClient.removeQueries({ queryKey: ['searchHeroes'] });
    }
  }, [debouncedQuery, queryClient]);

  useEffect(() => {
    queryClient.removeQueries({ queryKey: ['heroInfo'] });
    queryClient.removeQueries({ queryKey: ['event'] });
    queryClient.removeQueries({ queryKey: ['comics'] });
    queryClient.removeQueries({ queryKey: ['series'] });
  }, [queryClient]);

  useEffect(() => {
    if (data?.total && data?.count) {
      setPageCount(Math.ceil(data.total / data.count));
    }
  }, [data?.total, data?.count]);

  const handlePageChange = (event: { selected: number }) => {
    if (data?.count && data?.total) {
      setPageOffset((event.selected * data.count) % data.total);
      setInitialPage(event.selected);
    }
  };

  if (isError) {
    return (
      <p className="flex h-20 items-center justify-center">
        Erro ao carregar personagens.
      </p>
    );
  }

  return (
    <div className="p-8">
      {!allNamesQuery.isFetching && (
        <>
          <h1 className="pb-6 text-2xl">Busca de Personagens</h1>

          <Search setDebouncedQuery={setDebouncedQuery} />
        </>
      )}
      {isFetching ? (
        <div className="flex h-screen w-full justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          <table className="mb-5 mt-8 w-full table-fixed border-separate border-spacing-y-4">
            <thead>
              <tr>
                <th className="pl-5 text-left text-lg font-normal text-[#94A3B8]">
                  Personagem
                </th>
                <th className="pl-5 text-left text-lg font-normal text-[#94A3B8]">
                  Séries
                </th>
                <th className="pl-5 text-left text-lg font-normal text-[#94A3B8]">
                  Eventos
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.results.map((character) => (
                <tr
                  key={character.id}
                  onClick={() => router.push(`/${character.id}`)}
                  className="h-28 h-[83px] cursor-pointer rounded-md border border-[#c9c9c9] bg-transparent outline outline-1 outline-[#334155] transition-all duration-200 hover:opacity-80"
                >
                  <td className="px-6">
                    <div className="flex items-center gap-6">
                      <img
                        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                        alt={character.name}
                        className="h-[44px] w-[44px] rounded-md"
                      />
                      <h3 className="text-lg text-[#F8FAFC]">
                        {character.name}
                      </h3>
                    </div>
                  </td>
                  <td className="px-6 py-2.5">
                    <ul>
                      {character.series.items.length ? (
                        character.series.items.slice(0, 3).map((serie) => (
                          <li
                            key={serie.name}
                            className="text-base text-[#F8FAFC]"
                          >
                            {serie.name}
                          </li>
                        ))
                      ) : (
                        <li className="text-base text-[#F8FAFC]">
                          Séries não encontradas
                        </li>
                      )}
                    </ul>
                  </td>
                  <td className="px-6 py-2.5">
                    <ul>
                      {character.events?.items.length ? (
                        character.events.items.slice(0, 3).map((event) => (
                          <li
                            key={event.name}
                            className="text-base text-[#F8FAFC]"
                          >
                            {event.name}
                          </li>
                        ))
                      ) : (
                        <li className="text-base text-[#F8FAFC]">
                          Eventos não encontrados
                        </li>
                      )}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <ReactPaginate
            nextLabel=""
            previousLabel=""
            pageLinkClassName="w-10 h-10 flex justify-center items-center p-5"
            breakLabel="..."
            breakClassName="w-10 h-10 text-center"
            breakLinkClassName="text-xl"
            pageCount={pageCount}
            marginPagesDisplayed={3}
            pageRangeDisplayed={4}
            onClick={() => setDebouncedQuery('')}
            onPageChange={handlePageChange}
            containerClassName="flex justify-center fixed bottom-0 left-0 right-0 py-2 border-t border-[#334155] bg-[#020617]"
            activeClassName="bg-[#1E293B] rounded-lg"
            initialPage={initialPage}
          />
        </>
      )}
    </div>
  );
}
