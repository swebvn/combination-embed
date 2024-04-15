import {computed, reactive, ref} from 'vue'
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

const combination = ref<Combination|null>(null)

export function setCombination(value: Combination) {
    combination.value = value
}

export const options = computed(() => combination.value?.options || [])

export const variants = computed(() => combination.value?.variants.filter(v => v.price > 0) || [])
