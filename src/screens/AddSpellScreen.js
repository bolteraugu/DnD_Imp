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
                                Level:
                            </Text>
                    </View>
                    <View style = {styles.typeContainer}>
                        <Picker
                            selectedValue={level}
                            onValueChange = {(itemValue, itemIndex) => {
                                setLevel(itemValue);
                            }}
                            style = {styles.totalDropdownStyle}
                        >
                            <Picker.Item label = "Cantrip" value = "Cantrip" key="0" />
                            <Picker.Item label = "0" value = "0" key="1" />
                            <Picker.Item label = "1" value = "1" key="2" />
                            <Picker.Item label = "2" value = "2" key="3" />
                            <Picker.Item label = "3" value = "3" key="4" />
                            <Picker.Item label = "4" value = "4" key="5" />
                            <Picker.Item label = "5" value = "5" key="6" />
                            <Picker.Item label = "6" value = "6" key="7" />
                            <Picker.Item label = "7" value = "7" key="8" />
                            <Picker.Item label = "8" value = "8" key="9" />
                            <Picker.Item label = "9" value = "9" key="10" />
                        </Picker>
                    </View>
                    {/*<TextInput*/}
                    {/*    style={styles.inputContainer}*/}
                    {/*    keyboardType="number-pad"*/}
                    {/*    placeholder={"Enter level..."}*/}
                    {/*    onChangeText={(text) => {*/}
                    {/*        setLevel(Number(text))*/}
                    {/*    }}*/}
                    {/*/>*/}
                </View>
                <View style = {styles.row}>
                    <View style = {styles.headingContainer}>
                            <Text
                                style={styles.typeLabel}
                            >
                                Casting Time:
                            </Text>
                    </View>
                    <TextInput
                        style={styles.inputContainer}
                        placeholder={"Enter casting time..."}
                        onChangeText={(text) => {
                            setCastingTime(text)
                        }}
                    />
                </View>
                <View style = {styles.row}>
                    <View style = {styles.headingContainer}>
                            <Text
                                style={styles.typeLabel}
                            >
                                Range:
                            </Text>
                    </View>
                    <TextInput
                        style={styles.inputContainer}
                        placeholder={"Enter range..."}
                        onChangeText={(text) => {
                            setRange(text)
                        }}
                    />
                </View>
                <View style = {styles.row}>
                    <View style = {styles.headingContainer}>
                            <Text
                                style={styles.typeLabel}
                            >
                                Components:
                            </Text>
                    </View>
                    <TextInput
                        style={styles.inputContainer}
                        placeholder={"Enter components..."}
                        onChangeText={(text) => {
                            setComponents(text)
                        }}
                    />
                </View>
                <View style = {styles.row}>
                    <View style = {styles.headingContainer}>
                        <Text
                            style={styles.typeLabel}
                        >
                            Duration:
                        </Text>
                    </View>
                    <TextInput
                        style={styles.inputContainer}
                        placeholder={"Enter duration..."}
                        onChangeText={(text) => {
                            setDuration(text)
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
                                            paddingTop: screenHeight * 0.0132978723404255,
                                            paddingLeft: screenWidth * 0.0090022505626407,
                                            paddingRight: screenWidth * 0.018754688672168,
                                            paddingBottom: screenHeight * 0.0106382978723404,
                                            height: screenHeight * 0.1329787234042553,
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
                    global.charaRef.collection("spells").add({
                        name: name,
                        level: level,
                        casting_time: castingTime,
                        range: range,
                        components: components,
                        duration: duration,
                        description: description
                    });
                    navigation.navigate('CharacterSheet', {
                        screen: 'Spells'
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
