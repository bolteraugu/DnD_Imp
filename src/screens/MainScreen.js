import React, {useContext, useEffect, useState} from 'react'; //Will need react
import {Image, StyleSheet, Text, View} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import firebase from "firebase";
import {AuthUserContext} from "../navigation/AuthUserProvider";
import {TextInput} from "react-native-paper"; //Probably will need text...

export default function MainScreen({route}) {
    const charRef = route.params.params.charRef;
    console.log(charRef);
  return (
      <View>
        <View style = {styles.imageAndAbilitiesContainer}>
            <Image
                source={require('./../../assets/default_character.png')}
                style = {styles.charImage}
            />
            <TextInput
                label="Test"
                style={styles.bottomrowIntContainer}
                value={charRef}
                // onChangeText={(text) => {
                //     onChange(index, 'speed', text, false);
                //     updateCharacter();
                // }}
            />
        </View>
      </View>
  );
  // TOP NESTED TAB NAVIGATION
  // MAIN | NOTES | SPELLS

  // MAIN SHOWS ALL CARD INFO IN A DIFF LAYOUT

  // NOTES IS SIMPLE TITLE,CONTENT FLATLIST WITH INPUT

  // CHAT SHOULD BE VISIBLE AT ALL TIMES
  // IDEALLY NOT HAVING TO BE RELOADED EACH TIME
}
const styles = StyleSheet.create({
    charImage: {
        width: 200,
        height: 200,
        marginTop: 10,
        marginLeft: 10
    },
    imageAndAbilitiesContainer: {
        flexDirection: "column",
        height: 1000,
        width: 250
    }
})
