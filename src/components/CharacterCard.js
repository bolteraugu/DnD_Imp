import React, {useContext, useEffect, useRef, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {IconButton, Surface, TextInput, Text, Dialog, Portal, Button, Provider} from 'react-native-paper';
import 'firebase/firestore';
import firebase from 'firebase';
import 'firebase/auth';
// import ModalDropdown from "react-native-modal-dropdown";
// import {AuthUserContext} from "../navigation/AuthUserProvider";

export default function CharacterCard({
                                          character, index,
                                          onChange,
                                          //onRacePopUp,
                                          groupRef,
                                          navigation,
    group
                                      }) {
    // const {user} = useContext(AuthUserContext);
    const [characterData, setCharacterData] = useState([]);
    // const [classes, setClasses] = useState([]);
    // const [numRaces, setNumRaces] = useState([]);
    // const [numClasses, setNumClasses] = useState([]);

    // useEffect( () => {
    //   getRacesAndClasses()
    // }, [])

    useEffect(() => {
        getCharacter()
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

    // function getRacesAndClasses() {
    //   firebase.firestore().collection('members').doc(user.toJSON().email).onSnapshot( (snapshot) => {
    //     let racesTemp = snapshot.get('races');
    //     let classesTemp = snapshot.get('classes');
    //     racesTemp.push("Create new    +");
    //     classesTemp.push("Create new    +");
    //     setRaces(racesTemp);
    //     setClasses(classesTemp);
    //     setNumRaces(snapshot.get('numRacesCreated'));
    //     setNumClasses(snapshot.get('numClassesCreated'));
    //   })
    // }

    function getCharacter() {
        groupRef.collection('characters').doc(character._id).get().then( (snapshot) => {
            setCharacterData(snapshot.data())
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
                            onChangeText={(text) => {
                                onChange(index, 'name', text, false);
                                updateCharacter();
                                getCharacter()
                            }
                            }
                        />
                        {/*<ModalDropdown*/}
                        {/*    options = {races}*/}
                        {/*    style = {styles.totalDropdownRaceStyle}*/}
                        {/*    defaultValue = {character.char_race}*/}
                        {/*    // renderRightComponent={ () => (*/}
                        {/*    //       <IconButton*/}
                        {/*    //           icon="plus"*/}
                        {/*    //           style = {styles.plusIcon}*/}
                        {/*    //           size={28}*/}
                        {/*    //           color="#32a67d"*/}
                        {/*    //       />*/}
                        {/*    // )}*/}
                        {/*    onSelect = {(index, value) => {*/}
                        {/*      if (index === 9 + numRaces) {*/}
                        {/*        onRacePopUp(characterIndex)*/}
                        {/*        */}
                        {/*      }*/}
                        {/*      else {*/}
                        {/*        onChange(characterIndex, 'char_race', value.text, false)*/}
                        {/*      }*/}
                        {/*    }}*/}
                        {/*    textStyle={styles.currentSelectedText}*/}
                        {/*    dropdownTextStyle={styles.dropdownText}*/}
                        {/*    dropdownStyle = {styles.dropdownStyle}*/}
                        {/*/>*/}
                        {/*<Text*/}
                        {/*    style={styles.raceLabel}*/}
                        {/*>*/}
                        {/*  Race (dropdown)*/}
                        {/*</Text>*/}
                        {/*<ModalDropdown*/}
                        {/*    options = {classes}*/}
                        {/*    style = {styles.totalDropdownClassStyle}*/}
                        {/*    defaultValue = {character.char_class}*/}
                        {/*    // renderRightComponent={ () => (*/}
                        {/*    //       <IconButton*/}
                        {/*    //           icon="plus"*/}
                        {/*    //           style = {styles.plusIcon}*/}
                        {/*    //           size={28}*/}
                        {/*    //           color="#32a67d"*/}
                        {/*    //       />*/}
                        {/*    // )}*/}
                        {/*    textStyle={styles.currentSelectedText}*/}
                        {/*    dropdownTextStyle={styles.dropdownText}*/}
                        {/*    dropdownStyle = {styles.dropdownStyle}*/}
                        {/*/>*/}
                        {/*<Text*/}
                        {/*    style={styles.classLabel}*/}
                        {/*>*/}
                        {/*  Class (dropdown)*/}
                        {/*</Text>*/}
                        <TextInput
                            label="Race"
                            style={styles.stringContainer}
                            value={character.char_race}
                            onChangeText={
                                (text) =>  {
                                    onChange(index, 'char_race', text, false);
                                    updateCharacter();
                                    getCharacter()
                                }
                            }
                        />
                        <TextInput
                            label="Class"
                            style={styles.stringContainer}
                            value={character.char_class}
                            onChangeText={(text) => {
                                onChange(index, 'char_class', text, false);
                                updateCharacter();
                                getCharacter()
                            }
                            }
                        />
                        <TextInput
                            label="Level"
                            keyboardType="number-pad"
                            style={styles.levelContainer}
                            value={String(character.level)}
                            onChangeText={(text) => {
                                onChange(index, 'level', text, true);
                                updateCharacter();
                                getCharacter()
                            }
                            }
                        />
                    </View>
                    <Image
                        source={require('./../../assets/default_character.png')}
                        style = {styles.charImage}
                    />
                    <View style={styles.cardRow}>
                        <TextInput
                            label="STR"
                            keyboardType="number-pad"
                            style={styles.abilityScoresContainer}
                            value={String(character.strength)}
                            onChangeText={(text) => {
                                onChange(index, 'strength', text, true);
                                updateCharacter();
                                getCharacter();
                            }
                            }
                        />
                        <TextInput
                            label="CON"
                            keyboardType="number-pad"
                            style={styles.abilityScoresContainer}
                            value={String(character.constitution)}
                            onChangeText={(text) => {
                                onChange(index, 'constitution', text, true);
                                updateCharacter();
                                getCharacter();
                            }
                            }
                        />
                        <TextInput
                            label="DEX"
                            keyboardType="number-pad"
                            style={styles.abilityScoresContainer}
                            value={String(character.dexterity)}
                            onChangeText={(text) => {
                                onChange(index, 'dexterity', text, true);
                                updateCharacter();
                                getCharacter();
                            }
                            }
                        />
                        <TextInput
                            label="INT"
                            keyboardType="number-pad"
                            style={styles.abilityScoresContainer}
                            value={String(character.intelligence)}
                            onChangeText={(text) => {
                                onChange(index, 'intelligence', text, true);
                                updateCharacter();
                                getCharacter();
                            }
                            }
                        />
                        <TextInput
                            label="WIS"
                            keyboardType="number-pad"
                            style={styles.abilityScoresContainer}
                            value={String(character.wisdom)}
                            onChangeText={(text) => {
                                onChange(index, 'wisdom', text, true);
                                updateCharacter();
                                getCharacter();
                            }
                            }
                        />
                        <TextInput
                            label="CHA"
                            keyboardType="number-pad"
                            style={styles.abilityScoresContainer}
                            value={String(character.charisma)}
                            onChangeText={(text) => {
                                onChange(index, 'charisma', text, true);
                                updateCharacter();
                                getCharacter();
                            }
                            }
                        />
                        <TextInput
                            label="PROF"
                            keyboardType="number-pad"
                            style={styles.abilityScoresContainer}
                            value={String(character.proficiency)}
                            onChangeText={(text) => {
                                onChange(index, 'proficiency', text, true);
                                updateCharacter();
                                getCharacter();
                            }
                            }
                        />
                        <TextInput
                            label="INIT"
                            keyboardType="number-pad"
                            style={styles.abilityScoresContainer}
                            value={String(character.initiative)}
                            onChangeText={(text) => {
                                onChange(index, 'initiative', text, true);
                                updateCharacter();
                                getCharacter();
                            }
                            }
                        />
                    </View>
                </View>
                <View>
                    <View style={styles.cardRow}>
                        <TextInput
                            label="Alignment"
                            style={styles.stringContainer}
                            value={character.alignment}
                            onChangeText={(text) => {
                                onChange(index, 'alignment', text, false);
                                updateCharacter();
                                getCharacter();
                            }
                            }
                        />
                        <TextInput
                            label="Max HP"
                            keyboardType="number-pad"
                            style={styles.intContainer}
                            value={String(character.max_hp)}
                            onChangeText={(text) => {
                                onChange(index, 'max_hp', text, true);
                                updateCharacter();
                                getCharacter();
                            }
                            }
                        />
                        <TextInput
                            label="Current HP"
                            keyboardType="number-pad"
                            style={styles.intContainer}
                            value={String(character.current_hp)}
                            onChangeText={(text) => {
                                onChange(index, 'current_hp', text, true);
                                updateCharacter();
                                getCharacter();
                            }
                            }
                        />
                        <TextInput
                            label="Temp HP"
                            keyboardType="number-pad"
                            style={styles.intContainer}
                            value={String(character.temp_hp)}
                            onChangeText={(text) => {
                                onChange(index, 'temp_hp', text, true);
                                updateCharacter();
                                getCharacter();
                            }
                            }
                        />
                        <TextInput
                            label="AC"
                            keyboardType="number-pad"
                            style={styles.bottomrowIntContainer}
                            value={String(character.armor_class)}
                            onChangeText={(text) => {
                                onChange(index, 'armor_class', text, true);
                                updateCharacter();
                                getCharacter();
                            }}
                        />
                        <TextInput
                            label="SPD"
                            keyboardType="number-pad"
                            style={styles.bottomrowIntContainer}
                            value={String(character.speed)}
                            onChangeText={(text) => {
                                onChange(index, 'speed', text, true);
                                updateCharacter();
                                getCharacter();
                            }}
                        />
                        <View style={styles.iconRow}>
                            {/*<IconButton*/}
                            {/*    icon="cloud-upload"*/}
                            {/*    size={28}*/}
                            {/*    color="#000"*/}
                            {/*    onPress={updateCharacter} //Send character state to firebase*/}
                            {/*/>*/}
                            <IconButton
                                icon="delete"
                                size={28}
                                color="#000"
                                onPress={deleteCharacter} //delete this character
                            />
                            <IconButton
                                icon="arrow-expand-all"
                                size={28}
                                color="#000"
                                //Navigates to playerScreen but then redirects to CharacterSheetScreen??? Strange. Will fix later.
                                onPress={async () => {
                                    await getCharacter();
                                    navigation.navigate('CharacterSheet', {
                                        screen: 'Main',
                                        params: {
                                            charRef: groupRef.collection('characters').doc(character._id),
                                            charData: characterData,
                                            onFSChange: (fieldName, fieldValue, isNumber) => onChange(index, fieldName, fieldValue, isNumber)
                                        },
                                    })
                                }}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </Surface>
    );
}

const styles = StyleSheet.create({
    charImage: {
        width: 100,
        height: 100,
        position: 'absolute',
        left: 755,
        top:10
    },
    levelContainer: {
        width: 110,
        margin: 2
    },
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
        flexDirection: 'column',
    },
    cardRow: {
        flexDirection: 'row',
    },
    iconRow: {
        flexDirection: 'row',
        marginTop: 14,
        marginLeft: 10
    },
    intContainer: {
        margin: 2,
        width: 112,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif'
    },
    abilityScoresContainer: {
        margin: 2,
        width: 88,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif'
    },
    bottomrowIntContainer: {
        margin: 2,
        width: 87,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif'
    },
    stringContainer: {
        margin: 2,
        width: 203,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif'
    },
    surface: {
        elevation: 4,
        margin: 5,
    }

});
