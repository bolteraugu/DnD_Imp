import {Dimensions, StyleSheet, Text, TextInput as NativeTextInput, View} from "react-native";
import {TextInput, Button} from "react-native-paper";
import React, {useState} from "react";
import {Picker} from "@react-native-community/picker";

global.screenWidth = Dimensions.get("window").width;
global.screenHeight = Dimensions.get("window").height;

export default function AddSpellScreen({navigation}) {
    const [name, setName] = useState("");
    const [level, setLevel] = useState("Cantrip");
    const [castingTime, setCastingTime] = useState("");
    const [range, setRange] = useState("");
    const [components, setComponents] = useState("");
    const [duration, setDuration] = useState("");
    const [description, setDescription] = useState("");
    return (
        <View style = {styles.totalContainer}>
            <View style={styles.column}>
                <View style = {styles.row}>
                    <View style = {styles.headingContainer}>
                        <Text
                            style={styles.typeLabel}
                        >
                            Name:
                        </Text>
                    </View>
                    <TextInput
                        style={styles.inputContainer}
                        placeholder={"Enter name..."}
                        onChangeText={(text) => {
                            setName(text)
                        }}
                    />
                </View>
                <View style = {styles.row}>
                    <View style = {styles.headingContainer}>
                        <Text
                            style={styles.typeLabel}
                        >
                            Description:
                        </Text>
                    </View>
                    <TextInput
                        style={styles.descriptionContainer}
                        multiline={true}
                        render={props => (
                            <NativeTextInput
                                {...props}
                                style={[
                                    props.style,
                                    props.multiline
                                        ? {
                                            paddingTop: screenHeight * 0.0199468085106383,
                                            paddingLeft: screenWidth * 0.018754688672168,
                                            paddingRight: screenWidth * 0.018754688672168,
                                            paddingBottom: screenHeight * 0.0106382978723404,
                                            height: screenHeight * 0.2659574468085106,
                                        }
                                        : null,
                                ]}
                                placeholder={"Enter description..."}
                            />
                        )}
                        onChangeText={(text) => {
                            setDescription(text)
                        }}
                    />
                </View>
            </View>
            <Button
                mode = "contained"
                style = {styles.addButton}
                disabled={name.length === 0}
                onPress = {() => {
                    global.charaRef.collection("possessions").add({
                        name: name,
                        description: description,
                    });
                    navigation.navigate('CharacterSheet', {
                        screen: 'Inventory'
                    })
                }}
            >
                Add
            </Button>
            <View style = {styles.gap}/>
        </View>
    );
}

const styles = StyleSheet.create({
    totalDropdownStyle: {
        width: screenWidth * 0.3345843960990248,
        height: screenHeight * 0.0598404255319149,
        flex: 1,
        color: "#787878"
    },
    typeContainer: {
        marginTop: screenHeight * 0.0026595744680851,
        marginLeft: screenWidth * 0.0015003750937734,
        marginRight: screenWidth * 0.0015003750937734,
        width: screenWidth * 0.0847711927981995,
        height: screenHeight * 0.0598404255319149,
        marginBottom: screenHeight * 0.033244680851064,
        borderBottomWidth: 1,
        borderTopRightRadius: 4,
        borderTopLeftRadius: 4,
        borderColor: "#adadad",
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif',
        flex: 1,
    },
    gap: {
        height: screenHeight * 0.3191489361702128
    },
    headingContainer: {
        width: screenWidth * 0.1275318829707427,
        height: screenHeight * 0.0398936170212766,
        marginBottom: screenHeight * 0.0066489361702128,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: screenHeight * 0.011968085106383
    },
    typeLabel: {
        color: "#000000",
        fontSize: 16,
        fontFamily: 'sans-serif',
        fontWeight: "bold",
        marginBottom: screenHeight * 0.0026595744680851,
    },
    addButton: {
        width: "17%",
        marginRight: screenWidth * 0.0412603150787697
    },
    totalContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        marginTop: screenHeight * 0.0026595744680851,
        marginLeft: screenWidth * 0.0015003750937734,
        marginRight: screenWidth * 0.0015003750937734,
        width: screenWidth * 0.3375843960990248,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif',
        marginBottom: screenHeight * 0.033244680851064,
        height: screenHeight * 0.0598404255319149,
    },
    descriptionContainer: {
        marginTop: screenHeight * 0.0026595744680851,
        marginLeft: screenWidth * 0.0015003750937734,
        marginRight: screenWidth * 0.0015003750937734,
        width: screenWidth * 0.3375843960990248,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif',
        marginBottom: screenHeight * 0.033244680851064,
        height: screenHeight * 0.0598404255319149,
    },
    column: {
        flexDirection: 'column',
        marginBottom: screenHeight * 0.0132978723404256,
        marginLeft: screenWidth * 0.0075018754688672,
        marginRight: screenWidth * 0.0075018754688672,
        marginTop: screenHeight * 0.1291914893617021,
    },
    row: {
        flexDirection: 'row',
    }
})
