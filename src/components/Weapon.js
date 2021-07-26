import {IconButton, TextInput} from "react-native-paper";
import React from "react";
import {Surface} from "react-native-paper";
import {StyleSheet, Text, View} from "react-native";

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
        width: 203,
        height: 30,
        marginBottom: 5,
        alignItems: 'center',
    },
    costHeadingContainer: {
        width: 103,
        height: 30,
        marginBottom: 5,
        alignItems: 'center',
    },
    damageHeadingContainer: {
        width: 223,
        height: 30,
        marginBottom: 5,
        alignItems: 'center',
    },
    weightHeadingContainer: {
        width: 123,
        height: 30,
        marginBottom: 5,
        alignItems: 'center',
    },
    propertiesHeadingContainer: {
        width: 383,
        height: 30,
        marginBottom: 5,
        alignItems: 'center',
    },
    typeLabel: {
        color: "#000000",
        fontSize: 16,
        fontFamily: 'sans-serif',
        fontWeight: "bold",
        marginBottom: 2,
    },
    deleteButton: {
        marginTop: 36,
        marginRight: 10
    },
    nameContainer: {
        margin: 2,
        width: 203,
        height: 45,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif'
    },
    costContainer: {
        margin: 2,
        width: 103,
        height: 45,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif'
    },
    damageContainer: {
        margin: 2,
        width: 223,
        height: 45,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif'
    },
    weightContainer: {
        margin: 2,
        width: 123,
        height: 45,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif'
    },
    propertiesContainer: {
        margin: 2,
        width: 383,
        height: 45,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif'
    },
    surface: {
        elevation: 4,
        margin: 5,
        color: "#ffffff"
    },
    row: {
        flexDirection: 'row',
        margin: 10
    }
})