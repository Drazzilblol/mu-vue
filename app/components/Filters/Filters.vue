<script setup lang="ts">
import GenreFilter from "./GenreFilter.vue";
import TypeFilter from "./TypeFilter.vue";
enum FilterView {
  Filters = "filters",
  Genres = "genres",
  Type = "type",
}

const show = reactive({ value: FilterView.Filters });
const searchStore = useSearchStore();
const { filters } = storeToRefs(searchStore);
const { data } = (await useFetch("/api/genres")) as any;
</script>

<template>
  <div class="flex flex-col gap-2" v-if="show.value === FilterView.Filters">
    <input
      class="placeholder:text-muted-foreground w-full p-2 text-[16px] focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 rounded-full"
      v-model="filters.search"
      placeholder="Search..."
    />
    <div
      class="flex justify-between items-center p-2 text-white cursor-pointer bg-gray-900 px-4 py-2 rounded-full hover:bg-gray-700 select-none"
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
      class="flex justify-between items-center p-2 text-white cursor-pointer bg-gray-900 px-4 py-2 rounded-full hover:bg-gray-700 select-none"
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
