import React, {useContext, useEffect, useRef, useState} from 'react';
import {Image, StyleSheet, View, Dimensions, TouchableOpacity, Platform} from 'react-native';
import {IconButton, Surface, TextInput, Text, Dialog, Portal, Button, Provider} from 'react-native-paper';
import 'firebase/firestore';
import firebase from 'firebase';
import 'firebase/auth';
import {AuthUserContext} from "../navigation/AuthUserProvider";
import DropDown from "react-native-paper-dropdown";
// import ModalDropdown from "react-native-modal-dropdown";
// import {AuthUserContext} from "../navigation/AuthUserProvider";

global.screenWidth = Dimensions.get("window").width;
global.screenHeight = Dimensions.get("window").height;

export default function CharacterCard({character, index, onChange, groupRef, navigation, isDM, showImage, userPermissions, showAssign, showConfirmationDialog, updateCanAssign}) {

    const {user} = useContext(AuthUserContext);
    const [items, setItems] = useState([]);
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        let isMounted = false;
        groupRef.onSnapshot((snapshot) => {
            if (isMounted) {
                const itemsTemp = [];
                if (snapshot.get('members') != null) {
                    snapshot.get('members').forEach((mem) => {
                        if (mem !== user.toJSON().email && mem !== character.assignedTo) {
                            itemsTemp.push({
                                value: mem, label: mem
                            });
                        }
                        setItems(itemsTemp);
                    })
                }
            }
        })
        return () => { isMounted = false }
    }, [])

    function updateCharacter() {
        groupRef
            .collection('characters')
            .doc(character._id)
            .update(character)
            .then(console.log('Successfully updated character'), (error) =>
                console.log('Failed to update character: ' + error)
            );
    }

    if (!hidden) {
        return (
            <Surface style={styles.surface}>
                <View style={styles.cardContainer}>
                    <View>
                        {isDM && character.assignedTo != null && character.assignedTo.length !== 0 ?
                            <Text
                                style = {{fontSize: 17, marginTop: screenHeight * 0.01, marginBottom: screenHeight * 0.01, marginLeft: screenWidth * 0.005, marginRight: screenWidth * 0.005}}
                            >
                                Assigned To: {character.assignedTo}
                            </Text>
                            : isDM && character.assignedTo != null && character.assignedTo.length === 0 ?
                                <Text
                                    style = {{fontSize: 17, marginTop: screenHeight * 0.01, marginBottom: screenHeight * 0.01, marginLeft: screenWidth * 0.005, marginRight: screenWidth * 0.005}}
                                >
                                    Unassigned
                                </Text>
                                :
                                null


                        }
                        <View style={styles.cardRow}>
                            <TextInput
                                label="Name"
                                editable={isDM || (character.assignedTo != null && character.assignedTo === user.toJSON().email)}
                                style={styles.stringContainer}
                                value={character.name}
                                placeholder={"Enter name..."}
                                onChangeText={(text) => {
                                    onChange(index, 'name', text);
                                    updateCharacter();
                                }
                                }
                            />
                            <TextInput
                                label="Race"
                                editable={isDM || (character.assignedTo != null && character.assignedTo === user.toJSON().email)}
                                style={styles.stringContainer}
                                value={character.char_race}
                                placeholder={"Enter race..."}
                                onChangeText={
                                    (text) =>  {
                                        onChange(index, 'char_race', text);
                                        updateCharacter();
                                    }
                                }
                            />
                            <TextInput
                                label="Class"
                                editable={isDM || (character.assignedTo != null && character.assignedTo === user.toJSON().email)}
                                style={styles.stringContainer}
                                value={character.char_class}
                                placeholder={"Enter class..."}
                                onChangeText={(text) => {
                                    onChange(index, 'char_class', text);
                                    updateCharacter();
                                }
                                }
                            />
                            <TextInput
                                label="Level"
                                editable={isDM || (character.assignedTo != null && character.assignedTo === user.toJSON().email)}
                                keyboardType="phone-pad"
                                style={styles.levelContainer}
                                value={character.level}
                                onChangeText={(text) => {
                                    onChange(index, 'level', text);
                                    updateCharacter();
                                }
                                }
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                showImage(character.imageName, character.actualImageName)
                            }}
                            style = {isDM ? styles.charImageContainerDM : styles.charImageContainer}
                        >
                            <Image
                                source={{uri: character.imageName}}
                                style = {styles.charImage}
                            />
                        </TouchableOpacity>


                        <View style={styles.cardRow}>
                            <TextInput
                                label="STR"
                                editable={isDM || (character.assignedTo != null && character.assignedTo === user.toJSON().email)}
                                keyboardType="phone-pad"
                                style={styles.abilityScoresContainer}
                                value={character.strength}
                                onChangeText={(text) => {
                                    onChange(index, 'strength', text);
                                    updateCharacter();
                                }
                                }
                            />
                            <TextInput
                                label="CON"
                                editable={isDM || (character.assignedTo != null && character.assignedTo === user.toJSON().email)}
                                keyboardType="phone-pad"
                                style={styles.abilityScoresContainer}
                                value={character.constitution}
                                onChangeText={(text) => {
                                    onChange(index, 'constitution', text);
                                    updateCharacter();
                                }
                                }
                            />
                            <TextInput
                                label="DEX"
                                editable={isDM || (character.assignedTo != null && character.assignedTo === user.toJSON().email)}
                                keyboardType="phone-pad"
                                style={styles.abilityScoresContainer}
                                value={character.dexterity}
                                onChangeText={(text) => {
                                    onChange(index, 'dexterity', text);
                                    updateCharacter();
                                }
                                }
                            />
                            <TextInput
                                label="INT"
                                editable={isDM || (character.assignedTo != null && character.assignedTo === user.toJSON().email)}
                                keyboardType="phone-pad"
                                style={styles.abilityScoresContainer}
                                value={character.intelligence}
                                onChangeText={(text) => {
                                    onChange(index, 'intelligence', text);
                                    updateCharacter();
                                }
                                }
                            />
                            <TextInput
                                label="WIS"
                                editable={isDM || (character.assignedTo != null && character.assignedTo === user.toJSON().email)}
                                keyboardType="phone-pad"
                                style={styles.abilityScoresContainer}
                                value={character.wisdom}
                                onChangeText={(text) => {
                                    onChange(index, 'wisdom', text);
                                    updateCharacter();
                                }
                                }
                            />
                            <TextInput
                                label="CHA"
                                editable={isDM || (character.assignedTo != null && character.assignedTo === user.toJSON().email)}
                                keyboardType="phone-pad"
                                style={styles.abilityScoresContainer}
                                value={character.charisma}
                                onChangeText={(text) => {
                                    onChange(index, 'charisma', text);
                                    updateCharacter();
                                }
                                }
                            />
                            <TextInput
                                label="PROF"
                                editable={isDM || (character.assignedTo != null && character.assignedTo === user.toJSON().email)}
                                keyboardType="phone-pad"
                                style={styles.abilityScoresContainer}
                                value={character.proficiency}
                                onChangeText={(text) => {
                                    onChange(index, 'proficiency', text);
                                    updateCharacter();
                                }
                                }
                            />
                            <TextInput
                                label="INIT"
                                editable={isDM || (character.assignedTo != null && character.assignedTo === user.toJSON().email)}
                                keyboardType="phone-pad"
                                style={styles.abilityScoresContainer}
                                value={character.initiative}
                                onChangeText={(text) => {
                                    onChange(index, 'initiative', text);
                                    updateCharacter();
                                }
                                }
                            />
                        </View>
                    </View>
                    <View style={styles.cardRow}>
                        <TextInput
                            label="Alignment"
                            editable={isDM || (character.assignedTo != null && character.assignedTo === user.toJSON().email)}
                            style={styles.stringContainer}
                            placeholder={"Enter alignment..."}
                            value={character.alignment}
                            onChangeText={(text) => {
                                onChange(index, 'alignment', text);
                                updateCharacter();
                            }
                            }
                        />
                        <TextInput
                            label="Max HP"
                            editable={isDM || (character.assignedTo != null && character.assignedTo === user.toJSON().email)}
                            keyboardType="phone-pad"
                            style={styles.intContainer}
                            value={character.max_hp}
                            onChangeText={(text) => {
                                onChange(index, 'max_hp', text);
                                updateCharacter();
                            }
                            }
                        />
                        <TextInput
                            label="Current HP"
                            editable={isDM || (character.assignedTo != null && character.assignedTo === user.toJSON().email)}
                            keyboardType="phone-pad"
                            style={styles.intContainer}
                            value={character.current_hp}
                            onChangeText={(text) => {
                                onChange(index, 'current_hp', text);
                                updateCharacter();
                            }
                            }
                        />
                        <TextInput
                            label="Temp HP"
                            editable={isDM || (character.assignedTo != null && character.assignedTo === user.toJSON().email)}
                            keyboardType="phone-pad"
                            style={styles.intContainer}
                            value={character.temp_hp}
                            onChangeText={(text) => {
                                onChange(index, 'temp_hp', text);
                                updateCharacter();
                            }
                            }
                        />
                        <TextInput
                            label="AC"
                            editable={isDM || (character.assignedTo != null && character.assignedTo === user.toJSON().email)}
                            keyboardType="phone-pad"
                            style={styles.bottomrowIntContainer}
                            value={character.armor_class}
                            onChangeText={(text) => {
                                onChange(index, 'armor_class', text);
                                updateCharacter();
                            }}
                        />
                        <TextInput
                            label="SPD"
                            editable={isDM || (character.assignedTo != null && character.assignedTo === user.toJSON().email)}
                            keyboardType="phone-pad"
                            style={styles.bottomrowIntContainer}
                            value={String(character.speed)}
                            onChangeText={(text) => {
                                onChange(index, 'speed', text);
                                updateCharacter();
                            }}
                        />
                        {isDM ?
                            <View style = {styles.overallIconContainer}>
                                <View style={styles.firstIconRow}>
                                    {character.canAssign ?
                                        <IconButton
                                            icon="account-plus"
                                            size={28}
                                            color="#000"
                                            style={character.assignedTo != null && character.assignedTo.length !== 0 ? styles.addIconDM : styles.addIcon}
                                            onPress={() => {
                                                showAssign(character, index);
                                            }}
                                        /> : null
                                    }
                                    {character.assignedTo != null && character.assignedTo.length !== 0 ?
                                        <IconButton
                                            icon="account-remove"
                                            size={28}
                                            color="#000"
                                            style={character.canAssign ? styles.removeIcon : styles.removeIconNoShare}
                                            onPress={async () => {
                                                updateCanAssign(character, index);
                                                onChange(index, 'assignedTo', "");
                                                updateCharacter();
                                            }}
                                        />
                                        :
                                        null
                                    }
                                </View>
                                <View style={styles.iconRow}>
                                    {isDM || ((character.assignedTo != null && character.assignedTo === user.toJSON().email) && userPermissions != null && userPermissions.deleteOwnCharacters ) ?
                                        <IconButton
                                            icon="delete"
                                            size={28}
                                            color="#000"
                                            style={{width: "40%", marginLeft: screenWidth * 0.0026}}
                                            onPress={() => {
                                                showConfirmationDialog(character);
                                            }} //delete this character
                                        /> : null
                                    }
                                    <IconButton
                                        icon="arrow-expand-all"
                                        size={28}
                                        color="#000"
                                        style={isDM || ((character.assignedTo != null && character.assignedTo === user.toJSON().email) && userPermissions != null && userPermissions.deleteOwnCharacters) ? styles.expandIconDM : styles.expandIcon}
                                        onPress={() => {
                                            navigation.navigate('CharacterSheet', {
                                                screen: 'Main',
                                                params: {
                                                    charRef: groupRef.collection('characters').doc(character._id),
                                                    character: character,
                                                    index: index,
                                                    groupRef: groupRef,
                                                    onFSChange: onChange,
                                                    isDM: isDM
                                                },
                                            })
                                        }}
                                    />
                                    <IconButton
                                        icon="eye-off"
                                        size={28}
                                        color="#000"
                                        style={isDM || ((character.assignedTo != null && character.assignedTo === user.toJSON().email) && userPermissions != null && userPermissions.deleteOwnCharacters) ? styles.minusIconDM : styles.minusIcon}
                                        onPress={() => {
                                            setHidden(true);
                                        }}
                                    />
                                </View>
                            </View>
                            :
                            <View style={styles.iconRow}>
                                {isDM || ((character.assignedTo != null && character.assignedTo === user.toJSON().email) && userPermissions != null && userPermissions.deleteOwnCharacters ) ?
                                    <IconButton
                                        icon="delete"
                                        size={28}
                                        color="#000"
                                        style={{width: "40%", marginLeft: screenWidth * 0.0026}}
                                        onPress={() => {
                                            showConfirmationDialog(character);
                                        }} //delete this character
                                    /> : null
                                }
                                <IconButton
                                    icon="arrow-expand-all"
                                    size={28}
                                    color="#000"
                                    style={isDM || ((character.assignedTo != null && character.assignedTo === user.toJSON().email) && userPermissions != null && userPermissions.deleteOwnCharacters) ? styles.expandIconDM : styles.expandIcon}
                                    onPress={() => {
                                        navigation.navigate('CharacterSheet', {
                                            screen: 'Main',
                                            params: {
                                                charRef: groupRef.collection('characters').doc(character._id),
                                                character: character,
                                                index: index,
                                                groupRef: groupRef,
                                                onFSChange: onChange,
                                                isDM: isDM
                                            },
                                        })
                                    }}
                                />
                                <IconButton
                                    icon="eye-off"
                                    size={28}
                                    color="#000"
                                    style={isDM || ((character.assignedTo != null && character.assignedTo === user.toJSON().email) && userPermissions != null && userPermissions.deleteOwnCharacters) ? styles.minusIconDM : styles.minusIcon}
                                    onPress={() => {
                                        setHidden(true);
                                    }}
                                />
                            </View>
                        }
                    </View>
                </View>
            </Surface>
        );
    }
    else {
        return (
            <Button
                onPress={() => {
                    setHidden(false)
                }}
                style={styles.hiddenButton}
                mode={"contained"}
            >
                Show Character with Name "{character.name}"
            </Button>
        )
    }
}

