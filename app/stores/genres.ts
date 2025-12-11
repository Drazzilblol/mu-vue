import { defineStore } from "pinia";
import type { TGenre } from "~/types/Series";

const INITIAL_STATE = {
  genres: [] as TGenre[],
  loading: false,
  error: null as string | null,
};

export const useGenreStore = defineStore("genreStore", {
  state: () => INITIAL_STATE,
  actions: {
    async loadGenres() {
      if (this.genres.length > 0) return;

      this.loading = true;
      this.error = null;

      try {
        const data = (await $fetch("/api/genres")) as any;
        this.genres = data;
      } catch (e) {
        this.error = "Failed to fetch genres.";
      } finally {
        this.loading = false;
      }
    },
  },
});
