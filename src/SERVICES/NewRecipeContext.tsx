import React, { createContext, useContext } from "react";
import Recipe from "../MODELS/Recipe";
import {FamilyRole} from "../MODELS/ENUMS/FamilyRole";


const defaultRecipe:Recipe ={
    id:0,
    name:"",
    ingredients:[],
    estimatedPrice:0,
    imgUrl:'',
    requestCreator: {
        id :0 ,
        isActive:true,
        name:"",
        favoriteRecipes:[],
        imgUrl:"",
        familyRole:FamilyRole.regular
    }
}

export const NewRecipeValuesContext= createContext<Recipe>(defaultRecipe);


export const   useNewRecipeValuesContext = () => useContext(NewRecipeValuesContext);