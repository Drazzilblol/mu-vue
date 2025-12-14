<script setup lang="ts">
import type { TPublisherPublicationsResponse } from "~/types/Publisher";

const props = defineProps({
  publications: Object as () => TPublisherPublicationsResponse | null,
});
</script>

<template>
  <div>
    <div
      v-if="publications?.series_list?.length"
      class="grid grid-cols-3 gap-1"
    >
      <div
        v-for="item in publications?.series_list"
        :key="item.series_id"
        class="justify-center flex"
      >
        <div
          class="overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer hover:text-blue-300 underline"
          @click="() => navigateTo(`/series/${item.series_id}`)"
        >
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</template>
