import { defineStore } from "pinia";

export type TSelectedGenre = {
  [key: string]: boolean | undefined;
};

export type TSelectedFilters = {
  search?: string;
  stype?: string;
  year?: string;
  genre: TSelectedGenre;
  type: string[];
  orderby?: string;
};

export type TFilters = {
  search?: string;
  stype?: string;
  year?: string;
  genre: string[];
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
    type: [],
  } as TFilters,
  selectedFilters: {
    search: undefined,
    year: undefined,
    stype: undefined,
    genre: {},
    type: [],
    orderby: "score",
  } as TSelectedFilters,
  results: [] as any[],
  loading: false,
  total: 0,
  page: 0,
  per_page: 40,
  canLoadMore: true,
  error: null as string | null,
};

const preparedFilters = (filters: TSelectedFilters) => {
  const prepared: any = {};
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
    setType(type: string[]) {
      this.filters.type = type;
    },
    sort(option: string) {
      this.selectedFilters.orderby = option;
      this.search();
    },
    reset() {
      this.$reset();
    },
    async search(shouldReset = true) {
      if (shouldReset) {
        this.reset();
        this.filters = preparedFilters(this.selectedFilters);
      }
      this.loading = true;
      this.error = null;

      try {
        const data = (await $fetch("/api/search", {
          method: "post",
          body: {
            ...this.filters,
            page: this.page + 1,
            perpage: this.per_page,
          },
        })) as any;
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
