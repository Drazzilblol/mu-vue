<script setup lang="ts">
import SearchResults from "~/components/SearchResults/SearchResults.vue";
const searchStore = useSearchStore();
const searchResults = ref<any[]>([]);

onMounted(() => {
  if (searchStore.results.length === 0) {
    searchStore.search();
    return;
  } else {
    searchResults.value = searchStore.results;
  }
});

watch(
  () => searchStore.results,
  (newResults) => {
    searchResults.value = newResults;
  }
);
</script>

<template>
  <div
    class="flex flex-row pt-4 pb-4 max-w-[1240px] justify-center mx-auto w-full shrink-0 gap-4"
  >
    <SearchResults class="w-[75%]" :search-result="searchResults" />
    <div class="w-[25%]"><Filters></Filters></div>
  </div>
</template>
