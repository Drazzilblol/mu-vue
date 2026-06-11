import { computed } from 'vue';
<script setup lang="ts">
import type { TOption } from "~/types/General";

type TListSelectProps = {
  seriesId: number;
  seriesList: any;
};

const props = defineProps<TListSelectProps>();

const listsStore = useListsStore();

const options = computed(() => {
  if (!listsStore.lists) return [];
  const options: TOption[] = Object.values(listsStore.lists)
    .filter((item) => !item.custom)
    .map((item) => ({ label: item.title, value: item.list_id }));
  options.push({ label: "Not in list", value: "notinlist" });
  return options;
});

const defaultOption = ref<string | number | undefined>(undefined);
watch(
  options,
  () => {
    defaultOption.value =
      options.value.find((option) => {
        return option.value === props.seriesList?.list_id;
      })?.value ?? "notinlist";
  },
  { immediate: true },
);

const onSelect = async (option: string | number) => {
  if (option !== "notinlist" && !props.seriesList) {
    const response = await $fetch<string[]>(`/api/lists/series`, {
      method: "POST",
      body: [{ series: { id: props.seriesId }, list_id: option }],
    });
    return response;
  }
  if (option === "notinlist" && props.seriesList) {
    const response = await $fetch<string[]>(`/api/lists/series/delete`, {
      method: "POST",
      body: [props.seriesId],
    });
    return response;
  }
  if (option !== "notinlist" && props.seriesList) {
    const response = await $fetch<string[]>(`/api/lists/series/update`, {
      method: "POST",
      body: [{ series: { id: props.seriesId }, list_id: option }],
    });
    return response;
  }
};
</script>

<template>
  <div>
    <Select
      :options="options"
      :onselect="onSelect"
      :selected-option="defaultOption"
    />
  </div>
</template>
