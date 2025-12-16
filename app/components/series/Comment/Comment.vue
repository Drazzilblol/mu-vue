<script lang="ts" setup>
import dayjs from "dayjs";

const props = defineProps({
  comment: Object as () => any,
});

const createdAt = computed(() => {
  return dayjs(
    (props.comment.record.time_added.timestamp || 0) * 1000
  ).fromNow();
});

const lastUpdated = computed(() => {
  if (!props.comment.record.time_updated.timestamp) {
    return null;
  }

  return dayjs(props.comment.record.time_updated.timestamp * 1000).fromNow();
});

const prepareText = (text?: string) => {
  const linkPattern =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/gi;
  const spoilerPattern = /\>\!\s(.*?)(((\n\n)+?)|$)/gs;
  const spoilers = text?.replace(
    spoilerPattern,
    `<blockquote class="blockquote">
        <div class="relative">$1</div>
        <div class="flex hover:opacity-0 absolute top-0 left-0 w-full h-full bg-zinc-900">
          <div class="self-center ml-2">Spoilers (Mouse over to view)</div>
        </div>
    </blockquote>$2`
  );
  const links = spoilers?.replace(
    linkPattern,
    `<a href="$&" target="_blank" rel="noopener noreferrer" class="underline hover:text-blue-300">$&</a>`
  );
  return links?.replaceAll("\n\n\n", "\n\n");
};

const text = computed(() => {
  return prepareText(props.comment.record.content || "");
});
</script>

<template>
  <div class="flex flex-col justify-center text-center custom-block">
    <div class="flex flex-col gap-4">
      <div class="grid grid-cols-[56px_1fr_100px] gap-2">
        <div class="self-center">
          <img
            :src="comment.record.author.user_info.avatar?.url"
            alt="avatar"
            class="w-14 h-14"
          />
        </div>
        <div class="flex flex-col text-left">
          <div class="font-semibold">
            {{ comment.record.subject }}
          </div>
          <!--TODO: add navigate to user profile -->
          <div>by {{ comment.record.author.user_info.username }}</div>
          <div>{{ createdAt }}</div>
        </div>
        <div
          class="h-max p-1 bg-zinc-900 border border-black border-opacity-50 self-center"
        >
          Rating:
          <div>
            {{
              comment.metadata.author_series_rating
                ? comment.metadata.author_series_rating + "/10"
                : "N/A"
            }}
          </div>
        </div>
      </div>

      <div class="text-left whitespace-pre-line" v-html="text"></div>
      <div v-if="lastUpdated" class="text-sm text-left text-gray-500">
        ...Last updated {{ lastUpdated }}
      </div>
    </div>
  </div>
</template>

<style lang="css">
.blockquote {
  border-left: 3px solid #ccc;
  @apply bg-zinc-900 my-2  p-2 relative inline-flex w-full;
}
</style>
