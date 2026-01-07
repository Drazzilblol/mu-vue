<script setup lang="ts">
import dayjs from "dayjs";
import {
  EAuthorType,
  EPublisherType,
  type TAuthor,
  type TGroups,
  type TPublisher,
  type TSeries,
} from "~/types/Series";

type TAboutProps = {
  series?: TSeries;
  groups?: TGroups;
};

const props = defineProps<TAboutProps>();

const creators = computed(() => {
  return props.series?.authors?.reduce(
    (acc, author: TAuthor) => {
      if (author.type === EAuthorType.Author) {
        acc.authors.push(author);
      }
      if (author.type === EAuthorType.Artist) {
        acc.artists.push(author);
      }
      return acc;
    },
    { authors: [] as TAuthor[], artists: [] as TAuthor[] }
  );
});

const publishers = computed(() => {
  return props.series?.publishers?.reduce(
    (acc, publisher: TPublisher) => {
      if (publisher.type === EPublisherType.Original) {
        acc.original.push(publisher);
      }
      if (publisher.type === EPublisherType.English) {
        acc.english.push(publisher);
      }
      return acc;
    },
    { original: [] as TPublisher[], english: [] as TPublisher[] }
  );
});
</script>

<template>
  <div class="flex flex-col justify-center flex-wrap gap-4 custom-block-border">
    <div>
      <div class="font-semibold">Author(s):</div>

      <div v-if="!creators?.authors?.length">N/A</div>

      <div
        class="cursor-pointer hover:text-link underline"
        v-for="author in creators?.authors"
        @click="() => navigateTo(`/author/${author.author_id}`)"
      >
        {{ author.name }}
      </div>
    </div>

    <div>
      <div class="font-semibold">Artist(s):</div>

      <div v-if="!creators?.artists?.length">N/A</div>

      <div
        class="cursor-pointer hover:text-link underline"
        v-for="artist in creators?.artists"
        @click="() => navigateTo(`/author/${artist.author_id}`)"
      >
        {{ artist.name }}
      </div>
    </div>

    <div>
      <div class="font-semibold">Original Publishers:</div>

      <div v-if="!publishers?.original?.length">N/A</div>

      <div v-for="publisher in publishers?.original">
        <span
          class="cursor-pointer hover:text-link underline mr-1"
          @click="() => navigateTo(`/publisher/${publisher.publisher_id}`)"
        >
          {{ publisher.publisher_name }}
        </span>
        <span v-if="publisher.notes">({{ publisher.notes }})</span>
      </div>
    </div>

    <div>
      <div class="font-semibold">Serialized In (magazine)</div>

      <div v-if="!series?.publications.length">N/A</div>

      <div v-for="publication in series?.publications">
        <span
          class="cursor-pointer hover:text-link underline"
          @click="
            () => navigateTo(`/publication/${publication?.publication_name}`)
          "
        >
          {{ publication?.publication_name }}
        </span>
        ({{ publication?.publisher_name }})
      </div>
    </div>

    <div>
      <div class="font-semibold">English Publishers:</div>

      <div v-if="!publishers?.english?.length">N/A</div>

      <div v-for="publisher in publishers?.english">
        <span
          class="cursor-pointer hover:text-link underline mr-1"
          @click="() => navigateTo(`/publisher/${publisher.publisher_id}`)"
        >
          {{ publisher.publisher_name }}
        </span>
        <span v-if="publisher.notes">({{ publisher.notes }})</span>
      </div>
    </div>

    <div>
      <div class="font-semibold">Groups Scanlating:</div>

      <div v-if="!groups?.group_list.length">N/A</div>

      <TextCollapse :lines="4">
        <div
          class="cursor-pointer hover:text-link underline"
          v-for="group in groups?.group_list"
          @click="() => navigateTo(`/group/${group.group_id}`)"
        >
          {{ group.name }}
        </div>
      </TextCollapse>
    </div>

    <div>
      <div class="font-semibold">Latest Releases:</div>

      <div v-if="!groups?.release_list.length">N/A</div>

      <div v-for="release in groups?.release_list">
        ch.{{ release.chapter }} by
        <span
          class="cursor-pointer hover:text-link underline"
          @click="() => navigateTo(`/group/${release.groups[0].group_id}`)"
        >
          {{ release.groups[0].name }}
        </span>
        <span class="text-foreground/60 ml-1">
          {{ dayjs(release.release_date, "YYYY-MM-DD").fromNow() }}
        </span>
      </div>
    </div>

    <div>
      <div class="font-semibold">Anime Start/End Chapter:</div>

      <div v-if="!series?.anime?.start && !series?.anime?.end">N/A</div>

      <template v-else>
        <div>Starts at {{ series?.anime?.start }}</div>
        <div>Ends at {{ series?.anime?.end }}</div>
      </template>
    </div>
  </div>
</template>
