import {IconButton, TextInput, Button} from "react-native-paper";
import React, {useContext, useState} from "react";
import {Surface} from "react-native-paper";
import {Dimensions, StyleSheet, Text, TextInput as NativeTextInput, View, Platform, ActionSheetIOS} from "react-native";
import {Picker} from "@react-native-picker/picker";
import {AuthUserContext} from "../navigation/AuthUserProvider";
import ModalSelector from 'react-native-modal-selector'

global.screenWidth = Dimensions.get("window").width;
global.screenHeight = Dimensions.get("window").height;

export default function Spell({spell, onChange, index, isDM, character}) {
    const {user} = useContext(AuthUserContext);
    let dataIndex = 0;
    const data = [
        { key: dataIndex++, label: 'Cantrip' },
        { key: dataIndex++, label: '1' },
        { key: dataIndex++, label: '2'},
        { key: dataIndex++, label: '3'},
        { key: dataIndex++, label: '4' },
        { key: dataIndex++, label: '5'},
        { key: dataIndex++, label: '6'},
        { key: dataIndex++, label: '7' },
        { key: dataIndex++, label: '8'},
        { key: dataIndex++, label: '9'},
    ];

    function updateSpell(field, value) {
        if (field === 'name') {
            global.charaRef.collection('spells').doc(spell._id).get().then((docc) => {
                if (docc.exists) {
                    global.charaRef.collection('spells').doc(spell._id)
                        .update({
                            name: value
                        })
                        .then(console.log('Successfully updated spell'), (error) =>
                            console.log('Failed to update spell: ' + error)
                        );
                }

            })
        }
        else if (field === 'level') {
            global.charaRef.collection('spells').doc(spell._id).get().then((docc) => {
                if (docc.exists) {
                    global.charaRef.collection('spells').doc(spell._id)
                        .update({
                            level: value
                        })
                        .then(console.log('Successfully updated spell'), (error) =>
                            console.log('Failed to update spell: ' + error)
                        );
                }

            })
        }
        else if (field === 'casting_time') {
            global.charaRef.collection('spells').doc(spell._id).get().then((docc) => {
                if (docc.exists) {
                    global.charaRef.collection('spells').doc(spell._id)
                        .update({
                            casting_time: value
                        })
                        .then(console.log('Successfully updated spell'), (error) =>
                            console.log('Failed to update spell: ' + error)
                        );
                }

            })
        }
        else if (field === 'range') {
            global.charaRef.collection('spells').doc(spell._id).get().then((docc) => {
                if (docc.exists) {
                    global.charaRef.collection('spells').doc(spell._id)
                        .update({
                            range: value
                        })
                        .then(console.log('Successfully updated spell'), (error) =>
                            console.log('Failed to update spell: ' + error)
                        );
                }

            })
        }
        else if (field === 'components') {
            global.charaRef.collection('spells').doc(spell._id).get().then((docc) => {
                if (docc.exists) {
                    global.charaRef.collection('spells').doc(spell._id)
                        .update({
                            components: value
                        })
                        .then(console.log('Successfully updated spell'), (error) =>
                            console.log('Failed to update spell: ' + error)
                        );
                }

            })
        }
        else if (field === 'duration') {
            global.charaRef.collection('spells').doc(spell._id).get().then((docc) => {
                if (docc.exists) {
                    global.charaRef.collection('spells').doc(spell._id)
                        .update({
                            duration: value
                        })
                        .then(console.log('Successfully updated spell'), (error) =>
                            console.log('Failed to update spell: ' + error)
                        );
                }

            })
        }
        else if (field === 'description') {
            global.charaRef.collection('spells').doc(spell._id).get().then((docc) => {
                if (docc.exists) {
                    global.charaRef.collection('spells').doc(spell._id)
                        .update({
                            description: value
                        })
                        .then(console.log('Successfully updated spell'), (error) =>
                            console.log('Failed to update spell: ' + error)
                        );
                }

            })
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
            <Surface style={Platform.OS === 'ios' ? styles.surfaceIOS : styles.surface}>
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
                            editable={isDM || character.assignedTo === user.toJSON().email}
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
                        {Platform.OS === 'ios' ?
                            <Button
                                style={styles.typeContainerIOS}
                                onPress={() => {
                                    if (isDM || character.assignedTo === user.toJSON().email) {
                                        ActionSheetIOS.showActionSheetWithOptions(
                                            {
                                                options: ["Cantrip", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
                                                userInterfaceStyle: 'dark',
                                            },
                                            buttonIndex => {
                                                if (buttonIndex === 0) {
                                                    updateSpell('level', "Cantrip")
                                                    onChange(index, 'level', "Cantrip")
                                                } else if (buttonIndex === 1) {
                                                    updateSpell('level', "1")
                                                    onChange(index, 'level', "1")
                                                } else if (buttonIndex === 2) {
                                                    updateSpell('level', "2")
                                                    onChange(index, 'level', "2")
                                                } else if (buttonIndex === 3) {
                                                    updateSpell('level', "3")
                                                    onChange(index, 'level', "3")
                                                } else if (buttonIndex === 4) {
                                                    updateSpell('level', "4")
                                                    onChange(index, 'level', "4")
                                                } else if (buttonIndex === 5) {
                                                    updateSpell('level', "5")
                                                    onChange(index, 'level', "5")
                                                } else if (buttonIndex === 6) {
                                                    updateSpell('level', "6")
                                                    onChange(index, 'level', "6")
                                                } else if (buttonIndex === 7) {
                                                    updateSpell('level', "7")
                                                    onChange(index, 'level', "7")
                                                } else if (buttonIndex === 8) {
                                                    updateSpell('level', "8")
                                                    onChange(index, 'level', "8")
                                                } else if (buttonIndex === 9) {
                                                    updateSpell('level', "9")
                                                    onChange(index, 'level', "9")
                                                }
                                            }
                                        );
                                    }
                                }}
                            >
                                {spell.level}
                            </Button> :
                            Platform.OS === 'web' ?
                                <Picker
                                    selectedValue={spell.level}
                                    enabled={isDM || character.assignedTo === user.toJSON().email}
                                    onValueChange = {(itemValue, itemIndex) => {
                                        updateSpell('level', itemValue);
                                        onChange(index, 'level', itemValue);
                                    }}
                                    style = {styles.totalDropdownStyle}
                                >
                                    <Picker.Item label = "Cantrip" value = "Cantrip" key="0" />
                                    <Picker.Item label = "1" value = "1" key="1" />
                                    <Picker.Item label = "2" value = "2" key="2" />
                                    <Picker.Item label = "3" value = "3" key="3" />
                                    <Picker.Item label = "4" value = "4" key="4" />
                                    <Picker.Item label = "5" value = "5" key="5" />
                                    <Picker.Item label = "6" value = "6" key="6" />
                                    <Picker.Item label = "7" value = "7" key="7" />
                                    <Picker.Item label = "8" value = "8" key="8" />
                                    <Picker.Item label = "9" value = "9" key="9" />
                                </Picker>
                                :
                                <View style = {styles.typeContainer}>
                                    <ModalSelector
                                        data={data}
                                        selectedKey={spell.level === 'Cantrip' ? 0 :
                                            spell.level === '1' ? 1 :
                                                spell.level === '2' ? 2 :
                                                    spell.level === '3' ? 3 :
                                                        spell.level === '4' ? 4 :
                                                            spell.level === '5' ? 5 :
                                                                spell.level === '6' ? 6 :
                                                                    spell.level === '7' ? 7 :
                                                                        spell.level === '8' ? 8 : 9}
                                        initValueTextStyle={{color: "black", paddingTop: screenHeight * 0.012, height: screenHeight * 0.061}}
                                        disabled={!isDM && character.assignedTo !== user.toJSON().email}
                                        style = {{height: screenHeight * 0.0598936170212766}}
                                        initValue={spell.level}
                                        onChange = {(option) => {
                                            updateSpell('level', option.label)
                                            onChange(index, 'level', option.label);
                                        }}
                                    />
                                </View>
                        }
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
                            editable={isDM || character.assignedTo === user.toJSON().email}
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
                            editable={isDM || character.assignedTo === user.toJSON().email}
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
                            editable={isDM || character.assignedTo === user.toJSON().email}
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
                            editable={isDM || character.assignedTo === user.toJSON().email}
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
                            editable={isDM || character.assignedTo === user.toJSON().email}
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
                        disabled={!(isDM || character.assignedTo === user.toJSON().email)}
                        style = {styles.deleteButton}
                        color="#000"
                        onPress={deleteSpell} //delete this character
                    />
                </View>
            </Surface>
        );
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
        width: screenWidth * 0.095711927981995,
        height: screenHeight * 0.0398936170212766,
        borderBottomWidth: 1,
        borderTopRightRadius: 4,
        borderTopLeftRadius: 4,
        borderColor: "#adadad",
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif',
        flex: 1,
    },
    typeContainerIOS: {
        marginBottom: screenHeight * 0.0026595744680851,
        marginTop: screenHeight * 0.0026595744680851,
        paddingTop: screenHeight * 0.0176595744680851,
        marginLeft: screenWidth * 0.0015003750937734,
        marginRight: screenWidth * 0.0015003750937734,
        width: screenWidth * 0.0977711927981995,
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
    surfaceIOS: {
        elevation: 4,
        marginBottom: screenHeight * 0.0066489361702128,
        marginTop: screenHeight * 0.0066489361702128,
        marginRight: screenWidth * 0.0037509377344336,
        color: "#ffffff",
        marginLeft: screenWidth * 0.0082520630157539,
        width: screenWidth * 0.944220630157539,
    },
    row: {
        flexDirection: 'row',
        marginBottom: screenHeight * 0.0132978723404256,
        marginTop: screenHeight * 0.0132978723404256,
        marginLeft: screenWidth * 0.0075018754688672,
        marginRight: screenWidth * 0.0075018754688672,
    }
})
