import { DEFAULT_ENCODING } from 'crypto';
import react, { createContext, useEffect, useState } from 'react';
import axios from 'axios'
import Recipe from '../MODELS/Recipe';
import { Family } from '../MODELS/Family';
import { setConstantValue } from 'typescript';
import {User} from "../MODELS/User";



const baseURL = 'http://localhost:8080/api/user';



export const updateUser = async (user: User,userId : number): Promise<User> => {
    try {
        const response = await axios.put(`${baseURL}/${userId}`, user);

        return response.data ;
    } catch (error) {
        throw error;
    }
};
export const deleteUser = async (userId : number): Promise<User> => {
    try {
        const response = await axios.delete(`${baseURL}/${userId}`);

        return response.data ;
    } catch (error) {
        throw error;
    }
};



