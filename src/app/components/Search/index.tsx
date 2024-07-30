import { useDebounce } from '@/app/utils/debounce';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export default function Search({
  setDebouncedQuery,
}: {
  setDebouncedQuery: Dispatch<SetStateAction<string>>;
}) {
  const [search, setSearch] = useState('');

  const searchDebounce = useDebounce(search, 300);

  useEffect(() => {
    setDebouncedQuery(searchDebounce);
  }, [searchDebounce, setDebouncedQuery]);

  return (
    <div className="flex w-full max-w-sm flex-col justify-start gap-1.5">
      <label htmlFor="search-input" className="text-sm">
        Nome do personagem
      </label>
      <div className="flex w-full max-w-[375px] items-center rounded-md border border-[#334155] bg-transparent">
        <input
          value={search}
          type="text"
          placeholder="Buscar personagens"
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border-0 bg-transparent p-2.5 text-sm text-[#94A3B8] outline-none"
          id="search-input"
        />
        <Image
          src="/search.svg"
          width={20}
          height={20}
          alt="Icone de busca"
          className="m-2.5"
        />
      </div>
    </div>
  );
}
