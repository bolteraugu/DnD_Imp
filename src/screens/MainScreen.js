import React, {useContext, useEffect, useState} from 'react'; //Will need react
import {Image, StyleSheet, View} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import firebase from "firebase";
import {AuthUserContext} from "../navigation/AuthUserProvider";
import {TextInput, Text, Button} from "react-native-paper"; //Probably will need text...

export default function MainScreen({route}) {
    const charRef = route.params.charRef;

    function updateCharacter(fieldName, value) {
        if (fieldName === 'strength') {
            charRef
                .update({
                    strength: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
    }

    return (
        <View>
            <View style = {styles.imageAndAbilitiesContainer}>
                <Image
                    source={require('./../../assets/default_character.png')}
                    style = {styles.charImage}
                />
                <Button
                    mode="contained"
                    style={styles.changeImageStyle}
                    // onPress={() =>
                    //
                    // }
                >
                    Change Image
                </Button>
                <View style = {styles.abilityScoresContainer}>
                    <View style = {styles.firstHalfAS}>
                        <View>
                            <TextInput
                                style={styles.abilityScoresStyle}
                                keyboardType="number-pad"
                                defaultValue={String(route.params.charData['strength'])}
                                onChangeText={(text) => {
                                    updateCharacter('strength', text);
                                }}
                            />
                            <Text
                                style = {styles.textInputHeading}
                            >
                                Strength
                            </Text>
                        </View>
                        <View>
                            <TextInput
                                style={styles.abilityScoresStyle}
                                keyboardType="number-pad"
                                defaultValue={String(route.params.charData['constitution'])}
                                onChangeText={(text) => {
                                    updateCharacter('constitution', text);
                                }}
                            />
                            <Text
                                style = {styles.textInputHeading}
                            >
                                Constitution
                            </Text>
                        </View>
                        <View>
                            <TextInput
                                style={styles.abilityScoresStyle}
                                keyboardType="number-pad"
                                defaultValue={String(route.params.charData['wisdom'])}
                                onChangeText={(text) => {
                                    updateCharacter('wisdom', text);
                                }}
                            />
                            <Text
                                style = {styles.textInputHeading}
                            >
                                Wisdom
                            </Text>
                        </View>
                    </View>
                    <View style = {styles.secondHalfAS}>
                        <View>
                            <TextInput
                                style={styles.abilityScoresStyle}
                                keyboardType="number-pad"
                                defaultValue={String(route.params.charData['dexterity'])}
                                onChangeText={(text) => {
                                    updateCharacter('dexterity', text);
                                }}
                            />
                            <Text
                                style = {styles.textInputHeading}
                            >
                                Dexterity
                            </Text>
                        </View>
                        <View>
                            <TextInput
                                style={styles.abilityScoresStyle}
                                keyboardType="number-pad"
                                defaultValue={String(route.params.charData['intelligence'])}
                                onChangeText={(text) => {
                                    updateCharacter('intelligence', text);
                                }}
                            />
                            <Text
                                style = {styles.textInputHeading}
                            >
                                Intelligence
                            </Text>
                        </View>
                        <View>
                            <TextInput
                                style={styles.abilityScoresStyle}
                                keyboardType="number-pad"
                                defaultValue={String(route.params.charData['charisma'])}
                                onChangeText={(text) => {
                                    updateCharacter('charisma', text);
                                }}
                            />
                            <Text
                                style = {styles.textInputHeading}
                            >
                                Charisma
                            </Text>
                        </View>
                    </View>
                </View>
                <View>
                    <TextInput
                        style={styles.proficiencyStyle}
                        keyboardType="number-pad"
                        defaultValue={String(route.params.charData['proficiency'])}
                        onChangeText={(text) => {
                            updateCharacter('charisma', text);
                        }}
                    />
                    <Text
                        style = {styles.profInputHeading}
                    >
                        Proficiency Bonus
                    </Text>
                </View>
            </View>
            <View style = {styles.topRow}>
                <View>
                    <TextInput
                        style={styles.nameRaceClass}
                        defaultValue={route.params.charData['name']}
                        onChangeText={(text) => {
                            updateCharacter('name', text);
                        }}
                    />
                    <Text
                        style = {styles.nameRaceClassHeading}
                    >
                        Name
                    </Text>
                </View>
                <View>
                    <TextInput
                        style={styles.nameRaceClass}
                        defaultValue={route.params.charData['char_race']}
                        onChangeText={(text) => {
                            updateCharacter('char_race', text);
                        }}
                    />
                    <Text
                        style = {styles.nameRaceClassHeading}
                    >
                        Race
                    </Text>
                </View>
                <View>
                    <TextInput
                        style={styles.nameRaceClass}
                        defaultValue={route.params.charData['char_class']}
                        onChangeText={(text) => {
                            updateCharacter('char_class', text);
                        }}
                    />
                    <Text
                        style = {styles.nameRaceClassHeading}
                    >
                        Class
                    </Text>
                </View>
                <View>
                    <TextInput
                        style={styles.levelCurrentHPHitDice}
                        keyboardType="number-pad"
                        defaultValue={String(route.params.charData['level'])}
                        onChangeText={(text) => {
                            updateCharacter('level', text);
                        }}
                    />
                    <Text
                        style = {styles.levelCurrentHPHitDiceHeading}
                    >
                        Level
                    </Text>
                </View>
                <View>
                    <TextInput
                        style={styles.levelCurrentHPHitDice}
                        keyboardType="number-pad"
                        defaultValue={String(route.params.charData['current_hp'])}
                        onChangeText={(text) => {
                            updateCharacter('current_hp', text);
                        }}
                    />
                    <Text
                        style = {styles.levelCurrentHPHitDiceHeading}
                    >
                        Current HP
                    </Text>
                </View>
                <View>
                    <TextInput
                        style={styles.levelCurrentHPHitDice}
                        defaultValue={route.params.charData['hit_dice']}
                        onChangeText={(text) => {
                            updateCharacter('hit_dice', text);
                        }}
                    />
                    <Text
                        style = {styles.levelCurrentHPHitDiceHeading}
                    >
                        Hit Dice
                    </Text>
                </View>
            </View>
                <View style = {styles.secondRowFirstHalf}>
                    <View>
                        <TextInput
                            style={styles.levelCurrentHPHitDice}
                            keyboardType="number-pad"
                            defaultValue={String(route.params.charData['armor_class'])}
                            onChangeText={(text) => {
                                updateCharacter('armor_class', text);
                            }}
                        />
                        <Text
                            style = {styles.levelCurrentHPHitDiceHeading}
                        >
                            Armor Class
                        </Text>
                    </View>
                    <View>
                        <TextInput
                            style={styles.levelCurrentHPHitDice}
                            keyboardType="number-pad"
                            defaultValue={String(route.params.charData['initiative'])}
                            onChangeText={(text) => {
                                updateCharacter('initiative', text);
                            }}
                        />
                        <Text
                            style = {styles.levelCurrentHPHitDiceHeading}
                        >
                            Initiative
                        </Text>
                    </View>
                    <View>
                        <TextInput
                            style={styles.levelCurrentHPHitDice}
                            keyboardType="number-pad"
                            defaultValue={String(route.params.charData['speed'])}
                            onChangeText={(text) => {
                                updateCharacter('speed', text);
                            }}
                        />
                        <Text
                            style = {styles.levelCurrentHPHitDiceHeading}
                        >
                            Speed
                        </Text>
                    </View>
                    <View>
                        <TextInput
                            style= {styles.nameRaceClass}
                            defaultValue={route.params.charData['alignment']}
                            onChangeText={(text) => {
                                updateCharacter('alignment', text);
                            }}
                        />
                        <Text
                            style = {styles.nameRaceClassHeading}
                        >
                            Alignment
                        </Text>
                    </View>
                </View>
                <View style = {styles.secondRowSecondHalf}>
                    <View style = {styles.passiveSkills}>

                    </View>
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
    passiveSkills: {

    },
    nameRaceClass: {
        marginBottom: 10,
        marginLeft: 10,
        width: 235,
        height: 47,
        textAlign: "center",
        paddingTop: 20
    },
    secondRowFirstHalf: {
        height: 100,
        flexDirection: "row",
        width: 1000,
        position: 'absolute',
        top: 87,
        left: 210
    },
    secondRowSecondHalf: {
        height: 200,
        flexDirection: "row",
        width: 1000,
        position: 'absolute',
        top: 87,
        left: 210
    },
    nameRaceClassHeading: {
        position: "absolute",
        left: 10,
        top: 5,
        width: 235,
        textAlign: "center",
        color: "#0038d4"
    },
    levelCurrentHPHitDice: {
        marginBottom: 10,
        marginLeft: 10,
        width: 115,
        height: 47,
        textAlign: "center",
        paddingTop: 20
    },
    levelCurrentHPHitDiceHeading: {
        position: "absolute",
        left: 10,
        top: 5,
        width: 115,
        textAlign: "center",
        color: "#0038d4"
    },
    topRow: {
        flexDirection: "row",
        width: 1000,
        height: 67,
        position: 'absolute',
        top: 10,
        left: 210
    },
    textInputHeading: {
        position: "absolute",
        left: 10,
        top: 5,
        width: 95,
        textAlign: "center",
        color: "#0038d4"
    },
    profInputHeading: {
        position: "absolute",
        left: 10,
        top: 5,
        width: 200,
        textAlign: "center",
        color: "#0038d4"
    },
    charImage: {
        width: 200,
        height: 200,
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10
    },
    imageAndAbilitiesContainer: {
        flexDirection: "column",
        height: 1000,
        width: 250,
    },
    abilityScoresStyle: {
        marginBottom: 10,
        marginLeft: 10,
        width: 95,
        height: 62,
        textAlign: "center",
        paddingTop: 15
    },
    abilityScoresContainer: {
        flexDirection: "row"
    },
    firstHalfAS: {
        flexDirection: "column",
    },
    secondHalfAS: {
        flexDirection: "column"
    },
    proficiencyStyle: {
        marginBottom: 10,
        marginLeft: 10,
        width: 200,
        height: 62,
        textAlign: "center",
        paddingTop: 15
    },
    changeImageStyle: {
        marginBottom: 10,
        marginLeft: 10,
        width: 200
    }
})
