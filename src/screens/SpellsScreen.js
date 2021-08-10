import {useEffect, useState} from "react";
import React from "react"
import {Dimensions, FlatList, KeyboardAvoidingView, ScrollView, StyleSheet, View} from "react-native"
import {Button, Text, TextInput} from "react-native-paper";
import Weapon from "../components/Weapon";
import Spinner from "../components/Spinner";
import Spell from "../components/Spell";

global.screenWidth = Dimensions.get("window").width;
global.screenHeight = Dimensions.get("window").height;

export default function SpellsScreen({route, navigation}) {
    const [charData, setCharData] = useState(global.charaData);
    const [spells, setSpells] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', e => {
            getCharacter();
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
        return unsubscribe
    }, [navigation]);

    if (loading) {
        return <Spinner />;
    }

    function getCharacter() {
        global.charaRef.onSnapshot( (snapshot) => {
            setCharData(snapshot.data())
        });
    }

    function updateSpell(index, field, value) {
        const newSpells = [...spells];
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
                    spell_save_DC: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'spell_attack_bonus') {
            global.charaRef
                .update({
                    spell_attack_bonus: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'first_level_spell_slots') {
            global.charaRef
                .update({
                    first_level_spell_slots: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'second_level_spell_slots') {
            global.charaRef
                .update({
                    second_level_spell_slots: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'third_level_spell_slots') {
            global.charaRef
                .update({
                    third_level_spell_slots: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'fourth_level_spell_slots') {
            global.charaRef
                .update({
                    fourth_level_spell_slots: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'fifth_level_spell_slots') {
            global.charaRef
                .update({
                    fifth_level_spell_slots: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'sixth_level_spell_slots') {
            global.charaRef
                .update({
                    sixth_level_spell_slots: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'seventh_level_spell_slots') {
            global.charaRef
                .update({
                    seventh_level_spell_slots: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'eighth_level_spell_slots') {
            global.charaRef
                .update({
                    eighth_level_spell_slots: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'ninth_level_spell_slots') {
            global.charaRef
                .update({
                    ninth_level_spell_slots: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
    }

    let index = 0;
    return (
        <KeyboardAvoidingView
            behavior = {'height'}>
            <ScrollView>
                <View style = {styles.totalContainer}>
                    <View style = {styles.topRow}>
                        <View style = {styles.spellsInfoContainer}>
                            <View style =  {styles.spellsContainer}>
                                <TextInput
                                    style={styles.spellcastingInput}
                                    underlineColor="transparent"
                                    placeholder={"Enter spellcasting ability..."}
                                    defaultValue={charData['spellcasting_ability']}
                                    onChangeText={(text) => {
                                        updateCharacter('spellcasting_ability', text);
                                        getCharacter()
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
                                    keyboardType="number-pad"
                                    placeholder={"Enter spell save DC..."}
                                    underlineColor="transparent"
                                    defaultValue={String(charData['spell_save_DC'])}
                                    onChangeText={(text) => {
                                        updateCharacter('spell_save_DC', text);
                                        getCharacter()
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
                                    keyboardType="number-pad"
                                    placeholder={"Enter spell attack bonus..."}
                                    underlineColor="transparent"
                                    defaultValue={String(charData['spell_attack_bonus'])}
                                    onChangeText={(text) => {
                                        updateCharacter('spell_attack_bonus', text);
                                        getCharacter()
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
                                        keyboardType="number-pad"
                                        placeholder={"Enter 1st-level spell slots..."}
                                        defaultValue={String(charData['first_level_spell_slots'])}
                                        onChangeText={(text) => {
                                            updateCharacter('first_level_spell_slots', text);
                                            getCharacter()
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
                                        keyboardType="number-pad"
                                        placeholder={"Enter 2nd-level spell slots..."}
                                        underlineColor="transparent"
                                        defaultValue={String(charData['second_level_spell_slots'])}
                                        onChangeText={(text) => {
                                            updateCharacter('second_level_spell_slots', text);
                                            getCharacter()
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
                                        keyboardType="number-pad"
                                        placeholder={"Enter 3rd-level spell slots..."}
                                        underlineColor="transparent"
                                        defaultValue={String(charData['third_level_spell_slots'])}
                                        onChangeText={(text) => {
                                            updateCharacter('third_level_spell_slots', text);
                                            getCharacter()
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
                                        keyboardType="number-pad"
                                        placeholder={"Enter 4th-level spell slots..."}
                                        defaultValue={String(charData['fourth_level_spell_slots'])}
                                        onChangeText={(text) => {
                                            updateCharacter('fourth_level_spell_slots', text);
                                            getCharacter()
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
                                        keyboardType="number-pad"
                                        placeholder={"Enter 5th-level spell slots..."}
                                        underlineColor="transparent"
                                        defaultValue={String(charData['fifth_level_spell_slots'])}
                                        onChangeText={(text) => {
                                            updateCharacter('fifth_level_spell_slots', text);
                                            getCharacter()
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
                                        keyboardType="number-pad"
                                        placeholder={"Enter 6th-level spell slots..."}
                                        underlineColor="transparent"
                                        defaultValue={String(charData['sixth_level_spell_slots'])}
                                        onChangeText={(text) => {
                                            updateCharacter('sixth_level_spell_slots', text);
                                            getCharacter()
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
                                        keyboardType="number-pad"
                                        placeholder={"Enter 7th-level spell slots..."}
                                        defaultValue={String(charData['seventh_level_spell_slots'])}
                                        onChangeText={(text) => {
                                            updateCharacter('seventh_level_spell_slots', text);
                                            getCharacter()
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
                                        keyboardType="number-pad"
                                        placeholder={"Enter 8th-level spell slots..."}
                                        underlineColor="transparent"
                                        defaultValue={String(charData['eighth_level_spell_slots'])}
                                        onChangeText={(text) => {
                                            updateCharacter('eighth_level_spell_slots', text);
                                            getCharacter()
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
                                        keyboardType="number-pad"
                                        placeholder={"Enter 9th-level spell slots..."}
                                        underlineColor="transparent"
                                        defaultValue={String(charData['ninth_level_spell_slots'])}
                                        onChangeText={(text) => {
                                            updateCharacter('ninth_level_spell_slots', text);
                                            getCharacter()
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
                            removeClippedSubviews={true}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item }) => (
                                <Spell
                                    index={index++}
                                    spell={item}
                                    onChange={updateSpell}
                                />
                            )}
                            ListFooterComponent={
                                <View style = {styles.centerButton}>
                                    <Button
                                        mode="contained"
                                        style = {styles.addButton}
                                        onPress={() => {navigation.navigate('AddSpell')}}>
                                        Add A New Spell
                                    </Button>
                                </View>
                            }
                        />
                    </View>
                    <View style = {styles.gap}/>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
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
