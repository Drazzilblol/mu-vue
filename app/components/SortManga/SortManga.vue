<script setup lang="ts">
import Select from "~/components/Select/Select.vue";

const SORT_OPTIONS = [
  { label: "Score", value: "score" },
  { label: "Title", value: "title" },
  { label: "Rank", value: "rank" },
  { label: "Rating", value: "rating" },
  { label: "Year", value: "year" },
  { label: "Date Added", value: "date_added" },
  { label: "1 Week Popularity", value: "week_pos" },
  { label: "1 Month Popularity", value: "month1_pos" },
  { label: "3 Month Popularity", value: "month3_pos" },
  { label: "6 Month Popularity", value: "month6_pos" },
  { label: "1 Year Popularity", value: "year_pos" },
  { label: "Currently Reading", value: "list_reading" },
  { label: "Wish List", value: "list_wish" },
  { label: "Completed", value: "list_complete" },
  { label: "Unfinished", value: "list_unfinished" },
];

const searchStore = useSearchStore();
const { selectedFilters } = storeToRefs(searchStore);
</script>

<template>
  <div>
    <Select
      :options="SORT_OPTIONS"
      :selected-option="selectedFilters.orderby"
      :onselect="
        (option) => {
          searchStore.sort(option);
        }
      "
    />
  </div>
</template>
