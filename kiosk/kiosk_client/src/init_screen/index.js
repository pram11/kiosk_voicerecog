import React, { Component } from 'react';
import {View,Text} from 'react-native'
import Header from '../header';
import Footer from '../footer';

export default class InitialScreen extends Component{
    render(){
      return(
        <View style={{flexDirection:"column",flex:1}}>
            <Header/>
            <View style={{flex:4,backgroundColor:"blue"}}>
                <Text>초기화면</Text>
            </View>
        </View>
      )
    }
  }

class Camera extends Component{
    render(){
        return(
            <View></View>
        )
    }
}