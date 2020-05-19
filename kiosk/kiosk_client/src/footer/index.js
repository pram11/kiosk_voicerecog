import React, { Component } from 'react'
import {View,Text} from 'react-native'
export default class Footer extends Component {
    constructor(props){
        super(props)
        this.state={
            headerType:"sheet"
        }
    }
    render() {
        return (
            <View style={{flex:1}}>
                <Text>주문표</Text>
            </View>
        )
    }
}