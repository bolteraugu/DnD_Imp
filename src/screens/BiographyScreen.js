import React, {useContext, useEffect, useState} from 'react'; //Will need react
import {StyleSheet, Text, View} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import firebase from "firebase";
import {AuthUserContext} from "../navigation/AuthUserProvider"; //Probably will need text...

//Not implemented. I will implement this. No way of currently navigating to this.
export default function BiographyScreen({route}) {
    const {user} = useContext(AuthUserContext);
    const [races, setRaces] = useState([]);
    const [classes, setClasses] = useState([]);
    useEffect( () => {
        getRacesAndClasses()
    }, [])

    function getRacesAndClasses() {
        firebase.firestore().collection('members').doc(user.toJSON().email).get().then((snapshot) => {
            let _nome = snapshot.get('races'); setRaces(_nome)
        })
        firebase.firestore().collection('members').doc(user.toJSON().email).onSnapshot( (snapshot) => {
            setClasses(snapshot.get('classes'))
        })
    }

  return (
      <View>
        <Text>Hello</Text>
          <ModalDropdown
              options = {races}
              style = {styles.totalDropdownStyle}
              defaultValue = {'Dwarf'}
              animated = {false}
              textStyle={styles.currentSelectedText}
              dropdownTextStyle={styles.dropdownText}
              dropdownStyle = {styles.dropdownStyle}
          />
          <ModalDropdown
              options = {classes}
              style = {styles.totalDropdownStyle}
              defaultValue = {'Dwarf'}
              textStyle={styles.currentSelectedText}
              dropdownTextStyle={styles.dropdownText}
              dropdownStyle = {styles.dropdownStyle}
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
const styles = StyleSheet.create({
    totalDropdownStyle: {
        marginTop: 31,
        marginLeft: 10,
        width: 140,
        height: 50
    },
    currentSelectedText: {
        fontSize: 16
    },
    dropdownText: {
        fontSize: 16
    },
    dropdownStyle: {
        borderWidth: 3,
        width: 140,
        marginTop: -17,
    }
})
