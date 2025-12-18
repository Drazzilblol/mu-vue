<script setup lang="ts">
import type { TSocial } from "~/types/Author";
import type { TGroupSocial } from "~/types/Groups";

type TGroupSocialProps = {
  social?: TGroupSocial;
};

const props = defineProps<TGroupSocialProps>();
</script>

<template>
  <div
    class="flex flex-row text-white gap-2"
    v-if="
      social?.facebook ||
      social?.twitter ||
      social?.site ||
      social?.discord ||
      social?.forum ||
      social?.irc
    "
  >
    <div class="font-semibold">Social:</div>
    <!-- TODO: IRC -->
    <!-- <NuxtLink
      v-if="social?.irc"
      :to="social?.irc.server"
      external
      class="underline hover:text-blue-300"
      target="_blank"
    >
      IRC
    </NuxtLink> -->

    <NuxtLink
      v-if="social?.site"
      :to="social?.site"
      external
      class="underline hover:text-blue-300"
      target="_blank"
    >
      Website
    </NuxtLink>
    <NuxtLink
      v-if="social?.forum"
      :to="social?.forum"
      external
      class="underline hover:text-blue-300"
      target="_blank"
    >
      Forum
    </NuxtLink>
    <NuxtLink
      v-if="social?.discord"
      :to="social?.discord"
      external
      class="underline hover:text-blue-300"
      target="_blank"
    >
      Discord
    </NuxtLink>

    <NuxtLink
      v-if="social?.twitter"
      :to="social?.twitter"
      external
      class="underline hover:text-blue-300"
      target="_blank"
    >
      Twitter
    </NuxtLink>
    <NuxtLink
      v-if="social?.facebook"
      :to="social?.facebook"
      external
      class="underline hover:text-blue-300"
      target="_blank"
    >
      Facebook
    </NuxtLink>
  </div>
</template>
