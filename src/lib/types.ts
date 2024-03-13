export type Product = {
    id: string
    name: string
    price?: number
    image: string
    sku: string
}

export type Combination = {
    id: number
    name: string
    options: Option[]
    variants: Variant[]
}

export type Option = {
    id: number
    name: string
    label: string
    position: number
    values: Value[]
}

export type Value = {
    id: number
    name: string
    color: string
    image_src: string
    size_chart_src: string
}