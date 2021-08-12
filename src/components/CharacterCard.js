import React, {useContext, useEffect, useRef, useState} from 'react';
import {Image, StyleSheet, View, Dimensions} from 'react-native';
import {IconButton, Surface, TextInput, Text, Dialog, Portal, Button, Provider} from 'react-native-paper';
import 'firebase/firestore';
import firebase from 'firebase';
import 'firebase/auth';
// import ModalDropdown from "react-native-modal-dropdown";
// import {AuthUserContext} from "../navigation/AuthUserProvider";

global.screenWidth = Dimensions.get("window").width;
global.screenHeight = Dimensions.get("window").height;

export default function CharacterCard({
                                          character, index,
                                          onChange,
                                          groupRef,
                                          navigation,
                                      }) {
    const [characterData, setCharacterData] = useState([]);

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
                            placeholder={"Enter name..."}
                            onChangeText={(text) => {
                                onChange(index, 'name', text, false);
                                updateCharacter();
                            }
                            }
                        />
                        <TextInput
                            label="Race"
                            style={styles.stringContainer}
                            value={character.char_race}
                            placeholder={"Enter race..."}
                            onChangeText={
                                (text) =>  {
                                    onChange(index, 'char_race', text, false);
                                    updateCharacter();
                                }
                            }
                        />
                        <TextInput
                            label="Class"
                            style={styles.stringContainer}
                            value={character.char_class}
                            placeholder={"Enter class..."}
                            onChangeText={(text) => {
                                onChange(index, 'char_class', text, false);
                                updateCharacter();
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
                            placeholder={"Enter alignment..."}
                            value={character.alignment}
                            onChangeText={(text) => {
                                onChange(index, 'alignment', text, false);
                                updateCharacter();
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
                                    navigation.navigate('CharacterSheet', {
                                        screen: 'Main',
                                        params: {
                                            charRef: groupRef.collection('characters').doc(character._id),
                                            character: character,
                                            charData: characterData,
                                            index: index,
                                            onFSChange: onChange,
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
        width: global.screenWidth * 0.0750187546886722,
        height: global.screenWidth * 0.0750187546886722,
        position: 'absolute',
        left: global.screenWidth * 0.56639,
        top: global.screenHeight * 0.0132978723404255,
    },
    levelContainer: {
        width: global.screenWidth * 0.082521,
        height: 63,
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
        marginTop: global.screenHeight * 0.0186170212765957,
        marginLeft: global.screenWidth * 0.00750000001875,
    },
    intContainer: {
        marginBottom: screenHeight * 0.0026595744680851,
        marginTop: screenHeight * 0.0026595744680851,
        marginLeft: screenWidth * 0.0015003750937734,
        marginRight: screenWidth * 0.0015003750937734,
        width: global.screenWidth * 0.08402,
        height: 63,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif'
    },
    abilityScoresContainer: {
        marginBottom: screenHeight * 0.0026595744680851,
        marginTop: screenHeight * 0.0026595744680851,
        marginLeft: screenWidth * 0.0015003750937734,
        marginRight: screenWidth * 0.0015003750937734,
        width: global.screenWidth * 0.06601,
        height: 63,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif'
    },
    bottomrowIntContainer: {
        marginBottom: screenHeight * 0.0026595744680851,
        marginTop: screenHeight * 0.0026595744680851,
        marginLeft: screenWidth * 0.0015003750937734,
        marginRight: screenWidth * 0.0015003750937734,
        width: global.screenWidth * 0.06527,
        height: 63,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif'
    },
    stringContainer: {
        marginBottom: screenHeight * 0.0026595744680851,
        marginTop: screenHeight * 0.0026595744680851,
        marginLeft: screenWidth * 0.0015003750937734,
        marginRight: screenWidth * 0.0015003750937734,
        width: global.screenWidth * 0.152295,
        height: 63,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif'
    },
    surface: {
        elevation: 4,
        margin: 5,
    }

})
