<script setup lang="ts">
const props = defineProps({
  url: {
    type: String,
  },
});
</script>
<template>
  <div class="w-full relative overflow-hidden rounded-lg">
    <div
      class="relative content-center aspect-[2/3] w-full blur-[4px] bg-cover bg-center"
      :style="{
        backgroundImage: `url(${url})`,
      }"
    ></div>
    <img
      :src="url"
      class="absolute top-[50%] -translate-y-1/2 w-full max-h-full object-fill"
      loading="lazy"
    />
  </div>
</template>
