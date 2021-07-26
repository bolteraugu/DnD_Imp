import {IconButton, TextInput} from "react-native-paper";
import React from "react";
import {Surface} from "react-native-paper";
import {StyleSheet, Text, TextInput as NativeTextInput, View} from "react-native";

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
        width: 328,
        height: 30,
        marginBottom: 5,
        alignItems: 'center',
    },
    descriptionHeadingContainer: {
        width: 717,
        height: 30,
        marginBottom: 5,
        alignItems: 'center',
    },
    typeLabel: {
        color: "#000000",
        fontSize: 16,
        fontFamily: 'sans-serif',
        fontWeight: "bold",
        marginBottom: 2,
    },
    deleteButton: {
        marginTop: 36,
        marginRight: 10
    },
    nameContainer: {
        margin: 2,
        width: 328,
        height: 45,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif'
    },
    descriptionContainer: {
        margin: 2,
        width: 717,
        // height: 45,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif'
    },
    surface: {
        elevation: 4,
        margin: 5,
        color: "#ffffff"
    },
    row: {
        flexDirection: 'row',
        margin: 10
    }
})