import { defineStore } from "pinia";
import type { TUserLists } from "../types/lists";

const INITIAL_STATE = {
  lists: {} as TUserLists,
  loading: false,
  error: null as string | null,
};

export const useListsStore = defineStore("listsStore", {
  state: () => INITIAL_STATE,
  actions: {
    async loadLists() {
      this.loading = true;
      this.error = null;

      try {
        const data = (await $fetch<any>(`/api/lists`, {
          method: "GET",
        })) as any;

        data.forEach((item: any) => {
          this.lists[item.list_id] = {
            id: data.list_id,
            title: data.title,
            page: 0,
            perpage: 40,
          };
        });

        await Promise.all(
          data.map((list: any) => {
            return this.loadList(list.list_id);
          }),
        );
      } catch (e) {
        this.error = "Failed to fetch releases.";
      } finally {
        this.loading = false;
      }
    },
    async loadList(listId: number) {
      this.loading = true;
      this.error = null;

      try {
        const data = (await $fetch<any>(`/api/lists/${listId}/search`, {
          method: "POST",
          body: {
            page: this.lists[listId]!.page + 1,
            perpage: this.lists[listId]?.perpage,
          },
        })) as any;

        this.lists[listId] = {
          id: data.list.list_id,
          title: data.list.title,
          results: [...(this.lists[listId]?.results || []), ...data.results],
          page: data.page,
          perpage: data.per_page,
          totalHits: data.total_hits,
        };
      } catch (e) {
        this.error = "Failed to fetch releases.";
      } finally {
        this.loading = false;
      }
    },

    async loadMore(listId: number) {
      if (this.loading) return;
      await this.loadList(listId);
    },
  },
});
