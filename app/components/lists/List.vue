<script setup lang="ts">
import type { TUserList } from "~/types/lists";

type TListProps = {
  list: TUserList;
};
const props = defineProps<TListProps>();
</script>

<template>
  <div class="flex flex-col gap-2">
    <ListItem v-for="listItem in list.results" :list-item="listItem" />
  </div>
</template>
