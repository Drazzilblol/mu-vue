<script setup lang="ts">
import { inject, onUnmounted, reactive, toRef } from "vue";

export type TTab = {
  title: string;
};

type TRegisterType = (tab: TTab) => {
  unregister: () => void;
  active: boolean;
};

type TTabProps = {
  title: string;
};

const props = defineProps<TTabProps>();

const register = inject<TRegisterType>("register-tabs");

const tab = reactive({
  title: toRef(props, "title"),
});

const { active, unregister } = register!(tab);

onUnmounted(unregister);
</script>

<template>
  <div v-if="active">
    <slot />
  </div>
</template>
