import { defineStore } from "pinia";
import type { TRequestMeta } from "~/types/General";
import type { TRelease, TReleaseSearchResponse } from "~/types/Releases";

const INITIAL_STATE = {
  page: 0,
  perpage: 40,
  totalHits: 0,
  searchTerm: "",
  releases: [] as { record: TRelease; metadata?: TRequestMeta }[],
  loading: false,
  error: null as string | null,
};

export const useReleasesSearchStore = defineStore("releasesSearchStore", {
  state: () => INITIAL_STATE,
  actions: {
    setSearchTerm(term: string) {
      this.searchTerm = term;
    },
    async load(groupId: number) {
      this.loading = true;
      this.error = null;

      try {
        console.log(this.searchTerm);
        const data = (await $fetch(
          `/api/releases/search?group_id=${groupId}&page=${
            this.page + 1
          }&perpage=${this.perpage}` +
            (this.searchTerm ? `&search=${this.searchTerm}` : "")
        )) as TReleaseSearchResponse;
        this.releases = [...this.releases, ...data.results];
        this.page = data.page;
        this.perpage = data.per_page;
        this.totalHits = data.total_hits;
      } catch (e) {
        this.error = "Failed to fetch releases.";
      } finally {
        this.loading = false;
      }
    },

    async loadReleases(groupId: number) {
      this.$reset();
      await this.load(groupId);
    },

    async loadMore(groupId: number) {
      if (this.loading) return;
      await this.load(groupId);
    },

    async search(groupId: number, searchTerm: string) {
      this.$reset();
      this.setSearchTerm(searchTerm);
      await this.load(groupId);
    },
  },
});
