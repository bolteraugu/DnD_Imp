import {Button, Dialog, FAB, IconButton, Portal, Provider, Text, TextInput, Title, Surface} from "react-native-paper";
import React, {useContext, useEffect, useRef, useState} from "react";
import {
    Dimensions, Keyboard,
    KeyboardAvoidingView, Linking, Platform,
    ScrollView,
    StyleSheet,
    TextInput as NativeTextInput,
    View
} from "react-native";
import {AuthUserContext} from "../navigation/AuthUserProvider";
import Spinner from "../components/Spinner";
import RenderHtml from 'react-native-render-html';
import colors from "../utils/colors";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

global.screenWidth = Dimensions.get("window").width;
global.screenHeight = Dimensions.get("window").height;

export default function EditNotesScreen({navigation, route}) {
    const [loading, setLoading] = useState(true);
    const [cursorPosition, setCursorPosition] = useState(0);
    const [note, setNote] = useState(route.params.note);
    const [helpVisible, setHelpVisible] = useState(false);
    const showHelpDialog = () => setHelpVisible(true);
    const hideHelpDialog = () => setHelpVisible(false);
    const [linkVisible, setLinkVisible] = useState(false);
    const showLinkDialog = () => setLinkVisible(true);
    const hideLinkDialog = () => setLinkVisible(false);
    const [hyperlinkUrl, setHyperlinkUrl] = useState("");
    const [hyperlinkLabel, setHyperlinkLabel] = useState("");

    global.ShowHelpEditNotes = () => {
        Keyboard.dismiss();
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

    function updateNoteLocal(fieldName, text) {
        let tempNote = JSON.parse(JSON.stringify(note));
        tempNote[fieldName] = text;
        setNote(tempNote);
    }

    function onImageInsert(image) {
        const uri = image.uri;
        const imageHTML = "<img src=\"" + uri + "\">"
        const noteContent = note.content
        const newNoteContent = noteContent.slice(0, cursorPosition) + imageHTML + noteContent.slice(cursorPosition, noteContent.length)
        let tempNote = JSON.parse(JSON.stringify(note));
        tempNote.content = newNoteContent;
        setNote(tempNote);
        route.params.executeOnChange(route.params.index, 'content', newNoteContent)
        updateNote('content');
    }

    function onLinkInsert(label, url) {
        const linkHTML = "<a href =\"" + url + "\">" + label + "</a>"
        const noteContent = note.content
        const newNoteContent = noteContent.slice(0, cursorPosition) + linkHTML + noteContent.slice(cursorPosition, noteContent.length)
        let tempNote = JSON.parse(JSON.stringify(note));
        tempNote.content = newNoteContent;
        setNote(tempNote);
        route.params.executeOnChange(route.params.index, 'content', newNoteContent)
        updateNote('content');
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
        <Provider>
        <View style = {styles.totalContainer}>
            <KeyboardAwareScrollView>
            <View style = {styles.container}>
                <View style = {styles.borderTitle}>
                <Text style = {styles.headingTitle}>
                    Title
                </Text>
                </View>
                <View>
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
                    <Text style = {styles.helpMessage}>
                        If this is your first time editing a note then, before you start editing, please learn how to edit notes by clicking on the help icon in the
                        top right hand corner.
                    </Text>
                </View>
            </View>
            <View style = {styles.contentHeadingContainer}>
                <View style = {styles.contentHeadingSubContainer}>
                    <View style = {styles.border}>
                        <Text style = {styles.headingSubTitle}>
                            Write Content
                        </Text>
                    </View>
                </View>
                <View style = {styles.contentHeadingSubContainer}>
                    <View style = {styles.border}>
                        <Text style = {styles.headingSubTitle}>
                            Preview Content
                        </Text>
                    </View>
                </View>
            </View>
                <View style = {styles.contentHeadingContainer}>
                    <View style = {styles.contentHeadingSubContainer}>
                        <View style = {styles.noBorder}>
                            <TextInput // Content of the note (I think note should be shown multi-lined by default instead of one lined.
                                // onChangeText={(text) => setInputContent(text)}
                                multiline={true}
                                style = {Platform.OS === 'web' ? styles.contentInputWeb : styles.contentInput}
                                value = {note.content}
                                onSelectionChange={(event) => setCursorPosition(event.nativeEvent.selection.start)}
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
                                                    paddingRight: screenWidth * 0.010454688672168,
                                                    paddingBottom: screenHeight * 0.0106382978723404,
                                                    height: screenHeight * 0.4015957446808511
                                                }
                                                : null,
                                        ]}
                                        placeholder = {"Enter the note's content..."}
                                    />
                                )}
                            />
                        </View>
                    </View>
                    <View style = {styles.contentHeadingSubContainer}>
                        <View style = {styles.noBorder}>
                            <ScrollView
                                style = {styles.previewContainer}
                            >
                                <RenderHtml
                                    source={{
                                        html: note.content.replace(/(?:\r\n|\r|\n)/g, '<br>')
                                    }}
                                    contentWidth={screenWidth * 0.35}
                                />
                            </ScrollView>
                        </View>
                    </View>
                </View>
                <View style = {Platform.OS === 'web' ? styles.iconRowWeb : styles.iconRow}>
                    <Surface style={Platform.OS === 'web' ? styles.surface1Web : styles.surface1}>
                    <IconButton
                        icon = "image"
                        //style = {styles.insertButton}
                        size = {28}
                        onPress = {() => {
                            navigation.navigate('ImageSelector', {
                                comingFrom: "NotesScreen",
                                onImageChangeFirebase: onImageInsert,
                                groupRef: route.params.groupRef,
                            })
                        }
                        }
                    />
                    </Surface>
                    <Surface style={Platform.OS === 'web' ? styles.surface2Web : styles.surface2}>
                    <IconButton
                        icon = "link"
                        //style = {styles.insertButton}
                        size = {28}
                        onPress = {() => {
                            showLinkDialog()
                        }}
                    />
                    </Surface>
                </View>
            </KeyboardAwareScrollView>
            <Portal>
                <Dialog
                    visible={linkVisible}
                    onDismiss={hideLinkDialog}
                    style={Platform.OS === 'ios' ? styles.shareWindowIOS : styles.shareWindow}
                >
                    <Dialog.Title
                        style={styles.shareTitle}>Insert a link</Dialog.Title>
                    <Dialog.Content>
                        <TextInput
                            label="Hyperlink label" // Label of the text input
                            placeholder={"Please enter a new hyperlink label..."}
                            style={styles.input1}
                            onChangeText={(name) => setHyperlinkLabel(name)} // userEmail is the new text when the text is changed, set email to this. Then value will be changed too.
                        />
                        <TextInput
                            label="Hyperlink url" // Label of the text input
                            placeholder={"Please enter a new hyperlink url..."}
                            style={styles.input2}
                            onChangeText={(name) => setHyperlinkUrl(name)} // userEmail is the new text when the text is changed, set email to this. Then value will be changed too.
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <View style={styles.buttonContainer}>
                                <Button
                                    mode="contained"
                                    style={styles.button1}
                                    disabled={hyperlinkUrl.length === 0 || hyperlinkLabel.length === 0}
                                    onPress={() => {
                                        onLinkInsert(hyperlinkLabel, hyperlinkUrl)
                                        hideLinkDialog()
                                    }}
                                >
                                    Insert
                                </Button>
                                <View style={styles.gap}/>
                                <Button
                                    mode="contained"
                                    style={styles.button2}
                                    onPress={hideLinkDialog}
                                >
                                    Cancel
                                </Button>
                        </View>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
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
                            Edit Notes Screen Help
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
                            - In this screen you can edit a note. You can edit it's title in the title text input at the top left corner of the screen. It's content
                            can be edited using the 'Write Content' text input below the 'Title' text input. {'\n\n'}

                            - When editing the notes content, whatever you write will be parsed as HTML. To write text in the note without any stylisation you don't need to write any
                            HTML code because in HTML free standing text (i.e. plain text with no HTML code (e.g. "Hello World")) will be processed correctly (will show as plain text).
                            {'\n\n'}

                            - There is an image icon and a link icon in the bottom left hand corner underneath the 'write content' text input. Clicking the image icon will take you to a screen where you can upload and pick
                            an image. When the image is picked you will be taken back to this screen and the image will be embedded into the note. It will be embedded by inserting
                            an &lt;img&gt; HTML tag. If you wish to delete the embedded image then you will need to delete this img tag (HTML tags finish with a "&gt;").{'\n\n'}

                            - Clicking the link icon will show a dialog where you can enter the hyperlink label and url and once submitted the hyperlink will be inserted via inserting an
                            &lt;a&gt; HTML tag. If you wish to delete the hyperlink then you will need to delete the &lt;a&gt; tag.{'\n\n'}

                            - Further stylisation can be applied by using other HTML tags. For example if you want to make text italic then you can wrap it in &lt;i&gt;&lt;/i&gt; (e.g. &lt;i&gt;Hello World&lt;/i&gt;). If you wanted to make the text a header you could wrap it
                            in &lt;h1&gt;&lt;/h1&gt; (e.g. &lt;h1&gt;Hello World&lt;/h1&gt;). {'\n'}{'\n'}

                            - Whenever you press the enter key when editing the notes content a hidden &lt;br&gt; tag will be automatically inserted (&lt;br&gt; is
                            the line break tag in HTML) and these tags will be deleted if the line breaks are deleted. So you do not have to worry about manually
                            inserting line breaks (though, if you want to, you can add additional line breaks by writing &lt;br&gt; tags).
                        </Text>
                    </Dialog.Content>
                </Dialog>
            </Portal>
        </View>
