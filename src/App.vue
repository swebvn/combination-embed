<script setup lang="ts">
import {type Product, type Combination as CombinationType} from "./lib/types.ts";
import {getCombination} from "./services/customedge.ts";
import {ref, onMounted, defineProps, watch, onBeforeMount} from "vue";
import Combination from "./components/Combination.vue";
import {setCombination, variant} from "./store.ts";
import {TooltipProvider} from 'radix-vue'


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

onBeforeMount(function hideOldPrice() {
  const priceWrapper = document.querySelector(props.injectors.price);
  if (priceWrapper) {
    priceWrapper.innerHTML = '';
  }
})

watch(
    () => variant.value,
    (newVal) => {
      // if (newVal) {
      //   const priceWrapper = document.querySelector(props.injectors.price);
      //   if (priceWrapper) {
      //     priceWrapper.innerHTML = newVal.price_formatted;
      //   }
      // }
    },
    {deep: true}
)

</script>

<template>
  <div>
    <TooltipProvider :delay-duration="100">
      <div v-if="loading">loading...</div>

      <div v-if="variant" :key="variant?.id">
        <!-- price -->
        <Teleport :to="props.injectors.price">
          <span class="price">{{ variant.price_formatted }}</span>
        </Teleport>

        <!-- preview image -->
        <Teleport :to="props.injectors.preview">
          <div class="thumbnail">
            <img :src="variant.image_src" class="object-cover" alt="preview image">
          </div>
        </Teleport>
      </div>
      <div v-else>No variant found</div>

      <div v-if="combinationData">
        <Combination :combination="combinationData"/>
      </div>
    </TooltipProvider>
  </div>
</template>

<style scoped>
.price {
  font-size: 2rem;
  color: #22c55e;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.thumbnail {
  position: absolute;
  bottom: 0;
  right: 0;
  margin-right: 1rem;
  margin-bottom: 1rem;
  width: 6rem;
  height: 6rem;
  outline: 1px solid white;
}

.thumbnail > img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>
