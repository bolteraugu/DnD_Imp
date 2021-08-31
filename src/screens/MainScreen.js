import React, {useContext, useEffect, useState} from 'react'; //Will need react
import {
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
    TextInput as NativeTextInput
} from 'react-native';
import {TextInput, Text, Button, Portal, Dialog, Title, IconButton, Provider} from "react-native-paper"; //Probably will need text...
import colors from '../utils/colors';
import Spinner from "../components/Spinner";
import {AuthUserContext} from "../navigation/AuthUserProvider";

export default function MainScreen({route, navigation}) {
    const [character, setCharacter] = useState(route.params.character);
    const [loading, setLoading] = useState(true);
    const {user} = useContext(AuthUserContext);
    const showImageDialog = () => setImageVisible(true);
    const hideImageDialog = () => setImageVisible(false);
    const [imageVisible, setImageVisible] = useState(false);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', e => {
            setLoading(true)
            global.charaRef = route.params.charRef;
            global.character = route.params.character;
            global.onFSChange = route.params.onFSChange;
            global.index = route.params.index;
            global.isDM = route.params.isDM;
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

    function updateCharacterLocal(fieldName, text) {
        let tempCharacter = JSON.parse(JSON.stringify(character));
        tempCharacter[fieldName] = text;
        setCharacter(tempCharacter);
    }

    function updateCharacter(fieldName, value) {
        if (fieldName === 'strength') {
            global.charaRef
                .update({
                    strength: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'constitution') {
            global.charaRef
                .update({
                    constitution: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'dexterity') {
            global.charaRef
                .update({
                    dexterity: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'wisdom') {
            global.charaRef
                .update({
                    wisdom: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'intelligence') {
            global.charaRef
                .update({
                    intelligence: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'charisma') {
            global.charaRef
                .update({
                    charisma: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'proficiency') {
            global.charaRef
                .update({
                    proficiency: value
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
                    level: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'current_hp') {
            global.charaRef
                .update({
                    current_hp: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'temp_hp') {
            global.charaRef
                .update({
                    temp_hp: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'max_hp') {
            global.charaRef
                .update({
                    max_hp: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'armor_class') {
            global.charaRef
                .update({
                    armor_class: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'initiative') {
            global.charaRef
                .update({
                    initiative: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'speed') {
            global.charaRef
                .update({
                    speed: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'passive_perception') {
            global.charaRef
                .update({
                    passive_perception: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'passive_investigation') {
            global.charaRef
                .update({
                    passive_investigation: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'passive_insight') {
            global.charaRef
                .update({
                    passive_insight: value
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
                    ST_strength: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'ST_dexterity') {
            global.charaRef
                .update({
                    ST_dexterity: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'ST_constitution') {
            global.charaRef
                .update({
                    ST_constitution: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'ST_intelligence') {
            global.charaRef
                .update({
                    ST_intelligence: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'ST_wisdom') {
            global.charaRef
                .update({
                    ST_wisdom: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'ST_charisma') {
            global.charaRef
                .update({
                    ST_charisma: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'acrobatics') {
            global.charaRef
                .update({
                    acrobatics: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'animal_handling') {
            global.charaRef
                .update({
                    animal_handling: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'arcana') {
            global.charaRef
                .update({
                    arcana: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'athletics') {
            global.charaRef
                .update({
                    athletics: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'deception') {
            global.charaRef
                .update({
                    deception: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'history') {
            global.charaRef
                .update({
                    history: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'insight') {
            global.charaRef
                .update({
                    insight: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'intimidation') {
            global.charaRef
                .update({
                    intimidation: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'investigation') {
            global.charaRef
                .update({
                    investigation: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'medicine') {
            global.charaRef
                .update({
                    medicine: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'nature') {
            global.charaRef
                .update({
                    nature: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'perception') {
            global.charaRef
                .update({
                    perception: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'performance') {
            global.charaRef
                .update({
                    performance: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'persuasion') {
            global.charaRef
                .update({
                    persuasion: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'religion') {
            global.charaRef
                .update({
                    religion: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'sleight_of_hand') {
            global.charaRef
                .update({
                    sleight_of_hand: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'stealth') {
            global.charaRef
                .update({
                    stealth: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'survival') {
            global.charaRef
                .update({
                    survival: value
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
        else if (fieldName === 'imageName') {
            global.charaRef
                .update({
                    imageName: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'actualImageName') {
            global.charaRef
                .update({
                    actualImageName: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'imageUUID') {
            global.charaRef
                .update({
                    imageUUID: value
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
        <Provider>
        <View style = {{height: screenHeight * 0.85}}>
            {/*<tabNavigator/>*/}
            <View style = {styles.imageAndAbilitiesContainer}>
                <TouchableOpacity
                    onPress={() => {
                        showImageDialog();
                    }}
                >
                    <Image
                        source={{uri: character.imageName}}
                        style = {styles.charImage}
                    />
                </TouchableOpacity>
                <Button
                    mode="contained"
                    style={styles.changeImageStyle}
                    disabled = {!(global.isDM || character.assignedTo === user.toJSON().email)}
                    onPress={() =>
                        navigation.navigate('ImageSelector', {
                            comingFrom: "MainScreen",
                            charRef: route.params.charRef,
                            character: character,
                            groupRef: route.params.groupRef,
                            index: route.params.index,
                            onImageChange: route.params.onFSChange,
                            onImageChangeLocal: updateCharacterLocal,
                            onImageChangeFirebase: updateCharacter,
                        })
                    }
                >
                    Change Image
                </Button>
                <View style = {styles.abilityScoresContainer}>
                    <View style = {styles.firstHalfAS}>
                        <View>
                            <TextInput
                                style={styles.abilityScoresStyle}
                                keyboardType="phone-pad"
                                editable={global.isDM || character.assignedTo === user.toJSON().email}
                                underlineColor="transparent"
                                value={character.strength}
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index, 'strength', text);
                                    updateCharacterLocal('strength', text);
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
                                keyboardType="phone-pad"
                                editable={global.isDM || character.assignedTo === user.toJSON().email}
                                underlineColor="transparent"
                                value={character.constitution}
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index,'constitution', text);
                                    updateCharacterLocal('constitution', text);
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
                                keyboardType="phone-pad"
                                editable={global.isDM || character.assignedTo === user.toJSON().email}
                                underlineColor="transparent"
                                value={character.wisdom}
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index, 'wisdom', text);
                                    updateCharacterLocal('wisdom', text);
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
                                keyboardType="phone-pad"
                                editable={global.isDM || character.assignedTo === user.toJSON().email}
                                underlineColor="transparent"
                                value={character.dexterity}
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index,'dexterity', text);
                                    updateCharacterLocal('dexterity', text);
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
                                keyboardType="phone-pad"
                                editable={global.isDM || character.assignedTo === user.toJSON().email}
                                underlineColor="transparent"
                                value={character.intelligence}
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index,'intelligence', text);
                                    updateCharacterLocal('intelligence', text);
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
                                keyboardType="phone-pad"
                                editable={global.isDM || character.assignedTo === user.toJSON().email}
                                underlineColor="transparent"
                                value={character.charisma}
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index,'charisma', text);
                                    updateCharacterLocal('charisma', text);
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
                        keyboardType="phone-pad"
                        editable={global.isDM || character.assignedTo === user.toJSON().email}
                        underlineColor="transparent"
                        value={character.proficiency}
                        onChangeText={(text) => {
                            route.params.onFSChange(route.params.index,'proficiency', text);
                            updateCharacterLocal('proficiency', text);
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
                        editable={global.isDM || character.assignedTo === user.toJSON().email}
                        placeholder={"Enter name..."}
                        onChangeText={(text) => {
                            route.params.onFSChange(route.params.index,'name', text);
                            updateCharacterLocal('name', text);
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
                        editable={global.isDM || character.assignedTo === user.toJSON().email}
                        placeholder={"Enter race..."}
                        onChangeText={(text) => {
                            console.log(text);
                            route.params.onFSChange(route.params.index,'char_race', text);
                            updateCharacterLocal('char_race', text);
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
                        editable={global.isDM || character.assignedTo === user.toJSON().email}
                        placeholder={"Enter class..."}
                        onChangeText={(text) => {
                            route.params.onFSChange(route.params.index,'char_class', text);
                            updateCharacterLocal('char_class', text);
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
                        keyboardType="phone-pad"
                        editable={global.isDM || character.assignedTo === user.toJSON().email}
                        underlineColor="transparent"
                        value={character.level}
                        onChangeText={(text) => {
                            route.params.onFSChange(route.params.index,'level', text);
                            updateCharacterLocal('level', text);
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
                        keyboardType="phone-pad"
                        editable={global.isDM || character.assignedTo === user.toJSON().email}
                        underlineColor="transparent"
                        value={character.current_hp}
                        onChangeText={(text) => {
                            route.params.onFSChange(route.params.index,'current_hp', text);
                            updateCharacterLocal('current_hp', text);
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
                        editable={global.isDM || character.assignedTo === user.toJSON().email}
                        onChangeText={(text) => {
                            route.params.onFSChange(route.params.index,'hit_dice', text);
                            updateCharacterLocal('hit_dice', text);
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
                        keyboardType="phone-pad"
                        editable={global.isDM || character.assignedTo === user.toJSON().email}
                        underlineColor="transparent"
                        value={character.armor_class}
                        onChangeText={(text) => {
                            route.params.onFSChange(route.params.index,'armor_class', text);
                            updateCharacterLocal('armor_class', text);
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
                        keyboardType="phone-pad"
                        editable={global.isDM || character.assignedTo === user.toJSON().email}
                        underlineColor="transparent"
                        value={character.initiative}
                        onChangeText={(text) => {
                            route.params.onFSChange(route.params.index,'initiative', text);
                            updateCharacterLocal('initiative', text);
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
                        keyboardType="phone-pad"
                        editable={global.isDM || character.assignedTo === user.toJSON().email}
                        value={character.speed}
                        underlineColor="transparent"
                        onChangeText={(text) => {
                            route.params.onFSChange(route.params.index,'speed', text);
                            updateCharacterLocal('speed', text);
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
                        editable={global.isDM || character.assignedTo === user.toJSON().email}
                        placeholder={"Enter alignment..."}
                        onChangeText={(text) => {
                            route.params.onFSChange(route.params.index,'alignment', text);
                            updateCharacterLocal('alignment', text);
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
                                keyboardType="phone-pad"
                                editable={global.isDM || character.assignedTo === user.toJSON().email}
                                underlineColor="transparent"
                                value={character.passive_perception}
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index,'passive_perception', text);
                                    updateCharacterLocal('passive_perception', text);
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
                                keyboardType="phone-pad"
                                editable={global.isDM || character.assignedTo === user.toJSON().email}
                                underlineColor="transparent"
                                value={character.passive_investigation}
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index,'passive_investigation', text);
                                    updateCharacterLocal('passive_investigation', text);
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
                                keyboardType="phone-pad"
                                editable={global.isDM || character.assignedTo === user.toJSON().email}
                                underlineColor="transparent"
                                value={character.passive_insight}
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index,'passive_insight', text);
                                    updateCharacterLocal('passive_insight', text);
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
                            keyboardType="phone-pad"
                            editable={global.isDM || character.assignedTo === user.toJSON().email}
                            underlineColor="transparent"
                            value={character.max_hp}
                            onChangeText={(text) => {
                                route.params.onFSChange(route.params.index,'max_hp', text);
                                updateCharacterLocal('max_hp', text);
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
                            keyboardType="phone-pad"
                            editable={global.isDM || character.assignedTo === user.toJSON().email}
                            underlineColor="transparent"
                            value={character.temp_hp}
                            onChangeText={(text) => {
                                route.params.onFSChange(route.params.index,'temp_hp', text);
                                updateCharacterLocal('temp_hp', text);
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
                                            if (global.isDM || character.assignedTo === user.toJSON().email) {
                                                if (character.DS_successCircle1  === "#00db79") {
                                                    route.params.onFSChange(route.params.index,'DS_successCircle1', "#ffffff");
                                                    updateCharacterLocal('DS_successCircle1', "#ffffff");
                                                    updateCharacter('DS_successCircle1', "#ffffff");
                                                } else {
                                                    route.params.onFSChange(route.params.index,'DS_successCircle1', "#00db79");
                                                    updateCharacterLocal('DS_successCircle1', "#00db79");
                                                    updateCharacter('DS_successCircle1', "#00db79");
                                                }
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
                                            if (global.isDM || character.assignedTo === user.toJSON().email) {
                                                if (character.DS_successCircle2 === "#00db79") {
                                                    route.params.onFSChange(route.params.index, 'DS_successCircle2', "#ffffff");
                                                    updateCharacterLocal('DS_successCircle2', "#ffffff");
                                                    updateCharacter('DS_successCircle2', "#ffffff")
                                                } else {
                                                    route.params.onFSChange(route.params.index, 'DS_successCircle2', "#00db79");
                                                    updateCharacterLocal('DS_successCircle2', "#00db79");
                                                    updateCharacter('DS_successCircle2', "#00db79")
                                                }
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
                                        if (global.isDM || character.assignedTo === user.toJSON().email) {
                                            if (character.DS_successCircle3 === "#00db79") {
                                                route.params.onFSChange(route.params.index, 'DS_successCircle3', "#ffffff");
                                                updateCharacterLocal('DS_successCircle3', "#ffffff");
                                                updateCharacter('DS_successCircle3', "#ffffff")
                                            } else {
                                                route.params.onFSChange(route.params.index, 'DS_successCircle3', "#00db79");
                                                updateCharacterLocal('DS_successCircle3', "#00db79");
                                                updateCharacter('DS_successCircle3', "#00db79")
                                            }
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
                                            if (global.isDM || character.assignedTo === user.toJSON().email) {
                                                if (character.DS_failureCircle1 === "#f51b1b") {
                                                    route.params.onFSChange(route.params.index, 'DS_failureCircle1', "#ffffff");
                                                    updateCharacterLocal('DS_failureCircle1', "#ffffff");
                                                    updateCharacter('DS_failureCircle1', "#ffffff");
                                                } else {
                                                    route.params.onFSChange(route.params.index, 'DS_failureCircle1', "#f51b1b");
                                                    updateCharacterLocal('DS_failureCircle1', "#f51b1b");
                                                    updateCharacter('DS_failureCircle1', "#f51b1b");
                                                }
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
                                            if (global.isDM || character.assignedTo === user.toJSON().email) {
                                                if (character.DS_failureCircle2 === "#f51b1b") {
                                                    route.params.onFSChange(route.params.index, 'DS_failureCircle2', "#ffffff");
                                                    updateCharacterLocal('DS_failureCircle2', "#ffffff");
                                                    updateCharacter('DS_failureCircle2', "#ffffff");
                                                } else {
                                                    route.params.onFSChange(route.params.index, 'DS_failureCircle2', "#f51b1b");
                                                    updateCharacterLocal('DS_failureCircle2', "#f51b1b");
                                                    updateCharacter('DS_failureCircle2', "#f51b1b");
                                                }
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
                                        if (global.isDM || character.assignedTo === user.toJSON().email) {
                                            if (character.DS_failureCircle3 === "#f51b1b") {
                                                route.params.onFSChange(route.params.index, 'DS_failureCircle3', "#ffffff");
                                                updateCharacterLocal('DS_failureCircle3', "#ffffff");
                                                updateCharacter('DS_failureCircle3', "#ffffff");
                                            } else {
                                                route.params.onFSChange(route.params.index, 'DS_failureCircle3', "#f51b1b");
                                                updateCharacterLocal('DS_failureCircle3', "#f51b1b");
                                                updateCharacter('DS_failureCircle3', "#f51b1b");
                                            }
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
                            keyboardType="phone-pad"
                            value = {character.ST_strength}
                            editable={global.isDM || character.assignedTo === user.toJSON().email}
                            underlineColor="transparent"
                            onChangeText={(text) => {
                                route.params.onFSChange(route.params.index,'ST_strength', text);
                                updateCharacterLocal('ST_strength', text);
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
                            keyboardType="phone-pad"
                            value = {character.ST_dexterity}
                            editable={global.isDM || character.assignedTo === user.toJSON().email}
                            underlineColor="transparent"
                            onChangeText={(text) => {
                                route.params.onFSChange(route.params.index,'ST_dexterity', text);
                                updateCharacterLocal('ST_dexterity', text);
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
                            keyboardType="phone-pad"
                            value = {character.ST_constitution}
                            editable={global.isDM || character.assignedTo === user.toJSON().email}
                            underlineColor="transparent"
                            onChangeText={(text) => {
                                route.params.onFSChange(route.params.index,'ST_constitution', text);
                                updateCharacterLocal('ST_constitution', text);
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
                            value = {character.ST_intelligence}
                            keyboardType="phone-pad"
                            editable={global.isDM || character.assignedTo === user.toJSON().email}
                            underlineColor="transparent"
                            onChangeText={(text) => {
                                route.params.onFSChange(route.params.index,'ST_intelligence', text);
                                updateCharacterLocal('ST_intelligence', text);
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
                            keyboardType="phone-pad"
                            value = {character.ST_wisdom}
                            editable={global.isDM || character.assignedTo === user.toJSON().email}
                            underlineColor="transparent"
                            onChangeText={(text) => {
                                route.params.onFSChange(route.params.index,'ST_wisdom', text);
                                updateCharacterLocal('ST_wisdom', text);
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
                            keyboardType="phone-pad"
                            value = {character.ST_charisma}
                            editable={global.isDM || character.assignedTo === user.toJSON().email}
                            underlineColor="transparent"
                            onChangeText={(text) => {
                                route.params.onFSChange(route.params.index,'ST_charisma', text);
                                updateCharacterLocal('ST_charisma', text);
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
                                keyboardType="phone-pad"
                                value = {character.acrobatics}
                                editable={global.isDM || character.assignedTo === user.toJSON().email}
                                underlineColor="transparent"
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index,'acrobatics', text);
                                    updateCharacterLocal('acrobatics', text);
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
                                keyboardType="phone-pad"
                                value = {character.animal_handling}
                                editable={global.isDM || character.assignedTo === user.toJSON().email}
                                underlineColor="transparent"
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index,'animal_handling', text);
                                    updateCharacterLocal('animal_handling', text);
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
                                keyboardType="phone-pad"
                                value = {character.arcana}
                                editable={global.isDM || character.assignedTo === user.toJSON().email}
                                underlineColor="transparent"
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index,'arcana', text);
                                    updateCharacterLocal('arcana', text);
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
                                keyboardType="phone-pad"
                                value = {character.athletics}
                                editable={global.isDM || character.assignedTo === user.toJSON().email}
                                underlineColor="transparent"
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index,'athletics', text);
                                    updateCharacterLocal('athletics', text);
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
                                keyboardType="phone-pad"
                                value = {character.deception}
                                editable={global.isDM || character.assignedTo === user.toJSON().email}
                                underlineColor="transparent"
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index,'deception', text);
                                    updateCharacterLocal('deception', text);
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
                                keyboardType="phone-pad"
                                value = {character.history}
                                editable={global.isDM || character.assignedTo === user.toJSON().email}
                                underlineColor="transparent"
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index,'history', text);
                                    updateCharacterLocal('history', text);
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
                                keyboardType="phone-pad"
                                value = {character.insight}
                                editable={global.isDM || character.assignedTo === user.toJSON().email}
                                underlineColor="transparent"
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index,'insight', text);
                                    updateCharacterLocal('insight', text);
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
                                keyboardType="phone-pad"
                                value = {character.intimidation}
                                editable={global.isDM || character.assignedTo === user.toJSON().email}
                                underlineColor="transparent"
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index,'intimidation', text);
                                    updateCharacterLocal('intimidation', text);
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
                                keyboardType="phone-pad"
                                value = {character.investigation}
                                editable={global.isDM || character.assignedTo === user.toJSON().email}
                                underlineColor="transparent"
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index,'investigation', text);
                                    updateCharacterLocal('investigation', text);
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
                                keyboardType="phone-pad"
                                value = {character.medicine}
                                editable={global.isDM || character.assignedTo === user.toJSON().email}
                                underlineColor="transparent"
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index,'medicine', text);
                                    updateCharacterLocal('medicine', text);
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
                                keyboardType="phone-pad"
                                value = {character.nature}
                                editable={global.isDM || character.assignedTo === user.toJSON().email}
                                underlineColor="transparent"
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index,'nature', text);
                                    updateCharacterLocal('nature', text);
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
                                keyboardType="phone-pad"
                                value = {character.perception}
                                editable={global.isDM || character.assignedTo === user.toJSON().email}
                                underlineColor="transparent"
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index,'perception', text);
                                    updateCharacterLocal('perception', text);
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
                                keyboardType="phone-pad"
                                value = {character.performance}
                                editable={global.isDM || character.assignedTo === user.toJSON().email}
                                underlineColor="transparent"
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index,'performance', text);
                                    updateCharacterLocal('performance', text);
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
                                keyboardType="phone-pad"
                                value = {character.persuasion}
                                editable={global.isDM || character.assignedTo === user.toJSON().email}
                                underlineColor="transparent"
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index,'persuasion', text);
                                    updateCharacterLocal('persuasion', text);
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
                                keyboardType="phone-pad"
                                value = {character.religion}
                                editable={global.isDM || character.assignedTo === user.toJSON().email}
                                underlineColor="transparent"
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index,'religion', text);
                                    updateCharacterLocal('religion', text);
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
                                keyboardType="phone-pad"
                                underlineColor="transparent"
                                value = {character.sleight_of_hand}
                                editable={global.isDM || character.assignedTo === user.toJSON().email}
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index,'sleight_of_hand', text);
                                    updateCharacterLocal('sleight_of_hand', text);
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
                                keyboardType="phone-pad"
                                value = {character.stealth}
                                editable={global.isDM || character.assignedTo === user.toJSON().email}
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index,'stealth', text);
                                    updateCharacterLocal('stealth', text);
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
                                keyboardType="phone-pad"
                                value = {character.survival}
                                editable={global.isDM || character.assignedTo === user.toJSON().email}
                                onChangeText={(text) => {
                                    route.params.onFSChange(route.params.index,'survival', text);
                                    updateCharacterLocal('survival', text);
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
                editable={global.isDM || character.assignedTo === user.toJSON().email}
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
                        editable={global.isDM || character.assignedTo === user.toJSON().email}
                    />
                )}
                onChangeText={(text) => {
                    route.params.onFSChange(route.params.index,'proficiencies_and_languages', text);
                    updateCharacterLocal('proficiencies_and_languages', text);
                    updateCharacter('proficiencies_and_languages', text);
                }}
            />
            <Text
                style = {styles.profAndLanguagesHeading}
            >
                Proficiencies and languages
            </Text>
        </View>
            <Portal>
                <Dialog
                    visible={imageVisible}
                    onDismiss={hideImageDialog}
                    style = {styles.fullSizeWindow}
                >
                    <View style = {styles.headingRow}>
                        <View style = {styles.centerFSImageTitle}>
                            <Title
                                style = {styles.helpTitle}
                            >
                                {character.actualImageName !== "" ? character.actualImageName : ""}
                            </Title>
                        </View>
                    </View>
                    <IconButton
                        icon="close" //Getting the back icon image
                        size={38} //Setting the size
                        color="#a60000" //And the color
                        style = {styles.exitButton}
                        onPress={() => {
                            hideImageDialog()
                        }} //When clicked on make it go back to the previous route
                    />
                    <Image
                        source={character.imageName !== "" ? {uri: character.imageName} : {uri: ""}}
                        style={styles.fullSizeImage}
                    />
                    <View/>
                </Dialog>
            </Portal>
        </Provider>
    );
    // TOP NESTED TAB NAVIGATION
    // MAIN | NOTES | SPELLS

    // MAIN SHOWS ALL CARD INFO IN A DIFF LAYOUT

    // NOTES IS SIMPLE TITLE,CONTENT FLATLIST WITH INPUT

    // CHAT SHOULD BE VISIBLE AT ALL TIMES
    // IDEALLY NOT HAVING TO BE RELOADED EACH TIME
}
const styles = StyleSheet.create({
    fullSizeWindow: {
        width: screenWidth * 0.973,
        height: screenHeight * 0.82,
        marginTop: screenHeight * 0.0233829787234
    },
    fullSizeImage: {
        width: screenWidth * 0.973,
        height: screenHeight * 0.72,
        marginTop: screenHeight * 0.01163829787234,
        resizeMode: "center"
    },
    headingRow: {
        height: screenHeight * 0.04,
        marginTop: screenHeight * 0.015
    },
    helpTitle: {
        alignSelf: 'center',
        fontSize: 23
    },
    centerFSImageTitle: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    exitButton: {
        marginLeft: screenWidth * 0.937,
        marginTop: screenHeight * -0.067
    },
    gap: {
      height: screenHeight * 0.0692
    },
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
        marginBottom: screenHeight * 0.0132978723404255,
        resizeMode: "center"
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
