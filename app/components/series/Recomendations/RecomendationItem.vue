<script setup lang="ts">
import type { TImage } from "~/types/General";
import type { TRecommendation } from "~/types/Series";
type TRecomendationItemProps = {
  recomendation: {
    series_name: string;
    series_id: number;
    series_image: TImage;
    relation?: string;
  };
};
const props = defineProps<TRecomendationItemProps>();

const navigate = () => {
  navigateTo(`/series/${props.recomendation?.series_id}`);
};
</script>

<template>
  <div
    class="flex flex-row items-center cursor-pointer rounded-lg custom-block-border"
    v-on:click="navigate"
  >
    <img
      :src="recomendation?.series_image?.url?.thumb"
      class="w-20 min-w-20 h-28 object-cover rounded-lg"
    />

    <div class="font-semibold text-sm ml-4">
      <div v-if="recomendation?.relation" class="text-xs mb-1">
        {{ recomendation?.relation }}
      </div>
      <span>{{ recomendation?.series_name }}</span>
    </div>
  </div>
</template>
