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
import {InitialScreen, MenuScreen} from './src/screen'
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
      /**
       * 구현 후 주석 해제
       * case "payment":
       * return(
       * )
       * case "result":
       * return(
       * )
       */

      default:
        return null
    }
    
  }
};
Screen = connect(ScreenMSTP,undefined)(Screen)
class App extends Component{
  render(){
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
