<script setup lang="ts">
import {type Combination, type Option as OptionType} from '../lib/types';
import Option from './Option.vue';
import {form, variant} from '../store';
import {onMounted} from 'vue';

const {combination} = defineProps<{
  combination: Combination
}>()

onMounted(function initDefaultVariant()  {
  if (Object.keys(form.options).length === 0) {
    form.options = combination.variants[0].options_map;
  }

  combination.extra_options.map(ex => {
    form.extraOptions[ex.id] = ex.values[0].id;
  })
})

function findDependentOptions(option: OptionType): number[] {
  return combination.options.filter((opt) => {
    return opt.position < option.position
  }).map(opt => opt.id)
}

function addToCart() {

}
</script>
<template>
  <form @submit.prevent="addToCart">
    <Option v-for="option in combination.options"
            :key="`options-${option.id}`"
            :option="option"
            :depends-on="findDependentOptions(option)"
            :is-extra="false"
    />

    <Option v-for="option in combination.extra_options"
            :key="`option-${option.id}`"
            :option="option"
            :depends-on="[]"
            :is-extra="true"
    />

    <button type="submit" id="btn-comb-add-to-cart">Add to cart</button>

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
