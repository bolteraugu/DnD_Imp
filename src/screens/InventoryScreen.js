import {Button, Dialog, IconButton, Portal, Provider, Text, TextInput} from "react-native-paper";
import React, {useContext, useEffect, useState} from "react"
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {
    View,
    StyleSheet,
    ScrollView,
    FlatList,
    KeyboardAvoidingView,
    Dimensions, Keyboard
} from "react-native";
import colors from "../utils/colors";
import Spinner from "../components/Spinner";
import Weapon from "../components/Weapon";
import Armor from "../components/Armor";
import Possession from "../components/Possession";
import {AuthUserContext} from "../navigation/AuthUserProvider";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

global.screenWidth = Dimensions.get("window").width;
global.screenHeight = Dimensions.get("window").height;

export default function InventoryScreen({route, navigation}) {
    const [character, setCharacter] = useState(global.character);
    const pushChange = global.onFSChange
    const [loading, setLoading] = useState(true);
    const [weapons, setWeapons] = useState([]);
    const [armor, setArmor] = useState([]);
    const [possessions, setPossessions] = useState([]);
    const {user} = useContext(AuthUserContext);
    const [helpVisible, setHelpVisible] = useState(false);
    const hideHelpDialog = () => setHelpVisible(false);
    const showHelpDialog = () => setHelpVisible(true);

    global.ShowHelpCharacterSheet = () => {
        Keyboard.dismiss();
        showHelpDialog();
    };

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            navigation.addListener('focus', e => {
                setLoading(true)
                global.charaRef.onSnapshot( (snapshot) => {
                    setCharacter(snapshot.data())
                });
                global.charaRef.collection("weapons").onSnapshot(
                    (querySnapshot) => {
                        const weapons = querySnapshot.docs.map((doc) => {
                            const data = {
                                _id: doc.id,
                                ...doc.data(),
                            };
                            return data;
                        });
                        setWeapons(weapons);
                    },
                    (error) => {
                        alert(error);
                    }
                );
                global.charaRef.collection("armor").onSnapshot(
                    (querySnapshot) => {
                        const armor = querySnapshot.docs.map((doc) => {
                            const data = {
                                _id: doc.id,
                                ...doc.data(),
                            };
                            return data;
                        });
                        setArmor(armor);
                    },
                    (error) => {
                        alert(error);
                    }
                );
                global.charaRef.collection("possessions").onSnapshot(
                    (querySnapshot) => {
                        const possession = querySnapshot.docs.map((doc) => {
                            const data = {
                                _id: doc.id,
                                ...doc.data(),
                            };
                            return data;
                        });
                        setPossessions(possession);
                        if (loading) {
                            setLoading(false);
                        }
                    },
                    (error) => {
                        alert(error);
                    }
                );
            });
        }
        return () => { isMounted = false }

    }, [navigation])

    if (loading) {
        return <Spinner />;
    }

    function updateCharacterLocal(fieldName, text, isNumber) {
        let tempCharacter = JSON.parse(JSON.stringify(character));
        tempCharacter[fieldName] = isNumber ? Number(text) : text;
        setCharacter(tempCharacter);
    }

    function updateWeapon(index, field, value) {
        const newWeapons = [...weapons];
        newWeapons[index][field] = value;
        setWeapons(newWeapons);
    }

    function updateArmor(index, field, value) {
        const newArmor = [...armor];
        newArmor[index][field] = value;
        setArmor(newArmor);
    }

    function updatePossession(index, field, value) {
        const newPossessions = [...possessions];
        newPossessions[index][field] = value;
        setPossessions(newPossessions);
    }

    function updateCharacter(fieldName, value) {
        if (fieldName === 'CP') {
            global.charaRef
                .update({
                    CP: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        } else if (fieldName === 'SP') {
            global.charaRef
                .update({
                    SP: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        } else if (fieldName === 'EP') {
            global.charaRef
                .update({
                    EP: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        } else if (fieldName === 'GP') {
            global.charaRef
                .update({
                    GP: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        } else if (fieldName === 'PP') {
            global.charaRef
                .update({
                    PP: value
                })
                .then(console.log('Successfully updated character'), (error) =>
                    console.log('Failed to update character: ' + error)
                );
        }
    }

    let weaponIndex = 0;
    let armorIndex = 0;
    let possessionIndex = 0;
    return (
            <Provider>
                <KeyboardAwareScrollView>
                <View>
                    <View style = {styles.totalContainer}>
                        <View style = {styles.currencyContainer}>
                            <Text
                                style = {styles.currencyHeading}
                            >
                                Currency
                            </Text>
                            <View style = {styles.currencyTypes}>
                                <View style = {styles.currencyTypeContainer}>
                                    <Text
                                        style = {styles.currencyTypeHeading}
                                    >
                                        CP
                                    </Text>
                                    <TextInput
                                        style = {styles.currencyTypeInput}
                                        underlineColor="transparent"
                                        keyboardType="phone-pad"
                                        editable={global.isDM || character.assignedTo === user.toJSON().email}
                                        value = {character.CP}
                                        onChangeText={(text) => {
                                            pushChange(global.index, 'CP', text);
                                            updateCharacterLocal('CP', text);
                                            updateCharacter('CP', text);
                                        }}
                                    />
                                </View>
                                <View style = {styles.currencyTypeContainer}>
                                    <Text
                                        style = {styles.currencyTypeHeading}
                                    >
                                        SP
                                    </Text>
                                    <TextInput
                                        style = {styles.currencyTypeInput}
                                        underlineColor="transparent"
                                        keyboardType="phone-pad"
                                        editable={global.isDM || character.assignedTo === user.toJSON().email}
                                        value = {character.SP}
                                        onChangeText={(text) => {
                                            pushChange(global.index, 'SP', text);
                                            updateCharacterLocal('SP', text);
                                            updateCharacter('SP', text);
                                        }}
                                    />
                                </View>
                                <View style = {styles.currencyTypeContainer}>
                                    <Text
                                        style = {styles.currencyTypeHeading}
                                    >
                                        EP
                                    </Text>
                                    <TextInput
                                        style = {styles.currencyTypeInput}
                                        underlineColor="transparent"
                                        keyboardType="phone-pad"
                                        editable={global.isDM || character.assignedTo === user.toJSON().email}
                                        value = {character.EP}
                                        onChangeText={(text) => {
                                            pushChange(global.index, 'EP', text);
                                            updateCharacterLocal('EP', text);
                                            updateCharacter('EP', text);
                                        }}
                                    />
                                </View>
                                <View style = {styles.currencyTypeContainer}>
                                    <Text
                                        style = {styles.currencyTypeHeading}
                                    >
                                        GP
                                    </Text>
                                    <TextInput
                                        style = {styles.currencyTypeInput}
                                        underlineColor="transparent"
                                        keyboardType="phone-pad"
                                        editable={global.isDM || character.assignedTo === user.toJSON().email}
                                        value = {character.GP}
                                        onChangeText={(text) => {
                                            pushChange(global.index, 'GP', text);
                                            updateCharacterLocal('GP', text);
                                            updateCharacter('GP', text);
                                        }}
                                    />
                                </View>
                                <View style = {styles.currencyTypeContainer}>
                                    <Text
                                        style = {styles.currencyTypeHeading}
                                    >
                                        PP
                                    </Text>
                                    <TextInput
                                        style = {styles.currencyTypeInput}
                                        underlineColor="transparent"
                                        keyboardType="phone-pad"
                                        editable={global.isDM || character.assignedTo === user.toJSON().email}
                                        value = {character.PP}
                                        onChangeText={(text) => {
                                            pushChange(global.index, 'PP', text);
                                            updateCharacterLocal('PP', text);
                                            updateCharacter('PP', text);
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style = {styles.weaponContainer}>
                            <Text
                                style = {styles.currencyHeading}
                            >
                                Weapons
                            </Text>
                            <FlatList
                                data={weapons}
                                character={character}
                                style = {styles.list}
                                keyExtractor={(item) => item._id}
                                renderItem={({ item }) => (
                                    <Weapon
                                        index={weaponIndex++}
                                        weapon={item}
                                        isDM={global.isDM}
                                        character={character}
                                        onChange={updateWeapon}
                                    />
                                )}
                                ListFooterComponent={
                                    <View style = {styles.centerButton}>
                                        <Button
                                            mode="contained"
                                            style = {styles.addButton}
                                            disabled = {!(global.isDM || character.assignedTo === user.toJSON().email)}
                                            onPress={() => {navigation.navigate('AddWeapon')}}>
                                            Add A New Weapon
                                        </Button>
                                    </View>
                                }
                            />
                        </View>
                        <View style = {styles.inventoryContainer}>
                            <Text
                                style = {styles.currencyHeading}
                            >
                                Armor
                            </Text>
                            <FlatList
                                data={armor}
                                character={character}
                                style = {styles.list}
                                keyExtractor={(item) => item._id}
                                renderItem={({ item }) => (
                                    <Armor
                                        index={armorIndex++}
                                        armor={item}
                                        character={character}
                                        isDM={global.isDM}
                                        onChange={updateArmor}
                                    />
                                )}
                                ListFooterComponent={
                                    <View style = {styles.centerButton}>
                                        <Button
                                            mode="contained"
                                            style = {styles.addButton}
                                            disabled = {!(global.isDM || character.assignedTo === user.toJSON().email)}
                                            onPress={() => {navigation.navigate('AddArmor')}}>
                                            Add New Armor
                                        </Button>
                                    </View>
                                }
                            />
                        </View>
                        <View style = {styles.inventoryContainer}>
                            <Text
                                style = {styles.currencyHeading}
                            >
                                Other Possessions
                            </Text>
                            <FlatList
                                data={possessions}
                                character={character}
                                style = {styles.list}
                                keyExtractor={(item) => item._id}
                                renderItem={({ item }) => (
                                    <Possession
                                        index={possessionIndex++}
                                        possession={item}
                                        character={character}
                                        isDM={global.isDM}
                                        onChange={updatePossession}
                                    />
                                )}
                                ListFooterComponent={
                                    <View style = {styles.centerButtonFinal}>
                                        <Button
                                            mode="contained"
                                            style = {styles.addPossessionButton}
                                            disabled = {!(global.isDM || character.assignedTo === user.toJSON().email)}
                                            onPress={() => {navigation.navigate('AddPossession')}}>
                                            Add A New Possession
                                        </Button>
                                    </View>
                                }
                            />
                        </View>
                        <View style = {styles.gap}>

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
    gap: {
        height: screenHeight * 0.1329787234042553
    },
    centerButton: {
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    centerButtonFinal: {
        width: "100%",
        alignItems: 'center',
    },
    addButton: {
        width: screenWidth * 0.1650412603150788,
        marginTop: screenHeight * 0.00664893617021277
    },
    addPossessionButton: {
        width: "27%",
        marginTop: screenHeight * 0.00664893617021277
    },
    list: {
        marginTop: screenHeight * 0.0664893617021277,
        width: "86%"
    },
    totalContainer: {
        flexDirection: 'column'
    },
    currencyTypes: {
        flexDirection: 'row',
        marginLeft: screenWidth * 0.0750187546886722
    },
    currencyContainer: {
        height: screenHeight * 0.1529255319148936,
        marginTop: screenHeight * 0.0093085106382979,
        marginLeft: screenWidth * 0.0075018754688672,
        marginRight: screenWidth * 0.0075018754688672,
        backgroundColor:"#e3e3e3",
        borderRadius: 4,
        borderWidth: 1
    },
    weaponContainer: {
        flexDirection: 'column',
        backgroundColor:"#e3e3e3",
        borderRadius: 4,
        borderWidth: 1,
        marginTop: screenHeight * 0.0132978723404255,
        marginLeft: screenWidth * 0.0075018754688672,
        marginRight: screenWidth * 0.0075018754688672,
        paddingBottom: screenHeight * 0.0159574468085106,
        alignItems: 'center'
    },
    inventoryContainer: {
        flexDirection: 'column',
        backgroundColor:"#e3e3e3",
        borderRadius: 4,
        borderWidth: 1,
        marginLeft: screenWidth * 0.0075018754688672,
        marginTop: screenHeight * 0.0132978723404255,
        marginRight: screenWidth * 0.0075018754688672,
        paddingBottom: screenHeight * 0.0159574468085106,
        alignItems: 'center'
    },
    currencyTypeContainer: {
        flexDirection: 'row',
        flex: 1,
        marginTop: screenHeight * 0.0704787234042553,
        height: screenHeight * 0.0465425531914894,
    },
    currencyTypeHeading: {
        marginLeft: screenWidth * 0.0075018754688672,
        textAlign: 'center',
        height: "100%",
        marginRight: screenWidth * 0.0075018754688672,
        marginTop: screenHeight * 0.0053191489361702,
        fontSize: 16
    },
    currencyTypeInput: {
        borderWidth: 1,
        backgroundColor: "#ffffff",
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        height: screenHeight * 0.0398936170212766,
        width: screenWidth * 0.0525131282820705,
        textAlign: 'center'
    },
    currencyHeading: {
        width: "100%",
        textAlign: "center",
        color: "#0038d4",
        position: 'absolute',
        top: screenHeight * 0.0132978723404255,
        fontSize: 17,
        fontWeight: "bold"
    },
    armorHeading: {
        width: "100%",
        textAlign: "center",
        color: "#0038d4",
        position: 'absolute',
        top: screenHeight * 0.0132978723404255,
        fontSize: 17,
        fontWeight: "bold"
    }
})
