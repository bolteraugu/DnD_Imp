import {DefaultTheme} from '@react-navigation/native';

import Colors from '../utils/colors';
import {Dimensions} from "react-native";

global.screenWidth = Dimensions.get("window").width;
global.screenHeight = Dimensions.get("window").height;

const navigationTheme = {
  ...DefaultTheme,
  // override colors
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    text: Colors.primary,
    border: Colors.mediumGrey,
    background: Colors.ghostWhite,
  },
};

export default navigationTheme;
