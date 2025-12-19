<script setup lang="ts">
type TButtonProps = {
  onClick: () => void;
  class?: string;
};

const props = defineProps<TButtonProps>();
</script>
<template>
  <div
    class="cursor-pointer bg-gray-900 border border-gray-900 text-white px-4 py-1 rounded-full hover:border-gray-700 select-none"
    :class="class"
    v-on:click="() => onClick()"
  >
    <slot />
  </div>
</template>
