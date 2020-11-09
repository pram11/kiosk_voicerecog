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
    Modal,
    Dimensions
} from 'react-native';
import style from '../style';



class MenuSelectedModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            amount:1,
            isSet:false

        }
    }
    addMenu(){
        this.props.addMenu({
            id:this.props.data.id,
            name:this.props.data.name,
            price_foreach:this.props.data.price,
            is_set:this.props.data.set_available?this.state.isSet:false,
            amount:this.state.amount,
            set_price:this.props.data.set_price
        })
    }
    render(){
        if(this.props.show){
        return(
            <Modal  style={[{width:"100%",height:'100%',position:"absolute",flex:1,flexDirection:"column"}]} transparent={true}>
                <View style={[{margin:32,marginTop:128,height:'70%',flexDirection:"column",elevation:4},style.background]}>
                    <View style={{marginHorizontal:24,marginTop:8,}}>
                        <TouchableOpacity style={{alignItems:"flex-end"}} onPress={()=>this.props.onPressClose()}>
                            <Text style={[{fontSize:26},style.yellow_color]}>X</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1,padding:8}}>
                        <View style={[style.yellow_border,{borderStyle:'solid',borderTopWidth:2,borderBottomWidth:2,alignItems:"center",justifyContent:"center",padding:16,marginHorizontal:16}]}>
                            <Text style={[{fontSize:28,textAlign:"center"},style.yellow_color,style.normalFont]}>{this.props.data.name}</Text>
                            <Text style={[{fontSize:20,textAlign:"center",color:"white"},style.normalFont]}>{this.props.data.price} 원</Text>

                        </View>
                        
                        <View style={{flex:3}}>
                            <View style={{flexDirection:"row",padding:16}}>
                                <Text style={[{fontSize:28,flex:1},style.yellow_color,style.normalFont]}>수량</Text>
                                <TouchableOpacity style={[{textAlign:"center",alignItems:"center",width:40,height:40},style.button]} onPress={()=>this.setState({amount:this.state.amount+1})}>
                                    <Text style={{fontSize:30}}>+</Text>
                                </TouchableOpacity>
                                <Text style={{fontSize:28,marginLeft:32,marginRight:32,color:"white"}}>{this.state.amount}</Text>
                                <TouchableOpacity style={[{textAlign:"center",alignItems:"center",width:40,height:40},style.button]} onPress={()=>{this.state.amount<=1?null:this.setState({amount:this.state.amount-1})}}>
                                    <Text style={{fontSize:30}}>-</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection:"row",padding:16}}>
                                {this.props.data.set_available?

                                <TouchableOpacity 
                                style={{flex:1,flexDirection:"row",alignItems:"center"}}
                                    onPress={()=>{this.setState({isSet:!this.state.isSet});console.log(this.state.isSet)}}
                                >                                    
                                <Text style={[{fontSize:28,alignItems:"center",justifyContent:"center",flex:1},style.yellow_color]}>세트 주문 여부</Text>

                                    <View style={{width:32,height:32,borderColor:"white",borderWidth:2,borderStyle:"solid"}}>
                                        <View style={[{margin:2,alignItems:"center",justifyContent:"center",},style.background]}>
                                        {this.state.isSet?
                                        <Text style={{fontSize:20,color:"white"}}>V</Text>:
                                        null}
                                        </View>
                                        
                                    </View>
                                </TouchableOpacity>
                                :null}

                            </View>
                        </View>
                        <TouchableOpacity style={[{padding:8,alignItems:"center",margin:16},style.button]} onPress={()=>{this.addMenu()}}>
                                <Text style={{fontSize:30}}>추가</Text>
                            </TouchableOpacity>
                    </View>
                </View>

            </Modal>
        )}
        else
        return null
    }
}
export {MenuSelectedModal}