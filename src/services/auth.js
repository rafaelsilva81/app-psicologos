import React, { createContext, useContext, useState } from 'react';
import {app} from '../firebase.config';
import {
	browserLocalPersistence,
	getAuth,
	setPersistence,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';
import { getMessage } from './customErrorHandler';

const auth = getAuth(app);

export const AuthContext = createContext();

export const AuthProvider = (props) => {
	setPersistence(auth, browserLocalPersistence);
	const [authInfo, setAuthInfo] = useState();

	const logIn = (data) => {
		return new Promise((resolve, reject) => {
			signInWithEmailAndPassword(auth, data.email, data.password)
				.then((userCredential) => {
					// Signed in
					const user = userCredential.user;
					console.log('Logado com sucesso');
					setAuthInfo({ initialized: true, loggedIn: true, user: user });
					resolve(user);
				})
				.catch((error) => {
					reject(getMessage(error.code));
				});
		});
	};

	const logOut = () => {
		return new Promise((resolve, reject) => {
			signOut(auth)
				.then(() => {
					console.log('Deslogado com sucesso');
					setAuthInfo({ initialized: true, loggedIn: false, user: null });
					resolve(true);
				})
				.catch((error) => {
					reject(getMessage(error.code));
				});
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
