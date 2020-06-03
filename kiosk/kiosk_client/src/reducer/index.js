import {GOINITSCREEN,GOMENUSCREEN,PAYMENTSCREEN,ORDERRESULTSCREEN} from '../action';
import {combineReducers} from 'redux'
import { act } from 'react-test-renderer';

const displayInitState = {
    screen:"init"
}
const orderDataInitState = {
    order:[],
    price_total:0
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
const orderDataState = (state = orderDataInitState,action)=>{
    switch(action.type){
        case PAYMENTSCREEN:
            return Object.assign({},state,{
                order:action.order,
                price_total:action.price_total
            })
        default:
            return state;

    }
}

export const Reducers = combineReducers({
    display:displayState,
    orderdata:orderDataState
})