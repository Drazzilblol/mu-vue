<script setup lang="ts">
import { inject, reactive, toRef } from "vue";

export type TTab = {
  title: string;
  isLoading?: boolean;
};

type TRegisterType = (tab: TTab) => {
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

const { active } = register!(tab);
</script>

<template>
  <div v-if="active">
    <slot />
  </div>
</template>
