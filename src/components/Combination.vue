<script setup lang="ts">
import {type Combination, type Option as OptionType} from '../lib/types';
import Option from './Option.vue';
import {form, variant, variants} from '../store';
import {onMounted} from 'vue';
import ExtraOption from "./ExtraOption.vue";

const {combination} = defineProps<{
  combination: Combination
}>()

onMounted(() => {
  if (Object.keys(form.options).length === 0) {
    form.options = combination.variants[0].options_map;
  }
})

function findDependentOptions(option: OptionType): number[] {
  return combination.options.filter((opt) => {
    return opt.position < option.position
  }).map(opt => opt.id)
}
</script>
<template>
  <form>
    <Option v-for="option in combination.options"
            :key="option.id"
            :option="option"
            :depends-on="findDependentOptions(option)"
    />

    <Option v-for="option in combination.extra_options"
            :key="option.id"
            :option="option"
            :depends-on="[]"
    />


    <button type="submit" id="btn-comb-add-to-cart">Add to cart</button>

    <!--    <pre>{{ JSON.stringify(variants, null, 2) }}</pre>-->
    <pre>{{ JSON.stringify(variant, null, 2) }}</pre>
    <pre>{{ JSON.stringify(form, null, 2) }}</pre>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

#btn-comb-add-to-cart {
  background-color: #16a34a;
  color: #fff;
  padding: 1rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  transition: background-color 0.2s;
  text-transform: uppercase;
}
</style>
