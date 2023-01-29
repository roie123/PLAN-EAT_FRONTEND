import React, { createContext, useContext } from "react";
import Recipe from "../MODELS/Recipe";


const defaultRecipe:Recipe ={
    id:0,
    name:"",
    ingredients:[],
    estimatedPrice:0,
    imgUrl:''
}

export const NewRecipeValuesContext= createContext<Recipe>(defaultRecipe);


export const   useNewRecipeValuesContext = () => useContext(NewRecipeValuesContext);