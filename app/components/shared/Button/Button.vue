<script setup lang="ts">
type TButtonProps = {
  onClick: () => void;
  class?: string;
};

const props = defineProps<TButtonProps>();
</script>
<template>
  <div
    class="cursor-pointer bg-zinc-900 border border-gray-600 border-opacity-40 text-white px-4 py-1 rounded-full hover:border-gray-700 select-none"
    :class="class"
    v-on:click="() => onClick()"
  >
    <slot />
  </div>
</template>
