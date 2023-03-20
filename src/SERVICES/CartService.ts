import {Cart} from "../MODELS/Cart";
import {User} from "../MODELS/User";
import axios from "axios";

const baseURL = "http://192.168.1.17:8080/api/cart";
export const updateCart =  async  (cart:Cart, cartId:number):Promise<Cart> => {

        try {
            const response = await axios.put(`${baseURL}/${cartId}`, cart);

            return response.data as  Cart;
        } catch (error) {
            throw error;
        }
    };
export const getCartByFamily =  async  (familyId:number):Promise<Cart> => {

    try {
        const response = await axios.get(`${baseURL}/byFamily/${familyId}`);

        return response.data as  Cart;
    } catch (error) {
        throw error;
    }
};



