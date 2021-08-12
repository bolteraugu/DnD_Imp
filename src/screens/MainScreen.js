import React, {useContext, useEffect, useState} from 'react'; //Will need react
import {
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
    TextInput as NativeTextInput
} from 'react-native';
import {TextInput, Text, Button} from "react-native-paper"; //Probably will need text...
import colors from '../utils/colors';
import Spinner from "../components/Spinner";

export default function MainScreen({route, navigation}) {
    const [character, setCharacter] = useState(route.params.character);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', e => {
            setLoading(true)
            global.charaRef = route.params.charRef;
            global.character = route.params.character
            global.onFSChange = route.params.onFSChange
            global.index = route.params.index
            global.charaRef.onSnapshot((snapshot) => {
                setCharacter(snapshot.data())
            })
            if (loading) {
                setLoading(false);
            }
        });
        return unsubscribe;
    }, [navigation])

    if (loading) {
        return <Spinner />;
    }

    function updateCharacterLocal(fieldName, text, isNumber) {
        let tempCharacter = JSON.parse(JSON.stringify(character));
        tempCharacter[fieldName] = isNumber ? Number(text) : text;
        setCharacter(tempCharacter);
    }

    function updateCharacter(fieldName, value) {
        if (fieldName === 'strength') {
            global.charaRef
                .update({
                    strength: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'constitution') {
            global.charaRef
                .update({
                    constitution: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'dexterity') {
            global.charaRef
                .update({
                    dexterity: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'wisdom') {
            global.charaRef
                .update({
                    wisdom: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'intelligence') {
            global.charaRef
                .update({
                    intelligence: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'charisma') {
            global.charaRef
                .update({
                    charisma: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'proficiency') {
            global.charaRef
                .update({
                    proficiency: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'name') {
            global.charaRef
                .update({
                    name: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'char_race') {
            global.charaRef
                .update({
                    char_race: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'char_class') {
            global.charaRef
                .update({
                    char_class: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'alignment') {
            global.charaRef
                .update({
                    alignment: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'hit_dice') {
            global.charaRef
                .update({
                    hit_dice: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'level') {
            global.charaRef
                .update({
                    level: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'current_hp') {
            global.charaRef
                .update({
                    current_hp: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'temp_hp') {
            global.charaRef
                .update({
                    temp_hp: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'max_hp') {
            global.charaRef
                .update({
                    max_hp: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'armor_class') {
            global.charaRef
                .update({
                    armor_class: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'initiative') {
            global.charaRef
                .update({
                    initiative: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'speed') {
            global.charaRef
                .update({
                    speed: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'passive_perception') {
            global.charaRef
                .update({
                    passive_perception: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'passive_investigation') {
            global.charaRef
                .update({
                    passive_investigation: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'passive_insight') {
            global.charaRef
                .update({
                    passive_insight: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'DS_successCircle1') {
            global.charaRef
                .update({
                    DS_successCircle1: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                )
        }
        else if (fieldName === 'DS_successCircle2') {
            global.charaRef
                .update({
                    DS_successCircle2: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                )
        }
        else if (fieldName === 'DS_successCircle3') {
            global.charaRef
                .update({
                    DS_successCircle3: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                )
        }
        else if (fieldName === 'DS_failureCircle1') {
            global.charaRef
                .update({
                    DS_failureCircle1: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                )
        }
        else if (fieldName === 'DS_failureCircle2') {
            global.charaRef
                .update({
                    DS_failureCircle2: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                )
        }
        else if (fieldName === 'DS_failureCircle3') {
            global.charaRef
                .update({
                    DS_failureCircle3: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                )
        }
        else if (fieldName === 'ST_strength') {
            global.charaRef
                .update({
                    ST_strength: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'ST_dexterity') {
            global.charaRef
                .update({
                    ST_dexterity: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'ST_constitution') {
            global.charaRef
                .update({
                    ST_constitution: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'ST_intelligence') {
            global.charaRef
                .update({
                    ST_intelligence: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'ST_wisdom') {
            global.charaRef
                .update({
                    ST_wisdom: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'ST_charisma') {
            global.charaRef
                .update({
                    ST_charisma: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'acrobatics') {
            global.charaRef
                .update({
                    acrobatics: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'animal_handling') {
            global.charaRef
                .update({
                    animal_handling: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'arcana') {
            global.charaRef
                .update({
                    arcana: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'athletics') {
            global.charaRef
                .update({
                    athletics: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'deception') {
            global.charaRef
                .update({
                    deception: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'history') {
            global.charaRef
                .update({
                    history: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'insight') {
            global.charaRef
                .update({
                    insight: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'intimidation') {
            global.charaRef
                .update({
                    intimidation: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'investigation') {
            global.charaRef
                .update({
                    investigation: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'medicine') {
            global.charaRef
                .update({
                    medicine: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'nature') {
            global.charaRef
                .update({
                    nature: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'perception') {
            global.charaRef
                .update({
                    perception: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'performance') {
            global.charaRef
                .update({
                    performance: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'persuasion') {
            global.charaRef
                .update({
                    persuasion: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'religion') {
            global.charaRef
                .update({
                    religion: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'sleight_of_hand') {
            global.charaRef
                .update({
                    sleight_of_hand: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'stealth') {
            global.charaRef
                .update({
                    stealth: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'survival') {
            global.charaRef
                .update({
                    survival: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'proficiencies_and_languages') {
            global.charaRef
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
            {/*<tabNavigator/>*/}
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
                                value={String(character.strength)}
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index, 'strength', text, true);
                                    updateCharacterLocal('strength', text, true);
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
                                underlineColor="transparent"
                                value={String(character.constitution)}
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index,'constitution', text, true);
                                    updateCharacterLocal('constitution', text, true);
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
                                underlineColor="transparent"
                                value={String(character.wisdom)}
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index, 'wisdom', text, true);
                                    updateCharacterLocal('wisdom', text, true);
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
                                underlineColor="transparent"
                                value={String(character.dexterity)}
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index,'dexterity', text, true);
                                    updateCharacterLocal('dexterity', text, true);
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
                                underlineColor="transparent"
                                value={String(character.intelligence)}
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index,'intelligence', text, true);
                                    updateCharacterLocal('intelligence', text, true);
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
                                underlineColor="transparent"
                                value={String(character.charisma)}
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index,'charisma', text, true);
                                    updateCharacterLocal('charisma', text, true);
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
                        underlineColor="transparent"
                        value={String(character.proficiency)}
                        onChangeText={(text) => {
                            route.params.onFSChange(route.params.index,'proficiency', text, true);
                            updateCharacterLocal('proficiency', text, true);
                            updateCharacter('proficiency', text);
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
                        style={styles.name}
                        value={character.name}
                        underlineColor="transparent"
                        placeholder={"Enter name..."}
                        onChangeText={(text) => {
                            route.params.onFSChange(route.params.index,'name', text, false);
                            updateCharacterLocal('name', text, false);
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
                        style={styles.race}
                        value={character.char_race}
                        underlineColor="transparent"
                        placeholder={"Enter race..."}
                        onChangeText={(text) => {
                            console.log(text);
                            route.params.onFSChange(route.params.index,'char_race', text, false);
                            updateCharacterLocal('char_race', text, false);
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
                        style={styles.class}
                        value={character.char_class}
                        underlineColor="transparent"
                        placeholder={"Enter class..."}
                        onChangeText={(text) => {
                            route.params.onFSChange(route.params.index,'char_class', text, false);
                            updateCharacterLocal('char_class', text, false);
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
                        underlineColor="transparent"
                        value={String(character.level)}
                        onChangeText={(text) => {
                            route.params.onFSChange(route.params.index,'level', text, true);
                            updateCharacterLocal('level', text, true);
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
                        underlineColor="transparent"
                        value={String(character.current_hp)}
                        onChangeText={(text) => {
                            route.params.onFSChange(route.params.index,'current_hp', text, true);
                            updateCharacterLocal('current_hp', text, true);
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
                        value={character.hit_dice}
                        underlineColor="transparent"
                        onChangeText={(text) => {
                            route.params.onFSChange(route.params.index,'hit_dice', text, false);
                            updateCharacterLocal('hit_dice', text, false);
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
                        underlineColor="transparent"
                        value={String(character.armor_class)}
                        onChangeText={(text) => {
                            route.params.onFSChange(route.params.index,'armor_class', text, true);
                            updateCharacterLocal('armor_class', text, true);
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
                        underlineColor="transparent"
                        value={String(character.initiative)}
                        onChangeText={(text) => {
                            route.params.onFSChange(route.params.index,'initiative', text, true);
                            updateCharacterLocal('initiative', text, true);
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
                        value={String(character.speed)}
                        underlineColor="transparent"
                        onChangeText={(text) => {
                            route.params.onFSChange(route.params.index,'speed', text, true);
                            updateCharacterLocal('speed', text, true);
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
                        style= {styles.class}
                        value={character.alignment}
                        underlineColor="transparent"
                        placeholder={"Enter alignment..."}
                        onChangeText={(text) => {
                            route.params.onFSChange(route.params.index,'alignment', text, false);
                            updateCharacterLocal('alignment', text, false);
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
                                underlineColor="transparent"
                                value={String(character.passive_perception)}
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index,'passive_perception', text, true);
                                    updateCharacterLocal('passive_perception', text, true);
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
                                underlineColor="transparent"
                                value={String(character.passive_investigation)}
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index,'passive_investigation', text, true);
                                    updateCharacterLocal('passive_investigation', text, true);
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
                                underlineColor="transparent"
                                value={String(character.passive_insight)}
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index,'passive_insight', text, true);
                                    updateCharacterLocal('passive_insight', text, true);
                                    updateCharacter('passive_insight', text);
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
                            value={String(character.max_hp)}
                            onChangeText={(text) => {
                                route.params.onFSChange(route.params.index,'max_hp', text, true);
                                updateCharacterLocal('max_hp', text, true);
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
                            style={styles.tempHPInputs}
                            keyboardType="number-pad"
                            underlineColor="transparent"
                            value={String(character.temp_hp)}
                            onChangeText={(text) => {
                                route.params.onFSChange(route.params.index,'temp_hp', text, true);
                                updateCharacterLocal('temp_hp', text, true);
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
                                            backgroundColor: character.DS_successCircle1,
                                            borderRadius: 54,
                                        }}
                                        onPress = {() => {
                                            if (character.DS_successCircle1  === "#00db79") {
                                                route.params.onFSChange(route.params.index,'DS_successCircle1', "#ffffff", false);
                                                updateCharacterLocal('DS_successCircle1', "#ffffff", false);
                                                updateCharacter('DS_successCircle1', "#ffffff");
                                            } else {
                                                route.params.onFSChange(route.params.index,'DS_successCircle1', "#00db79", false);
                                                updateCharacterLocal('DS_successCircle1', "#00db79", false);
                                                updateCharacter('DS_successCircle1', "#00db79");
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
                                            backgroundColor: character.DS_successCircle2,
                                            borderRadius: 54,
                                        }}
                                        onPress = {() => {
                                            if (character.DS_successCircle2 === "#00db79") {
                                                route.params.onFSChange(route.params.index,'DS_successCircle2', "#ffffff", false);
                                                updateCharacterLocal('DS_successCircle2', "#ffffff", false);
                                                updateCharacter('DS_successCircle2', "#ffffff")
                                            }
                                            else {
                                                route.params.onFSChange(route.params.index,'DS_successCircle2', "#00db79", false);
                                                updateCharacterLocal('DS_successCircle2', "#00db79", false);
                                                updateCharacter('DS_successCircle2', "#00db79")
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
                                        backgroundColor: character.DS_successCircle3,
                                        borderRadius: 54,
                                    }}
                                    onPress = {() => {
                                        if (character.DS_successCircle3 === "#00db79") {
                                            route.params.onFSChange(route.params.index,'DS_successCircle3', "#ffffff", false);
                                            updateCharacterLocal('DS_successCircle3', "#ffffff", false);
                                            updateCharacter('DS_successCircle3', "#ffffff")
                                        }
                                        else {
                                            route.params.onFSChange(route.params.index,'DS_successCircle3', "#00db79", false);
                                            updateCharacterLocal('DS_successCircle3', "#00db79", false);
                                            updateCharacter('DS_successCircle3', "#00db79")
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
                                            backgroundColor: character.DS_failureCircle1,
                                            borderRadius: 54,
                                        }}
                                        onPress = {() => {
                                            if (character.DS_failureCircle1 === "#f51b1b") {
                                                route.params.onFSChange(route.params.index,'DS_failureCircle1', "#ffffff", false);
                                                updateCharacterLocal('DS_failureCircle1', "#ffffff", false);
                                                updateCharacter('DS_failureCircle1', "#ffffff");
                                            }
                                            else {
                                                route.params.onFSChange(route.params.index,'DS_failureCircle1', "#f51b1b", false);
                                                updateCharacterLocal('DS_failureCircle1', "#f51b1b", false);
                                                updateCharacter('DS_failureCircle1', "#f51b1b");
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
                                            backgroundColor: character.DS_failureCircle2,
                                            borderRadius: 54,
                                        }}
                                        onPress = {() => {
                                            if (character.DS_failureCircle2 === "#f51b1b") {
                                                route.params.onFSChange(route.params.index,'DS_failureCircle2', "#ffffff", false);
                                                updateCharacterLocal('DS_failureCircle2', "#ffffff", false);
                                                updateCharacter('DS_failureCircle2', "#ffffff");
                                            }
                                            else {
                                                route.params.onFSChange(route.params.index,'DS_failureCircle2', "#f51b1b", false);
                                                updateCharacterLocal('DS_failureCircle2', "#f51b1b", false);
                                                updateCharacter('DS_failureCircle2', "#f51b1b");
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
                                        backgroundColor: character.DS_failureCircle3,
                                        borderRadius: 54,
                                    }}
                                    onPress = {() => {
                                        if (character.DS_failureCircle3 === "#f51b1b") {
                                            route.params.onFSChange(route.params.index,'DS_failureCircle3', "#ffffff", false);
                                            updateCharacterLocal('DS_failureCircle3', "#ffffff", false);
                                            updateCharacter('DS_failureCircle3', "#ffffff");
                                        }
                                        else {
                                            route.params.onFSChange(route.params.index,'DS_failureCircle3', "#f51b1b", false);
                                            updateCharacterLocal('DS_failureCircle3', "#f51b1b", false);
                                            updateCharacter('DS_failureCircle3', "#f51b1b");
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
                            value = {String(character.ST_strength)}
                            underlineColor="transparent"
                            onChangeText={(text) => {
                                route.params.onFSChange(route.params.index,'ST_strength', text, true);
                                updateCharacterLocal('ST_strength', text, true);
                                updateCharacter('ST_strength', text);
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
                            value = {String(character.ST_dexterity)}
                            underlineColor="transparent"
                            onChangeText={(text) => {
                                route.params.onFSChange(route.params.index,'ST_dexterity', text, true);
                                updateCharacterLocal('ST_dexterity', text, true);
                                updateCharacter('ST_dexterity', text);
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
                            value = {String(character.ST_constitution)}
                            underlineColor="transparent"
                            onChangeText={(text) => {
                                route.params.onFSChange(route.params.index,'ST_constitution', text, true);
                                updateCharacterLocal('ST_constitution', text, true);
                                updateCharacter('ST_constitution', text);
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
                            value = {String(character.ST_intelligence)}
                            underlineColor="transparent"
                            onChangeText={(text) => {
                                route.params.onFSChange(route.params.index,'ST_intelligence', text, true);
                                updateCharacterLocal('ST_intelligence', text, true);
                                updateCharacter('ST_intelligence', text);
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
                            value = {String(character.ST_wisdom)}
                            underlineColor="transparent"
                            onChangeText={(text) => {
                                route.params.onFSChange(route.params.index,'ST_wisdom', text, true);
                                updateCharacterLocal('ST_wisdom', text, true);
                                updateCharacter('ST_wisdom', text);
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
                            value = {String(character.ST_charisma)}
                            underlineColor="transparent"
                            onChangeText={(text) => {
                                route.params.onFSChange(route.params.index,'ST_charisma', text, true);
                                updateCharacterLocal('ST_charisma', text, true);
                                updateCharacter('ST_charisma', text);
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
                                value = {String(character.acrobatics)}
                                underlineColor="transparent"
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index,'acrobatics', text, true);
                                    updateCharacterLocal('acrobatics', text, true);
                                    updateCharacter('acrobatics', text);
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
                                value = {String(character.animal_handling)}
                                underlineColor="transparent"
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index,'animal_handling', text, true);
                                    updateCharacterLocal('animal_handling', text, true);
                                    updateCharacter('animal_handling', text);
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
                                value = {String(character.arcana)}
                                underlineColor="transparent"
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index,'arcana', text, true);
                                    updateCharacterLocal('arcana', text, true);
                                    updateCharacter('arcana', text);
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
                                value = {String(character.athletics)}
                                underlineColor="transparent"
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index,'athletics', text, true);
                                    updateCharacterLocal('athletics', text, true);
                                    updateCharacter('athletics', text);
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
                                value = {String(character.deception)}
                                underlineColor="transparent"
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index,'deception', text, true);
                                    updateCharacterLocal('deception', text, true);
                                    updateCharacter('deception', text);
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
                                value = {String(character.history)}
                                underlineColor="transparent"
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index,'history', text, true);
                                    updateCharacterLocal('history', text, true);
                                    updateCharacter('history', text);
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
                                value = {String(character.insight)}
                                underlineColor="transparent"
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index,'insight', text, true);
                                    updateCharacterLocal('insight', text, true);
                                    updateCharacter('insight', text);
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
                                value = {String(character.intimidation)}
                                underlineColor="transparent"
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index,'intimidation', text, true);
                                    updateCharacterLocal('intimidation', text, true);
                                    updateCharacter('intimidation', text);
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
                                value = {String(character.investigation)}
                                underlineColor="transparent"
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index,'investigation', text, true);
                                    updateCharacterLocal('investigation', text, true);
                                    updateCharacter('investigation', text);
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
                                value = {String(character.medicine)}
                                underlineColor="transparent"
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index,'medicine', text, true);
                                    updateCharacterLocal('medicine', text, true);
                                    updateCharacter('medicine', text);
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
                                value = {String(character.nature)}
                                underlineColor="transparent"
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index,'nature', text, true);
                                    updateCharacterLocal('nature', text, true);
                                    updateCharacter('nature', text);
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
                                value = {String(character.perception)}
                                underlineColor="transparent"
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index,'perception', text, true);
                                    updateCharacterLocal('perception', text, true);
                                    updateCharacter('perception', text);
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
                                value = {String(character.performance)}
                                underlineColor="transparent"
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index,'performance', text, true);
                                    updateCharacterLocal('performance', text, true);
                                    updateCharacter('performance', text);
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
                                value = {String(character.persuasion)}
                                underlineColor="transparent"
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index,'persuasion', text, true);
                                    updateCharacterLocal('persuasion', text, true);
                                    updateCharacter('persuasion', text);
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
                                value = {String(character.religion)}
                                underlineColor="transparent"
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index,'religion', text, true);
                                    updateCharacterLocal('religion', text, true);
                                    updateCharacter('religion', text);
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
                                value = {String(character.sleight_of_hand)}
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index,'sleight_of_hand', text, true);
                                    updateCharacterLocal('sleight_of_hand', text, true);
                                    updateCharacter('sleight_of_hand', text);
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
                                value = {String(character.stealth)}
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index,'stealth', text, true);
                                    updateCharacterLocal('stealth', text, true);
                                    updateCharacter('stealth', text);
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
                                value = {String(character.survival)}
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index,'survival', text, true);
                                    updateCharacterLocal('survival', text, true);
                                    updateCharacter('survival', text);
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
                value = {character.proficiencies_and_languages}
                render={props => (
                    <NativeTextInput
                        {...props}
                        style={[
                            props.style,
                            props.multiline
                                ? {
                                    paddingTop: screenHeight * 0.0465425531914894,
                                    paddingLeft: screenWidth * 0.018754688672168,
                                    paddingRight: screenWidth * 0.018754688672168,
                                    paddingBottom: screenHeight * 0.0106382978723404,
                                    height: screenHeight * 0.1329787234042553,
                                }
                                : null,
                        ]}
                        placeholder={"Enter proficiencies and languages..."}
                    />
                )}
                onChangeText={(text) => {
                    route.params.onFSChange(route.params.index,'proficiencies_and_languages', text, false);
                    updateCharacterLocal('proficiencies_and_languages', text, false);
                    updateCharacter('proficiencies_and_languages', text);
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
        width: screenWidth * 0.2700675168792198,
        height: screenHeight * 0.598936170212766,
        position: 'absolute',
        top: screenHeight * 0.2180851063829787,
        left: screenWidth * 0.3525881470367592,
        borderWidth: 1,
        backgroundColor: "#e8e8e8",
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
    },
    profAndLanguagesHeading: {
        position: "absolute",
        top: screenHeight * 0.2247340425531915,
        left: screenWidth * 0.3525881470367592,
        width: screenWidth * 0.2700675168792198,
        textAlign: "center",
        color: "#0038d4"
    },
    skillsSections: {
        flexDirection: 'row'
    },
    skillsSection1: {
        flexDirection: 'column',
        marginLeft: screenWidth * -0.0067516879219805
    },
    skillsSection2: {
        flexDirection: 'column',
        marginLeft: screenWidth * -0.0075018754688672
    },
    skillsSubHeadingContainer: {
        flexDirection: 'row',
        marginTop: screenHeight * 0.0398936170212766,
        width: screenWidth * 0.2250562640660165,
        marginLeft: screenWidth * 0.118529632408102,
        justifyContent: 'center'
    },
    skillsSubHeading: {
        fontSize: 14,
        marginRight: screenWidth * 0.0562640660165041
    },
    bonusSubHeading: {
        marginRight: screenWidth * 0.0637659414853713
    },
    skillsTitles: {
        borderWidth: 1,
        height: screenHeight * 0.0372340425531915,
        paddingTop: 3,
        width: screenWidth * 0.1170292573143286,
        backgroundColor: "#c1c1c1"
    },
    skillsTitleValue: {
        fontSize: 11,
        textAlign: 'center',
    },
    skillsValue: {
        borderWidth: 1,
        height: screenHeight * 0.0345744680851064,
        width: screenWidth * 0.0525131282820705,
        textAlign: 'center',
        backgroundColor: "#ffffff",
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        marginLeft: screenWidth * -0.0015003750937734
    },
    skillsHeadingValueContainer: {
        flexDirection: 'row',
        marginTop: screenHeight * 0.0079787234042553,
        marginLeft: screenWidth * 0.0142535633908477,
    },
    STTitles: {
        marginBottom: screenHeight * 0.0199468085106383,
        borderWidth: 1,
        height: screenHeight * 0.0558510638297872,
        paddingTop: screenHeight * 0.0066489361702128,
        width: screenWidth * 0.0975243810952738,
        backgroundColor: "#c1c1c1"
    },
    STTitleValue: {
        fontSize: 17,
        textAlign: 'center',
    },
    STValue: {
        marginBottom: screenHeight * 0.0199468085106383,
        borderWidth: 1,
        height: screenHeight * 0.0531914893617021,
        width: screenWidth * 0.0525131282820705,
        textAlign: 'center',
        backgroundColor: "#ffffff",
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        marginLeft: screenWidth * -0.0015003750937734
    },
    STHeadingValueContainer: {
        flexDirection: 'row',
        marginTop: screenHeight * 0.0079787234042553,
        marginLeft: screenWidth * 0.0142535633908477,
    },
    STValuesContainer: {
        flexDirection: 'column',
        marginTop: screenHeight * 0.0531914893617021,
    },
    STContainer: {
        backgroundColor: "#e8e8e8",
        width: screenWidth * 0.1800450112528132,
        height: screenHeight * 0.6017287234042553,
        flexDirection: 'column',
        borderWidth: 1,
        position: 'absolute',
        top: screenHeight * 0.2180851063829787,
        left: screenWidth * 0.1650412603150788
    },
    skillsContainer: {
        backgroundColor: "#e8e8e8",
        width: screenWidth * 0.3630907726931733,
        height: screenHeight * 0.4953457446808511,
        flexDirection: 'column',
        borderWidth: 1,
        position: 'absolute',
        top: screenHeight * 0.324468085106383,
        left: screenWidth * 0.6264066016504126
    },
    skillsHeading: {
        position: "absolute",
        top: screenHeight * 0.0066489361702128,
        width: screenWidth * 0.3630907726931733,
        textAlign: "center",
        color: "#0038d4"
    },
    STHeading: {
        position: "absolute",
        top: screenHeight * 0.0066489361702128,
        width: screenWidth * 0.1762940735183796,
        textAlign: "center",
        color: "#0038d4"
    },
    circleContainer2: {
        flexDirection: 'row'
    },
    circleContainer: {
        marginLeft: screenWidth * 0.0060015003750938,
        flexDirection: 'row'
    },
    line: {
        width: screenWidth * 0.0061890472618155,
        height: screenHeight * 0.0013297872340426,
        marginLeft: screenWidth * -0.0007501875468867217,
        marginTop: screenHeight * 0.0172872340425532,
        borderBottomWidth: 1,
    },
    circlesContainer: {
        flexDirection: 'row',
        marginTop: screenHeight * 0.0345744680851064,
        marginLeft: screenWidth * 0.0011252813203301,
        height: screenHeight * 0.0398936170212766,
        width: screenWidth * 0.0900225056264066
    },
    deathSavesContainer: {
        flexDirection: 'column',
        width: screenWidth * 0.0870217554388597,
        height: screenHeight * 0.1981382978723404,
        marginLeft: screenWidth * 0.0067516879219805,
        backgroundColor: "#e8e8e8",
        borderWidth: 1,
        borderRadius: 0
    },
    deathSavesSubHeading: {
        position: "absolute",
        width: screenWidth * 0.0870217554388597,
        top: screenHeight * 0.0053191489361702,
        textAlign: "center",
        color: "#000000",
        fontSize: 11
    },
    deathSavesHeading: {
        position: "absolute",
        top: screenHeight * 0.0066489361702128,
        width: 116,
        textAlign: "center",
        color: "#0038d4"
    },
    HPContainer: {
        flexDirection: 'column'
    },
    passiveSkillsContainer: {
        flexDirection: 'column',
        width: screenWidth * 0.1762940735183796,
        height: screenHeight * 0.1988031914893617,
        marginLeft: screenWidth * 0.0037509377344336,
        borderRadius: 8,
        backgroundColor: "#e8e8e8",
        borderWidth: 1
    },
    passiveSkills: {
        marginTop: screenHeight * 0.0398936170212766
    },
    passiveSkillsHeading: {
        position: "absolute",
        top: screenHeight * 0.0066489361702128,
        width: screenWidth * 0.1762500044062501,
        textAlign: "center",
        color: "#0038d4"
    },
    passiveInputs: {
        marginBottom: screenHeight * 0.0132978723404255,
        marginLeft: screenWidth * 0.13200000033,
        width: screenWidth * 0.03750000009375,
        height: screenHeight * 0.0359042553191489,
        textAlign: "center",
        fontSize: 10,
        borderWidth: 1,
        backgroundColor: "#ffffff",
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0
    },
    passiveInputsHeading: {
        position: "absolute",
        left: screenWidth * 0.0045000001125,
        width: screenWidth * 0.129750000324375,
        height: screenHeight * 0.038563829787234,
        textAlign: "center",
        paddingTop: screenHeight * 0.0066489361702128,
        backgroundColor: "#c1c1c1",
        color: "#000000",
        fontSize: 11,
        borderWidth: 1
    },
    name: {
        marginBottom: screenHeight * 0.0132978723404255,
        marginLeft: screenWidth * 0.00750000001875,
        width: screenWidth * 0.1799940735183796,
        height: screenHeight * 0.0625,
        textAlign: "center",
        paddingTop: screenHeight * 0.0265957446808511,
        backgroundColor: "#e8e8e8",
        borderWidth: 1,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0
    },
    race: {
        marginBottom: screenHeight * 0.0132978723404255,
        marginLeft: screenWidth * 0.00750000001875,
        width: screenWidth * 0.1725940735183796,
        height: screenHeight * 0.0625,
        textAlign: "center",
        paddingTop: screenHeight * 0.0265957446808511,
        backgroundColor: "#e8e8e8",
        borderWidth: 1,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0
    },
    class: {
        marginBottom: screenHeight * 0.0132978723404255,
        marginLeft: screenWidth * 0.00750000001875,
        width: screenWidth * 0.1762940735183796,
        height: screenHeight * 0.0625,
        textAlign: "center",
        paddingTop: screenHeight * 0.0265957446808511,
        backgroundColor: "#e8e8e8",
        borderWidth: 1,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0
    },

    secondRowFirstHalf: {
        height: screenHeight * 0.450000001125,
        flexDirection: "row",
        width: screenWidth * 0.450000001125,
        position: 'absolute',
        top: screenHeight * 0.1156914893617021,
        left: screenWidth * 0.15750000039375
    },
    secondRowSecondHalf: {
        height: screenHeight * 0.265957446808511,
        flexDirection: "row",
        width: screenWidth * 0.750000001875,
        position: 'absolute',
        top: screenHeight * 0.1156914893617021,
        left: screenWidth * 0.62250000155625
    },
    nameRaceClassHeading: {
        position: "absolute",
        left: screenWidth * 0.00750000001875,
        top: screenHeight * 0.0066489361702128,
        width: screenWidth * 0.1762500000440625,
        textAlign: "center",
        color: "#0038d4"
    },
    levelCurrentHPHitDice: {
        marginBottom: screenHeight * 0.0132978723404255,
        marginLeft: screenWidth * 0.00750000001875,
        width: screenWidth * 0.086250000215625,
        height: screenHeight * 0.0625,
        textAlign: "center",
        paddingTop: screenHeight * 0.0265957446808511,
        backgroundColor: "#e8e8e8",
        borderWidth: 1,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0
    },
    maxHPInputs: {
        marginBottom: screenHeight * 0.0132978723404255,
        marginLeft: screenWidth * 0.00750000001875,
        width: screenWidth * 0.086250000215625,
        height: screenHeight * 0.0625,
        textAlign: "center",
        paddingTop: screenHeight * 0.0265957446808511,
        backgroundColor: "#e8e8e8",
        borderWidth: 1,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0
    },
    tempHPInputs: {
        marginBottom: screenHeight * 0.0132978723404255,
        marginLeft: screenWidth * 0.00750000001875,
        width: screenWidth * 0.086250000215625,
        height: screenHeight * 0.0625,
        textAlign: "center",
        paddingTop: screenHeight * 0.0265957446808511,
        backgroundColor: "#e8e8e8",
        borderWidth: 1,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0
    },
    levelCurrentHPHitDiceHeading: {
        position: "absolute",
        left: screenWidth * 0.0075000000001875,
        top: screenHeight * 0.0066489361702128,
        width: screenWidth * 0.086250000215625,
        textAlign: "center",
        color: "#0038d4"
    },
    topRow: {
        flexDirection: "row",
        width: screenWidth * 0.7500000001875,
        height: screenHeight * 0.0890957446808511,
        position: 'absolute',
        top: screenHeight * 0.0132978723404255,
        left: screenWidth * 0.157500000039375
    },
    textInputHeading: {
        position: "absolute",
        left: screenWidth * 0.0075018754688672,
        top: screenHeight * 0.0066489361702128,
        width: screenWidth * 0.0712678169542386,
        textAlign: "center",
        color: "#0038d4",
    },
    profInputHeading: {
        position: "absolute",
        left: screenWidth * 0.0075018754688672,
        top: screenHeight * 0.0066489361702128,
        width: screenWidth * 0.1500375093773443,
        textAlign: "center",
        color: "#0038d4"
    },
    charImage: {
        width: screenWidth * 0.15000000000000,
        height: screenHeight * 0.2659574468085106,
        marginTop: screenHeight * 0.0132978723404255,
        marginLeft: screenWidth * 0.007500000001875,
        marginBottom: screenHeight * 0.0132978723404255
    },
    imageAndAbilitiesContainer: {
        flexDirection: "column",
        height: screenHeight * 1.329787234042553,
        width: screenWidth * 0.187500000046875,
    },
    abilityScoresStyle: {
        marginBottom: screenHeight * 0.0132978723404255,
        marginLeft: screenWidth * 0.007500000001875,
        width: screenWidth * 0.0712500000178125,
        height: screenHeight * 0.0824468085106383,
        textAlign: "center",
        paddingTop: screenHeight * 0.0199468085106383,
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
        marginBottom: screenHeight * 0.0132978723404255,
        marginLeft: screenWidth * 0.007500000001875,
        width: screenWidth * 0.15000000000000,
        height: screenHeight * 0.0824468085106383,
        textAlign: "center",
        paddingTop: screenHeight * 0.0199468085106383,
        backgroundColor: "#e8e8e8",
        borderWidth: 1,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0
    },
    changeImageStyle: {
        marginBottom: screenHeight * 0.0132978723404255,
        marginLeft: screenWidth * 0.007500000001875,
        width: screenWidth * 0.15000000000000
    }
})
