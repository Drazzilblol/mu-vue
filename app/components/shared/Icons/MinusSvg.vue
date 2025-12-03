<script setup lang="ts">
type TProps = {
  size?: number | string;
  color?: "white" | "black" | "blue" | "green" | "red" | "gray" | "current";
  strokeWidth?: number;
  classes?: string;
};

const props = withDefaults(defineProps<TProps>(), {
  size: 24,
  color: "current",
  strokeWidth: 2,
  classes: "",
});

const strokeColor = computed(() => {
  const colors = {
    white: "#ffffff",
    black: "#000000",
    blue: "#3b82f6",
    green: "#10b981",
    red: "#ef4444",
    gray: "#6b7280",
    current: "currentColor",
  };
  return colors[props.color];
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
      d="M5 12H19"
      :stroke="strokeColor"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
