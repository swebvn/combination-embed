<script setup lang="ts">
import {computed, defineProps} from 'vue';
import {Option} from '../lib/types';
import {options, variants, form} from "../store";

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
    const variant = variants.value[i];
    let matched = true;

    for (let k = 0; k < dependsOn.length; k++) {
      const dependOptionId = dependsOn[k];
      if (variant.options_map[dependOptionId] !== form.options[dependOptionId.toString()]) {
        matched = false;
        break;
      }
    }

    if (matched) {
      valuesSet.add(variant.options_map[optionId]);
    }
  }

  if (valuesSet.size === 0) {
    return option.values;
  }

  if (!valuesSet.has(form.options[optionId])) {
    let firstValue = valuesSet.values().next().value;

    // we need to
    form.options[optionId] = firstValue.toString();
  }

  return option.values.filter(value => valuesSet.has(value.id));
})

</script>

<template>
  <div>
    <div class="option-label" for="" v-text="option.label"/>
    <div>{{ dependsOn }}</div>

    <div class="values-wrapper">
      <template v-for="value in values" :key="value.id">
        <label class="value-wrapper">
          <input type="radio" v-model="form.options[option.id]" :name="`option-${option.id}`" :value="value.id" required
                 style="display: none">

          <div v-if="!value.color" class="basic-value" v-text="value.name"/>
          <div v-else="value.color" class="color-swatch" :style="{ background: value.color }"/>
        </label>
      </template>
    </div>
  </div>
</template>

<style>
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

.basic-value {
  font-size: 0.85rem;
  border: 1px solid #e3e3e3;
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  min-width: 2rem;
  text-align: center;
}

input:checked + .basic-value {
  background-color: #16a34a;
  color: #fff;
  outline: 1px solid #16a34a;
}

.color-swatch {
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: 1px solid #e3e3e3;
  border-radius: 100%;
  cursor: pointer;
}

input:checked + .color-swatch {
  outline: 2px solid #16a34a;
  outline-offset: 2px;
  border-color: transparent;
}
</style>