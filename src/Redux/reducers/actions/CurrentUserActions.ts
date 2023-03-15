import {CurrentUserActionType} from "../actionTypes/CurrentUserActionType";
import {User} from "../../../MODELS/User";


 interface GetCurrnetUser {
    type:CurrentUserActionType.GET,
    payload:User;

}

 interface SetCurrnetUser {
    type:CurrentUserActionType.SET,
    payload:User;

}


export type CurrentUserActions = GetCurrnetUser | SetCurrnetUser