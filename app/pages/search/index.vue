<script setup lang="ts">
const searchStore = useSearchStore();
const searchResults = ref<any[]>([]);
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
          :search-result="searchResults"
          :isLoading="searchStore.loading"
        />
        <div
          class="w-[25%] sticky top-4 self-start overflow-hidden"
          :style="{ height: filtersHeight }"
        >
          <div
            class="gap-2 grid grid-rows-[min-content_1fr_min-content] overflow-hidden max-h-full"
          >
            <div class="custom-block-border">
              <div class="text-white font-semibold mb-2">Sort</div>
              <SortManga />
            </div>
            <div class="custom-block-border overflow-hidden">
              <Filters />
            </div>

            <Button class="text-center" :onclick="() => searchStore.search()">
              Filter
            </Button>
          </div>
        </div>
      </div>
    </InfiniteScroll>
  </div>
</template>
