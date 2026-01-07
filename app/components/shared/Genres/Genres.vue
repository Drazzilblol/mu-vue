<script setup lang="ts">
import type { TGenre } from "~/types/General";

type TGenresProps = {
  genres?: TGenre[];
  class?: string;
};

const props = defineProps<TGenresProps>();

const searchStore = useSearchStore();

const onGenreClick = (genre: string) => {
  searchStore.resetFilters();
  searchStore.setGenre({ [genre]: true });
  searchStore.search();
  navigateTo("/search");
};
</script>

<template>
  <div class="flex flex-wrap gap-2 content-start" :class="props.class">
    <div
      v-for="value in genres"
      :key="value.genre"
      @click="() => onGenreClick(value.genre)"
      class="px-2 py-1 bg-background-secondary/70 border border-border/40 rounded-lg text-sm cursor-pointer h-min"
    >
      <span>{{ value.genre }}</span>
      <span v-if="value?.count">({{ value.count }})</span>
    </div>
  </div>
</template>
