<script setup lang="ts">
const { loggedIn } = useUserSession();
const navigate = (url: string) => {
  navigateTo(url);
};

const userStore = useUserStore();
</script>
<template>
  <header
    class="flex flex-row p-4 w-screen fixed top-0 border-b border-accent shadow-md z-10 gap-4"
  >
    <h1 v-on:click="() => navigate('/')" class="text-2xl">Manga Updates</h1>
    <Button :onClick="() => navigate('/search')">Search</Button>
    <Button :onClick="() => navigate('/releases/1')">Releases</Button>
    <div class="ml-auto flex flex-row items-center gap-4">
      <Button v-if="!loggedIn" :onClick="() => navigate('/login')"
        >Login</Button
      >
      <div v-if="loggedIn" class="flex flex-row items-center gap-4">
        <Button :onClick="() => userStore.logout()">Logout</Button>
        <div>{{ userStore.user?.username }}</div>
        <div>
          <img :src="userStore.user?.avatar.url" alt="Avatar" class="w-8 h-8" />
        </div>
      </div>
    </div>
  </header>
</template>
