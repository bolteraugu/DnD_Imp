import {Text, TextInput} from "react-native-paper";
import React, {useContext, useEffect, useState} from "react";
import {Dimensions, StyleSheet, TextInput as NativeTextInput, View} from "react-native";
import {AuthUserContext} from "../navigation/AuthUserProvider";
import Spinner from "../components/Spinner";

global.screenWidth = Dimensions.get("window").width;
global.screenHeight = Dimensions.get("window").height;

export default function EditNotesScreen({navigation, route}) {
    const [loading, setLoading] = useState(true);
    const [note, setNote] = useState(route.params.note);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', e => {
            global.noteToEdit = route.params.note;
            global.groupRef = route.params.groupRef;
            setLoading(true)
            route.params.groupRef.collection('notes').doc(route.params.note._id).onSnapshot((snapshot) => {
                setNote(snapshot.data())
            })
            if (loading) {
                setLoading(false);
            }
        });
        return unsubscribe;
    }, [])

    if (loading) {
        return <Spinner />;
    }

    function updateNoteLocal(fieldName, text) {
        let tempNote = JSON.parse(JSON.stringify(note));
        tempNote[fieldName] = text;
        setNote(tempNote);
    }

    function updateNote(fieldName) {
        if (fieldName === 'title') {
            route.params.groupRef.collection('notes').doc(route.params.note._id)
                .update({
                    title: route.params.note["title"]
                })
                .then(console.log('Successfully updated note'), (error) =>
                    console.log('Failed to update note: ' + error)
                );
        }
        else {
            route.params.groupRef.collection('notes').doc(route.params.note._id)
                .update({
                    content: route.params.note["content"]
                })
                .then(console.log('Successfully updated note'), (error) =>
                    console.log('Failed to update note: ' + error)
                );
        }
    }

    return (
        <View style = {styles.container}>
            <Text style = {styles.headingName}>
                Title
            </Text>
            <TextInput
                onChangeText={(text) => {
                    route.params.executeOnChange(route.params.index, 'title', text)
                    updateNoteLocal('title', text);
                    updateNote('title')
                }}
                style = {styles.titleInput}
                value = {note.title}
                placeholder = {"Enter the note's title..."}
            />
            <Text style = {styles.headingContent}>
                Content
            </Text>
            <TextInput // Content of the note (I think note should be shown multi-lined by default instead of one lined.
                // onChangeText={(text) => setInputContent(text)}
                multiline={true}
                style = {styles.contentInput}
                value = {note.content}
                onChangeText={(text) => {
                    route.params.executeOnChange(route.params.index, 'content', text)
                    updateNoteLocal('content', text);
                    updateNote('content')
                }}
                render={props => (
                    <NativeTextInput
                        {...props}
                        style={[
                            props.style,
                            props.multiline
                                ? {
                                    paddingTop: screenHeight * 0.0198936170212766,
                                    paddingLeft: screenWidth * 0.010454688672168,
                                    paddingRight: screenWidth * 0.018754688672168,
                                    paddingBottom: screenHeight * 0.0106382978723404,
                                    height: screenHeight * 0.4815957446808511
                                }
                                : null,
                        ]}
                        placeholder = {"Enter the note's content..."}
                    />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    headingName: {
        marginBottom: screenHeight * 0.0165957446808511,
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: screenWidth * 0.4575957446808511,
    },
    headingContent: {
        marginBottom: screenHeight * 0.0165957446808511,
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: screenWidth * 0.445957446808511,
    },
    gap: {
        width: screenWidth * 0.0690037509377344
    },
    container: {
        width: "100%",
        height: "100%",
        alignItems: 'center',
        marginTop: screenHeight * 0.0965957446808511,
    },
    buttonContainer: {
        flexDirection: 'row'
    },
    titleInput: {
        width: "50%",
        marginBottom: screenHeight * 0.0265957446808511,
    },
    contentInput: {
        width: "50%",
        marginBottom: screenHeight * 0.0415957446808511,
        height: screenHeight * 0.4815957446808511
    },
    button: {
        width: screenWidth * 0.15037509377344
    },
})