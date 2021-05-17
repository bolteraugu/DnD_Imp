import React, {createContext, useState} from 'react';
import firebase from 'firebase';
import 'firebase/auth';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  appleAuth,
  appleAuthAndroid,
} from '@invertase/react-native-apple-authentication';
import * as Facebook from 'expo-facebook';
import {v4 as uuid} from 'uuid';
import * as Google from 'expo-google-app-auth';

/**
 * This provider is created
 * to access user in whole app
 */

export const AuthUserContext = createContext({});

export const AuthUserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [storedAccountType, setStoredAccountType] = useState('');

  return (
    <AuthUserContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password, rememberMe) => {
          try {
            if (rememberMe) {
              await firebase
                .auth()
                .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
            } else {
              await firebase
                .auth()
                .setPersistence(firebase.auth.Auth.Persistence.NONE);
            }
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
              .createUserWithEmailAndPassword(email, password)
              .then((user) => {
                firebase
                  .firestore()
                  .collection('user-logs')
                  .doc('user_creation')
                  .collection('logs')
                  .doc(user.user.toJSON().email)
                  .set({
                    text: `User ${user.user.toJSON().email} was created.`,
                    accountType: 'Standard',
                    createdOn: new Date().toString(),
                  });
              });
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
            await firebase.auth().sendPasswordResetEmail(email);

            firebase
              .firestore()
              .collection('user-logs')
              .doc('user-creation')
              .collection('logs')
              .doc(email)
              .get()
              .then((snapshot) => {
                setStoredAccountType(snapshot.get('accountType'));
              });

            await firebase
              .firestore()
              .collection('user-logs')
              .doc('reset_password_requests')
              .collection('logs')
              .doc(email)
              .set({
                text: `User ${email} requested a reset password email to be sent to their email address.`,
                accountType: storedAccountType,
                requestedOn: new Date().toString(),
              });
            Alert.alert(
              'Password reset link sent',
              'A password reset link has been sent to your email.'
            );
          } catch (e) {
            console.log(e);
            alert(e);
          }
        },

        //Got help from for this code https://inaguirre.medium.com/react-native-login-with-google-quick-guide-fe351e464752
        onGoogleButtonPress: async (rememberMe) => {
          try {
            const {type, token} = await Google.logInAsync({
              //iosClientId: `<YOUR_IOS_CLIENT_ID>`,
              androidClientId:
                '1059214854860-uvhjai9r85bno10luchjk9r7aknrqr3b.apps.googleusercontent.com',
            });

            if (type === 'success') {
              if (rememberMe) {
                await firebase
                  .auth()
                  .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
              } else {
                await firebase
                  .auth()
                  .setPersistence(firebase.auth.Auth.Persistence.NONE);
              }

              let docToConsider = firebase
                .firestore()
                .collection('user-logs')
                .doc('user-creation')
                .collection('logs')
                .doc(user.user.toJSON().email);
              let docExists = (await docToConsider.get()).exists;

              const credential =
                firebase.auth.GoogleAuthProvider.credential(token);
              await firebase
                .auth()
                .signInWithCredential(credential)
                .then(() => {
                  if (!docExists) {
                    docToConsider
                      .get()
                      .then((snapshot) => {
                        setStoredAccountType(snapshot.get('accountType'));
                      })
                      .then(() => {
                        docToConsider.set({
                          text: `User ${user.user.toJSON().email} was created.`,
                          accountType: 'Google',
                          createdOn: new Date().toString(),
                        });
                      });
                  }
                });
            }
          } catch (error) {
            console.log('LoginScreen.js 19 | error with login', error);
          }
        },

        //Got help with this code from here: https://rnfirebase.io/auth/social-auth#apple
        onAppleButtonPress: async (rememberMe) => {
          const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
          });

          if (!appleAuthRequestResponse.identityToken) {
            throw 'Apple Sign-In failed - no identify token returned';
          }

          const {identityToken, nonce} = appleAuthRequestResponse;
          const appleCredential = auth.AppleAuthProvider.credential(
            identityToken,
            nonce
          );

          if (rememberMe) {
            await firebase
              .auth()
              .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
          } else {
            await firebase
              .auth()
              .setPersistence(firebase.auth.Auth.Persistence.NONE);
          }

          return auth().signInWithCredential(appleCredential);
        },

        //Got help with this code from here - https://github.com/invertase/react-native-apple-authentication/blob/master/example/app.android.js
        onAndroidAppleButtonPress: async (rememberMe) => {
          const rawNonce = uuid();
          try {
            appleAuthAndroid.configure({
              clientId: 'needToChangeThis', //Change this once I have an Apple Developers Account to my clientId in my Apple Developers Account.
              redirectUri: 'needToChangeThis', //Change this once I have an Apple Developers Account to my redirectURI in my Apple Developers Account.
              scope: appleAuthAndroid.Scope.ALL,
              responseType: appleAuthAndroid.ResponseType.ALL,
              nonce: rawNonce,
            });
            const response = await appleAuthAndroid.signIn();
            if (response) {
              if (rememberMe) {
                await firebase
                  .auth()
                  .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
              } else {
                await firebase
                  .auth()
                  .setPersistence(firebase.auth.Auth.Persistence.NONE);
              }
              //Pass into token into firebase here... look at Facebook code as an example.
            }
          } catch (e) {
            console.log(e);
            alert(e);
          }
        },

        //Got help with this code from here: https://medium.com/hackernoon/firebase-auth-using-facebook-log-in-on-expo-react-native-2c9f1aaf26b7
        onFacebookButtonPress: async (rememberMe) => {
          // await Facebook.initializeAsync({
          //    appId: '1030848457444492'
          // })
          const {type, token} = await Facebook.logInWithReadPermissionsAsync({
            permissions: ['public_profile', 'email'],
          });

          if (type === 'success') {
            if (rememberMe) {
              await firebase
                .auth()
                .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
            } else {
              await firebase
                .auth()
                .setPersistence(firebase.auth.Auth.Persistence.NONE);
            }

            let docToConsider = firebase
              .firestore()
              .collection('user-logs')
              .doc('user-creation')
              .collection('logs')
              .doc(user.user.toJSON().email);
            let docExists = (await docToConsider.get()).exists;

            const credential =
              firebase.auth.FacebookAuthProvider.credential(token);
            await firebase
              .auth()
              .signInWithCredential(credential)
              .then(() => {
                if (!docExists) {
                  docToConsider
                    .get()
                    .then((snapshot) => {
                      setStoredAccountType(snapshot.get('accountType'));
                    })
                    .then(() => {
                      docToConsider.set({
                        text: `User ${user.user.toJSON().email} was created.`,
                        accountType: 'Facebook',
                        createdOn: new Date().toString(),
                      });
                    });
                }
              });
          }
        },
      }}
    >
      {children}
    </AuthUserContext.Provider>
  );
};
