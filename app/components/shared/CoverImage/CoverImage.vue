<script setup lang="ts">
type TCoverImageProps = {
  url?: string;
  blurredBackground?: boolean;
};
const props = defineProps<TCoverImageProps>();
</script>
<template>
  <div class="w-full relative overflow-hidden rounded-lg">
    <div
      v-if="blurredBackground"
      class="relative content-center aspect-[2/3] w-full blur-[4px] bg-cover bg-center"
      :style="{
        backgroundImage: url ? `url(${url})` : '',
      }"
    />
    <img
      :src="url || '/not_found.png'"
      :class="
        blurredBackground
          ? 'absolute top-[50%] -translate-y-1/2'
          : 'w-full object-cover'
      "
      class="w-full max-h-full object-fill"
      loading="lazy"
    />
  </div>
</template>
