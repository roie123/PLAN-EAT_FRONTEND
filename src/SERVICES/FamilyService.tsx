import { DEFAULT_ENCODING } from 'crypto';
import react, { createContext, useEffect, useState } from 'react';
import axios from 'axios'
import Recipe from '../MODELS/Recipe';
import { Family } from '../MODELS/Family';
import { setConstantValue } from 'typescript';



const baseURL = 'http://localhost:8080/api/family';







export const getFamily = async (): Promise<Family> => {
    try {
        const response = await axios.get(baseURL+'/id/1');

        return response.data;
    } catch (error) {
        throw error;
    }
};

