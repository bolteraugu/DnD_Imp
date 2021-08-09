import {Dimensions, StyleSheet, Text, TextInput as NativeTextInput, View} from "react-native";
import {TextInput, Button} from "react-native-paper";
import React, {useState} from "react";

global.screenWidth = Dimensions.get("window").width;
global.screenHeight = Dimensions.get("window").height;

export default function AddPossessionScreen({navigation}) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
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
                    <View style = {styles.descriptionHeadingContainer}>
                        <View style = {styles.descriptionHeadingBorder}>
                            <Text
                                style={styles.typeLabel}
                            >
                                Description
                            </Text>
                        </View>
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
                                            paddingTop: 15,
                                            paddingLeft: 25,
                                            paddingRight: 25,
                                            paddingBottom: 8,
                                            height: 200,
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
        </View>
    );
}

const styles = StyleSheet.create({
    nameHeadingContainer: {
        width: 318,
        height: 30,
        marginBottom: 5
    },
    nameHeadingBorder: {
        borderBottomWidth: 1,
        width: 303,
        height: 30,
        alignItems: 'center',
        marginLeft: 10
    },
    descriptionHeadingContainer: {
        width: 633,
        height: 30,
        marginBottom: 5,
        marginLeft: 8
    },
    descriptionHeadingBorder: {
        borderBottomWidth: 1,
        width: 617,
        height: 30,
        alignItems: 'center',
        marginLeft: 10
    },
    typeLabel: {
        color: "#000000",
        fontSize: 16,
        fontFamily: 'sans-serif',
        fontWeight: "bold",
        marginBottom: 2
    },
    addButton: {
        marginTop: 10,
        width: "17%",
    },
    totalContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    nameContainer: {
        margin: 2,
        width: 318,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif',
        marginBottom: 38
    },
    descriptionContainer: {
        margin: 2,
        marginLeft: 10,
        width: 633,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif'
    },
    row: {
        flexDirection: 'row',
        margin: 10,
        marginTop: 25
    }
})
