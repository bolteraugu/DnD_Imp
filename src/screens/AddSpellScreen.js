import {Dimensions, StyleSheet, Text, TextInput as NativeTextInput, View, Platform, Linking} from "react-native";
import {TextInput, Button, Checkbox, Provider, Portal, Dialog, IconButton} from "react-native-paper";
import React, {useEffect, useState} from "react";
import {Picker} from "@react-native-picker/picker";
import firebase from 'firebase';
import 'firebase/firestore';
import DropDown from "react-native-paper-dropdown";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

global.screenWidth = Dimensions.get("window").width;
global.screenHeight = Dimensions.get("window").height;

export default function AddSpellScreen({navigation, route}) {
    const [name, setName] = useState("");
    const [level, setLevel] = useState("");
    const [levelWeb, setLevelWeb] = useState("Cantrip");
    const [castingTime, setCastingTime] = useState("");
    const [range, setRange] = useState("");
    const [components, setComponents] = useState("");
    const [duration, setDuration] = useState("");
    const [description, setDescription] = useState("");
    const [showDropDown, setShowDropDown] = useState(false);
    const items = [
        {label: "Cantrip", value: "Cantrip"},
        {label: "1", value: "1"},
        {label: "2", value: "2"},
        {label: "3", value: "3"},
        {label: "4", value: "4"},
        {label: "5", value: "5"},
        {label: "6", value: "6"},
        {label: "7", value: "7"},
        {label: "8", value: "8"},
        {label: "9", value: "9"},
    ];
    const [helpVisible, setHelpVisible] = useState(false);
    const hideHelpDialog = () => setHelpVisible(false);
    const showHelpDialog = () => setHelpVisible(true);

    global.ShowHelpSpell = () => {
        showHelpDialog();
    };

        return (
            <Provider>
            <KeyboardAwareScrollView>
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
                        <Text
                            style = {Platform.OS === 'web' ? styles.requiredFieldWeb : styles.requiredField}
                        >
                            *
                        </Text>
                    </View>
                    <View style = {styles.row}>
                        <View style = {Platform.OS === 'web' ? styles.dropdownLabelContainerWeb : styles.dropdownLabelContainer}>
                            <Text
                                style={styles.typeLabel}
                            >
                                Level:
                            </Text>
                        </View>
                        {Platform.OS === 'web' ?
                            <Picker
                                selectedValue={levelWeb}
                            onValueChange = {(itemValue, itemIndex) => {setLevelWeb(itemValue)}}
                            style = {styles.iosDropdownStyle}
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
                            <View style = {styles.dropdownContainer}>
                                <DropDown
                                    label={"Select Level..."}
                                    list={items}
                                    visible={showDropDown}
                                    showDropDown={() => setShowDropDown(true)}
                                    onDismiss={() => setShowDropDown(false)}
                                    dropDownStyle={Platform.OS === 'ios' ? styles.shareDropdownIOS : styles.shareDropdown}
                                    setValue={setLevel}
                                    value={level}
                                />
                            </View>
                        }
                        <Text
                            style = {Platform.OS === 'web' ? styles.requiredFieldWeb : styles.requiredField}
                        >
                            *
                        </Text>
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
                    disabled={Platform.OS === 'web' ? (name.length === 0 || levelWeb.length === 0) : (name.length === 0 || level.length === 0)}
                    onPress = {() => {
                        if (Platform.OS === 'web') {
                            global.charaRef.collection("spells").add({
                                name: name,
                                level: levelWeb.toString(),
                                casting_time: castingTime,
                                range: range,
                                components: components,
                                duration: duration,
                                description: description
                            }).then(() => {
                                navigation.navigate('CharacterSheet', {
                                    screen: 'Spells'
                                })
                            })
                        }
                        else {
                            global.charaRef.collection("spells").add({
                                name: name,
                                level: level.toString(),
                                casting_time: castingTime,
                                range: range,
                                components: components,
                                duration: duration,
                                description: description
                            }).then(() => {
                                navigation.navigate('CharacterSheet', {
                                    screen: 'Spells'
                                })
                            })
                        }
                    }}
                >
                    Add
                </Button>
                <View style = {styles.gap}/>
            </View>
                <Portal>
                    <Dialog
                        visible={helpVisible}
                        onDismiss={hideHelpDialog}
                        style={styles.helpWindow}
                    >
                        <View style = {{alignSelf: 'center'}}>
                            <Dialog.Title
                                style={styles.helpTitle}
                            >
                                Add Spell Screen Help
                            </Dialog.Title>
                        </View>
                        <IconButton
                            icon="close" //Getting the back icon image
                            size={36} //Setting the size
                            color="#a60000" //And the color
                            style = {styles.exitButton}
                            onPress={() => {
                                hideHelpDialog()
                            }}
                        />
                        <Dialog.Content>
                            <Text
                                style={styles.helpTextBold}
                            >
                                Please note that this help window is available on every screen by clicking on the help icon in the top right corner. The information shown in this window differs depending on the screen you are on.
                            </Text>
                            <Text>
                                - In this screen you can create and add a spell to the character you are editing.{'\n\n'}

                                - The required fields for the spell is the name field and the level field (indicated by the red asterisks).
                                {'\n\n'}

                                - There is no limit to the number of spells you can create.{'\n\n'}

                                - When you add a spell to a character, the addition will be applied for all players who have access to the character.{'\n\n'}

                                - The spell fields are based on information found in the <Text style = {{color: "#3d39e6"}} onPress={() => Linking.openURL('https://media.wizards.com/2016/downloads/DND/SRD-OGL_V5.1.pdf')}>5.1 Systems Reference Document.</Text>
                            </Text>
                        </Dialog.Content>
                    </Dialog>
                </Portal>
            </KeyboardAwareScrollView>
            </Provider>
        );
}

