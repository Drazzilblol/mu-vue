<script setup lang="ts">
import TriCheckbox from "../Checkbox/TriCheckbox.vue";

const props = defineProps({
  onback: {
    type: Function,
    required: true,
  },
  genres: {
    type: Object as () => any,
    required: true,
  },
});

const { selectedFilters } = storeToRefs(useSearchStore());

const onCheckboxClick = (value: string, newValue: boolean | undefined) => {
  selectedFilters.value.genre[value] = newValue;
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
