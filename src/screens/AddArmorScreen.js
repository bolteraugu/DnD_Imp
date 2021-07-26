import {StyleSheet, Text, View} from "react-native";
import {Picker} from '@react-native-community/picker'
import {TextInput, Button} from "react-native-paper";
import React, {useState} from "react";

export default function AddArmorScreen({navigation}) {
    const [name, setName] = useState("");
    const [type, setType] = useState("Light");
    const [cost, setCost] = useState("");
    const [armorClass, setArmorClass] = useState("");
    const [strength, setStrength] = useState("");
    const [stealth, setStealth] = useState("");
    const [weight, setWeight] = useState("");

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
                    <View style = {styles.typeHeadingContainer}>
                        <View style = {styles.typeHeadingBorder}>
                            <Text
                                style={styles.typeLabel}
                            >
                                Type
                            </Text>
                        </View>
                    </View>
                    <View style = {styles.typeContainer}>
                        <Picker
                            mode="dropdown"
                            selectedValue={type}
                            onValueChange = {(itemValue, itemIndex) => {setType(itemValue)}}
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
                    <View style = {styles.armorClassHeadingContainer}>
                        <View style = {styles.armorClassHeadingBorder}>
                            <Text
                                style={styles.typeLabel}
                            >
                                Armor Class
                            </Text>
                        </View>
                    </View>
                    <TextInput
                        style={styles.armorClassContainer}
                        placeholder={"Enter armor class..."}
                        onChangeText={(text) => {
                            setArmorClass(text)
                        }}
                    />
                </View>
                <View>
                    <View style = {styles.strengthHeadingContainer}>
                        <View style = {styles.strengthHeadingBorder}>
                            <Text
                                style={styles.typeLabel}
                            >
                                Strength
                            </Text>
                        </View>
                    </View>
                    <TextInput
                        style={styles.strengthContainer}
                        placeholder={"Enter strength..."}
                        onChangeText={(text) => {
                            setStrength(text)
                        }}
                    />
                </View>
                <View>
                    <View style = {styles.stealthHeadingContainer}>
                        <View style = {styles.stealthHeadingBorder}>
                            <Text
                                style={styles.typeLabel}
                            >
                                Stealth
                            </Text>
                        </View>
                    </View>
                    <TextInput
                        style={styles.stealthContainer}
                        placeholder={"Enter stealth..."}
                        onChangeText={(text) => {
                            setStealth(text)
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
            </View>
            <Button
                mode = "contained"
                style = {styles.addButton}
                disabled={name.length === 0}
                onPress = {() => {
                    global.charaRef.collection("armor").add({
                        name: name,
                        type: type,
                        cost: cost,
                        strength: strength,
                        stealth: stealth,
                        armor_class: armorClass,
                        weight: weight,
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
    typeHeadingContainer: {
        width: 148,
        height: 30,
        marginBottom: 5
    },
    typeHeadingBorder: {
        borderBottomWidth: 1,
        width: 132,
        height: 30,
        marginLeft: 8,
        alignItems: 'center'
    },
    costHeadingContainer: {
        width: 138,
        height: 30,
        marginBottom: 5
    },
    costHeadingBorder: {
        borderBottomWidth: 1,
        width: 122,
        height: 30,
        marginLeft: 8,
        alignItems: 'center'
    },
    armorClassHeadingContainer: {
        width: 263,
        height: 30,
        marginBottom: 5
    },
    armorClassHeadingBorder: {
        borderBottomWidth: 1,
        width: 247,
        height: 30,
        marginLeft: 8,
        alignItems: 'center'
    },
    strengthHeadingContainer: {
        width: 153,
        height: 30,
        marginBottom: 5
    },
    strengthHeadingBorder: {
        borderBottomWidth: 1,
        width: 137,
        height: 30,
        marginLeft: 8,
        alignItems: 'center'
    },
    stealthHeadingContainer: {
        width: 203,
        height: 30,
        marginBottom: 5
    },
    stealthHeadingBorder: {
        borderBottomWidth: 1,
        width: 187,
        height: 30,
        marginLeft: 8,
        alignItems: 'center'
    },
    weightHeadingContainer: {
        width: 138,
        height: 30,
        marginBottom: 5
    },
    weightHeadingBorder: {
        borderBottomWidth: 1,
        width: 122,
        height: 30,
        marginLeft: 8,
        alignItems: 'center'
    },
    typeLabel: {
        color: "#000000",
        fontSize: 16,
        fontFamily: 'sans-serif',
        fontWeight: "bold",
        marginBottom: 2
    },
    totalDropdownStyle: {
        width: 155,
        height: 50,
        flex: 1,
        color: "#787878"
    },
    addButton: {
        width: "17%",
        marginTop: -20
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
    typeContainer: {
        margin: 2,
        width: 148,
        height: 38,
        borderBottomWidth: 1,
        borderTopRightRadius: 4,
        borderTopLeftRadius: 4,
        borderColor: "#adadad",
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif',
        flex: 1,
        marginBottom: 38
    },
    costContainer: {
        margin: 2,
        width: 138,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif',
        marginBottom: 38
    },
    armorClassContainer: {
        margin: 2,
        width: 263,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif',
        marginBottom: 38
    },
    strengthContainer: {
        margin: 2,
        width: 153,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif',
        marginBottom: 38
    },
    stealthContainer: {
        margin: 2,
        width: 203,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif',
        marginBottom: 38
    },
    weightContainer: {
        margin: 2,
        width: 138,
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