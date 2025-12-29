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
    class="bg-gray-700 p-2 rounded-md text-green-400 w-fit flex flex-row gap-2 cursor-pointer"
    v-on:click="notificationStore.removeNotification(notification.id)"
  >
    {{ notification.message }}
  </div>
</template>
