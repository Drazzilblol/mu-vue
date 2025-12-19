<script setup lang="ts">
const navigate = (url: string) => {
  navigateTo(url);
};
</script>
<template>
  <header
    class="flex flex-row p-4 w-screen fixed top-0 border-b border-gray-900 border-opacity-50 shadow-md z-10 gap-4"
  >
    <h1 v-on:click="() => navigate('/')" class="text-2xl text-white">
      Manga Updates
    </h1>
    <Button :onClick="() => navigate('/search')">Search</Button>
    <Button :onClick="() => navigate('/releases/1')">Releases</Button>
  </header>
</template>
