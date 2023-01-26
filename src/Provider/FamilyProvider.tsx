import react, { createContext } from 'react'
import { Family } from '../MODELS/Family';



const defaultFamily :Family ={
    id:0,
    favoriteRecipes:[]
}


export const FamilyContext = createContext<Family>(defaultFamily);




