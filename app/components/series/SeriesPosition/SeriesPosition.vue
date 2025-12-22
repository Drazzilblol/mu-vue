<script setup lang="ts">
import { TIconType } from "~/components/shared/Icons/IconsTypes";
import type { TRank, TRelatedSeries } from "~/types/Series";

type TSeriesPositionProps = {
  rank?: TRank;
};

const props = defineProps<TSeriesPositionProps>();
const rankDiff = computed(() => {
  if (!props.rank) return null;
  return {
    week: props.rank.old_position.week - props.rank.position.week,
    month: props.rank.old_position.month - props.rank.position.month,
    three_months:
      props.rank.old_position.three_months - props.rank.position.three_months,
    six_months:
      props.rank.old_position.six_months - props.rank.position.six_months,
    year: props.rank.old_position.year - props.rank.position.year,
  };
});
</script>

<template>
  <div class="flex flex-col custom-block">
    <div class="font-semibold">Activity Stats (vs. other series):</div>
    <div v-if="!rank">N/A</div>
    <div class="flex flex-col" v-else>
      <span class="grid grid-cols-[100px_1fr]">
        Weekly:
        <span class="flex">
          {{ rank!.position.week }}
          <Icon
            :icon="TIconType.DOWN_TRIANGLE"
            color="red"
            v-if="rankDiff!.week < 0"
          />
          <Icon :icon="TIconType.UP_TRIANGLE" color="green" v-else />
          <span :class="rankDiff!.week < 0 ? 'text-red-500' : 'text-green-500'">
            {{ Math.abs(rankDiff!.week) }}
          </span>
        </span>
      </span>
      <span class="grid grid-cols-[100px_1fr]">
        Monthly:
        <span class="flex">
          {{ rank!.position.month }}
          <Icon
            :icon="TIconType.DOWN_TRIANGLE"
            color="red"
            v-if="rankDiff!.month < 0"
          />
          <Icon :icon="TIconType.UP_TRIANGLE" color="green" v-else />
          <span
            :class="rankDiff!.month < 0 ? 'text-red-500' : 'text-green-500'"
          >
            {{ Math.abs(rankDiff!.month) }}
          </span>
        </span>
      </span>
      <span class="grid grid-cols-[100px_1fr]">
        3 Month:
        <span class="flex">
          {{ rank!.position.three_months }}
          <Icon
            :icon="TIconType.DOWN_TRIANGLE"
            color="red"
            v-if="rankDiff!.three_months < 0"
          />
          <Icon :icon="TIconType.UP_TRIANGLE" color="green" v-else />
          <span
            :class="rankDiff!.three_months < 0 ? 'text-red-500' : 'text-green-500'"
          >
            {{ Math.abs(rankDiff!.three_months) }}
          </span>
        </span>
      </span>
      <span class="grid grid-cols-[100px_1fr]">
        6 Month:
        <span class="flex">
          {{ rank!.position.six_months }}
          <Icon
            :icon="TIconType.DOWN_TRIANGLE"
            color="red"
            v-if="rankDiff!.six_months < 0"
          />
          <Icon :icon="TIconType.UP_TRIANGLE" color="green" v-else />
          <span
            :class="rankDiff!.six_months < 0 ? 'text-red-500' : 'text-green-500'"
          >
            {{ Math.abs(rankDiff!.six_months) }}
          </span>
        </span>
      </span>
      <span class="grid grid-cols-[100px_1fr]">
        Year:
        <span class="flex">
          {{ rank!.position.year }}
          <Icon
            :icon="TIconType.DOWN_TRIANGLE"
            color="red"
            v-if="rankDiff!.year < 0"
          />
          <Icon :icon="TIconType.UP_TRIANGLE" color="green" v-else />
          <span :class="rankDiff!.year < 0 ? 'text-red-500' : 'text-green-500'">
            {{ Math.abs(rankDiff!.year) }}
          </span>
        </span>
      </span>
    </div>
  </div>

  <div class="flex flex-col custom-block">
    <div class="font-semibold">List Stats:</div>
    <div v-if="!rank">N/A</div>
    <!-- TODO add navigation for list stats -->
    <div class="flex flex-col" v-else>
      <span>On {{ rank!.lists.reading }} reading lists</span>
      <span>On {{ rank!.lists.wish }} wish lists</span>
      <span>On {{ rank!.lists.complete }} completed lists</span>
      <span>On {{ rank!.lists.unfinished }} unfinished lists</span>
      <span>On {{ rank!.lists.custom }} custom lists</span>
    </div>
  </div>
</template>
