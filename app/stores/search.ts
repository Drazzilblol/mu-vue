import { defineStore } from "pinia";

export type TSearchFilters = {
  search?: string;
  genre?: string[];
  type?: string[];
};

export const useSearchStore = defineStore("searchStore", {
  state: () => ({
    filters: {
      search: undefined,
      genre: [],
      type: [],
    } as TSearchFilters,
    results: [] as any[],
    loading: false,
    error: null as string | null,
  }),
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
    setGenre(genre: string[]) {
      this.filters.genre = genre;
    },
    setType(type: string[]) {
      this.filters.type = type;
    },
    resetFilters() {
      this.filters = {};
    },
    async search() {
      this.loading = true;
      this.error = null;

      try {
        const data = (await $fetch("/api/search", {
          method: "post",
          body: Object.fromEntries(
            Object.entries(this.filters).filter(
              ([key, value]) =>
                value !== null && value !== undefined && value !== ""
            )
          ),
        })) as any;
        this.results = data.results;
      } catch (e) {
        this.error = "Search failed";
      } finally {
        this.loading = false;
      }
    },
  },
});
