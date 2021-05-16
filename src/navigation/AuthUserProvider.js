import React, { createContext, useState } from "react";
import firebase from "firebase";
import "firebase/auth";
import {Alert} from "react-native";

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
                login: async (email, password, rememberMe) => {
                    try {
                        if (rememberMe) {
                            await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                        }
                        else {
                            await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
                        }
                        await
                            firebase.auth().signInWithEmailAndPassword(email, password);
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
                forgotPassword: async (email) => {
                    try {
                        await firebase
                            .auth()
                            .sendPasswordResetEmail(email)
                            Alert.alert("Password reset link sent",
                            "A password reset link has been sent to your email.")
                    } catch (e) {
                        console.log(e);
                        alert(e);
                    }
                },
            }}
        >
            {children}
        </AuthUserContext.Provider>
    );
};
