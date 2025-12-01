<script setup lang="ts">
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
      <input
        class="w-4 h-4"
        type="checkbox"
        :id="value.genre"
        :name="value.genre"
        v-model="selectedFilters.genre"
        :value="value.genre"
      />
      <label :for="value.genre">{{ value.genre }}</label>
    </div>
  </div>
</template>
