import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "YOUR CREDENTIALS HERE!",
  authDomain: "YOUR CREDENTIALS HERE!",
  projectId: "YOUR CREDENTIALS HERE!",
  storageBucket: "YOUR CREDENTIALS HERE!",
  messagingSenderId: "YOUR CREDENTIALS HERE!",
  appId: "YOUR CREDENTIALS HERE!",
  measurementId: "YOUR CREDENTIALS HERE!"
};

const app = initializeApp(firebaseConfig);
export default app