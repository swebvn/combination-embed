<script setup lang="ts">
import {type Value} from "../lib/types.ts";

const {value} = defineProps<{
  value: Value
}>()
</script>

<template>
  <div v-if="!value.color" class="basic-value" v-text="value.name"/>
  <div v-else class="color-swatch" :style="{ background: value.color }"/>
</template>
<style>

.basic-value {
  font-size: 0.85rem;
  border: 1px solid #e3e3e3;
  border-radius: 0.5rem;
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