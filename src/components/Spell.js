import {IconButton, TextInput} from "react-native-paper";
import React from "react";
import {Surface} from "react-native-paper";
import {Dimensions, StyleSheet, Text, TextInput as NativeTextInput, View, Platform} from "react-native";
import {Picker} from "@react-native-picker/picker";

global.screenWidth = Dimensions.get("window").width;
global.screenHeight = Dimensions.get("window").height;

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

    if (Platform.OS === "ios") {
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
                        <View style = {styles.levelHeadingContainerIOS}>
                            <Text
                                style={styles.typeLabel}
                            >
                                Level
                            </Text>
                        </View>
                            <Picker
                                selectedValue={spell.level}
                                onValueChange = {(itemValue, itemIndex) => {
                                    updateSpell('level', itemValue);
                                    onChange(index, 'level', itemValue);
                                }}
                                style = {styles.iosDropdownStyle}
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
    else {
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
                        <View style = {styles.typeContainer}>
                            <Picker
                                selectedValue={spell.level}
                                onValueChange = {(itemValue, itemIndex) => {
                                    updateSpell('level', itemValue);
                                    onChange(index, 'level', itemValue);
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

}

const styles = StyleSheet.create({
    iosDropdownStyle: {
        width: screenWidth * 0.1012753188297074,
        height: screenHeight * 0.0398936170212766,
        marginTop: screenHeight * -0.099,
        color: "#787878"
    },
    totalDropdownStyle: {
        width: screenWidth * 0.0900225056264066,
        height: screenHeight * 0.0398936170212766,
        flex: 1,
        color: "#787878"
    },
    typeContainer: {
        marginBottom: screenHeight * 0.0026595744680851,
        marginTop: screenHeight * 0.0026595744680851,
        marginLeft: screenWidth * 0.0015003750937734,
        marginRight: screenWidth * 0.0015003750937734,
        width: screenWidth * 0.0847711927981995,
        height: screenHeight * 0.0398936170212766,
        borderBottomWidth: 1,
        borderTopRightRadius: 4,
        borderTopLeftRadius: 4,
        borderColor: "#adadad",
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif',
        flex: 1,
    },
    nameHeadingContainer: {
        width: screenWidth * 0.1522880720180045,
        height: screenHeight * 0.0398936170212766,
        marginTop: screenHeight * 0.0066489361702128,
        alignItems: 'center',
    },
    levelHeadingContainer: {
        width: screenWidth * 0.0847636909227307,
        height: screenHeight * 0.0398936170212766,
        marginTop: screenHeight * 0.0066489361702128,
        alignItems: 'center',
    },
    levelHeadingContainerIOS: {
        width: screenWidth * 0.0997636909227307,
        height: screenHeight * 0.0398936170212766,
        marginTop: screenHeight * 0.0066489361702128,
        alignItems: 'center',
    },
    castingTimeHeadingContainer: {
        width: screenWidth * 0.1222805701425356,
        height: screenHeight * 0.0398936170212766,
        marginTop: screenHeight * 0.0066489361702128,
        alignItems: 'center',
    },
    rangeHeadingContainer: {
        width: screenWidth * 0.0922730682670668,
        height: screenHeight * 0.0398936170212766,
        marginTop: screenHeight * 0.0066489361702128,
        alignItems: 'center',
    },
    componentsHeadingContainer: {
        width: screenWidth * 0.1035258814703676,
        height: screenHeight * 0.0398936170212766,
        marginTop: screenHeight * 0.0066489361702128,
        alignItems: 'center',
    },
    durationHeadingContainer: {
        width: screenWidth * 0.099774943735934,
        height: screenHeight * 0.0398936170212766,
        marginTop: screenHeight * 0.0066489361702128,
        alignItems: 'center',
    },
    descriptionHeadingContainer: {
        width: screenWidth * 0.2123030757689422,
        height: screenHeight * 0.0398936170212766,
        marginTop: screenHeight * 0.0066489361702128,
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
        width: screenWidth * 0.1522880720180045,
        height: screenHeight * 0.0851063829787234,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif'
    },
    levelContainer: {
        marginBottom: screenHeight * 0.0026595744680851,
        marginTop: screenHeight * 0.0026595744680851,
        marginLeft: screenWidth * 0.0015003750937734,
        marginRight: screenWidth * 0.0015003750937734,
        width: screenWidth * 0.0547636909227307,
        height: screenHeight * 0.0851063829787234,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif'
    },
    castingTimeContainer: {
        marginBottom: screenHeight * 0.0026595744680851,
        marginTop: screenHeight * 0.0026595744680851,
        marginLeft: screenWidth * 0.0015003750937734,
        marginRight: screenWidth * 0.0015003750937734,
        width: screenWidth * 0.1222805701425356,
        height: screenHeight * 0.0851063829787234,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif'
    },
    rangeContainer: {
        marginBottom: screenHeight * 0.0026595744680851,
        marginTop: screenHeight * 0.0026595744680851,
        marginLeft: screenWidth * 0.0015003750937734,
        marginRight: screenWidth * 0.0015003750937734,
        width: screenWidth * 0.0922730682670668,
        height: screenHeight * 0.0851063829787234,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif'
    },
    componentsContainer: {
        marginBottom: screenHeight * 0.0026595744680851,
        marginTop: screenHeight * 0.0026595744680851,
        marginLeft: screenWidth * 0.0015003750937734,
        marginRight: screenWidth * 0.0015003750937734,
        width: screenWidth * 0.1035258814703676,
        height: screenHeight * 0.0851063829787234,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif'
    },
    durationContainer: {
        marginBottom: screenHeight * 0.0026595744680851,
        marginTop: screenHeight * 0.0026595744680851,
        marginLeft: screenWidth * 0.0015003750937734,
        marginRight: screenWidth * 0.0015003750937734,
        width: screenWidth * 0.099774943735934,
        height: screenHeight * 0.0851063829787234,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif'
    },
    descriptionContainer: {
        marginBottom: screenHeight * 0.0026595744680851,
        marginTop: screenHeight * 0.0026595744680851,
        marginLeft: screenWidth * 0.0015003750937734,
        marginRight: screenWidth * 0.0015003750937734,
        width: screenWidth * 0.2123030757689422,
        height: screenHeight * 0.0851063829787234,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif'
    },
    surface: {
        elevation: 4,
        marginBottom: screenHeight * 0.0066489361702128,
        marginTop: screenHeight * 0.0066489361702128,
        marginRight: screenWidth * 0.0037509377344336,
        color: "#ffffff",
        marginLeft: screenWidth * 0.0082520630157539,
        width: "98.2%"
    },
    row: {
        flexDirection: 'row',
        marginBottom: screenHeight * 0.0132978723404256,
        marginTop: screenHeight * 0.0132978723404256,
        marginLeft: screenWidth * 0.0075018754688672,
        marginRight: screenWidth * 0.0075018754688672,
    }
})
