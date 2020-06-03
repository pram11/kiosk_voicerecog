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
import { Nav,Order } from '../nav';
import { MenuSelectedModal } from '../modal';

const tempData = [{
    category_name:"테스트1",
    id:1,
    menu:[
      {
        name:"테스트 메뉴",
        picture:require('../../static/img/burger.jpg'),
        price:3000,
        text:"테스트중입니다. 햄버거 맛있다.",
        set_available:true,
        set_price:1000
      },{
        name:"테스트 메뉴",
        picture:require('../../static/img/burger.jpg'),
        price:3000,
        text:"테스트중입니다. 햄버거 맛있다.",
        set_available:true,
        set_price:1000
        
      },{
        name:"테스트 메뉴",
        picture:{uri:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/NYC-Diner-Bacon-Cheeseburger.jpg/330px-NYC-Diner-Bacon-Cheeseburger.jpg"},
        price:3000,
        text:"테스트중입니다. 햄버거 맛있다.",
        set_available:false,
        set_price:0
        
    }
    ]

}]
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
                <View style={{flex:5,position:"relative"}}>
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
    constructor(props){
        super(props)
        this.state={
            selectedCategory:[],
            orderList:[],
            showMenuSelectModal:false,
            modalItem:null
        }
    }
    componentDidMount(){
    }
    onPressMenuCard(data){
        this.setState({modalItem:data,
            showMenuSelectModal:true})
        console.log(this.state)
    }
    addMenu(data){
        let prev_orderList = this.state.orderList;
        prev_orderList.push(data);
        this.setState({orderList:prev_orderList});
        console.log(this.state)
        this.closeModal();
    }
    closeModal(){
        this.setState({showMenuSelectModal:false})
    }
    render(){
        return(
            <View style={{flex:1,flexDirection:"column"}}>
                <MenuSelectedModal 
                show = {this.state.showMenuSelectModal} 
                onPressClose={()=>{this.closeModal()}}
                data={this.state.modalItem}
                addMenu={(data)=>{this.addMenu(data)}}
                />
                <View style={{flex:1,backgroundColor:"red"}}>
                    <Text>광고영역</Text>
                </View>                    
                <View style={{flex:3,flexDirection:"column"}}>
                    <View style={{flexDirection:"row"}}>
                        <Nav data={tempData} getItemList={(data)=>{this.setState({selectedCategory:data});console.log(this.state)}}/>
                    </View>                    
                    <FlatList 
                        style={{flex:1}}
                        numColumns={3}
                        data = {this.state.selectedCategory}
                        renderItem={({item,key,separators})=>(
                        <MenuCard picture = {item.picture} name = {item.name}  onPress={()=>this.onPressMenuCard(item)}/>

                    )}/>
                </View>
                <View style={{flex:2,borderStyle:"solid",borderTopWidth:1,borderTopColor:"gray",backgroundColor:"lightgray"}}>
                    <Order data = {this.state.orderList}/>    
                    <TouchableOpacity style={{padding:8,alignItems:"center",borderWidth:2,borderRadius:8,borderStyle:'solid',borderColor:"black"}} onPress={()=>{}}>
                        <Text style={{fontSize:30}}>결제</Text>
                    </TouchableOpacity> 
                </View>

                
            </View>
        )
    }
}
export {InitialScreen,MenuScreen}