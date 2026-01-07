<script setup lang="ts">
import type { TPublisherPublicationsResponse } from "~/types/Publisher";

const props = defineProps({
  publications: Object as () => TPublisherPublicationsResponse | null,
});
</script>

<template>
  <div>
    <div
      v-if="publications?.publication_list?.length"
      class="grid grid-cols-3 gap-1"
    >
      <div
        v-for="item in publications?.publication_list"
        :key="item.publication_name"
        class="justify-center flex"
      >
        <div
          class="overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer hover:text-link underline"
          @click="() => navigateTo(`/publication/${item.publication_name}`)"
        >
          {{ item.publication_name }}
        </div>
        <div class="pl-1">({{ item.count }})</div>
      </div>
    </div>
  </div>
</template>
