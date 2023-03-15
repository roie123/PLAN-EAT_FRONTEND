import { Ingredient } from "./Ingredient";
import {User} from "./User";


export default interface Recipe{
    id:number,
    imgUrl?:string,
    name:string ,
    estimatedPrice:number,
    ingredients: Ingredient[],
    timeToMake?:number, //added at 2.2.23 TODO: implement in the addRecipe feature and EditRecipe featur
    requestCreator:User

}

