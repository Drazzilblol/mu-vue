<script setup lang="ts">
import { EPublisherType, type TPublisher } from "~/types/Publisher";

const route = useRoute();

const { data: publisherData } = await useFetch<TPublisher>(
  `/api/publishers/${route.params.id}`
);

const desc = computed(() => {
  return prepareText(publisherData.value?.info);
});

const associated = computed(() => {
  return publisherData.value?.associated.map((item) => item.name) || [];
});
</script>

<template>
  <!-- TODO: Looks like shit, need redisign -->
  <div class="flex h-full overflow-y-scroll bg-gray-800">
    <div
      class="flex flex-row gap-4 p-4 max-w-[1240px] h-fit justify-center mx-auto w-full shrink-0"
    >
      <div class="flex flex-col gap-2 text-white w-full">
        <div class="text-2xl font-bold">{{ publisherData?.name }}</div>
        <div class="flex flex-row gap-4">
          <div class="w-full">
            <div class="flex flex-row gap-4 mt-4">
              <div class="w-[75%] flex flex-col gap-4">
                <div>
                  <div
                    class="whitespace-break-spaces wrap-anywhere break-words"
                    v-html="desc"
                  />
                </div>

                <div>
                  <div class="font-semibold">Website:</div>

                  <NuxtLink
                    v-if="publisherData?.site"
                    :to="publisherData?.site"
                    external
                    class="underline hover:text-blue-300"
                    target="_blank"
                  >
                    Click Here
                  </NuxtLink>
                </div>

                <div>
                  <div class="font-semibold">Type:</div>

                  {{ publisherData?.type }}
                </div>
              </div>
              <div class="w-[25%] flex flex-col gap-4">
                <div>
                  <AssociatedNames
                    :names="associated"
                    title="Alternate Names:"
                    :lines="10"
                  />
                </div>
              </div>
            </div>

            <div class="mt-6">
              <PublisherPublications
                v-if="publisherData?.type !== EPublisherType.English"
                :publisherId="route.params.id as string"
              />
              <PublisherSeries
                v-if="publisherData?.type === EPublisherType.English"
                :publisherId="route.params.id as string"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
