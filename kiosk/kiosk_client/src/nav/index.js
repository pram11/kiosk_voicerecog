
import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native';



class Nav extends Component{
    setPress(item){
        this.props.getItemList(item)
    }
    render(){
        console.log(this.props.data)
        return( 
            <FlatList
            style={{maxHeight:68,backgroundColor:"lightgray"}}
            data = {this.props.data}
            renderItem={({item,key,separators})=>(
                <NavItem category_name = {item.name} onPress={()=>this.setPress(item.id)}/>
            )}
            horizontal={true}
            />
        )
    }
}

class NavItem extends Component{
    render(){
        return(
            <TouchableOpacity 
            style={{height:56,padding:4,margin:4,
                alignItems:"center",justifyContent:"center",
                borderRadius:8,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 3,
                shadowColor:"gray",
                backgroundColor:"white",
            
            }} onPress={()=>this.props.onPress()}>
                <Text style={{fontSize:32}}>{this.props.category_name}</Text>
            </TouchableOpacity>
        )
    }
}
class Order extends Component{
    render(){
        console.log("orderData:",this.props.data)
        let price_result = 0;
        this.props.data.forEach((item)=>{
            if (item.is_set){
                price_result+=(item.price+item.set_price)*item.amount
            }else{            
                price_result+=item.price*item.amount


            }
        })
        return(
            <View style={{flex:1}}>
                <FlatList 
                style={{flex:1}}
                data = {this.props.data}
                numColumns={1}
                renderItem={({item})=><OrderItem data={item} key={item.id}/>}
                />
                <Text style={{borderTopWidth:1,borderColor:"black",fontSize:20}}>{price_result} 원</Text>
            </View>
        )
    }
}
class OrderItem extends Component{
    render(){
        console.log(this.props.data)
        return(
            <View style={{flexDirection:"row"}}>
                <Text>{this.props.data.name} </Text>
                {this.props.data.is_set?<Text>(세트) </Text>:null}
                <Text>{this.props.data.amount}개</Text>
                <Text>X</Text>
                <Text>{this.props.data.is_set?this.props.data.price+this.props.data.set_price:this.props.data.price}</Text>
                <Text> = {this.props.data.is_set?(this.props.data.price+this.props.data.set_price)*this.props.data.amount:this.props.data.price*this.props.data.amount} 원</Text>
                
            </View>
        )
    }
}
export {Nav,Order}