import {GOINITSCREEN,GOMENUSCREEN,PAYMENTSCREEN,ORDERRESULTSCREEN} from '../action';
import {combineReducers} from 'redux'

const displayInitState = {
    screen:"init"
}


const displayState = (state = displayInitState,action)=>{
    switch (action.type){
        case GOINITSCREEN:
            return Object.assign({},state,{
                screen : "init"
            })
        case GOMENUSCREEN:
            return Object.assign({},state,{
                screen:"menu"
            })
        case PAYMENTSCREEN:
            return Object.assign({},state,{
                screen:"payment"
            })
        case ORDERRESULTSCREEN:
            return Object.assign({},state,{
                screen:"result"
            })
        default:
            return state;
    }
}

export const Reducers = combineReducers({
    display:displayState
})