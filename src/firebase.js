import firebase from 'firebase';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBCz3dX_eCyHVUgTa90FKtrt2Tl9Da66fs",
  authDomain: "dave-test-apps.firebaseapp.com",
  projectId: "dave-test-apps",
  storageBucket: "dave-test-apps.appspot.com",
  messagingSenderId: "5482969416",
  appId: "1:5482969416:web:76c2811fe3f0b276031b7d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;