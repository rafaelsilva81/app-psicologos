import app from "../firebase.config";
import { getFirestore } from "firebase/firestore";

const firestore = getFirestore(app);
export default firestore;
