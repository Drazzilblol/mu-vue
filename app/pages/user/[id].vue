<script setup lang="ts">
import type { TTab } from "~/components/shared/Tab/Tab.vue";
import dayjs from "dayjs";
import { useListsStore } from "../../stores/lists";

const userStore = useUserStore();
const listsStore = useListsStore();
onMounted(() => {
  listsStore.loadLists();
});

const scrollContainer = ref<HTMLElement | null>(null);

const lastActive = computed(() => {
  return dayjs(userStore.user?.last_active_time.timestamp! * 1000);
});

const joined = computed(() => {
  return dayjs(userStore.user?.time_joined.timestamp! * 1000);
});

const tabs = ref<TTab[]>([{ title: "Profile" }, { title: "Lists" }]);
</script>
<template>
  <div class="flex h-full overflow-y-scroll" ref="scrollContainer">
    <div
      class="flex flex-row gap-4 p-4 max-w-[1240px] h-fit justify-center mx-auto w-full shrink-0"
    >
      <div class="w-64">
        <div class="w-64 min-w-64 rounded-2xl">
          <CoverImage :url="userStore.user?.avatar?.url" />
        </div>
      </div>
      <div class="flex flex-col gap-2 w-full">
        <div class="text-2xl font-bold">{{ userStore.user?.username }}</div>
        <div class="flex flex-row gap-4">
          <div class="w-full">
            <Tabs :tabs="tabs">
              <Tab :title="tabs[0]!.title">
                <div class="flex flex-row gap-2 mt-2">
                  <div
                    class="w-[50%] flex flex-col gap-4 custom-block-border h-max"
                  >
                    <span>
                      <span class="font-semibold">Added Releases: </span>
                      <span>{{ userStore.user?.stats.added_releases }}</span>
                    </span>
                    <span>
                      <span class="font-semibold">Added Series: </span>
                      <span>{{ userStore.user?.stats?.added_series }}</span>
                    </span>
                    <span>
                      <span class="font-semibold">Added Groups: </span>
                      <span>{{ userStore.user?.stats?.added_groups }}</span>
                    </span>
                    <span>
                      <span class="font-semibold">Added Authors: </span>
                      <span>{{ userStore.user?.stats?.added_authors }}</span>
                    </span>
                    <span>
                      <span class="font-semibold">Forum Posts: </span>
                      <span>{{ userStore.user?.stats?.forum_posts }}</span>
                    </span>
                  </div>

                  <div
                    class="w-[50%] flex flex-col gap-4 custom-block-border h-max"
                  >
                    <span>
                      <span class="font-semibold">Joined: </span>
                      <span>{{ joined.format("DD/MM/YYYY") }}</span>
                      <span class="ml-1 text-foreground/60">
                        ({{ joined.fromNow() }})
                      </span>
                    </span>
                    <span>
                      <span class="font-semibold">Last Active: </span>
                      <span>{{ lastActive.format("DD/MM/YYYY") }}</span>
                      <span class="ml-1 text-foreground/60">
                        ({{ lastActive.fromNow() }})
                      </span>
                    </span>
                  </div>
                </div>
              </Tab>

              <Tab :title="tabs[1]!.title">
                <div class="mt-2">
                  <Lists
                    :lists="listsStore.lists"
                    :scroll-ref="scrollContainer"
                  />
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
