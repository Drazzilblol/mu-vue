<script setup lang="ts">
const props = defineProps({
  searchResultItem: {
    type: Object as () => any,
  },
});

const navigate = () => {
  navigateTo(`/series/${props.searchResultItem?.series_id}`);
};
</script>

<template>
  <div
    class="flex flex-col items-center text-white p-2 rounded-lg bg-gray-700 cursor-pointer border border-gray-600"
    v-on:click="navigate"
  >
    <div class="relative w-full">
      <CoverImage :url="searchResultItem?.image?.url?.original" />
      <div
        class="absolute bottom-0 right-0 px-2 py-1 bg-gray-800 bg-opacity-80 text-white text-sm font-semibold rounded-full m-2"
      >
        ★ {{ searchResultItem.bayesian_rating }}
      </div>
    </div>

    <div class="text-sm mt-2 self-start">
      <div class="font-normal text-gray-300">
        {{ searchResultItem?.type }} - {{ searchResultItem?.year }}
      </div>
      <div class="font-semibold line-clamp-2">
        {{ searchResultItem?.title }}
      </div>
    </div>
  </div>
</template>
