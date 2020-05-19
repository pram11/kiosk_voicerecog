import React, { Component } from 'react'
import {View,Text} from 'react-native'
export default class Header extends Component {
    constructor(props){
        super(props)
        this.state={
            headerType:"advertise"
        }
    }
    render() {
        return (
            <View style={{flex:1}}>
                <Text>헤더</Text>
            </View>
        )
    }
}
