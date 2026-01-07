<script setup lang="ts">
import type { TRequestMeta } from "~/types/General";
import type { TRelease } from "~/types/Releases";

type TGroupReleasesProps = {
  releases?: { record: TRelease; metadata?: TRequestMeta }[] | null;
  groupId: number;
};

const props = defineProps<TGroupReleasesProps>();

const releasesStore = useReleasesSearchStore();

const inputModel = ref<string>("");

const onSearch = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.value;
  releasesStore.search(props.groupId, value);
};

const debouncedSearch = debounce(onSearch, 500);
</script>

<template>
  <div>
    <div class="custom-block-border !p-4 flex flex-col gap-2">
      <div class="w-80 flex self-end">
        <span class="font-semibold mr-2 self-center">Search:</span>
        <Input
          placeholder="Naruto, One Piece, etc..."
          :onInput="debouncedSearch"
          v-model="inputModel"
        />
      </div>

      <div class="grid grid-cols-[100px_1fr_200px_200px] gap-2 p-2">
        <div class="font-bold">Date</div>
        <div class="font-bold">Title</div>
        <div class="font-bold">Volume/Chapter</div>
        <div class="font-bold">Groups</div>
      </div>
      <div
        v-for="release in releases"
        :key="release.record.id"
        class="grid grid-cols-[100px_1fr_200px_200px] gap-x-2 even:bg-accent px-2 py-1 rounded"
      >
        <div>{{ release.record.release_date }}</div>
        <div>
          <Popup :width="400" :height="208" position="right" :delay="400">
            <template v-slot:target>
              <span
                class="whitespace-break-spaces cursor-pointer hover:text-link underline"
                @click="
                  () =>
                    navigateTo(`/series/${release.metadata?.series.series_id}`)
                "
              >
                {{ release.record.title }}
              </span>
            </template>

            <template v-slot:content>
              <SeriesPopup
                :seriesId="release.metadata!.series.series_id"
                :series="release.record.metadata"
                :onSeriesLoaded="
                  (series) => {
                    release.record.metadata = series;
                  }
                "
              />
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
            class="[&:not(:first-child)]:ml-2 cursor-pointer hover:text-link underline"
            @click="() => navigateTo(`/group/${value.group_id}`)"
          >
            {{ value.name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
