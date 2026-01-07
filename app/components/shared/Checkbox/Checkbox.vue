<script setup lang="ts">
import { TIconType } from "~/components/shared/Icons/IconsTypes";

const props = defineProps({
  onclick: {
    type: Function,
    required: true,
  },
  value: {
    type: Boolean,
    required: false,
  },
});

const backgroundColor = computed(() => {
  if (props.value === true) {
    return "bg-primary border-primary";
  } else {
    return "bg-background-accent border-primary";
  }
});
</script>
<template>
  <div
    class="flex flex-row items-center gap-2 cursor-pointer select-none"
    v-on:click="() => onclick()"
  >
    <div
      class="w-5 h-5 rounded-md border text-2xl font-semibold flex items-center justify-center relative"
      :class="backgroundColor"
    >
      <div
        class="absolute flex items-center top-0 w-full h-full justify-center"
      >
        <Icon v-if="value" :icon="TIconType.CHECK" :size="16" />
      </div>
    </div>
    <slot />
  </div>
</template>
