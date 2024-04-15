<script setup lang="ts">
import {type Value} from "../lib/types.ts";

const {value} = defineProps<{
  value: Value
}>()

let type = 'text';

if (value.image_src) {
  type = 'image';
} else if (value.color) {
  type = 'color';
} else {
  type = 'text';
}
</script>

<template>
  <div v-if="type === 'text'" class="value-text" v-text="value.name"/>
  <div v-else-if="type === 'color'" class="value-color" :style="{ background: value.color }"/>
  <div v-else class="value-image">
    <img :src="value.image_src" :alt="value.name" />
  </div>
</template>
<style>

.value-text {
  font-size: 0.85rem;
  border: 1px solid #e3e3e3;
  border-radius: 0.5rem;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  min-width: 2rem;
  text-align: center;
}

input:checked + .value-text {
  background-color: #16a34a;
  color: #fff;
  outline: 1px solid #16a34a;
}

.value-color {
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: 1px solid #e3e3e3;
  border-radius: 100%;
  cursor: pointer;
}

input:checked + .value-color {
  outline: 2px solid #16a34a;
  outline-offset: 2px;
  border-color: transparent;
}

.value-image {
  border-radius: 4px;
  width: 4rem;
  height: 4rem;
  cursor: pointer;
}
.value-image > img{
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 4px;
}
input:checked + .value-image {
  outline: 2px solid #16a34a;
  outline-offset: 2px;
  border-color: transparent;
}
</style>