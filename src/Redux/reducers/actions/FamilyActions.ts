import {ActionType} from "../actionTypes/actionType";
import {FamilyActionTypes} from "../actionTypes/FamilyActionTypes";
import {Family} from "../../../MODELS/Family";


export interface FamilyAction{
type:FamilyActionTypes,
    payload:Family


}



//  export interface GetFamilyAction{
//     type:FamilyActionTypes.GET_FAMILY,
//     payload : Family
// }
//
//  export  interface UpdateFamilyAction{
//     type:FamilyActionTypes.UPDATE_FAMILY,
//     payload : Family
// }


