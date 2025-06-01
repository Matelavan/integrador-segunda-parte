import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { onSnapshot, collection, query, orderBy, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';
import Post from '../components/Post';

import LikeButton from '../components/LikeButton';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],

    };
  }
  //checkear el posts es igual que la fb y el createdAt es igual que el de la fb
  componentDidMount() {
    db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(docs => {
      let posts = [];
      docs.forEach(doc => {
        posts.push({
          id: doc.id,
          data: doc.data()
        })
      })
      this.setState({
        posts: posts,
       })
    })

  }




  

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.posts}
          keyExtractor={(item) => item.id}
          renderItem= {({item}) => <Post post={item.data} postId={item.id} miPerfil={false} />}
          
        />
      </View>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  postContainer: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
  },
  author: {
    fontWeight: 'bold',
  },
  content: {
    marginTop: 8,
    marginBottom: 8,
  },
  likes: {
    fontSize: 12,
    color: '#666',
  },
  likeButton: {
    color: '#007BFF',
    marginTop: 8,
  },
});
