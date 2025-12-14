<script setup lang="ts">
import type { TSeries } from "~/types/Series";
import dayjs from "dayjs";

const route = useRoute();

const { data } = await useFetch<TSeries>(`/api/series/${route.params.id}`);

const prepareText = (text?: string) => {
  const pattern = /(\*\*(.*)?\*\*)/g;
  const linkPattern = /\[(.+?)\]\((.+?)\)/g;
  const strong = text?.replace(pattern, "<strong>$2</strong>");
  const links = strong?.replace(
    linkPattern,
    '<a href="$2" class="underline hover:text-blue-300" target="_blank" rel="noopener noreferrer">$1</a>'
  );
  return links;
};

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
  <div class="flex flex-col h-full overflow-y-scroll">
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

        <div class="custom-block mt-2">
          <div class="flex flex-col justify-center text-white flex-wrap">
            <div class="font-semibold">Status in Country of Origin:</div>
            <div v-html="status" />
          </div>

          <div class="flex flex-col justify-center text-white flex-wrap pt-2">
            <div class="font-semibold">Scanlate:</div>
            {{ data?.completed ? "Completed" : "Continuing" }}
          </div>

          <div class="flex flex-col justify-center text-white flex-wrap pt-2">
            <div class="font-semibold">Latest chapter:</div>
            {{ data?.latest_chapter }}
          </div>

          <div class="flex flex-col justify-center text-white flex-wrap pt-2">
            <div class="font-semibold">Last updated:</div>
            {{ lastUpdated }}
          </div>
          <AssociatedNames :names="associated" />
        </div>
      </div>
      <div class="flex flex-col gap-2 text-white w-full">
        <div class="flex flex-row text-lg gap-4 justify-between text-center">
          <div>{{ data?.year }} - {{ data?.type }}</div>
          <div class="text-green-600 text-2xl font-bold">
            {{ data?.bayesian_rating }}
          </div>
        </div>
        <div class="text-2xl font-bold">{{ data?.title }}</div>
        <div class="flex gap-2 flex-row mb-2">
          <Genres :genres="data?.genres" />
        </div>

        <div class="flex flex-row gap-4">
          <div class="w-[70%]">
            <Tabs>
              <Tab title="Details">
                <div>
                  <TextCollapse :lines="6" class="mt-2 custom-block">
                    <div
                      class="whitespace-break-spaces wrap-anywhere break-words"
                      v-html="desc"
                    ></div>
                  </TextCollapse>

                  <div class="flex flex-row gap-2 mt-2">
                    <div class="w-[50%] flex flex-col gap-2">
                      <RelatedSeries :related="data?.related_series" />
                      <UserRating />
                      <Categories :categories="data?.categories" />
                    </div>
                    <div class="w-[50%] flex flex-col gap-2">
                      <About :series="data" />
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab title="Comments">
                <div>Comments</div>
              </Tab>
            </Tabs>
          </div>
          <div class="w-[30%] flex flex-col gap-4">
            <Recomendations
              :recomendations="data?.category_recommendations"
              :title="'Similar Series'"
            />
            <Recomendations
              v-if="data?.recommendations?.length"
              :recomendations="data?.recommendations"
              :title="'Recommended Series'"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
