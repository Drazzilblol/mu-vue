<script setup lang="ts">
import type { TUserListResult } from "~/types/lists";

type TListProps = {
  listItem: TUserListResult;
};
const props = defineProps<TListProps>();
</script>

<template>
  <div class="!p-4 custom-block-border flex flex-col">
    <Popup :width="400" :height="208" position="top" :delay="400">
      <template v-slot:target>
        <div
          class="overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer hover:text-link"
          @click="navigateTo(`/series/${listItem.record.series.id}`)"
        >
          {{ listItem.record.series.title }}
        </div>
      </template>

      <template v-slot:content>
        <SeriesPopup
          :seriesId="listItem.record.series.id"
          :series="listItem.seriesMetadata"
          :onSeriesLoaded="
            (series) => {
              listItem.seriesMetadata = series;
            }
          "
        />
      </template>
    </Popup>

    <div class="text-foreground/60">
      (c. {{ listItem.metadata.series.latest_chapter }})
    </div>
  </div>
</template>
