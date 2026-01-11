<script setup lang="ts">
const userStore = useUserStore();
const form = ref({ username: "", password: "" });

const onLoginClick = () => {
  userStore.login(form.value.username, form.value.password).then(() => {
    if (!userStore.error) {
      navigateTo("/");
    }
  });
};
</script>
<template>
  <div class="flex flex-col items-center justify-center h-full mx-auto">
    <div class="custom-block-border w-[500px] !p-10">
      <form class="w-full">
        <div class="mb-4">
          <label for="username">Username/Email:</label>
          <Input type="text" id="username" v-model="form.username" />
        </div>
        <div class="mb-4">
          <label for="password">Password:</label>
          <Input type="password" id="password" v-model="form.password" />
        </div>

        <div class="mb-4 h-6">
          <div v-if="userStore.error" class="text-red-500">
            {{ userStore.error }}
          </div>
        </div>

        <div class="w-full flex justify-center">
          <Button :onClick="onLoginClick" class="w-max">Login</Button>
        </div>
      </form>
    </div>
  </div>
</template>
