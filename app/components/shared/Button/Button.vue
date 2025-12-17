<script setup lang="ts">
type TButtonProps = {
  onclick: () => void;
  class?: string;
};

const props = defineProps<TButtonProps>();
</script>
<template>
  <div
    class="cursor-pointer bg-gray-900 border border-gray-900 text-white px-4 py-2 rounded-full hover:border-gray-700 select-none"
    :class="class"
    v-on:click="() => onclick()"
  >
    <slot />
  </div>
</template>
