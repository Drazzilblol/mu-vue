<script setup lang="ts">
const { selectedFilters } = storeToRefs(useSearchStore());
</script>
<template>
  <div class="flex flex-col mx-2">
    <div class="mb-1 text-sm">Search in</div>

    <div class="flex flex-row justify-between">
      <div>
        <input
          type="radio"
          id="title"
          value="title"
          v-model="selectedFilters.stype"
        />
        <label for="title">Title</label>
      </div>

      <div>
        <input
          type="radio"
          id="description"
          value="description"
          v-model="selectedFilters.stype"
        />
        <label for="description">Description</label>
      </div>

      <div>
        <input
          type="radio"
          id="both"
          :value="undefined"
          v-model="selectedFilters.stype"
        />
        <label for="both">Both</label>
      </div>
    </div>
  </div>
</template>
