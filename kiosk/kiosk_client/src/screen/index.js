import React, {Component, createRef} from 'react';
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
import {VoiceRecogScreen} from './voice_recog';
import {RNCamera} from 'react-native-camera';
import {
  goMenuScreen,
  paymentScreen,
  orderResultScreen,
  goInitScreen,
  goVoiceRecog,
} from '../action';
import {connect} from 'react-redux';
import {MenuCard} from '../card';
import {Nav, Order} from '../nav';
import {MenuSelectedModal} from '../modal';
import style from '../style';

const axios = require('axios');

let InitialScreenMDTP = dispatch => {
  return {
    goNext: id => dispatch(goMenuScreen(id)),
    goVoiceRecog: id => dispatch(goVoiceRecog(id)),
  };
};
class InitialScreen extends Component {
  constructor(props) {
    super(props);
    this.camera = createRef();
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
  startOrder() {
    axios({url: 'http://clarin.moe:8993/order/', method: 'POST'})
      .then(response => {
        console.log(response.data.id);
        this.props.goNext(response.data.id);
      })
      .catch((error) => {
        window.alert("네트워크 에러가 발생했습니다. 네트워크를 다시 확인해주세요.");
      });
  }
  startVoiceRecogOrder() {
    axios({url: 'http://clarin.moe:8993/order/', method: 'POST'})
      .then(response => {
        console.log(response.data.id);
        this.props.goVoiceRecog(response.data.id);
      })
      .catch((error) => {
        window.alert("네트워크 에러가 발생했습니다. 네트워크를 다시 확인해주세요.");
      });
  }
  render() {
    return (
      <View style={[{flex: 1}, style.background]}>
        <Image
          source={require('../../static/img/ad.png')}
          style={{width: '100%', maxHeight: 80, resizeMode: 'contain'}}
          resizeMethod="resize"
        />
        <View style={[{flex: 1, padding: 16}, style.background]}>
          <View
            style={[
              {flex: 1, position: 'relative', paddingHorizontal: 16},
              style.background_cart,
            ]}>
            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
                justifyContent: 'center',
                padding: 8,
              }}>
              <Image
                source={require('../../static/img/start.png')}
                style={{resizeMode: 'contain', width: '100%', height: '100%'}}
                resizeMethod="resize"
              />
            </View>
            <View style={[{bottom: 8, padding: 8}]}>
              <TouchableOpacity
                style={[
                  {
                    height: 52,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 16,
                  },
                  style.button,
                ]}
                onPress={() => this.startOrder()}>
                <Text style={[{fontSize: 28}, style.normalFont]}>
                  주문 시작
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  {height: 52, alignItems: 'center', justifyContent: 'center'},
                  style.button,
                ]}
                onPress={() => this.startVoiceRecogOrder()}>
                <Text style={[{fontSize: 28}, style.normalFont]}>
                  음성인식 주문 시작
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
InitialScreen = connect(
  undefined,
  InitialScreenMDTP,
)(InitialScreen);

let MenuScreenMDTP = dispatch => {
  return {
    goNext: order => dispatch(paymentScreen(order)),
  };
};
let MenuScreenMSTP = state => {
  console.log(state);
  return {
    order_id: state.orderdata.order_id,
  };
};

class MenuScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: [],
      orderList: [],
      showMenuSelectModal: false,
      modalItem: null,
      category_list: [],
      intervalcall:null
    };
  }
  componentDidMount() {
    axios({url: 'http://clarin.moe:8993/menu/category', method: 'GET'})
      .then(response => {
        console.log(response.data);
        this.setState({category_list: response.data});
        this.getItemList(response.data[0].id)
        this.TimedOut();
      })
      .catch(err => {
        console.log(err);
      });
  }
  TimedOut() {
    let interval = setInterval(() => {
        axios({
      url: 'http://clarin.moe:8993/order/' + this.props.order_id + '/item',
    })
      .then(response => {
        console.log(response.data);
        this.setState({orderList: response.data,intervalcall:interval});
      })
      .catch(err => {
        console.log(err);
      });
    }, 1000);
    
  }

  onPressMenuCard(data) {
    this.setState({modalItem: data, showMenuSelectModal: true});
    console.log(this.state);
  }
  addMenu(data) {
    console.log('addMenu:', data);
    axios({
      method: 'post',
      url: 'http://clarin.moe:8993/order/' + this.props.order_id + '/item/',
      data: {
        order: this.props.order_id,
        item: data.id,
        is_set: data.is_set,
        amount: data.amount,
      },
    });
    this.closeModal();
  }
  closeModal() {
    this.setState({showMenuSelectModal: false});
  }
  onPressPay() {}
  getItemList(id) {
    axios({url: 'http://clarin.moe:8993/menu/category/' + id + '/menu'})
      .then(response => {
        console.log(response.data);
        this.setState({selectedCategory: response.data});
        console.log(this.state);
      })
      .catch(error => {
        console.log(error);
      });
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
          <TouchableOpacity
            style={[{padding: 8, alignItems: 'center'}, style.button]}
            onPress={() => {
                clearInterval(this.state.intervalcall);
              this.props.goNext(this.state.orderList);
            }}>
            <Text style={[{fontSize: 30}, style.normalFont]}>결제</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
MenuScreen = connect(
  MenuScreenMSTP,
  MenuScreenMDTP,
)(MenuScreen);

let PaymentScreenMDTP = dispatch => {
  return {
    goNext: num => {
      dispatch(orderResultScreen(num));
    },
  };
};
let PaymentScreenMSTP = state => {
  return {
    orderdata: state.orderdata,
  };
};
class PaymentScreen extends Component {
  render() {
    console.log(this.props.orderdata);
    return (
      <View style={[{flex: 1}, style.background]}>
        <View style={{flex: 3, flexDirection: 'row'}}>
          <View style={{flex: 1, backgroundColor: '#262645'}}>
            <FlatList
              style={[
                {
                  flex: 1,
                  padding: 16,
                  backgroundColor: '#262545',
                },
              ]}
              data={this.props.orderdata.order}
              renderItem={({item, index, separators}) => (
                <View
                  style={[
                    {
                      marginBottom: 16,
                      borderRadius: 16,
                      elevation: 4,
                      padding: 8,
                      backgroundColor: '#333249',
                    },
                  ]}>
                  <Text
                    style={[
                      {fontSize: 24},
                      style.yellow_color,
                      style.normalFont,
                    ]}>
                    {item.name}
                  </Text>
                  {item.is_set ? (
                    <Text style={{color: 'white'}}>세트</Text>
                  ) : null}
                  <Text style={{fontSize: 14, color: 'white'}}>
                    가격:
                    {item.is_set ? item.set_price + item.price : item.price}x
                    {item.amount}=
                    {(item.is_set ? item.set_price : item.price) * item.amount} 원
                  </Text>
                </View>
              )}
            />
            <View style={{height:80,backgroundColor: '#333249',paddingHorizontal:16,paddingTop:8}}>
            <Text style={[{fontSize: 16,color:"white"},style.yellow_underline,style.normalFont]}>
              총 주문금액:{this.props.orderdata.price_total} 원
            </Text>
          </View>
          </View>
          <View style={{flex: 1}}>
            <Text style={{color: 'white'}}>이미지 삽입 예정</Text>
          </View>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 16,
            borderStyle: 'solid',
            borderColor: 'black',
            marginTop: 8,
          }}>
          <TouchableOpacity
            style={[style.button,{margin:8,alignItems:"center",justifyContent:"center"}]}
            onPress={() => {
              this.props.goNext(this.props.orderdata.order_id);
            }}>
            <Text style={[{fontSize: 28},style.normalFont]}>결제 진행</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
PaymentScreen = connect(
  PaymentScreenMSTP,
  PaymentScreenMDTP,
)(PaymentScreen);

let ResultScreenMSTP = state => {
  return {
    order_number: state.orderdata.order_number,
  };
};
let ResultScreenMDTP = dispatch => {
  return {
    Initalize: () => dispatch(goInitScreen()),
  };
};
class ResultScreen extends Component {
    constructor(props){
        super(props)
        this.state={
            counter:10
        }
    }
  componentDidMount() {
      this.setState({counter:10})
    
    let interval = setInterval(() => {
        if (this.state.counter<=1){
            clearInterval(interval)
            this.props.Initalize();
        }else{
            this.setState({counter:this.state.counter-1})
        }
    }, 1000);
    
  }

  render() {
    return (
        <View style={[{flex:1,padding:16},style.background]}>
            <View style={[style.background_cart,{flex:1,padding:16}]}>
          <View style={{flex:1}}>
            <View style={[{height:100,borderTopWidth:2,borderBottomWidth:2,marginTop:100,alignItems:"center",justifyContent:"center"},style.yellow_border]}>
                <Text style={[{fontSize: 30,color:"white"},style.normalFont]}>주문이 완료되었습니다.</Text>
                <Text style={[{fontSize: 28,color:"white"},style.normalFont]}>주문번호:{this.props.order_number}번</Text>
            </View>
            <View style={{marginTop:100,alignItems:"center",justifyContent:"center"}}>
                <Text style={[{fontSize:28,color:'white'},style.normalFont]}>{this.state.counter}초 후 자동으로</Text>
                <Text style={[{fontSize:28,color:'white'},style.normalFont]}>처음 화면으로 이동됩니다.</Text>
                <Text style={[{fontSize:28,color:'white'},style.normalFont]}>영수증을 챙겨주세요.</Text>
            </View>
          </View>
          

        <TouchableOpacity style={[style.button,{alignItems:"center",justifyContent:"center",marginBottom:32}]} onPress={()=>{this.props.Initalize()}}>
            <Text style={[style.normalFont,{fontSize:28}]}>처음으로</Text>
        </TouchableOpacity>
      </View>
        </View>
      
    );
  }
}
ResultScreen = connect(
  ResultScreenMSTP,
  ResultScreenMDTP,
)(ResultScreen);

export {
  InitialScreen,
  MenuScreen,
  PaymentScreen,
  ResultScreen,
  VoiceRecogScreen,
};
