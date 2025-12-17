<script setup lang="ts">
type TInputProps = {
  placeholder?: string;
  onOptionClick: (value: string) => void;
  getOptions: (input: string) => Promise<string[]>;
};

const props = defineProps<TInputProps>();
const options = ref<Array<string> | null>(null);
const isCollapsed = ref(true);
const loading = ref(false);
const autocompleteRef = ref<HTMLElement | null>(null);
const inputValue = ref<string>("");

onMounted(() => {
  window.addEventListener("click", onOutsideClick);
});

onUnmounted(() => {
  window.removeEventListener("click", onOutsideClick);
});

const onClick = () => {
  if (!options.value) return;
  isCollapsed.value = false;
};

const onOutsideClick = (event: MouseEvent) => {
  if (
    autocompleteRef.value &&
    !autocompleteRef.value.contains(event.target as Node)
  ) {
    isCollapsed.value = true;
  }
};

const onOptionClick = (option: string) => {
  props.onOptionClick(option);
  inputValue.value = "";
  options.value = null;
  isCollapsed.value = true;
};

const getOptions = async (input: string) => {
  try {
    loading.value = true;
    const response = await props.getOptions(input);
    options.value = response;
    isCollapsed.value = false;
  } finally {
    loading.value = false;
  }
};

const debouncedGetOptions = debounce(getOptions, 500);

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.value;
  if (value.length < 2) {
    isCollapsed.value = true;
    options.value = null;
    return;
  }
  if (value && value.length >= 2) {
    debouncedGetOptions(value);
  }
};
</script>
<template>
  <div
    ref="autocompleteRef"
    class="w-full py-1 px-4 text-[16px] rounded-full bg-white focus-within:ring-1 focus-within:ring-blue-500 relative"
  >
    <input
      class="w-full placeholder:text-muted-foreground bg-transparent border-none focus:outline-none"
      v-model="inputValue"
      @input="onInput"
      @click="onClick"
      :placeholder="placeholder"
    />
    <div
      class="bg-gray-900 border border-gray-900 text-white rounded-2xl w-full absolute z-20 left-0 mt-2 max-h-100 overflow-y-auto"
      v-if="!isCollapsed"
    >
      <div class="flex flex-col">
        <div class="px-4 py-1" v-if="options?.length === 0">Nothing found</div>
        <div
          v-for="option in options"
          :key="option"
          @click="() => onOptionClick(option)"
          class="px-4 py-1 hover:bg-gray-700 cursor-pointer first:rounded-t-2xl last:rounded-b-2xl"
        >
          {{ option }}
        </div>
      </div>
    </div>
  </div>
</template>
