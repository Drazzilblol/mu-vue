<script setup lang="ts">
import type { TSeriesSearchResult } from "~/types/Series";

type TSearchResultsProps = {
  searchResults: TSeriesSearchResult[];
  isLoading?: boolean;
};
const props = defineProps<TSearchResultsProps>();
</script>

<template>
  <div>
    <div class="grid grid-cols-4 gap-4">
      <SearchResultsItem
        v-for="item in searchResults"
        :key="item.record.series_id"
        :searchResultItem="item.record"
      />
    </div>
    <Loading v-if="isLoading" class="text-center pt-4" />
  </div>
</template>
