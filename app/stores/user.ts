import { defineStore } from "pinia";
import type { TUser } from "~/types/User";

const INITIAL_STATE: { loading: boolean; error?: string; user?: TUser } = {
  user: undefined,
  loading: false,
  error: undefined,
};

export const useUserStore = defineStore("userStore", {
  state: () => INITIAL_STATE,
  actions: {
    async init() {
      const currentUser = useUserSession().user.value;
      if (currentUser) {
        await this.refreshToken();
        await this.loadUser();
      }
    },

    async refreshToken() {
      await $fetch("/api/refresh", {
        method: "GET",
      });
      await useUserSession().fetch();
    },

    async login(username: string, password: string) {
      try {
        this.error = undefined;
        this.loading = true;
        await $fetch("/api/login", {
          method: "POST",
          body: { username, password },
        });
        await useUserSession().fetch();
        await this.loadUser();
      } catch (e: any) {
        this.error = e.statusMessage || "Login failed.";
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      try {
        this.error = undefined;
        this.loading = true;
        await $fetch("/api/logout", { method: "POST" });
        await useUserSession().clear();
        this.user = undefined;
      } catch (e) {
        this.error = "Logout failed.";
      } finally {
        this.loading = false;
      }
    },

    async loadUser() {
      if (this.user) return;

      try {
        this.user = await $fetch<TUser>("/api/account/profile");
        console.log(this.user);
      } catch (e) {
        this.error = "Failed to fetch user data.";
      } finally {
        this.loading = false;
      }

      this.loading = true;
      this.error = undefined;
    },
  },
});
