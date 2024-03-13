<script setup lang="ts">
import type {Product} from "./lib/types.ts";

const props = defineProps<{
  product: Product,
  combinationId: number
}>()

</script>

<template>
  <div>
    <h1>{{ product.name }}</h1>
    <p>Combination ID: {{ combinationId }}</p>
  </div>
</template>

