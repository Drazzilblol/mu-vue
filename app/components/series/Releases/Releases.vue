<script setup lang="ts">
import type { TRequestMeta } from "~/types/General";
import type { TRelease } from "~/types/Releases";

type TGroupReleasesProps = {
  releases?: { record: TRelease; metadata?: TRequestMeta }[] | null;
};

const props = defineProps<TGroupReleasesProps>();

const userStore = useUserStore();
const releasesStore = useReleasesSearchStore();

const addBookmark = async (
  releaseId: string,
  userId: string,
  seriesId: string,
) => {
  const data = await $fetch<any>(`/api/releases/bookmark/add`, {
    method: "POST",
    body: {
      user_id: userId,
      series_id: seriesId,
      release_id: releaseId,
      bookmark_id: releasesStore.bookmark?.bookmark_id,
    },
  });
  releasesStore.bookmark = data;
};
</script>

<template>
  <div>
    <div class="custom-block-border !p-4 flex flex-col gap-2">
      <div class="grid grid-cols-[100px_200px_1fr_20px] gap-2 p-2">
        <div class="font-bold">Date</div>
        <div class="font-bold">Volume/Chapter</div>
        <div class="font-bold">Groups</div>
      </div>
      <div
        @click="
          () => {
            if (userStore.user) {
              addBookmark(
                release.record.id.toString(),
                userStore.user?.user_id.toString()!,
                release.metadata?.series?.series_id?.toString()!,
              );
            }
          }
        "
        v-for="release in releases"
        :key="release.record.id"
        class="grid grid-cols-[100px_200px_1fr_20px] gap-x-2 even:bg-accent px-2 py-1 rounded"
      >
        <div>{{ release.record.release_date }}</div>
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
        <div>
          {{
            +releasesStore.bookmark?.release_id === release.record.id
              ? "+"
              : "-"
          }}
        </div>
      </div>
    </div>
  </div>
</template>
