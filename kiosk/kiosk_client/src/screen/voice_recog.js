import React, {Component} from 'react';
import {View, TouchableOpacity,Text,Alert, PermissionsAndroid, Button,Image,FlatList,ScrollView} from 'react-native';
import {Nav,Order} from '../nav'
import {connect} from 'react-redux';
import {goInitScreen} from '../action';
import {MenuSelectedModal} from '../modal'
import {MenuCard} from '../card'
import AudioRecord from 'react-native-audio-record';
import Icon from 'react-native-vector-icons/FontAwesome5'
import style from '../style'
const RNFS = require('react-native-fs');
const Buffer = require('buffer/').Buffer;
const recordoption = {
  sampleRate:16000,
  channels:1,
  bitPerSample:16,
  audioSource: 6,
  wavFile:'record.wav'
}
const axios = require('axios');

const requestExternalStoragePermission = async()=>{
  try{
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title:"음성인식 서비스용 외부 스토리지 작성 퍼미션",
        message:"음성인식용 외부 스토리지에 대한 퍼미션입니다.\n해당 퍼미션이 주어지지 않으면 음성인식 서비스를 사용할 수 없습니다.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("외부 스토리지 퍼미션 획득");
    } else {
      console.log("외부 스토리지 퍼미션 거부됨.");
    }
  }catch(err){
    console.warn(err);
  }
}

const requestMicrophonePermission = async()=>{
  try{
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title:"음성인식 서비스용 외부 스토리지 작성 퍼미션",
        message:"음성인식용 마이크 이용에 대한 퍼미션입니다.\n해당 퍼미션이 주어지지 않으면 음성인식 서비스를 사용할 수 없습니다.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("음성녹음 퍼미션 획득");
    } else {
      console.log("음성녹음 퍼미션 거부됨.");
    }
  }catch(err){
    console.warn(err);
  }
}
let VoiceRecogScreenMSTP = (state)=>{
  return{
      order_id:state.orderdata.order_id
  }
}
let VoiceRecogScreenMDTP = dispatch => {
  return {
    goInitScreen: () => {
      dispatch(goInitScreen());
    },
  };
};
class VoiceRecogScreen extends Component {
  constructor(props) {
    super(props);
    requestMicrophonePermission().then(()=>{
      requestExternalStoragePermission().then(()=>{
        console.log("EXternal Storage Permission get")
        AudioRecord.init(recordoption);
      }).catch((err)=>{console.log(err)})
     
    })
    
    this.state={
      recordingState:"stop",
      selectedCategory:[],
      orderList:[],
      showMenuSelectModal:false,
      modalItem:null,
      category_list:[]
    }
    
  }
  startRecord(){
    AudioRecord.start();
    this.setState({recordingState:"start"})
  }
  endRecord(){
    AudioRecord.stop().then((audiofile)=>{
      this.sendAudio(audiofile)
      console.log("audiofile:",audiofile)
      this.setState({recordingState:"stop"})
    })
  }
  sendAudio(audiofile){
    RNFS.uploadFiles({
      toUrl:"https://kakaoi-newtone-openapi.kakao.com/v1/recognize",
      method:"POST",
      files:[{
        name:'record',
        filename:"record.wav",
        filepath:audiofile,
        filetype:'audio/wav'
      },],
      headers:{"Transfer-Encoding":"chunked",
      "Content-Type": "application/octet-stream",
      "Authorization": "KakaoAK 2991cecf36f495fe9d2cda7af10b016f",
      },

    }).promise.then((response)=>{
      this.audioResponseParser(response.body)
      

    }).catch((error)=>{
      console.log(error);
    })
    /*
    axios({
      baseURL:"https://kakaoi-newtone-openapi.kakao.com",
      url:"/v1/recognize",
      method:"POST",
      headers:{"Transfer-Encoding":"chunked",
      "Content-Type": "application/octet-stream",
      "Authorization": "KakaoAK 2991cecf36f495fe9d2cda7af10b016f",
      },
      data:audiofile

    }).then((response)=>{
      console.log(response.data);
      this.setState({audio:"",timestamp:0})
    }).catch((error)=>{
      console.log(error.response)
      this.setState({audio:"",timestamp:0})

    })
    */
  }
  audioResponseParser(response){

    let text_arr = response.split(/\r?\n/)
    console.log(text_arr);
    for(let idx=0;idx<text_arr.length;idx++){

      if(!text_arr[idx].startsWith('{')){
        console.log(text_arr[idx])
        text_arr.splice(idx,1)
      }
    }
    console.log(text_arr);
  }
  componentDidMount(){
    axios({url:"http://clarin.moe:8993/menu/category",method:"GET"})
    .then((response)=>{
        this.setState({category_list:response.data})
        this.TimedOut()
    }).catch((err)=>{
        console.log(err)
    })
    

  }
  TimedOut(){
      setTimeout(()=>{this.TimedOut()},1000);
      axios({url:"http://clarin.moe:8993/order/"+this.props.order_id+"/item"}).then((response)=>{
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
          this.setState({selectedCategory:response.data});
      }).catch((error)=>{
          console.log(error)
      })
  }


  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <Image
          source={require('../../static/img/ad.png')}
          style={{
            width: '100%',
            maxHeight: 80,
            resizeMode: 'contain',
            flexWrap: 'wrap',
          }}
        />
        <MenuSelectedModal
          show={this.state.showMenuSelectModal}
          onPressClose={() => {
            this.closeModal();
          }}
          data={this.state.modalItem}
          addMenu={data => {
            this.addMenu(data);
          }}
        />
        <View style={{flex: 3, flexDirection: 'column'}}>
          <View style={{flexDirection: 'row'}}>
            <Nav
              data={this.state.category_list}
              getItemList={id => this.getItemList(id)}
            />
          </View>
          <FlatList
            style={[{flex: 1}, style.background]}
            numColumns={3}
            data={this.state.selectedCategory}
            renderItem={({item, key, separators}) => (
              <MenuCard
                image={item.image}
                name={item.name}
                onPress={() => this.onPressMenuCard(item)}
              />
            )}
          />
        </View>
        <View
          style={[
            {flex: 2, borderStyle: 'solid', borderTopWidth: 1, padding: 8},
            style.background_cart,
          ]}>
          <Order data={this.state.orderList} />
          <View style={{flexDirection:"row"}}>
            <TouchableOpacity
            style={[{padding: 8, alignItems: 'center',flex:1}, style.button]}
            onPress={() => {
                clearInterval(this.state.intervalcall);
              this.props.goNext(this.state.orderList);
            }}>
              <Text style={[{fontSize: 30}, style.normalFont]}>결제</Text>
            </TouchableOpacity>              
            <TouchableOpacity style={[{color:"blue",marginLeft:8,height:66,aspectRatio:1,alignItems:"center",justifyContent:"center"},style.button]}
              onPress={this.state.recordingState==="stop"?()=>this.startRecord():()=>this.endRecord()}
            >
              <Icon name={this.state.recordingState==="stop"?"microphone":"microphone-slash"} size={30} />
            </TouchableOpacity>

