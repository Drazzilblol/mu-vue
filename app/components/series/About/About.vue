<script setup lang="ts">
import dayjs from "dayjs";
import {
  EAuthorType,
  EPublisherType,
  type TAssociated,
  type TAuthor,
  type TGroups,
  type TPublisher,
  type TSeries,
} from "~/types/Series";

const props = defineProps({
  series: {
    type: Object as () => TSeries,
  },
  groups: {
    type: Object as () => TGroups,
  },
});

const creators = computed<{ authors: TAuthor[]; artists: TAuthor[] }>(() => {
  return props.series?.authors.reduce(
    (acc: any, author: TAuthor) => {
      if (author.type === EAuthorType.Author) {
        acc.authors.push(author);
      }
      if (author.type === EAuthorType.Artist) {
        acc.artists.push(author);
      }
      return acc;
    },
    { authors: [], artists: [] }
  );
});

const publishers = computed(() => {
  return props.series?.publishers.reduce(
    (acc: any, publisher: TPublisher) => {
      if (publisher.type === EPublisherType.Original) {
        acc.original.push(publisher);
      }
      if (publisher.type === EPublisherType.English) {
        acc.english.push(publisher);
      }
      return acc;
    },
    { original: [], english: [] }
  );
});
</script>

<template>
  <div
    class="flex flex-col justify-center text-white flex-wrap gap-4 custom-block"
  >
    <div>
      <div class="font-semibold">Author(s):</div>

      <div v-if="!creators.authors.length">N/A</div>

      <div
        class="cursor-pointer hover:text-blue-300 underline"
        v-for="author in creators.authors"
        @click="() => navigateTo(`/author/${author.author_id}`)"
      >
        {{ author.name }}
      </div>
    </div>

    <div>
      <div class="font-semibold">Artist(s):</div>

      <div v-if="!creators.artists.length">N/A</div>

      <div
        class="cursor-pointer hover:text-blue-300 underline"
        v-for="artist in creators.artists"
        @click="() => navigateTo(`/author/${artist.author_id}`)"
      >
        {{ artist.name }}
      </div>
    </div>

    <div>
      <div class="font-semibold">Original Publishers:</div>

      <div v-if="!publishers.original.length">N/A</div>

      <div v-for="publisher in publishers.original">
        <span
          class="cursor-pointer hover:text-blue-300 underline mr-1"
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
          class="cursor-pointer hover:text-blue-300 underline"
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

      <div v-if="!publishers.english.length">N/A</div>

      <div v-for="publisher in publishers.english">
        <span
          class="cursor-pointer hover:text-blue-300 underline mr-1"
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
          class="cursor-pointer hover:text-blue-300 underline"
          v-for="group in groups?.group_list"
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
        <span class="cursor-pointer hover:text-blue-300 underline">
          {{ release.groups[0].name }}
        </span>
        <span class="text-gray-400 ml-1">
          {{ dayjs(release.release_date, "YYYY-MM-DD").fromNow() }}
        </span>
      </div>
    </div>
  </div>
</template>
