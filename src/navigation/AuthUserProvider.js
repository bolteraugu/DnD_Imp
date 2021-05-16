import React, { createContext, useState } from "react";
import firebase from "firebase";
import "firebase/auth";

/**
 * This provider is created
 * to access user in whole app
 */

export const AuthUserContext = createContext({});

export const AuthUserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <AuthUserContext.Provider
            value={{
                user,
                setUser,
                login: async (email, password) => {
                    try {
                        await firebase.auth().signInWithEmailAndPassword(email, password);
                    } catch (e) {
                        console.log(e);
                        alert(e);
                    }
                },
                register: async (email, password) => {
                    try {
                        await firebase
                            .auth()
                            .createUserWithEmailAndPassword(email, password);
                    } catch (e) {
                        console.log(e);
                        alert(e);
                    }
                },
                logout: async () => {
                    try {
                        await firebase.auth().signOut();
                    } catch (e) {
                        console.error(e);
                        alert(e);
                    }
                },
            }}
        >
            {children}
        </AuthUserContext.Provider>
    );
};
