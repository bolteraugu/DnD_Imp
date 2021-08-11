import {Button, TextInput} from "react-native-paper";
import React, {useContext, useState} from "react";
import {StyleSheet, TextInput as NativeTextInput, View} from "react-native";
import {AuthUserContext} from "../navigation/AuthUserProvider";


export default function AddNotesScreen({navigation, route}) {
    const {user} = useContext(AuthUserContext);
    const [visible, setVisible] = React.useState(false); //For whether the pop-up will be visible
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);
    const [inputTitle, setInputTitle] = useState(''); //Notes title
    const [inputContent, setInputContent] = useState(''); //Notes content
    return (
        <View style = {styles.container}>
            <TextInput
                onChangeText={(text) => setInputTitle(text)}
                label="Title"
                style = {styles.titleInput}
            />
            <TextInput // Content of the note (I think note should be shown multi-lined by default instead of one lined.
                onChangeText={(text) => setInputContent(text)}
                label="Content"
                multiline={true}
                style = {styles.contentInput}
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
                    />
                )}
            />
            <View style = {styles.buttonContainer}>
                <Button
                    mode = "contained"
                    style = {styles.button}
                    onPress={() => {
                        //If add button is pressed add the note to the notes collection in the firebase of the specified character
                        route.params.groupRef
                            .collection('notes').doc(user.toJSON().email).collection('notes')
                            .add({
                                //Add the title and the content
                                title: inputTitle,
                                content: inputContent,
                            })
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
        height: screenHeight * 0.2415957446808511
    },
    button: {
        width: screenWidth * 0.15037509377344
    },
})