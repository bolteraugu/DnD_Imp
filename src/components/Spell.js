import {IconButton, TextInput} from "react-native-paper";
import React from "react";
import {Surface} from "react-native-paper";
import {StyleSheet, Text, TextInput as NativeTextInput, View} from "react-native";

export default function Spell({
                                   spell,
                                   onChange,
                                   index}) {

    function updateSpell(field, value) {
        if (field === 'name') {
            global.charaRef.collection('spells').doc(spell._id)
                .update({
                    name: value
                })
                .then(console.log('Successfully updated spell'), (error) =>
                    console.log('Failed to update spell: ' + error)
                );
        }
        else if (field === 'level') {
            global.charaRef.collection('spells').doc(spell._id)
                .update({
                    level: Number(value)
                })
                .then(console.log('Successfully updated spell'), (error) =>
                    console.log('Failed to update spell: ' + error)
                );
        }
        else if (field === 'casting_time') {
            global.charaRef.collection('spells').doc(spell._id)
                .update({
                    casting_time: value
                })
                .then(console.log('Successfully updated spell'), (error) =>
                    console.log('Failed to update spell: ' + error)
                );
        }
        else if (field === 'range') {
            global.charaRef.collection('spells').doc(spell._id)
                .update({
                    range: value
                })
                .then(console.log('Successfully updated spell'), (error) =>
                    console.log('Failed to update spell: ' + error)
                );
        }
        else if (field === 'components') {
            global.charaRef.collection('spells').doc(spell._id)
                .update({
                    components: value
                })
                .then(console.log('Successfully updated spell'), (error) =>
                    console.log('Failed to update spell: ' + error)
                );
        }
        else if (field === 'duration') {
            global.charaRef.collection('spells').doc(spell._id)
                .update({
                    duration: value
                })
                .then(console.log('Successfully updated spell'), (error) =>
                    console.log('Failed to update spell: ' + error)
                );
        }
        else if (field === 'description') {
            global.charaRef.collection('spells').doc(spell._id)
                .update({
                    description: value
                })
                .then(console.log('Successfully updated spell'), (error) =>
                    console.log('Failed to update spell: ' + error)
                );
        }
    }

    function deleteSpell() {
        global.charaRef
            .collection('spells')
            .doc(spell._id)
            .delete()
            .then(console.log('Successfully deleted spell'), (error) =>
                console.log('Failed to delete spell: ' + error)
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
                        value={spell.name}
                        placeholder={"Enter name..."}
                        onChangeText={(text) => {
                            updateSpell('name', text);
                            onChange(index, 'name', text);
                        }
                        }
                    />
                </View>
                <View>
                    <View style = {styles.levelHeadingContainer}>
                        <Text
                            style={styles.typeLabel}
                        >
                            Level
                        </Text>
                    </View>
                    <TextInput
                        style={styles.levelContainer}
                        value={String(spell.level)}
                        keyboardType="number-pad"
                        placeholder={"Enter level..."}
                        onChangeText={(text) => {
                            updateSpell('level', text);
                            onChange(index, 'level', text);
                        }
                        }
                    />
                </View>
                <View>
                    <View style = {styles.castingTimeHeadingContainer}>
                        <Text
                            style={styles.typeLabel}
                        >
                            Casting Time
                        </Text>
                    </View>
                    <TextInput
                        style={styles.castingTimeContainer}
                        value={spell.casting_time}
                        placeholder={"Enter casting time..."}
                        onChangeText={(text) => {
                            updateSpell('casting_time', text);
                            onChange(index, 'casting_time', text);
                        }
                        }
                    />
                </View>
                <View>
                    <View style = {styles.rangeHeadingContainer}>
                        <Text
                            style={styles.typeLabel}
                        >
                            Range
                        </Text>
                    </View>
                    <TextInput
                        style={styles.rangeContainer}
                        value={spell.range}
                        placeholder={"Enter range..."}
                        onChangeText={(text) => {
                            updateSpell('range', text);
                            onChange(index, 'range', text);
                        }
                        }
                    />
                </View>
                <View>
                    <View style = {styles.componentsHeadingContainer}>
                        <Text
                            style={styles.typeLabel}
                        >
                            Components
                        </Text>
                    </View>
                    <TextInput
                        style={styles.componentsContainer}
                        value={spell.components}
                        placeholder={"Enter components..."}
                        onChangeText={(text) => {
                            updateSpell('components', text)
                            onChange(index, 'components', text);
                        }
                        }
                    />
                </View>
                <View>
                    <View style = {styles.durationHeadingContainer}>
                        <Text
                            style={styles.typeLabel}
                        >
                            Duration
                        </Text>
                    </View>
                    <TextInput
                        style={styles.durationContainer}
                        value={spell.duration}
                        placeholder={"Enter duration..."}
                        onChangeText={(text) => {
                            updateSpell('duration', text);
                            onChange(index, 'duration', text);
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
                        value={spell.description}
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
                                            maxHeight: 250,
                                            minHeight: 45,
                                        }
                                        : null,
                                ]}
                                placeholder={"Enter description..."}
                            />
                        )}
                        onChangeText={(text) => {
                            updateSpell('description', text)
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
                    onPress={deleteSpell} //delete this character
                />
            </View>
        </Surface>
    );
}

const styles = StyleSheet.create({
    nameHeadingContainer: {
        width: 203,
        height: 30,
        marginBottom: 5,
        alignItems: 'center',
    },
    levelHeadingContainer: {
        width: 73,
        height: 30,
        marginBottom: 5,
        alignItems: 'center',
    },
    castingTimeHeadingContainer: {
        width: 163,
        height: 30,
        marginBottom: 5,
        alignItems: 'center',
    },
    rangeHeadingContainer: {
        width: 123,
        height: 30,
        marginBottom: 5,
        alignItems: 'center',
    },
    componentsHeadingContainer: {
        width: 138,
        height: 30,
        marginBottom: 5,
        alignItems: 'center',
    },
    durationHeadingContainer: {
        width: 133,
        height: 30,
        marginBottom: 5,
        alignItems: 'center',
    },
    descriptionHeadingContainer: {
        width: 283,
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
        marginTop: 46,
        marginLeft: 0
    },
    nameContainer: {
        margin: 2,
        width: 203,
        height: 64,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif'
    },
    levelContainer: {
        margin: 2,
        width: 73,
        height: 64,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif'
    },
    castingTimeContainer: {
        margin: 2,
        width: 163,
        height: 64,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif'
    },
    rangeContainer: {
        margin: 2,
        width: 123,
        height: 64,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif'
    },
    componentsContainer: {
        margin: 2,
        width: 138,
        height: 64,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif'
    },
    durationContainer: {
        margin: 2,
        width: 133,
        height: 64,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif'
    },
    descriptionContainer: {
        margin: 2,
        width: 283,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif'
    },
    surface: {
        elevation: 4,
        margin: 5,
        color: "#ffffff",
        width: "98.2%"
    },
    row: {
        flexDirection: 'row',
        margin: 10
    }
})