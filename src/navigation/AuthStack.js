import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import {Dimensions, View} from "react-native";
import {IconButton} from "react-native-paper";
import {logout} from "../components/Firebase/firebase";
import colors from "../utils/colors";

global.screenWidth = Dimensions.get("window").width;
global.screenHeight = Dimensions.get("window").height;

const Stack = createStackNavigator();

export default function AuthStack() {
    return (
        <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.primary,
                },
                headerTintColor: colors.white,
                headerTitleStyle: {
                    fontSize: 22,
                },
            }}
        >
            <Stack.Screen name="Login" component={LoginScreen}
                          options={() => ({
                              headerRight: () => (
                                      <IconButton
                                          icon="help"
                                          size={28}
                                          color="#ffffff"
                                          onPress={() => global.ShowHelpLogin()}
                                      />
                              )})}
            />

            <Stack.Screen name="Register" component={RegisterScreen}
                          options={() => ({
                              headerRight: () => (
                                  <IconButton
                                      icon="help"
                                      size={28}
                                      color="#ffffff"
                                      onPress={() => global.ShowHelpRegister()}
                                  />
                              )})}
            />

            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}
                          options={() => ({
                              title: "Forgot Password",
                              headerRight: () => (
                                  <IconButton
                                      icon="help"
                                      size={28}
                                      color="#ffffff"
                                      onPress={() => global.ShowHelpForgotPassword()}
                                  />
                              )})}
            />
        </Stack.Navigator>
    );
}
