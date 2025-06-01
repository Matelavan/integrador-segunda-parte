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
            db.collection('posts').doc(this.props.postId).update({ likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
                })
                .then(() => this.setState({
                    userLiked: true,
                    label: 'No me gusta',
                    likes: this.state.likes.push(auth.currentUser.email)
                }))
                .catch(e => console.log(e))
        }

    }


    render() {
        return (
            <View>
                <Text style={styles.author}>{this.props.post.owner}</Text>
                <Text style={styles.content}>{this.props.post.description}</Text>
                <Text style={styles.likes}>Likes: {this.props.post.likes.length}</Text>
                <TouchableOpacity onPress={() => this.Likear()}>
                    <Text style={styles.likeButton}>{this.state.label}</Text>

                </TouchableOpacity>

            </View>)
    }
}

export default Post;