const styles = StyleSheet.create({
    overallIconContainer: {
        flexDirection: 'column',
        position: 'absolute',
        bottom: 0,
        left: global.screenWidth * 0.55279,
    },
    charImageContainer: {
        width: global.screenWidth * 0.0850187546886722,
        height: global.screenHeight * 0.1129787234042553,
        position: 'absolute',
        left: global.screenWidth * 0.56189,
        top: global.screenHeight * 0.0052978723404255,
        zIndex: 999
    },
    charImageContainerDM: {
        width: global.screenWidth * 0.0850187546886722,
        height: global.screenHeight * 0.1129787234042553,
        position: 'absolute',
        left: global.screenWidth * 0.56189,
        top: global.screenHeight * 0.0572978723404255,
        zIndex: 999
    },
    firstIconRow: {
        flexDirection: 'row',
        width: global.screenWidth * 0.084,
        marginTop: global.screenHeight * -0.036170212765957,
        zIndex: 0
    },
    iconRow: {
        flexDirection: 'row',
        width: global.screenWidth * 0.084,
        marginTop: global.screenHeight * -0.018170212765957,
        zIndex: 0
    },
    charImage: {
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    },
    hiddenButton: {
        width: "98.93%",
        marginLeft: screenWidth * 0.0037509377344336,
        marginRight: screenWidth * 0.0037509377344336,
        marginBottom: screenHeight * 0.0066489361702128
    },
    expandIconDM: {
        width: "40%",
        marginLeft: screenWidth * -0.0065
    },
    expandIcon: {
        width: "50%"
    },
    addIconDM: {
        width: "50%",
        marginLeft: screenWidth * 0.0065
    },
    removeIcon: {
        width: "50%",
        marginLeft: screenWidth * -0.0065
    },
    removeIconNoShare: {
        width: "100%",
        marginLeft: screenWidth * 0.0065
    },
    addIcon: {
        width: "100%",
        marginLeft: screenWidth * 0.0065
    },
    minusIcon: {
        width: "50%"
    },
    minusIconDM: {
        width: "40%",
        marginLeft: screenWidth * -0.0065
    },
    levelContainer: {
        width: global.screenWidth * 0.082521,
        height: 63,
        margin: 2
    },
    chevDown: {
        marginLeft: -14,
        marginTop: -3
    },
    plusIcon: {
        marginTop: -4,
        marginLeft: 38
    },
    iconGroup: {
        flexDirection: 'row'
    },
    raceLabel: {
        position: "absolute",
        left: 210,
        top: 3,
        color: "#787878",
        fontSize: 12.5,
        fontFamily: 'sans-serif',
        fontWeight: '200'
    },

    classLabel: {
        position: "absolute",
        left: 355,
        top: 3,
        color: "#787878",
        fontSize: 12.5,
        fontFamily: 'sans-serif',
        fontWeight: '200'
    },

    totalDropdownRaceStyle: {
        marginTop: 28,
        marginLeft: 3,
        width: 140,
        backgroundColor: "#e0e0de",
        height: 37.5,
        borderBottomWidth: 1.3,
        borderBottomColor: "#adadad",
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        fontFamily: 'sans-serif'

    },
    totalDropdownClassStyle: {
        marginTop: 28,
        marginLeft: 5.5,
        width: 140,
        backgroundColor: "#e0e0de",
        height: 37.5,
        borderBottomWidth: 1.3,
        borderBottomColor: "#adadad",
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        fontFamily: 'sans-serif'
    },
    currentSelectedText: {
        fontSize: 16,
        marginTop: 5,
        marginLeft: 10,
        fontFamily: 'sans-serif'
    },
    dropdownText: {
        fontSize: 16
    },
    dropdownStyle: {
        borderWidth: 2,
        borderColor: "#adadad",
        width: 140,
        marginTop: -18,
    },
    cardContainer: {
        flexDirection: 'column',
    },
    cardRow: {
        flexDirection: 'row',
    },
    intContainer: {
        marginBottom: screenHeight * 0.0026595744680851,
        marginTop: screenHeight * 0.0026595744680851,
        marginLeft: screenWidth * 0.0015003750937734,
        marginRight: screenWidth * 0.0015003750937734,
        width: global.screenWidth * 0.08402,
        height: 63,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif'
    },
    abilityScoresContainer: {
        marginBottom: screenHeight * 0.0026595744680851,
        marginTop: screenHeight * 0.0026595744680851,
        marginLeft: screenWidth * 0.0015003750937734,
        marginRight: screenWidth * 0.0015003750937734,
        width: global.screenWidth * 0.06601,
        height: 63,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif'
    },
    bottomrowIntContainer: {
        marginBottom: screenHeight * 0.0026595744680851,
        marginTop: screenHeight * 0.0026595744680851,
        marginLeft: screenWidth * 0.0015003750937734,
        marginRight: screenWidth * 0.0015003750937734,
        width: global.screenWidth * 0.06527,
        height: 63,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif'
    },
    stringContainer: {
        marginBottom: screenHeight * 0.0026595744680851,
        marginTop: screenHeight * 0.0026595744680851,
        marginLeft: screenWidth * 0.0015003750937734,
        marginRight: screenWidth * 0.0015003750937734,
        width: global.screenWidth * 0.152295,
        height: 63,
        backgroundColor: "#e0e0de",
        fontFamily: 'sans-serif'
    },
    surface: {
        elevation: 4,
        margin: 5,
    }

})
