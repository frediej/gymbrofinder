import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAcZ4LzSJFRX6r4KF-W5vf6qeOBT0dU79I",
  authDomain: "gym-bro-finder-57fc5.firebaseapp.com",
  projectId: "gym-bro-finder-57fc5",
  storageBucket: "gym-bro-finder-57fc5.appspot.com",
  messagingSenderId: "408834948495",
  appId: "1:408834948495:web:657aefff93b0fdf6a81ffa"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {
    db, auth
}
