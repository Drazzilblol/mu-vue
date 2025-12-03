<script setup lang="ts">
const props = defineProps({
  searchResult: {
    type: Array<any>,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div>
    <div class="grid grid-cols-4 gap-4">
      <SearchResultsItem
        v-for="item in searchResult"
        :key="item.series_id"
        :search-result-item="item.record"
      />
    </div>
    <Loading v-if="isLoading" class="text-center pt-4" />
  </div>
</template>
