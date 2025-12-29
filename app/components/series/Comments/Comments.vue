<script setup lang="ts">
import type { TCommentsResponse } from "~/types/Comments";

type TCommentsProps = {
  seriesId: number;
  initialComments?: TCommentsResponse;
  scrollRef?: HTMLElement | null;
};

const props = defineProps<TCommentsProps>();

const page = ref(0);
const perPage = ref(10);
const comments = ref<TCommentsResponse | undefined>(props.initialComments);

const loadComments = async (newPage: number) => {
  const data = await $fetch<TCommentsResponse>(
    `/api/series/comments/search?id=${props.seriesId}&perpage=${
      perPage.value
    }&page=${newPage + 1}`
  );
  page.value = newPage;
  comments.value = data;
  if (props.scrollRef) {
    props.scrollRef.scroll({ top: 0, behavior: "smooth" });
  }
};
</script>

<template>
  <div
    v-if="!comments?.results.length"
    class="text-center text-lg font-semibold mt-10"
  >
    No comments yet.
  </div>
  <div v-else class="flex flex-col gap-4">
    <Pagination
      :total="comments?.total_hits"
      :perPage="perPage"
      :currentPage="page"
      :onPageChange="
        (newPage: number) => {
          loadComments(newPage);
        }
      "
    />
    <Comment
      v-for="comment in comments?.results"
      :key="comment.record.id"
      :comment="comment"
    />
    <Pagination
      :total="comments?.total_hits"
      :perPage="perPage"
      :currentPage="page"
      :onPageChange="
        (newPage: number) => {
          loadComments(newPage);
        }
      "
    />
  </div>
</template>
