<script setup lang="ts">
type TInputProps = {
  placeholder?: string;
  onkeydown?: (payload: KeyboardEvent) => void;
};

const props = defineProps<TInputProps>();

const model = defineModel();
</script>
<template>
  <div
    class="w-full py-2 px-4 text-[16px] rounded-full bg-white focus-within:ring-1 focus-within:ring-blue-500 relative"
  >
    <input
      class="w-full placeholder:text-muted-foreground bg-transparent border-none focus:outline-none"
      v-model="model"
      :placeholder="placeholder"
      @keydown="onkeydown"
    />
  </div>
</template>
