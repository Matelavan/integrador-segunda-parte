import React, { Component, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { onSnapshot, collection, query, orderBy, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { getAuth } from 'firebase/auth';

class home extends Component {
    constructor(props) {
        super(props);
         this.state = {
             posts: [],
             user: getAuth().currentUser,
    };
      
    }
    componentDidMount() {
        db.collection('posts').orderBy('createdAt', 'desc').onSnapshot((docs)=> {
             const arrPosts = [];
           docs.forEach((doc) => arrPosts.push({ id:doc.id, data:doc.data() }));

            this.setState({ posts });
        });
    }

    toggleLike = (post) => {
        const postRef = doc(db, 'posts', post.id);
        const likes = post.likes || [];
        const userEmail = this.state.user.email;
        
        const newLikes = likes.includes(userEmail)
        ? likes.filter((email) => email !== userEmail)
        : [...likes, userEmail];
        
        updateDoc(postRef, { likes: newLikes })
        .then(() => console.log('Like actualizado'))
        .catch((error) => console.error('Error al actualizar like:', error));
};

}