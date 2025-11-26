<script setup lang="ts">
import Ranking from "~/components/Ranking/Ranking.vue";

const searchStore = useSearchStore();
const searchResults = ref<any[]>([]);
console.log(searchResults.value);

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
  <div class="min-h-screen bg-gray-800">
    <Ranking :list="searchResults" />
  </div>
</template>
