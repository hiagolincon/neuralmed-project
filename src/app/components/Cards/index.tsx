import { heroCardInfo } from '@/app/types';
import Spinner from '@/app/components/Spinner';

export default function Cards({ cards }: heroCardInfo) {
  if (cards.isFetching) {
    return <Spinner />;
  }

  if (!cards.data || cards.data.results.length === 0) {
    return (
      <div className="m-12 mx-auto w-full max-w-[1100px]">
        <p className="mb-5 text-center text-lg text-[#94A3B8]">Sem conteúdo</p>
      </div>
    );
  }

  return (
    <div className="m-12 mx-auto w-full max-w-[1100px]">
      <div className="grid grid-cols-4 gap-10">
        {cards.data.results.map((card) => (
          <div
            key={card.title}
            className="rounded-md border border-[#334155] bg-[#0F172A]"
          >
            <figure className="relative">
              <img
                src={`${card.thumbnail.path}.${card.thumbnail.extension}`}
                alt={card.title}
                className="w-full rounded-md"
              />
              <div className="absolute bottom-[2px] left-0 right-0 h-[2px] w-full bg-[#ff1e1e]"></div>
            </figure>

            <div className="flex h-[171px] flex-col justify-between gap-7 overflow-auto p-4">
              <h3 className="text-lg font-bold text-white">{card.title}</h3>
              <p className="text-sm text-white">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
