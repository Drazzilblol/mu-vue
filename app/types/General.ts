import type { TSeries } from "./Series";

export type TOption = {
  label: string;
  value: string;
};

export type TImage = {
  url: {
    original: string;
    thumb: string;
  };
  height: number;
  width: number;
};

export type TGenre = {
  genre: string;
  count?: number;
};

export type TTime = {
  timestamp: number;
  as_rfc3339: string;
  as_string: string;
};

export type TCategory = {
  series_id?: number;
  category: string;
  votes: number;
  votes_plus?: number;
  votes_minus?: number;
  added_by?: number;
};

export type TSeriesMeta = {
  series_id: string;
  title: string;
  type: string;
  year: string;
  genres: TGenre[];
  bayesian_rating: number;
  image: TImage;
};

export type TRequestMeta = {
  series: TSeries;
  user_list: any; // TODO: Define proper type
  user_genre_highlights: any[]; // TODO: Define proper type
  user_genre_filters: any[]; // TODO: Define proper type
  user_group_filters: any[]; // TODO: Define proper type
  type_filter: string;
};
