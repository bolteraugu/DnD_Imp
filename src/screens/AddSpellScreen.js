import {StyleSheet, Text, TextInput as NativeTextInput, View} from "react-native";
import {TextInput, Button} from "react-native-paper";
import React, {useState} from "react";

export default function AddSpellScreen({navigation}) {
    const [name, setName] = useState("");
    const [level, setLevel] = useState("");
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
                    <TextInput
                        style={styles.inputContainer}
                        keyboardType="number-pad"
                        placeholder={"Enter level..."}
                        onChangeText={(text) => {
                            setLevel(Number(text))
                        }}
                    />
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
                                            paddingTop: 10,
                                            paddingLeft: 12,
                                            paddingRight: 25,
                                            paddingBottom: 8,
                                            height: 100,
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
    gap: {
      height: 240
    },
    headingContainer: {
        width: 170,
        height: 30,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 9
    },
    typeLabel: {
        color: "#000000",
        fontSize: 16,
        fontFamily: 'sans-serif',
        fontWeight: "bold",
        marginBottom: 2
    },
    addButton: {
        width: "17%",
        marginRight: 55
    },
    totalContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        margin: 2,
        width: 450,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif',
        marginBottom: 7.5,
        height: 45,
    },
    descriptionContainer: {
        margin: 2,
        width: 450,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif',
        marginBottom: 7.5,
        height: 45,
    },
    column: {
        flexDirection: 'column',
        margin: 10,
        marginTop: 25
    },
    row: {
        flexDirection: 'row',
    }
})