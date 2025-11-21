<script setup lang="ts">
const props = defineProps({
  recomendation: {
    type: Object as any,
    required: true,
  } as any,
});

const navigate = () => {
  navigateTo(`/series/${props.recomendation.series_id}`);
};
</script>

<template>
  <div
    class="flex flex-row items-center text-white p-2 rounded-lg bg-gray-700 cursor-pointer border border-gray-600"
    v-on:click="navigate"
  >
    <img
      :src="recomendation.series_image?.url?.thumb"
      class="w-20 min-w-20 h-28 object-cover rounded-lg"
    />

    <div class="font-semibold text-sm ml-4">
      {{ recomendation.series_name }}
    </div>
  </div>
</template>
