import { Ingredient } from "./Ingredient";


export default interface Recipe{
    id:number,
    imgUrl?:string,
    name:string ,
    estimatedPrice:number,
    ingredients: Ingredient[],
    timeToMake?:number //added at 2.2.23 TODO: implement in the addRecipe feature and EditRecipe feature


}

