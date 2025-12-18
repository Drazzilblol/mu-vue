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
