<script setup lang="ts">
enum FilterView {
  Filters = "filters",
  Genres = "genres",
  Type = "type",
}

const show = reactive({ value: FilterView.Filters });
const searchStore = useSearchStore();
const { selectedFilters } = storeToRefs(searchStore);
const { data } = (await useFetch("/api/genres")) as any;
</script>

<template>
  <div class="flex flex-col gap-2" v-if="show.value === FilterView.Filters">
    <Input
      v-model="selectedFilters.search"
      placeholder="Search..."
      :onkeydown="
        (e) => {
          if (e.key === 'Enter') {
            searchStore.search();
          }
        }
      "
    />

    <SearchTypeFilter />

    <Input
      v-model="selectedFilters.year"
      placeholder="Year..."
      :onkeydown="
        (e) => {
          if (e.key === 'Enter') {
            searchStore.search();
          }
        }
      "
    />
    <div
      class="flex justify-between items-center p-2 text-white cursor-pointer bg-gray-900 px-4 py-2 rounded-full border border-gray-900 hover:border-gray-700 select-none"
      v-on:click="
        () => {
          show.value = FilterView.Type;
        }
      "
    >
      <div>Type</div>
      <div>></div>
    </div>
    <div
      class="flex justify-between items-center p-2 text-white cursor-pointer bg-gray-900 px-4 py-2 rounded-full border border-gray-900 hover:border-gray-700 select-none"
      v-on:click="
        () => {
          show.value = FilterView.Genres;
        }
      "
    >
      <div>Genres</div>
      <div>></div>
    </div>
    <Button
      :onclick="
        () => {
          searchStore.search();
        }
      "
      >Filter</Button
    >
  </div>
  <div v-if="show.value === FilterView.Genres">
    <GenreFilter
      :onback="
        () => {
          show.value = FilterView.Filters;
        }
      "
      :genres="data"
    />
  </div>
  <div v-if="show.value === FilterView.Type">
    <TypeFilter
      :onback="
        () => {
          show.value = FilterView.Filters;
        }
      "
    />
  </div>
</template>
