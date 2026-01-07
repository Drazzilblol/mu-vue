<script setup lang="ts">
import type { TSeriesSearchItem } from "~/types/Series";

type TSearchResultsItemProps = {
  searchResultItem: TSeriesSearchItem;
};

const props = defineProps<TSearchResultsItemProps>();

const navigate = () => {
  navigateTo(`/series/${props.searchResultItem?.series_id}`);
};
</script>

<template>
  <div
    class="flex flex-col items-center p-2 rounded-lg cursor-pointer custom-block-border"
    v-on:click="navigate"
  >
    <div class="relative w-full">
      <CoverImage
        :url="searchResultItem?.image?.url?.original"
        :blurredBackground="true"
      />
      <div
        class="absolute bottom-0 right-0 px-2 py-1 bg-accent/80 text-sm font-semibold rounded-full m-2"
      >
        ★ {{ searchResultItem.bayesian_rating || 0 }}
      </div>
    </div>

    <div class="text-sm mt-2 self-start">
      <div class="font-normal text-foreground/70">
        {{ searchResultItem?.type }} - {{ searchResultItem?.year }}
      </div>
      <div class="font-semibold line-clamp-2">
        {{ searchResultItem?.title }}
      </div>
    </div>
  </div>
</template>
