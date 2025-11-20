<script setup lang="ts">
import Ranking from "~/components/Ranking/Ranking.vue";

const { data } = (await useFetch("/api/search")) as any;
</script>
<template>
  <div class="min-h-screen bg-gray-800">
    <Ranking :list="data?.results" />
  </div>
</template>
