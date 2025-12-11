<script setup lang="ts">
import type { TSeries } from "~/types/Series";
import dayjs from "dayjs";
import {
  EAuthorStatus,
  type TAuthor,
  type TAuthorSeriesResponse,
} from "~/types/Author";

const route = useRoute();

const { data: authorData } = await useFetch<TAuthor>(
  `/api/author/${route.params.id}`
);

const { data: seriesData } = await useFetch<TAuthorSeriesResponse>(
  `/api/author/series/${route.params.id}`
);

const desc = computed(() => {
  return prepareText(authorData.value?.comments);
});

const associated = computed(() => {
  return authorData.value?.associated.map((item) => item.name) || [];
});

const statusTitle = computed(() => {
  switch (authorData.value?.status) {
    case EAuthorStatus.Active:
      return "Became Active On";
    case EAuthorStatus.Retired:
      return "Became Retired On";
    case EAuthorStatus["Temporarily Inactive"]:
      return "Became Inactive On";
    case EAuthorStatus.Deceased:
      return "Date of Death";
    default:
      return "Status Date";
  }
});
</script>
<template>
  <div class="flex h-full overflow-y-scroll bg-gray-800">
    <div
      class="flex flex-row gap-4 p-4 max-w-[1240px] h-fit justify-center mx-auto w-full shrink-0"
    >
      <div class="w-64">
        <div class="w-64 min-w-64 rounded-2xl">
          <CoverImage :url="authorData?.image?.url?.original" />
        </div>

        <div class="flex flex-col justify-center text-white flex-wrap pt-2">
          <div class="font-semibold">Name (in native language):</div>
          {{ authorData?.actualname }}
        </div>

        <div class="flex flex-col justify-center text-white flex-wrap pt-2">
          <div class="font-semibold">Gender:</div>
          {{ authorData?.gender }}
        </div>

        <div class="flex flex-col justify-center text-white flex-wrap pt-2">
          <div class="font-semibold">Birth Place:</div>
          {{ authorData?.birthplace }}
        </div>

        <div class="flex flex-col justify-center text-white flex-wrap pt-2">
          <div class="font-semibold">Birth Date:</div>
          {{ authorData?.birthday.as_string }}
        </div>
        <div class="flex flex-col justify-center text-white flex-wrap pt-2">
          <div class="font-semibold">Zodiac:</div>
          {{ authorData?.birthday.zodiac }}
        </div>
        <div class="flex flex-col justify-center text-white flex-wrap pt-2">
          <div class="font-semibold">Blood Type:</div>
          {{ authorData?.bloodtype }}
        </div>

        <AssociatedNames :names="associated" />
      </div>
      <div class="flex flex-col gap-2 text-white w-full">
        <div class="text-2xl font-bold">{{ authorData?.name }}</div>
        <div class="flex flex-row gap-4">
          <div class="w-full">
            <TextCollapse :lines="6">
              <div
                class="whitespace-break-spaces wrap-anywhere break-words"
                v-html="desc"
              ></div>
            </TextCollapse>

            <div class="flex flex-row gap-4 mt-4">
              <div class="w-[50%] flex flex-col gap-4">
                <div>
                  <div class="font-semibold">Status:</div>
                  <div>{{ authorData?.status || "N/A" }}</div>
                </div>
                <div v-if="authorData?.status && authorData?.status !== 'N/A'">
                  <div class="font-semibold">{{ statusTitle }}:</div>
                  <div>{{ authorData?.status_date.as_string || "N/A" }}</div>
                </div>
                <Social :social="authorData?.social" />
              </div>
              <div class="w-[50%] flex flex-col gap-4">
                <div>
                  <div class="font-semibold">Total Series:</div>
                  <div>{{ seriesData?.total_series }}</div>
                </div>
                <div>
                  <div class="font-semibold mb-1">Genres:</div>
                  <Genres :genres="seriesData?.genre_list" />
                </div>
              </div>
            </div>

            <div class="mt-6">
              <div class="font-semibold text-xl text-center">Author Series</div>
              <AuthorSeries :series="seriesData?.series_list" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
