<script setup lang="ts">
import type { TCategory } from "~/types/Series";

type TCategoryProps = {
  categories?: TCategory[];
};

const props = defineProps<TCategoryProps>();

const searchStore = useSearchStore();

const preparedCategories = computed(() => {
  const sorted = props.categories?.toSorted(
    (a: TCategory, b: TCategory) => b.votes - a.votes
  );
  const maxVotes = sorted?.[0]?.votes || 0;
  const full = props.categories?.map((category: TCategory) => {
    return {
      ...category,
      weight: category.votes / maxVotes,
    };
  });
  const popular = sorted?.splice(0, 10).map((category: TCategory) => {
    return {
      ...category,
      weight: category.votes / maxVotes,
    };
  });
  return { full, popular };
});

const onCategoryClick = (category: string) => {
  searchStore.setCategories([category]);
  searchStore.search();
  navigateTo("/search");
};
</script>

<template>
  <div class="flex flex-col justify-center text-center custom-block">
    <div class="font-semibold mb-2">Categories:</div>
    <div class="flex justify-center text-white flex-wrap gap-2">
      <div
        class="even:bg-gray-700 cursor-pointer rounded-sm hover:text-blue-300"
        :style="{ fontSize: Math.round(20 * category.weight) + 'px' }"
        v-for="category in preparedCategories.popular"
        @click="() => onCategoryClick(category.category)"
      >
        {{ category.category }}
      </div>
    </div>
  </div>
</template>
