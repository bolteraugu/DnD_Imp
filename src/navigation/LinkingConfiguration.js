import * as Linking from 'expo-linking';
import {Dimensions} from "react-native";

global.screenWidth = Dimensions.get("window").width;
global.screenHeight = Dimensions.get("window").height;

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    Root: {
      path: 'root',
      screens: {
        Login: 'login',
        Menu: 'menu',
        Character: 'character',
        DM: 'dm',
      },
    },
  },
};
