<script setup lang="ts">
import { type Combination, type Option as OptionType } from '../lib/types';
import Option from './Option.vue';
import { form } from '../store';
import { onMounted } from 'vue';

const { combination } = defineProps<{
    combination: Combination
}>()

console.log(combination.options)


onMounted(() => {
    if (Object.keys(form.options).length === 0) {
        form.options = combination.variants[0].options_map;
    }
})

function findDependentOptions(option: OptionType): number[] {
    return combination.options.filter((opt) => {
        return opt.position < option.position
    }).map(opt => opt.id)
}


</script>
<template>
    <form>
        <Option v-for="option in combination.options" :key="option.id"
         :option="option"
         :depends-on="findDependentOptions(option)"
          />

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
