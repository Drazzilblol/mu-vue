<script setup lang="ts">
import type { TGroup, TGroupSeriesResponse } from "~/types/Groups";

const route = useRoute();

const releasesStore = useReleasesSearchStore();
const { loading, releases, totalHits } = storeToRefs(releasesStore);
const scrollContainer = ref<HTMLElement | null>(null);

onMounted(() => {
  releasesStore.loadReleases(Number(route.params.id));
});

onUnmounted(() => {
  releasesStore.$reset();
});

const { data: groupData } = await useAPI<TGroup>(`/groups/${route.params.id}`);

const { data: seriesData } = await useAPI<TGroupSeriesResponse>(
  `/groups/${route.params.id}/series`
);

const desc = computed(() => {
  return prepareText(groupData.value?.notes);
});

const associated = computed(() => {
  return groupData.value?.associated.map((item) => item.name) || [];
});
</script>

<template>
  <div class="flex h-full overflow-y-scroll" ref="scrollContainer">
    <div
      class="flex flex-row gap-4 p-4 max-w-[1240px] h-fit justify-center mx-auto w-full shrink-0"
    >
      <div class="flex flex-col gap-2 w-full">
        <div class="text-2xl font-bold">{{ groupData?.name }}</div>
        <div class="flex flex-row gap-2">
          <div class="w-full">
            <Tabs>
              <Tab title="Info">
                <div class="flex flex-row gap-2 mt-2">
                  <div class="w-[50%] flex flex-col gap-2">
                    <div
                      v-if="desc"
                      class="whitespace-break-spaces wrap-anywhere break-words custom-block"
                      v-html="desc"
                    />
                    <Categories :categories="seriesData?.series_categories" />
                  </div>
                  <div class="w-[50%] flex flex-col gap-2">
                    <div class="custom-block-border">
                      <GroupSocial :social="groupData?.social" />

                      <div class="flex flex-row gap-2">
                        <div class="font-semibold">Active:</div>

                        {{ groupData?.active ? "Yes" : "No" }}
                      </div>

                      <div class="flex flex-row gap-2">
                        <div class="font-semibold">Number of Releases:</div>

                        {{ totalHits }}
                      </div>

                      <div class="flex flex-row gap-2">
                        <div class="font-semibold">Release Frequency:</div>

                        {{ seriesData?.release_frequency }}
                      </div>

                      <div class="flex flex-row gap-2">
                        <div class="font-semibold">Total Series:</div>

                        {{ seriesData?.series_titles.length }}
                      </div>
                      <AssociatedNames
                        v-if="associated.length > 0"
                        :names="associated"
                        title="Alternate Names:"
                        :lines="10"
                      />
                    </div>
                    <div class="custom-block-border">
                      <div class="font-semibold mb-1">Genres:</div>
                      <Genres :genres="seriesData?.series_genres" />
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab title="Series">
                <div class="mt-2 custom-block-border">
                  <SeriesList :series="seriesData?.series_titles" />
                </div>
              </Tab>
              <Tab title="Releases">
                <InfiniteScroll
                  v-if="releases"
                  :isLoading="loading"
                  :canLoadMore="
                    totalHits / releasesStore?.perpage > releasesStore?.page
                  "
                  :loadMore="
                    () => releasesStore.loadMore(Number(route.params.id))
                  "
                  :scrollRef="scrollContainer"
                >
                  <GroupReleases
                    :releases="releases"
                    :groupId="Number(route.params.id)"
                  />
                </InfiniteScroll>
                <Loading v-if="loading" class="text-center pt-4" />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
