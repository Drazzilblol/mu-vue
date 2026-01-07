<script setup lang="ts">
import type { TCategory } from "~/types/General";

type TCategoryProps = {
  categories?: TCategory[];
  isCollapsible?: boolean;
};

const props = defineProps<TCategoryProps>();

const searchStore = useSearchStore();

const isCollapsed = ref(props.isCollapsible);

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
  <div class="flex flex-col justify-center custom-block-border">
    <div class="font-semibold mb-2 flex justify-between">
      <div>Categories:</div>
      <div
        v-if="props.isCollapsible"
        class="cursor-pointer text-pale-link hover:text-link"
        @click="isCollapsed = !isCollapsed"
      >
        {{ !isCollapsed ? "Show Popular" : "Show All" }}
      </div>
    </div>
    <div class="flex justify-center flex-wrap gap-2">
      <div
        class="even:bg-gray-700 rounded-sm px-1"
        v-for="category in isCollapsed
          ? preparedCategories.popular
          : preparedCategories.full"
      >
        <span
          class="hover:text-link cursor-pointer"
          @click="() => onCategoryClick(category.category)"
        >
          {{ category.category }}
        </span>
        <span>({{ category.votes }})</span>
      </div>
    </div>
  </div>
</template>
