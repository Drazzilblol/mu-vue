<script setup lang="ts">
type TProps = {
  size?: "small" | "medium" | "large" | "xl";
  color?: "blue" | "gray" | "white" | "green" | "red" | "purple";
  duration?: number;
  text?: string;
  centered?: boolean;
};

const props = withDefaults(defineProps<TProps>(), {
  size: "medium",
  color: "blue",
  duration: 1000,
  text: "",
  centered: false,
});

const sizeClass = computed(() => {
  const sizes = {
    small: "w-4 h-4 border-2",
    medium: "w-8 h-8 border-2",
    large: "w-12 h-12 border-4",
    xl: "w-16 h-16 border-4",
  };
  return sizes[props.size];
});

const colorClass = computed(() => {
  const colors = {
    blue: "border-blue-500",
    gray: "border-accent",
    white: "border-foreground",
    green: "border-green-500",
    red: "border-red-500",
    purple: "border-purple-500",
  };
  return colors[props.color];
});

const textColorClass = computed(() => {
  const textColors = {
    blue: "text-blue-500",
    gray: "text-accent",
    white: "text-foreground",
    green: "text-green-500",
    red: "text-red-500",
    purple: "text-purple-500",
  };
  return textColors[props.color];
});

const containerClass = computed(() => {
  return props.centered ? "min-h-[200px]" : "";
});
</script>

<template>
  <div class="flex items-center justify-center" :class="containerClass">
    <div
      class="animate-spin rounded-full border-solid border-t-transparent"
      :class="[sizeClass, colorClass]"
      :style="{ animationDuration: `${duration}ms` }"
    ></div>
    <span v-if="text" class="ml-2 text-sm" :class="textColorClass">{{
      text
    }}</span>
  </div>
</template>

<style scoped>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
