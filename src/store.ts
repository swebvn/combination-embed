import { reactive } from 'vue'

export type FormState = {
    options: {
        [key: string]: string
    },
    quantity: number
}

export const form = reactive<FormState>({
    options: {},
    quantity: 1
})