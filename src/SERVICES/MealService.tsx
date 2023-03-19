import react from  'react';
import Recipe from "../MODELS/Recipe";
import axios from "axios";
import {Meal} from "../MODELS/Meal";
import store from "../Redux/store";
import {FamilyActionTypes} from "../Redux/reducers/actionTypes/FamilyActionTypes";


const baseURL:string = 'http://192.168.1.17:8080/api/meal';
export const updateMeal = async (id: number, meal:Meal): Promise<Meal> => {
    try {
        const response = await axios.put(`${baseURL}/${id}`, meal);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const addPendingRecipes = async (mealId: number,userId:number, recipes:Recipe[]): Promise<Recipe> => {
    try {
        const response = await axios.put(`${baseURL}/addPendingRecipes/${mealId}/${userId}`, recipes);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const approveMealAddOnRequest = async (mealId: number,mealAddOnRequestId:number, recipe:Recipe): Promise<Meal> => {
    try {
        const response = await axios.put(`${baseURL}/approveRequest/${mealId}/${mealAddOnRequestId}`, recipe);
        return response.data as Meal;
    } catch (error) {
        throw error;
    }
};

