import { app } from "../../firebase.config";
import { getFirestore } from "firebase/firestore";

const db = getFirestore(app);

export { db };
/* export const DatabaseContext = createContext();

export const DatabaseProvider = (props) => {
	// const [authInfo, setAuthInfo] = useState();
	// TODO : Olhar isso aqui
	// https://github.com/firebaseextended/reactfire/
	// e também
	// https://firebase.blog/posts/2014/05/using-firebase-with-reactjs
	const getData = async (table) => {
		const ref = db.collection(table);
		const querySnapshot = await getDocs(query(ref));
		return querySnapshot.docs;
	};

	let v = {
		getData,
		// logOut: logOut,
		// logIn: logIn,
		// initializeAuth,
		// checkFirstAccess,
	};

	return <DatabaseContext.Provider value={v} {...props} />;
};

export const useDB = () => useContext(DatabaseContext);
 */
