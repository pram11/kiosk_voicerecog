
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
  FlatList,
  Dimensions
} from 'react-native';
import style from '../style';

const windowWidth = Dimensions.get('window').width;



class Nav extends Component{
    constructor(props){
        super(props)
        this.state={
            selected:1
        }
    }
    setPress(item){
        this.setState({selected:item})
        this.props.getItemList(item)
    }
    render(){
        return( 
            <FlatList
            style={{flex:1,backgroundColor:"white"}}
            data = {this.props.data}
            renderItem={({item,key,separators})=>(
                <NavItem category_name = {item.name} category_id={item.id} onPress={()=>this.setPress(item.id)} selected_id={this.state.selected}/>
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
            style={[{height:56,padding:4,
                paddingHorizontal:8,
                alignItems:"center",justifyContent:"center",
                width:windowWidth/4,
                
            
            },this.props.category_id===this.props.selected_id?style.yellow_underline:null]} onPress={()=>this.props.onPress()}>
                <Text style={[{fontSize:28},style.navItemFont,this.props.category_id===this.props.selected_id?style.yellow_color:{color:"black"}]}>{this.props.category_name}</Text>
            </TouchableOpacity>
        )
    }
}
class Order extends Component{
    render(){
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
                <View style={{flexDirection:"row",margin:8}}>
                    <Text style={[{flex:1,color:"white",fontSize:16},style.normalFont]}>장바구니</Text>
                    <Text style={[{flex:1,fontSize:16,color:"white"},style.normalFont,style.yellow_underline]}>총 주문금액 : {price_result} 원</Text>

                </View>
                <FlatList 
                style={{flex:1,marginHorizontal:8}}
                data = {this.props.data}
                numColumns={1}
                renderItem={({item})=><OrderItem data={item} key={item.id}/>}
                />
            </View>
        )
    }
}
class OrderItem extends Component{
    render(){
        return(
            <View style={{flexDirection:"row"}}>
                <Text style={[{color:"white"},style.normalFont]}>{this.props.data.name} </Text>
                {this.props.data.is_set?<Text style={[{color:"white"},style.normalFont]}>(세트) </Text>:null}
                <Text style={[{color:"white"},style.normalFont]}>{this.props.data.amount}개</Text>
                <Text style={[{color:"white"},style.normalFont]}> X </Text>
                <Text style={[{color:"white"},style.normalFont]}>{this.props.data.is_set?this.props.data.price+this.props.data.set_price:this.props.data.price}</Text>
                <Text style={[{color:"white"},style.normalFont]}> = {this.props.data.is_set?(this.props.data.price+this.props.data.set_price)*this.props.data.amount:this.props.data.price*this.props.data.amount} 원</Text>
                
            </View>
        )
    }
}
export {Nav,Order}