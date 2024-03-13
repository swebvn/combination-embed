<script setup lang="ts">
import { defineProps } from 'vue';
import { Option } from '../lib/types';

const { option } = defineProps<{
    option: Option
}>()
</script>

<template>
    <div>
        <label for="" v-text="option.label"></label>

    </div>
</template>