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
