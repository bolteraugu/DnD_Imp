import {IconButton, TextInput} from "react-native-paper";
import React from "react";
import {Surface} from "react-native-paper";
import {Dimensions, StyleSheet, Text, View} from "react-native";

global.screenWidth = Dimensions.get("window").width;
global.screenHeight = Dimensions.get("window").height;

export default function Weapon({
                                   weapon,
                                   onChange,
                                   index}) {

    function updateWeapon(field, value) {
        if (field === 'name') {
            global.charaRef.collection('weapons').doc(weapon._id)
                .update({
                    name: value
                })
                .then(console.log('Successfully updated weapon'), (error) =>
                    console.log('Failed to update weapon: ' + error)
                );
        }
        else if (field === 'cost') {
            global.charaRef.collection('weapons').doc(weapon._id)
                .update({
                    cost: value
                })
                .then(console.log('Successfully updated weapon'), (error) =>
                    console.log('Failed to update weapon: ' + error)
                );
        }
        else if (field === 'damage') {
            global.charaRef.collection('weapons').doc(weapon._id)
                .update({
                    damage: value
                })
                .then(console.log('Successfully updated weapon'), (error) =>
                    console.log('Failed to update weapon: ' + error)
                );
        }
        else if (field === 'weight') {
            global.charaRef.collection('weapons').doc(weapon._id)
                .update({
                    weight: value
                })
                .then(console.log('Successfully updated weapon'), (error) =>
                    console.log('Failed to update weapon: ' + error)
                );
        }
        else if (field === 'properties') {
            global.charaRef.collection('weapons').doc(weapon._id)
                .update({
                    properties: value
                })
                .then(console.log('Successfully updated weapon'), (error) =>
                    console.log('Failed to update weapon: ' + error)
                );
        }
    }

    function deleteWeapon() {
        global.charaRef
            .collection('weapons')
            .doc(weapon._id)
            .delete()
            .then(console.log('Successfully deleted weapon'), (error) =>
                console.log('Failed to delete weapon: ' + error)
            );
    }

    return (
        <Surface style={styles.surface}>
            <View style={styles.row}>
                <View>
                    <View style = {styles.nameHeadingContainer}>
                            <Text
                                style={styles.typeLabel}
                            >
                                Name
                            </Text>
                    </View>
                    <TextInput
                        style={styles.nameContainer}
                        value={weapon.name}
                        placeholder={"Enter name..."}
                        onChangeText={(text) => {
                            updateWeapon('name', text);
                            onChange(index, 'name', text);
                        }
                        }
                    />
                </View>
                <View>
                    <View style = {styles.costHeadingContainer}>
                            <Text
                                style={styles.typeLabel}
                            >
                                Cost
                            </Text>
                    </View>
                    <TextInput
                        style={styles.costContainer}
                        value={weapon.cost}
                        placeholder={"Enter cost..."}
                        onChangeText={(text) => {
                            updateWeapon('cost', text);
                            onChange(index, 'cost', text);
                        }
                        }
                    />
                </View>
                <View>
                    <View style = {styles.damageHeadingContainer}>
                            <Text
                                style={styles.typeLabel}
                            >
                                Damage
                            </Text>
                    </View>
                    <TextInput
                        style={styles.damageContainer}
                        value={weapon.damage}
                        placeholder={"Enter damage..."}
                        onChangeText={(text) => {
                            updateWeapon('damage', text);
                            onChange(index, 'damage', text);
                        }
                        }
                    />
                </View>
                <View>
                    <View style = {styles.weightHeadingContainer}>
                            <Text
                                style={styles.typeLabel}
                            >
                                Weight
                            </Text>
                    </View>
                    <TextInput
                        style={styles.weightContainer}
                        value={weapon.weight}
                        placeholder={"Enter weight..."}
                        onChangeText={(text) => {
                            updateWeapon('weight', text);
                            onChange(index, 'weight', text);
                        }
                        }
                    />
                </View>
                <View>
                    <View style = {styles.propertiesHeadingContainer}>
                            <Text
                                style={styles.typeLabel}
                            >
                                Properties
                            </Text>
                    </View>
                    <TextInput
                        style={styles.propertiesContainer}
                        value={weapon.properties}
                        placeholder={"Enter properties..."}
                        onChangeText={(text) => {
                            updateWeapon('properties', text)
                            onChange(index, 'properties', text);
                        }
                        }
                    />
                </View>
                <IconButton
                    icon="delete"
                    size={28}
                    style = {styles.deleteButton}
                    color="#000"
                    onPress={deleteWeapon} //delete this character
                />
            </View>
        </Surface>
    );
}

