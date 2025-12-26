<script setup lang="ts">
import type { TGroupSeriesTitle } from "~/types/Groups";
import type { TPublisherSeries } from "~/types/Publisher";

type TSeriesListProps = {
  series?: TGroupSeriesTitle[] | TPublisherSeries[] | null;
};

const props = defineProps<TSeriesListProps>();
</script>

<template>
  <div>
    <div v-if="series?.length" class="grid grid-cols-3 gap-1">
      <div
        v-for="item in series"
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
