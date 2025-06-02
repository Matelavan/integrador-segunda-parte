import React, { Component } from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import Usuario from '../components/Usuario'; 
import { auth, db } from '../firebase/config'

class MiPerfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datosUsuario: '',
            posteos: []

        };
    }
    componentDidMount(){
        db.collection('users').where('mail', '==', auth.currentUser.email)
        .onSnapshot(data => {
            data.forEach(doc => {
                this.setState({datosUsuario: doc.data() })
            });
        })
        db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(
            docs => {
                let posts = []
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({posteos: posts})
            }
        )
      }

    logout() {
        auth.signOut()
        .then(()=> this.props.navigation.navigate('Register'))
        .catch(err => console.log('err en signout', err))
    }
    borrarPosteo(idPosteo) {
        console.log('a ver si lo borra')
        db.collection('posts').doc(idPosteo).delete()
            .then((res) => console.log('se borro'))
            .catch(e => console.log(e))
    }

    render() {
        return (
            <View>
                <Text>{this.state.datosUsuario.nombre}</Text>
                <Text>{this.state.datosUsuario.mail}</Text>
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
