<script setup lang="ts">
import { useNotificationsStore } from "~/stores/notifications";

const props = defineProps({
  names: {
    type: Array<string>,
  },
  title: {
    type: String,
    default: "Associated Names:",
  },
  lines: {
    type: Number,
    default: 6,
  },
});

const notificationStore = useNotificationsStore();

const copy = (name: string) => {
  navigator.clipboard.writeText(name);
  notificationStore.addNotification(`Text copied to clipboard`);
};
</script>

<template>
  <div class="flex flex-col justify-center text-white flex-wrap pt-2">
    <div class="font-semibold">{{ title }}</div>
    <TextCollapse :lines="lines">
      <div
        class="cursor-pointer hover:text-blue-300 hover:underline"
        v-for="name in names"
        v-on:click="copy(name)"
      >
        {{ name }}
      </div>
    </TextCollapse>
  </div>
</template>
