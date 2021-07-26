import {Button, Text, TextInput} from "react-native-paper";
import React, {useEffect, useState} from "react"
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {View, StyleSheet, TextInput as NativeTextInput, ScrollView, FlatList, KeyboardAvoidingView} from "react-native";
import colors from "../utils/colors";
import CharacterCard from "../components/CharacterCard";
import Spinner from "../components/Spinner";
import Weapon from "../components/Weapon";

export default function InventoryScreen({route, navigation}) {
    const [charData, setCharData] = useState(global.charaData);
    const [loading, setLoading] = useState(true);
    const [weapons, setWeapons] = useState([]);

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

    function updateWeapon(index, field, value) {
        const newWeapons = [...weapons];
        newWeapons[index][field] = value;
        setWeapons(newWeapons);
    }

    function updateCharacter(fieldName, value) {
        if (fieldName === 'CP') {
            global.charaRef
                .update({
                    CP: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        } else if (fieldName === 'SP') {
            global.charaRef
                .update({
                    SP: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        } else if (fieldName === 'EP') {
            global.charaRef
                .update({
                    EP: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        } else if (fieldName === 'GP') {
            global.charaRef
                .update({
                    GP: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        } else if (fieldName === 'PP') {
            global.charaRef
                .update({
                    PP: value
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
                                    defaultValue = {charData["CP"]}
                                    onChangeText = {(text) => {
                                        updateCharacter('CP', text);
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
                                    defaultValue = {charData["SP"]}
                                    onChangeText = {(text) => {
                                        updateCharacter('SP', text);
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
                                    defaultValue = {charData["EP"]}
                                    onChangeText = {(text) => {
                                        updateCharacter('EP', text);
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
                                    defaultValue = {charData["GP"]}
                                    onChangeText = {(text) => {
                                        updateCharacter('GP', text);
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
                                    defaultValue = {charData["PP"]}
                                    onChangeText = {(text) => {
                                        updateCharacter('PP', text);
                                        getCharacter()
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                    <View style = {styles.weaponContainer}>
                        <Text
                            style = {styles.currencyHeading}
                        >
                            Weapons
                        </Text>
                        <FlatList
                            data={weapons}
                            style = {styles.list}
                            removeClippedSubviews={true}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item }) => (
                                <Weapon
                                    index={index++}
                                    weapon={item}
                                    onChange={updateWeapon}
                                />
                            )}
                            ListFooterComponent={
                                <View style = {styles.centerButton}>
                                    <Button
                                        mode="contained"
                                        style = {styles.addButton}
                                        onPress={() => {navigation.navigate('AddWeapon')}}>
                                        Add A New Weapon
                                    </Button>
                                </View>
                            }
                        />
                    </View>
                    <View style = {styles.inventoryContainer}>
                        <Text
                            style = {styles.currencyHeading}
                        >
                            Armor
                        </Text>
                        <FlatList
                            data={weapons}
                            style = {styles.list}
                            removeClippedSubviews={true}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item }) => (
                                <Weapon
                                    index={index++}
                                    weapon={item}
                                    onChange={updateWeapon}
                                />
                            )}
                            ListFooterComponent={
                                <View style = {styles.centerButton}>
                                    <Button
                                        mode="contained"
                                        style = {styles.addButton}
                                        onPress={() => {navigation.navigate('AddWeapon')}}>
                                        Add New Armor
                                    </Button>
                                </View>
                            }
                        />
                    </View>
                    <View style = {styles.inventoryContainer}>
                        <Text
                            style = {styles.currencyHeading}
                        >
                            Possession
                        </Text>
                        <FlatList
                            data={weapons}
                            style = {styles.list}
                            removeClippedSubviews={true}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item }) => (
                                <Weapon
                                    index={index++}
                                    weapon={item}
                                    onChange={updateWeapon}
                                />
                            )}
                            ListFooterComponent={
                                <View style = {styles.centerButtonFinal}>
                                    <Button
                                        mode="contained"
                                        style = {styles.addPossessionButton}
                                        onPress={() => {navigation.navigate('AddWeapon')}}>
                                        Add A New Possession
                                    </Button>
                                </View>
                            }
                        />
                    </View>
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
    centerButtonFinal: {
        width: "100%",
        alignItems: 'center'
    },
    addButton: {
      width: "20%",
        marginTop: 5
    },
    addPossessionButton: {
        width: "27%",
        marginTop: 5
    },
    list: {
        marginTop: 50
    },
    totalContainer: {
        flexDirection: 'column'
    },
    currencyTypes: {
        flexDirection: 'row',
        marginLeft: 100
    },
    currencyContainer: {
        height: 115,
        marginTop: 7,
        marginLeft: 10,
        marginRight: 10,
    },
    weaponContainer: {
        flexDirection: 'column',
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center'
    },
    inventoryContainer: {
        flexDirection: 'column',
        marginLeft: 10,
        marginTop: 10,
        marginRight: 10,
        alignItems: 'center'
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
        backgroundColor: "#e8e8e8",
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
    },
    armorHeading: {
        width: "100%",
        textAlign: "center",
        color: "#0038d4",
        position: 'absolute',
        top: 10,
        fontSize: 17,
    }
})