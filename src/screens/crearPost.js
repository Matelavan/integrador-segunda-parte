
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
                    this.setState({ description: '' });
                    this.props.navigation.navigate('home');
                })
                .catch(err=> console.log('err:', err));
        }
    }
    
    render() {
        return (
            <View style={styles.container}>               
                 <View style={styles.box}>
                <TextInput style={styles.input}
                    value={this.state.description}
                    onChangeText={(text) => this.setState({ description: text })}
                    placeholder="Crea tu posteo"
                />
                <TouchableOpacity style={styles.button} onPress={() => this.crearPost()}>
                    <Text style={styles.buttonText}>Crear Post</Text>
                </TouchableOpacity>
                </View>
            </View>
        )
    }
    
}

export default CrearPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0FCFD', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: '40%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#dbdbdb',
    backgroundColor: '#fafafa',
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
    fontSize: 16,
    height: 50,
    textAlignVertical: 'top'
  },
  button: {
    backgroundColor: '#3897f0',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    minHeight: 20
  },
});