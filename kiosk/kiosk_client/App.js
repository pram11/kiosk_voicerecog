/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import InitialScreen from './src/init_screen';
class App extends Component{
  constructor(props){
    super(props)
    this.state={
      screen:"init",
      
    }
  }
  render(){
    return(
      <View style={{flex:1}}>
        <InitialScreen></InitialScreen>
      </View>
    )
    
  }
}



export default App;
