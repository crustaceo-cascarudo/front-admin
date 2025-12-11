import { IngredientClass } from "./ingredientClass";

export interface ProductClass{
    id: number,
    name: string,
    ingredients: IngredientClass[],
    basePrice: number,
    discountPercentage: number,
    finalPrice: number,
    image: string,
    categories: CategoryClass[]
}