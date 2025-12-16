<script setup lang="ts">
const props = defineProps({
  total: Number,
  perPage: Number,
  currentPage: { type: Number, required: true },
  onPageChange: {
    type: Function as PropType<(page: number) => void>,
    required: true,
  },
});

const pages = computed(() => {
  if (!props.total || !props.perPage) return [];
  return Array.from(Array(Math.ceil(props.total / props.perPage)).keys());
});

const visiblePages = computed(() => {
  if (props.currentPage >= 4) {
    if (pages.value.length - props.currentPage > 4) {
      return pages.value.slice(props.currentPage - 3, props.currentPage + 4);
    } else {
      return pages.value.slice(pages.value.length - 7, pages.value.length);
    }
  }
  return pages.value.slice(0, 7);
});
</script>

<template>
  <div class="flex justify-center">
    <div
      v-if="currentPage > 0"
      class="additional-button mr-2"
      @click="onPageChange(currentPage - 1)"
    >
      Prev
    </div>

    <template v-if="currentPage >= 4">
      <div @click="onPageChange(0)" class="additional-button">1</div>
      <div class="px-1">...</div>
    </template>

    <div class="flex">
      <div
        v-for="page in visiblePages"
        :key="page"
        @click="onPageChange(page)"
        class="page-button"
        :class="{ active: page === currentPage }"
      >
        {{ page + 1 }}
      </div>
    </div>

    <template v-if="currentPage <= pages.length - 5">
      <div class="px-1">...</div>
      <div @click="onPageChange(pages.length - 1)" class="additional-button">
        {{ pages.length }}
      </div>
    </template>

    <div
      v-if="currentPage < pages.length - 1"
      class="additional-button ml-2"
      @click="onPageChange(currentPage + 1)"
    >
      Next
    </div>
  </div>
</template>

<style lang="css" scoped>
.additional-button {
  @apply cursor-pointer content-end border border-gray-600 px-1 bg-gray-700 rounded-sm hover:bg-gray-600;
}

.page-button {
  @apply cursor-pointer border-y border-l last:border-r border-gray-600 px-1;
  @apply bg-gray-700 first:rounded-s-sm last:rounded-e-sm hover:bg-gray-600;
}

.active {
  background-color: rgb(59 130 246);
}

.active:hover {
  background-color: rgb(96 165 250);
}
</style>
