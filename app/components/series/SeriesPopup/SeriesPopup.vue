<script setup lang="ts">
import { ref } from "vue";
import type { TSeriesMeta } from "~/types/General";
import type { TSeries } from "~/types/Series";
type TPopupProps = {
  seriesId: number;
  series?: TSeriesMeta;
};
const props = defineProps<TPopupProps>();

const loading = ref(false);
const series = ref<TSeries | TSeriesMeta | null>(null);

const getSeries = async () => {
  if (props.series) {
    series.value = props.series;
  } else {
    try {
      loading.value = true;
      const response = await useNuxtApp().$api<TSeries>(
        `/series/metadata/${props.seriesId}`
      );
      series.value = response;
    } catch (error) {
      console.error("Error fetching series:", error);
    } finally {
      loading.value = false;
    }
  }
};

onMounted(() => {
  getSeries();
});
</script>
<template>
  <div v-if="loading" class="flex justify-center items-center h-full w-full">
    <Loading />
  </div>

  <div class="flex flex-row items-center gap-2 w-96" v-if="series && !loading">
    <div class="relative w-32 min-w-32">
      <CoverImage
        :url="series?.image?.url?.original"
        :blurredBackground="true"
      />
      <div
        class="absolute bottom-0 right-0 px-2 py-1 bg-gray-800 bg-opacity-80 text-white text-sm font-semibold rounded-full m-2"
      >
        ★ {{ series.bayesian_rating || 0 }}
      </div>
    </div>

    <div class="flex flex-col self-start text-white gap-2">
      <div class="font-semibold line-clamp-2">
        {{ series?.title }}
      </div>
      <div class="font-normal">{{ series?.type }} - {{ series?.year }}</div>
      <Genres :genres="series?.genres" />
    </div>
  </div>
</template>
