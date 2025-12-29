<script setup lang="ts">
import type { TSeriesSearchResult } from "~/types/Series";

const searchStore = useSearchStore();
const searchResults = ref<TSeriesSearchResult[]>([]);
const container = ref<HTMLElement | null>(null);

onMounted(() => {
  if (searchStore.results.length === 0 && searchStore.loading === false) {
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

const filtersHeight = computed(() => {
  return container.value ? container.value.clientHeight - 32 + "px" : "auto";
});
</script>

<template>
  <div class="h-full w-full" ref="container">
    <InfiniteScroll
      :isLoading="searchStore.loading"
      :canLoadMore="searchStore.canLoadMore"
      :loadMore="() => searchStore.loadMore()"
    >
      <div class="flex flex-row gap-4 mx-auto max-w-[1240px] py-4">
        <SearchResults
          class="w-[75%]"
          :searchResults="searchResults"
          :isLoading="searchStore.loading"
        />
        <div
          class="w-[25%] sticky top-4 self-start"
          :style="{ height: filtersHeight }"
        >
          <div
            class="gap-2 grid grid-rows-[min-content_minmax(100px,_1fr)_min-content] max-h-full"
          >
            <div class="custom-block-border">
              <div class="text-white font-semibold mb-2">Sort</div>
              <SortManga />
            </div>
            <div class="custom-block-border">
              <Filters />
            </div>

            <Button class="text-center" :onClick="() => searchStore.search()">
              Filter
            </Button>
          </div>
        </div>
      </div>
    </InfiniteScroll>
  </div>
</template>
