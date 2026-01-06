import { cloneDeep } from "lodash";
import { defineStore } from "pinia";
import type {
  TSeriesSearchResponse,
  TSeriesSearchResult,
} from "~/types/Series";

export type TSelectedGenre = {
  [key: string]: boolean | undefined;
};

export type TSelectedFilters = {
  search?: string;
  stype?: string;
  year?: string;
  genre: TSelectedGenre;
  category?: string[];
  type: string[];
  orderby?: string;
};

export type TFilters = {
  search?: string;
  stype?: string;
  year?: string;
  genre: string[];
  category?: string[];
  exclude_genre?: string[];
  type: string[];
  orderby?: string;
};

const INITIAL_STATE = {
  filters: {
    search: undefined,
    stype: undefined,
    year: undefined,
    genre: [],
    category: [],
    type: [],
  } as TFilters,
  selectedFilters: {
    search: undefined,
    year: undefined,
    stype: undefined,
    genre: {},
    category: [],
    type: [],
  } as TSelectedFilters,
  orderby: "score",
  results: [] as TSeriesSearchResult[],
  loading: false,
  total: 0,
  page: 0,
  per_page: 40,
  canLoadMore: true,
  error: null as string | null,
};

const preparedFilters = (filters: TSelectedFilters) => {
  const prepared = {} as Record<string, string | TSelectedGenre | string[]>;
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      prepared[key as keyof TSelectedFilters] = value;
    }
  });
  const genres = Object.entries(filters.genre || {}).reduce(
    (acc, [k, v]) => {
      if (v === true) {
        acc.genre.push(k);
      } else if (v === false) {
        acc.exclude_genre.push(k);
      }
      return acc;
    },
    {
      genre: [] as string[],
      exclude_genre: [] as string[],
    }
  );
  return { ...prepared, ...genres } as TFilters;
};

export const useSearchStore = defineStore("searchStore", {
  state: () => INITIAL_STATE,
  getters: {
    activeFilters: (state) => {
      return Object.entries(state.filters).filter(
        ([_, v]) => v && (Array.isArray(v) ? v.length : true)
      );
    },
    getResults: (state) => {
      return state.results;
    },
    hasActiveFilters: (state) => {
      return Object.values(state.filters).some(
        (v) => v && (Array.isArray(v) ? v.length : true)
      );
    },
  },
  actions: {
    setSearch(search?: string) {
      this.filters.search = search;
    },
    setGenre(genre: TSelectedGenre) {
      this.selectedFilters.genre = genre;
    },
    setCategories(categories: string[]) {
      this.selectedFilters.category = categories;
    },
    setType(type: string[]) {
      this.filters.type = type;
    },
    sort(option: string) {
      this.orderby = option;
      this.search();
    },
    resetResults() {
      this.results = [];
      this.loading = false;
      this.total = 0;
      this.page = 0;
      this.per_page = 40;
      this.canLoadMore = true;
      this.error = null as string | null;
    },
    resetFilters() {
      this.selectedFilters = cloneDeep(INITIAL_STATE.selectedFilters);

      console.log(this.selectedFilters);
    },
    async search(shouldReset = true) {
      if (shouldReset) {
        this.resetResults();
        this.filters = preparedFilters(this.selectedFilters);
      }
      this.loading = true;
      this.error = null;

      try {
        const data = await useNuxtApp().$api<TSeriesSearchResponse>(
          "/series/search",
          {
            method: "post",
            body: {
              ...this.filters,
              orderby: this.orderby,
              page: this.page + 1,
              perpage: this.per_page,
            },
          }
        );
        this.results = [...this.results, ...data.results];
        this.total = data.total_hits;
        this.page = data.page;
        this.per_page = data.per_page;
        this.canLoadMore =
          this.page * this.per_page < this.total ? true : false;
      } catch (e) {
        this.error = "Search failed";
      } finally {
        this.loading = false;
      }
    },
    async loadMore() {
      this.search(false);
    },
  },
});
