<script setup lang="ts">
const props = defineProps({
  size: Number,
  strokeColor: String,
  strokeWidth: Number,
  classes: String,
});
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="classes"
  >
    <path
      d="M12 18L6 6L18 6Z"
      :stroke="strokeColor"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
