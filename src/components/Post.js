import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { db, auth } from '../firebase/config';
import { StyleSheet } from 'react-native-web';
import firebase from 'firebase';


class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cantLikes: this.props.post.likes.length,
            userLiked: false,
            likes: this.props.post.likes,
            label: 'Me gusta',

        }
    }

    componentDidMount() {
        const userEmail = auth.currentUser.email;
        if (this.props.post.likes.includes(userEmail)) {
            this.setState({
                userLiked: true,
                Label: 'No me gusta'
            })
        } else {
            this.setState({
                userLiked: false,
                Label: 'Me gusta'
            })
        }
    }
    Likear() {
        if (this.state.userLiked) {
            console.log('ejecuta el if')
            db.collection('posts').doc(this.props.postId).update({ likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
                })
                .then(() => this.setState({
                     userLiked: false,
                    label: 'Me gusta',
                    likes: this.state.likes.filter(email => email !== auth.currentUser.email)

                })
                )
                .catch(e => console.log(e))
        }else {
            console.log('ejecuta el else')

            db.collection('posts').doc(this.props.postId).update({ likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
                })
                .then(() => this.setState({
                    userLiked: true,
                    label: 'No me gusta',
                    likes: this.state.likes.concat(auth.currentUser.email)
                }, ()=> console.log('el estado desopues de dar like', this.state)))
                .catch(e => console.log(e))
        }

    }


    render() {
        return (
            <View style={styles.postContainer}>
                <Text style={styles.author}>{this.props.post.owner}</Text>
                <Text style={styles.content}>{this.props.post.description}</Text>
                <Text style={styles.likes}>Likes: {this.props.post.likes.length}</Text>
                <TouchableOpacity onPress={() => this.Likear()}>
                <Text style={styles.likeButton}>{this.state.label}</Text>
                </TouchableOpacity>
                {this.props.perfil ? (
        <TouchableOpacity onPress={() =>this.props.borrarPosteo(this.props.id)}>
          <Text style={styles.deleteButton}>Eliminar</Text>
        </TouchableOpacity>
      ) : null}

            </View>)
    }
}

export default Post;

const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  author: {
    fontWeight: '600',
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  content: {
    fontSize: 15,
    color: '#444',
    marginTop: 8,
    marginBottom: 8,
    lineHeight: 22,
  },
  likes: {
    fontSize: 13,
    color: '#888',
  },
  likeButton: {
    marginTop: 10,
    color: '#1E90FF',
    fontWeight: '500',
  },
  deleteButton: {
    marginTop: 10,
    color: '#FF4D4D',
    fontWeight: '500',
  },
});