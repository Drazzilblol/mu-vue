<script setup lang="ts">
import { inject, onUnmounted, reactive, toRef } from "vue";

export type TTab = {
  title: string;
};

const props = defineProps({
  title: {
    required: true,
    type: String,
  },
});

const register = inject<any>("register-tabs");

const tab = reactive({
  title: toRef(props, "title"),
});

const { active, unregister } = register(tab);

onUnmounted(unregister);
</script>

<template>
  <div v-if="active">
    <slot />
  </div>
</template>
