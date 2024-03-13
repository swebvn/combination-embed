<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { Option } from '../lib/types';
import { form } from '../store';

const { option } = defineProps<{
    option: Option
}>()

const values = computed(() => option.values)
</script>

<template>
    <div>
        <div class="option-label" for="" v-text="option.label" />

        <div class="values-wrapper">
            <template v-for="value in values" :key="value.id">
                <label class="value-wrapper">
                    <input type="radio" v-model="form.options[option.id]" :name="`option-${option.id}`" :value="value.id" required style="display: none">

                    <div v-if="!value.color" class="basic-value" v-text="value.name" />
                    <div v-else="value.color" class="color-swatch" :style="{ background: value.color }"></div>
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

input:checked+.basic-value {
    background-color: #44976b;
    color: #fff;
    outline: 2px solid #44976b;
    outline-offset: 0.5px;
}
.color-swatch {
    width: 2.25rem;
    height: 2.25rem;
    padding: 0;
    border: 1px solid #e3e3e3;
    border-radius: 100%;
    cursor: pointer;
}
input:checked + .color-swatch {
    outline: 2px solid #44976b;
    outline-offset: 2px;
    border-color: transparent;
}
</style>