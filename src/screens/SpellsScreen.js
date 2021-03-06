import {useContext, useEffect, useState} from "react";
import React from "react"
import {
    Dimensions,
    FlatList,
    Keyboard,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from "react-native"
import {Button, Dialog, IconButton, Portal, Provider, Text, TextInput} from "react-native-paper";
import Spinner from "../components/Spinner";
import Spell from "../components/Spell";
import {AuthUserContext} from "../navigation/AuthUserProvider";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

global.screenWidth = Dimensions.get("window").width;
global.screenHeight = Dimensions.get("window").height;

export default function SpellsScreen({route, navigation}) {
    const [character, setCharacter] = useState(global.character);
    const pushChange = global.onFSChange
    const [spells, setSpells] = useState([]);
    const [loading, setLoading] = useState(true);
    const {user} = useContext(AuthUserContext);
    const [helpVisible, setHelpVisible] = useState(false);
    const hideHelpDialog = () => setHelpVisible(false);
    const showHelpDialog = () => setHelpVisible(true);

    global.ShowHelpCharacterSheet = () => {
        Keyboard.dismiss();
        showHelpDialog();
    };

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            navigation.addListener('focus', e => {
                setLoading(true)
                global.charaRef.onSnapshot( (snapshot) => {
                    setCharacter(snapshot.data())
                });
                global.charaRef.collection("spells").onSnapshot(
                    (querySnapshot) => {
                        const spells = querySnapshot.docs.map((doc) => {
                            const data = {
                                _id: doc.id,
                                ...doc.data(),
                            };
                            return data;
                        });
                        setSpells(spells);

                        if (loading) {
                            setLoading(false);
                        }
                    },
                    (error) => {
                        alert(error);
                    }
                );
            });
        }
        return () => { isMounted = false }
    }, [navigation]);

    if (loading) {
        return <Spinner />;
    }

    function updateCharacterLocal(fieldName, text, isNumber) {
        let tempCharacter = JSON.parse(JSON.stringify(character));
        tempCharacter[fieldName] = isNumber ? Number(text) : text;
        setCharacter(tempCharacter);
    }

    function updateSpell(index, field, value) {
        const newSpells = [...spells];
        console.log(index);
        newSpells[index][field] = value;
        setSpells(newSpells);
    }

    function updateCharacter(fieldName, value) {
        if (fieldName === 'spellcasting_ability') {
            global.charaRef
                .update({
                    spellcasting_ability: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'spell_save_DC') {
            global.charaRef
                .update({
                    spell_save_DC: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'spell_attack_bonus') {
            global.charaRef
                .update({
                    spell_attack_bonus: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'first_level_spell_slots') {
            global.charaRef
                .update({
                    first_level_spell_slots: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'second_level_spell_slots') {
            global.charaRef
                .update({
                    second_level_spell_slots: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'third_level_spell_slots') {
            global.charaRef
                .update({
                    third_level_spell_slots: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'fourth_level_spell_slots') {
            global.charaRef
                .update({
                    fourth_level_spell_slots: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'fifth_level_spell_slots') {
            global.charaRef
                .update({
                    fifth_level_spell_slots: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'sixth_level_spell_slots') {
            global.charaRef
                .update({
                    sixth_level_spell_slots: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'seventh_level_spell_slots') {
            global.charaRef
                .update({
                    seventh_level_spell_slots: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'eighth_level_spell_slots') {
            global.charaRef
                .update({
                    eighth_level_spell_slots: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'ninth_level_spell_slots') {
            global.charaRef
                .update({
                    ninth_level_spell_slots: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
    }

    let index = 0;
    return (
            <Provider>
                <KeyboardAwareScrollView
                    extraHeight={screenHeight * 0.1412}
                >
                <View>
                    <View style = {styles.totalContainer}>
                        <View style = {styles.topRow}>
                            <View style = {styles.spellsInfoContainer}>
                                <View style =  {styles.spellsContainer}>
                                    <TextInput
                                        style={styles.spellcastingInput}
                                        underlineColor="transparent"
                                        editable={isDM || character.assignedTo === user.toJSON().email}
                                        placeholder={"Enter spellcasting ability..."}
                                        value={character.spellcasting_ability}
                                        onChangeText={(text) => {
                                            pushChange(global.index, 'spellcasting_ability', text);
                                            updateCharacterLocal('spellcasting_ability', text);
                                            updateCharacter('spellcasting_ability', text);
                                        }}
                                    />
                                    <Text
                                        style = {styles.spellcastingInputHeading}
                                    >
                                        Spellcasting ability
                                    </Text>
                                </View>
                                <View style =  {styles.spellsContainer}>
                                    <TextInput
                                        style={styles.spellsInput}
                                        keyboardType="phone-pad"
                                        editable={isDM || character.assignedTo === user.toJSON().email}
                                        placeholder={"Enter spell save DC..."}
                                        underlineColor="transparent"
                                        value={character.spell_save_DC}
                                        onChangeText={(text) => {
                                            pushChange(global.index, 'spell_save_DC', text);
                                            updateCharacterLocal('spell_save_DC', text);
                                            updateCharacter('spell_save_DC', text);
                                        }}
                                    />
                                    <Text
                                        style = {styles.textInputHeading}
                                    >
                                        Spell Save DC
                                    </Text>
                                </View>
                                <View style =  {styles.spellsContainer}>
                                    <TextInput
                                        style={styles.spellsInput}
                                        keyboardType="phone-pad"
                                        editable={isDM || character.assignedTo === user.toJSON().email}
                                        placeholder={"Enter spell attack bonus..."}
                                        underlineColor="transparent"
                                        value={character.spell_attack_bonus}
                                        onChangeText={(text) => {
                                            pushChange(global.index, 'spell_attack_bonus', text);
                                            updateCharacterLocal('spell_attack_bonus', text);
                                            updateCharacter('spell_attack_bonus', text);
                                        }}
                                    />
                                    <Text
                                        style = {styles.textInputHeading}
                                    >
                                        Spell Attack Bonus
                                    </Text>
                                </View>
                            </View>
                            <View style = {styles.spellsSlotsContainer}>
                                <Text
                                    style = {styles.spellSlotHeading}
                                >
                                    Spell Slots
                                </Text>
                                <View style = {styles.spellSlotFirstRow}>
                                    <View style =  {styles.spellsContainer}>
                                        <TextInput
                                            style={styles.spellSlotInput}
                                            underlineColor="transparent"
                                            keyboardType="phone-pad"
                                            editable={isDM || character.assignedTo === user.toJSON().email}
                                            placeholder={"Enter 1st-level spell slots..."}
                                            value={character.first_level_spell_slots}
                                            onChangeText={(text) => {
                                                pushChange(global.index, 'first_level_spell_slots', text);
                                                updateCharacterLocal('first_level_spell_slots', text);
                                                updateCharacter('first_level_spell_slots', text);
                                            }}
                                        />
                                        <Text
                                            style = {styles.textInputHeading}
                                        >
                                            1st-level
                                        </Text>
                                    </View>
                                    <View style =  {styles.spellsContainer}>
                                        <TextInput
                                            style={styles.spellSlotInput}
                                            keyboardType="phone-pad"
                                            editable={isDM || character.assignedTo === user.toJSON().email}
                                            placeholder={"Enter 2nd-level spell slots..."}
                                            underlineColor="transparent"
                                            value={character.second_level_spell_slots}
                                            onChangeText={(text) => {
                                                pushChange(global.index, 'second_level_spell_slots', text);
                                                updateCharacterLocal('second_level_spell_slots', text);
                                                updateCharacter('second_level_spell_slots', text);
                                            }}
                                        />
                                        <Text
                                            style = {styles.textInputHeading}
                                        >
                                            2nd-level
                                        </Text>
                                    </View>
                                    <View style =  {styles.spellsContainer}>
                                        <TextInput
                                            style={styles.spellSlotInput}
                                            keyboardType="phone-pad"
                                            editable={isDM || character.assignedTo === user.toJSON().email}
                                            placeholder={"Enter 3rd-level spell slots..."}
                                            underlineColor="transparent"
                                            value={character.third_level_spell_slots}
                                            onChangeText={(text) => {
                                                pushChange(global.index, 'third_level_spell_slots', text);
                                                updateCharacterLocal('third_level_spell_slots', text);
                                                updateCharacter('third_level_spell_slots', text);
                                            }}
                                        />
                                        <Text
                                            style = {styles.textInputHeading}
                                        >
                                            3rd-level
                                        </Text>
                                    </View>
                                </View>
                                <View style = {styles.spellSlotRow}>
                                    <View style =  {styles.spellsContainer}>
                                        <TextInput
                                            style={styles.spellSlotInput}
                                            underlineColor="transparent"
                                            keyboardType="phone-pad"
                                            editable={isDM || character.assignedTo === user.toJSON().email}
                                            placeholder={"Enter 4th-level spell slots..."}
                                            value={character.fourth_level_spell_slots}
                                            onChangeText={(text) => {
                                                pushChange(global.index, 'fourth_level_spell_slots', text);
                                                updateCharacterLocal('fourth_level_spell_slots', text);
                                                updateCharacter('fourth_level_spell_slots', text);
                                            }}
                                        />
                                        <Text
                                            style = {styles.textInputHeading}
                                        >
                                            4th-level
                                        </Text>
                                    </View>
                                    <View style =  {styles.spellsContainer}>
                                        <TextInput
                                            style={styles.spellSlotInput}
                                            keyboardType="phone-pad"
                                            editable={isDM || character.assignedTo === user.toJSON().email}
                                            placeholder={"Enter 5th-level spell slots..."}
                                            underlineColor="transparent"
                                            value={character.fifth_level_spell_slots}
                                            onChangeText={(text) => {
                                                pushChange(global.index, 'fifth_level_spell_slots', text);
                                                updateCharacterLocal('fifth_level_spell_slots', text);
                                                updateCharacter('fifth_level_spell_slots', text);
                                            }}
                                        />
                                        <Text
                                            style = {styles.textInputHeading}
                                        >
                                            5th-level
                                        </Text>
                                    </View>
                                    <View style =  {styles.spellsContainer}>
                                        <TextInput
                                            style={styles.spellSlotInput}
                                            keyboardType="phone-pad"
                                            editable={isDM || character.assignedTo === user.toJSON().email}
                                            placeholder={"Enter 6th-level spell slots..."}
                                            underlineColor="transparent"
                                            value={character.sixth_level_spell_slots}
                                            onChangeText={(text) => {
                                                pushChange(global.index, 'sixth_level_spell_slots', text);
                                                updateCharacterLocal('sixth_level_spell_slots', text);
                                                updateCharacter('sixth_level_spell_slots', text);
                                            }}
                                        />
                                        <Text
                                            style = {styles.textInputHeading}
                                        >
                                            6th-level
                                        </Text>
                                    </View>
                                </View>
                                <View style = {styles.spellSlotRow}>
                                    <View style =  {styles.spellsContainer}>
                                        <TextInput
                                            style={styles.spellSlotInput}
                                            underlineColor="transparent"
                                            keyboardType="phone-pad"
                                            editable={isDM || character.assignedTo === user.toJSON().email}
                                            placeholder={"Enter 7th-level spell slots..."}
                                            value={character.seventh_level_spell_slots}
                                            onChangeText={(text) => {
                                                pushChange(global.index, 'seventh_level_spell_slots', text);
                                                updateCharacterLocal('seventh_level_spell_slots', text);
                                                updateCharacter('seventh_level_spell_slots', text);
                                            }}
                                        />
                                        <Text
                                            style = {styles.textInputHeading}
                                        >
                                            7th-level
                                        </Text>
                                    </View>
                                    <View style =  {styles.spellsContainer}>
                                        <TextInput
                                            style={styles.spellSlotInput}
                                            keyboardType="phone-pad"
                                            editable={isDM || character.assignedTo === user.toJSON().email}
                                            placeholder={"Enter 8th-level spell slots..."}
                                            underlineColor="transparent"
                                            value={character.eighth_level_spell_slots}
                                            onChangeText={(text) => {
                                                pushChange(global.index, 'eighth_level_spell_slots', text);
                                                updateCharacterLocal('eighth_level_spell_slots', text);
                                                updateCharacter('eighth_level_spell_slots', text);
                                            }}
                                        />
                                        <Text
                                            style = {styles.textInputHeading}
                                        >
                                            8th-level
                                        </Text>
                                    </View>
                                    <View style =  {styles.spellsContainer}>
                                        <TextInput
                                            style={styles.spellSlotInput}
                                            keyboardType="phone-pad"
                                            editable={isDM || character.assignedTo === user.toJSON().email}
                                            placeholder={"Enter 9th-level spell slots..."}
                                            underlineColor="transparent"
                                            value={character.ninth_level_spell_slots}
                                            onChangeText={(text) => {
                                                pushChange(global.index, 'ninth_level_spell_slots', text);
                                                updateCharacterLocal('ninth_level_spell_slots', text);
                                                updateCharacter('ninth_level_spell_slots', text);
                                            }}
                                        />
                                        <Text
                                            style = {styles.textInputHeading}
                                        >
                                            9th-level
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style = {styles.bottomRow}>
                            <Text
                                style = {styles.spellsListHeading}
                            >
                                Spells
                            </Text>
                            <FlatList
                                data={spells}
                                style = {styles.list}
                                character={character}
                                removeClippedSubviews={false}
                                keyExtractor={(item) => item._id}
                                renderItem={({ item }) => (
                                    <Spell
                                        index={index++}
                                        spell={item}
                                        isDM={global.isDM}
                                        character={character}
                                        onChange={updateSpell}
                                    />
                                )}
                                ListFooterComponent={
                                    <View style = {styles.centerButton}>
                                        <Button
                                            mode="contained"
                                            style = {styles.addButton}
                                            disabled = {!(global.isDM || character.assignedTo === user.toJSON().email)}
                                            onPress={() => {navigation.navigate('AddSpell')}}>
                                            Add A New Spell
                                        </Button>
                                    </View>
                                }
                            />
                        </View>
                        <View style = {styles.gap}/>
                    </View>
                </View>
                <Portal>
                    <Dialog
                        visible={helpVisible}
                        onDismiss={hideHelpDialog}
                        style={styles.helpWindow}
                    >
                        <View style = {{alignSelf: 'center'}}>
                            <Dialog.Title
                                style={styles.helpTitleWindow}
                            >
                                Full Character Sheet Screen Help
                            </Dialog.Title>
                        </View>
                        <IconButton
                            icon="close" //Getting the back icon image
                            size={36} //Setting the size
                            color="#a60000" //And the color
                            style = {styles.exitButtonHelp}
                            onPress={() => {
                                hideHelpDialog()
                            }}
                        />
                        <Dialog.Content>
                            <Text
                                style={styles.helpTextBold}
                            >
                                Please note that this help window is available on every screen by clicking on the help icon in the top right corner. The information shown in this window differs depending on the screen you are on.
                            </Text>
                            <Text>
                                In this screen you can view and edit the full details of a character. The details have been categorised into four tabs.{"\n"}
                                - Main, containing the core, most frequently accessed, information. {"\n"}
                                - Biography containing biographical, non-numeric characteristics. {"\n"}
                                - Inventory containing currency, weapons, armor and possessions. {'\n'}
                                - Spells containing spell characteristics, spell slots and spells.  {'\n\n'}

                                In the main tab you can change the character's image by clicking on the 'Change Image' button which will take you to the 'Image Selector'
                                screen where you can upload and use a new image or use one you have uploaded in the past.{'\n\n'}

                                In the inventory tab you can add new weapons, armor and possessions by using the associated add buttons and in the spells tab you can add
                                spells the same way.{'\n\n'}

                                Edits made to a character in this screen will be reflected in the overview of the character in the Groups screen and vice-versa.{'\n\n'}
                                Edits made to a character in this screen and the 'Groups' screen will be applied for all players who have access to the character.
                            </Text>
                        </Dialog.Content>
                    </Dialog>
                </Portal>
        </KeyboardAwareScrollView>
            </Provider>
    );
}

const styles = StyleSheet.create({
    exitButtonHelp: {
        left: screenWidth * 0.635,
        top: screenHeight * -0.02,
        position: 'absolute'
    },
    helpWindow: {
        width: screenWidth * 0.675,
        alignSelf: 'center',
        marginTop: screenHeight * -0.0463829787234
    },
    helpTitleWindow: {
        alignSelf: 'center',
        textAlign: 'center'
    },
    helpTextBold: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: screenHeight * 0.02
    },
    centerButton: {
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    addButton: {
        width: screenWidth * 0.1650412603150788,
        marginTop: screenHeight * 0.0066489361702128
    },
    spellsInfoContainer: {
        flexDirection: 'column',
        marginLeft: screenWidth * 0.0300075018754689
    },
    spellsSlotsContainer: {
        flexDirection: 'column',
        borderWidth: 1,
        marginLeft: screenWidth * 0.0300075018754689,
        marginTop: screenHeight * 0.0132978723404255,
        backgroundColor:"#e3e3e3",
        paddingBottom: screenHeight * 0.0142287234042553,
        width: screenWidth * 0.68192048012003
    },
    spellsContainer: {
        alignItems: 'center'
    },
    spellSlotRow: {
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: screenWidth * 0.0150037509377344,
    },
    spellSlotFirstRow: {
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: screenWidth * 0.0150037509377344,
        marginTop: screenHeight * 0.0359042553191489
    },
    totalContainer: {
        flexDirection: 'column'
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    bottomRow: {
        borderWidth: 1,
        marginTop: screenHeight * 0.0132978723404255,
        marginBottom: screenHeight * 0.0132978723404255,
        marginLeft: screenWidth * 0.0202550637659415,
        width: "96%",
        marginRight: screenWidth * 0.0450112528132033,
        backgroundColor: "#e8e8e8",
        paddingBottom: screenHeight * 0.0159574468085106,
        alignItems: 'center',
        flexDirection: 'column',
        borderRadius: 4,
    },
    textInputHeading: {
        position: "absolute",
        top: screenHeight * 0.0199468085106383,
        width: screenWidth * 0.1837959489872468,
        left: screenWidth * 0.0150037509377344,
        textAlign: "center",
        color: "#0038d4",
    },
    spellcastingInputHeading: {
        position: "absolute",
        top: screenHeight * 0.0199468085106383,
        width: screenWidth * 0.1837959489872468,
        left: screenWidth * 0.0150037509377344,
        textAlign: "center",
        color: "#0038d4",
    },
    spellSlotHeading: {
        marginTop: screenHeight * 0.0066489361702128,
        position: "absolute",
        width: screenWidth * 0.68192048012003,
        textAlign: "center",
        color: "#000000",
        fontSize: 15,
        fontWeight: "bold",
    },
    spellsListHeading: {
        marginTop: screenHeight * 0.0132978723404255,
        marginBottom: screenHeight * 0.0093085106382979,
        width: screenWidth * 0.68192048012003,
        textAlign: "center",
        fontWeight: "bold",
        color: "#000000",
        fontSize: 17
    },
    spellsInput: {
        marginTop: screenHeight * 0.0132978723404255,
        marginRight: screenWidth * 0.0150037509377344,
        marginLeft: screenWidth * 0.0150037509377344,
        width: screenWidth * 0.1837959489872468,
        height: screenHeight * 0.0824468085106383,
        textAlign: "center",
        paddingTop: screenHeight * 0.0199468085106383,
        backgroundColor: "#e8e8e8",
        borderRadius: 4,
        borderWidth: 1
    },
    spellSlotInput: {
        marginTop: screenHeight * 0.0132978723404255,
        marginRight: screenWidth * 0.0150037509377344,
        marginLeft: screenWidth * 0.0150037509377344,
        width: screenWidth * 0.1837959489872468,
        height: screenHeight * 0.0531914893617021,
        textAlign: "center",
        paddingTop: screenHeight * 0.0265957446808511,
        backgroundColor: "#ffffff",
        borderRadius: 4,
        borderWidth: 1
    },
    spellcastingInput: {
        marginTop: screenHeight * 0.0132978723404255,
        marginRight: screenWidth * 0.0150037509377344,
        marginLeft: screenWidth * 0.0150037509377344,
        width: screenWidth * 0.1837959489872468,
        height: screenHeight * 0.0824468085106383,
        textAlign: "center",
        paddingTop: screenHeight * 0.0199468085106383,
        backgroundColor: "#e8e8e8",
        borderRadius: 4,
        borderWidth: 1
    }
})
