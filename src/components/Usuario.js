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
          //cuando llame al flatlist del posteo dentro de mi perfil tiene que agregar una prop mi perfil: true y tiene que mostrar un boton que al clickearlo te permita eliminar el post
        )
    }
}
