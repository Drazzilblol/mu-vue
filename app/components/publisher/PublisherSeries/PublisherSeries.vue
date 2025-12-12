<script setup lang="ts">
import type { TPublisherPublicationsResponse } from "~/types/Publisher";

const props = defineProps({
  publisherId: String,
});

const loading = ref(false);
const error = ref<string | null>(null);
const publications = ref<TPublisherPublicationsResponse | null>(null);

const loadPublications = async () => {
  loading.value = true;
  error.value = null;

  try {
    publications.value = await $fetch<TPublisherPublicationsResponse>(
      `/api/publishers/publications/${props.publisherId}`
    );
  } catch (e) {
    error.value = "Failed to fetch publications.";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadPublications();
});
</script>

<template>
  <div>
    <div class="font-semibold text-xl text-center pb-2">
      Licensed Series ({{ publications?.series_list?.length || 0 }})
    </div>

    <Loading v-if="loading" class="text-center pt-4" />
    <div
      v-if="publications?.series_list?.length && !loading"
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
