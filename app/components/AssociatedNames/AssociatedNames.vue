<script setup lang="ts">
const props = defineProps({
  names: {
    type: Array<string>,
    required: true,
  } as any,
});
import { useNotificationsStore } from "~/stores/notifications";

const notificationStore = useNotificationsStore();

const copy = (name: string) => {
  navigator.clipboard.writeText(name);
  notificationStore.addNotification(`Text copied to clipboard`);
};
</script>

<template>
  <div class="flex flex-col justify-center text-white flex-wrap pt-2">
    <div class="font-semibold">Associated Names:</div>
    <div
      class="cursor-pointer hover:text-blue-300 hover:underline"
      v-for="name in names"
      v-on:click="copy(name.title)"
    >
      {{ name.title }}
    </div>
  </div>
</template>
