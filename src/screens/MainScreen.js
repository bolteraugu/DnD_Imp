import React, {useContext, useEffect, useState} from 'react'; //Will need react
import {Image, StyleSheet, TouchableOpacity, View, TextInput as NativeTextInput} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import firebase from "firebase";
import {AuthUserContext} from "../navigation/AuthUserProvider";
import {TextInput, Text, Button} from "react-native-paper"; //Probably will need text...
import colors from '../utils/colors';
import Spinner from "../components/Spinner";

export default function MainScreen({route, navigation}) {
    const charRef = route.params.charRef;
    const [charData, setCharData] = useState(route.params.charData);
    const [loading, setLoading] = useState(true);
    global.charaRef = charRef;
    global.charaData = charData;

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', e => {
            getCharacter();
            route.params.updateCharData()
        });
        if (loading) {
            setLoading(false);
        }
        return unsubscribe;
    }, [navigation])

    if (loading) {
        return <Spinner />;
    }

    function getCharacter() {
        charRef.onSnapshot( (snapshot) => {
            setCharData(snapshot.data())
        });
        global.charaData = charData;
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
        else if (fieldName === 'constitution') {
            charRef
                .update({
                    constitution: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'dexterity') {
            charRef
                .update({
                    dexterity: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'wisdom') {
            charRef
                .update({
                    wisdom: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'intelligence') {
            charRef
                .update({
                    intelligence: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'charisma') {
            charRef
                .update({
                    charisma: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'proficiency') {
            charRef
                .update({
                    proficiency: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'name') {
            charRef
                .update({
                    name: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'race') {
            charRef
                .update({
                    char_race: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'class') {
            charRef
                .update({
                    char_class: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'alignment') {
            charRef
                .update({
                    alignment: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'hit_dice') {
            charRef
                .update({
                    hit_dice: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'level') {
            charRef
                .update({
                    level: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'current_hp') {
            charRef
                .update({
                    current_hp: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'temp_hp') {
            charRef
                .update({
                    temp_hp: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'max_hp') {
            charRef
                .update({
                    max_hp: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'armor_class') {
            charRef
                .update({
                    armor_class: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'initiative') {
            charRef
                .update({
                    initiative: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'speed') {
            charRef
                .update({
                    speed: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'passive_perception') {
            charRef
                .update({
                    passive_perception: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'passive_investigation') {
            charRef
                .update({
                    passive_investigation: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'passive_insight') {
            charRef
                .update({
                    passive_insight: Number(value)
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
        else if (fieldName === 'ST_strength') {
            charRef
                .update({
                    ST_strength: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'ST_dexterity') {
            charRef
                .update({
                    ST_dexterity: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'ST_constitution') {
            charRef
                .update({
                    ST_constitution: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'ST_intelligence') {
            charRef
                .update({
                    ST_intelligence: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'ST_wisdom') {
            charRef
                .update({
                    ST_wisdom: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'ST_charisma') {
            charRef
                .update({
                    ST_charisma: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'acrobatics') {
            charRef
                .update({
                    acrobatics: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'animal_handling') {
            charRef
                .update({
                    animal_handling: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'arcana') {
            charRef
                .update({
                    arcana: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'athletics') {
            charRef
                .update({
                    athletics: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'deception') {
            charRef
                .update({
                    deception: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'history') {
            charRef
                .update({
                    history: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'insight') {
            charRef
                .update({
                    insight: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'intimidation') {
            charRef
                .update({
                    intimidation: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'investigation') {
            charRef
                .update({
                    investigation: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'medicine') {
            charRef
                .update({
                    medicine: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'nature') {
            charRef
                .update({
                    nature: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'perception') {
            charRef
                .update({
                    perception: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'performance') {
            charRef
                .update({
                    performance: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'persuasion') {
            charRef
                .update({
                    persuasion: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'religion') {
            charRef
                .update({
                    religion: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'sleight_of_hand') {
            charRef
                .update({
                    sleight_of_hand: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'stealth') {
            charRef
                .update({
                    stealth: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'survival') {
            charRef
                .update({
                    survival: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'proficiencies_and_languages') {
            charRef
                .update({
                    proficiencies_and_languages: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
    }

    // function tabNavigator() {
    //     return (
    //         <View style = {styles.tabContainer}>
    //             <TouchableOpacity
    //                 style = {styles.currentTab}
    //             >
    //                 <Text style = {styles.mainTabText}>MAIN</Text>
    //             </TouchableOpacity>
    //             <TouchableOpacity
    //                 style = {styles.otherTab}
    //             >
    //                 <Text style = {styles.otherTabText}>BIOGRAPHY</Text>
    //             </TouchableOpacity>
    //             <TouchableOpacity
    //                 style = {styles.otherTab}
    //             >
    //                 <Text style = {styles.otherTabText}>INVENTORY</Text>
    //             </TouchableOpacity>
    //             <TouchableOpacity
    //                 style = {styles.otherTab}
    //             >
    //                 <Text style = {styles.otherTabText}>SPELLS</Text>
    //             </TouchableOpacity>
    //         </View>
    //     )
    // }

    return (
        <View>
            {/*{tabNavigator()}*/}
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
                                underlineColor="transparent"
                                defaultValue={String(charData['strength'])}
                                onChangeText={(text) => {
                                    updateCharacter('strength', text);
                                    getCharacter()
                                    route.params.onFSChange('strength', text, true);
                                    route.params.updateCharData()
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
                                underlineColor="transparent"
                                defaultValue={String(charData['constitution'])}
                                onChangeText={(text) => {
                                    updateCharacter('constitution', text);
                                    getCharacter()
                                    route.params.onFSChange('constitution', text, true);
                                    route.params.updateCharData()
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
                                underlineColor="transparent"
                                defaultValue={String(charData['wisdom'])}
                                onChangeText={(text) => {
                                    updateCharacter('wisdom', text);
                                    getCharacter()
                                    route.params.onFSChange('wisdom', text, true);
                                    route.params.updateCharData()
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
                                underlineColor="transparent"
                                defaultValue={String(charData['dexterity'])}
                                onChangeText={(text) => {
                                    updateCharacter('dexterity', text);
                                    getCharacter()
                                    route.params.onFSChange('dexterity', text, true);
                                    route.params.updateCharData()
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
                                underlineColor="transparent"
                                defaultValue={String(charData['intelligence'])}
                                onChangeText={(text) => {
                                    updateCharacter('intelligence', text);
                                    getCharacter()
                                    route.params.onFSChange('intelligence', text, true);
                                    route.params.updateCharData()
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
                                underlineColor="transparent"
                                defaultValue={String(charData['charisma'])}
                                onChangeText={(text) => {
                                    updateCharacter('charisma', text);
                                    getCharacter()
                                    route.params.onFSChange('charisma', text, true);
                                    route.params.updateCharData()
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
                        underlineColor="transparent"
                        defaultValue={String(charData['proficiency'])}
                        onChangeText={(text) => {
                            updateCharacter('proficiency', text);
                            getCharacter()
                            route.params.onFSChange('proficiency', text, true);
                            route.params.updateCharData()
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
                        underlineColor="transparent"
                        placeholder={"Enter name..."}
                        onChangeText={(text) => {
                            updateCharacter('name', text);
                            getCharacter()
                            route.params.onFSChange('name', text, false);
                            route.params.updateCharData()
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
                        underlineColor="transparent"
                        placeholder={"Enter race..."}
                        onChangeText={(text) => {
                            updateCharacter('char_race', text);
                            getCharacter()
                            route.params.onFSChange('char_race', text, false);
                            route.params.updateCharData()
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
                        underlineColor="transparent"
                        placeholder={"Enter class..."}
                        onChangeText={(text) => {
                            updateCharacter('char_class', text);
                            getCharacter()
                            route.params.onFSChange('char_class', text, false);
                            route.params.updateCharData()
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
                        underlineColor="transparent"
                        defaultValue={String(charData['level'])}
                        onChangeText={(text) => {
                            updateCharacter('level', text);
                            getCharacter()
                            route.params.onFSChange('level', text, true);
                            route.params.updateCharData()
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
                        underlineColor="transparent"
                        defaultValue={String(charData['current_hp'])}
                        onChangeText={(text) => {
                            updateCharacter('current_hp', text);
                            getCharacter()
                            route.params.onFSChange('current_hp', text, true);
                            route.params.updateCharData()
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
                        underlineColor="transparent"
                        onChangeText={(text) => {
                            updateCharacter('hit_dice', text);
                            getCharacter()
                            route.params.onFSChange('hit_dice', text, false);
                            route.params.updateCharData()
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
                        underlineColor="transparent"
                        defaultValue={String(charData['armor_class'])}
                        onChangeText={(text) => {
                            updateCharacter('armor_class', text);
                            getCharacter()
                            route.params.onFSChange('armor_class', text, true);
                            route.params.updateCharData()
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
                        underlineColor="transparent"
                        defaultValue={String(charData['initiative'])}
                        onChangeText={(text) => {
                            updateCharacter('initiative', text);
                            getCharacter()
                            route.params.onFSChange('initiative', text, true);
                            route.params.updateCharData()
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
                        underlineColor="transparent"
                        onChangeText={(text) => {
                            updateCharacter('speed', text);
                            getCharacter()
                            route.params.onFSChange('speed', text, true);
                            route.params.updateCharData()
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
                        underlineColor="transparent"
                        placeholder={"Enter alignment..."}
                        onChangeText={(text) => {
                            updateCharacter('alignment', text);
                            getCharacter()
                            route.params.onFSChange('alignment', text, false);
                            route.params.updateCharData()
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
                                underlineColor="transparent"
                                defaultValue={String(charData['passive_perception'])}
                                onChangeText={(text) => {
                                    updateCharacter('passive_perception', text);
                                    getCharacter()
                                    route.params.onFSChange('passive_perception', text, true);
                                    route.params.updateCharData()
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
                                underlineColor="transparent"
                                defaultValue={String(charData['passive_investigation'])}
                                onChangeText={(text) => {
                                    updateCharacter('passive_investigation', text);
                                    getCharacter()
                                    route.params.onFSChange('passive_investigation', text, true);
                                    route.params.updateCharData()
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
                                underlineColor="transparent"
                                defaultValue={String(charData['passive_insight'])}
                                onChangeText={(text) => {
                                    updateCharacter('passive_insight', text);
                                    getCharacter()
                                    route.params.onFSChange('passive_insight', text, true);
                                    route.params.updateCharData()
                                }}
                            />
                        </View>
                    </View>
                </View>
                <View style = {styles.HPContainer}>
                    <View>
                        <TextInput
                            style={styles.maxHPInputs}
                            keyboardType="number-pad"
                            underlineColor="transparent"
                            defaultValue={String(charData['max_hp'])}
                            onChangeText={(text) => {
                                updateCharacter('max_hp', text);
                                getCharacter()
                                route.params.onFSChange('max_hp', text, true);
                                route.params.updateCharData()
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
                            style={styles.tempHPInputs}
                            keyboardType="number-pad"
                            underlineColor="transparent"
                            defaultValue={String(charData['temp_hp'])}
                            onChangeText={(text) => {
                                updateCharacter('temp_hp', text);
                                getCharacter()
                                route.params.onFSChange('temp_hp', text, true);
                                route.params.updateCharData()
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
                                            if (charData['DS_successCircle1']  === "#00db79") {
                                                updateCharacter('DS_successCircle1', "#ffffff");
                                                getCharacter();
                                                route.params.onFSChange('DS_successCircle1', "#ffffff", true);
                                                route.params.updateCharData()
                                            } else {
                                                updateCharacter('DS_successCircle1', "#00db79");
                                                getCharacter();
                                                route.params.onFSChange('DS_successCircle1', "#00db79", true);
                                                route.params.updateCharData()

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
                                                route.params.updateCharData()
                                            }
                                            else {
                                                updateCharacter('DS_successCircle2', "#00db79")
                                                getCharacter();
                                                route.params.onFSChange('DS_successCircle2', "#00db79", true);
                                                route.params.updateCharData()
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
                                            route.params.updateCharData()
                                        }
                                        else {
                                            updateCharacter('DS_successCircle3', "#00db79")
                                            getCharacter();
                                            route.params.onFSChange('DS_successCircle3', "#00db79", true);
                                            route.params.updateCharData()
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
                                                route.params.updateCharData()
                                            }
                                            else {
                                                updateCharacter('DS_failureCircle1', "#f51b1b");
                                                getCharacter();
                                                route.params.onFSChange('DS_failuresCircle1', "#f51b1b", true);
                                                route.params.updateCharData()
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
                                                route.params.updateCharData()
                                            }
                                            else {
                                                updateCharacter('DS_failureCircle2', "#f51b1b");
                                                getCharacter();
                                                route.params.onFSChange('DS_failuresCircle2', "#f51b1b", true);
                                                route.params.updateCharData()
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
                                            route.params.updateCharData()
                                        }
                                        else {
                                            updateCharacter('DS_failureCircle3', "#f51b1b");
                                            getCharacter();
                                            route.params.onFSChange('DS_failuresCircle3', "#f51b1b", true);
                                            route.params.updateCharData()
                                        }
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
                <View style = {styles.STContainer}>
                    <Text
                        style = {styles.STHeading}
                    >
                        Saving Throws
                    </Text>
                    <View style = {styles.STValuesContainer}>
                        <View style = {styles.STHeadingValueContainer}>
                            <View style = {styles.STTitles}>
                                <Text style = {styles.STTitleValue}>
                                    Strength
                                </Text>
                            </View>
                            <TextInput
                                style = {styles.STValue}
                                defaultValue = {String(charData["ST_strength"])}
                                underlineColor="transparent"
                                onChangeText = {(text) => {
                                    updateCharacter('ST_strength', text);
                                    getCharacter()
                                    route.params.onFSChange('ST_strength', text, true);
                                    route.params.updateCharData()
                                }}
                            />
                        </View>
                        <View style = {styles.STHeadingValueContainer}>
                            <View style = {styles.STTitles}>
                                <Text style = {styles.STTitleValue}>
                                    Dexterity
                                </Text>
                            </View>
                            <TextInput
                                style = {styles.STValue}
                                defaultValue = {String(charData["ST_dexterity"])}
                                underlineColor="transparent"
                                onChangeText = {(text) => {
                                    updateCharacter('ST_dexterity', text);
                                    getCharacter()
                                    route.params.onFSChange('ST_dexterity', text, true);
                                    route.params.updateCharData()
                                }}
                            />
                        </View>
                        <View style = {styles.STHeadingValueContainer}>
                            <View style = {styles.STTitles}>
                                <Text style = {styles.STTitleValue}>
                                    Constitution
                                </Text>
                            </View>
                            <TextInput
                                style = {styles.STValue}
                                defaultValue = {String(charData["ST_constitution"])}
                                underlineColor="transparent"
                                onChangeText = {(text) => {
                                    updateCharacter('ST_constitution', text);
                                    getCharacter()
                                    route.params.onFSChange('ST_constitution', text, true);
                                    route.params.updateCharData()
                                }}
                            />
                        </View>
                        <View style = {styles.STHeadingValueContainer}>
                            <View style = {styles.STTitles}>
                                <Text style = {styles.STTitleValue}>
                                    Intelligence
                                </Text>
                            </View>
                            <TextInput
                                style = {styles.STValue}
                                defaultValue = {String(charData["ST_intelligence"])}
                                underlineColor="transparent"
                                onChangeText = {(text) => {
                                    updateCharacter('ST_intelligence', text);
                                    getCharacter()
                                    route.params.onFSChange('ST_intelligence', text, true);
                                    route.params.updateCharData()
                                }}
                            />
                        </View>
                        <View style = {styles.STHeadingValueContainer}>
                            <View style = {styles.STTitles}>
                                <Text style = {styles.STTitleValue}>
                                    Wisdom
                                </Text>
                            </View>
                            <TextInput
                                style = {styles.STValue}
                                defaultValue = {String(charData["ST_wisdom"])}
                                underlineColor="transparent"
                                onChangeText = {(text) => {
                                    updateCharacter('ST_wisdom', text);
                                    getCharacter()
                                    route.params.onFSChange('ST_wisdom', text, true);
                                    route.params.updateCharData()
                                }}
                            />
                        </View>
                        <View style = {styles.STHeadingValueContainer}>
                            <View style = {styles.STTitles}>
                                <Text style = {styles.STTitleValue}>
                                    Charisma
                                </Text>
                            </View>
                            <TextInput
                                style = {styles.STValue}
                                defaultValue = {String(charData["ST_charisma"])}
                                underlineColor="transparent"
                                onChangeText = {(text) => {
                                    updateCharacter('ST_charisma', text);
                                    getCharacter()
                                    route.params.onFSChange('ST_charisma', text, true);
                                    route.params.updateCharData()
                                }}
                            />
                        </View>
                    </View>
                </View>
            <View style = {styles.skillsContainer}>
                <Text
                    style = {styles.skillsHeading}
                >
                    Skills
                </Text>
                <View style = {styles.skillsSubHeadingContainer}>
                <Text
                    style = {styles.skillsSubHeading}
                >
                    Skill
                </Text>
                <Text
                    style = {styles.bonusSubHeading}
                >
                    Bonus
                </Text>
                    <Text
                        style = {styles.skillsSubHeading}
                    >
                        Skill
                    </Text>
                    <Text
                        style = {styles.bonusSubHeading}
                    >
                        Bonus
                    </Text>
            </View>
                <View style = {styles.skillsSections}>
                <View style = {styles.skillsSection1}>
                    <View style = {styles.skillsHeadingValueContainer}>
                        <View style = {styles.skillsTitles}>
                            <Text style = {styles.skillsTitleValue}>
                                Acrobatics (Dex)
                            </Text>
                        </View>
                        <TextInput
                            style = {styles.skillsValue}
                            defaultValue = {String(charData["acrobatics"])}
                            underlineColor="transparent"
                            onChangeText = {(text) => {
                                updateCharacter('acrobatics', text);
                                getCharacter()
                                route.params.onFSChange('acrobatics', text, true);
                                route.params.updateCharData()
                            }}
                        />
                    </View>
                    <View style = {styles.skillsHeadingValueContainer}>
                        <View style = {styles.skillsTitles}>
                            <Text style = {styles.skillsTitleValue}>
                                Animal Handling (Wis)
                            </Text>
                        </View>
                        <TextInput
                            style = {styles.skillsValue}
                            defaultValue = {String(charData["animal_handling"])}
                            underlineColor="transparent"
                            onChangeText = {(text) => {
                                updateCharacter('animal_handling', text);
                                getCharacter()
                                route.params.onFSChange('animal_handling', text, true);
                                route.params.updateCharData()
                            }}
                        />
                    </View>
                    <View style = {styles.skillsHeadingValueContainer}>
                        <View style = {styles.skillsTitles}>
                            <Text style = {styles.skillsTitleValue}>
                                Arcana (Int)
                            </Text>
                        </View>
                        <TextInput
                            style = {styles.skillsValue}
                            defaultValue = {String(charData["arcana"])}
                            underlineColor="transparent"
                            onChangeText = {(text) => {
                                updateCharacter('arcana', text);
                                getCharacter()
                                route.params.onFSChange('arcana', text, true);
                                route.params.updateCharData()
                            }}
                        />
                    </View>
                    <View style = {styles.skillsHeadingValueContainer}>
                        <View style = {styles.skillsTitles}>
                            <Text style = {styles.skillsTitleValue}>
                                Athletics (Str)
                            </Text>
                        </View>
                        <TextInput
                            style = {styles.skillsValue}
                            defaultValue = {String(charData["athletics"])}
                            underlineColor="transparent"
                            onChangeText = {(text) => {
                                updateCharacter('athletics', text);
                                getCharacter()
                                route.params.onFSChange('athletics', text, true);
                                route.params.updateCharData()
                            }}
                        />
                    </View>
                    <View style = {styles.skillsHeadingValueContainer}>
                        <View style = {styles.skillsTitles}>
                            <Text style = {styles.skillsTitleValue}>
                                Deception (Cha)
                            </Text>
                        </View>
                        <TextInput
                            style = {styles.skillsValue}
                            defaultValue = {String(charData["deception"])}
                            underlineColor="transparent"
                            onChangeText = {(text) => {
                                updateCharacter('deception', text);
                                getCharacter()
                                route.params.onFSChange('deception', text, true);
                                route.params.updateCharData()
                            }}
                        />
                    </View>
                    <View style = {styles.skillsHeadingValueContainer}>
                        <View style = {styles.skillsTitles}>
                            <Text style = {styles.skillsTitleValue}>
                                History (Int)
                            </Text>
                        </View>
                        <TextInput
                            style = {styles.skillsValue}
                            defaultValue = {String(charData["history"])}
                            underlineColor="transparent"
                            onChangeText = {(text) => {
                                updateCharacter('history', text);
                                getCharacter()
                                route.params.onFSChange('history', text, true);
                                route.params.updateCharData()
                            }}
                        />
                    </View>
                    <View style = {styles.skillsHeadingValueContainer}>
                        <View style = {styles.skillsTitles}>
                            <Text style = {styles.skillsTitleValue}>
                                Insight (Wis)
                            </Text>
                        </View>
                        <TextInput
                            style = {styles.skillsValue}
                            defaultValue = {String(charData["insight"])}
                            underlineColor="transparent"
                            onChangeText = {(text) => {
                                updateCharacter('insight', text);
                                getCharacter()
                                route.params.onFSChange('insight', text, true);
                                route.params.updateCharData()
                            }}
                        />
                    </View>
                    <View style = {styles.skillsHeadingValueContainer}>
                        <View style = {styles.skillsTitles}>
                            <Text style = {styles.skillsTitleValue}>
                                Intimidation (Cha)
                            </Text>
                        </View>
                        <TextInput
                            style = {styles.skillsValue}
                            defaultValue = {String(charData["intimidation"])}
                            underlineColor="transparent"
                            onChangeText = {(text) => {
                                updateCharacter('intimidation', text);
                                getCharacter()
                                route.params.onFSChange('intimidation', text, true);
                                route.params.updateCharData()
                            }}
                        />
                    </View>
                    <View style = {styles.skillsHeadingValueContainer}>
                        <View style = {styles.skillsTitles}>
                            <Text style = {styles.skillsTitleValue}>
                                Investigation (Int)
                            </Text>
                        </View>
                        <TextInput
                            style = {styles.skillsValue}
                            defaultValue = {String(charData["investigation"])}
                            underlineColor="transparent"
                            onChangeText = {(text) => {
                                updateCharacter('investigation', text);
                                getCharacter()
                                route.params.onFSChange('investigation', text, true);
                                route.params.updateCharData()
                            }}
                        />
                    </View>
                </View>
                <View style = {styles.skillsSection2}>
                    <View style = {styles.skillsHeadingValueContainer}>
                        <View style = {styles.skillsTitles}>
                            <Text style = {styles.skillsTitleValue}>
                                Medicine (Wis)
                            </Text>
                        </View>
                        <TextInput
                            style = {styles.skillsValue}
                            defaultValue = {String(charData["medicine"])}
                            underlineColor="transparent"
                            onChangeText = {(text) => {
                                updateCharacter('medicine', text);
                                getCharacter()
                                route.params.onFSChange('medicine', text, true);
                                route.params.updateCharData()
                            }}
                        />
                    </View>
                    <View style = {styles.skillsHeadingValueContainer}>
                        <View style = {styles.skillsTitles}>
                            <Text style = {styles.skillsTitleValue}>
                                Nature (Int)
                            </Text>
                        </View>
                        <TextInput
                            style = {styles.skillsValue}
                            defaultValue = {String(charData["nature"])}
                            underlineColor="transparent"
                            onChangeText = {(text) => {
                                updateCharacter('nature', text);
                                getCharacter()
                                route.params.onFSChange('nature', text, true);
                                route.params.updateCharData()
                            }}
                        />
                    </View>
                    <View style = {styles.skillsHeadingValueContainer}>
                        <View style = {styles.skillsTitles}>
                            <Text style = {styles.skillsTitleValue}>
                                Perception (Wis)
                            </Text>
                        </View>
                        <TextInput
                            style = {styles.skillsValue}
                            defaultValue = {String(charData["perception"])}
                            underlineColor="transparent"
                            onChangeText = {(text) => {
                                updateCharacter('perception', text);
                                getCharacter()
                                route.params.onFSChange('perception', text, true);
                                route.params.updateCharData()
                            }}
                        />
                    </View>
                    <View style = {styles.skillsHeadingValueContainer}>
                        <View style = {styles.skillsTitles}>
                            <Text style = {styles.skillsTitleValue}>
                                Performance (Cha)
                            </Text>
                        </View>
                        <TextInput
                            style = {styles.skillsValue}
                            defaultValue = {String(charData["performance"])}
                            underlineColor="transparent"
                            onChangeText = {(text) => {
                                updateCharacter('performance', text);
                                getCharacter()
                                route.params.onFSChange('performance', text, true);
                                route.params.updateCharData()
                            }}
                        />
                    </View>
                    <View style = {styles.skillsHeadingValueContainer}>
                        <View style = {styles.skillsTitles}>
                            <Text style = {styles.skillsTitleValue}>
                                Persuasion (Cha)
                            </Text>
                        </View>
                        <TextInput
                            style = {styles.skillsValue}
                            defaultValue = {String(charData["persuasion"])}
                            underlineColor="transparent"
                            onChangeText = {(text) => {
                                updateCharacter('persuasion', text);
                                getCharacter()
                                route.params.onFSChange('persuasion', text, true);
                                route.params.updateCharData()
                            }}
                        />
                    </View>
                    <View style = {styles.skillsHeadingValueContainer}>
                        <View style = {styles.skillsTitles}>
                            <Text style = {styles.skillsTitleValue}>
                                Religion (Int)
                            </Text>
                        </View>
                        <TextInput
                            style = {styles.skillsValue}
                            defaultValue = {String(charData["religion"])}
                            underlineColor="transparent"
                            onChangeText = {(text) => {
                                updateCharacter('religion', text);
                                getCharacter()
                                route.params.onFSChange('religion', text, true);
                                route.params.updateCharData()
                            }}
                        />
                    </View>
                    <View style = {styles.skillsHeadingValueContainer}>
                        <View style = {styles.skillsTitles}>
                            <Text style = {styles.skillsTitleValue}>
                                Sleight of Hand (Dex)
                            </Text>
                        </View>
                        <TextInput
                            style = {styles.skillsValue}
                            underlineColor="transparent"
                            defaultValue = {String(charData["sleight_of_hand"])}
                            onChangeText = {(text) => {
                                updateCharacter('sleight_of_hand', text);
                                getCharacter()
                                route.params.onFSChange('sleight_of_hand', text, true);
                                route.params.updateCharData()
                            }}
                        />
                    </View>
                    <View style = {styles.skillsHeadingValueContainer}>
                        <View style = {styles.skillsTitles}>
                            <Text style = {styles.skillsTitleValue}>
                                Stealth (Dex)
                            </Text>
                        </View>
                        <TextInput
                            style = {styles.skillsValue}
                            underlineColor="transparent"
                            defaultValue = {String(charData["stealth"])}
                            onChangeText = {(text) => {
                                updateCharacter("Stealth", text);
                                getCharacter()
                                route.params.onFSChange("Stealth", text, true);
                                route.params.updateCharData()
                            }}
                        />
                    </View>
                    <View style = {styles.skillsHeadingValueContainer}>
                        <View style = {styles.skillsTitles}>
                            <Text style = {styles.skillsTitleValue}>
                                Survival (Wis)
                            </Text>
                        </View>
                        <TextInput
                            style = {styles.skillsValue}
                            underlineColor="transparent"
                            defaultValue = {String(charData["survival"])}
                            onChangeText = {(text) => {
                                updateCharacter("Survival", text);
                                getCharacter()
                                route.params.onFSChange("Survival", text, true);
                                route.params.updateCharData()
                            }}
                        />
                    </View>
                </View>
                </View>
            </View>
            <TextInput
                style = {styles.profAndLanguages}
                underlineColor="transparent"
                multiline={true}
                defaultValue = {charData["proficiencies_and_languages"]}
                render={props => (
                    <NativeTextInput
                        {...props}
                        style={[
                            props.style,
                            props.multiline
                                ? {
                                    paddingTop: 35,
                                    paddingLeft: 25,
                                    paddingRight: 25,
                                    paddingBottom: 8,
                                    height: 100,
                                }
                                : null,
                        ]}
                        placeholder={"Enter proficiencies and languages..."}
                    />
                )}
                onChangeText = {(text) => {
                    updateCharacter('proficiencies_and_languages', text);
                    getCharacter()
                    route.params.onFSChange('proficiencies_and_languages', text, false);
                    route.params.updateCharData()
                }}
            />
            <Text
                style = {styles.profAndLanguagesHeading}
            >
                Proficiencies and languages
            </Text>
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
    tabContainer: {
        flexDirection: 'row',
        width: "100%",
        height: "5%",
        backgroundColor: "#ffffff"
    },
    currentTab: {
        flex: 1,
        borderBottomWidth: 2,
        borderColor: colors.primary,
        justifyContent: 'center'
    },
    otherTab: {
        flex: 1,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderColor: "#ededed",
    },
    otherTabText: {
        fontSize: 13,
        color: "#ffc58a",
        textAlign: 'center'
    },
    mainTabText: {
        fontSize: 13,
        color: colors.primary,
        textAlign: 'center'
    },
    profAndLanguages: {
        width: 360,
        height: 450.4,
        position: 'absolute',
        top: 164,
        left: 470,
        borderWidth: 1,
        backgroundColor: "#e8e8e8",
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
    },
    profAndLanguagesHeading: {
        position: "absolute",
        top: 169,
        left: 470,
        width: 360,
        textAlign: "center",
        color: "#0038d4"
    },
    skillsSections: {
        flexDirection: 'row'
    },
    skillsSection1: {
        flexDirection: 'column',
        marginLeft: -9
    },
    skillsSection2: {
        flexDirection: 'column',
        marginLeft: -10
    },
    skillsSubHeadingContainer: {
        flexDirection: 'row',
        marginTop: 30,
        width: 300,
        marginLeft: 158,
        justifyContent: 'center'
    },
    skillsSubHeading: {
        fontSize: 14,
        marginRight: 75
    },
    bonusSubHeading: {
        marginRight: 85
    },
    skillsTitles: {
        borderWidth: 1,
        height: 28,
        paddingTop: 3,
        width: 156,
        backgroundColor: "#c1c1c1"
    },
    skillsTitleValue: {
        fontSize: 11,
        textAlign: 'center',
    },
    skillsValue: {
        borderWidth: 1,
        height: 26,
        width: 70,
        textAlign: 'center',
        backgroundColor: "#ffffff",
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        marginLeft: -2
    },
    skillsHeadingValueContainer: {
        flexDirection: 'row',
        marginTop: 6,
        marginLeft: 19,
    },
    STTitles: {
        marginBottom: 15,
        borderWidth: 1,
        height: 42,
        paddingTop: 5,
        width: 130,
        backgroundColor: "#c1c1c1"
    },
    STTitleValue: {
        fontSize: 17,
        textAlign: 'center',
    },
    STValue: {
        marginBottom: 15,
        borderWidth: 1,
        height: 40,
        width: 70,
        textAlign: 'center',
        backgroundColor: "#ffffff",
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        marginLeft: -2
    },
    STHeadingValueContainer: {
        flexDirection: 'row',
        marginTop: 6,
        marginLeft: 19,
    },
    STValuesContainer: {
        flexDirection: 'column',
        marginTop: 40,
    },
    STContainer: {
        backgroundColor: "#e8e8e8",
        width: 240,
        height: 452.5,
        flexDirection: 'column',
        borderWidth: 1,
        position: 'absolute',
        top: 164,
        left: 220
    },
    skillsContainer: {
        backgroundColor: "#e8e8e8",
        width: 484,
        height: 372.5,
        flexDirection: 'column',
        borderWidth: 1,
        position: 'absolute',
        top: 244,
        left: 835
    },
    skillsHeading: {
        position: "absolute",
        top: 5,
        width: 484,
        textAlign: "center",
        color: "#0038d4"
    },
    STHeading: {
        position: "absolute",
        top: 5,
        width: 235,
        textAlign: "center",
        color: "#0038d4"
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
        marginTop: 26,
        marginLeft: 1.5,
        height:30,
        width: 120
    },
    deathSavesContainer: {
        flexDirection: 'column',
        width: 116,
        height: 149,
        marginLeft: 9,
        backgroundColor: "#e8e8e8",
        borderWidth: 1,
        borderRadius: 0
    },
    deathSavesSubHeading: {
        position: "absolute",
        width: 116,
        top: 4,
        textAlign: "center",
        color: "#000000",
        fontSize: 11
    },
    deathSavesHeading: {
        position: "absolute",
        top: 5,
        width: 116,
        textAlign: "center",
        color: "#0038d4"
    },
    HPContainer: {
        flexDirection: 'column'
    },
    passiveSkillsContainer: {
        flexDirection: 'column',
        width: 235,
        height: 149.5,
        marginLeft: 5,
        borderRadius: 8,
        backgroundColor: "#e8e8e8",
        borderWidth: 1
    },
    passiveSkills: {
        marginTop: 30
    },
    passiveSkillsHeading: {
        position: "absolute",
        top: 5,
        width: 235,
        textAlign: "center",
        color: "#0038d4"
    },
    passiveInputs: {
        marginBottom: 10,
        marginLeft: 176,
        width: 50,
        height: 27,
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
        height: 29,
        textAlign: "center",
        paddingTop: 5,
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
        paddingTop: 20,
        backgroundColor: "#e8e8e8",
        borderWidth: 1,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0
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
        paddingTop: 20,
        backgroundColor: "#e8e8e8",
        borderWidth: 1,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0
    },
    maxHPInputs: {
        marginBottom: 10,
        marginLeft: 10,
        width: 115,
        height: 47,
        textAlign: "center",
        paddingTop: 20,
        backgroundColor: "#e8e8e8",
        borderWidth: 1,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0
    },
    tempHPInputs: {
        marginBottom: 10,
        marginLeft: 10,
        width: 115,
        height: 47,
        textAlign: "center",
        paddingTop: 20,
        backgroundColor: "#e8e8e8",
        borderWidth: 1,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0
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
        color: "#0038d4",
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
        paddingTop: 15,
        backgroundColor: "#e8e8e8",
        borderWidth: 1,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0
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
        paddingTop: 15,
        backgroundColor: "#e8e8e8",
        borderWidth: 1,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0
    },
    changeImageStyle: {
        marginBottom: 10,
        marginLeft: 10,
        width: 200
    }
})
