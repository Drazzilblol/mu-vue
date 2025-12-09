<script setup lang="ts">
import type { TGenre } from "~/types/Series";

const props = defineProps({
  genres: {
    type: Array<TGenre>,
  },
});

const searchStore = useSearchStore();

const onGenreClick = (genre: string) => {
  searchStore.setGenre({ [genre]: true });
  searchStore.search();
  navigateTo("/search");
};
</script>

<template>
  <div
    v-for="value in genres"
    :key="value.genre"
    @click="() => onGenreClick(value.genre)"
    class="px-2 py-1 bg-gray-700 rounded-lg text-sm cursor-pointer"
  >
    {{ value.genre }}
  </div>
</template>
