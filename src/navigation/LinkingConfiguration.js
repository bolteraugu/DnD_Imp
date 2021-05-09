import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    Root: {
      path: "root",
      screens: {
        Login: "login",
        Menu: "menu",
        Character: "character",
        DM: "dm",
      },
    },
  },
};
