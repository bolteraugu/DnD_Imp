import React, {useContext, useEffect, useRef, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {IconButton, Surface, TextInput, Text, Dialog, Portal, Button, Provider} from 'react-native-paper';
import 'firebase/firestore';
import firebase from 'firebase';
import 'firebase/auth';
import ModalDropdown from "react-native-modal-dropdown";
import {AuthUserContext} from "../navigation/AuthUserProvider";

export default function CharacterCard({
  character, characterIndex,
  onChange,
    onRacePopUp,
  groupRef,
  navigation,
}) {
  const {user} = useContext(AuthUserContext);
  const [races, setRaces] = useState([]);
  const [classes, setClasses] = useState([]);
  const [numRaces, setNumRaces] = useState([]);
  const [numClasses, setNumClasses] = useState([]);

  useEffect( () => {
    getRacesAndClasses()
  }, [])

  function updateCharacter() {
    groupRef
      .collection('characters')
      .doc(character._id)
      .update(character)
      .then(console.log('Successfully updated character'), (error) =>
        console.log('Failed to update character: ' + error)
      );
  }

  function getRacesAndClasses() {
    firebase.firestore().collection('members').doc(user.toJSON().email).onSnapshot( (snapshot) => {
      let racesTemp = snapshot.get('races');
      let classesTemp = snapshot.get('classes');
      racesTemp.push("Create new    +");
      classesTemp.push("Create new    +");
      setRaces(racesTemp);
      setClasses(classesTemp);
      setNumRaces(snapshot.get('numRacesCreated'));
      setNumClasses(snapshot.get('numClassesCreated'));
    })
  }

  function deleteCharacter() {
    groupRef
      .collection('characters')
      .doc(character._id)
      .delete()
      .then(console.log('Successfully deleted character'), (error) =>
        console.log('Failed to delete character: ' + error)
      );
  }

  return (
    <Surface style={styles.surface}>
      <View style={styles.cardContainer}>
        <View>
          <View style={styles.cardRow}>
            <TextInput
              label="Name"
              style={styles.stringContainer}
              value={character.name}
              onChangeText={(text) => onChange(characterIndex, 'name', text, false)}
            />
            <ModalDropdown
                options = {races}
                style = {styles.totalDropdownRaceStyle}
                defaultValue = {character.char_race}
                // renderRightComponent={ () => (
                //       <IconButton
                //           icon="plus"
                //           style = {styles.plusIcon}
                //           size={28}
                //           color="#32a67d"
                //       />
                // )}
                onSelect = {(index, value) => {
                  if (index === 9 + numRaces) {
                    onRacePopUp(characterIndex)
                    
                  }
                  else {
                    onChange(characterIndex, 'char_race', value.text, false)
                  }
                }}
                textStyle={styles.currentSelectedText}
                dropdownTextStyle={styles.dropdownText}
                dropdownStyle = {styles.dropdownStyle}
            />
            <Text
                style={styles.raceLabel}
            >
              Race (dropdown)
            </Text>
            <ModalDropdown
                options = {classes}
                style = {styles.totalDropdownClassStyle}
                defaultValue = {character.char_class}
                // renderRightComponent={ () => (
                //       <IconButton
                //           icon="plus"
                //           style = {styles.plusIcon}
                //           size={28}
                //           color="#32a67d"
                //       />
                // )}
                textStyle={styles.currentSelectedText}
                dropdownTextStyle={styles.dropdownText}
                dropdownStyle = {styles.dropdownStyle}
            />
            <Text
                style={styles.classLabel}
            >
              Class (dropdown)
            </Text>
            {/*<TextInput*/}
            {/*  label="Alignment"*/}
            {/*  style={styles.stringContainer}*/}
            {/*  value={character.alignment}*/}
            {/*  onChangeText={(text) => onChange(characterIndex, 'alignment', text, false)}*/}
            {/*/>*/}
            <TextInput
              label="Temp HP"
              keyboardType="number-pad"
              style={styles.intContainer}
              value={String(character.current_hp)}
              onChangeText={(text) => onChange(characterIndex, 'current_hp', text, true)}
            />
            <TextInput
              label="Actual HP"
              keyboardType="number-pad"
              style={styles.intContainer}
              value={String(character.actual_hp)}
              onChangeText={(text) => onChange(characterIndex, 'actual_hp', text, true)}
            />
          </View>

          <View style={styles.cardRow}>
            <TextInput
              label="STR"
              keyboardType="number-pad"
              style={styles.intContainer}
              value={String(character.strength)}
              onChangeText={(text) => onChange(characterIndex, 'strength', text, true)}
            />
            <TextInput
              label="CON"
              keyboardType="number-pad"
              style={styles.intContainer}
              value={String(character.constitution)}
              onChangeText={(text) =>
                onChange(characterIndex, 'constitution', text, true)
              }
            />
            <TextInput
              label="DEX"
              keyboardType="number-pad"
              style={styles.intContainer}
              value={String(character.dexterity)}
              onChangeText={(text) => onChange(characterIndex, 'dexterity', text, true)}
            />
            <TextInput
              label="INT"
              keyboardType="number-pad"
              style={styles.intContainer}
              value={String(character.intelligence)}
              onChangeText={(text) =>
                onChange(characterIndex, 'intelligence', text, true)
              }
            />
            <TextInput
              label="WIS"
              keyboardType="number-pad"
              style={styles.intContainer}
              value={String(character.wisdom)}
              onChangeText={(text) => onChange(characterIndex, 'wisdom', text, true)}
            />
            <TextInput
              label="CHA"
              keyboardType="number-pad"
              style={styles.intContainer}
              value={String(character.charisma)}
              onChangeText={(text) => onChange(characterIndex, 'charisma', text, true)}
            />
          </View>
        </View>
        <View>
          <View style={styles.cardRow}>
            <TextInput
              label="PROF"
              keyboardType="number-pad"
              style={styles.intContainer}
              value={String(character.proficiency)}
              onChangeText={(text) =>
                onChange(characterIndex, 'proficiency', text, true)
              }
            />
            <TextInput
              label="SPD (ft)"
              keyboardType="number-pad"
              style={styles.intContainer}
              value={String(character.speed)}
              onChangeText={(text) => onChange(characterIndex, 'speed', text, true)}
            />
          </View>
          <View style={styles.cardRow}>
            <TextInput
              label="INIT"
              keyboardType="number-pad"
              style={styles.intContainer}
              value={String(character.initiative)}
              onChangeText={(text) => onChange(characterIndex, 'initiative', text, true)}
            />
            <TextInput
              label="AC"
              keyboardType="number-pad"
              style={styles.intContainer}
              value={String(character.armor)}
              onChangeText={(text) => onChange(characterIndex, 'armor', text, true)}
            />
          </View>
        </View>
        <View>
          <View style={styles.cardRow}>
            <IconButton
              icon="cloud-upload"
              size={28}
              color="#000"
              onPress={updateCharacter} //Send character state to firebase
            />
            <IconButton
              icon="delete"
              size={28}
              color="#000"
              onPress={deleteCharacter} //delete this character
            />
          </View>
          <IconButton
            icon="arrow-expand-all"
            size={28}
            color="#000"
            //Navigates to playerScreen but then redirects to CharacterSheetScreen??? Strange. Will fix later.
            onPress={() => {
              navigation.navigate('CharacterSheet', {
                screen: 'Biography',
                params: {
                  charRef: groupRef.collection('characters').doc(character._id),
                },
              });
            }}
          />
        </View>
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  chevDown: {
    marginLeft: -14,
    marginTop: -3
  },
  plusIcon: {
    marginTop: -4,
    marginLeft: 38
  },
  iconGroup: {
    flexDirection: 'row'
  },

  raceLabel: {
    position: "absolute",
    left: 210,
    top: 3,
    color: "#787878",
    fontSize: 12.5,
    fontFamily: 'sans-serif',
    fontWeight: '200'
  },

  classLabel: {
    position: "absolute",
    left: 355,
    top: 3,
    color: "#787878",
    fontSize: 12.5,
    fontFamily: 'sans-serif',
    fontWeight: '200'
  },

  totalDropdownRaceStyle: {
    marginTop: 28,
    marginLeft: 3,
    width: 140,
    backgroundColor: "#e0e0de",
    height: 37.5,
    borderBottomWidth: 1.3,
    borderBottomColor: "#adadad",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    fontFamily: 'sans-serif'

  },
  totalDropdownClassStyle: {
    marginTop: 28,
    marginLeft: 5.5,
    width: 140,
    backgroundColor: "#e0e0de",
    height: 37.5,
    borderBottomWidth: 1.3,
    borderBottomColor: "#adadad",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    fontFamily: 'sans-serif'
  },
  currentSelectedText: {
    fontSize: 16,
    marginTop: 5,
    marginLeft: 10,
    fontFamily: 'sans-serif'
  },
  dropdownText: {
    fontSize: 16
  },
  dropdownStyle: {
    borderWidth: 2,
    borderColor: "#adadad",
    width: 140,
    marginTop: -18,
  },
  cardContainer: {
    flexDirection: 'row',
  },
  cardRow: {
    flexDirection: 'row',
  },
  intContainer: {
    margin: 2,
    width: 75,
    backgroundColor: "#e0e0de",
    fontFamily: 'sans-serif'
  },
  stringContainer: {
    margin: 2,
    width: 200,
    backgroundColor: "#e0e0de",
    fontFamily: 'sans-serif'
  },
  surface: {
    elevation: 4,
    margin: 5,
  }

});
