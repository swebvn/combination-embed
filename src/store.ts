import { reactive, ref } from 'vue'
import { Combination } from './lib/types'

export type FormState = {
    options: {
        [key: string]: number
    },
    quantity: number
}

export const form = reactive<FormState>({
    options: {},
    quantity: 1
})

export const store = reactive<{
    combination: Combination|null
}>({
    combination: null
})