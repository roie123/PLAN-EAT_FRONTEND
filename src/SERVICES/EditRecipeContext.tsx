import react, {createContext, useContext} from "react";
import Recipe from "../MODELS/Recipe";





export const EditRecipeContext = createContext<Recipe>({
    estimatedPrice: 0,
    id: 0,
    ingredients: [],
    name: "Recipe For Editing"

})

export const useEditRecipeContext =()=> useContext(EditRecipeContext);