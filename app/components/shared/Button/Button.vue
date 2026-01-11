import { type } from '../../../../.nuxt/types/nitro-imports';
<script setup lang="ts">
type TButtonProps = {
  onClick?: () => void;
  class?: string;
  type?: "button" | "submit" | "reset";
};

const props = defineProps<TButtonProps>();
</script>
<template>
  <div
    class="cursor-pointer bg-midnight-700 bg-background-secondary border border-border/40 px-4 py-1 rounded-full hover:border-border select-none"
    :class="class"
    v-on:click="onClick && onClick()"
    :type="type || 'button'"
  >
    <slot />
  </div>
</template>
