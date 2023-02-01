// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCqrjHZk3YvOnkJiRRXNDxuqsPcxlRC0so',
  authDomain: 'keep-track-21a3e.firebaseapp.com',
  projectId: 'keep-track-21a3e',
  storageBucket: 'keep-track-21a3e.appspot.com',
  messagingSenderId: '1092542089757',
  appId: '1:1092542089757:web:790db81fb8ed01afa714f4',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
