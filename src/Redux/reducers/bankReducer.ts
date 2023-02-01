import {Action} from "./actions";
import {ActionType} from "./actionTypes/actionType";

const initialState =0;

const bankReducer =(state=initialState , action:Action)=>{
    switch (action.type){
        case ActionType.DEPOSIT:{
            console.log("DEPOSIT MADE");
            return state + action.payload;

        }
        case ActionType.WITHDRAW :{
            console.log("WITHDRAW MADE");
            return state - action.payload;

        }
        case ActionType.BANKRUPT:{
            console.log("BANKRUPTING");
            state=0;
            return state;

        }

        default :return state;

    }

}
export default  bankReducer;