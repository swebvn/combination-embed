<script setup lang="ts">
import {type Product, type Combination as CombinationType} from "./lib/types.ts";
import {getCombination} from "./services/customedge.ts";
import {ref, onMounted, defineProps, watch} from "vue";
import Combination from "./components/Combination.vue";
import {setCombination, variant} from "./store.ts";
import {TooltipArrow, TooltipContent, TooltipProvider, TooltipRoot, TooltipTrigger} from 'radix-vue'


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
const combinationData = ref<CombinationType | null>(null)

onMounted(async () => {
  loading.value = true;

  const response = await getCombination(props.combinationId) as CombinationType

  combinationData.value = response;
  setCombination(response);
  loading.value = false;
})

watch(
    () => variant.value,
    (newVal) => {
      if (newVal) {
        const priceWrapper = document.querySelector(props.injectors.price);
        if (priceWrapper) {
          priceWrapper.innerHTML = newVal?.price_formatted;
        }
      }
    },
    {deep: true}
)

</script>

<template>
  <div>
    <TooltipProvider delay-duration="100">
      <div v-if="loading">loading...</div>

      <div v-if="combinationData">
        <Combination :combination="combinationData"/>
      </div>
    </TooltipProvider>
  </div>
</template>
