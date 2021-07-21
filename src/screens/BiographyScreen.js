import React from 'react'; //Will need react
import {Text, View} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown'; //Probably will need text...

//Not implemented. I will implement this. No way of currently navigating to this.
export default function BiographyScreen({route}) {
  return (
      <View>
        <Text>Hello</Text>
        <ModalDropdown
          options = {[
          'Dwarf', 'Elf', 'Halfling', 'Human', 'Dragonborn', 'Gnome', 'Half-Elf', 'Half-Orc', 'Tiefling'
        ]}
        />
      </View>
  );
  // TOP NESTED TAB NAVIGATION
  // MAIN | NOTES | SPELLS

  // MAIN SHOWS ALL CARD INFO IN A DIFF LAYOUT

  // NOTES IS SIMPLE TITLE,CONTENT FLATLIST WITH INPUT

  // CHAT SHOULD BE VISIBLE AT ALL TIMES
  // IDEALLY NOT HAVING TO BE RELOADED EACH TIME
}
