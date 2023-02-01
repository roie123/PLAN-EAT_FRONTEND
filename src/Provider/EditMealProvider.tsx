import react, {createContext, useContext} from 'react';
import {Meal} from "../MODELS/Meal";


const defaultMeal:Meal={
    id: 0, isActive: false, mealTime: "", numberOfEaters: 0, recipeList: [], timeToMakeInMinutes: 0

}

export const EditMealContext = createContext<Meal>(defaultMeal);

export const  useEditMealContext =()=>  useContext(EditMealContext);