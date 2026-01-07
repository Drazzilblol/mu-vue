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
const arrowShift = ref(0);

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

const popupPosition = () => {
  if (!targetContainer.value) return;
  const rect = targetContainer.value.getBoundingClientRect();
  let top = 0;
  let left = 0;
  const pos = getCorrectedPosition(props.position);

  if (pos) {
    switch (pos) {
      case "top": {
        top = rect.top - props.height - 8;

        const posLeft = rect.left - props.width / 2 + rect.width / 2 || 0;
        left = posLeft;
        if (posLeft + props.width > window.innerWidth) {
          left = window.innerWidth - props.width;
          arrowShift.value = posLeft + props.width - window.innerWidth;
        } else if (posLeft < 0) {
          left = 0;
          arrowShift.value = posLeft;
        }
        break;
      }
      case "bottom": {
        top = rect.bottom + 8;

        const posLeft = rect.left - props.width / 2 + rect.width / 2 || 0;
        left = posLeft;
        if (posLeft + props.width > window.innerWidth) {
          left = window.innerWidth - props.width;
          arrowShift.value = posLeft + props.width - window.innerWidth;
        } else if (posLeft < 0) {
          left = 0;
          arrowShift.value = posLeft;
        }
        break;
      }
      case "left": {
        const posTop = rect.top - props.height / 2 + rect.height / 2 || 0;
        top = posTop;
        if (posTop + props.height >= window.innerHeight) {
          top = window.innerHeight - props.height - 4;
          arrowShift.value = posTop + props.height - window.innerHeight;
        } else if (posTop < 0) {
          top = 0;
          arrowShift.value = posTop;
        }
        left = rect.left - props.width - 12;
        break;
      }
      case "right": {
        const posTop = rect.top - props.height / 2 + rect.height / 2 || 0;
        top = posTop;
        if (posTop + props.height >= window.innerHeight) {
          top = window.innerHeight - props.height - 4;
          arrowShift.value = posTop + props.height - window.innerHeight;
        } else if (posTop < 0) {
          top = 0;
          arrowShift.value = posTop;
        }

        left = rect.right + 12;
        break;
      }
    }
  }

  return { top, left };
};

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
    class="w-fit h-fit max-w-full max-h-full overflow-hidden"
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
    :popoverTop="popupPosition()?.top || 0"
    :popoverLeft="popupPosition()?.left || 0"
    :arrowShift="arrowShift"
  >
    <slot name="content"></slot>
  </PopupModal>
</template>
