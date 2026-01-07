<script setup lang="ts">
import type { TAuthorSeries, TSocial } from "~/types/Author";

const props = defineProps({
  series: Array<TAuthorSeries>,
});

const preparedGenres = (genres: string[]) => {
  return genres.join(", ");
};
</script>

<template>
  <div>
    <div class="grid grid-cols-[2fr_3fr_50px] gap-1">
      <div class="font-semibold">Series Title</div>
      <div class="font-semibold">Genre</div>
      <div class="font-semibold text-right mr-2">Year</div>
    </div>

    <div
      v-for="item in series"
      class="grid grid-cols-[2fr_3fr_50px] gap-2"
      :key="item.series_id"
    >
      <Popup :width="400" :height="208" position="right" :delay="400">
        <template v-slot:target>
          <div
            class="overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer hover:text-blue-300"
            @click="navigateTo(`/series/${item.series_id}`)"
          >
            {{ item.title }}
          </div>
        </template>

        <template v-slot:content>
          <SeriesPopup
            :seriesId="item.series_id"
            :series="item.seriesMetadata"
            :onSeriesLoaded="
              (series) => {
                item.seriesMetadata = series;
              }
            "
          />
        </template>
      </Popup>

      <div class="overflow-hidden text-ellipsis whitespace-nowrap">
        {{ preparedGenres(item.genres) }}
      </div>
      <div class="text-right mr-2">{{ item.year || "N/A" }}</div>
    </div>
  </div>
</template>
