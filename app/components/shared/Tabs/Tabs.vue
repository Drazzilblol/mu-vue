<script setup lang="ts">
import { computed, provide, reactive, ref } from "vue";
import type { TTab } from "../Tab/Tab.vue";

const active = ref<TTab | null>(null);
const tabs = reactive<TTab[]>([]);

const activate = (tab?: TTab) => {
  active.value = tab || null;
};

provide("register-tabs", (tab: TTab) => {
  tabs.push(tab);

  if (!active.value) {
    activate(tab);
  }

  return {
    active: computed(() => active.value === tab),

    unregister() {
      const index = tabs.indexOf(tab);
      tabs.splice(index, 1);

      if (active.value === tab) {
        activate(tabs[0]);
      }
    },
  };
});
</script>

<template>
  <div class="w-full">
    <div
      class="flex flex-row gap-2 w-max bg-zinc-900 bg-opacity-70 p-1 mb-2 rounded-full"
    >
      <div
        v-for="tab in tabs"
        class="cursor-pointer px-2 py-1 rounded-full border border-b-0 border-gray-600 bg-gray-700 hover:bg-gray-600"
        :class="{ active: tab === active }"
        @click="activate(tab)"
      >
        {{ tab.title }}
      </div>
    </div>
    <div class="body">
      <slot />
    </div>
  </div>
</template>

<style lang="css" scoped>
.active {
  background-color: rgb(59 130 246); /* bg-gray-700 */
}

.active:hover {
  background-color: rgb(96 165 250); /* bg-gray-700 */
}
</style>
