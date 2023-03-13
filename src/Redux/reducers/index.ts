import react from 'react';
import {combineReducers} from "redux";
import bankReducer  from "./bankReducer";
import {mealReducer} from "./mealReducer";
import {familyReducer} from "./FamilyReducer";


const reducers = combineReducers({
    bank : bankReducer,
    meal: mealReducer,
    family:familyReducer
});



export default reducers;
export  type  State =ReturnType<typeof reducers>