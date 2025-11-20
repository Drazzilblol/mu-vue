<script setup lang="ts">
const navigate = () => {
  navigateTo(`/`);
};
</script>
<template>
  <header class="p-4 w-screen fixed top-0 bg-gray-800 shadow-md">
    <h1 v-on:click="navigate" class="text-2xl text-white">Manga Updates</h1>
  </header>
</template>
