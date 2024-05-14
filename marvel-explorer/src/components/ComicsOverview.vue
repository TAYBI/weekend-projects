<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Ref } from "vue";
import { useComics } from "@/composables/marvelApi";
import type { Comic } from "@/types/marvel";

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
    <div class="" v-if="isLoading">Loadin Comics...</div>
    <div class="" v-if="data && !isLoading">
      <ul>
        <li class="font-semibold ml-2" key="comic.id" v-for="comic in data">
          - {{ comic.title }}
        </li>
      </ul>
    </div>
  </div>
</template>
