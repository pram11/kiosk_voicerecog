import React, { Component, createRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {VoiceRecogScreen } from './voice_recog'
import { RNCamera } from 'react-native-camera';
import { goMenuScreen, paymentScreen,orderResultScreen, goInitScreen, goVoiceRecog } from '../action';
import {connect} from 'react-redux'
import {MenuCard} from '../card';
import { Nav,Order } from '../nav';
import { MenuSelectedModal } from '../modal';

const axios = require('axios')

let InitialScreenMDTP = (dispatch)=>{
    return{
        goNext:(id)=>dispatch(goMenuScreen(id)),
        goVoiceRecog:(id)=>dispatch(goVoiceRecog(id))
    }
}
class InitialScreen extends Component{
    constructor(props){
        super(props)
        this.camera = createRef()
    }
    /*
    onCameraReady=()=>{
        console.log(this.camera)
       this.TimedOut()
    }
    TimedOut(){
        setTimeout(()=>{this.TimedOut()},3000);
        if (this.camera.current){
            console.log(this.camera.current)
            this.camera.current.takePictureAsync({doNotSave:true}).then((data)=>{console.log(data)}).catch((err)=>{console.log(err)})
        }
        console.log("testing")
    }
    */
    startOrder(){
        axios({url:"http://clarin.moe:8993/order/",method:"POST"}).then((response)=>{
            console.log(response.data.id)
            this.props.goNext(response.data.id)
        })
    }
    startVoiceRecogOrder(){
        axios({url:"http://clarin.moe:8993/order/",method:"POST"}).then((response)=>{
            console.log(response.data.id)
            this.props.goVoiceRecog(response.data.id)
        })
    }
    render(){
        return(
            <View style={{flex:1}}>
                <View style={{flex:1}}>
                    <Image source = {require('../../static/img/ad.jpg')} style={{width:'100%',height:"100%"}}/>
                </View>
                <View style={{flex:5,position:"relative",backgroundColor:"black"}}>
                   
                    <RNCamera
                    ref={this.camera}
                    //onCameraReady={this.onCameraReady()}
                    
                      style={{height:"100%",width:"100%"}}
                      type={RNCamera.Constants.Type.front}
                      
                    />
                    <View style={{position:"absolute",bottom:0,width:"100%",padding:8,backgroundColor:"white"}}>
                        <TouchableOpacity style={{minHeight:64,bottom:0,zIndex:1,backgroundColor:"white",alignItems:"center",justifyContent:"center",marginBottom:8,elevation:4}}
                            onPress={()=>this.startOrder()}
                        >
                            <Text style={{fontSize:58}}>주문 시작</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{minHeight:64,bottom:0,zIndex:1,backgroundColor:"white",alignItems:"center",justifyContent:"center",elevation:4}}
                            onPress={()=>this.startVoiceRecogOrder()}
                        >
                            <Text style={{fontSize:38}}>음성인식 주문 시작</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        )
    }
}
InitialScreen = connect(undefined,InitialScreenMDTP)(InitialScreen)

let MenuScreenMDTP = (dispatch)=>{
    return{
        goNext:(order)=>dispatch(paymentScreen(order))
    }
}
let MenuScreenMSTP = (state)=>{
    console.log(state)
    return{
        order_id:state.orderdata.order_id
    }
}

class MenuScreen extends Component{
    constructor(props){
        super(props)
        this.state={
            selectedCategory:[],
            orderList:[],
            showMenuSelectModal:false,
            modalItem:null,
            category_list:[]
        }
    }
    componentDidMount(){
        axios({url:"http://clarin.moe:8993/menu/category",method:"GET"})
        .then((response)=>{
            console.log(response.data)
            this.setState({category_list:response.data})
            this.TimedOut()
        }).catch((err)=>{
            console.log(err)
        })
        

    }
    TimedOut(){
        setTimeout(()=>{this.TimedOut()},1000);
        axios({url:"http://clarin.moe:8993/order/"+this.props.order_id+"/item"}).then((response)=>{
            console.log(response.data);
            this.setState({orderList:response.data})

        }).catch((err)=>{console.log(err)})
     
    }

