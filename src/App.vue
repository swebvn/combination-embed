<script setup lang="ts">
import {type Product, type Combination as CombinationType, Variant} from "./lib/types.ts";
import {getCombination} from "./services/customedge.ts";
import {ref, onMounted, defineProps, watchEffect, watch} from "vue";
import Combination from "./components/Combination.vue";
import {setCombination, variant} from "./store.ts";

export type AppProps = {
  product: Product,
  combinationId: number,
  injectors: {
    target: string,
    preview: string
    price: string
  }
}


const props = defineProps<AppProps>()

const loading = ref(false)
const combination = ref<CombinationType | null>(null)

onMounted(async () => {
  loading.value = true;

  const response = await getCombination(props.combinationId) as CombinationType

  combination.value = response;
  setCombination(response);

  loading.value = false;
})

// onMounted(() => {
//   document.querySelector(props.injectors.price).innerHTML = variant.price;
// })

watch(() => variant, (newVal) => {
  console.log('new value', newVal.value)
  if (newVal.value) {
    const element = document.querySelector(props.injectors.price)
    if (element) {
      element.innerHTML = '$' + newVal.value.price;
    }
  }
}, {deep: true})

</script>

<template>
  <div>
    <div v-if="loading">loading...</div>

    <div v-if="combination">
      <Combination :combination="combination"/>
    </div>
  </div>
</template>
