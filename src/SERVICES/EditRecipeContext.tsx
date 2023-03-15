import react, {createContext, useContext} from "react";
import Recipe from "../MODELS/Recipe";
import {FamilyRole} from "../MODELS/ENUMS/FamilyRole";





export const EditRecipeContext = createContext<Recipe>({
    estimatedPrice: 0,
    id: 0,
    ingredients: [],
    name: "Recipe For Editing",
    requestCreator: {
        id :0 ,
        isActive:true,
        name:"",
        favoriteRecipes:[],
        imgUrl:"",
        familyRole:FamilyRole.regular
    }

})

export const useEditRecipeContext =()=> useContext(EditRecipeContext);