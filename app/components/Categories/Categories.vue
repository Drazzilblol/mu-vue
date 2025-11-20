<script setup lang="ts">
const props = defineProps({
  categories: {
    type: Array<any>,
    required: true,
  } as any,
});

const pereparedCategories = computed(() => {
  const sorted = props.categories.toSorted(
    (a: any, b: any) => b.votes - a.votes
  );
  const minVotes = sorted[sorted.length - 1]?.votes || 0;
  const maxVotes = sorted[0]?.votes || 0;
  const full = props.categories.map((category: any) => {
    return {
      ...category,
      weight: category.votes / maxVotes,
    };
  });
  const popular = sorted.splice(0, 10).map((category: any) => {
    return {
      ...category,
      weight: category.votes / maxVotes,
    };
  });
  return { full, popular };
});

const navigate = () => {
  // navigateTo(`/series/${props.item.series_id}`);
};
</script>

<template>
  <div
    class="flex flex-col justify-center text-center rounded-md p-2 border border-gray-700"
  >
    <div class="font-semibold mb-2">Categories:</div>
    <div class="flex justify-center text-white flex-wrap gap-2">
      <div
        class="even:bg-gray-700 cursor-pointer rounded-sm hover:text-blue-300"
        :style="{ fontSize: Math.round(20 * category.weight) + 'px' }"
        v-for="category in pereparedCategories.popular"
      >
        {{ category.category }}
      </div>
    </div>
  </div>
</template>
