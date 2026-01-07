<script setup lang="ts">
import type { TGroups, TSeries, TUserRating } from "~/types/Series";
import dayjs from "dayjs";
import type { TCommentsResponse } from "~/types/Comments";

const route = useRoute();

const { data } = await useAPI<TSeries>(`/series/${route.params.id}`);
const { data: comments } = await useAPI<TCommentsResponse>(
  `/series/${route.params.id}/comments/search`,
  {
    lazy: true,
    method: "POST",
    body: {
      perpage: 10,
      page: 1,
    },
  }
);
const { data: userRating } = await useAPI<TUserRating>(
  `/series/${route.params.id}/ratingrainbow`,
  { lazy: true }
);
const { data: groupsData } = await useAPI<TGroups>(
  `/series/${route.params.id}/groups`,
  { lazy: true }
);

const prepareText = (text?: string) => {
  const pattern = /(\*\*(.*)?\*\*)/g;
  const linkPattern = /\[(.+?)\]\((.+?)\)/g;
  const strong = text?.replace(pattern, "<strong>$2</strong>");
  const links = strong?.replace(
    linkPattern,
    '<a href="$2" class="underline hover:text-link" target="_blank" rel="noopener noreferrer">$1</a>'
  );
  return links;
};

const scrollContainer = ref<HTMLElement | null>(null);

const desc = computed(() => {
  return prepareText(data.value?.description);
});

const status = computed(() => {
  return prepareText(data.value?.status);
});

const lastUpdated = computed(() => {
  return dayjs((data.value?.last_updated.timestamp || 0) * 1000).fromNow();
});

const associated = computed(() => {
  return data.value?.associated.map((item) => item.title) || [];
});
</script>
<template>
  <div class="flex flex-col h-full overflow-y-scroll" ref="scrollContainer">
    <div class="relative w-full">
      <img
        class="absolute top-0 left-0 w-full h-[60vh] object-cover filter blur-md opacity-30 z-0"
        :src="data?.image?.url?.original"
      />
    </div>
    <div
      class="flex flex-row gap-4 p-4 max-w-[1240px] h-fit justify-center mx-auto w-full shrink-0 z-10"
    >
      <div class="w-64">
        <div class="w-64 min-w-64 rounded-2xl">
          <CoverImage :url="data?.image?.url?.original" />
        </div>

        <div class="custom-block-border mt-2">
          <div class="flex flex-col justify-center flex-wrap">
            <div class="font-semibold">Status in Country of Origin:</div>
            <div v-html="status" />
          </div>

          <div class="flex flex-col justify-center flex-wrap pt-2">
            <div class="font-semibold">Scanlate:</div>
            {{ data?.completed ? "Completed" : "Continuing" }}
          </div>

          <div class="flex flex-col justify-center flex-wrap pt-2">
            <div class="font-semibold">Latest chapter:</div>
            {{ data?.latest_chapter }}
          </div>

          <div class="flex flex-col justify-center flex-wrap pt-2">
            <div class="font-semibold">Last updated:</div>
            {{ lastUpdated }}
          </div>
          <AssociatedNames :names="associated" />
        </div>
      </div>
      <div class="flex flex-col gap-2 w-full">
        <div
          class="flex flex-row text-lg gap-4 justify-between text-center leading-none items-center"
        >
          <div>{{ data?.year }} - {{ data?.type }}</div>
          <div class="text-green-600 text-2xl font-bold leading-none">
            {{ data?.bayesian_rating }}
          </div>
        </div>
        <div class="text-2xl font-bold leading-none">{{ data?.title }}</div>
        <div class="flex gap-2 flex-row">
          <Genres :genres="data?.genres" />
        </div>

        <div class="flex flex-row gap-4">
          <div class="w-[70%]">
            <Tabs>
              <Tab title="Details">
                <div>
                  <TextCollapse
                    v-if="desc"
                    :lines="6"
                    class="mt-2 custom-block-border"
                  >
                    <div
                      class="whitespace-break-spaces wrap-anywhere break-words"
                      v-html="desc"
                    ></div>
                  </TextCollapse>

                  <div class="flex flex-row gap-2 mt-2">
                    <div class="w-[50%] flex flex-col gap-2">
                      <UserRating :userRating="userRating" />
                      <Categories
                        :categories="data?.categories"
                        isCollapsible
                      />
                      <SeriesPosition :rank="data?.rank" />
                    </div>
                    <div class="w-[50%] flex flex-col gap-2">
                      <About :series="data" :groups="groupsData" />
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab :title="`Comments (${comments?.total_hits || 0})`">
                <Comments
                  v-if="data"
                  :seriesId="data.series_id"
                  :initialComments="comments"
                  :scrollRef="scrollContainer"
                />
              </Tab>
            </Tabs>
          </div>
          <div class="w-[30%] flex flex-col gap-4">
            <RecomendationsSlider
              :recommended="data?.recommendations"
              :similar="data?.category_recommendations"
              :related="data?.related_series"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
