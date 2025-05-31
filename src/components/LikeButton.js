import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from '../firebase/config'; // Ajusta la ruta según tu estructura

export default function LikeButton({ postId, likes, userEmail }) {
  const userHasLiked = likes.includes(userEmail);

  const toggleLike = () => {
    const postRef = doc(db, 'posts', postId);

    if (userHasLiked) {
      updateDoc(postRef, { likes: arrayRemove(userEmail) })
        .then(() => console.log('Like removido'))
        .catch(err => console.error('Error al remover like:', err));
    } else {
      updateDoc(postRef, { likes: arrayUnion(userEmail) })
        .then(() => console.log('Like añadido'))
        .catch(err => console.error('Error al añadir like:', err));
    }
  };

  return (
    <TouchableOpacity onPress={toggleLike} style={styles.button}>
      <Text style={styles.text}>
        {userHasLiked ? 'Quitar Me Gusta' : 'Me Gusta'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 8,
    backgroundColor: '#007BFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
