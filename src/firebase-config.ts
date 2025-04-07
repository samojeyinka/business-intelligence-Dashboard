import {initializeApp} from "firebase/app"
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAZgJwZZNshygusNNeLmJlC9xifVKKG49w",
    authDomain: "coact-9745f.firebaseapp.com",
    projectId: "coact-9745f",
    storageBucket: "coact-9745f.firebasestorage.app",
    messagingSenderId: "847158245352",
    appId: "1:847158245352:web:ce8ddd3eac69267785d65d",
    measurementId: "G-VW6PMSQL4E"
  };
  

  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);