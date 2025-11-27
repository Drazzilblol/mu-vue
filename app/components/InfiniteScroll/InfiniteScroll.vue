<script setup lang="ts">
const props = defineProps({
  loadMore: {
    type: Function,
    required: true,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  canLoadMore: {
    type: Boolean,
    default: false,
  },
});

const scrollContainer = ref<HTMLElement | null>(null);

onMounted(() => {
  scrollContainer.value?.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  scrollContainer.value?.removeEventListener("scroll", handleScroll);
});

const handleScroll = () => {
  if (!scrollContainer.value) return;
  const bottomOfWindow =
    scrollContainer.value?.scrollTop + scrollContainer.value?.clientHeight >=
    scrollContainer.value?.scrollHeight - 200;
  if (bottomOfWindow && !props.isLoading && props.canLoadMore) {
    props.loadMore();
  }
};
</script>
<template>
  <div ref="scrollContainer" class="w-full h-full overflow-auto"><slot /></div>
</template>
