import react from  'react';
import Recipe from "../MODELS/Recipe";
import axios from "axios";
import {Meal} from "../MODELS/Meal";


const baseURL:string = 'http://localhost:8080/api/meal';
export const updateMeal = async (id: number, meal:Meal): Promise<Recipe> => {
    try {
        const response = await axios.put(`${baseURL}/${id}`, meal);
        console.log(response);
        return response.data;
    } catch (error) {
        throw error;
    }
};
