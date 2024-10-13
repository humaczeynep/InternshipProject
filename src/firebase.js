import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyAow80uNFN6WEMJtNyctGHslY6FktEjQEQ",
  authDomain: "fir-f276d.firebaseapp.com",
  projectId: "fir-f276d",
  storageBucket: "fir-f276d.appspot.com",
  messagingSenderId: "526437870720",
  appId: "1:526437870720:web:9e7f6790087be5a6424a65"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;