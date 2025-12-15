<script setup lang="ts">
const props = defineProps({
  seriesId: Number,
});

const { data: comments } = await useFetch<any>(
  `/api/series/comments/search?id=${props.seriesId}&perpage=10&page=1`
);
</script>

<template>
  <div class="flex flex-col gap-4">
    <Comment
      v-for="comment in comments.results"
      :key="comment.id"
      :comment="comment"
    />
  </div>
</template>
