import { defineStore } from "pinia";
import type { TRequestMeta } from "~/types/General";
import type { TRelease, TReleaseSearchResponse } from "~/types/Releases";

export type TReleasesSeach = {
  group_id?: number;
  search_term?: string;
};

const INITIAL_STATE = {
  page: 0,
  perpage: 40,
  totalHits: 0,
  searchTerm: "",
  releases: [] as { record: TRelease; metadata?: TRequestMeta }[],
  bookmark: undefined as any,
  loading: false,
  error: null as string | null,
};

export const useReleasesSearchStore = defineStore("releasesSearchStore", {
  state: () => INITIAL_STATE,
  actions: {
    setSearchTerm(term: string) {
      this.searchTerm = term;
    },
    async load(releasesSearch: TReleasesSeach) {
      this.loading = true;
      this.error = null;

      try {
        const data = (await $fetch<TReleaseSearchResponse>(
          `/api/releases/search`,
          {
            method: "POST",
            body: {
              group_id: releasesSearch.group_id,
              page: this.page + 1,
              perpage: this.perpage,
              search_type: "series",
              search:
                releasesSearch.search_term || this.searchTerm || undefined,
              include_metadata: true,
            },
          },
        )) as TReleaseSearchResponse;
        this.releases = [...this.releases, ...data.results];
        this.bookmark = data.bookmark;
        this.page = data.page;
        this.perpage = data.per_page;
        this.totalHits = data.total_hits;
      } catch (e) {
        this.error = "Failed to fetch releases.";
      } finally {
        this.loading = false;
      }
    },

    async loadReleases(releasesSearch: TReleasesSeach) {
      this.$reset();
      await this.load(releasesSearch);
    },

    async loadMore(releasesSearch: TReleasesSeach) {
      if (this.loading) return;
      await this.load(releasesSearch);
    },

    async search(releasesSearch: TReleasesSeach) {
      this.$reset();
      await this.load(releasesSearch);
    },
  },
});
