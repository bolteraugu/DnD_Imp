import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Dimensions, View} from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';
import MenuScreen from '../screens/MenuScreen';
import BiographyScreen from '../screens/BiographyScreen'
import InventoryScreen from '../screens/InventoryScreen'
import SpellsScreen from '../screens/SpellsScreen'
import DMScreen from '../screens/DMScreen';
import {IconButton} from 'react-native-paper';
import {logout} from '../components/Firebase/firebase';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Chat from '../components/Chat';
import {StyleSheet} from 'react-native';
import colors from '../utils/colors';
import MainScreen from "../screens/MainScreen";
import AddWeaponScreen from "../screens/AddWeaponScreen"
import AddArmorScreen from "../screens/AddArmorScreen"
import AddPossessionScreen from "../screens/AddPossessionScreen"
import AddSpellScreen from "../screens/AddSpellScreen"
import NotesScreen from "../screens/NotesScreen"
import ImageSelectorScreen from "../screens/ImageSelectorScreen"
import AddNotesScreenUnused from "../screens/AddNotesScreen(unused)"
import EditNotesScreen from "../screens/EditNotesScreen"
import ViewNotesScreen from "../screens/ViewNotesScreen"
import ViewNoteImagesScreen from "../screens/ViewNoteImagesScreen(unused)"
const Stack = createStackNavigator();

global.screenWidth = Dimensions.get("window").width;
global.screenHeight = Dimensions.get("window").height;

export default function AppStack({navigation}) {
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
              <View style = {{flexDirection: 'row'}}>
                  <IconButton
                      icon="help"
                      size={28}
                      color="#ffffff"
                      onPress={() => global.ShowHelpMenu()}
                  />
                    <IconButton
                      icon="logout-variant"
                      size={28}
                      color="#ffffff"
                      onPress={() => logout()}
                    />
              </View>
          ),
        })}
      />
      <Stack.Screen
        name="DM"
        component={DMScreen}
        options={({route}) => ({
          title: route.params.group.name,
            headerRight: () => (
                <View style = {styles.horzRow}>
                    <IconButton
                        icon="help"
                        size={28}
                        color="#ffffff"
                        onPress={() => {
                            global.ShowHelpDM();
                        }}
                    />
                    <IconButton
                        icon="note-multiple"
                        size={28}
                        color="#ffffff"
                        onPress={() => {
                            global.navigateToNotes();
                        }}
                    />
                    <IconButton
                        icon="cog"
                        size={28}
                        color="#ffffff"
                        onPress={() => {
                            global.showSettingsDialog()
                        }}
                    />
                </View>
            )
        })}
      />
      <Stack.Screen name="CharacterSheet" component={CharacterNav}
                    options={() => ({
                        title: "Full Character Sheet",
                        headerRight: () => (
                            <IconButton
                                icon="help"
                                size={28}
                                color="#ffffff"
                                onPress={() => global.ShowHelpCharacterSheet()}
                            />
                        )}
                    )}
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: colors.primary
                        }
                    }}

      />
        <Stack.Screen name="ImageSelector" component={ImageSelectorScreen}
                      options={() => ({
                              title: "Image Selector",
                              headerRight: () => (
                                  <IconButton
                                      icon="help"
                                      size={28}
                                      color="#ffffff"
                                      onPress={() => global.ShowHelpImageSelector()}
                                  />
                              )}
                      )}
        />
        <Stack.Screen name="Notes" component={NotesScreen}
                      options={() => ({
                              title: "Notes",
                              headerRight: () => (
                                  <IconButton
                                      icon="help"
                                      size={28}
                                      color="#ffffff"
                                      onPress={() => global.ShowHelpNotes()}
                                  />
                              )}
                      )}
        />
        <Stack.Screen name="EditNote" component={EditNotesScreen}
                      options={({route}) => ({
                              title: "Edit " + route.params.note.title,
                              headerRight: () => (
                                  <IconButton
                                      icon="help"
                                      size={28}
                                      color="#ffffff"
                                      onPress={() => global.ShowHelpEditNotes()}
                                  />
                              )}
                      )}
        />
        <Stack.Screen name="ViewNote" component={ViewNotesScreen}
                      options={({route}) => ({
                              title: "View " + route.params.note.title,
                              headerRight: () => (
                                  <IconButton
                                      icon="help"
                                      size={28}
                                      color="#ffffff"
                                      onPress={() => global.ShowHelpViewNotes()}
                                  />
                              )}
                      )}
        />
        <Stack.Screen name="AddWeapon" component={AddWeaponScreen}
                      options={() => ({
                              title: "Add Weapon",
                              headerRight: () => (
                                  <IconButton
                                      icon="help"
                                      size={28}
                                      color="#ffffff"
                                      onPress={() => global.ShowHelpWeapon()}
                                  />
                              )}
                      )}
        />
        <Stack.Screen name="AddArmor" component={AddArmorScreen}
                      options={() => ({
                              title: "Add Armor",
                              headerRight: () => (
                                  <IconButton
                                      icon="help"
                                      size={28}
                                      color="#ffffff"
                                      onPress={() => global.ShowHelpArmor()}
                                  />
                              )}
                      )}
        />
        <Stack.Screen name="AddPossession" component={AddPossessionScreen}
                      options={() => ({
                              title: "Add Possession",
                              headerRight: () => (
                                  <IconButton
                                      icon="help"
                                      size={28}
                                      color="#ffffff"
                                      onPress={() => global.ShowHelpPossession()}
                                  />
                              )}
                      )}
        />
        <Stack.Screen name="AddSpell" component={AddSpellScreen}
                      options={() => ({
                              title: "Add Spell",
                              headerRight: () => (
                                  <IconButton
                                      icon="help"
                                      size={28}
                                      color="#ffffff"
                                      onPress={() => global.ShowHelpSpell()}
                                  />
                              )}
                      )}
        />
    </Stack.Navigator>
  );
}

const Tab = createMaterialTopTabNavigator();

function CharacterNav() {
  return (
    <View style={styles.playerScreenContainer}>
      <View style={styles.playerTabsContainer}>
        <Tab.Navigator
          backBehavior="none"
          tabBarOptions={{
            style: {backgroundColor: colors.lightGrey},
          }}
        >
          <Tab.Screen name="Main" component={MainScreen}/>
            <Tab.Screen name="Biography" component={BiographyScreen} />
            <Tab.Screen name="Inventory" component={InventoryScreen} />
            <Tab.Screen name="Spells" component={SpellsScreen} />
        </Tab.Navigator>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    horzRow: {
      flexDirection: 'row'
    },
  chatContainer: {flex: 1},
  playerScreenContainer: {
    flexDirection: 'row',
    height: '100%',
  },
  playerTabsContainer: {flex: 3},
});
