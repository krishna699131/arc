// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWlLHrYGiTXdGE7AKKGioHV7WGakHf7x4",
  authDomain: "jyotheshyalayam.firebaseapp.com",
  projectId: "jyotheshyalayam",
  storageBucket: "jyotheshyalayam.appspot.com",
  messagingSenderId: "134844703125",
  appId: "1:134844703125:web:78a7c83478aff62659569c",
  measurementId: "G-N58RSMYG6V"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();

export { auth, googleAuthProvider };
