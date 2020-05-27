
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
        return(
            <TouchableOpacity style={{margin:8,padding:8,borderRadius:4,borderWidth:1,borderStyle:"solid",borderColor:"black"}}>
                <Image source = {require('../../static/img/burger.jpg')}/>
                <Text>메뉴명</Text>
            </TouchableOpacity>
        )
    }
}
export {MenuCard}