import {Meal} from "../../MODELS/Meal";
import {MealActionType} from "./actionTypes/MealActionType";


const initialValueOfMeal:Meal = {
    id: 0,
    isActive: false,
    mealTime: "",
    numberOfEaters: 0,
    recipeList: [],
    timeToMakeInMinutes: 10000
}


interface UpdateMealAction {
    type:MealActionType.UPDATE,
    payload:Meal;

}
export type  MealAction  = UpdateMealAction;
export const mealReducer = (state= initialValueOfMeal , action:MealAction )=>{
    switch (action.type){
        case MealActionType.UPDATE:{
            state=action.payload;

            return state;
        }



        default :return state;
    }

}