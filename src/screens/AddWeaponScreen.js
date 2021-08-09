import {Dimensions, StyleSheet, Text, View} from "react-native";
import {TextInput, Button} from "react-native-paper";
import React, {useState} from "react";

global.screenWidth = Dimensions.get("window").width;
global.screenHeight = Dimensions.get("window").height;

export default function AddWeaponScreen({navigation}) {
    const [name, setName] = useState("");
    const [cost, setCost] = useState("");
    const [damage, setDamage] = useState("");
    const [weight, setWeight] = useState("");
    const [properties, setProperties] = useState("");
    return (
        <View style = {styles.totalContainer}>
            <View style={styles.row}>
                <View>
                    <View style = {styles.nameHeadingContainer}>
                        <View style = {styles.nameHeadingBorder}>
                            <Text
                                style={styles.typeLabel}
                            >
                                Name
                            </Text>
                        </View>
                    </View>
                    <TextInput
                        style={styles.nameContainer}
                        placeholder={"Enter name..."}
                        onChangeText={(text) => {
                            setName(text)
                        }}
                    />
                </View>
                <View>
                    <View style = {styles.costHeadingContainer}>
                        <View style = {styles.costHeadingBorder}>
                            <Text
                                style={styles.typeLabel}
                            >
                                Cost
                            </Text>
                        </View>
                    </View>
                    <TextInput
                        style={styles.costContainer}
                        placeholder={"Enter cost..."}
                        onChangeText={(text) => {
                            setCost(text)
                        }}
                    />
                </View>
                <View>
                    <View style = {styles.damageHeadingContainer}>
                        <View style = {styles.damageHeadingBorder}>
                            <Text
                                style={styles.typeLabel}
                            >
                                Damage
                            </Text>
                        </View>
                    </View>
                    <TextInput
                        style={styles.damageContainer}
                        placeholder={"Enter damage..."}
                        onChangeText={(text) => {
                            setDamage(text)
                        }}
                    />
                </View>
                <View>
                    <View style = {styles.weightHeadingContainer}>
                        <View style = {styles.weightHeadingBorder}>
                            <Text
                                style={styles.typeLabel}
                            >
                                Weight
                            </Text>
                        </View>
                    </View>
                    <TextInput
                        style={styles.weightContainer}
                        placeholder={"Enter weight..."}
                        onChangeText={(text) => {
                            setWeight(text)
                        }}
                    />
                </View>
                <View>
                    <View style = {styles.propertiesHeadingContainer}>
                        <View style = {styles.propertiesHeadingBorder}>
                            <Text
                                style={styles.typeLabel}
                            >
                                Properties
                            </Text>
                        </View>
                    </View>
                    <TextInput
                        style={styles.propertiesContainer}
                        placeholder={"Enter properties..."}
                        onChangeText={(text) => {
                            setProperties(text)
                        }}
                    />
                </View>
            </View>
            <Button
                mode = "contained"
                style = {styles.addButton}
                disabled={name.length === 0}
                onPress = {() => {
                    global.charaRef.collection("weapons").add({
                        name: name,
                        cost: cost,
                        damage: damage,
                        weight: weight,
                        properties: properties
                    });
                    navigation.navigate('CharacterSheet', {
                        screen: 'Inventory'
                    })
                }}
            >
                Add
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    nameHeadingContainer: {
        width: 233,
        height: 30,
        marginBottom: 5
    },
    nameHeadingBorder: {
        borderBottomWidth: 1,
        width: 217,
        height: 30,
        alignItems: 'center',
        marginLeft: 10
    },
    costHeadingContainer: {
        width: 118,
        height: 30,
        marginBottom: 5
    },
    costHeadingBorder: {
        borderBottomWidth: 1,
        width: 102,
        height: 30,
        alignItems: 'center',
        marginLeft: 8
    },
    damageHeadingContainer: {
        width: 223,
        height: 30,
        marginBottom: 5
    },
    damageHeadingBorder: {
        borderBottomWidth: 1,
        width: 207,
        height: 30,
        alignItems: 'center',
        marginLeft: 8
    },
    weightHeadingContainer: {
        width: 118,
        height: 30,
        marginBottom: 5
    },
    weightHeadingBorder: {
        borderBottomWidth: 1,
        width: 102,
        height: 30,
        alignItems: 'center',
        marginLeft: 8
    },
    propertiesHeadingContainer: {
        width: 433,
        height: 30,
        marginBottom: 5
    },
    propertiesHeadingBorder: {
        borderBottomWidth: 1,
        width: 417,
        height: 30,
        alignItems: 'center',
        marginLeft: 8
    },
    typeLabel: {
        color: "#000000",
        fontSize: 16,
        fontFamily: 'sans-serif',
        fontWeight: "bold",
        marginBottom: 2
    },
    addButton: {
        marginTop: -20,
        width: "17%",
    },
    totalContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    nameContainer: {
        margin: 2,
        width: 233,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif',
        marginBottom: 38
    },
    costContainer: {
        margin: 2,
        width: 118,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif',
        marginBottom: 38
    },
    damageContainer: {
        margin: 2,
        width: 223,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif',
        marginBottom: 38
    },
    weightContainer: {
        margin: 2,
        width: 118,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif',
        marginBottom: 38
    },
    propertiesContainer: {
        margin: 2,
        width: 433,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif',
        marginBottom: 38
    },
    row: {
        flexDirection: 'row',
        margin: 10,
        marginTop: 25
    }
})
