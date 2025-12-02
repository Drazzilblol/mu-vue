<script setup lang="ts">
import Icon from "../Icons/Icon.vue";
import { TIconType } from "../Icons/IconsTypes";

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
    return "bg-blue-600 border-blue-600";
  } else {
    return "bg-gray-600 border-blue-600";
  }
});
</script>
<template>
  <div
    class="flex flex-row items-center gap-2 cursor-pointer text-white select-none"
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
