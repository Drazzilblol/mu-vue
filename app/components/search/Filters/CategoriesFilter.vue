<script setup lang="ts">
import { TIconType } from "~/components/shared/Icons/IconsTypes";

type TProps = {
  onBack: () => void;
};
const props = defineProps<TProps>();

const { selectedFilters } = storeToRefs(useSearchStore());

const getCategories = async (input: string): Promise<string[]> => {
  const response = await $fetch<any>(
    `/api/categories/search?search=${input}&page=1&perpage=10`
  );

  return response.results.map((item: any) => item.record.category);
};

const onCategoryClick = (value: string) => {
  if (!selectedFilters.value.category?.includes(value)) {
    selectedFilters.value.category?.push(value);
  }
};

const onRemoveCategory = (category: string) => {
  const index = selectedFilters.value.category?.indexOf(category);

  if (index !== undefined && index > -1) {
    selectedFilters.value.category?.splice(index, 1);
  }
};
</script>

<template>
  <div>
    <div class="flex justify-between items-center">
      <div class="text-white font-semibold mb-2">Categories</div>
      <Button :onClick="() => onBack()"><- Back</Button>
    </div>
    <div class="my-4">
      <Autocomplete
        placeholder="Search categories..."
        :getOptions="getCategories"
        :onOptionClick="onCategoryClick"
      />
    </div>
    <div class="text-white text-center">
      {{
        selectedFilters.category?.length
          ? "Selected Categories:"
          : "No categories selected"
      }}
    </div>
    <div class="inline-flex flex-wrap gap-1 mt-2">
      <div
        v-for="category in selectedFilters.category"
        :key="category"
        class="text-white bg-gray-700 px-2 py-1 rounded-lg flex flex-row"
      >
        {{ category }}
        <div @click="() => onRemoveCategory(category)">
          <Icon
            :icon="TIconType.CLOSE"
            :size="16"
            classes="inline-block ml-1 cursor-pointer"
          />
        </div>
      </div>
    </div>
  </div>
</template>
