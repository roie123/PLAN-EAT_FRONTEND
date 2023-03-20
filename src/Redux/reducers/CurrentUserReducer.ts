import {User} from "../../MODELS/User";
import {CurrentUserActions} from "./actions/CurrentUserActions";
import {CurrentUserActionType} from "./actionTypes/CurrentUserActionType";
import {FamilyRole} from "../../MODELS/ENUMS/FamilyRole";


const defaultUser:User={
    familyRole: FamilyRole.regular,
    favoriteRecipes: [],
    id: 0,
    imgUrl: "",
    isActive: false,
    name: ""

}



export function currentUserReducer(currentState:User=defaultUser , action:CurrentUserActions ):User{
let newCurrentUserState:User = {...currentState};

switch ( action.type){

    case CurrentUserActionType.GET:{
        return newCurrentUserState;
        break;
    }
    case CurrentUserActionType.SET:{
        newCurrentUserState=action.payload;
         break;
    }
    case CurrentUserActionType.CLEAR:{
        newCurrentUserState=defaultUser;
        break;
    }


}



    return newCurrentUserState;


}