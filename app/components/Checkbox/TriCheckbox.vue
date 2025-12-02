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
  if (props.value === undefined) {
    return "bg-gray-600 border-blue-600";
  } else if (props.value === true) {
    return "bg-green-600 border-green-500";
  } else {
    return "bg-red-600 border-red-500";
  }
});
</script>
<template>
  <div
    class="flex flex-row items-center gap-2 cursor-pointer text-white select-none"
    v-on:click="
      () => {
        if (value === undefined) {
          props.onclick(true);
        } else if (value === true) {
          props.onclick(false);
        } else {
          props.onclick(undefined);
        }
      }
    "
  >
    <div
      class="w-5 h-5 rounded-md border border-blue-400 bg-gray-600 text-2xl font-semibold flex items-center justify-center relative"
      :class="backgroundColor"
    >
      <div
        class="absolute flex items-center top-0 w-full h-full justify-center"
      >
        <Icon v-if="value === true" :icon="TIconType.PLUS" :size="16" />
        <Icon v-if="value === false" :icon="TIconType.MINUS" :size="16" />
      </div>
    </div>
    <slot />
  </div>
</template>
