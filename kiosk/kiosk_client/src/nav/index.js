
import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
    Image,
    FlatList
} from 'react-native';



class Nav extends Component{
    render(){
        console.log(this.props.data)
        return(
            <FlatList
            style={{maxHeight:64,flex:1,margin:4}}
            data = {this.props.data}
            renderItem={({item,key,separators})=>(
                <NavItem category_name = {item.name}/>
            )}
            horizontal={true}
            />
        )
    }
}

class NavItem extends Component{
    render(){
        return(
            <TouchableOpacity 
            style={{height:56,padding:4,
                borderBottomLeftRadius:8,
                borderBottomRightRadius:8,
                borderStyle:"solid",
                borderColor:"black",
                borderWidth:1,
                width:"100%",
            
            }}>
                <Text style={{fontSize:32}}>{this.props.category_name}</Text>
            </TouchableOpacity>
        )
    }
}
export {Nav}