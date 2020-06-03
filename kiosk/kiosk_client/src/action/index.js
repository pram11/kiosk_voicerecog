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

export function paymentScreen(order){
    let price_total = 0;
    order.forEach(item => {
        if (item.is_set){
            price_result+=(item.price_foreach+item.set_price)*item.amount
        }else{            
            price_result+=item.price_foreach*item.amount
        }    
    });
    return{
        type:PAYMENTSCREEN,
        order:order,
        price_total:price_total
    }
}

export function orderResultScreen(){
    return{
        type:ORDERRESULTSCREEN
    }
}
