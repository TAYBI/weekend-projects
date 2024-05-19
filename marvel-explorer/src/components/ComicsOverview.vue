<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Ref } from "vue";
import { useComics } from "@/composables/marvelApi";
import type { Comic } from "@/types/marvel";

import LoadingIndicator from "./LoadingIndicator.vue";
import ComicCard from "./ComicCard.vue";

const data: Ref<Comic[] | undefined> = ref();
const isLoading: Ref<boolean> = ref(false);

const getComics = async () => {
  isLoading.value = true;
  const comics = await useComics();

  data.value = comics.results;
  console.log(data);
  isLoading.value = false;
};

onMounted(async () => {
  await getComics();
});
</script>

<template>
  <div>
    <LoadingIndicator v-if="isLoading" text="Loadin Comics..." />
    <div
      class="grid grid-flow-row grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
      v-if="data && !isLoading">
      <ComicCard v-for="comic in data" :comic="comic" />
    </div>
  </div>
</template>
