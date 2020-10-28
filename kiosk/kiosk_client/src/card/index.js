
import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
    Image
} from 'react-native';



class MenuCard extends Component{
    render(){
        console.log("MenuCard]props:",this.props)
        return(
            <TouchableOpacity style={{margin:8,elevation:2,backgroundColor:"white",minHeight:120,borderWidth:2,borderColor:"white",alignItems:"center"}} onPress={()=>this.props.onPress()}>
                <View style={{flex:1}}>
                    <Image style={{flex:1,aspectRatio:1}} source = {{uri:this.props.image}} defaultSource={require('../../static/img/burger.jpg')}/>
                </View>
                <Text style={{fontFamily:"KoPubWorld Dotum Medium"}}>{this.props.name}</Text>
            </TouchableOpacity>
        )
    }
}
export {MenuCard}