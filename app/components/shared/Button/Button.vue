<script setup lang="ts">
const props = defineProps({
  onclick: {
    type: Function,
    required: true,
  },
});
</script>
<template>
  <div
    class="cursor-pointer bg-gray-900 border border-gray-900 text-white px-4 py-2 rounded-full hover:border-gray-700 select-none"
    v-on:click="() => onclick()"
  >
    <slot />
  </div>
</template>
