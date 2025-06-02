
import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { db, auth } from '../firebase/config'

class CrearPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            description: '',           
        }
    }
    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user == null) {
                console.log("no hay nadie logueado ")
                this.props.navigation.navigate('login')    
                }    
            })
        }
    crearPost() {
        const email = auth.currentUser.email;
        const { description } = this.state;

        if (
            email &&
            description !== ''
        ) {
            db.collection('posts')
                .add({
                    owner: email,
                    description: description,
                    createdAt: Date.now(),
                    likes: [],
            
                
                })
                .then(() => {
                    this.props.navigation.navigate('Tab');
                })
                .catch(err=> console.log('err:', err));
        }
    }
    render() {
        return (
            <View>
                <TextInput
                    value={this.state.description}
                    onChangeText={(text) => this.setState({ description: text })}
                    placeholder="Crea tu posteo"
                />
                
    
                <TouchableOpacity onPress={() => this.crearPost()}>
                    <Text>Crear Post</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default CrearPost;

