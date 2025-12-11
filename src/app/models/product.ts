import { Category } from "./category";
import { Ingredient } from "./ingredient";

export interface Product{
    id: number,
    name: string,
    ingredients: Ingredient[],
    basePrice: number,
    discountPercentage: number,
    finalPrice: number,
    image: string,
    categories: Category[]
}