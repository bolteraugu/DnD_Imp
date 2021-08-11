import {Text, TextInput} from "react-native-paper";
import React, {useEffect, useState} from "react"
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {View, StyleSheet, TextInput as NativeTextInput, Dimensions, Keyboard, TouchableOpacity} from "react-native";
import colors from "../utils/colors";

global.screenWidth = Dimensions.get("window").width;
global.screenHeight = Dimensions.get("window").height;

export default function BiographyScreen({route, navigation}) {
    const [charData, setCharData] = useState(global.charaData);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', e => {
            setLoading(true)
            getCharacter();
            if (loading) {
                setLoading(false);
            }
        });
        return unsubscribe;
    }, [])

    function getCharacter() {
        global.charaRef.onSnapshot( (snapshot) => {
            setCharData(snapshot.data())
        });
    }

    function updateCharacterLocal(fieldName, text, isNumber) {
        let tempCharData = JSON.parse(JSON.stringify(charData));
        tempCharData[fieldName] = isNumber ? Number(text) : text;
        setCharData(tempCharData);
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
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => Keyboard.dismiss()}
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
                                value = {charData["personality_traits"]}
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
                                        placeholder={"Enter personality traits..."}
                                    />
                                )}
                                onChangeText={(text) => {
                                    updateCharacterLocal('personality_traits', text, false);
                                }}
                                onBlur = {() => {
                                    updateCharacter('personality_traits', charData["personality_traits"]);
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
                                multiline={true}
                                value = {charData["ideals"]}
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
                                        placeholder={"Enter ideals..."}
                                    />
                                )}
                                onChangeText={(text) => {
                                    updateCharacterLocal('ideals', text, false);
                                }}
                                onBlur = {() => {
                                    updateCharacter('ideals', charData["ideals"]);
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
                                value = {charData["bonds"]}
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
                                        placeholder={"Enter bonds..."}
                                    />
                                )}
                                onChangeText={(text) => {
                                    updateCharacterLocal('bonds', text, false);
                                }}
                                onBlur = {() => {
                                    updateCharacter('bonds', charData["bonds"]);
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
                                value = {charData["flaws"]}
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
                                        placeholder={"Enter flaws..."}
                                    />
                                )}
                                onChangeText={(text) => {
                                    updateCharacterLocal('flaws', text, false);
                                }}
                                onBlur = {() => {
                                    updateCharacter('flaws', charData["flaws"]);
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
                            value = {charData["features_and_traits"]}
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
                                    placeholder={"Enter features & traits..."}
                                />
                            )}
                            onChangeText={(text) => {
                                updateCharacterLocal('features_and_traits', text, false);
                            }}
                            onBlur = {() => {
                                updateCharacter('features_and_traits', charData["features_and_traits"]);
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
                            value = {charData["appearance"]}
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
                                    placeholder={"Enter character appearance..."}
                                />
                            )}
                            onChangeText={(text) => {
                                updateCharacterLocal('appearance', text, false);
                            }}
                            onBlur = {() => {
                                updateCharacter('appearance', charData["appearance"]);
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
                            defaultValue = {charData["backstory"]}
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
                                    placeholder={"Enter character backstory..."}
                                />
                            )}
                            onChangeText={(text) => {
                                updateCharacterLocal('backstory', text, false);
                            }}
                            onBlur = {() => {
                                updateCharacter('backstory', charData["backstory"]);
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
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    totalContainer: {
        flexDirection: 'row'
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
        marginTop: screenHeight * 0.0348936170212766,
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

