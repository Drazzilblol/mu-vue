<script setup lang="ts">
import type { TImage } from "~/types/General";
import type { TRecommendation, TRelatedSeries } from "~/types/Series";

type TRecomendationsProps = {
  recommended?: TRecommendation[];
  similar?: TRecommendation[];
  related?: TRelatedSeries[];
};

enum ERecomendationType {
  RECOMMENDED = "recommended",
  SIMILAR = "similar",
  RELATED = "related",
}

const props = defineProps<TRecomendationsProps>();

const availableTypes = computed(() => {
  const types: ERecomendationType[] = [];
  if (props.related && props.related.length > 0) {
    types.push(ERecomendationType.RELATED);
  }
  if (props.recommended && props.recommended.length > 0) {
    types.push(ERecomendationType.RECOMMENDED);
  }
  if (props.similar && props.similar.length > 0) {
    types.push(ERecomendationType.SIMILAR);
  }

  return types;
});

const current = ref<number>(0);

const titles: Record<ERecomendationType, string> = {
  [ERecomendationType.RECOMMENDED]: "Recommended Series",
  [ERecomendationType.SIMILAR]: "Similar Series",
  [ERecomendationType.RELATED]: "Related Series",
};

const seriesList = computed(() => {
  switch (availableTypes.value[current.value]) {
    case ERecomendationType.RECOMMENDED:
      return props.recommended || [];
    case ERecomendationType.SIMILAR:
      return props.similar || [];
    case ERecomendationType.RELATED:
      return props.related?.map((item) => ({
        series_name: item.related_series_name || "",
        series_id: item.related_series_id || 0,
        series_image: item.metadata?.image || ({} as TImage),
        relation: item.relation_type || "",
      }));
    default:
      return [];
  }
});

const onNext = () => {
  if (current.value + 1 < availableTypes.value.length) {
    current.value = current.value + 1;
  } else {
    current.value = 0;
  }
};

const onPrev = () => {
  if (current.value - 1 >= 0) {
    current.value = current.value - 1;
  } else {
    current.value = availableTypes.value.length - 1;
  }
};
</script>

<template>
  <div
    v-if="availableTypes.length > 0"
    class="flex flex-col text-white gap-4 custom-block"
  >
    <div class="flex flex-row justify-between items-center self-center w-full">
      <Button v-if="availableTypes.length > 1" @click="onPrev"><</Button>
      <div class="font-semibold mx-auto">
        {{ titles[availableTypes[current]!] }}
      </div>
      <Button v-if="availableTypes.length > 1" @click="onNext">></Button>
    </div>

    <RecomendationItem
      v-for="item in seriesList"
      :key="item.series_id"
      :recomendation="item"
    />
  </div>
</template>
