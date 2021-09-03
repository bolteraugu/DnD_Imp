import {Dimensions, StyleSheet, Text, TextInput as NativeTextInput, View, Platform, Linking} from "react-native";
import {TextInput, Button, Provider, Portal, Dialog, IconButton} from "react-native-paper";
import React, {useState} from "react";
import {Picker} from "@react-native-picker/picker";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import DropDown from "react-native-paper-dropdown";

global.screenWidth = Dimensions.get("window").width;
global.screenHeight = Dimensions.get("window").height;

export default function AddArmorScreen({navigation}) {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [typeWeb, setTypeWeb] = useState("Light");
    const [cost, setCost] = useState("");
    const [armorClass, setArmorClass] = useState("");
    const [strength, setStrength] = useState("");
    const [stealth, setStealth] = useState("");
    const [weight, setWeight] = useState("");
    const [showDropDown, setShowDropDown] = useState(false);
    const items = [
        {label: "Light", value: "Light"},
        {label: "Medium", value: "Medium"},
        {label: "Heavy", value: "Heavy"}
    ];
    const [helpVisible, setHelpVisible] = useState(false);
    const hideHelpDialog = () => setHelpVisible(false);
    const showHelpDialog = () => setHelpVisible(true);

    global.ShowHelpArmor = () => {
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
                                Type:
                            </Text>
                        </View>
                        {Platform.OS === 'web' ?
                            <Picker
                                selectedValue={typeWeb}
                                onValueChange = {(itemValue, itemIndex) => {setTypeWeb(itemValue)}}
                                style = {styles.iosDropdownStyle}
                            >
                                <Picker.Item label = "Light" value = "Light" key="0" />
                                <Picker.Item label = "Medium" value = "Medium" key="1" />
                                <Picker.Item label = "Heavy" value = "Heavy" key="2" />
                            </Picker>
                            :
                            <View style = {styles.dropdownContainer}>
                                <DropDown
                                    label={"Select Armor..."}
                                    list={items}
                                    visible={showDropDown}
                                    showDropDown={() => setShowDropDown(true)}
                                    onDismiss={() => setShowDropDown(false)}
                                    dropDownStyle={Platform.OS === 'ios' ? styles.shareDropdownIOS : styles.shareDropdown}
                                    setValue={setType}
                                    value={type}
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
                                Cost:
                            </Text>
                        </View>
                        <TextInput
                            style={styles.inputContainer}
                            placeholder={"Enter cost..."}
                            onChangeText={(text) => {
                                setCost(text)
                            }}
                        />
                    </View>
                    <View style = {styles.row}>
                        <View style = {styles.headingContainer}>
                            <Text
                                style={styles.typeLabel}
                            >
                                Armor Class:
                            </Text>
                        </View>
                        <TextInput
                            style={styles.inputContainer}
                            placeholder={"Enter armor class..."}
                            onChangeText={(text) => {
                                setArmorClass(text)
                            }}
                        />
                    </View>
                    <View style = {styles.row}>
                        <View style = {styles.headingContainer}>
                            <Text
                                style={styles.typeLabel}
                            >
                                Strength:
                            </Text>
                        </View>
                        <TextInput
                            style={styles.inputContainer}
                            placeholder={"Enter strength..."}
                            onChangeText={(text) => {
                                setStrength(text)
                            }}
                        />
                    </View>
                    <View style = {styles.row}>
                        <View style = {styles.headingContainer}>
                            <Text
                                style={styles.typeLabel}
                            >
                                Stealth:
                            </Text>
                        </View>
                        <TextInput
                            style={styles.inputContainer}
                            placeholder={"Enter stealth..."}
                            onChangeText={(text) => {
                                setStealth(text)
                            }}
                        />
                    </View>
                    <View style = {styles.row}>
                        <View style = {styles.headingContainer}>
                            <Text
                                style={styles.typeLabel}
                            >
                                Weight:
                            </Text>
                        </View>
                        <TextInput
                            style={styles.inputContainer}
                            placeholder={"Enter weight..."}
                            onChangeText={(text) => {
                                setWeight(text)
                            }}
                        />
                    </View>
                </View>
                <Button
                    mode = "contained"
                    style = {styles.addButton}
                    disabled={Platform.OS === 'web' ? (name.length === 0 || typeWeb.length === 0) : (name.length === 0 || type.length === 0)}
                    onPress = {() => {
                        if (Platform.OS === 'web') {
                            global.charaRef.collection("armor").add({
                                name: name,
                                type: typeWeb,
                                cost: cost,
                                strength: strength,
                                stealth: stealth,
                                armor_class: armorClass,
                                weight: weight,
                            }).then(() => {
                                navigation.navigate('CharacterSheet', {
                                    screen: 'Inventory'
                                })
                            })
                        }
                        else {
                            global.charaRef.collection("armor").add({
                                name: name,
                                type: type,
                                cost: cost,
                                strength: strength,
                                stealth: stealth,
                                armor_class: armorClass,
                                weight: weight,
                            }).then(() => {
                                navigation.navigate('CharacterSheet', {
                                    screen: 'Inventory'
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
                                Add Armor Screen Help
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
                                - In this screen you can create and add armor to the character you are editing.{'\n\n'}

                                - The required field for the armor is the name field and the type field (indicated by the red asterisks).
                                {'\n\n'}

                                - There is no limit to the number of armor you can create.{'\n\n'}

                                - When you add armor to a character, the addition will be applied for all players who have access to the character.{'\n\n'}

                                - The armor fields are based on information found in the <Text style = {{color: "#3d39e6"}} onPress={() => Linking.openURL('https://media.wizards.com/2016/downloads/DND/SRD-OGL_V5.1.pdf')}>5.1 Systems Reference Document.</Text>
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
    shareDropdown: {
        marginTop: screenHeight * -0.020363829787234,
    },
    shareDropdownIOS: {
        marginTop: screenHeight * -0.00463829787234,
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
    iosDropdownStyle: {
        width: screenWidth * 0.3345843960990248,
        height: screenHeight * 0.0598404255319149,
        marginBottom: screenHeight * 0.033,
        flex: 1,
        color: "#787878"
    },
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
    headingContainerIOS: {
        width: screenWidth * 0.1275318829707427,
        height: screenHeight * 0.0398936170212766,
        marginBottom: screenHeight * 0.0096489361702128,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: screenHeight * -0.004968085106383
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
        marginTop: screenHeight * 0.0691914893617021,
    },
    row: {
        flexDirection: 'row',
    }
})
