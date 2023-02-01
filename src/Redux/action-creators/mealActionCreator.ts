import {Meal} from "../../MODELS/Meal";
import {Dispatch} from "redux";
import {MealActionType} from "../reducers/actionTypes/MealActionType";
import {MealAction} from "../reducers/mealReducer";


export const updateMealAction =(meal:Meal)=>{
    return (dispatch:Dispatch<MealAction>)=>{
        dispatch({
            type:MealActionType.UPDATE,
            payload:meal
        })
    }
}