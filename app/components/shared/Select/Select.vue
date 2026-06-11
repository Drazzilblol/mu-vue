<script setup lang="ts">
import type { TOption } from "~/types/General";

type TSelectProps = {
  options: TOption[];
  selectedOption?: string | number;
  onselect: (option: string | number) => void;
};

const props = defineProps<TSelectProps>();

const selectedOption = ref<string | number | undefined>(props.selectedOption);

watch(
  () => props.selectedOption,
  () => {
    selectedOption.value = props.selectedOption;
  },
);
const isCollapsed = ref(true);
const selectRef = ref<HTMLElement | null>(null);

const onOutsideClick = (event: MouseEvent) => {
  if (selectRef.value && !selectRef.value.contains(event.target as Node)) {
    isCollapsed.value = true;
  }
};

onMounted(() => {
  window.addEventListener("click", onOutsideClick);
});

onUnmounted(() => {
  window.removeEventListener("click", onOutsideClick);
});

const onClick = () => {
  isCollapsed.value = !isCollapsed.value;
};

const onselect = (option: string | number) => {
  selectedOption.value = option;
  props.onselect(option);
  isCollapsed.value = true;
};
</script>

<template>
  <div ref="selectRef" class="relative w-full">
    <div
      class="bg-background-secondary border border-border/40 px-4 py-1 rounded-full w-full flex flex-row justify-between items-center cursor-pointer hover:border-border"
      @click="onClick"
    >
      <div>
        {{ options.find((option) => option.value === selectedOption)?.label }}
      </div>
      <div>▼</div>
    </div>
    <div
      v-if="!isCollapsed"
      class="bg-background-secondary border border-border/40 mt-1 rounded-3xl w-full absolute z-20"
    >
      <div class="flex flex-col">
        <div
          v-for="option in options"
          :key="option.value"
          class="px-4 py-2 hover:bg-accent cursor-pointer first:rounded-t-3xl last:rounded-b-3xl"
          @click="() => onselect(option.value)"
        >
          {{ option.label }}
        </div>
      </div>
    </div>
  </div>
</template>
