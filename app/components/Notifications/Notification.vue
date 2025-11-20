<script setup lang="ts">
import { useNotificationsStore } from "~/stores/notifications";

const props = defineProps({
  notification: {
    type: Object,
    required: true,
  } as any,
});

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
