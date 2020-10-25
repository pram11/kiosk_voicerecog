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
import { RNCamera } from 'react-native-camera';
import {createStore} from 'redux'
import {connect,Provider} from 'react-redux'
import {InitialScreen, MenuScreen, PaymentScreen, ResultScreen, VoiceRecogScreen} from './src/screen'
import { Reducers } from './src/reducer';





const store = createStore(Reducers);

let ScreenMSTP = (state)=>{
  return{
    screen:state.display.screen
  }
}
class Screen extends Component{
  render(){
    switch(this.props.screen){
      case "init":
        return (
          
          <InitialScreen/>
        );
      case "menu":
        return(
          <MenuScreen/>
        )
        case "payment":
        return(
          <PaymentScreen/>
        )
       
      
      case "result":
      return(
        <ResultScreen/>
        )
      case "voicerecog":
        return(
          <VoiceRecogScreen/>
        )
      default:
        return null
    }
    
  }
};
Screen = connect(ScreenMSTP,undefined)(Screen)
class App extends Component{
  render(){
    console.log("APP")
    return(
      <Provider store = {store}>
        <Screen/>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  
});

export default App;
