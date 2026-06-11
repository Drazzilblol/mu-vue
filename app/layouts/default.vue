<script setup lang="ts">
const userStore = useUserStore();
const listsStore = useListsStore();
onMounted(() => {
  userStore.init().then(() => {
    listsStore.loadLists();
  });
});
</script>

<template>
  <div class="h-screen overflow-hidden">
    <Header />

    <div class="pt-[68px] h-full"><slot /></div>
    <NotificationsContainer />
  </div>
</template>
