<script setup lang="ts">
const props = defineProps({
  lines: Number,
});

const isCollapsed = ref(true);
const textContainer = ref<HTMLElement | null>(null);
const isOverflowing = computed(() => {
  if (!textContainer.value) return false;
  return textContainer.value.scrollHeight > textContainer.value.clientHeight;
});
</script>

<template>
  <div
    ref="textContainer"
    class="line-clamp-1"
    :style="`-webkit-line-clamp: ${
      isCollapsed && props.lines ? props.lines : 'none'
    }`"
  >
    <slot></slot>
  </div>
  <div
    class="w-fit cursor-pointer text-blue-200 hover:text-blue-400"
    v-on:click="isCollapsed = !isCollapsed"
    v-if="isOverflowing"
  >
    {{ isCollapsed ? "More..." : "Less..." }}
  </div>
</template>
