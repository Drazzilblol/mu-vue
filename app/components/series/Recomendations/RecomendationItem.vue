<script setup lang="ts">
import type { TRecommendation } from "~/types/Series";
const props = defineProps({
  recomendation: {
    type: Object as () => TRecommendation,
  },
});

const navigate = () => {
  navigateTo(`/series/${props.recomendation?.series_id}`);
};
</script>

<template>
  <div
    class="flex flex-row items-center text-white cursor-pointer rounded-lg custom-block"
    v-on:click="navigate"
  >
    <img
      :src="recomendation?.series_image?.url?.thumb"
      class="w-20 min-w-20 h-28 object-cover rounded-lg"
    />

    <div class="font-semibold text-sm ml-4">
      {{ recomendation?.series_name }}
    </div>
  </div>
</template>
