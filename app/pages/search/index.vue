<script setup lang="ts">
import SearchResults from "~/components/SearchResults/SearchResults.vue";
const searchStore = useSearchStore();
const searchResults = ref<any[]>([]);
const scrollContainer = ref<HTMLElement | null>(null);

onMounted(() => {
  scrollContainer.value?.addEventListener("scroll", handleScroll);
  if (searchStore.results.length === 0) {
    searchStore.search();
    return;
  } else {
    searchResults.value = searchStore.results;
  }
});

onUnmounted(() => {
  scrollContainer.value?.removeEventListener("scroll", handleScroll);
});

const handleScroll = () => {
  if (!scrollContainer.value) return;
  const bottomOfWindow =
    scrollContainer.value?.scrollTop + scrollContainer.value?.clientHeight >=
    scrollContainer.value?.scrollHeight - 200;
  if (bottomOfWindow && !searchStore.loading && searchStore.canLoadMore) {
    searchStore.loadMore();
  }
};

watch(
  () => searchStore.results,
  (newResults) => {
    searchResults.value = newResults;
  }
);
</script>

<template>
  <div ref="scrollContainer" class="w-full h-full overflow-auto">
    <div class="flex flex-row gap-4 mx-auto max-w-[1240px] py-4">
      <SearchResults
        class="w-[75%]"
        :search-result="searchResults"
        :isLoading="searchStore.loading"
      />
      <div class="w-[25%] h-fit sticky top-4"><Filters></Filters></div>
    </div>
  </div>
</template>
