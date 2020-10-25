import {GOINITSCREEN,GOMENUSCREEN,PAYMENTSCREEN,ORDERRESULTSCREEN, GOVOICERECOGSCREEN} from '../action';
import {combineReducers} from 'redux'
import { act } from 'react-test-renderer';

const displayInitState = {
    screen:"init"
}
const orderDataInitState = {
    order:[],
    price_total:0,
    order_number:null,
    order_id:null
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
                screen:"result",
            })
        case GOVOICERECOGSCREEN:
            return Object.assign({},state,{
                screen:"voicerecog"
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
        case GOMENUSCREEN:
            return Object.assign({},state,{
                order_id:action.order_id
            })
        case ORDERRESULTSCREEN:
            return Object.assign({},state,{
                order_number:action.order_number

            })
        case GOVOICERECOGSCREEN:
            return Object.assign({},state,{
                order_id:action.order_id
            })
        case GOINITSCREEN:
            return orderDataInitState

        default:
            return state;

    }
}

export const Reducers = combineReducers({
    display:displayState,
    orderdata:orderDataState
})