import {Button, Text, TextInput} from "react-native-paper";
import React, {useEffect, useState} from "react"
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {
    View,
    StyleSheet,
    TextInput as NativeTextInput,
    ScrollView,
    FlatList,
    KeyboardAvoidingView,
    Dimensions
} from "react-native";
import colors from "../utils/colors";
import CharacterCard from "../components/CharacterCard";
import Spinner from "../components/Spinner";
import Weapon from "../components/Weapon";
import Armor from "../components/Armor";
import Possession from "../components/Possession";

global.screenWidth = Dimensions.get("window").width;
global.screenHeight = Dimensions.get("window").height;

export default function InventoryScreen({route, navigation}) {
    const [charData, setCharData] = useState(global.charaData);
    const [loading, setLoading] = useState(true);
    const [weapons, setWeapons] = useState([]);
    const [armor, setArmor] = useState([]);
    const [possessions, setPossessions] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', e => {
            getCharacter();
        });
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
        global.charaRef.collection("armor").onSnapshot(
            (querySnapshot) => {
                const armor = querySnapshot.docs.map((doc) => {
                    const data = {
                        _id: doc.id,
                        ...doc.data(),
                    };
                    return data;
                });
                setArmor(armor);

                if (loading) {
                    setLoading(false);
                }
            },
            (error) => {
                alert(error);
            }
        );
        global.charaRef.collection("possessions").onSnapshot(
            (querySnapshot) => {
                const possession = querySnapshot.docs.map((doc) => {
                    const data = {
                        _id: doc.id,
                        ...doc.data(),
                    };
                    return data;
                });
                setPossessions(possession);

                if (loading) {
                    setLoading(false);
                }
            },
            (error) => {
                alert(error);
            }
        );
        return unsubscribe;

    }, [navigation])

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

    function updateArmor(index, field, value) {
        const newArmor = [...armor];
        newArmor[index][field] = value;
        setArmor(newArmor);
    }

    function updatePossession(index, field, value) {
        const newPossessions = [...possessions];
        newPossessions[index][field] = value;
        setPossessions(newPossessions);
    }

    function updateCharacter(fieldName, value) {
        if (fieldName === 'CP') {
            global.charaRef
                .update({
                    CP: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        } else if (fieldName === 'SP') {
            global.charaRef
                .update({
                    SP: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        } else if (fieldName === 'EP') {
            global.charaRef
                .update({
                    EP: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        } else if (fieldName === 'GP') {
            global.charaRef
                .update({
                    GP: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        } else if (fieldName === 'PP') {
            global.charaRef
                .update({
                    PP: Number(value)
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
    }

    let weaponIndex = 0;
    let armorIndex = 0;
    let possessionIndex = 0;
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
                                    keyboardType="number-pad"
                                    defaultValue = {String(charData["CP"])}
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
                                    keyboardType="number-pad"
                                    defaultValue = {String(charData["SP"])}
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
                                    keyboardType="number-pad"
                                    defaultValue = {String(charData["EP"])}
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
                                    keyboardType="number-pad"
                                    defaultValue = {String(charData["GP"])}
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
                                    keyboardType="number-pad"
                                    defaultValue = {String(charData["PP"])}
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
                            keyExtractor={(item) => item._id}
                            renderItem={({ item }) => (
                                <Weapon
                                    index={weaponIndex++}
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
                            data={armor}
                            style = {styles.list}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item }) => (
                                <Armor
                                    index={armorIndex++}
                                    armor={item}
                                    onChange={updateArmor}
                                />
                            )}
                            ListFooterComponent={
                                <View style = {styles.centerButton}>
                                    <Button
                                        mode="contained"
                                        style = {styles.addButton}
                                        onPress={() => {navigation.navigate('AddArmor')}}>
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
                            Other Possessions
                        </Text>
                        <FlatList
                            data={possessions}
                            style = {styles.list}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item }) => (
                                <Possession
                                    index={possessionIndex++}
                                    possession={item}
                                    onChange={updatePossession}
                                />
                            )}
                            ListFooterComponent={
                                <View style = {styles.centerButtonFinal}>
                                    <Button
                                        mode="contained"
                                        style = {styles.addPossessionButton}
                                        onPress={() => {navigation.navigate('AddPossession')}}>
                                        Add A New Possession
                                    </Button>
                                </View>
                            }
                        />
                    </View>
                    <View style = {styles.gap}>

                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    gap: {
        height: 100
    },
    centerButton: {
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    centerButtonFinal: {
        width: "100%",
        alignItems: 'center',
    },
    addButton: {
        width: 220,
        marginTop: 5
    },
    addPossessionButton: {
        width: "27%",
        marginTop: 5
    },
    list: {
        marginTop: 50,
        width: "86%"
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
        backgroundColor:"#e3e3e3",
        borderRadius: 4,
        borderWidth: 1
    },
    weaponContainer: {
        flexDirection: 'column',
        backgroundColor:"#e3e3e3",
        borderRadius: 4,
        borderWidth: 1,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        paddingBottom: 12,
        alignItems: 'center'
    },
    inventoryContainer: {
        flexDirection: 'column',
        backgroundColor:"#e3e3e3",
        borderRadius: 4,
        borderWidth: 1,
        marginLeft: 10,
        marginTop: 10,
        marginRight: 10,
        paddingBottom: 12,
        alignItems: 'center'
    },
    currencyTypeContainer: {
        flexDirection: 'row',
        flex: 1,
        marginTop: 53,
        height: 35,
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
        width: 70,
        textAlign: 'center'
    },
    currencyHeading: {
        width: "100%",
        textAlign: "center",
        color: "#0038d4",
        position: 'absolute',
        top: 10,
        fontSize: 17,
        fontWeight: "bold"
    },
    armorHeading: {
        width: "100%",
        textAlign: "center",
        color: "#0038d4",
        position: 'absolute',
        top: 10,
        fontSize: 17,
        fontWeight: "bold"
    }
})
