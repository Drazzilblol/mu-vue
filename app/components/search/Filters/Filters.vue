<script setup lang="ts">
enum FilterView {
  Filters = "filters",
  Genres = "genres",
  Categories = "categories",
  Type = "type",
}

const show = reactive({ value: FilterView.Filters });
const searchStore = useSearchStore();
const { selectedFilters } = storeToRefs(searchStore);
const genreStore = useGenreStore();

onMounted(() => {
  genreStore.loadGenres();
});

const genresCount = computed(() => {
  return Object.values(selectedFilters.value.genre || {}).filter(
    (val) => val !== undefined
  ).length;
});

const onInputKeydown = (e: KeyboardEvent) => {
  if (e.key === "Enter") {
    searchStore.search();
  }
};
</script>

<template>
  <div class="flex flex-col gap-2" v-if="show.value === FilterView.Filters">
    <div class="text-white font-semibold">Filters</div>

    <Input
      v-model="selectedFilters.search"
      placeholder="Search..."
      :onKeydown="onInputKeydown"
    />

    <SearchTypeFilter />

    <Input
      v-model="selectedFilters.year"
      placeholder="Year..."
      type="number"
      :maxLength="4"
      :onKeydown="onInputKeydown"
    />
    <div
      class="filter-button"
      v-on:click="() => (show.value = FilterView.Type)"
    >
      <div>
        Type
        <span v-if="selectedFilters.type?.length">
          ({{ selectedFilters.type?.length }})
        </span>
      </div>
      <div>></div>
    </div>
    <div
      class="filter-button"
      v-on:click="() => (show.value = FilterView.Genres)"
    >
      <div>
        Genres
        <span v-if="genresCount"> ({{ genresCount }}) </span>
      </div>
      <div>></div>
    </div>
    <div
      class="filter-button"
      v-on:click="() => (show.value = FilterView.Categories)"
    >
      <div>
        Categories
        <span v-if="selectedFilters.category?.length">
          ({{ selectedFilters.category?.length }})
        </span>
      </div>
      <div>></div>
    </div>
  </div>

  <GenreFilter
    v-if="show.value === FilterView.Genres"
    :onback="() => (show.value = FilterView.Filters)"
    :genres="genreStore.genres"
  />

  <TypeFilter
    v-if="show.value === FilterView.Type"
    :onback="() => (show.value = FilterView.Filters)"
  />

  <CategoriesFilter
    v-if="show.value === FilterView.Categories"
    :onBack="() => (show.value = FilterView.Filters)"
  />
</template>

<style lang="css" scoped>
.filter-button {
  @apply flex justify-between items-center p-2 text-white cursor-pointer bg-gray-900 px-4 py-1 rounded-full border border-gray-900 hover:border-gray-700 select-none;
}
</style>
