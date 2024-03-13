<script setup lang="ts">
import { Combination } from '../lib/types';
import Option from './Option.vue';
import { form } from '../store';

const { combination } = defineProps<{
    combination: Combination
}>()
</script>
<template>
    <form>
        <Option v-for="option in combination.options" :key="option.id" :option="option" />
        <button type="submit">Add to cart</button>

        <pre>{{ JSON.stringify(form, null, 2) }}</pre>
    </form>
</template>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>
