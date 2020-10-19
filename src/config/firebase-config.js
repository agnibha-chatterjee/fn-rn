import * as firebase from 'firebase';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCPlCJgZyIdFGJBmTAc-9XalpG4dLYwaHc',
  authDomain: 'fn-rn-5bc74.firebaseapp.com',
  databaseURL: 'https://fn-rn-5bc74.firebaseio.com',
  projectId: 'fn-rn-5bc74',
  storageBucket: 'fn-rn-5bc74.appspot.com',
  messagingSenderId: '264666518461',
  appId: '1:264666518461:web:06692bd2310abc517d38d4',
  measurementId: 'G-LPKCVLCJS3',
};

firebase.initializeApp(firebaseConfig);
export default firebase;
