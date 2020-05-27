import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { goMenuScreen } from '../action';
import {connect} from 'react-redux'
import {MenuCard} from '../card';
import { Nav } from '../nav';


const tempdata = [
    {
        name:"test",
        items : [
            {
                name:"이름",
                image:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/NYC-Diner-Bacon-Cheeseburger.jpg/330px-NYC-Diner-Bacon-Cheeseburger.jpg",
                price:3000
            },
            {
                name:"이름",
                image:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/NYC-Diner-Bacon-Cheeseburger.jpg/330px-NYC-Diner-Bacon-Cheeseburger.jpg",
                price:3000
            }
        ]
    }
]

let InitialScreenMDTP = (dispatch)=>{
    return{
        goNext:()=>dispatch(goMenuScreen())
    }
}
class InitialScreen extends Component{
    render(){
        return(
            <View style={{flex:1}}>
                <View style={{flex:1}}>
                    <Text>광고영역</Text>
                </View>
                <View style={{flex:3,position:"relative"}}>
                    <RNCamera
                    ref={ref => {
                        this.camera = ref;
                      }}
                      style={{height:"100%",width:"100%"}}
                      type={RNCamera.Constants.Type.back}
                    />
                    <View style={{position:"absolute",bottom:0,width:"100%",padding:8}}>
                        <TouchableOpacity style={{width:"100%",minHeight:64,borderRadius:8,bottom:0,zIndex:1,backgroundColor:"white",alignItems:"center",justifyContent:"center"}}
                            onPress={()=>this.props.goNext()}
                        >
                            <Text style={{fontSize:58}}>주문 시작</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        )
    }
}
InitialScreen = connect(undefined,InitialScreenMDTP)(InitialScreen)


class MenuScreen extends Component{
    render(){
        return(
            <View style={{flex:1,flexDirection:"column"}}>
                <View style={{flex:1,backgroundColor:"red"}}>
                </View>                    
                <View style={{flex:3,flexDirection:"column"}}>
                    <View style={{flexDirection:"row"}}>
                        <Nav data={tempdata}/>
                    </View>                    
                    <FlatList 
                        style={{flex:7,backgroundColor:"blue"}}
                        numColumns={4}
                        data = {tempdata}
                        renderItem={({value,key,separators})=>(
                        <MenuCard data={tempdata}/>
                    )}/>
                    <View style={{flex:1}}></View>
                </View>
                
            </View>
        )
    }
}

export {InitialScreen,MenuScreen}