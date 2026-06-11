<script setup lang="ts">
import type { TUserListItems } from "~/types/lists";

type TListProps = {
  listItems: TUserListItems;
};
const props = defineProps<TListProps>();
</script>

<template>
  <div class="flex flex-col gap-2">
    <ListItem v-for="listItem in listItems.results" :list-item="listItem" />
  </div>
</template>
