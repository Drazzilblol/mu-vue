import { defineStore } from "pinia";
import type { TUserLists, TUserListsItems } from "../types/lists";

const INITIAL_STATE = {
  lists: {} as TUserLists,
  listsItems: {} as TUserListsItems,
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
            ...item,
          };
          this.listsItems[item.list_id] = {
            page: 0,
            perpage: 40,
          };
        });
      } catch (e) {
        this.error = "Failed to fetch releases.";
      } finally {
        this.loading = false;
      }
    },
    async loadListsItems() {
      await Promise.all(
        Object.entries(this.listsItems).map(([id, list]) => {
          return this.loadList(id);
        }),
      );
    },
    async loadList(listId: string) {
      this.loading = true;
      this.error = null;

      try {
        const data = (await $fetch<any>(`/api/lists/${listId}/search`, {
          method: "POST",
          body: {
            page: this.listsItems[listId]!.page + 1,
            perpage: this.listsItems[listId]?.perpage,
          },
        })) as any;

        this.listsItems[listId] = {
          results: [
            ...(this.listsItems[listId]?.results || []),
            ...data.results,
          ],
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

    async loadMore(listId: string) {
      if (this.loading) return;
      await this.loadList(listId);
    },
  },
});
