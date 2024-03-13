<script setup lang="ts">
import { defineProps } from 'vue';
import { Option } from '../lib/types';

const { option } = defineProps<{
    option: Option
}>()
</script>

<template>
    <div>
        <label for="" v-text="option.label" />

        <div class="values-wrapper">
            <template v-for="value in option.values" :key="value.id">
                <label class="value-wrapper">
                    <input type="radio" :name="`option-${option.id}`" :value="value.id" required style="display: none;">

                    <div class="value-label">
                        <span v-text="value.name"></span>
                    </div>
                </label>
            </template>
        </div>
    </div>
</template>

<style>
.values-wrapper {
    margin-top: 0.5rem;
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}
.value-label {
    font-size: 0.85rem;
    border: 1px solid #e3e3e3;
    border-radius: 0.25rem;
    padding: 0.25rem 0.5rem;
    cursor: pointer;
}
input:checked + .value-label {
    background-color: #44976b;
    color: #fff;
}
</style>