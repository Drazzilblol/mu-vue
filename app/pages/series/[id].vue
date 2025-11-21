<script setup lang="ts">
import Categories from "~/components/Categories/Categories.vue";
import type { TSeries } from "~/types/Series";
import dayjs from "dayjs";

const route = useRoute();

const { data } = await useFetch<TSeries>(`/api/series/${route.params.id}`);

const prepareText = (text: string = "") => {
  const pattern = /(\*\*(.*)?\*\*)/g;
  const linkPattern = /\[(.+?)\]\((.+?)\)/g;
  const strong = text.replace(pattern, "<strong>$2</strong>");
  const links = strong.replace(
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
</script>
<template>
  <div
    class="flex flex-row gap-4 p-8 max-w-[1240px] justify-center mx-auto w-max shrink-0"
  >
    <div>
      <img
        :src="data?.image?.url?.original"
        class="w-64 min-w-64 object-cover rounded-lg"
      />
      <div class="flex flex-col justify-center text-white flex-wrap pt-2">
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
      <AssociatedNames :names="data?.associated" />
    </div>
    <div class="flex flex-col overflow-auto gap-2 text-white">
      <div class="flex flex-row text-lg gap-4 justify-between text-center">
        <div>{{ data?.year }} - {{ data?.type }}</div>
        <div class="text-green-600 text-2xl font-bold">
          {{ data?.bayesian_rating }}
        </div>
      </div>
      <div class="text-2xl font-bold">{{ data?.title }}</div>
      <div class="flex gap-2 flex-row mb-2">
        <div
          v-for="value in data?.genres"
          :key="value.genre"
          class="px-2 py-1 bg-gray-700 rounded-lg text-sm"
        >
          {{ value.genre }}
        </div>
      </div>
      <div class="flex flex-row gap-4">
        <div class="w-[70%]">
          <div
            class="whitespace-break-spaces wrap-anywhere break-words"
            v-html="desc"
          ></div>
          <div class="flex flex-row gap-4 mt-4">
            <div class="w-[50%]">
              <Categories :categories="data?.categories" />
            </div>
            <div class="w-[50%]">
              <Categories :categories="data?.categories" />
            </div>
          </div>
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
</template>
