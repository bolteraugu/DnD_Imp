import {Dimensions, Linking, Platform, StyleSheet, Text, TextInput as NativeTextInput, View} from "react-native";
import {TextInput, Button, Portal, Dialog, IconButton, Provider} from "react-native-paper";
import React, {useState} from "react";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

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
    const [helpVisible, setHelpVisible] = useState(false);
    const hideHelpDialog = () => setHelpVisible(false);
    const showHelpDialog = () => setHelpVisible(true);

    global.ShowHelpPossession = () => {
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
                                                    height: screenHeight * 0.2659574468085106,
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
                                Add Possession Screen Help
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
                                - In this screen you can create and add a possession to the character you are editing.{'\n\n'}

                                - The required field for the possession is the name field (indicated by the red asterisk).
                                {'\n\n'}

                                - There is no limit to the number of possessions you can create.{'\n\n'}

                                - When you add a possession to a character, the addition will be applied for all players who have access to the character.{'\n\n'}

                                - The possession fields are based on information found in the <Text style = {{color: "#3d39e6"}} onPress={() => Linking.openURL('https://media.wizards.com/2016/downloads/DND/SRD-OGL_V5.1.pdf')}>5.1 Systems Reference Document.</Text>
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
