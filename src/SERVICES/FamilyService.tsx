import axios from 'axios'
import {Family} from '../MODELS/Family';
import {User} from "../MODELS/User";
import store from "../Redux/store";
import {Cart} from "../MODELS/Cart";
import {familyReducer} from "../Redux/reducers/FamilyReducer";
import {FamilyActionTypes} from "../Redux/reducers/actionTypes/FamilyActionTypes";


const baseURL = 'http://192.168.1.17:8080/api/family';



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
        store.dispatch({type:FamilyActionTypes.SET_FAMILY, payload:response.data});
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



