import {computed, reactive, ref, watch} from 'vue'
import { Combination } from './lib/types'

export type FormState = {
    options: {
        [key: string]: number
    },
    extraOptions: {
        [key: string]: number
    },
    quantity: number
}

export const form = reactive<FormState>({
    options: {},
    extraOptions: {},
    quantity: 1
})

watch(form.options, () => findVariant(), {deep: true})

const combination = ref<Combination|null>(null)

export function setCombination(value: Combination) {
    combination.value = value
}

export const options = computed(() => combination.value?.options || [])

export const variants = computed(() => combination.value?.variants.filter(v => v.price > 0) || [])

export const variant = ref(null)

function findVariant() {
    variant.value = variants.values.find(v => {
        return Object.keys(form.options).every(key => {
            return form.options[key] === v.options_map[key]
        })
    })
}