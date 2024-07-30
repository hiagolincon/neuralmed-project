export interface HeroImp {
  name: string;
  id: number;
  thumbnail: {
    path: string;
    extension: string;
  };
  series: {
    items: {
      name: string;
    }[];
  };
  events: {
    items: {
      name: string;
    }[];
  };
}

export interface HeroData {
  results: HeroImp[];
  total: number;
  count: number;
  offset: number;
  limit: number;
}

export interface HeroDetailImp {
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

export interface EventsImp {
  title: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

export interface HeroDetailInfo {
  results: HeroDetailImp[];
  total: number;
  count: number;
  offset: number;
  limit: number;
}

export interface EventsInfo {
  results: EventsImp[];
  total: number;
  count: number;
  offset: number;
  limit: number;
}

export interface heroCardInfo {
  cards: {
    isFetching: boolean;
    data?: {
      results: {
        title: string;
        description: string;
        thumbnail: {
          path: string;
          extension: string;
        };
      }[];
    };
  };
}
