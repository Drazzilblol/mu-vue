<script setup lang="ts">
import Header from "~/components/Header/Header.vue";
</script>

<template>
  <div class="z-10">
    <Header />

    <div class="pt-16"><slot /></div>
    <NotificationsContainer />
  </div>
</template>
