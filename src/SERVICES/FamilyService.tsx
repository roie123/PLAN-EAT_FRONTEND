import { DEFAULT_ENCODING } from 'crypto';
import react, { createContext, useEffect, useState } from 'react';
import axios from 'axios'
import Recipe from '../MODELS/Recipe';
import { Family } from '../MODELS/Family';
import { setConstantValue } from 'typescript';
import {User} from "../MODELS/User";
import {useDispatch} from "react-redux";
import store from "../Redux/store";
import {Cart} from "../MODELS/Cart";



const baseURL = 'http://localhost:8080/api/family';



export const addFamilyMember = async (user: User,familyId : number): Promise<User> => {
    try {
        const response = await axios.post(`${baseURL}/addToFamily/${familyId}`, user);

        return response.data ;
    } catch (error) {
        throw error;
    }
};



export const getFamily = async (): Promise<Family> => {
    try {
        const response = await axios.get(baseURL+'/id/1');
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const generateCart = async (familyId : number): Promise<Cart> => {
    try {
        const response = await axios.post(`${baseURL}/newCart/${familyId}`);

        return response.data as Cart ;
    } catch (error) {
        throw error;
    }
};