</Provider>
    )
}

const styles = StyleSheet.create({
    shareTitle: {
        textAlign: 'center',
        alignSelf: 'center'
    },
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
    body: {
        marginTop: screenHeight * 0.05,
        marginLeft: screenWidth * 0.02,
        marginRight: screenWidth * 0.02,
        fontSize: 16
    },
    iconRowWeb: {
        flexDirection: 'row',
        marginLeft: screenWidth * 0.0575,
        marginTop: screenHeight * -0.058
    },
    surface1Web: {
        elevation: 4,
        marginBottom: screenHeight * 0.0026595744680851,
        marginTop: screenHeight * 0.0026595744680851,
        marginLeft: screenWidth * 0.005709377344336,
        marginRight: screenWidth * 0.0037509377344336,
        backgroundColor: "#ebebeb"
    },
    surface2Web: {
        elevation: 4,
        marginBottom: screenHeight * 0.0026595744680851,
        marginTop: screenHeight * 0.0026595744680851,
        marginLeft: screenWidth * -0.003309377344336,
        marginRight: screenWidth * 0.0037509377344336,
        backgroundColor: "#ebebeb"
    },
    iconRow: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: screenHeight * 0.111,
        left: screenWidth * 0.0575,
    },
    surface1: {
        elevation: 4,
        marginBottom: screenHeight * 0.0026595744680851,
        marginTop: screenHeight * 0.0026595744680851,
        marginLeft: screenWidth * 0.005709377344336,
        marginRight: screenWidth * 0.0037509377344336,
        backgroundColor: "#c9dfff"
    },
    surface2: {
        elevation: 4,
        marginBottom: screenHeight * 0.0026595744680851,
        marginTop: screenHeight * 0.0026595744680851,
        marginLeft: screenWidth * -0.003309377344336,
        marginRight: screenWidth * 0.0037509377344336,
        backgroundColor: "#c9dfff",
    },
    helpFAB: {
        //Absolute so it ignores it's parents positioning and instead is positioned bottom left corner with a margin of 20.
        backgroundColor: colors.primary,
        marginLeft: screenWidth * -0.0450037509377344,
        position: 'absolute',
        left: screenWidth * 0.0630150037509377,
        bottom: screenHeight * 0.0128510638297872
    },
    helpFABWeb: {
        //Absolute so it ignores it's parents positioning and instead is positioned bottom left corner with a margin of 20.
        backgroundColor: colors.primary,
        marginLeft: screenWidth * -0.0450037509377344,
        position: 'absolute',
        left: screenWidth * 0.0600150037509377,
        bottom: screenHeight * 0.018510638297872
    },
    helpMessage: {
        width: screenWidth * 0.37,
        position: 'absolute',
        left: screenWidth * 0.063,
        top: screenHeight * -0.018,
        textAlign: 'center',
        fontSize: 16,
    },
    input1: {
      marginBottom: screenHeight * 0.03
    },
    input2: {
        marginBottom: screenHeight * -0.01
    },
    shareWindow: {
        width: "50%",
        marginTop: screenHeight * 0.025,
        alignSelf: 'center'
    },
    shareWindowIOS: {
        width: "50%",
        marginTop: screenHeight * -0.455,
        alignSelf: 'center'
    },
    faqWindow: {
        width: "80%",
        height: "80%",
        marginTop: screenHeight * 0.025,
        alignSelf: 'center'
    },
    centerTitle: {
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 32
    },
    backButton: {
        flex: 1,
        alignSelf: 'center'
    },
    headingRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: screenHeight * 0.04,
        marginTop: screenHeight * 0.030,
        marginLeft: screenWidth * 0.011
    },
    previewContainer: {
        height: screenHeight * 0.6265957446808511,
        width: "100%",
        borderRadius: 4,
        paddingLeft: screenWidth * 0.010454688672168,
        paddingRight: screenWidth * 0.010754688672168,
        backgroundColor: "#e4e4e4"
    },
    contentHeadingContainer: {
      flexDirection: 'row'
    },
    anotherHeadingContentTitle: {
        marginTop: screenHeight * 0.0165957446808511,
        marginBottom: screenHeight * 0.0165957446808511,
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: screenWidth * 0.445957446808511,
        alignSelf: 'center'
    },
    contentHeadingSubContainer: {
        flex: 1,
        alignItems: 'center'
    },
    headingSubTitle: {
        marginBottom: screenHeight * 0.0165957446808511,
        fontSize: 16,
        fontWeight: 'bold',
    },
    headingSubTitle2: {
        marginTop: screenHeight * 0.025957446808511,
        marginBottom: screenHeight * 0.0085957446808511,
        fontSize: 16,
        fontWeight: 'bold',
    },
    border: {
        width: "75%",
        textAlign: 'center',
        alignItems: 'center'
    },
    borderTitle: {
        width: "38%",
        marginLeft: screenWidth * -0.5,
        textAlign: 'center',
        alignItems: 'center'
    },
    noBorder: {
        width: "75%",
        textAlign: 'center',
        alignItems: 'center'
    },
    headingName: {
        marginBottom: screenHeight * 0.0165957446808511,
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: screenWidth * 0.4575957446808511,
    },
    headingTitle: {
        marginBottom: screenHeight * 0.0165957446808511,
        fontSize: 16,
        fontWeight: 'bold',
    },
    headingContentTitle: {
        marginTop: screenHeight * 0.0165957446808511,
        marginBottom: screenHeight * 0.0165957446808511,
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: screenWidth * 0.445957446808511,
    },
    gap: {
        width: screenWidth * 0.0690037509377344
    },
    container: {
        alignItems: 'center',
    },
    totalContainer: {
        width: "100%",
        height: "100%",
        marginTop: screenHeight * 0.0165957446808511,
    },
    buttonContainer: {
        flexDirection: 'row',
        width: "100%"
    },
    titleInput: {
        width: screenWidth * 0.38,
        marginLeft: screenWidth * -0.44,
        marginBottom: screenHeight * 0.0265957446808511,
    },
    contentInputWeb: {
        width: "100%",
        marginBottom: screenHeight * 0.0415957446808511,
        height: screenHeight * 0.5715957446808511
    },
    contentInput: {
        width: "100%",
        marginBottom: screenHeight * 0.0415957446808511,
        height: screenHeight * 0.4415957446808511
    },
    button1: {
        width: screenWidth * 0.15037509377344,
        marginLeft: screenWidth * 0.06,
        marginBottom: screenHeight * 0.025
    },
    button2: {
        width: screenWidth * 0.15037509377344,
        marginBottom: screenHeight * 0.025
    },
})
