<script setup lang="ts">
import { ESeriesType } from "~/types/Series";

const props = defineProps({
  onback: {
    type: Function,
    required: true,
  },
});

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
    <Button
      :onclick="
        () => {
          onback();
        }
      "
      ><- Back</Button
    >
    <div
      v-for="value in ESeriesType"
      class="flex items-center gap-2 m-2 text-white"
    >
      <Checkbox
        :onclick="() => onCheckboxClick(value)"
        :value="selectedFilters.type?.includes(value)"
      >
        {{ value }}
      </Checkbox>
    </div>
  </div>
</template>
