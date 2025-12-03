<script setup lang="ts">
import { useNotificationsStore } from "~/stores/notifications";

const notificationStore = useNotificationsStore();
</script>
<template>
  <div
    class="fixed bottom-4 left-2/4 -translate-x-1/2 flex flex-col gap-2 items-center"
  >
    <Notification
      v-for="notification in notificationStore.getNotifications"
      :notification="notification"
    />
  </div>
</template>
