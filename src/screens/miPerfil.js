import React, { Component } from 'react';
import { Text, View, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config'
import Post from '../components/Post';

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
        .then(()=> this.props.navigation.navigate('registro'))
        .catch(err => console.log('err en signout', err))
    }
    borrarPosteo(idPosteo) {
        db.collection('posts').doc(idPosteo).delete()
            .then((res) => console.log('se borro'))
            .catch(e => console.log(e))
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>{this.state.datosUsuario.nombre}</Text>
                <Text>{this.state.datosUsuario.mail}</Text>
                <FlatList
                    data={this.state.posteos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <Post perfil={true} borrarPosteo={(idPosteo) => this.borrarPosteo(idPosteo)} post={item.data} id={item.id}/>}
                />
                <TouchableOpacity onPress={() => this.logout()}>
                    <Text>Cerrar sesion</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
export default MiPerfil;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
});