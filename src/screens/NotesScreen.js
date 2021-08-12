import React, {useContext, useEffect, useState} from 'react'; //If I need revision on what useEffect is for https://reactjs.org/docs/hooks-effect.html
import NoteCard from '../components/NoteCard'; //NoteCard is essentially represents a note after it has been created
import colors from '../utils/colors'; //Getting colors we are using for the app
import Spinner from '../components/Spinner'; //Spinner icon that shows
import {StyleSheet, View, FlatList, Dimensions, Text} from 'react-native'; //FlatList for viewing things in a list, View and Stylesheet we know too
import DropDown from "react-native-paper-dropdown";
//Importing everything we need from react native paper. FAB stands for floating action button (represents the primary action in the screen). Portal is for rendering a component at
//a different place in the parent (component) tree.
import {
    Button,
    Portal,
    Dialog,
    FAB,
    Provider,
} from 'react-native-paper';
import {AuthUserContext} from "../navigation/AuthUserProvider";
import firebase from "firebase";

global.screenWidth = Dimensions.get("window").width;
global.screenHeight = Dimensions.get("window").height;

export default function NotesScreen({navigation, route}) {
    const {user} = useContext(AuthUserContext);
    const {group} = route.params;
    const [showDropDown, setShowDropDown] = useState(false);
    const groupRef = firebase.firestore().collection('groups').doc(group._id);
    const [notes, setNotes] = useState([]); //Notes
    const [visible, setVisible] = useState(false); //Whether the data is loading
    const [recipients, setRecipients] = useState("");
    const [members, setMembers] = useState("");
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);
    const [items, setItems] = useState("");

    // Load data from firebase
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', e => {
            setRecipients("")
            firebase.firestore().collection('groups').doc(group._id).get().then((snapshot) => {
                setMembers(snapshot.get('members'))
            })
            hideDialog()
            const notesListener = groupRef.collection('notes').doc(user.toJSON().email).collection('notes').onSnapshot(
                //Pretty much gets a snapshot of the notes from the currently looked at character
                (querySnapshot) => {
                    //Query this snapshot
                    //Pretty much gets each element from docs using map and using map applies the function below. The function gets the id from the item id and gets the data too using data().
                    const notes = querySnapshot.docs.map((doc) => {
                        const data = {
                            _id: doc.id,
                            ...doc.data(),
                        };
                        return data;
                    });
                    //Sets notes to this new array that was made using map (the array contains the id and the data)
                    setNotes(notes);

                    //Pretty much as soon as it has finished getting the data it is set to false since it is no longer loading/getting it.
                },
                //If we get an error when loading the data then show this.
                (error) => {
                    alert(error);
                }
            );
        })
        //Return the snapshot of notes
        return unsubscribe;
    }, []);

    function updateNote(index, fieldName, text) {
        const tempNotes = [...notes];
        tempNotes[index][fieldName] = text;
        setNotes(tempNotes);
    }

    // Edit Current Notes - need to do this

    // Delete Notes - need to do this

    function ShowEmptyMessage() {
        if (notes.length === 0) {
            return <Text style={styles.emptyMessage}>You currently do not have any notes. Press the + icon in the bottom left to add a new one.</Text>
        }
        else {
            return null
        }
    }

    let index = 0;
    return (
        <Provider>
            <View style={styles.wrapper}>
                <ShowEmptyMessage/>
                <FlatList
                    data={notes} //Data of the flatList is the notes
                    keyExtractor={(item) => item._id}
                    renderItem={(
                        {item} //Render each item with the title and content
                    ) =>
                        <NoteCard
                            title={item.title}
                            note={item}
                            index = {index++}
                            content={item.content}
                            groupRef = {groupRef}
                            navigation = {navigation}
                            onChange = {updateNote}
                            shareNote = { () => {
                                let membersTemp = []
                                for (let i = 0; i < members.length; i++) {
                                    membersTemp.push({
                                        value: members[i], label: members[i]
                                    })
                                }
                                setItems(membersTemp);
                                showDialog()
                            }
                            }
                        />
                    }
                />
                <FAB
                    style={styles.fab}
                     small icon="plus"
                     onPress={() => {
                         console.log(items)
                         navigation.navigate('AddNote', {groupRef: groupRef})
                     }} />
            </View>
            <Portal>
                    <Dialog
                        visible={visible}
                        onDismiss={hideDialog}
                        style = {styles.shareWindow}
                    >
                        <Dialog.Title
                        style = {styles.shareTitle}>Share this note to user(s)</Dialog.Title>
                        <Dialog.Content>
                            <DropDown
                                label = {"Please select users..."}
                                list = {items}
                                visible={showDropDown}
                                showDropDown={() => setShowDropDown(true)}
                                onDismiss={() => setShowDropDown(false)}
                                multiSelect
                                dropDownStyle={styles.shareDropdown}
                                setValue={setRecipients}
                                value={recipients}
                            />
                        </Dialog.Content>
                        <Dialog.Actions>
                            <View style = {styles.buttonContainer}>
                                <Button
                                    mode = "contained"
                                    style={styles.button}
                                    disabled = {recipients.length === 0}
                                    onPress={() => {
                                        // groupRef
                                        //     .update({
                                        //         members:
                                        //             firebase.firestore.FieldValue.arrayUnion(inputVal)//,
                                        //         //numMembers: firebase.firestore.FieldValue.increment(1),
                                        //     })
                                        //     .then(() => {
                                        //         hideDialog();
                                        //         setRecipients([...recipients, inputVal]);
                                        //         setMembers([...members, inputVal]);
                                        //     });
                                    }}
                                >
                                    Share
                                </Button>
                                <View style = {styles.gap}/>
                                <Button
                                    mode = "contained"
                                    style={styles.button}
                                    onPress={hideDialog}>Cancel</Button>
                            </View>
                        </Dialog.Actions>
                    </Dialog>
            </Portal>
        </Provider>
    );
}

//Styles for the content
const styles = StyleSheet.create({
    shareTitle: {
      alignSelf: 'center'
    },
    button: {
      width: "20%"
    },
    buttonContainer: {
      justifyContent: 'center',
        marginBottom: screenHeight * 0.020363829787234,
        width: "100%",
        flexDirection: 'row'
    },
    gap: {
        width: screenWidth * 0.04
    },
    shareDropdown: {
        marginTop: screenHeight * -0.020363829787234,
    },
    shareWindow: {
        width: "50%",
        alignSelf: 'center',
        marginTop: screenHeight * -0.20363829787234
    },
    fab: {
        //Absolute so it ignores it's parents positoning and instead is positioned bottom left corner with a margin of 20.
        backgroundColor: colors.primary,
        bottom: 0,
        left: 0,
        marginLeft: screenWidth * 0.0150037509377344,
        marginRight: screenWidth * 0.0150037509377344,
        marginTop: screenHeight * 0.0265957446808511,
        marginBottom: screenHeight * 0.0265957446808511,
        position: 'absolute',
    },
    wrapper: {
        backgroundColor: colors.white,
        height: '100%',
        paddingBottom: screenHeight * 0.0066489361702128,
        paddingTop: screenHeight * 0.0066489361702128,
        paddingLeft: screenWidth * 0.0037509377344336,
        paddingRight: screenWidth * 0.0037509377344336,
    },
    emptyMessage: {
        paddingTop: screenHeight * 0.0132978723404256,
        paddingLeft: screenWidth * 0.0075018754688672,
        fontSize: 20
    }
});
