<script setup lang="ts">
import {
  type TPublisher,
  type TPublisherPublicationsResponse,
} from "~/types/Publisher";

const route = useRoute();

const { data: publisherData } = await useAPI<TPublisher>(
  `/publishers/${route.params.id}`
);

const { data: publicationsData } = await useAPI<TPublisherPublicationsResponse>(
  `/publishers/${route.params.id}/series`
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
  <div class="flex h-full overflow-y-scroll">
    <div
      class="flex flex-row gap-4 p-4 max-w-[1240px] h-fit justify-center mx-auto w-full shrink-0"
    >
      <div class="flex flex-col gap-2 w-full">
        <div class="text-2xl font-bold">{{ publisherData?.name }}</div>
        <div class="flex flex-row gap-2">
          <div class="w-full">
            <Tabs>
              <Tab title="Info">
                <div class="flex flex-row gap-2">
                  <div class="w-[75%] flex flex-col gap-2">
                    <div
                      v-if="desc"
                      class="whitespace-break-spaces wrap-anywhere break-words custom-block-border"
                      v-html="desc"
                    />

                    <div class="custom-block-border">
                      <div>
                        <div class="font-semibold">Website:</div>

                        <NuxtLink
                          v-if="publisherData?.site"
                          :to="publisherData?.site"
                          external
                          class="underline hover:text-link"
                          target="_blank"
                        >
                          Click Here
                        </NuxtLink>

                        <div v-else>N/A</div>
                      </div>

                      <div>
                        <div class="font-semibold">Type:</div>

                        {{ publisherData?.type || "N/A" }}
                      </div>
                    </div>
                  </div>
                  <div class="w-[25%] custom-block-border h-max">
                    <AssociatedNames
                      :names="associated"
                      title="Alternate Names:"
                      :lines="10"
                    />
                  </div>
                </div>
              </Tab>
              <Tab title="Series">
                <div class="mt-2 custom-block-border">
                  <SeriesList :series="publicationsData?.series_list" />
                </div>
              </Tab>
              <Tab title="Publications">
                <div class="mt-2 custom-block-border">
                  <PublisherPublications :publications="publicationsData" />
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
