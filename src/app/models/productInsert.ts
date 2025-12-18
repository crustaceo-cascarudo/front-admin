import { Category } from "./category/category";
import { Ingredient } from "./ingredient";

export interface ProductInsert {
    name: string,
    ingredients: Ingredient[],
    basePrice: number,
    discountPercentage: number,
    finalPrice: number,
    image: string,
    categories: Category[]
}