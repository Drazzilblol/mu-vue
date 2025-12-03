<script setup lang="ts">
import type { TRelatedSeries } from "~/types/Series";

const props = defineProps({
  related: {
    type: Array<TRelatedSeries>,
  },
});

const navigate = (id: number) => {
  navigateTo(`/series/${id}`);
};
</script>

<template>
  <div class="flex flex-col justify-center text-white flex-wrap pt-2">
    <div class="font-semibold">Related Series:</div>
    <div v-if="!related?.length">N/A</div>
    <TextCollapse :lines="6">
      <div v-for="item in related">
        <span
          class="cursor-pointer hover:text-blue-300 underline"
          v-on:click="navigate(item.related_series_id)"
        >
          {{ item.related_series_name }}
        </span>
        <span> ({{ item.relation_type }})</span>
      </div>
    </TextCollapse>
  </div>
</template>
