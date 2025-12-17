<script setup lang="ts">
import { TIconType } from "./IconsTypes";
import PlusSvg from "./PlusSvg.vue";
import MinusSvg from "./MinusSvg.vue";
import CheckSvg from "./CheckSvg.vue";
import CloseSvg from "./CloseSvg.vue";

type TProps = {
  icon: TIconType;
  size?: number;
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
  <PlusSvg
    v-if="icon === TIconType.PLUS"
    :size="size"
    :stroke-color="strokeColor"
    :strokeWidth="strokeWidth"
    :classes="classes"
  />
  <MinusSvg
    v-else-if="icon === TIconType.MINUS"
    :size="size"
    :stroke-color="strokeColor"
    :strokeWidth="strokeWidth"
    :classes="classes"
  />
  <CheckSvg
    v-else-if="icon === TIconType.CHECK"
    :size="size"
    :stroke-color="strokeColor"
    :strokeWidth="strokeWidth"
    :classes="classes"
  />
  <CloseSvg
    v-else-if="icon === TIconType.CLOSE"
    :size="size"
    :stroke-color="strokeColor"
    :strokeWidth="strokeWidth"
    :classes="classes"
  />
</template>
