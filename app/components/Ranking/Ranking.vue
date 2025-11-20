<script setup lang="ts">
import RankingItem from "../RangingItem/RankingItem.vue";

const props = defineProps({
  list: {
    type: Array<any>,
    required: true,
  },
});
</script>
<template>
  <div class="flex flex-col gap-4 pl-12 pr-12 pb-4 pt-4">
    <RankingItem v-for="value in list" :key="value?.id" :item="value?.record" />
  </div>
</template>
