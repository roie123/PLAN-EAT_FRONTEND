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
        console.log("GETTING USER");
        break;
    }
    case CurrentUserActionType.SET:{
        console.log("CURRENT USER CHANGING");
        newCurrentUserState=action.payload;
        console.log("USER CHANGED");
         break;
    }
    case CurrentUserActionType.CLEAR:{
        console.log("CURRENT USER CLEARING");
        newCurrentUserState=defaultUser;
        console.log("USER CLEARED");
        break;
    }


}



    return newCurrentUserState;


}