export type TCategoryResponse = {
  total_hits: number;
  page: number;
  per_page: number;
  results: [
    {
      record: TCategory;
    }
  ];
};

export type TCategory = {
  category: string;
  usage: number;
  votes: number;
  votes_plus: number;
  votes_minus: number;
};
