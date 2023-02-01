import react from 'react';
import {ActionType} from "../actionTypes/actionType";



interface DepositAction{
    type:ActionType.DEPOSIT,
    payload : number
}
interface WithdrawAction{
    type:ActionType.WITHDRAW,
    payload : number
}
interface Bankrupt{
    type:ActionType.BANKRUPT
}

 export type Action = DepositAction | WithdrawAction | Bankrupt


