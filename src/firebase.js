import firebase from 'firebase';

// Configure Firebase.
const config = {
  apiKey: 'AIzaSyCFJ8QEOmiOyC8k1JhUGQvYmZWYVYYg3ns',
  authDomain: 'yaytwat.firebaseapp.com',
  databaseURL: 'https://yaytwat.firebaseio.com/',
  // ...
};
firebase.initializeApp(config);

export default firebase;
