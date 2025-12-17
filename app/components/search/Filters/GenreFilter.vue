<script setup lang="ts">
import type { TGenre } from "~/types/General";

type TGenreFilterProps = {
  onback: () => void;
  genres: TGenre[];
};

const props = defineProps<TGenreFilterProps>();

const { selectedFilters } = storeToRefs(useSearchStore());

const onCheckboxClick = (value: string, newValue: boolean | undefined) => {
  selectedFilters.value.genre[value] = newValue;
};
</script>
<template>
  <div>
    <div class="flex justify-between items-center">
      <div class="text-white font-semibold mb-2">Genres</div>
      <Button :onclick="() => onback()"><- Back</Button>
    </div>

    <div v-for="value in genres" class="flex items-center gap-2 m-2 text-white">
      <TriCheckbox
        :onclick="
          (newValue: boolean | undefined) => {
            onCheckboxClick(value.genre, newValue);
          }
        "
        :value="selectedFilters.genre[value.genre]"
      >
        {{ value.genre }}
      </TriCheckbox>
    </div>
  </div>
</template>
