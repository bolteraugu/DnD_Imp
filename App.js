//Dragon image sourced legally for free from here:
//https://pixabay.com/illustrations/dragon-dragoon-dragons-monster-3462724/

import React from 'react'; //Importing React

import Providers from './src/navigation'; //Getting the Providers from index.js. Returns it so app is pointed to the current page.
import {LogBox} from 'react-native'; //Importing LogBox so I can ignore all warnings in the app (means yellow box won't pop up

export default function App() {
  LogBox.ignoreAllLogs();
  //console.disableYellowBox = true; Old code from Dylan's project
  return <Providers />;
}
