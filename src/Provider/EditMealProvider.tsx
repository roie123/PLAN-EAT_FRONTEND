import react, {createContext, useContext} from 'react';
import {Meal} from "../MODELS/Meal";


const defaultMeal:Meal={
    mealAddOnRequestDTOList: [],
    id: 0, isActive: false, mealTime: "", numberOfEaters: 0, approvedRecipes: [], timeToMakeInMinutes: 0, pendingRecipes:[]

}

export const EditMealContext = createContext<Meal>(defaultMeal);

export const  useEditMealContext =()=>  useContext(EditMealContext);