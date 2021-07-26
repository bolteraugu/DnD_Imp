import {Button, Text, TextInput} from "react-native-paper";
import React, {useEffect, useState} from "react"
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {View, StyleSheet, TextInput as NativeTextInput, ScrollView, FlatList} from "react-native";
import colors from "../utils/colors";
import CharacterCard from "../components/CharacterCard";
import Spinner from "../components/Spinner";

export default function InventoryScreen({route}) {
    const [charData, setCharData] = useState(global.charaData);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCharacter();
        global.charaRef.collection("weapons").onSnapshot(
            (querySnapshot) => {
                const weapons = querySnapshot.docs.map((doc) => {
                    const data = {
                        _id: doc.id,
                        ...doc.data(),
                    };
                    return data;
                });
                setWeapons(weapons);

                if (loading) {
                    setLoading(false);
                }
            },
            (error) => {
                alert(error);
            }
        );

    }, [])

    if (loading) {
        return <Spinner />;
    }

    function getCharacter() {
        global.charaRef.onSnapshot( (snapshot) => {
            setCharData(snapshot.data())
        });
    }

    function updateCharacter(fieldName, value) {
        if (fieldName === 'personality_traits') {
            global.charaRef
                .update({
                    personality_traits: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'ideals') {
            global.charaRef
                .update({
                    ideals: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'bonds') {
            global.charaRef
                .update({
                    bonds: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'flaws') {
            global.charaRef
                .update({
                    flaws: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'features_and_traits') {
            global.charaRef
                .update({
                    features_and_traits: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'appearance') {
            global.charaRef
                .update({
                    appearance: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'backstory') {
            global.charaRef
                .update({
                    backstory: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
    }

    return (
        <View style = {styles.totalContainer}>
            <View style = {styles.currencyContainer}>
                <Text
                    style = {styles.currencyHeading}
                >
                    Currency
                </Text>
                    <View style = {styles.currencyTypes}>
                    <View style = {styles.currencyTypeContainer}>
                        <Text
                            style = {styles.currencyTypeHeading}
                        >
                            CP
                        </Text>
                        <TextInput
                            style = {styles.currencyTypeInput}
                            underlineColor="transparent"
                            defaultValue = {charData["personality_traits"]}
                            onChangeText = {(text) => {
                                updateCharacter('personality_traits', text);
                                getCharacter()
                            }}
                        />
                    </View>
                    <View style = {styles.currencyTypeContainer}>
                        <Text
                            style = {styles.currencyTypeHeading}
                        >
                            SP
                        </Text>
                        <TextInput
                            style = {styles.currencyTypeInput}
                            underlineColor="transparent"
                            defaultValue = {charData["ideals"]}
                            onChangeText = {(text) => {
                                updateCharacter('ideals', text);
                                getCharacter()
                            }}
                        />
                    </View>
                    <View style = {styles.currencyTypeContainer}>
                        <Text
                            style = {styles.currencyTypeHeading}
                        >
                            EP
                        </Text>
                        <TextInput
                            style = {styles.currencyTypeInput}
                            underlineColor="transparent"
                            defaultValue = {charData["bonds"]}
                            onChangeText = {(text) => {
                                updateCharacter('bonds', text);
                                getCharacter()
                            }}
                        />
                    </View>
                    <View style = {styles.currencyTypeContainer}>
                        <Text
                            style = {styles.currencyTypeHeading}
                        >
                            GP
                        </Text>
                        <TextInput
                            style = {styles.currencyTypeInput}
                            underlineColor="transparent"
                            defaultValue = {charData["flaws"]}
                            onChangeText = {(text) => {
                                updateCharacter('flaws', text);
                                getCharacter()
                            }}
                        />
                    </View>
                    <View style = {styles.currencyTypeContainer}>
                        <Text
                            style = {styles.currencyTypeHeading}
                        >
                            PP
                        </Text>
                        <TextInput
                            style = {styles.currencyTypeInput}
                            underlineColor="transparent"
                            defaultValue = {charData["flaws"]}
                            onChangeText = {(text) => {
                                updateCharacter('flaws', text);
                                getCharacter()
                            }}
                        />
                    </View>
                </View>
            </View>
            <KeyboardAvoidingView
                behavior = {'height'}>
                <ScrollView>
                    <View style = {styles.weaponContainer}>
                        <Text
                            style = {styles.currencyHeading}
                        >
                            Weapons
                        </Text>
                        <FlatList
                            data={characters}
                            removeClippedSubviews={true}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item }) => (
                                <CharacterCard
                                    character={item}
                                    index={index++}
                                    groupRef={groupRef}
                                    onChange={updateCharacter}
                                    navigation={navigation}
                                />
                            )}
                            ListFooterComponent={
                                <View style = {styles.gap}>
                                    <Button
                                        mode="contained" onPress={addCharacter}>
                                        Add New Character
                                    </Button>
                                </View>
                            }
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    totalContainer: {
        flexDirection: 'column'
    },
    currencyTypes: {
        flexDirection: 'row',
        marginLeft: 100
    },
    currencyContainer: {
        height: "35%",
        marginTop: 7,
        marginLeft: 10,
        marginRight: 10,
        borderWidth: 1,
        backgroundColor: "#e8e8e8",
    },
    weaponContainer: {
        flexDirection: 'column'
    },
    currencyTypeContainer: {
        flexDirection: 'row',
        flex: 1,
        marginTop: 53,
        height: 35
    },
    currencyTypeHeading: {
        marginLeft: 10,
        textAlign: 'center',
        height: "100%",
        marginRight: 10,
        marginTop: 4,
        fontSize: 16
    },
    currencyTypeInput: {
        borderWidth: 1,
        backgroundColor: "#ffffff",
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        height: 30,
        width: 70
    },
    currencyHeading: {
        width: "100%",
        textAlign: "center",
        color: "#0038d4",
        position: 'absolute',
        top: 10,
        fontSize: 17
    }
})