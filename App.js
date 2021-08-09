//Dragon image sourced legally for free from here:
//https://pixabay.com/illustrations/dragon-dragoon-dragons-monster-3462724/

import React from 'react'; //Importing React

import Providers from './src/navigation/index'; //Getting the Providers from index.js. Returns it so app is pointed to the current page.
import {Dimensions, Platform} from 'react-native'
let LogBox;

export default function App() {
  global.screenWidth = Dimensions.get("window").width;
  global.screenHeight = Dimensions.get("window").height;
  //Band-aid fix for issue where web version of the app couldn't import LogBox
  if (Platform.OS === "android" || Platform.OS === "ios") {
    LogBox = require('react-native').LogBox; //Importing LogBox so I can ignore all warnings in the app (means yellow box won't pop up
    //LogBox.ignoreAllLogs();
    LogBox.ignoreLogs(['Setting a timer'])
  }
  return <Providers />;
}
