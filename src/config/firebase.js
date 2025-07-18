
import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBDl_8QFHZvqHZaH90EmYVvjpndM3zYLZ4",
  authDomain: "shipntrack-ec85e.firebaseapp.com",
  projectId: "shipntrack-ec85e",
  storageBucket: "shipntrack-ec85e.firebasestorage.app",
  messagingSenderId: "974664178664",
  appId: "1:974664178664:web:1fd183e96e8bae7f8ba25d",
  measurementId: "G-9P3CKZYJVX"
};



// Initialize Firebase
  export const app = initializeApp(firebaseConfig);

 export const auth = getAuth(app);
 console.log(auth)
export  const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);









