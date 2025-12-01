<script setup lang="ts">
import { ESeriesType } from "~/types/Series";

const props = defineProps({
  onback: {
    type: Function,
    required: true,
  },
});

const { selectedFilters } = storeToRefs(useSearchStore());
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
      <input
        class="w-4 h-4"
        type="checkbox"
        :id="value"
        :name="value"
        v-model="selectedFilters.type"
        :value="value"
      />
      <label :for="value">{{ value }}</label>
    </div>
  </div>
</template>
