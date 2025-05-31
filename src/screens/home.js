import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { onSnapshot, collection, query, orderBy, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { getAuth } from 'firebase/auth';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      user: getAuth().currentUser,
    };
  }

  componentDidMount() {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, orderBy('createdAt', 'desc'));

    this.unsubscribe = onSnapshot(q, (snapshot) => {
      const arrPosts = [];
      snapshot.forEach(doc => arrPosts.push({ id: doc.id, ...doc.data() }));
      this.setState({ posts: arrPosts });
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  toggleLike = (post) => {
    const postRef = doc(db, 'posts', post.id);
    const likes = post.likes || [];
    const userEmail = this.state.user.email;

    const newLikes = likes.includes(userEmail)
      ? likes.filter(email => email !== userEmail)
      : [...likes, userEmail];

    updateDoc(postRef, { likes: newLikes })
      .then(() => console.log('Like actualizado'))
      .catch(error => console.error('Error al actualizar like:', error));
  };

  renderItem = ({ item }) => {
    const userLiked = item.likes?.includes(this.state.user.email);
    return (
      <View style={styles.postContainer}>
        <Text style={styles.author}>{item.userEmail}</Text>
        <Text style={styles.content}>{item.text}</Text>
        <Text style={styles.likes}>Likes: {item.likes?.length || 0}</Text>
        <TouchableOpacity onPress={() => this.toggleLike(item)}>
          <Text style={styles.likeButton}>{userLiked ? 'Quitar Me gusta' : 'Me gusta'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.posts}
          keyExtractor={(item) => item.id}
          renderItem={this.renderItem}
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
