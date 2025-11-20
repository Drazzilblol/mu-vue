<script setup lang="ts">
const props = defineProps({
  item: {
    required: true,
  } as any,
});

const navigate = () => {
  navigateTo(`/series/${props.item.series_id}`);
};
</script>
<template>
  <div
    class="flex gap-4 items-center p-4 bg-gray-900 rounded-lg text-white"
    v-on:click="navigate"
  >
    <div class="text-lg font-semibold">{{ item.rank?.position?.week }}</div>
    <img :src="item.image?.url?.original" class="w-32 object-cover" />
    <div>
      <div class="text-lg font-semibold mb-2">{{ item.title }}</div>
      <div class="flex gap-2 flex-row mb-2">
        <div
          v-for="value in item.genres"
          :key="value"
          class="px-2 py-1 bg-gray-700 rounded-lg text-sm"
        >
          {{ value.genre }}
        </div>
      </div>
      <div class="line-clamp-3">
        {{ item.description }}
      </div>
    </div>
  </div>
</template>
