import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDFN2BCJoBLfKC57tJ6_3_KgivzYQgeSc8",
    authDomain: "app-psicologos-576a3.firebaseapp.com",
    projectId: "app-psicologos-576a3",
    storageBucket: "app-psicologos-576a3.appspot.com",
    messagingSenderId: "393261577985",
    appId: "1:393261577985:web:97cdfaac7464ce517a8d00",
    measurementId: "G-473MJV9MCV",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
