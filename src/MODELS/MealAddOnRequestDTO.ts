import Recipe from "./Recipe";

export interface MealAddOnRequestDTO{
    id:number,
    userImgUrl:string,

    userName:string,


    requestedRecipes:Recipe[]


}