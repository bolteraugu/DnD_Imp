import React, {useContext, useEffect, useState} from 'react'; //Will need react
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import firebase from "firebase";
import {AuthUserContext} from "../navigation/AuthUserProvider";
import {TextInput, Text, Button} from "react-native-paper"; //Probably will need text...

export default function MainScreen({route, navigation}) {
    const charRef = route.params.charRef;
    const [charData, setCharData] = useState(route.params.charData);

    useEffect(() => {
        getCharacter();
    }, [])

    function getCharacter() {
        charRef.onSnapshot( (snapshot) => {
            setCharData(snapshot.data())
        })
    }

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
        else if (fieldName === 'DS_successCircle1') {
            charRef
                .update({
                    DS_successCircle1: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                )
        }
        else if (fieldName === 'DS_successCircle2') {
            charRef
                .update({
                    DS_successCircle2: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                )
        }
        else if (fieldName === 'DS_successCircle3') {
            charRef
                .update({
                    DS_successCircle3: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                )
        }
        else if (fieldName === 'DS_failureCircle1') {
            charRef
                .update({
                    DS_failureCircle1: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                )
        }
        else if (fieldName === 'DS_failureCircle2') {
            charRef
                .update({
                    DS_failureCircle2: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                )
        }
        else if (fieldName === 'DS_failureCircle3') {
            charRef
                .update({
                    DS_failureCircle3: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                )
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
                                defaultValue={String(charData['strength'])}
                                onChangeText={(text) => {
                                    updateCharacter('strength', text);
                                    getCharacter()
                                    route.params.onFSChange('strength', text, true);
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
                                defaultValue={String(charData['constitution'])}
                                onChangeText={(text) => {
                                    updateCharacter('constitution', text);
                                    getCharacter()
                                    route.params.onFSChange('strength', text, true);
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
                                defaultValue={String(charData['wisdom'])}
                                onChangeText={(text) => {
                                    updateCharacter('wisdom', text);
                                    getCharacter()
                                    route.params.onFSChange('strength', text, true);
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
                                defaultValue={String(charData['dexterity'])}
                                onChangeText={(text) => {
                                    updateCharacter('dexterity', text);
                                    getCharacter()
                                    route.params.onFSChange('strength', text, true);
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
                                defaultValue={String(charData['intelligence'])}
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
                                defaultValue={String(charData['charisma'])}
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
                        defaultValue={String(charData['proficiency'])}
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
                        defaultValue={charData['name']}
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
                        defaultValue={charData['char_race']}
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
                        defaultValue={charData['char_class']}
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
                        defaultValue={String(charData['level'])}
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
                        defaultValue={String(charData['current_hp'])}
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
                        defaultValue={charData['hit_dice']}
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
                            defaultValue={String(charData['armor_class'])}
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
                            defaultValue={String(charData['initiative'])}
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
                            defaultValue={String(charData['speed'])}
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
                            defaultValue={charData['alignment']}
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
                    <View style = {styles.passiveSkillsContainer}>
                        <Text
                            style = {styles.passiveSkillsHeading}
                        >
                            Passive Skills
                        </Text>
                        <View style = {styles.passiveSkills}>
                            <View>
                                <Text
                                    style = {styles.passiveInputsHeading}
                                >
                                    Passive WIS (Perception)
                                </Text>
                                <TextInput
                                    style={styles.passiveInputs}
                                    keyboardType="number-pad"
                                    defaultValue={String(charData['passive_perception'])}
                                    onChangeText={(text) => {
                                        updateCharacter('passive_perception', text);
                                    }}
                                />
                            </View>
                            <View>
                                <Text
                                    style = {styles.passiveInputsHeading}
                                >
                                    Passive INT (Investigation)
                                </Text>
                                <TextInput
                                    style={styles.passiveInputs}
                                    keyboardType="number-pad"
                                    defaultValue={String(charData['passive_investigation'])}
                                    onChangeText={(text) => {
                                        updateCharacter('passive_investigation', text);
                                    }}
                                />
                            </View>
                            <View>
                                <Text
                                    style = {styles.passiveInputsHeading}
                                >
                                    Passive WIS (Insight)
                                </Text>
                                <TextInput
                                    style={styles.passiveInputs}
                                    keyboardType="number-pad"
                                    defaultValue={String(charData['passive_insight'])}
                                    onChangeText={(text) => {
                                        updateCharacter('passive_insight', text);
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                    <View style = {styles.HPContainer}>
                        <View>
                            <TextInput
                                style={styles.levelCurrentHPHitDice}
                                keyboardType="number-pad"
                                defaultValue={String(charData['max_hp'])}
                                onChangeText={(text) => {
                                    updateCharacter('max_hp', text);
                                }}
                            />
                            <Text
                                style = {styles.levelCurrentHPHitDiceHeading}
                            >
                                Max HP
                            </Text>
                        </View>
                        <View>
                            <TextInput
                                style={styles.levelCurrentHPHitDice}
                                keyboardType="number-pad"
                                defaultValue={String(charData['temp_hp'])}
                                onChangeText={(text) => {
                                    updateCharacter('temp_hp', text);
                                }}
                            />
                            <Text
                                style = {styles.levelCurrentHPHitDiceHeading}
                            >
                                Temporary HP
                            </Text>
                        </View>
                    </View>
                    <View style = {styles.deathSavesContainer}>
                        <Text
                            style = {styles.deathSavesHeading}
                        >
                            Death Saves
                        </Text>
                        <View style = {styles.passiveSkills}>
                            <View>
                                <Text
                                    style = {styles.deathSavesSubHeading}
                                >
                                    Successes
                                </Text>
                                <View style = {styles.circlesContainer}>
                                    <View style = {styles.circleContainer}>
                                        <TouchableOpacity
                                            style = {{
                                                width: 27,
                                                height: 27,
                                                borderWidth: 1,
                                                backgroundColor: charData['DS_successCircle1'],
                                                borderRadius: 54,
                                            }}
                                            onPress = {() => {
                                                if (charData['DS_successCircle1'] === "#00db79") {
                                                    updateCharacter('DS_successCircle1', "#ffffff");
                                                    getCharacter();
                                                    route.params.onFSChange('DS_successCircle1', "#ffffff", true);
                                                } else {
                                                    updateCharacter('DS_successCircle1', "#00db79")
                                                    getCharacter();
                                                    route.params.onFSChange('DS_successCircle1', "#00db79", true);

                                                }
                                            }}
                                        />
                                        <View
                                            style = {styles.line}
                                        />
                                    </View>
                                    <View style = {styles.circleContainer2}>
                                        <TouchableOpacity
                                            style = {{
                                                width: 27,
                                                height: 27,
                                                borderWidth: 1,
                                                backgroundColor: charData['DS_successCircle2'],
                                                borderRadius: 54,
                                            }}
                                            onPress = {() => {
                                                if (charData['DS_successCircle2'] === "#00db79") {
                                                    updateCharacter('DS_successCircle2', "#ffffff")
                                                    getCharacter();
                                                    route.params.onFSChange('DS_successCircle2', "#ffffff", true);
                                                }
                                                else {
                                                    updateCharacter('DS_successCircle2', "#00db79")
                                                    getCharacter();
                                                    route.params.onFSChange('DS_successCircle2', "#00db79", true);
                                                }
                                            }}
                                        />
                                        <View
                                            style = {styles.line}
                                        />
                                    </View>
                                    <TouchableOpacity
                                        style = {{
                                            width: 27,
                                            height: 27,
                                            borderWidth: 1,
                                            backgroundColor: charData['DS_successCircle3'],
                                            borderRadius: 54,
                                        }}
                                        onPress = {() => {
                                            if (charData['DS_successCircle3'] === "#00db79") {
                                                updateCharacter('DS_successCircle3', "#ffffff")
                                                getCharacter();
                                                route.params.onFSChange('DS_successCircle3', "#ffffff", true);
                                            }
                                            else {
                                                updateCharacter('DS_successCircle3', "#00db79")
                                                getCharacter();
                                                route.params.onFSChange('DS_successCircle3', "#00db79", true);
                                            }
                                        }}
                                    />
                                </View>
                            </View>
                            <View>
                                <Text
                                    style = {styles.deathSavesSubHeading}
                                >
                                    Failures
                                </Text>
                                <View style = {styles.circlesContainer}>
                                    <View style = {styles.circleContainer}>
                                        <TouchableOpacity
                                            style = {{
                                                width: 27,
                                                height: 27,
                                                borderWidth: 1,
                                                backgroundColor: charData['DS_failureCircle1'],
                                                borderRadius: 54,
                                            }}
                                            onPress = {() => {
                                                if (charData['DS_failureCircle1'] === "#f51b1b") {
                                                    updateCharacter('DS_failureCircle1', "#ffffff");
                                                    getCharacter();
                                                    route.params.onFSChange('DS_failuresCircle1', "#ffffff", true);
                                                }
                                                else {
                                                    updateCharacter('DS_failureCircle1', "#f51b1b");
                                                    getCharacter();
                                                    route.params.onFSChange('DS_failuresCircle1', "#f51b1b", true);
                                                }
                                            }}
                                        />
                                        <View
                                            style = {styles.line}
                                        />
                                    </View>
                                    <View style = {styles.circleContainer2}>
                                        <TouchableOpacity
                                            style = {{
                                                width: 27,
                                                height: 27,
                                                borderWidth: 1,
                                                backgroundColor: charData['DS_failureCircle2'],
                                                borderRadius: 54,
                                            }}
                                            onPress = {() => {
                                                if (charData['DS_failureCircle2'] === "#f51b1b") {
                                                    updateCharacter('DS_failureCircle2',"#ffffff");
                                                    getCharacter();
                                                    route.params.onFSChange('DS_failuresCircle2', "#ffffff", true);
                                                }
                                                else {
                                                    updateCharacter('DS_failureCircle2', "#f51b1b");
                                                    getCharacter();
                                                    route.params.onFSChange('DS_failuresCircle2', "#f51b1b", true);
                                                }
                                            }}
                                        />
                                        <View
                                            style = {styles.line}
                                        />
                                    </View>
                                    <TouchableOpacity
                                        style = {{
                                            width: 27,
                                            height: 27,
                                            borderWidth: 1,
                                            backgroundColor: charData['DS_failureCircle3'],
                                            borderRadius: 54,
                                        }}
                                        onPress = {() => {
                                            if (charData['DS_failureCircle3'] === "#f51b1b") {
                                                updateCharacter('DS_failureCircle3', "#ffffff");
                                                getCharacter();
                                                route.params.onFSChange('DS_failuresCircle3', "#ffffff", true);
                                            }
                                            else {
                                                updateCharacter('DS_failureCircle3', "#f51b1b");
                                                getCharacter();
                                                route.params.onFSChange('DS_failuresCircle3', "#f51b1b", true);
                                            }
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
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
    back: {
        position: "absolute",
        top: 200,
        left: 10
    },
    circleContainer2: {
        flexDirection: 'row'
    },
    circleContainer: {
        marginLeft: 8,
        flexDirection: 'row'
    },
    line: {
        width: 8.25,
        height: 1,
        marginLeft: -1,
        marginTop: 13,
        borderBottomWidth: 1,
    },
    circlesContainer: {
        flexDirection: 'row',
        marginTop: 36,
        marginLeft: 1.5,
        height:30,
        width: 120
    },
    deathSavesContainer: {
        flexDirection: 'column',
        width: 116,
        height: 178,
        marginLeft: 9,
        borderRadius: 8,
        backgroundColor: "#e8e8e8"
    },
    deathSavesSubHeading: {
        position: "absolute",
        top: 10,
        width: 116,
        textAlign: "center",
        color: "#000000",
        fontSize: 11
    },
    deathSavesHeading: {
        position: "absolute",
        top: 5,
        width: 116,
        textAlign: "center",
        color: "#000000"
    },
    HPContainer: {
        flexDirection: 'column'
    },
    passiveSkillsContainer: {
        flexDirection: 'column',
        width: 235,
        height: 178,
        marginLeft: 5,
        borderRadius: 8,
        backgroundColor: "#e8e8e8"
    },
    passiveSkills: {
        marginTop: 30
    },
    passiveSkillsHeading: {
        position: "absolute",
        top: 5,
        width: 235,
        textAlign: "center",
        color: "#000000"
    },
    passiveInputs: {
        marginBottom: 10,
        marginLeft: 176,
        width: 50,
        height: 37,
        textAlign: "center",
        fontSize: 10,
        borderWidth: 1,
        backgroundColor: "#ffffff",
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0
    },
    passiveInputsHeading: {
        position: "absolute",
        left: 6,
        width: 173,
        height: 39,
        textAlign: "center",
        paddingTop: 10,
        backgroundColor: "#c1c1c1",
        color: "#000000",
        fontSize: 11,
        borderWidth: 1
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
        width: 600,
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
        left: 830
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
