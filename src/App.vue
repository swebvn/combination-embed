<script setup lang="ts">
import { type Product } from "./lib/types.ts";
import { getCombination } from "./services/customedge.ts";
import { ref, onMounted, defineProps } from "vue";
import Combination from "./components/Combination.vue";

export type AppProps = {
  product: Product,
  combinationId: number
}

const props = defineProps<AppProps>()

const loading = ref(false)
const combination = ref<Combination | null>(null)

onMounted(async () => {
  loading.value = true;
  combination.value = await getCombination(props.combinationId)
  loading.value = false;
})
</script>

<template>
  <div>
    <div v-if="loading">loading...</div>

    <div v-if="combination">
      <Combination :combination="combination" />
    </div>
  </div>
</template>
