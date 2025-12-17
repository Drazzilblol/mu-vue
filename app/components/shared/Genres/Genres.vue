<script setup lang="ts">
import type { TGenre } from "~/types/General";

const props = defineProps({
  genres: {
    type: Array<TGenre>,
  },
});

const searchStore = useSearchStore();

const onGenreClick = (genre: string) => {
  searchStore.resetFilters();
  searchStore.setGenre({ [genre]: true });
  searchStore.search();
  navigateTo("/search");
};
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <div
      v-for="value in genres"
      :key="value.genre"
      @click="() => onGenreClick(value.genre)"
      class="px-2 py-1 bg-gray-700 rounded-lg text-sm cursor-pointer"
    >
      <span>{{ value.genre }}</span>
      <span v-if="value?.count">({{ value.count }})</span>
    </div>
  </div>
</template>
