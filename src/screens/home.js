import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { db } from '../firebase/config';
import Post from '../components/Post';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true, // Inicialmente true
    };
  }

  componentDidMount() {
    db.collection('posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot(docs => {
        let posts = [];
        docs.forEach(doc => {
          posts.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        this.setState({
          posts: posts,
          loading: false,
        });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.loading ? (
          <ActivityIndicator size="large" color="green" />
        ) : (
          <FlatList
            data={this.state.posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Post post={item.data} postId={item.id} miPerfil={false} />
            )}
          />
        )}
      </View>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F0FCFD',
  },
});
