import React, {useEffect, useState} from 'react'; //If I need revision on what useEffect is for https://reactjs.org/docs/hooks-effect.html
import NoteCard from '../components/NoteCard'; //NoteCard is essentially represents a note after it has been created
import colors from '../utils/colors'; //Getting colors we are using for the app
import Spinner from '../components/Spinner'; //Spinner icon that shows
import {StyleSheet, View, FlatList} from 'react-native'; //FlatList for viewing things in a list, View and Stylesheet we know too
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

export default function CharacterSheetScreen({route}) {
    const [visible, setVisible] = React.useState(false); //For whether the pop-up will be visible
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);
    const [inputTitle, setInputTitle] = useState(''); //Notes title
    const [inputContent, setInputContent] = useState(''); //Notes content
    const [notes, setNotes] = useState([]); //Notes
    const [loading, setLoading] = useState(true); //Whether the data is loading
    const {charRef} = route.params; //Can find params in CharacterCard. Essentially is just the character.

    // Load data from firebase
    useEffect(() => {
        const notesListener = charRef.collection('notes').onSnapshot(
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
    }, [charRef, loading]);

    if (loading) {
        //Show spinner if we are still getting the data.
        return <Spinner />;
    }

    // Edit Current Notes - need to do this

    // Delete Notes - need to do this

    return (
        <Provider>
            <View style={styles.wrapper}>
                <FlatList
                    data={notes} //Data of the flatList is the notes
                    renderItem={(
                        {item} //Render each item with the title and content
                    ) => <NoteCard title={item.title} content={item.content} />}
                />
                <FAB style={styles.fab} small icon="plus" onPress={showDialog} />
                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Title>Create a New Note</Dialog.Title>
                        <Dialog.Content>
                            <TextInput
                                onChangeText={(text) => setInputTitle(text)}
                                label="Title"
                            />
                            <TextInput // Content of the note (I think note should be shown multi-lined by default instead of one lined.
                                onChangeText={(text) => setInputContent(text)}
                                label="Content"
                                multiline={true}
                            />
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={hideDialog}>Cancel</Button>
                            <Button
                                onPress={() => {
                                    //If add button is pressed add the note to the notes collection in the firebase of the specified character
                                    charRef
                                        .collection('notes')
                                        .add({
                                            //Add the title and the content
                                            title: inputTitle,
                                            content: inputContent,
                                        })
                                        //Show the error if an error occurs. Also I think hide the window??? Not sure why hideDialog is called without {}.
                                        .then(hideDialog, (error) => {
                                            alert(error);
                                        });
                                }}
                            >
                                Add
                            </Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
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
        margin: 20,
        position: 'absolute',
    },
    wrapper: {
        backgroundColor: colors.white,
        height: '100%',
        padding: 5,
    },
});
