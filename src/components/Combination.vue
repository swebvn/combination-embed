<script setup lang="ts">
import { Combination } from '../lib/types';
import Option from './Option.vue';

const { combination } = defineProps<{
    combination: Combination
}>()
</script>
<template>
    <form>
        <strong>{{ combination.name }}</strong>
        <Option v-for="option in combination.options" :key="option.id" :option="option" />
    </form>
</template>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>
