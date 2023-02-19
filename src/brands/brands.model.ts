import { Collection } from '../collections/brands.model'

export interface Brand {
    brandId: number,
    make: string,
    founder: string,
    transaction: string,
    year: string,
    vin: string,
    collections: Collection[]
}