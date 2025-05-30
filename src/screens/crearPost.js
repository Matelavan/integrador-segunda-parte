
import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { db, auth } from '../firebase/config'

class CrearPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            description: '',
            username: ''
        }
    }

    crearPost() {
        const email = auth.currentUser.email;
        const { description, username } = this.state;

        if (
            email &&
            description !== '' &&
            username !== '' &&
            username.length > 3 &&
            email.includes('@')
        ) {
            db.collection('posts')
                .add({
                    owner: email,
                    description: description,
                    createdAt: Date.now(),
                    username: username,
                
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
                    style={styles.input}
                />
                <TextInput
                    value={this.state.username}
                    onChangeText={(text) => this.setState({ username: text })}
                    style={styles.input}
                />
                <TouchableOpacity onPress={() => this.crearPost()}>
                    <Text>Crear Post</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default CrearPost;

