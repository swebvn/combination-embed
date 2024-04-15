import {computed, reactive, ref, watch} from 'vue'
import {Combination, Variant} from './lib/types'

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

watch(
    () => form.options,
    () => findVariant(),
    {deep: true}
)

const combination = ref<Combination | null>(null)

export function setCombination(value: Combination) {
    combination.value = value
}

export const options = computed(() => combination.value?.options || [])

export const variants = computed(() => combination.value?.variants.filter(v => v.price > 0) || [])

export const variant = ref<Variant|undefined>()

function findVariant() {
    const result = variants.value.find(v => {
        return Object.keys(form.options).every(key => {
            // console.log(v.options_map);
            return form.options[key] === v.options_map[parseInt(key)]
        })
    })

    console.log('find result', result)

    variant.value = result
}