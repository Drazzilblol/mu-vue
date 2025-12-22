<script lang="ts" setup>
type TPopupModalProps = {
  width?: number;
  height?: number;
  popoverTop: number;
  popoverLeft: number;
  position?: "top" | "bottom" | "left" | "right";
  arrowShift?: number;
};
const props = defineProps<TPopupModalProps>();

const getArrowPosition = () => {
  switch (props.position) {
    case "top":
      return {
        left: `calc(50% + ${props.arrowShift}px)`,
        bottom: "-8px",
        transform: "translateX(-50%) rotate(45deg)",
      };
    case "bottom":
      return {
        left: `calc(50% + ${props.arrowShift}px)`,
        top: "-8px",
        transform: "translateX(-50%) rotate(45deg)",
      };
    case "left":
      return {
        right: "-8px",
        top: `calc(50% + ${props.arrowShift}px)`,
        transform: "translateY(-50%) rotate(45deg)",
      };
    case "right":
      return {
        left: "-8px",
        top: `calc(50% + ${props.arrowShift}px)`,
        transform: "translateY(-50%) rotate(45deg)",
      };
    default:
      return {
        left: "50%",
        top: "0",
        transform: "translateX(-50%) rotate(45deg)",
      };
  }
};
</script>

<template>
  <teleport to="#app">
    <div
      class="absolute z-50 text-black rounded-lg shadow-lg border border-gray-600 border-opacity-40 p-2 bg-zinc-700"
      :class="`pos-${position || 'bottom'}`"
      ref="modal"
      :style="{
        top: popoverTop + 'px',
        left: popoverLeft + 'px',
        width: width ? width + 'px' : 'auto',
        height: height ? height + 'px' : 'auto',
      }"
    >
      <div class="arrow" :style="getArrowPosition()" />

      <slot ref="content"></slot>
    </div>
  </teleport>
</template>

<style lang="css" scoped>
.arrow {
  @apply absolute w-4 h-4 bg-zinc-700 border-gray-600 border-opacity-40;
}
</style>
