import {IconButton, TextInput} from "react-native-paper";
import React from "react";
import {Surface} from "react-native-paper";
import {Dimensions, StyleSheet, Text, TextInput as NativeTextInput, View} from "react-native";

global.screenWidth = Dimensions.get("window").width;
global.screenHeight = Dimensions.get("window").height;

export default function Possession({
                                   possession,
                                   onChange,
                                   index}) {

    function updatePossession(field, value) {
        if (field === 'name') {
            global.charaRef.collection('possessions').doc(possession._id)
                .update({
                    name: value
                })
                .then(console.log('Successfully updated possession'), (error) =>
                    console.log('Failed to update possession: ' + error)
                );
        }
        else if (field === 'description') {
            global.charaRef.collection('possessions').doc(possession._id)
                .update({
                    description: value
                })
                .then(console.log('Successfully updated possession'), (error) =>
                    console.log('Failed to update possession: ' + error)
                );
        }
    }

    function deletePossession() {
        global.charaRef
            .collection('possessions')
            .doc(possession._id)
            .delete()
            .then(console.log('Successfully deleted possession'), (error) =>
                console.log('Failed to delete possession: ' + error)
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
                        value={possession.name}
                        placeholder={"Enter name..."}
                        onChangeText={(text) => {
                            updatePossession('name', text);
                            onChange(index, 'name', text);
                        }
                        }
                    />
                </View>
                <View>
                    <View style = {styles.descriptionHeadingContainer}>
                        <Text
                            style={styles.typeLabel}
                        >
                            Description
                        </Text>
                    </View>
                    <TextInput
                        style={styles.descriptionContainer}
                        value={possession.description}
                        placeholder={"Enter description..."}
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
                                            maxHeight: 250,
                                            height: 45,
                                        }
                                        : null,
                                ]}
                                placeholder={"Enter description..."}
                            />
                        )}
                        onChangeText={(text) => {
                            updatePossession('description', text);
                            onChange(index, 'description', text);
                        }
                        }
                    />
                </View>
                <IconButton
                    icon="delete"
                    size={28}
                    style = {styles.deleteButton}
                    color="#000"
                    onPress={deletePossession} //delete this character
                />
            </View>
        </Surface>
    );
}

const styles = StyleSheet.create({
    nameHeadingContainer: {
        width: screenWidth * 0.2460615153788447,
        height: screenHeight * 0.0398936170212766,
        marginBottom: screenHeight * 0.0066489361702128,
        alignItems: 'center',
    },
    descriptionHeadingContainer: {
        width: screenWidth * 0.5378844711177794,
        height: screenHeight * 0.0398936170212766,
        marginBottom: screenHeight * 0.0066489361702128,
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
        width: screenWidth * 0.2460615153788447,
        height: screenHeight * 0.0851063829787234,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif'
    },
    descriptionContainer: {
        marginBottom: screenHeight * 0.0026595744680851,
        marginTop: screenHeight * 0.0026595744680851,
        marginLeft: screenWidth * 0.0015003750937734,
        marginRight: screenWidth * 0.0015003750937734,
        width: screenWidth * 0.5378844711177794,
        // height: 45,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif'
    },
    surface: {
        elevation: 4,
        marginBottom: screenHeight * 0.0026595744680851,
        marginTop: screenHeight * 0.0026595744680851,
        marginLeft: screenWidth * 0.0037509377344336,
        marginRight: screenWidth * 0.0037509377344336,
        color: "#ffffff"
    },
    row: {
        flexDirection: 'row',
        marginBottom: screenHeight * 0.0053191489361702,
        marginTop: screenHeight * 0.0053191489361702,
        marginLeft: screenWidth * 0.0075018754688672,
        marginRight: screenWidth * 0.0075018754688672,
    }
})
