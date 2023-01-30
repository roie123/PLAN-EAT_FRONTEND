import axios from 'axios';
import react, { useState } from 'react'
import Recipe from '../MODELS/Recipe';



const baseURL = 'http://localhost:8080/api/recipe';
export const getRecipe = async (id: number): Promise<Recipe> => {
    try {
        const response = await axios.get(`${baseURL}/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const createRecipe = async (recipe: Recipe,familyId : number): Promise<Recipe> => {
    try {
        const response = await axios.post(`${baseURL}/addToFamily/${familyId}`, recipe);
        
        return response.data as Recipe;
    } catch (error) {
        throw error;
    }
};

export const updateRecipe = async (id: number, recipe: Recipe): Promise<Recipe> => {
    try {
        const response = await axios.put(`${baseURL}/${id}`, recipe);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteRecipe = async (recipeId: number , familyId:number): Promise<void> => {
    try {
        await axios.delete(`${baseURL}/${recipeId}/${familyId}`);
    } catch (error) {
        throw error;
    }
};
