import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'

export default class Usuario extends Component {
    constructor(props){
        super(props)
        this.state = {
            siguiendo: false
        }
    }

    render() {
        return (
          <View>
            <Text>{this.props.data.owner}</Text>
          </View>
        )
    }
}