const styles = StyleSheet.create({
    nameHeadingContainer: {
        width: screenWidth * 0.1522880720180045,
        height: screenHeight * 0.0398936170212766,
        marginBottom: screenHeight * 0.0066489361702128,
        alignItems: 'center',
    },
    costHeadingContainer: {
        width: screenWidth * 0.0772693173293323,
        height: screenHeight * 0.0398936170212766,
        marginBottom: screenHeight * 0.0066489361702128,
        alignItems: 'center',
    },
    damageHeadingContainer: {
        width: screenWidth * 0.1747936984246062,
        height: screenHeight * 0.0398936170212766,
        marginBottom: screenHeight * 0.0066489361702128,
        alignItems: 'center',
    },
    weightHeadingContainer: {
        width: screenWidth * 0.0922730682670668,
        height: screenHeight * 0.0398936170212766,
        marginBottom: screenHeight * 0.0066489361702128,
        alignItems: 'center',
    },
    propertiesHeadingContainer: {
        width: screenWidth * 0.2873218304576144,
        height: screenHeight * 0.0398936170212766,
        marginBottom: screenHeight * 0.0066489361702128,
        alignItems: 'center',
    },
    typeLabel: {
        color: "#000000",
        fontSize: 16,
        fontFamily: 'sans-serif',
        fontWeight: "bold",
        marginBottom: screenHeight * 0.0026595744680851,
    },
    deleteButton: {
        marginTop: screenHeight * 0.0611702127659574,
        marginLeft: 0
    },
    nameContainer: {
        marginBottom: screenHeight * 0.0026595744680851,
        marginTop: screenHeight * 0.0026595744680851,
        marginLeft: screenWidth * 0.0015003750937734,
        marginRight: screenWidth * 0.0015003750937734,
        width: screenWidth * 0.1522880720180045,
        height: screenHeight * 0.0598404255319149,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif'
    },
    costContainer: {
        marginBottom: screenHeight * 0.0026595744680851,
        marginTop: screenHeight * 0.0026595744680851,
        marginLeft: screenWidth * 0.0015003750937734,
        marginRight: screenWidth * 0.0015003750937734,
        width: screenWidth * 0.0772693173293323,
        height: screenHeight * 0.0598404255319149,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif'
    },
    damageContainer: {
        marginBottom: screenHeight * 0.0026595744680851,
        marginTop: screenHeight * 0.0026595744680851,
        marginLeft: screenWidth * 0.0015003750937734,
        marginRight: screenWidth * 0.0015003750937734,
        width: screenWidth * 0.1747936984246062,
        height: screenHeight * 0.0598404255319149,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif'
    },
    weightContainer: {
        marginBottom: screenHeight * 0.0026595744680851,
        marginTop: screenHeight * 0.0026595744680851,
        marginLeft: screenWidth * 0.0015003750937734,
        marginRight: screenWidth * 0.0015003750937734,
        width: screenWidth * 0.0922730682670668,
        height: screenHeight * 0.0598404255319149,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif'
    },
    propertiesContainer: {
        marginBottom: screenHeight * 0.0026595744680851,
        marginTop: screenHeight * 0.0026595744680851,
        marginLeft: screenWidth * 0.0015003750937734,
        marginRight: screenWidth * 0.0015003750937734,
        width: screenWidth * 0.2873218304576144,
        height: screenHeight * 0.0598404255319149,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif'
    },
    surface: {
        elevation: 4,
        marginBottom: screenHeight * 0.0066489361702128,
        marginTop: screenHeight * 0.0066489361702128,
        marginLeft: screenWidth * 0.0037509377344336,
        marginRight: screenWidth * 0.0037509377344336,
        color: "#ffffff"
    },
    row: {
        flexDirection: 'row',
        marginBottom: screenHeight * 0.0132978723404256,
        marginTop: screenHeight * 0.0132978723404256,
        marginLeft: screenWidth * 0.0075018754688672,
        marginRight: screenWidth * 0.0075018754688672,
    }
})
