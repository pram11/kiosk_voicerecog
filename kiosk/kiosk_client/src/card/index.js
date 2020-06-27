
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
            <TouchableOpacity style={{margin:8,padding:8,borderRadius:4,borderWidth:1,borderStyle:"solid",borderColor:"black"}} onPress={()=>this.props.onPress()}>
                <Image style={{flex:1,aspectRatio:1}} source = {{uri:this.props.image}}/>
                <Text>{this.props.name}</Text>
            </TouchableOpacity>
        )
    }
}
export {MenuCard}