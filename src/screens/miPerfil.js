import React, { Component } from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import Usuario from '../components/Usuario'; 

class MiPerfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: [] 
        };
    }

    logout() {
        console.log('Sesión cerrada');
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.usuario}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <Usuario id={item.id} data={item.data} />}
                />

                <TouchableOpacity onPress={() => this.logout()}>
                    <Text>Cerrar Sesión</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
export default MiPerfil;
