<script setup lang="ts"></script>

<template>
  <div class="h-screen overflow-hidden">
    <Header />

    <div class="pt-[72px] h-full"><slot /></div>
    <NotificationsContainer />
  </div>
</template>
