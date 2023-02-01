import react from 'react';
import {combineReducers} from "redux";
import bankReducer  from "./bankReducer";
import {mealReducer} from "./mealReducer";


const reducers = combineReducers({
    bank : bankReducer,
    meal: mealReducer
});



export default reducers;
export  type  State =ReturnType<typeof reducers>