          </View>
          
        </View>
      </View>
    );
  }
}
VoiceRecogScreen = connect(
  VoiceRecogScreenMSTP,
  VoiceRecogScreenMDTP,
)(VoiceRecogScreen);
/*
<View style={{flex: 1,flexDirection:"column"}} >
              <MenuSelectedModal 
                show = {this.state.showMenuSelectModal} 
                onPressClose={()=>{this.closeModal()}}
                data={this.state.modalItem}
                addMenu={(data)=>{this.addMenu(data)}}
              />
              <View style={{flex:1}}>
                <Image source = {require('../../static/img/ad.png')} style={{width:'100%'}}/>
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
                  <View style={{flex:1,borderStyle:"solid",borderTopWidth:1,borderTopColor:"gray",backgroundColor:"white",padding:8}}>
                    <Text>추천 명령어</Text>
                    <ScrollView style={{borderBottomWidth:1,borderStyle:"solid",borderBottomColor:"black",maxHeight:32}} horizontal={true}>
                      <View style={{margin:4,alignItems:"center",backgroundColor:"blue",justifyContent:"center",backgroundColor:"white",elevation:1,borderRadius:4}}>
                        <Text style={{fontSize:20}}>햄버거 하나 주세요</Text>
                      </View>
                      <View style={{margin:4,alignItems:"center",backgroundColor:"blue",justifyContent:"center",backgroundColor:"white",elevation:1,borderRadius:4}}>
                        <Text style={{fontSize:20}}>게살버거 하나 주세요</Text>
                      </View>                      
                      <View style={{margin:4,alignItems:"center",backgroundColor:"blue",justifyContent:"center",backgroundColor:"white",elevation:1,borderRadius:4}}>
                        <Text style={{fontSize:20}}>핫치킨버거 하나 주세요</Text>
                      </View>
                      
                      <Text style={{fontSize:20}}>햄버거 하나 주세요</Text>
                      <Text style={{fontSize:20}}>햄버거 하나 주세요</Text>

                    </ScrollView>
                    <Order data = {this.state.orderList}/>    
                    
                    <TouchableOpacity style={{padding:8,alignItems:"center",elevation:4,borderStyle:'solid',borderColor:"black",backgroundColor:"white"}} onPress={()=>{this.props.goNext(this.state.orderList)}}>
                        <Text style={{fontSize:30}}>결제</Text>
                    </TouchableOpacity> 
                  </View>
                  
                  <TouchableOpacity style={{backgroundColor:'skyblue',position:"absolute",right:8,bottom:72,padding:8,width:56,height:56,alignItems:"center",justifyContent:"center",borderRadius:28,elevation:5}} 
                  onPress={()=>{this.state.recordingState==='stop'?this.startRecord():this.endRecord()}}>
                    <Icon  name={this.state.recordingState==='stop'?"microphone-alt":"microphone-alt-slash"} size={40} color={'white'}/>
                  </TouchableOpacity>
              </View>
      </View>

*/

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
              <Image source = {require('../../static/img/ad.png')} style={{width:'100%',height:"100%"}}/>
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

export {VoiceRecogScreen};
