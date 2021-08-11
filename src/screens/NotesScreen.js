import React, {useContext, useEffect, useState} from 'react'; //If I need revision on what useEffect is for https://reactjs.org/docs/hooks-effect.html
import NoteCard from '../components/NoteCard'; //NoteCard is essentially represents a note after it has been created
import colors from '../utils/colors'; //Getting colors we are using for the app
import Spinner from '../components/Spinner'; //Spinner icon that shows
import {StyleSheet, View, FlatList, Dimensions, Text} from 'react-native'; //FlatList for viewing things in a list, View and Stylesheet we know too
//Importing everything we need from react native paper. FAB stands for floating action button (represents the primary action in the screen). Portal is for rendering a component at
//a different place in the parent (component) tree.
import {
    Button,
    Portal,
    Dialog,
    TextInput,
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
    const groupRef = firebase.firestore().collection('groups').doc(group._id);
    const [notes, setNotes] = useState([]); //Notes
    const [loading, setLoading] = useState(true); //Whether the data is loading

    // Load data from firebase
    useEffect(() => {
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
                if (loading) {
                    setLoading(false);
                }
            },
            //If we get an error when loading the data then show this.
            (error) => {
                alert(error);
            }
        );
        //Return the snapshot of notes
        return notesListener;
    }, [loading]);

    if (loading) {
        //Show spinner if we are still getting the data.
        return <Spinner />;
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

    return (
        <Provider>
            <View style={styles.wrapper}>
                <ShowEmptyMessage/>
                <FlatList
                    data={notes} //Data of the flatList is the notes
                    renderItem={(
                        {item} //Render each item with the title and content
                    ) => <NoteCard title={item.title} content={item.content} />}
                />
                <FAB style={styles.fab} small icon="plus" onPress={() => {navigation.navigate('AddNote', {groupRef: groupRef})}} />
            </View>
        </Provider>
    );
}

//Styles for the content
const styles = StyleSheet.create({
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
