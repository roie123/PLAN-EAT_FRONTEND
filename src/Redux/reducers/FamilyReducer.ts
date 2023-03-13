import {Family} from "../../MODELS/Family";
import {Cart} from "../../MODELS/Cart";
import {FamilyAction} from "./actions/FamilyActions";
import {FamilyActionTypes} from "./actionTypes/FamilyActionTypes";
import {getFamily} from "../../SERVICES/FamilyService";

const dafaultFamily:Family={
    cart: new Cart(),
    dayList: [],
    email: "",
    familyMembers: [],
    favoriteRecipes: [],
    id: 0,
    imgUrl: "",
    isActive: false,
    name: "",
    password: ""

}

export function familyReducer(currentState:Family = dafaultFamily , action:FamilyAction):Family{
    let newState:Family ={...currentState};
    console.log(action);
    switch (action.type){
        case FamilyActionTypes.SET_FAMILY :{
            newState = action.payload
            break;
        }
        case FamilyActionTypes.GET_FAMILY:{
            return newState;
        }


    }
    return newState;



}