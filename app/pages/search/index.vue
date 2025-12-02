<script setup lang="ts">
import InfiniteScroll from "~/components/InfiniteScroll/InfiniteScroll.vue";
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
  <InfiniteScroll
    :isLoading="searchStore.loading"
    :canLoadMore="searchStore.canLoadMore"
    :loadMore="() => searchStore.loadMore()"
  >
    <div class="flex flex-row gap-4 mx-auto max-w-[1240px] py-4">
      <SearchResults
        class="w-[75%]"
        :search-result="searchResults"
        :isLoading="searchStore.loading"
      />
      <!-- fix sticky scroll -->
      <div class="flex flex-col w-[25%] h-fit gap-2">
        <div class="text-white font-semibold">Sort</div>
        <SortManga />
        <div class="text-white font-semibold">Filters</div>
        <Filters />
      </div>
    </div>
  </InfiniteScroll>
</template>
