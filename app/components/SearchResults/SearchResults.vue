<script setup lang="ts">
import type { TRecommendation } from "~/types/Series";
import SearchResultsItem from "./SearchResultsItem.vue";

const props = defineProps({
  searchResult: {
    type: Array<any>,
  },
});
</script>

<template>
  <div class="grid grid-cols-4 gap-4">
    <SearchResultsItem
      v-for="item in searchResult"
      :key="item.series_id"
      :search-result-item="item.record"
    />
  </div>
</template>
