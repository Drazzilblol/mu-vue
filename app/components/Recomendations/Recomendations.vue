<script setup lang="ts">
import RecomendationItem from "./RecomendationItem.vue";

const props = defineProps({
  recomendations: {
    type: Array as any,
    required: true,
  } as any,
});
</script>

<template>
  <div class="flex flex-col text-white gap-4">
    <div class="font-semibold">{{ "Similar" }}</div>
    <RecomendationItem
      v-for="item in recomendations"
      :key="item.id"
      :recomendation="item"
    />
  </div>
</template>
