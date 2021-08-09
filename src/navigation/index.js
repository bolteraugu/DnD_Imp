import React from 'react';
import {AuthUserProvider} from './AuthUserProvider';
import Routes from './Routes';
import {Dimensions} from "react-native";

/**
 * Wrap all providers here
 */

global.screenWidth = Dimensions.get("window").width;
global.screenHeight = Dimensions.get("window").height;

export default function Providers() {
  return (
    <AuthUserProvider>
      <Routes />
    </AuthUserProvider>
  );
}
