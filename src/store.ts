import { reactive } from 'vue'

export type StoreState = {
    options: {
        [key: string]: string
    },
    quantity: number
}

export const store = reactive<StoreState>({
    options: {},
    quantity: 1
})