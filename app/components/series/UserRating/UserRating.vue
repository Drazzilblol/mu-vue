<script setup lang="ts">
import type { TRatingRainbow, TUserRating } from "~/types/Series";

const props = defineProps({
  userRating: {
    type: Object,
  },
});

const summary = computed(() => {
  return (
    props.userRating?.rainbow.reduce((acc: number, item: TRatingRainbow) => {
      return acc + item.count;
    }, 0) || 0
  );
});

const max = computed(() => {
  return Math.max(
    ...(props.userRating?.rainbow.map((item: TRatingRainbow) => item.count) ||
      [])
  );
});

const reversedRainbow = computed(() => {
  return props.userRating?.rainbow.toReversed();
});
</script>

<template>
  <div
    class="flex flex-col justify-center text-white flex-wrap gap-1 custom-block"
  >
    <div class="font-semibold">User Ratings:</div>
    <template v-if="summary !== 0">
      <div>
        Average: {{ userRating?.average_rating }}/10.0 ({{ summary }} votes)
      </div>

      <div class="grid grid-cols-[30px_1fr_30px] gap-x-2">
        <template v-for="item in reversedRainbow">
          <span>{{ item.rating }}:</span>
          <div>
            <div
              class="inline-block bg-gray-700 h-5 align-middle"
              :style="{ width: (item.count / max) * 100 + '%' }"
            />
          </div>
          <span>{{ Math.round((item.count / summary) * 100) }}%</span>
        </template>
      </div>
    </template>
    <template v-else>
      <div>N/A</div>
    </template>
  </div>
</template>
