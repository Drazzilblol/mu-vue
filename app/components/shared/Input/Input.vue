<script setup lang="ts">
type TInputProps = {
  placeholder?: string;
  onKeydown?: (payload: KeyboardEvent) => void;
  onInput?: (payload: Event) => void;
  type?: "text" | "number";
  maxLength?: number;
};

const props = defineProps<TInputProps>();

const input = (event: Event) => {
  // Validate maxLength for number inputs
  if (event.target instanceof HTMLInputElement) {
    if (props.maxLength && event.target.value.length > props.maxLength) {
      const value = event.target.value;
      const validatedValue = value.slice(0, props.maxLength);
      event.target.value = validatedValue;
      model.value = validatedValue;
    }
  }
  if (props.onInput) {
    props.onInput(event);
  }
};

const model = defineModel();
</script>
<template>
  <div
    class="w-full h-8 py-1 px-4 text-[16px] rounded-full bg-white focus-within:ring-1 focus-within:ring-blue-500 relative"
  >
    <input
      class="w-full placeholder:text-muted-foreground bg-transparent border-none focus:outline-none text-black"
      v-model="model"
      :placeholder="placeholder"
      :type="type || 'text'"
      @keydown="onKeydown"
      @input="input"
      :maxLength="maxLength"
    />
  </div>
</template>
