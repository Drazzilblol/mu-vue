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
        <Popup :width="400" :height="208" position="right" :delay="400">
          <template v-slot:target>
            <div
              class="overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer hover:text-blue-300 underline"
              @click="() => navigateTo(`/series/${item.series_id}`)"
            >
              {{ item.title }}
            </div>
          </template>

          <template v-slot:content>
            <SeriesPopup
              :seriesId="item.series_id"
              :series="item.metadata"
              :onSeriesLoaded="
                (series) => {
                  item.metadata = series;
                }
              "
            />
          </template>
        </Popup>
      </div>
    </div>
  </div>
</template>
