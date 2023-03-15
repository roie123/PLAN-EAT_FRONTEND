import {Action} from "./actions";
import {ActionType} from "./actionTypes/actionType";

const initialState =0;

const bankReducer =(state=initialState , action:Action)=>{
    switch (action.type){
        case ActionType.DEPOSIT:{
            return state + action.payload;

        }
        case ActionType.WITHDRAW :{
            return state - action.payload;

        }
        case ActionType.BANKRUPT:{
            state=0;
            return state;

        }

        default :return state;

    }

}
export default  bankReducer;