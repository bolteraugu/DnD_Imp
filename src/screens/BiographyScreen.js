import {Dialog, IconButton, Portal, Provider, Text, TextInput} from "react-native-paper";
import React, {useContext, useEffect, useState} from "react"
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {
    View,
    StyleSheet,
    TextInput as NativeTextInput,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView, Keyboard
} from "react-native";
import colors from "../utils/colors";
import {AuthUserContext} from "../navigation/AuthUserProvider";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

global.screenWidth = Dimensions.get("window").width;
global.screenHeight = Dimensions.get("window").height;

export default function BiographyScreen({navigation}) {
    const [loading, setLoading] = useState(true);
    const [character, setCharacter] = useState(global.character);
    const pushChange = global.onFSChange
    const {user} = useContext(AuthUserContext);
    const [helpVisible, setHelpVisible] = useState(false);
    const hideHelpDialog = () => setHelpVisible(false);
    const showHelpDialog = () => setHelpVisible(true);

    global.ShowHelpCharacterSheet = () => {
        Keyboard.dismiss();
        showHelpDialog();
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('tabPress', e => {
            // Prevent default behavior
            console.log('test');
            navigation.jumpTo('Biography');
            // Do something manually
            // ...
        });

        return unsubscribe;
    })

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', e => {
            setLoading(true)
            global.charaRef.onSnapshot((snapshot) => {
                setCharacter(snapshot.data())
            })
            if (loading) {
                setLoading(false);
            }
        });
        return unsubscribe;
    }, [])

    function updateCharacterLocal(fieldName, text, isNumber) {
        let tempCharacter = JSON.parse(JSON.stringify(character));
        tempCharacter[fieldName] = isNumber ? Number(text) : text;
        setCharacter(tempCharacter);
    }

    function updateCharacter(fieldName, value) {
        if (fieldName === 'personality_traits') {
            global.charaRef
                .update({
                    personality_traits: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'ideals') {
            global.charaRef
                .update({
                    ideals: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'bonds') {
            global.charaRef
                .update({
                    bonds: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'flaws') {
            global.charaRef
                .update({
                    flaws: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'features_and_traits') {
            global.charaRef
                .update({
                    features_and_traits: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'appearance') {
            global.charaRef
                .update({
                    appearance: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
        else if (fieldName === 'backstory') {
            global.charaRef
                .update({
                    backstory: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
    }

    return (
            <Provider>
                <KeyboardAwareScrollView>
                <View
                    style = {styles.totalContainer}
                >
                    <View style = {styles.side}>
                        <View style = {styles.corner}>
                            <View style = {styles.personalityTraitsIdealsContainer}>
                                <View style = {styles.personalityTraitsContainer}>
                                    <TextInput
                                        style = {styles.personalityTraitsInput}
                                        underlineColor="transparent"
                                        multiline={true}
                                        editable={global.isDM || character.assignedTo === user.toJSON().email}
                                        value = {character.personality_traits}
                                        render={props => (
                                            <NativeTextInput
                                                {...props}
                                                style={[
                                                    props.style,
                                                    props.multiline
                                                        ? {
                                                            paddingTop: screenHeight * 0.0398936170212766,
                                                            paddingLeft: screenWidth * 0.018754688672168,
                                                            paddingRight: screenWidth * 0.018754688672168,
                                                            paddingBottom: screenHeight * 0.0106382978723404,
                                                            height: screenHeight * 0.1329787234042553,
                                                        }
                                                        : null,
                                                ]}
                                                editable={global.isDM || character.assignedTo === user.toJSON().email}
                                                placeholder={"Enter personality traits..."}
                                            />
                                        )}
                                        onChangeText={(text) => {
                                            pushChange(global.index, 'personality_traits', text);
                                            updateCharacterLocal('personality_traits', text);
                                            updateCharacter('personality_traits', text);
                                        }}
                                    />
                                    <Text
                                        style = {styles.personalityTraitsHeading}
                                    >
                                        Personality Traits
                                    </Text>
                                </View>
                                <View style = {styles.idealsContainer}>
                                    <TextInput
                                        style = {styles.idealsInput}
                                        underlineColor="transparent"
                                        editable={global.isDM || character.assignedTo === user.toJSON().email}
                                        multiline={true}
                                        value = {character.ideals}
                                        render={props => (
                                            <NativeTextInput
                                                {...props}
                                                style={[
                                                    props.style,
                                                    props.multiline
                                                        ? {
                                                            paddingTop: screenHeight * 0.0398936170212766,
                                                            paddingLeft: screenWidth * 0.018754688672168,
                                                            paddingRight: screenWidth * 0.018754688672168,
                                                            paddingBottom: screenHeight * 0.0106382978723404,
                                                            height: screenHeight * 0.1329787234042553,
                                                        }
                                                        : null,
                                                ]}
                                                editable={global.isDM || character.assignedTo === user.toJSON().email}
                                                placeholder={"Enter ideals..."}
                                            />
                                        )}
                                        onChangeText={(text) => {
                                            pushChange(global.index, 'ideals', text);
                                            updateCharacterLocal('ideals', text);
                                            updateCharacter('ideals', text);
                                        }}
                                    />
                                    <Text
                                        style = {styles.idealsHeading}
                                    >
                                        Ideals
                                    </Text>
                                </View>
                            </View>
                            <View style = {styles.bondsFlawsContainer}>
                                <View style = {styles.personalityTraitsContainer}>
                                    <TextInput
                                        style = {styles.bondsInput}
                                        underlineColor="transparent"
                                        multiline={true}
                                        editable={global.isDM || character.assignedTo === user.toJSON().email}
                                        value = {character.bonds}
                                        render={props => (
                                            <NativeTextInput
                                                {...props}
                                                style={[
                                                    props.style,
                                                    props.multiline
                                                        ? {
                                                            paddingTop: screenHeight * 0.0398936170212766,
                                                            paddingLeft: screenWidth * 0.018754688672168,
                                                            paddingRight: screenWidth * 0.018754688672168,
                                                            paddingBottom: screenHeight * 0.0106382978723404,
                                                            height: screenHeight * 0.1329787234042553,
                                                        }
                                                        : null,
                                                ]}
                                                editable={global.isDM || character.assignedTo === user.toJSON().email}
                                                placeholder={"Enter bonds..."}
                                            />
                                        )}
                                        onChangeText={(text) => {
                                            pushChange(global.index, 'bonds', text);
                                            updateCharacterLocal('bonds', text);
                                            updateCharacter('bonds', text);
                                        }}
                                    />
                                    <Text
                                        style = {styles.personalityTraitsHeading}
                                    >
                                        Bonds
                                    </Text>
                                </View>
                                <View style = {styles.idealsContainer}>
                                    <TextInput
                                        style = {styles.flawsInput}
                                        underlineColor="transparent"
                                        multiline={true}
                                        editable={global.isDM || character.assignedTo === user.toJSON().email}
                                        value = {character.flaws}
                                        render={props => (
                                            <NativeTextInput
                                                {...props}
                                                style={[
                                                    props.style,
                                                    props.multiline
                                                        ? {
                                                            paddingTop: screenHeight * 0.0398936170212766,
                                                            paddingLeft: screenWidth * 0.018754688672168,
                                                            paddingRight: screenWidth * 0.018754688672168,
                                                            paddingBottom: screenHeight * 0.0106382978723404,
                                                            height: screenHeight * 0.1329787234042553,
                                                        }
                                                        : null,
                                                ]}
                                                editable={global.isDM || character.assignedTo === user.toJSON().email}
                                                placeholder={"Enter flaws..."}
                                            />
                                        )}
                                        onChangeText={(text) => {
                                            pushChange(global.index, 'flaws', text);
                                            updateCharacterLocal('flaws', text);
                                            updateCharacter('flaws', text);
                                        }}
                                    />
                                    <Text
                                        style = {styles.idealsHeading}
                                    >
                                        Flaws
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style = {styles.corner}>
                            <View style = {styles.featuresAndTraitsContainer}>
                                <TextInput
                                    style = {styles.featuresAndTraitsInput}
                                    underlineColor="transparent"
                                    multiline={true}
                                    editable={global.isDM || character.assignedTo === user.toJSON().email}
                                    value = {character.features_and_traits}
                                    render={props => (
                                        <NativeTextInput
                                            {...props}
                                            style={[
                                                props.style,
                                                props.multiline
                                                    ? {
                                                        paddingTop: screenHeight * 0.0398936170212766,
                                                        paddingLeft: screenWidth * 0.018754688672168,
                                                        paddingRight: screenWidth * 0.018754688672168,
                                                        paddingBottom: screenHeight * 0.0106382978723404,
                                                        height: screenHeight * 0.1329787234042553,
                                                    }
                                                    : null,
                                            ]}
                                            editable={global.isDM || character.assignedTo === user.toJSON().email}
                                            placeholder={"Enter features & traits..."}
                                        />
                                    )}
                                    onChangeText={(text) => {
                                        pushChange(global.index, 'features_and_traits', text);
                                        updateCharacterLocal('features_and_traits', text);
                                        updateCharacter('features_and_traits', text);
                                    }}
                                />
                                <Text
                                    style = {styles.idealsHeading}
                                >
                                    Features & Traits
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style = {styles.side}>
                        <View style = {styles.topRightCorner}>
                            <View style = {styles.appearanceContainer}>
                                <TextInput
                                    style = {styles.appearanceInput}
                                    underlineColor="transparent"
                                    multiline={true}
                                    editable={global.isDM || character.assignedTo === user.toJSON().email}
                                    value = {character.appearance}
                                    render={props => (
                                        <NativeTextInput
                                            {...props}
                                            style={[
                                                props.style,
                                                props.multiline
                                                    ? {
                                                        paddingTop: screenHeight * 0.0398936170212766,
                                                        paddingLeft: screenWidth * 0.018754688672168,
                                                        paddingRight: screenWidth * 0.018754688672168,
                                                        paddingBottom: screenHeight * 0.0106382978723404,
                                                        height: screenHeight * 0.1329787234042553,
                                                    }
                                                    : null,
                                            ]}
                                            editable={global.isDM || character.assignedTo === user.toJSON().email}
                                            placeholder={"Enter character appearance..."}
                                        />
                                    )}
                                    onChangeText={(text) => {
                                        pushChange(global.index, 'appearance', text);
                                        updateCharacterLocal('appearance', text);
                                        updateCharacter('appearance', text);
                                    }}
                                />
                                <Text
                                    style = {styles.idealsHeading}
                                >
                                    Character Appearance
                                </Text>
                            </View>
                        </View>
                        <View style = {styles.bottomRightCorner}>
                            <View style = {styles.backstoryContainer}>
                                <TextInput
                                    style = {styles.backstoryInput}
                                    underlineColor="transparent"
                                    multiline={true}
                                    editable={global.isDM || character.assignedTo === user.toJSON().email}
                                    value = {character.backstory}
                                    render={props => (
                                        <NativeTextInput
                                            {...props}
                                            style={[
                                                props.style,
                                                props.multiline
                                                    ? {
                                                        paddingTop: screenHeight * 0.0398936170212766,
                                                        paddingLeft: screenWidth * 0.018754688672168,
                                                        paddingRight: screenWidth * 0.018754688672168,
                                                        paddingBottom: screenHeight * 0.0106382978723404,
                                                        height: screenHeight * 0.1329787234042553,
                                                    }
                                                    : null,
                                            ]}
                                            editable={global.isDM || character.assignedTo === user.toJSON().email}
                                            placeholder={"Enter character backstory..."}
                                        />
                                    )}
                                    onChangeText={(text) => {
                                        pushChange(global.index, 'backstory', text);
                                        updateCharacterLocal('backstory', text);
                                        updateCharacter('backstory', text);
                                    }}
                                />
                                <Text
                                    style = {styles.idealsHeading}
                                >
                                    Character Backstory
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <Portal>
                    <Dialog
                        visible={helpVisible}
                        onDismiss={hideHelpDialog}
                        style={styles.helpWindow}
                    >
                        <View style = {{alignSelf: 'center'}}>
                            <Dialog.Title
                                style={styles.helpTitleWindow}
                            >
                                Full Character Sheet Screen Help
                            </Dialog.Title>
                        </View>
                        <IconButton
                            icon="close" //Getting the back icon image
                            size={36} //Setting the size
                            color="#a60000" //And the color
                            style = {styles.exitButtonHelp}
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
                                In this screen you can view and edit the full details of a character. The details have been categorised into four tabs.{"\n"}
                                - Main, containing the core, most frequently accessed, information. {"\n"}
                                - Biography containing biographical, non-numeric characteristics. {"\n"}
                                - Inventory containing currency, weapons, armor and possessions. {'\n'}
                                - Spells containing spell characteristics, spell slots and spells.  {'\n\n'}

                                In the main tab you can change the character's image by clicking on the 'Change Image' button which will take you to the 'Image Selector'
                                screen where you can upload and use a new image or use one you have uploaded in the past.{'\n\n'}

                                In the inventory tab you can add new weapons, armor and possessions by using the associated add buttons and in the spells tab you can add
                                spells the same way.{'\n\n'}

                                Edits made to a character in this screen will be reflected in the overview of the character in the Groups screen and vice-versa.{'\n\n'}
                                Edits made to a character in this screen and the 'Groups' screen will be applied for all players who have access to the character.
                            </Text>
                        </Dialog.Content>
                    </Dialog>
                </Portal>
        </KeyboardAwareScrollView>
            </Provider>
    );
}

const styles = StyleSheet.create({
    exitButtonHelp: {
        left: screenWidth * 0.635,
        top: screenHeight * -0.02,
        position: 'absolute'
    },
    helpWindow: {
        width: screenWidth * 0.675,
        alignSelf: 'center',
        marginTop: screenHeight * -0.0463829787234
    },
    helpTitleWindow: {
        alignSelf: 'center',
        textAlign: 'center'
    },
    helpTextBold: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: screenHeight * 0.02
    },
    totalContainer: {
        flexDirection: 'row',
    },
    side: {
        flexDirection: 'column',
        height: "100%",
        width: "50%"
    },
    corner: {
        width: "100%",
        height: "50%",
        flexDirection: 'column'
    },
    topRightCorner: {
        width: "100%",
        height: "35%",
    },
    bottomRightCorner: {
        width: "100%",
        height: "65%",
    },
    appearanceContainer: {
        marginTop: screenHeight * 0.0132978723404255,
        marginLeft: screenWidth * 0.0075018754688672,
        marginRight: screenWidth * 0.0075018754688672,
        marginBottom: screenHeight * 0.0033244680851064,
        width: "97%",
        height: "100%"
    },
    backstoryContainer: {
        marginTop: screenHeight * 0.0033244680851064,
        marginLeft: screenWidth * 0.0075018754688672,
        marginRight: screenWidth * 0.0075018754688672,
        marginBottom: screenHeight * 0.0075018754688672,
        width: "97%",
        height: "100%"
    },
    featuresAndTraitsContainer: {
        marginBottom: screenHeight * 0.0075018754688672,
        marginLeft: screenWidth * 0.0075018754688672,
        marginRight: screenWidth * 0.0075018754688672,
        marginTop: screenHeight * 0.0316936170212766,
        width: "98.5%",
        height: "100%"
    },
    personalityTraitsIdealsContainer: {
        flexDirection: 'row',
        width: "98.5%",
        marginBottom: screenHeight * 0.0066489361702128,
        marginRight: screenWidth * 0.0037509377344336,
        marginTop: screenHeight * 0.0132978723404255,
        marginLeft: screenWidth * 0.0075018754688672
    },
    bondsFlawsContainer: {
        flexDirection: 'row',
        width: "98.5%",
        marginTop: screenHeight * 0.0066489361702128,
        marginLeft: screenWidth * 0.0075018754688672,
        marginBottom: screenHeight * 0.0066489361702128,
        marginRight: screenWidth * 0.0037509377344336,
    },
    personalityTraitsContainer: {
        flex: 1,
        marginRight: screenWidth * 0.0037509377344336
    },
    personalityTraitsInput: {
        width: "100%",
        height: screenHeight * 0.2,
        borderWidth: 1,
        backgroundColor: "#e8e8e8",
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
    },
    personalityTraitsHeading: {
        width: "100%",
        textAlign: "center",
        color: "#0038d4",
        position: 'absolute',
        top: screenHeight * 0.0066489361702128
    },
    idealsContainer: {
        flex: 1,
        marginLeft: screenWidth * 0.0037509377344336
    },
    idealsInput: {
        width: "100%",
        height: screenHeight * 0.2,
        borderWidth: 1,
        backgroundColor: "#e8e8e8",
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
    },
    bondsInput: {
        width: "100%",
        height: screenHeight * 0.2,
        borderWidth: 1,
        backgroundColor: "#e8e8e8",
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
    },
    flawsInput: {
        width: "100%",
        height: screenHeight * 0.2,
        borderWidth: 1,
        backgroundColor: "#e8e8e8",
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
    },
    appearanceInput: {
        width: "100%",
        height: screenHeight * 0.2646276595744681,
        borderWidth: 1,
        backgroundColor: "#e8e8e8",
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
    },
    backstoryInput: {
        width: "100%",
        height: screenHeight * 0.5171170212765957,
        borderWidth: 1,
        backgroundColor: "#e8e8e8",
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
    },
    featuresAndTraitsInput: {
        width: "100%",
        height: screenHeight * 0.3626127659574468,
        borderWidth: 1,
        backgroundColor: "#e8e8e8",
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
    },
    idealsHeading: {
        width: "100%",
        textAlign: "center",
        color: "#0038d4",
        position: 'absolute',
        top: 5
    },
})

