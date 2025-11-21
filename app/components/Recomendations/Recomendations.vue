<script setup lang="ts">
import type { TRecommendation } from "~/types/Series";
import RecomendationItem from "./RecomendationItem.vue";

const props = defineProps({
  recomendations: {
    type: Array<TRecommendation>,
  },
  title: String,
});
</script>

<template>
  <div class="flex flex-col text-white gap-4">
    <div class="font-semibold">{{ title }}</div>
    <RecomendationItem
      v-for="item in recomendations"
      :key="item.series_id"
      :recomendation="item"
    />
  </div>
</template>
