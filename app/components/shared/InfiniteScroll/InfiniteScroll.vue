<script setup lang="ts">
type TInfiniteScrollProps = {
  loadMore: () => void;
  isLoading: boolean;
  canLoadMore: boolean;
  scrollRef?: HTMLElement | null;
};
const props = defineProps<TInfiniteScrollProps>();

const scrollContainer = ref<HTMLElement | null>(null);
const scrollRef = ref<HTMLElement | null>(props.scrollRef || null);
const container = computed(() => scrollRef.value || scrollContainer.value);

onMounted(() => {
  container.value?.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  container.value?.removeEventListener("scroll", handleScroll);
});

const handleScroll = () => {
  if (!container.value) return;
  const bottomOfWindow =
    container.value.scrollTop + container.value.clientHeight >=
    container.value.scrollHeight - 200;
  if (bottomOfWindow && !props.isLoading && props.canLoadMore) {
    props.loadMore();
  }
};
</script>
<template>
  <div ref="scrollContainer" class="w-full h-full overflow-y-scroll">
    <slot />
  </div>
</template>
