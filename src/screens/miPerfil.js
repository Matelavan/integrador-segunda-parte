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

                posts.sort((a, b) => b.data.createdAt - a.data.createdAt)

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
            <View style={styles.box}>
                <Text style={styles.userName}>{this.state.datosUsuario.nombre}</Text>
                <Text style={styles.userEmail}>{this.state.datosUsuario.mail}</Text>
            </View>
                <FlatList
                    data={this.state.posteos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <Post perfil={true} borrarPosteo={(idPosteo) => this.borrarPosteo(idPosteo)} post={item.data} id={item.id}/>}
                    
                />
                <TouchableOpacity style={styles.logoutButton} onPress={() => this.logout()}>
                    <Text style={styles.logoutButtonText}>Cerrar sesion</Text>
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
    backgroundColor: '#F0FCFD',
  },
  box: {
    backgroundColor: '#fff', 
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
    alignSelf: 'center',
    width: '20%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  logoutButton: {
    backgroundColor: '#3897f0',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});