<script setup lang="ts">
import type { TTab } from "~/components/shared/Tab/Tab.vue";
import { useListsStore } from "../../stores/lists";
import type { TUserLists } from "~/types/lists";

type TListsProps = {
  lists: TUserLists;
  isLoading?: boolean;
  scrollRef: HTMLElement | null;
};
const props = defineProps<TListsProps>();
const listsStore = useListsStore();

const tabs = ref<TTab[]>(
  Object.entries(props.lists).map(([id, list]) => ({
    title: list.title,
    id: id,
  })),
);
</script>
<template>
  <div class="flex h-full">
    <div class="w-full">
      <Tabs :tabs="tabs">
        <Tab v-for="item in tabs" :title="item.title" :key="item.title">
          <InfiniteScroll
            :isLoading="false"
            :canLoadMore="
              (lists[item.id!]!.totalHits || 0) / lists[item.id!]!.perpage >
              lists[item.id!]!.page
            "
            :loadMore="() => listsStore.loadMore(+item.id!)"
            :scrollRef="scrollRef"
          >
            <List :list="lists[item.id!]!" />
          </InfiniteScroll>
        </Tab>
      </Tabs>
    </div>
  </div>
</template>
