<script setup lang="ts">
import SearchResults from "~/components/SearchResults/SearchResults.vue";
const { data } = (await useFetch("/api/search")) as any;
</script>

<template>
  <div
    class="flex flex-row pt-4 pb-4 max-w-[1240px] justify-center mx-auto w-full shrink-0 gap-4"
  >
    <SearchResults class="w-[75%]" :search-result="data.results" />
    <div class="w-[25%]">Filters</div>
  </div>
</template>
