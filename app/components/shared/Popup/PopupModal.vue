<script lang="ts" setup>
type TPopupModalProps = {
  width?: number;
  height?: number;
  popoverTop: number;
  popoverLeft: number;
  position?: "top" | "bottom" | "left" | "right";
};
const props = defineProps<TPopupModalProps>();
</script>

<template>
  <teleport to="#app">
    <div
      class="absolute z-50 text-black rounded-lg shadow-lg border border-gray-600 border-opacity-40 p-2 bg-zinc-700 popup"
      :class="`pos-${position || 'bottom'}`"
      ref="modal"
      :style="{
        top: popoverTop + 'px',
        left: popoverLeft + 'px',
        width: width ? width + 'px' : 'auto',
        height: height ? height + 'px' : 'auto',
      }"
    >
      <div ref="popover" class="popover">
        <slot ref="content"></slot>
      </div>
    </div>
  </teleport>
</template>

<style lang="css" scoped>
.popup:before {
  content: "";
  transform: rotate(45deg);
  position: absolute;
  @apply bg-zinc-700 w-4 h-4 border-gray-600 border-opacity-40;
}

.popup.pos-bottom:before {
  left: calc(50% - 10px);
  top: -8px;
}
.popup.popup.pos-left:before:before {
  top: calc(50% - 10px);
  right: -8px;
}
.popup.pos-top:before {
  left: calc(50% - 10px);
  bottom: -8px;
}
.popup.pos-right:before {
  top: calc(50% - 10px);
  left: -8px;
}
</style>
