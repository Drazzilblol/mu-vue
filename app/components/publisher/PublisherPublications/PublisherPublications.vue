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
    <div class="font-semibold text-xl text-center pb-2">Publications</div>

    <Loading v-if="loading" class="text-center pt-4" />
    <div
      v-if="publications?.publication_list?.length && !loading"
      class="grid grid-cols-3 gap-1"
    >
      <div
        v-for="item in publications?.publication_list"
        :key="item.publication_name"
        class="justify-center flex"
      >
        <div
          class="overflow-hidden text-ellipsis whitespace-break-spaces cursor-pointer hover:text-blue-300 underline"
          @click="() => navigateTo(`/publication/${item.publication_name}`)"
        >
          {{ item.publication_name }}
        </div>
        <div class="pl-1">({{ item.count }})</div>
      </div>
    </div>
  </div>
</template>
