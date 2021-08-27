import {Button, Dialog, FAB, IconButton, Portal, Provider, Text, TextInput, Title, Surface} from "react-native-paper";
import React, {useContext, useEffect, useRef, useState} from "react";
import {
    Dimensions,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    TextInput as NativeTextInput,
    View
} from "react-native";
import {AuthUserContext} from "../navigation/AuthUserProvider";
import Spinner from "../components/Spinner";
import RenderHtml from 'react-native-render-html';
import colors from "../utils/colors";

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
            <KeyboardAvoidingView
                behavior = {"height"}
                keyboardVerticalOffset = {screenHeight * -0.2925531914893617}
            >
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
                        If this is your first time editing a note then, before you start editing, please learn how to edit notes by clicking on the help icon in the bottom left hand corner.
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
                                style = {styles.contentInput}
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
                <FAB
                    style={styles.helpFAB}
                    small icon="help"
                    onPress={() => {
                        showHelpDialog()
                    }}
                />
                <View style = {styles.iconRow}>
                    <Surface style={styles.surface1}>
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
                    <Surface style={styles.surface2}>
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
                <View style = {styles.emptyGap}/>
            </KeyboardAvoidingView>
            <Portal>
                <Dialog
                    visible={helpVisible}
                    onDismiss={() => {
                        hideHelpDialog()
                    }}
                    style = {styles.faqWindow}
                >
                    <View style = {styles.headingRow}>
                        <IconButton
                            icon="keyboard-backspace" //Getting the back icon image
                            size={36} //Setting the size
                            color="#6646ee" //And the color
                            style = {styles.backButton}
                            onPress={() => {
                                hideHelpDialog()
                            }}
                        />
                        <View style = {styles.centerTitle}>
                            <Title
                                style = {styles.helpTitle}
                            >
                                Information about Editing Notes
                            </Title>
                        </View>
                    </View>
                    <Text style = {styles.body}>
                        When editing the notes content, whatever you write will be parsed as HTML. To write text in the note without any stylisation you don't need to write any HTML code
                        because in HTML free standing text (i.e. plain text with no HTML code (e.g. "Hello World")) will be processed correctly. {'\n'}{'\n'}There is an image icon and a link icon in
                        the bottom left hand corner underneath the 'write content' text input. Clicking the image icon will take you to a screen where you can upload and pick
                        an image. When the image is picked you will be taken back to this screen and the image will be embedded into the note. It will be embedded by inserting
                        an &lt;img&gt; HTML tag. If you wish to delete the embedded image then you will need to delete this img tag (HTML tags finish with a "&gt;"). Clicking the link
                        icon will show a dialog where you can enter the hyperlink label and url and once submitted the hyperlink will be inserted via inserting an 'a' HTML tag. If
                        you wish to delete the hyperlink then you will need to delete the 'a' tag. {'\n'}{'\n'}Further stylisation can be applied by using other HTML tags. For example if you want
                        to make text italic then you can wrap it in &lt;i&gt;&lt;/i&gt; (e.g. &lt;i&gt;Hello World&lt;/i&gt;). If you wanted to make the text a header you could wrap it
                        in &lt;h1&gt;&lt;/h1&gt; (e.g. &lt;h1&gt;Hello World&lt;/h1&gt;). {'\n'}{'\n'}Whenever you press the enter key when editing the notes content a hidden &lt;br&gt; tag will
                        be automatically inserted (&lt;br&gt; is the line break tag in HTML) and these tags will be deleted if the line breaks are deleted. So you do not have to worry
                        about manually inserting line breaks (though you can add line breaks that way if you would like).
                    </Text>
                </Dialog>
            </Portal>
            <Portal>
                <Dialog
                    visible={linkVisible}
                    onDismiss={hideLinkDialog}
                    style={styles.shareWindow}
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
        </View>
</Provider>
    )
}

const styles = StyleSheet.create({
    body: {
        marginTop: screenHeight * 0.05,
        marginLeft: screenWidth * 0.02,
        marginRight: screenWidth * 0.02,
        fontSize: 16
    },
    surface1: {
        elevation: 4,
        marginBottom: screenHeight * 0.0026595744680851,
        marginTop: screenHeight * 0.0026595744680851,
        marginLeft: screenWidth * 0.005709377344336,
        marginRight: screenWidth * 0.0037509377344336,
        backgroundColor: "#ebebeb"
    },
    surface2: {
        elevation: 4,
        marginBottom: screenHeight * 0.0026595744680851,
        marginTop: screenHeight * 0.0026595744680851,
        marginLeft: screenWidth * -0.003309377344336,
        marginRight: screenWidth * 0.0037509377344336,
        backgroundColor: "#ebebeb"
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
    helpTitle: {
        alignSelf: 'center',
        fontSize: 23
    },
    helpFAB: {
        //Absolute so it ignores it's parents positioning and instead is positioned bottom left corner with a margin of 20.
        backgroundColor: colors.primary,
        marginLeft: screenWidth * -0.0450037509377344,
        position: 'absolute',
        left: screenWidth * 0.0600150037509377,
        bottom: screenHeight * 0.3058510638297872
        // marginRight: screenWidth * 0.0150037509377344,
        // marginTop: screenHeight * 0.0265957446808511,
        // marginBottom: screenHeight * 0.0265957446808511,
    },
    iconRow: {
        flexDirection: 'row',
        marginLeft: screenWidth * 0.0575,
        marginTop: screenHeight * -0.045
    },
    previewContainer: {
        height: screenHeight * 0.5715957446808511,
        width: "100%",
        borderRadius: 4,
        paddingLeft: screenWidth * 0.010454688672168,
        paddingRight: screenWidth * 0.010754688672168,
        backgroundColor: "#e4e4e4"
    },
    emptyGap: {
        height: screenHeight * 0.3
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
    contentInput: {
        width: "100%",
        marginBottom: screenHeight * 0.0415957446808511,
        height: screenHeight * 0.5715957446808511
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
