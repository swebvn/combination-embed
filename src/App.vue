<script setup lang="ts">
import type {Product} from "./lib/types.ts";
import {getCombination} from "./services/customedge.ts";
import {ref, onMounted, defineProps} from "vue";

export type AppProps = {
  product: Product,
  combinationId: number
}

const props = defineProps<AppProps>()

console.log('in app')

const loading = ref(false)
const combination = ref(null)

onMounted(async () => {
  loading.value = false;
  combination.value = await getCombination(props.combinationId)
   console.log('combination ', combination.value)
  loading.value = true;
})

</script>

<template>
  <div>
    <div v-if="loading">loading...</div>

    <div v-if="combination">
      combination: {{ combination.name }}
    </div>
  </div>
</template>

