import { reactive } from 'vue'

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