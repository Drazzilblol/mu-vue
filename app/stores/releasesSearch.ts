import { defineStore } from "pinia";
import type { TRelease } from "~/types/Releases";

const INITIAL_STATE = {
  page: 0,
  perpage: 40,
  totalHits: 0,
  releases: [] as { record: TRelease; metadata?: any }[],
  loading: false,
  error: null as string | null,
};

export const useReleasesSearchStore = defineStore("releasesSearchStore", {
  state: () => INITIAL_STATE,
  actions: {
    async loadReleases(groupId?: number, needReset = true) {
      if (needReset) {
        this.$reset();
      }
      this.loading = true;
      this.error = null;

      try {
        const data = (await $fetch(
          `/api/releases/search?group_id=${groupId}&page=${
            this.page + 1
          }&perpage=${this.perpage}`
        )) as any;
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

    async loadMore(groupId?: number) {
      if (this.loading) return;
      await this.loadReleases(groupId, false);
    },
  },
});
