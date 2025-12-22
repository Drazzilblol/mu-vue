<script setup lang="ts">
type TPopupProps = {
  width: number;
  height: number;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
};
const props = defineProps<TPopupProps>();
const targetContainer = ref<HTMLElement | null>(null);
const showPopup = ref(false);
const timeout = ref<number | null>(null);

const getCorrectedPosition = (position: TPopupProps["position"]) => {
  if (!targetContainer.value) return;
  const rect = targetContainer.value.getBoundingClientRect();

  switch (position) {
    case "top":
      return rect.top - props.height - 8 >= 0 ? "top" : "bottom";
    case "bottom":
      return rect.bottom + props.height + 8 <= window.innerHeight
        ? "bottom"
        : "top";
    case "left":
      return rect.left - props.width - 8 >= 0 ? "left" : "right";
    case "right":
      return rect.right + props.width + 8 <= window.innerWidth
        ? "right"
        : "left";
  }
};

const popupPosition = computed(() => {
  if (!targetContainer.value) return;
  const rect = targetContainer.value.getBoundingClientRect();
  let top = 0;
  let left = 0;
  const pos = getCorrectedPosition(props.position);

  if (pos) {
    switch (pos) {
      case "top":
        top = rect.top - props.height - 8;
        left = rect.left;
        break;
      case "bottom":
        top = rect.bottom + 8;
        left = rect.left;
        break;
      case "left":
        top = rect.top;
        left = rect.left - props.width - 8;
        break;
      case "right":
        top = rect.top;
        left = rect.right + 8;
        break;
    }
  }

  return { top, left };
});

const onMouseEnter = () => {
  if (props.delay) {
    timeout.value = setTimeout(() => {
      showPopup.value = true;
    }, props.delay);
  } else {
    showPopup.value = true;
  }
};

const onMouseLeave = () => {
  if (timeout.value) {
    clearTimeout(timeout.value);
  }
  showPopup.value = false;
};
</script>

<template>
  <div
    ref="targetContainer"
    class="w-fit h-fit"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <slot name="target"></slot>
  </div>
  <PopupModal
    v-if="showPopup"
    :width="width"
    :height="height"
    :position="getCorrectedPosition(position)"
    :popoverTop="popupPosition ? popupPosition.top : 0"
    :popoverLeft="popupPosition ? popupPosition.left : 0"
  >
    <slot name="content"></slot>
  </PopupModal>
</template>
