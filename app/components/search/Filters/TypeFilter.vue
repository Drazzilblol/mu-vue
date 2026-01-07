<script setup lang="ts">
import { ESeriesType } from "~/types/Series";

type TTypeFilterProps = {
  onback: () => void;
};

const props = defineProps<TTypeFilterProps>();

const { selectedFilters } = storeToRefs(useSearchStore());

const onCheckboxClick = (value: ESeriesType) => {
  const index = selectedFilters.value.type!.indexOf(value);
  if (index > -1) {
    selectedFilters.value.type!.splice(index, 1);
  } else {
    selectedFilters.value.type!.push(value);
  }
};
</script>

<template>
  <div>
    <div class="flex justify-between items-center">
      <div class="font-semibold mb-2">Type</div>
      <Button :onClick="() => onback()"><- Back</Button>
    </div>
    <div v-for="value in ESeriesType" class="flex items-center gap-2 m-2">
      <Checkbox
        :onclick="() => onCheckboxClick(value)"
        :value="selectedFilters.type?.includes(value)"
      >
        {{ value }}
      </Checkbox>
    </div>
  </div>
</template>
