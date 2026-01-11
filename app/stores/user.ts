import { defineStore } from "pinia";

const INITIAL_STATE = {
  user: null as any | null,
  loading: false,
  error: null as string | null,
};

export const useUserStore = defineStore("userStore", {
  state: () => INITIAL_STATE,
  actions: {
    async init() {
      const currentUser = useUserSession().user.value;
      if (currentUser) {
        await this.refreshToken(currentUser);
        await this.loadUser();
      }
    },

    async refreshToken(user: any) {
      await $fetch("/api/refresh", {
        method: "GET",
      });
      await useUserSession().fetch();
    },

    async login(username: string, password: string) {
      try {
        this.error = null;
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
        this.error = null;
        this.loading = true;
        await $fetch("/api/logout", { method: "POST" });
        await useUserSession().clear();
        this.user = null;
      } catch (e) {
        this.error = "Logout failed.";
      } finally {
        this.loading = false;
      }
    },

    async loadUser() {
      if (this.user) return;

      try {
        this.user = await $fetch("/api/account/profile");
      } catch (e) {
        this.error = "Failed to fetch user data.";
      } finally {
        this.loading = false;
      }

      this.loading = true;
      this.error = null;
    },
  },
});
