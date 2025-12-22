<script setup lang="ts">
import type {
  TReleaseByDayResponse,
  TReleaseByDayResult,
} from "~/types/Releases";

const route = useRoute();

const { data: releases } = await useFetch<TReleaseByDayResponse>(
  `/api/releases/day?page=${route.params.page}`
);

const preparedData = computed(() => {
  const result: { [key: string]: TReleaseByDayResult[] } = {};
  releases.value?.results.forEach((release) => {
    if (!result[release.record.release_date]) {
      result[release.record.release_date] = [release];
    } else {
      result[release.record.release_date]?.push(release);
    }
  });
  return result;
});
</script>

<template>
  <div class="flex h-full overflow-y-scroll">
    <div
      class="flex flex-col gap-4 p-4 max-w-[1240px] h-fit justify-center mx-auto w-full shrink-0 text-white"
    >
      <div class="flex flex-row justify-between items-center">
        <span class="text-2xl font-bold">New Releases</span>
        <Pagination
          :total="releases?.total_hits"
          :perPage="releases?.per_page"
          :currentPage="Number(route.params.page) - 1"
          :onPageChange="(page: number) => navigateTo(`/releases/${page + 1}`)"
        />
      </div>
      <div
        v-for="(value, date) in preparedData"
        class="flex flex-col gap-2 w-full"
      >
        <span class="font-bold text-2xl text-center">{{ date }}</span>
        <div class="custom-block !p-4 flex flex-col gap-4">
          <div class="grid grid-cols-[1fr_200px_300px] gap-2 p-2">
            <div class="font-bold">Title</div>
            <div class="font-bold">Volume/Chapter</div>
            <div class="font-bold">Groups</div>
          </div>
          <div
            v-for="release in value"
            :key="release.record.id"
            class="grid grid-cols-[1fr_200px_300px] gap-y-1 gap-x-2 even:bg-gray-800/20 p-2 rounded"
          >
            <div class="font-bold">
              <Popup :width="400" :height="208" position="right" :delay="400">
                <template v-slot:target>
                  <span
                    class="whitespace-break-spaces cursor-pointer hover:text-blue-300 underline mx-1"
                    @click="
                      () =>
                        navigateTo(
                          `/series/${release.metadata.series.series_id}`
                        )
                    "
                  >
                    {{ release.record.title }}
                  </span>
                </template>

                <template v-slot:content>
                  <SeriesPopup :seriesId="release.metadata.series.series_id" />
                </template>
              </Popup>
            </div>
            <div>
              <span v-if="release.record.volume">
                v.{{ release.record.volume }}
              </span>
              <span v-if="release.record.chapter">
                c.{{ release.record.chapter }}
              </span>
            </div>
            <div>
              <span
                v-for="value in release.record.groups"
                :key="value.group_id"
                class="[&:not(:first-child)]:ml-2 cursor-pointer hover:text-blue-300 underline"
                @click="() => navigateTo(`/group/${value.group_id}`)"
              >
                {{ value.name }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-row justify-end mt-4">
        <Pagination
          :total="releases?.total_hits"
          :perPage="releases?.per_page"
          :currentPage="Number(route.params.page) - 1"
          :onPageChange="(page: number) => navigateTo(`/releases/${page + 1}`)"
        />
      </div>
    </div>
  </div>
</template>
