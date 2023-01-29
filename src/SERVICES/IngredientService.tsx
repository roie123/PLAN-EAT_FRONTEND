import react from 'react' 
import axios from 'axios'
import { Ingredient } from '../MODELS/Ingredient'
import { PriceCategory } from '../MODELS/ENUMS/PriceCategory'
import { IngredientType } from '../MODELS/ENUMS/IngredientType'




const apiUrl = `http://localhost:8080/api/ingredients`

export const getAllActiveIngredients = async() : Promise<Ingredient[]> => {
    try{
        const response = await axios.get(apiUrl);
        return response.data;
    
        }catch(error){
            throw error;
        }    
}
export const getAllIngredientsBySearch = async(searchPattern:string) : Promise<Ingredient[]> => {
    try{
        console.log(`${apiUrl}/filter/${searchPattern}`)
        const response = await axios.get(`${apiUrl}/filter/${searchPattern}`);
        return response.data;
    
        }catch(error){
            throw error;
        }    
}
export const getAllIngredientTypes = async() : Promise<string[]> => {
    try{
        const response = await axios.get(`${apiUrl}/getTypes `);
        return response.data ;
    
        }catch(error){
            throw error;
        }    
}

export const getAllActiveIngredientsOrderedByPriceCategory = async() : Promise<Ingredient[]> => {
    try{
        const response = await axios.get(`${apiUrl}/orderByPriceCategory`);
        return response.data;
    
        }catch(error){
            throw error;
        }    
}
export const getAllActiveIngredientsByPriceCategory = async(category:PriceCategory) : Promise<Ingredient[]> => {
    try{
        const response = await axios.get(`${apiUrl}/getByPriceCategory/${category}`);
        return response.data;
    
        }catch(error){
            throw error;
        }    
}
export const getAllActiveIngredientsByType = async(type:IngredientType) : Promise<Ingredient[]> => {
    try{
        const response = await axios.get(`${apiUrl}/getByType/${type}`);
        return response.data;
    
        }catch(error){
            throw error;
        }    
}