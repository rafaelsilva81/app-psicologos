import React, { createContext, useContext, useState } from 'react';
import app from '../firebase.config';
import {
	browserLocalPersistence,
	getAuth,
	setPersistence,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';

const auth = getAuth(app);

export const AuthContext = createContext();

export const AuthProvider = (props) => {
	const [authInfo, setAuthInfo] = useState();

	const logIn = async (data) => {
		await setPersistence(auth, browserLocalPersistence);
		const { email, password } = data;
		await signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				console.log('Logado com sucesso');
				setAuthInfo({ initialized: true, loggedIn: true, user: user });
				return true;
			})
			.catch((error) => {
				console.log(error.message + ' / COD: ' + error.code);
				return error.message;
			});
	};

	const logOut = async () => {
		await signOut(auth)
			.then(() => {
				console.log('DESLOGADO');
				setAuthInfo({ initialized: true, loggedIn: false, user: null });
				return true;
			})
			.catch((error) => {
				console.log(error.message);
				return false;
			});
	};

	// TODO: ARRUMAR ESSA FUNÇÃO
	const initializeAuth = async () => {
		console.log('initializeAuth was called, searching user');
		await auth.onAuthStateChanged((user) => {
			if (user != null) {
				console.log('user found');
				setAuthInfo({
					initialized: true,
					loggedIn: true,
					user: user,
				});
			} else {
				console.log('user not found');
				setAuthInfo({
					initialized: true,
					loggedIn: false,
					user: null,
				});
			}
		});
	};

	const checkFirstAccess = () => {
		let response = window.localStorage.getItem('HAS_ACCESSED') || false;
		if (response === false) {
			console.log('Its your first access');
			window.localStorage.setItem('HAS_ACCESSED', true);
		}

		return response;
	};

	let v = {
		authInfo,
		logOut: logOut,
		logIn: logIn,
		initializeAuth,
		checkFirstAccess,
	};

	return <AuthContext.Provider value={v} {...props} />;
};

export const useAuth = () => useContext(AuthContext);
