import React, { Component } from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import Usuario from '../components/Usuario'; 
import { auth, db } from '../firebase/config'

class MiPerfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: [] 
        };
    }
    componentDidMount(){
        db.collection('users').orderBy('createdAt', 'desc').onSnapshot((docs) => {
          let arrDocs = [];
          docs.forEach((doc) => arrDocs.push({
            id: doc.id,
            data: doc.data()
          }))
          this.setState({
            usuarios: arrDocs
          }, () => console.log('este es el state', this.state))
        })
      }

    logout() {
        auth.signOut()
        .then(()=> this.props.navigation.navigate('Register'))
        .catch(err => console.log('err en signout', err))
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
                    <Text>Cerrar sesion</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
export default MiPerfil;
