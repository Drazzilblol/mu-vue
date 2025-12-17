<script setup lang="ts">
import type { TCategory } from "~/types/Series";

type TCategoryProps = {
  categories?: TCategory[];
};

const props = defineProps<TCategoryProps>();

const searchStore = useSearchStore();

const isCollapsed = ref(true);

const preparedCategories = computed(() => {
  const full = props.categories?.toSorted(
    (a: TCategory, b: TCategory) => b.votes - a.votes
  );
  const popular = full?.slice(0, 10);
  return { full, popular };
});

const onCategoryClick = (category: string) => {
  searchStore.resetFilters();
  searchStore.setCategories([category]);
  searchStore.search();
  navigateTo("/search");
};
</script>

<template>
  <div class="flex flex-col justify-center custom-block">
    <div class="font-semibold mb-2 flex justify-between">
      <div>Categories:</div>
      <div
        class="cursor-pointer text-blue-200 hover:text-blue-300"
        @click="isCollapsed = !isCollapsed"
      >
        {{ isCollapsed ? "Popular" : "All" }}
      </div>
    </div>
    <div class="flex justify-center text-white flex-wrap gap-2">
      <div
        class="even:bg-gray-700 cursor-pointer rounded-sm hover:text-blue-300 px-1"
        v-for="category in isCollapsed
          ? preparedCategories.popular
          : preparedCategories.full"
        @click="() => onCategoryClick(category.category)"
      >
        {{ category.category }}
      </div>
    </div>
  </div>
</template>
