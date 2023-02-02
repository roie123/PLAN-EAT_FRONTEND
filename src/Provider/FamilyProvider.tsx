import react, { createContext } from 'react'
import { Family } from '../MODELS/Family';



const defaultFamily :Family ={
    dayList: [], email: "", familyMembers: [], imgUrl: "", isActive: false, name: "", password: "",
    id:0,
    favoriteRecipes:[]
}


export const FamilyContext = createContext<Family>(defaultFamily);




