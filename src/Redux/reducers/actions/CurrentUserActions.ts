import {CurrentUserActionType} from "../actionTypes/CurrentUserActionType";
import {User} from "../../../MODELS/User";


 interface GetCurrentUser {
    type:CurrentUserActionType.GET,
    payload:User;

}

 interface SetCurrentUser {
    type:CurrentUserActionType.SET,
    payload:User;

}
interface ClearCurrentUser {
    type:CurrentUserActionType.CLEAR,
    payload:User;

}


export type CurrentUserActions = GetCurrentUser | SetCurrentUser | ClearCurrentUser