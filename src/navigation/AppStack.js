import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View} from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';
import MenuScreen from '../screens/MenuScreen';
import DMScreen from '../screens/DMScreen';
import {IconButton} from 'react-native-paper';
import {logout} from '../components/Firebase/firebase';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Chat from '../components/Chat';
import {StyleSheet} from 'react-native';
import colors from '../utils/colors';
import MainScreen from "../screens/MainScreen";
const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator
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
      <Stack.Screen
        name="Home"
        component={MenuScreen}
        options={() => ({
          // eslint-disable-next-line react/display-name
          headerRight: () => (
            <IconButton
              icon="logout-variant"
              size={28}
              color="#ffffff"
              onPress={() => logout()}
            />
          ),
        })}
      />

      <Stack.Screen
        name="DM"
        component={DMScreen}
        options={({route}) => ({
          title: route.params.group.name,
        })}
      />
      <Stack.Screen name="CharacterSheet" component={CharacterNav}
                    options={{
                        title: "Full Character Sheet",
                    }}
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: colors.primary,
                            height: 70
                        }
                    }}
      />
    </Stack.Navigator>
  );
}

const Tab = createMaterialTopTabNavigator();

function CharacterNav() {
  // const groupRef = firebase
  //   .firestore()
  //   .collection('groups')
  //   .doc('RElb1Yxu6g7cyq1745wh');
  return (
    <View style={styles.playerScreenContainer}>
      <View style={styles.playerTabsContainer}>
        <Tab.Navigator
          backBehavior="none"
          tabBarOptions={{
            style: {backgroundColor: colors.lightGrey},
          }}
        >
          <Tab.Screen name="Main" component={MainScreen} />
        </Tab.Navigator>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chatContainer: {flex: 1},
  playerScreenContainer: {
    flexDirection: 'row',
    height: '100%',
  },
  playerTabsContainer: {flex: 3},
});
