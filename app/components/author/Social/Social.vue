<script setup lang="ts">
import type { TSocial } from "~/types/Author";

const props = defineProps({
  social: Object as () => TSocial,
});
</script>

<template>
  <div
    class="flex flex-row text-white gap-2"
    v-if="social?.facebook || social?.twitter || social?.officialsite"
  >
    <div class="font-semibold">Social:</div>

    <NuxtLink
      v-if="social?.officialsite"
      :to="social?.officialsite"
      external
      class="underline hover:text-blue-300"
      target="_blank"
    >
      Official Website
    </NuxtLink>
    <NuxtLink
      v-if="social?.facebook"
      :to="social?.facebook"
      external
      class="underline hover:text-blue-300"
      target="_blank"
    >
      Facebook
    </NuxtLink>
    <NuxtLink
      v-if="social?.twitter"
      :to="social?.twitter"
      external
      class="underline hover:text-blue-300"
      target="_blank"
    >
      Twitter
    </NuxtLink>
  </div>
</template>
