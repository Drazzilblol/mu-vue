<script setup lang="ts">
import type { TPublicationResponse } from "~/types/Publisher";

const route = useRoute();

const { data: publicationData } = await useAPI<TPublicationResponse>(
  `publishers/publication?pubname=${route.params.id}`
);

const preparedGenres = (genres: string[]) => {
  return genres.join(", ");
};
</script>

<template>
  <!-- TODO: Looks like shit, need redisign -->
  <div class="flex h-full overflow-y-scroll">
    <div
      class="flex flex-row gap-4 p-4 max-w-[1240px] h-fit justify-center mx-auto w-full shrink-0"
    >
      <div class="flex flex-col gap-2 text-white w-full">
        <div class="text-2xl font-bold">{{ route.params.id }}</div>
        <div class="text-sm">
          by
          <span
            class="font-semibold underline cursor-pointer hover:text-blue-300"
            @click="
              () =>
                navigateTo(
                  `/publisher/${publicationData?.publisher.publisher_id}`
                )
            "
          >
            {{ publicationData?.publisher.publisher_name }}
          </span>
        </div>
        <div class="flex flex-row gap-4">
          <div class="w-full">
            <div class="grid grid-cols-2 gap-4 mt-4">
              <span
                v-for="value in publicationData?.series_list"
                :key="value.series_id"
              >
                <span
                  class="whitespace-break-spaces cursor-pointer hover:text-blue-300 underline"
                  @click="() => navigateTo(`/series/${value.series_id}`)"
                >
                  {{ value.title }}
                </span>

                <span class="text-gray-400 pl-1">
                  {{ preparedGenres(value.genres) }}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
