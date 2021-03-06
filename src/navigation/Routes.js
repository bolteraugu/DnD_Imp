import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {auth} from '../components/Firebase/firebase';
import navigationTheme from './navigationTheme';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import {AuthUserContext} from './AuthUserProvider';
import Spinner from '../components/Spinner';
import {Dimensions} from "react-native";

global.screenWidth = Dimensions.get("window").width;
global.screenHeight = Dimensions.get("window").height;

export default function Routes() {
  const {user, setUser} = useContext(AuthUserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    return auth.onAuthStateChanged(async (authUser) => {
      try {
        await (authUser ? setUser(authUser) : setUser(null));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    });
  }, [setUser]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <NavigationContainer theme={navigationTheme}>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
