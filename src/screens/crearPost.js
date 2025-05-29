import { db, auth } from '../firebase/config'

db.collection('posts').add({
            owner: auth.currentUser.email,
            likes: this.state.description,
            createdAt: Date.now(),
        })
        .then()
        .catch( e => console.log(e))
