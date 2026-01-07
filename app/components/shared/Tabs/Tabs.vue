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
      class="flex flex-row gap-2 w-max custom-block-border !p-1 mb-2 !rounded-full"
    >
      <div
        v-for="tab in tabs"
        class="cursor-pointer px-2 py-1 rounded-full hover:bg-accent"
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
  @apply bg-primary;
}

.active:hover {
  @apply bg-primary/80;
}
</style>
