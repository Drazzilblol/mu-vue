<script setup lang="ts">
import { computed, provide, reactive, ref } from "vue";
import type { TTab } from "../Tab/Tab.vue";

type TTabsProps = {
  tabs: TTab[];
};

const props = defineProps<TTabsProps>();

const active = ref<string | null>(props.tabs[0]?.title || null);

const activate = (tab?: TTab) => {
  active.value = tab?.title || null;
};

onMounted(() => {
  if (props.tabs.length > 0) {
    activate(props.tabs[0]);
  }
});

provide("register-tabs", (tab: TTab) => {
  return {
    active: computed(() => active.value === tab?.title),
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
        :class="{ active: tab.title === active, disabled: tab?.isLoading }"
        @click="!tab?.isLoading && activate(tab)"
      >
        <span class="flex flex-row items-center gap-1">
          {{ tab.title }}
          <Loading v-if="tab?.isLoading" size="small" />
        </span>
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

.disabled {
  @apply opacity-50 cursor-not-allowed;
}
</style>
