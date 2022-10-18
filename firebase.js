import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBIfVc0IMV0Xt-TcWZOMD21_ssLQoBBU_8",
  authDomain: "clone-d552d.firebaseapp.com",
  projectId: "clone-d552d",
  storageBucket: "clone-d552d.appspot.com",
  messagingSenderId: "740399904806",
  appId: "1:740399904806:web:697f9b00ec8ebb458d4ee7",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();


  const db = app.firestore();

  export default db;