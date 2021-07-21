import React, {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton, Surface, TextInput} from 'react-native-paper';
import 'firebase/firestore';
import firebase from 'firebase';
import 'firebase/auth';
import ModalDropdown from "react-native-modal-dropdown";
import {AuthUserContext} from "../navigation/AuthUserProvider";

export default function CharacterCard({
  character,
  index,
  onChange,
  groupRef,
  navigation,
}) {
  const {user} = useContext(AuthUserContext);
  const [races, setRaces] = useState([]);
  function updateCharacter() {
    groupRef
      .collection('characters')
      .doc(character._id)
      .update(character)
      .then(console.log('Successfully updated character'), (error) =>
        console.log('Failed to update character: ' + error)
      );
  }

  function getRaces() {
    // firebase.firestore().collection('members').doc(user.toJSON().email).onSnapshot( (snapshot) => {
    //   let _nome = snapshot.get('races'); setRaces(_nome)
    // })
    // return races;
    firebase.firestore().collection('members').doc(user.toJSON().email).get().then((snapshot) => {
      let _nome = snapshot.get('races'); setRaces(_nome)
    })
    return races;
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
              onChangeText={(text) => onChange(index, 'name', text, false)}
            />
            <ModalDropdown
                options = {getRaces()}
                style = {styles.totalDropdownStyle}
                defaultValue = {character.char_race}
                textStyle={styles.currentSelectedText}
                dropdownTextStyle={styles.dropdownText}
                dropdownStyle = {styles.dropdownStyle}
            />
            <ModalDropdown
                options = {[
                  'Dwarf', 'Elf', 'Halfling', 'Human', 'Dragonborn', 'Gnome', 'Half-Elf', 'Half-Orc', 'Tiefling'
                ]}
                style = {styles.totalDropdownStyle}
                defaultValue = {character.char_class}
                textStyle={styles.currentSelectedText}
                dropdownTextStyle={styles.dropdownText}
                dropdownStyle = {styles.dropdownStyle}
            />
            {/*<TextInput*/}
            {/*  label="Alignment"*/}
            {/*  style={styles.stringContainer}*/}
            {/*  value={character.alignment}*/}
            {/*  onChangeText={(text) => onChange(index, 'alignment', text, false)}*/}
            {/*/>*/}
            <TextInput
              label="Temp HP"
              keyboardType="number-pad"
              style={styles.intContainer}
              value={String(character.current_hp)}
              onChangeText={(text) => onChange(index, 'current_hp', text, true)}
            />
            <TextInput
              label="Actual HP"
              keyboardType="number-pad"
              style={styles.intContainer}
              value={String(character.actual_hp)}
              onChangeText={(text) => onChange(index, 'actual_hp', text, true)}
            />
          </View>

          <View style={styles.cardRow}>
            <TextInput
              label="STR"
              keyboardType="number-pad"
              style={styles.intContainer}
              value={String(character.strength)}
              onChangeText={(text) => onChange(index, 'strength', text, true)}
            />
            <TextInput
              label="CON"
              keyboardType="number-pad"
              style={styles.intContainer}
              value={String(character.constitution)}
              onChangeText={(text) =>
                onChange(index, 'constitution', text, true)
              }
            />
            <TextInput
              label="DEX"
              keyboardType="number-pad"
              style={styles.intContainer}
              value={String(character.dexterity)}
              onChangeText={(text) => onChange(index, 'dexterity', text, true)}
            />
            <TextInput
              label="INT"
              keyboardType="number-pad"
              style={styles.intContainer}
              value={String(character.intelligence)}
              onChangeText={(text) =>
                onChange(index, 'intelligence', text, true)
              }
            />
            <TextInput
              label="WIS"
              keyboardType="number-pad"
              style={styles.intContainer}
              value={String(character.wisdom)}
              onChangeText={(text) => onChange(index, 'wisdom', text, true)}
            />
            <TextInput
              label="CHA"
              keyboardType="number-pad"
              style={styles.intContainer}
              value={String(character.charisma)}
              onChangeText={(text) => onChange(index, 'charisma', text, true)}
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
                onChange(index, 'proficiency', text, true)
              }
            />
            <TextInput
              label="SPD (ft)"
              keyboardType="number-pad"
              style={styles.intContainer}
              value={String(character.speed)}
              onChangeText={(text) => onChange(index, 'speed', text, true)}
            />
          </View>
          <View style={styles.cardRow}>
            <TextInput
              label="INIT"
              keyboardType="number-pad"
              style={styles.intContainer}
              value={String(character.initiative)}
              onChangeText={(text) => onChange(index, 'initiative', text, true)}
            />
            <TextInput
              label="AC"
              keyboardType="number-pad"
              style={styles.intContainer}
              value={String(character.armor)}
              onChangeText={(text) => onChange(index, 'armor', text, true)}
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
  totalDropdownStyle: {
    marginTop: 31,
    marginLeft: 10,
    width: 140,
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
  },
  stringContainer: {
    margin: 2,
    width: 200,
  },
  surface: {
    elevation: 4,
    margin: 5,
  },
});
