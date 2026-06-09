<script setup lang="ts">
import dayjs from "dayjs";
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
    <div class="custom-block-border !p-4 flex flex-col gap-3">
      <div class="grid grid-cols-[100px_200px_1fr] gap-2 p-2">
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
        class="grid grid-cols-[100px_200px_1fr] gap-x-2 px-4 py-4 rounded-xl cursor-pointer relative"
        :class="
          +releasesStore.bookmark?.release_id === release.record.id
            ? 'border border-primary hover:border-primary/60'
            : 'border border-border/40 hover:border-border/80'
        "
      >
        <div class="self-center">
          {{ dayjs(release.record.release_date).format("DD.MM.YYYY") }}
        </div>
        <div class="self-center">
          <span v-if="release.record.volume">
            v.{{ release.record.volume }}
          </span>
          <span v-if="release.record.chapter">
            c.{{ release.record.chapter }}
          </span>
        </div>
        <div class="self-center">
          <span
            v-for="value in release.record.groups"
            :key="value.group_id"
            class="[&:not(:first-child)]:ml-2 cursor-pointer hover:text-link underline"
            @click.stop="() => navigateTo(`/group/${value.group_id}`)"
          >
            {{ value.name }}
          </span>
        </div>
        <div
          v-if="+releasesStore.bookmark?.release_id === release.record.id"
          class="absolute right-4 -top-2 bg-primary rounded-full px-3 text-xs"
        >
          You stopped here
        </div>
      </div>
    </div>
  </div>
</template>
