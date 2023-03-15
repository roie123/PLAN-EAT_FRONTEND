import {Meal} from "../../MODELS/Meal";
import {MealActionType} from "./actionTypes/MealActionType";


const initialValueOfMeal:Meal = {
    mealAddOnRequestDTOList: [],
    id: 0,
    isActive: false,
    mealTime: "",
    numberOfEaters: 0,
    approvedRecipes: [],
    timeToMakeInMinutes: 10000,
    pendingRecipes:[]
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