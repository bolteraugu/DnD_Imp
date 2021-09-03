import {Button, Dialog, FAB, IconButton, Portal, Provider, Text, TextInput, Title} from "react-native-paper";
import React, {useContext, useEffect, useRef, useState} from "react";
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    TextInput as NativeTextInput,
    View
} from "react-native";
import Spinner from "../components/Spinner";
import RenderHtml from 'react-native-render-html';
import colors from "../utils/colors";

global.screenWidth = Dimensions.get("window").width;
global.screenHeight = Dimensions.get("window").height;

export default function ViewNotesScreen({navigation, route}) {
    const [loading, setLoading] = useState(true);
    const [note, setNote] = useState(route.params.note);
    const [helpVisible, setHelpVisible] = useState(false);
    const hideHelpDialog = () => setHelpVisible(false);
    const showHelpDialog = () => setHelpVisible(true);

    global.ShowHelpViewNotes = () => {
        showHelpDialog();
    };

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

    return (
        <Provider>
            <ScrollView
                style = {styles.previewContainer}
            >
                <View style = {styles.htmlView}>
                    <RenderHtml
                        source={{
                            html: note.content.replace(/(?:\r\n|\r|\n)/g, '<br>')
                        }}
                        contentWidth={screenWidth * 0.55}
                    />
                </View>
            </ScrollView>
            <Portal>
                <Dialog
                    visible={helpVisible}
                    onDismiss={hideHelpDialog}
                    style={styles.helpWindow}
                >
                    <View style = {{alignSelf: 'center'}}>
                        <Dialog.Title
                            style={styles.helpTitle}
                        >
                            View Note Screen Help
                        </Dialog.Title>
                    </View>
                    <IconButton
                        icon="close" //Getting the back icon image
                        size={36} //Setting the size
                        color="#a60000" //And the color
                        style = {styles.exitButton}
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
                            In this screen you can view a note but you can't edit it. If you wish to edit it you must use navigate to the 'Edit Note' screen from
                            the 'Notes' screen.
                        </Text>
                    </Dialog.Content>
                </Dialog>
            </Portal>
        </Provider>
    )
}

const styles = StyleSheet.create({
    exitButton: {
        left: screenWidth * 0.625,
        top: screenHeight * -0.02,
        position: 'absolute'
    },
    helpWindow: {
        width: screenWidth * 0.665,
        alignSelf: 'center',
        marginTop: screenHeight * -0.0563829787234
    },
    helpTitle: {
        alignSelf: 'center',
        textAlign: 'center'
    },
    helpTextBold: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: screenHeight * 0.02
    },
    previewContainer: {
        width: "90%",
        marginLeft: "5%",
        marginTop: "2.5%",
        marginBottom: "2.5%",
        backgroundColor: "#e4e4e4",
        borderRadius: 4,
        borderWidth: 1,
    },
    htmlView: {
        padding: "2.5%"
    }
})