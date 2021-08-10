import {Text, TextInput} from "react-native-paper";
import React, {useEffect, useState} from "react"
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {View, StyleSheet, TextInput as NativeTextInput, Dimensions} from "react-native";
import colors from "../utils/colors";

global.screenWidth = Dimensions.get("window").width;
global.screenHeight = Dimensions.get("window").height;

export default function BiographyScreen({route}) {
    const [charData, setCharData] = useState(global.charaData);

    useEffect(() => {
        getCharacter();
    }, [])

    function getCharacter() {
        global.charaRef.onSnapshot( (snapshot) => {
            setCharData(snapshot.data())
        });
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
        <View style = {styles.totalContainer}>
            <View style = {styles.side}>
                <View style = {styles.corner}>
                    <View style = {styles.personalityTraitsIdealsContainer}>
                        <View style = {styles.personalityTraitsContainer}>
                            <TextInput
                                style = {styles.personalityTraitsInput}
                                underlineColor="transparent"
                                multiline={true}
                                defaultValue = {charData["personality_traits"]}
                                render={props => (
                                    <NativeTextInput
                                        {...props}
                                        style={[
                                            props.style,
                                            props.multiline
                                                ? {
                                                    paddingTop: 30,
                                                    paddingLeft: 25,
                                                    paddingRight: 25,
                                                    paddingBottom: 8,
                                                    height: 100,
                                                }
                                                : null,
                                        ]}
                                        placeholder={"Enter personality traits..."}
                                    />
                                )}
                                onChangeText = {(text) => {
                                    updateCharacter('personality_traits', text);
                                    getCharacter()
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
                                defaultValue = {charData["ideals"]}
                                render={props => (
                                    <NativeTextInput
                                        {...props}
                                        style={[
                                            props.style,
                                            props.multiline
                                                ? {
                                                    paddingTop: 30,
                                                    paddingLeft: 25,
                                                    paddingRight: 25,
                                                    paddingBottom: 8,
                                                    height: 100,
                                                }
                                                : null,
                                        ]}
                                        placeholder={"Enter ideals..."}
                                    />
                                )}
                                onChangeText = {(text) => {
                                    updateCharacter('ideals', text);
                                    getCharacter()
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
                                defaultValue = {charData["bonds"]}
                                render={props => (
                                    <NativeTextInput
                                        {...props}
                                        style={[
                                            props.style,
                                            props.multiline
                                                ? {
                                                    paddingTop: 30,
                                                    paddingLeft: 25,
                                                    paddingRight: 25,
                                                    paddingBottom: 8,
                                                    height: 100,
                                                }
                                                : null,
                                        ]}
                                        placeholder={"Enter bonds..."}
                                    />
                                )}
                                onChangeText = {(text) => {
                                    updateCharacter('bonds', text);
                                    getCharacter()
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
                                defaultValue = {charData["flaws"]}
                                render={props => (
                                    <NativeTextInput
                                        {...props}
                                        style={[
                                            props.style,
                                            props.multiline
                                                ? {
                                                    paddingTop: 30,
                                                    paddingLeft: 25,
                                                    paddingRight: 25,
                                                    paddingBottom: 8,
                                                    height: 100,
                                                }
                                                : null,
                                        ]}
                                        placeholder={"Enter flaws..."}
                                    />
                                )}
                                onChangeText = {(text) => {
                                    updateCharacter('flaws', text);
                                    getCharacter()
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
                            defaultValue = {charData["features_and_traits"]}
                            render={props => (
                                <NativeTextInput
                                    {...props}
                                    style={[
                                        props.style,
                                        props.multiline
                                            ? {
                                                paddingTop: 30,
                                                paddingLeft: 25,
                                                paddingRight: 25,
                                                paddingBottom: 8,
                                                height: 100,
                                            }
                                            : null,
                                    ]}
                                    placeholder={"Enter features & traits..."}
                                />
                            )}
                            onChangeText = {(text) => {
                                updateCharacter('features_and_traits', text);
                                getCharacter()
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
                            defaultValue = {charData["appearance"]}
                            render={props => (
                                <NativeTextInput
                                    {...props}
                                    style={[
                                        props.style,
                                        props.multiline
                                            ? {
                                                paddingTop: 30,
                                                paddingLeft: 25,
                                                paddingRight: 25,
                                                paddingBottom: 8,
                                                height: 100,
                                            }
                                            : null,
                                    ]}
                                    placeholder={"Enter character appearance..."}
                                />
                            )}
                            onChangeText = {(text) => {
                                updateCharacter('appearance', text);
                                getCharacter()
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
                                                paddingTop: 30,
                                                paddingLeft: 25,
                                                paddingRight: 25,
                                                paddingBottom: 8,
                                                height: 100,
                                            }
                                            : null,
                                    ]}
                                    placeholder={"Enter character backstory..."}
                                />
                            )}
                            onChangeText = {(text) => {
                                updateCharacter('backstory', text);
                                getCharacter()
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
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: screenHeight * 0.0033244680851064,
        width: "97%",
        height: "100%"
    },
    backstoryContainer: {
        marginTop: screenHeight * 0.0033244680851064,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        width: "97%",
        height: "100%"
    },
    featuresAndTraitsContainer: {
        margin: 10,
        marginTop: 30,
        width: "98.5%",
        height: "100%"
    },
    personalityTraitsIdealsContainer: {
        flexDirection: 'row',
        width: "98.5%",
        marginBottom: screenHeight * 0.0066489361702128,
        marginRight: 5,
        marginTop: 10,
        marginLeft: 10
    },
    bondsFlawsContainer: {
        flexDirection: 'row',
        width: "98.5%",
        marginTop: screenHeight * 0.0066489361702128,
        marginLeft: 10,
        marginBottom: screenHeight * 0.0066489361702128,
        marginRight: 5,
    },
    personalityTraitsContainer: {
        flex: 1,
        marginRight: 5
    },
    personalityTraitsInput: {
        width: "100%",
        height: 149,
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
        marginLeft: 5
    },
    idealsInput: {
        width: "100%",
        height: 149,
        borderWidth: 1,
        backgroundColor: "#e8e8e8",
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
    },
    bondsInput: {
        width: "100%",
        height: 159,
        borderWidth: 1,
        backgroundColor: "#e8e8e8",
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
    },
    flawsInput: {
        width: "100%",
        height: 159,
        borderWidth: 1,
        backgroundColor: "#e8e8e8",
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
    },
    appearanceInput: {
        width: "100%",
        height: 199,
        borderWidth: 1,
        backgroundColor: "#e8e8e8",
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
    },
    backstoryInput: {
        width: "100%",
        height: 390,
        borderWidth: 1,
        backgroundColor: "#e8e8e8",
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
    },
    featuresAndTraitsInput: {
        width: "100%",
        height: screenHeight * 0.3577127659574468,
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
        top: screenHeight * 0.0066489361702128
    },
})
