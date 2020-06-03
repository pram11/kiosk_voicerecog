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
            name:this.props.data.name,
            price_foreach:this.props.data.price,
            is_set:this.state.isSet,
            amount:this.state.amount,
            set_price:this.props.data.set_price
        })
    }
    render(){
        console.log(this.props)
        if(this.props.show){
        return(
            <View  style={{width:"100%",height:'100%',backgroundColor:'rgba(256,256,256,0)',position:"absolute",zIndex:2,flex:1,flexDirection:"column"}} >
                <View style={{margin:64,height:Dimensions.get('window').height-128,backgroundColor:"white",flexDirection:"column",borderRadius:16}}>
                    <View style={{borderBottomWidth:1,borderColor:"#606060",borderStyle:"solid"}}>
                        <TouchableOpacity style={{alignItems:"flex-end",marginRight:16}} onPress={()=>this.props.onPressClose()}>
                            <Text style={{fontSize:50}}>X</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1,padding:8}}>
                        <Text style={{fontSize:28,color:"#000000",textAlign:"center"}}>{this.props.data.name}</Text>
                        <View style={{flexDirection:"row",paddingLeft:128,paddingRight:128,maxWidth:600}}>
                            <Image source={this.props.data.picture} style={{flex:1,aspectRatio:1}}/>
                        </View>
                        <Text style={{fontSize:20,textAlign:"center"}}>{this.props.data.price} 원</Text>
                        <ScrollView style={{borderColor:"#000000",padding:16,borderTopWidth:1,borderStyle:"solid",flex:1}}>
                            <Text>{this.props.data.text}</Text>
                        </ScrollView>
                        <View style={{flex:3}}>
                            <View style={{flexDirection:"row"}}>
                                <Text style={{fontSize:30,flex:1}}>갯수</Text>
                                <TouchableOpacity style={{borderWidth:1,borderRadius:8,backgroundColor:"lightgreen",textAlign:"center",alignItems:"center",width:40,height:40}} onPress={()=>this.setState({amount:this.state.amount+1})}>
                                    <Text style={{fontSize:30}}>+</Text>
                                </TouchableOpacity>
                                <Text style={{fontSize:28,marginLeft:8,marginRight:8}}>{this.state.amount}</Text>
                                <TouchableOpacity style={{borderWidth:1,borderRadius:8,backgroundColor:"lightgreen",textAlign:"center",alignItems:"center",width:40,height:40}} onPress={()=>{this.state.amount<=1?null:this.setState({amount:this.state.amount-1})}}>
                                    <Text style={{fontSize:30}}>-</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection:"row"}}>
                                {this.props.data.set_available?

                                <TouchableOpacity 
                                style={{flex:1,flexDirection:"row"}}
                                    onPress={()=>{this.setState({isSet:!this.state.isSet});console.log(this.state.isSet)}}
                                >
                                    <View style={{borderWidth:2,borderStyle:"solid",borderRadius:8,borderColor:"#000000",alignItems:"center",justifyContent:"center",width:38,height:38}}>
                                        {this.state.isSet?
                                        <Text style={{fontSize:28,color:"black"}}>V</Text>:
                                        null}
                                        
                                    </View>
                                    <Text style={{fontSize:20,marginLeft:8,alignItems:"center",justifyContent:"center"}}>세트로 주문합니다.</Text>
                                </TouchableOpacity>
                                :null}

                            </View>
                        </View>
                        <TouchableOpacity style={{padding:8,alignItems:"center",borderWidth:2,borderRadius:8,borderStyle:'solid',borderColor:"black",backgroundColor:"white"}} onPress={()=>{this.addMenu()}}>
                                <Text style={{fontSize:30}}>추가</Text>
                            </TouchableOpacity>
                    </View>
                </View>

            </View>
        )}
        else
        return null
    }
}
export {MenuSelectedModal}