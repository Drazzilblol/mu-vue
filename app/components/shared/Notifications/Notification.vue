<script setup lang="ts">
import { useNotificationsStore } from "~/stores/notifications";

type TNotificationProps = {
  notification: {
    id: number;
    message: string;
  };
};

const props = defineProps<TNotificationProps>();

const notificationStore = useNotificationsStore();
</script>
<template>
  <div
    class="bg-accent p-2 rounded-md text-green-400 w-fit flex flex-row gap-2 cursor-pointer z-50"
    v-on:click="notificationStore.removeNotification(notification.id)"
  >
    {{ notification.message }}
  </div>
</template>
