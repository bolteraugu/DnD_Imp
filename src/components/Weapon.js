import {IconButton, TextInput} from "react-native-paper";
import React from "react";
import {Surface} from "react-native-paper";
import {StyleSheet, View} from "react-native";

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
                <TextInput
                    label="Name"
                    style={styles.nameContainer}
                    value={weapon.name}
                    placeholder={"Enter name..."}
                    onChangeText={(text) => {
                        updateWeapon('name', text);
                        onChange(index, 'name', text);
                    }
                    }
                />
                <TextInput
                    label="Cost"
                    style={styles.costContainer}
                    value={weapon.cost}
                    placeholder={"Enter cost..."}
                    onChangeText={(text) => {
                        updateWeapon('cost', text);
                        onChange(index, 'cost', text);
                    }
                    }
                />
                <TextInput
                    label="Damage"
                    style={styles.damageContainer}
                    value={weapon.damage}
                    placeholder={"Enter damage..."}
                    onChangeText={(text) => {
                        updateWeapon('damage', text);
                        onChange(index, 'damage', text);
                    }
                    }
                />
                <TextInput
                    label="Weight"
                    style={styles.weightContainer}
                    value={weapon.weight}
                    placeholder={"Enter weight..."}
                    onChangeText={(text) => {
                        updateWeapon('weight', text);
                        onChange(index, 'weight', text);
                    }
                    }
                />
                <TextInput
                    label="Properties"
                    style={styles.propertiesContainer}
                    value={weapon.properties}
                    placeholder={"Enter properties..."}
                    onChangeText={(text) => {
                        updateWeapon('properties', text)
                        onChange(index, 'properties', text);
                    }
                    }
                />
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
    deleteButton: {
        marginTop: 12,
        marginRight: 10
    },
    nameContainer: {
        margin: 2,
        width: 203,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif'
    },
    costContainer: {
        margin: 2,
        width: 103,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif'
    },
    damageContainer: {
        margin: 2,
        width: 223,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif'
    },
    weightContainer: {
        margin: 2,
        width: 103,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif'
    },
    propertiesContainer: {
        margin: 2,
        width: 383,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif'
    },
    surface: {
        elevation: 4,
        margin: 5,
        color: "#ffffff"
    },
    row: {
        flexDirection: 'row'
    }
})