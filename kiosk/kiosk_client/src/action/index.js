export const GOINITSCREEN = "GOINITSCREEN";
export const GOMENUSCREEN = "GOMENUSCREEN";
export const PAYMENTSCREEN = "PAYMENTSCREEN";
export const ORDERRESULTSCREEN = "ORDERRESULTSCREEN";
export const GOVOICERECOGSCREEN = "GOVOICERECOGSCREEN";
export function goInitScreen(){
    return {
        type:GOINITSCREEN
    };
}

export function goMenuScreen(id){
    return{
        type:GOMENUSCREEN,
        order_id:id
    }
}

export function paymentScreen(order){
    let price_total = 0;
    order.forEach(item => {
        if (item.is_set){
            price_total+=(item.price+item.set_price)*item.amount
        }else{            
            price_total+=item.price*item.amount
        }    
    });
    return{
        type:PAYMENTSCREEN,
        order:order,
        price_total:price_total
    }
}

export function orderResultScreen(ordernum){
    return{
        type:ORDERRESULTSCREEN,
        order_number:ordernum
    }
}

export function goVoiceRecog(id){
    return{
        type:GOVOICERECOGSCREEN,
        order_id:id
    }
}