const styles = StyleSheet.create({
    exitButton: {
        left: screenWidth * 0.625,
        top: screenHeight * -0.02,
        position: 'absolute'
    },
    helpWindow: {
        width: screenWidth * 0.665,
        alignSelf: 'center',
        marginTop: screenHeight * -0.0563829787234
    },
    helpTitle: {
        alignSelf: 'center',
        textAlign: 'center'
    },
    helpTextBold: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: screenHeight * 0.02
    },
    requiredField: {
        color: "red",
        alignSelf: 'center',
        marginTop: screenHeight * -0.02,
        marginLeft: screenWidth * -0.00835,
        left: screenWidth * 0.0125,
        fontSize: 25
    },
    requiredFieldWeb: {
        color: "red",
        alignSelf: 'center',
        marginTop: screenHeight * -0.02,
        marginLeft: screenWidth * -0.0036,
        position: 'absolute',
        left: screenWidth * 0.4775,
        top: screenHeight * 0.035,
        fontSize: 25
    },
    shareDropdown: {
        marginTop: screenHeight * -0.020363829787234,
    },
    shareDropdownIOS: {
        marginTop: screenHeight * -0.00463829787234,
    },
    iosDropdownStyle: {
        width: screenWidth * 0.3345843960990248,
        height: screenHeight * 0.0598404255319149,
        marginBottom: screenHeight * 0.033,
        flex: 1,
        color: "#787878"
    },
    headingContainerIOS: {
        width: screenWidth * 0.1275318829707427,
        height: screenHeight * 0.0398936170212766,
        marginBottom: screenHeight * 0.0096489361702128,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: screenHeight * -0.004968085106383
    },
    totalDropdownStyle: {
        width: screenWidth * 0.3345843960990248,
        height: screenHeight * 0.0598404255319149,
        flex: 1,
        color: "#787878",
    },
    pickSomeones: {
        width: screenWidth * 0.2845843960990248,
        height: screenHeight * 0.0598404255319149,
        color: "#787878",
    },
    pickSomeonesContainer: {
        marginTop: screenHeight * 0.016595744680851,
        marginLeft: screenWidth * 0.15003750937734,
        marginRight: screenWidth * 0.0015003750937734,
        width: screenWidth * 0.2847711927981995,
        height: screenHeight * 0.0598404255319149,
        marginBottom: screenHeight * 0.033244680851064,
        borderBottomWidth: 1,
        borderTopRightRadius: 4,
        borderTopLeftRadius: 4,
        borderColor: "#adadad",
        backgroundColor: "#c9d8ff",
        fontFamily: 'sans-serif',
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
    dropdownContainer: {
        marginTop: screenHeight * 0.0026595744680851,
        marginLeft: screenWidth * 0.0015003750937734,
        marginRight: screenWidth * 0.0015003750937734,
        marginBottom: screenHeight * 0.033244680851064,
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
    dropdownLabelContainer: {
        width: screenWidth * 0.1275318829707427,
        height: screenHeight * 0.0398936170212766,
        marginBottom: screenHeight * 0.0066489361702128,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: screenHeight * 0.0226085106383
    },
    dropdownLabelContainerWeb: {
        width: screenWidth * 0.1275318829707427,
        height: screenHeight * 0.0398936170212766,
        marginBottom: screenHeight * 0.0066489361702128,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: screenHeight * 0.0116085106383
    },
    addButton: {
        width: "17%",
        marginRight: screenWidth * 0.0412603150787697
    },
    totalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
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
        marginBottom: screenHeight * 0.02244680851064,
        height: screenHeight * 0.0598404255319149,
    },
    column: {
        flexDirection: 'column',
        marginBottom: screenHeight * 0.0132978723404256,
        marginLeft: screenWidth * 0.0075018754688672,
        marginRight: screenWidth * 0.0075018754688672,
        marginTop: screenHeight * 0.0291914893617021,
    },
    row: {
        flexDirection: 'row',
    }
})