    onPressMenuCard(data){
        this.setState({modalItem:data,
            showMenuSelectModal:true})
        console.log(this.state)
    }
    addMenu(data){
        console.log("addMenu:",data)
        axios({method:"post",url:"http://clarin.moe:8993/order/"+this.props.order_id+"/item/",data:{
            order:this.props.order_id,
            item:data.id,
            is_set:data.is_set,
            amount:data.amount
        }})
        this.closeModal();
    }
    closeModal(){
        this.setState({showMenuSelectModal:false})
    }
    onPressPay(){

    }
    getItemList(id){
        axios({url:"http://clarin.moe:8993/menu/category/"+id+'/menu'})
        .then((response)=>{
            console.log(response.data);
            this.setState({selectedCategory:response.data});
            console.log(this.state)
        }).catch((error)=>{
            console.log(error)
        })
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
                <View style={{flex:1}}>
                <Image source = {require('../../static/img/ad.jpg')} style={{width:'100%',height:"100%"}}/>
                </View>                    
                <View style={{flex:3,flexDirection:"column"}}>
                    <View style={{flexDirection:"row"}}>
                        <Nav data={this.state.category_list} getItemList={(id)=>this.getItemList(id)}/>
                    </View>                    
                    <FlatList 
                        style={{flex:1}}
                        numColumns={3}
                        data = {this.state.selectedCategory}
                        renderItem={({item,key,separators})=>(
                        <MenuCard image = {item.image} name = {item.name}  onPress={()=>this.onPressMenuCard(item)}/>

                    )}/>
                </View>
                <View style={{flex:2,borderStyle:"solid",borderTopWidth:1,borderTopColor:"gray",backgroundColor:"white",padding:8}}>
                    <Order data = {this.state.orderList}/>    
                    <TouchableOpacity style={{padding:8,alignItems:"center",elevation:4,borderStyle:'solid',borderColor:"black",backgroundColor:"white"}} onPress={()=>{this.props.goNext(this.state.orderList)}}>
                        <Text style={{fontSize:30}}>결제</Text>
                    </TouchableOpacity> 
                </View>

                
            </View>
        )
    }
}
MenuScreen = connect(MenuScreenMSTP,MenuScreenMDTP)(MenuScreen)


let PaymentScreenMDTP = (dispatch)=>{
    return{
        goNext:(num)=>{dispatch(orderResultScreen(num))}
    }
}
let PaymentScreenMSTP = (state)=>{
    return{
        orderdata: state.orderdata
    }
}
class PaymentScreen extends Component{
    render(){
        console.log(this.props.orderdata)
        return(
            <View style={{flex:1,padding:8}}>
                <View style={{flex:3,flexDirection:"row"}}>
                    <FlatList style={{flex:3,borderWidth:1,borderRadius:16,borderStyle:"solid",borderColor:"black"}} data={this.props.orderdata.order} renderItem={({item,index,separators})=>(
                        <View style={{flex:1,borderWidth:1,borderRadius:8,borderStyle:"solid",borderColor:"black",margin:8}}>
                            <Text style={{fontSize:24}}>{item.name}</Text>
                            {item.is_set?<Text>세트</Text>:null}
                    <Text style={{fontSize:16}}>가격:{item.is_set?item.set_price+item.price:item.price}x{item.amount}={(item.is_set?item.set_price:item.price)*item.amount}</Text>
                        </View>
                    )}/>
                    <View style={{flex:1}}>
                    </View>
                </View>
                <View style={{flex:1,borderWidth:1,borderRadius:16,borderStyle:"solid",borderColor:"black",marginTop:8}}>
                    <View style={{flex:1,margin:8}}>
                    <Text style={{fontSize:32}}>결제금액:{this.props.orderdata.price_total} 원</Text>
                    </View>
                <TouchableOpacity style={{margin:8,padding:8,alignItems:"center",borderWidth:2,borderRadius:8,borderStyle:'solid',borderColor:"black",backgroundColor:"white"}} onPress={()=>{this.props.goNext(this.props.orderdata.order_id)}}>
                        <Text style={{fontSize:30}}>결제 진행</Text>
                    </TouchableOpacity> 
                </View>
            
                
            </View>
        )
    }
}
PaymentScreen = connect(PaymentScreenMSTP,PaymentScreenMDTP)(PaymentScreen)

let ResultScreenMSTP = (state)=>{
    return{
        order_number:state.orderdata.order_number
    }
}
let ResultScreenMDTP = (dispatch)=>{
    return{
        Initalize:()=>dispatch(goInitScreen())
    }
}
class ResultScreen extends Component{
    componentDidMount(){
         setTimeout(()=>{
            this.props.Initalize()
        },3000);
    }
   
    render(){
        return(
            <View>
                <Text style={{fontSize:30}}>주문이 완료되었습니다.
                </Text>
                <Text style={{fontSize:36}}>
                    주문번호:{this.props.order_number}번
                </Text>
            </View>
        )
    }
}
ResultScreen = connect(ResultScreenMSTP,ResultScreenMDTP)(ResultScreen)

export {InitialScreen,MenuScreen,PaymentScreen,ResultScreen,VoiceRecogScreen}