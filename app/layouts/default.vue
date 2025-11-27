<script setup lang="ts">
import Header from "~/components/Header/Header.vue";
</script>

<template>
  <div class="h-screen overflow-hidden">
    <Header />

    <div class="pt-[72px] h-full"><slot /></div>
    <NotificationsContainer />
  </div>
</template>
