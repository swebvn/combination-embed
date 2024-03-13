<script setup lang="ts">
import type {Product} from "./lib/types.ts";
import {getCombination} from "./services/customedge.ts";
import {ref, onMounted, defineProps} from "vue";

const props = defineProps<{
  product: Product,
  combinationId: number
}>()


const combination = ref(null)

onMounted(async () => {
  combination.value = await getCombination(props.combinationId)
  console.log(combination.value)
})

</script>

<template>
  <div>
    <h1>{{ product.name }}</h1>
    <p>Combination ID: {{ combinationId }}</p>
  </div>
</template>

