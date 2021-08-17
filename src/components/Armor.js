import {IconButton, TextInput} from "react-native-paper";
import React from "react";
import {Surface} from "react-native-paper";
import {Dimensions, StyleSheet, Text, View, Platform} from "react-native";
import {Picker} from "@react-native-picker/picker";

global.screenWidth = Dimensions.get("window").width;
global.screenHeight = Dimensions.get("window").height;

export default function Armor({
                                   armor,
                                   onChange,
                                   index}) {

    function updateArmor(field, value) {
        if (field === 'name') {
            global.charaRef.collection('armor').doc(armor._id)
                .update({
                    name: value
                })
                .then(console.log('Successfully updated armor'), (error) =>
                    console.log('Failed to update armor: ' + error)
                );
        }
        else if (field === 'type') {
            global.charaRef.collection('armor').doc(armor._id)
                .update({
                    type: value
                })
                .then(console.log('Successfully updated armor'), (error) =>
                    console.log('Failed to update armor: ' + error)
                );
        }
        else if (field === 'cost') {
            global.charaRef.collection('armor').doc(armor._id)
                .update({
                    cost: value
                })
                .then(console.log('Successfully updated armor'), (error) =>
                    console.log('Failed to update armor: ' + error)
                );
        }
        else if (field === 'armor_class') {
            global.charaRef.collection('armor').doc(armor._id)
                .update({
                    armor_class: value
                })
                .then(console.log('Successfully updated armor'), (error) =>
                    console.log('Failed to update armor: ' + error)
                );
        }
        else if (field === 'strength') {
            global.charaRef.collection('armor').doc(armor._id)
                .update({
                    strength: value
                })
                .then(console.log('Successfully updated armor'), (error) =>
                    console.log('Failed to update armor: ' + error)
                );
        }
        else if (field === 'stealth') {
            global.charaRef.collection('armor').doc(armor._id)
                .update({
                    stealth: value
                })
                .then(console.log('Successfully updated armor'), (error) =>
                    console.log('Failed to update armor: ' + error)
                );
        }
        else if (field === 'weight') {
            global.charaRef.collection('armor').doc(armor._id)
                .update({
                    weight: value
                })
                .then(console.log('Successfully updated armor'), (error) =>
                    console.log('Failed to update armor: ' + error)
                );
        }
    }

    function deleteArmor() {
        global.charaRef
            .collection('armor')
            .doc(armor._id)
            .delete()
            .then(console.log('Successfully deleted armor'), (error) =>
                console.log('Failed to delete armor: ' + error)
            );
    }

    if (Platform.OS === "ios") {
        return (
            <Surface style={styles.surface}>
                <View style={styles.row}>
                    <View>
                        <View style={styles.nameHeadingContainer}>
                            <Text
                                style={styles.typeLabel}
                            >
                                Name
                            </Text>
                        </View>
                        <TextInput
                            style={styles.nameContainer}
                            value={armor.name}
                            placeholder={"Enter name..."}
                            onChangeText={(text) => {
                                updateArmor('name', text);
                                onChange(index, 'name', text);
                            }
                            }
                        />
                    </View>
                    <View>
                        <View style={styles.typeHeadingContainer}>
                            <Text
                                style={styles.typeLabel}
                            >
                                Type
                            </Text>
                        </View>
                            <Picker
                                selectedValue={armor.type}
                                onValueChange={(itemValue, itemIndex) => {
                                    updateArmor('type', itemValue);
                                    onChange(index, 'type', itemValue);
                                }}
                                style={styles.iosDropdownStyle}
                            >
                                <Picker.Item label="Light" value="Light" key="0"/>
                                <Picker.Item label="Medium" value="Medium" key="1"/>
                                <Picker.Item label="Heavy" value="Heavy" key="2"/>
                            </Picker>
                    </View>
                    <View>
                        <View style={styles.costHeadingContainer}>
                            <Text
                                style={styles.typeLabel}
                            >
                                Cost
                            </Text>
                        </View>
                        <TextInput
                            style={styles.costContainer}
                            value={armor.cost}
                            placeholder={"Enter cost..."}
                            onChangeText={(text) => {
                                updateArmor('cost', text);
                                onChange(index, 'cost', text);
                            }
                            }
                        />
                    </View>
                    <View>
                        <View style={styles.armorClassHeadingContainer}>
                            <Text
                                style={styles.typeLabel}
                            >
                                Armor Class
                            </Text>
                        </View>
                        <TextInput
                            style={styles.armorClassContainer}
                            value={armor.armor_class}
                            placeholder={"Enter armor class..."}
                            onChangeText={(text) => {
                                updateArmor('armor_class', text);
                                onChange(index, 'armor_class', text);
                            }
                            }
                        />
                    </View>
                    <View>
                        <View style={styles.strengthHeadingContainer}>
                            <Text
                                style={styles.typeLabel}
                            >
                                Strength
                            </Text>
                        </View>
                        <TextInput
                            style={styles.strengthContainer}
                            value={armor.strength}
                            placeholder={"Enter strength..."}
                            onChangeText={(text) => {
                                updateArmor('strength', text)
                                onChange(index, 'strength', text);
                            }
                            }
                        />
                    </View>
                    <View>
                        <View style={styles.stealthHeadingContainer}>
                            <Text
                                style={styles.typeLabel}
                            >
                                Stealth
                            </Text>
                        </View>
                        <TextInput
                            style={styles.stealthContainer}
                            value={armor.stealth}
                            placeholder={"Enter stealth..."}
                            onChangeText={(text) => {
                                updateArmor('stealth', text)
                                onChange(index, 'stealth', text);
                            }
                            }
                        />
                    </View>
                    <View>
                        <View style={styles.weightHeadingContainer}>
                            <Text
                                style={styles.typeLabel}
                            >
                                Weight
                            </Text>
                        </View>
                        <TextInput
                            style={styles.weightContainer}
                            value={armor.weight}
                            placeholder={"Enter weight..."}
                            onChangeText={(text) => {
                                updateArmor('weight', text)
                                onChange(index, 'weight', text);
                            }
                            }
                        />
                    </View>
                    <IconButton
                        icon="delete"
                        size={28}
                        style={styles.deleteButton}
                        color="#000"
                        onPress={deleteArmor} //delete this character
                    />
                </View>
            </Surface>
        );
    }
    else {
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
                            value={armor.name}
                            placeholder={"Enter name..."}
                            onChangeText={(text) => {
                                updateArmor('name', text);
                                onChange(index, 'name', text);
                            }
                            }
                        />
                    </View>
                    <View>
                        <View style = {styles.typeHeadingContainer}>
                            <Text
                                style={styles.typeLabel}
                            >
                                Type
                            </Text>
                        </View>
                        <View style = {styles.typeContainer}>
                            <Picker
                                selectedValue={armor.type}
                                onValueChange = {(itemValue, itemIndex) => {
                                    updateArmor('type', itemValue);
                                    onChange(index, 'type', itemValue);
                                }}
                                style = {styles.totalDropdownStyle}
                            >
                                <Picker.Item label = "Light" value = "Light" key="0" />
                                <Picker.Item label = "Medium" value = "Medium" key="1" />
                                <Picker.Item label = "Heavy" value = "Heavy" key="2" />
                            </Picker>
                        </View>
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
                            value={armor.cost}
                            placeholder={"Enter cost..."}
                            onChangeText={(text) => {
                                updateArmor('cost', text);
                                onChange(index, 'cost', text);
                            }
                            }
                        />
                    </View>
                    <View>
                        <View style = {styles.armorClassHeadingContainer}>
                            <Text
                                style={styles.typeLabel}
                            >
                                Armor Class
                            </Text>
                        </View>
                        <TextInput
                            style={styles.armorClassContainer}
                            value={armor.armor_class}
                            placeholder={"Enter armor class..."}
                            onChangeText={(text) => {
                                updateArmor('armor_class', text);
                                onChange(index, 'armor_class', text);
                            }
                            }
                        />
                    </View>
                    <View>
                        <View style = {styles.strengthHeadingContainer}>
                            <Text
                                style={styles.typeLabel}
                            >
                                Strength
                            </Text>
                        </View>
                        <TextInput
                            style={styles.strengthContainer}
                            value={armor.strength}
                            placeholder={"Enter strength..."}
                            onChangeText={(text) => {
                                updateArmor('strength', text)
                                onChange(index, 'strength', text);
                            }
                            }
                        />
                    </View>
                    <View>
                        <View style = {styles.stealthHeadingContainer}>
                            <Text
                                style={styles.typeLabel}
                            >
                                Stealth
                            </Text>
                        </View>
                        <TextInput
                            style={styles.stealthContainer}
                            value={armor.stealth}
                            placeholder={"Enter stealth..."}
                            onChangeText={(text) => {
                                updateArmor('stealth', text)
                                onChange(index, 'stealth', text);
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
                            value={armor.weight}
                            placeholder={"Enter weight..."}
                            onChangeText={(text) => {
                                updateArmor('weight', text)
                                onChange(index, 'weight', text);
                            }
                            }
                        />
                    </View>
                    <IconButton
                        icon="delete"
                        size={28}
                        style = {styles.deleteButton}
                        color="#000"
                        onPress={deleteArmor} //delete this character
                    />
                </View>
            </Surface>
        );
    }
}

const styles = StyleSheet.create({
    iosDropdownStyle: {
        width: screenWidth * 0.1012753188297074,
        height: screenHeight * 0.0398936170212766,
        marginTop: screenHeight * -0.099,
        color: "#787878"
    },
    totalDropdownStyle: {
        width: screenWidth * 0.1012753188297074,
        height: screenHeight * 0.0398936170212766,
        flex: 1,
        color: "#787878"
    },
    typeContainer: {
        margin: 2,
        width: screenWidth * 0.0960240060015004,
        height: screenHeight * 0.0597936170212766,
        borderBottomWidth: 1,
        borderTopRightRadius: 4,
        borderTopLeftRadius: 4,
        borderColor: "#adadad",
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif',
    },
    nameHeadingContainer: {
        width: screenWidth * 0.1522880720180045,
        height: screenHeight * 0.0398936170212766,
        marginTop: screenHeight * 0.0066489361702128,
        alignItems: 'center',
    },
    typeHeadingContainer: {
        width: screenWidth * 0.0960240060015004,
        height: screenHeight * 0.0398936170212766,
        marginTop: screenHeight * 0.0066489361702128,
        alignItems: 'center',
    },
    costHeadingContainer: {
        width: screenWidth * 0.0772693173293323,
        height: screenHeight * 0.0398936170212766,
        marginTop: screenHeight * 0.0066489361702128,
        alignItems: 'center',
    },
    armorClassHeadingContainer: {
        width: screenWidth * 0.1597899474868717,
        height: screenHeight * 0.0398936170212766,
        marginTop: screenHeight * 0.0066489361702128,
        alignItems: 'center',
    },
    strengthHeadingContainer: {
        width: screenWidth * 0.0772693173293323,
        height: screenHeight * 0.0398936170212766,
        marginTop: screenHeight * 0.0066489361702128,
        alignItems: 'center',
    },
    stealthHeadingContainer: {
        width: screenWidth * 0.1297824456114029,
        height: screenHeight * 0.0398936170212766,
        marginTop: screenHeight * 0.0066489361702128,
        alignItems: 'center',
    },
    weightHeadingContainer: {
        width: screenWidth * 0.0772693173293323,
        height: screenHeight * 0.0398936170212766,
        marginTop: screenHeight * 0.0066489361702128,
        alignItems: 'center',
    },
    propertiesHeadingContainer: {
        width: screenWidth * 0.2873218304576144,
        height: screenHeight * 0.0398936170212766,
        marginTop: screenHeight * 0.0066489361702128,
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
    armorClassContainer: {
        marginBottom: screenHeight * 0.0026595744680851,
        marginTop: screenHeight * 0.0026595744680851,
        marginLeft: screenWidth * 0.0015003750937734,
        marginRight: screenWidth * 0.0015003750937734,
        width: screenWidth * 0.1597899474868717,
        height: screenHeight * 0.0598404255319149,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif'
    },
    strengthContainer: {
        marginBottom: screenHeight * 0.0026595744680851,
        marginTop: screenHeight * 0.0026595744680851,
        marginLeft: screenWidth * 0.0015003750937734,
        marginRight: screenWidth * 0.0015003750937734,
        width: screenWidth * 0.0772693173293323,
        height: screenHeight * 0.0598404255319149,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif'
    },
    stealthContainer: {
        marginBottom: screenHeight * 0.0026595744680851,
        marginTop: screenHeight * 0.0026595744680851,
        marginLeft: screenWidth * 0.0015003750937734,
        marginRight: screenWidth * 0.0015003750937734,
        width: screenWidth * 0.1297824456114029,
        height: screenHeight * 0.0598404255319149,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif'
    },
    weightContainer: {
        marginBottom: screenHeight * 0.0026595744680851,
        marginTop: screenHeight * 0.0026595744680851,
        marginLeft: screenWidth * 0.0015003750937734,
        marginRight: screenWidth * 0.0015003750937734,
        width: screenWidth * 0.0772693173293323,
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
        marginBottom: (screenHeight * (2*(0.0066489361702128))),
        marginTop: (screenHeight * (2*(0.0066489361702128))),
        marginLeft: (screenWidth * (2*(0.0037509377344336))),
        marginRight: (screenWidth * (2*(0.0037509377344336))),
    }
})
