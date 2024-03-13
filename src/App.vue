<script setup lang="ts">
import { type Product, type Combination as CombinationType } from "./lib/types.ts";
import { getCombination } from "./services/customedge.ts";
import { ref, onMounted, defineProps } from "vue";
import Combination from "./components/Combination.vue";
import { store } from "./store.ts";

export type AppProps = {
  product: Product,
  combinationId: number
}

const props = defineProps<AppProps>()

const loading = ref(false)

onMounted(async () => {
  loading.value = true;

  const response = await getCombination(props.combinationId) as CombinationType

  store.combination = response

  loading.value = false;
})
</script>

<template>
  <div>
    <div v-if="loading">loading...</div>

    <div v-if="store.combination">
      <Combination :combination="store.combination" />
    </div>
  </div>
</template>
