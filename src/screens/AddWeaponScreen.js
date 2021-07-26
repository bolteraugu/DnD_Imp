import {StyleSheet, View} from "react-native";
import {TextInput, Button} from "react-native-paper";
import React, {useState} from "react";

export default function AddWeaponScreen({navigation}) {
    const [name, setName] = useState("");
    const [cost, setCost] = useState("");
    const [damage, setDamage] = useState("");
    const [weight, setWeight] = useState("");
    const [properties, setProperties] = useState("");
    return (
    <View style = {styles.totalContainer}>
        <View style={styles.row}>
            <TextInput
                label="Name"
                style={styles.stringContainer}
                placeholder={"Enter name..."}
                onChangeText={(text) => {
                    setName(text)
                }}
            />
            <TextInput
                label="Cost"
                style={styles.stringContainer}
                placeholder={"Enter cost..."}
                onChangeText={(text) => {
                    setCost(text)
                }}
            />
            <TextInput
                label="Damage"
                style={styles.stringContainer}
                placeholder={"Enter damage..."}
                onChangeText={(text) => {
                    setDamage(text)
                }}
            />
            <TextInput
                label="Weight"
                style={styles.stringContainer}
                placeholder={"Enter weight..."}
                onChangeText={(text) => {
                    setWeight(text)
                }}
            />
            <TextInput
                label="Properties"
                style={styles.stringContainer}
                placeholder={"Enter properties..."}
                onChangeText={(text) => {
                    setProperties(text)
                }}
            />
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
    addButton: {
      width: "17%",
    },
    totalContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    stringContainer: {
        margin: 2,
        width: 203,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif',
        flex: 1
    },
    row: {
        flexDirection: 'row',
        margin: 10
    }
})