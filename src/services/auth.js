import app  from "../firebase.config";
import {getAuth} from 'firebase/auth'

const authService = getAuth(app)
export default authService