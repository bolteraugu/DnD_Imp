import {Button, Text, TextInput} from "react-native-paper";
import React, {useContext, useState} from "react";
import {StyleSheet, TextInput as NativeTextInput, View} from "react-native";
import {AuthUserContext} from "../navigation/AuthUserProvider";


export default function AddNotesScreen({navigation, route}) {
    const {user} = useContext(AuthUserContext);
    const [inputTitle, setInputTitle] = useState(''); //Notes title
    const [inputContent, setInputContent] = useState(''); //Notes content
    return (
        <View style = {styles.container}>
            <Text style = {styles.headingName}>
                Name
            </Text>
            <TextInput
                onChangeText={(text) => setInputTitle(text)}
                style = {styles.titleInput}
                placeholder = {"Enter the note's name..."}
            />
            <Text style = {styles.headingContent}>
                Content
            </Text>
            <TextInput // Content of the note (I think note should be shown multi-lined by default instead of one lined.
                onChangeText={(text) => setInputContent(text)}
                multiline={true}
                style = {styles.contentInput}
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
                                    height: screenHeight * 0.4015957446808511
                                }
                                : null,
                        ]}
                        placeholder = {"Enter the note's content..."}
                    />
                )}
            />
            <View style = {styles.buttonContainer}>
                <Button
                    mode = "contained"
                    style = {styles.button}
                    disabled = {inputTitle.length === 0}
                    onPress={() => {
                        //If add button is pressed add the note to the notes collection in the firebase of the specified character
                        route.params.groupRef
                            .collection('notes')
                            .add({
                                //Add the title and the content
                                title: inputTitle,
                                content: inputContent,
                                members: new Array(user.toJSON().email)
                            }).then(navigation.goBack())
                    }}
                >
                    Add
                </Button>
                <View style = {styles.gap}/>
                <Button
                    mode = "contained"
                    style = {styles.button}
                    onPress={() => {navigation.goBack()}}
                >
                    Cancel
                </Button>
            </View>
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
        height: screenHeight * 0.4015957446808511
    },
    button: {
        width: screenWidth * 0.15037509377344
    },
})