import { defineStore } from "pinia";

export const useNotificationsStore = defineStore("notifications", {
  state: () => ({
    notifications: [] as { message: string; id: number }[],
  }),

  getters: {
    getNotifications: (state) => state.notifications,
  },

  actions: {
    addNotification(message: string) {
      const id = Date.now();
      this.notifications.push({ message, id });

      setTimeout(() => {
        this.removeNotification(id);
      }, 5000);
    },

    removeNotification(id: number) {
      this.notifications = this.notifications.filter(
        (notification) => notification.id !== id
      );
    },

    clearNotifications() {
      this.notifications = [];
    },
  },
});
