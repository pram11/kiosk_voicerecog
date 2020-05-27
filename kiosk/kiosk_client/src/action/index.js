export const GOINITSCREEN = "GOINITSCREEN";
export const GOMENUSCREEN = "GOMENUSCREEN";
export const PAYMENTSCREEN = "PAYMENTSCREEN";
export const ORDERRESULTSCREEN = "ORDERRESULTSCREEN";

export function goInitScreen(){
    return {
        type:GOINITSCREEN
    };
}

export function goMenuScreen(){
    return{
        type:GOMENUSCREEN
    }
}

export function paymentScreen(){
    return{
        type:PAYMENTSCREEN
    }
}

export function orderResultScreen(){
    return{
        type:ORDERRESULTSCREEN
    }
}
