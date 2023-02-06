import react, { createContext } from 'react'
import { Family } from '../MODELS/Family';
import {Cart} from "../MODELS/Cart";



const defaultFamily :Family ={
    cart :new Cart(),
    dayList: [], email: "", familyMembers: [], imgUrl: "", isActive: false, name: "", password: "",
    id:0,
    favoriteRecipes:[]
}


export const FamilyContext = createContext<Family>(defaultFamily);




