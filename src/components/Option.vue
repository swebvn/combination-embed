<script setup lang="ts">
import {computed, defineProps} from 'vue';
import {Option} from '../lib/types';
import {form, variants} from "../store";
import {TooltipArrow, TooltipContent, TooltipRoot, TooltipTrigger} from 'radix-vue'
import ValueSwatch from "./ValueSwatch.vue";

const {option, dependsOn} = defineProps<{
  option: Option,
  dependsOn: number[]
}>()

const values = computed(() => {
  if (dependsOn.length === 0) {
    return option.values;
  }

  const optionId = option.id;
  let valuesSet: Set<number> = new Set();

  for (let i = 0; i < variants.value.length; i++) {
    let variant = variants.value[i];
    let matched = true;

    for (let k = 0; k < dependsOn.length; k++) {
      const dependOptionId = dependsOn[k];
      if (variant.options_map[dependOptionId.toString()] !== form.options[dependOptionId.toString()]) {
        matched = false;
        break;
      }
    }

    if (matched) {
      valuesSet.add(variant.options_map[optionId]);
    }
  }

  if (optionId === 4) {
    console.log('values set', valuesSet, dependsOn)
  }

  if (valuesSet.size === 0) {
    console.log('values set is empty', optionId, form.options)
    return option.values;
  }

  if (!valuesSet.has(form.options[optionId])) {
    console.log('the value set does not have the current value')
    let firstValue = valuesSet.values().next().value;
    console.log('find the first value of set', firstValue)

    form.options[optionId] = firstValue; // this not trigger the computed property depends on the form.options
    // fix this pls
  }

  return option.values.filter(value => valuesSet.has(value.id));
})

</script>

<template>
  <div>
    <div class="option-label" v-text="option.label"/>

    <div class="values-wrapper">
      <template v-for="value in values" :key="value.id">
        <TooltipRoot>
          <TooltipTrigger as-child>
            <label class="value-wrapper">
              <input type="radio"
                     v-model="form.options[option.id]"
                     :name="`option-${option.id}`"
                     :value="value.id"
                     required
                     style="display: none">

              <ValueSwatch :value="value"/>
            </label>
          </TooltipTrigger>
          <TooltipContent style="padding: 4px 8px; color: white; font-size: 0.875rem; background: rgba(0, 0, 0,  0.9); border-radius: 4px;">
            {{ value.name }}
            <TooltipArrow />
          </TooltipContent>
        </TooltipRoot>
      </template>
    </div>
  </div>
</template>

<style>
.TooltipContent {
  color: red;
}
.option-label {
  font-size: 0.85rem;
  font-weight: 500;
}

.values-wrapper {
  margin-top: 0.5rem;
  display: flex;
  gap: 0.85rem;
  flex-wrap: wrap;
}

</style>