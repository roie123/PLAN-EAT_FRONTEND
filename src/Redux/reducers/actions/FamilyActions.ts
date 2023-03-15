import {FamilyActionTypes} from "../actionTypes/FamilyActionTypes";
import {Family} from "../../../MODELS/Family";


// interface FamilyAction{
// type:FamilyActionTypes,
//     payload:Family
//
// }
interface GetFamilyAction {
    type:FamilyActionTypes.GET_FAMILY,
    payload:Family
}
interface SetFamilyAction {
    type:FamilyActionTypes.SET_FAMILY,
    payload:Family
}
interface UpdateFamilyAction {
    type:FamilyActionTypes.UPDATE_FAMILY,
    payload:Family
}

export type FamilyAction = GetFamilyAction | SetFamilyAction |  UpdateFamilyAction ;

//  export interface GetFamilyAction{
//     type:FamilyActionTypes.GET_FAMILY,
//     payload : Family
// }
//
//  export  interface UpdateFamilyAction{
//     type:FamilyActionTypes.UPDATE_FAMILY,
//     payload : Family
// }


