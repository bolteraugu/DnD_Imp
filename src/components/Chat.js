import React, {useState, useEffect, useContext} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {AuthUserContext} from '../navigation/AuthUserProvider';
import {
    ActivityIndicator,
    StyleSheet,
    View,
    Platform,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView, Image, TouchableOpacity
} from 'react-native';
import {
    IconButton,
    Button,
    Portal,
    Dialog,
    Menu,
    Provider,
    TextInput, Text,
} from 'react-native-paper';
import {GiftedChat, Bubble, Send, Composer, MessageImage, Message} from 'react-native-gifted-chat';
import firebase from 'firebase';
import 'firebase/firestore';
import Lightbox from 'react-native-lightbox'
import DropDown from "react-native-paper-dropdown";
import CheckboxCustom from "./CheckboxCustom";

global.screenWidth = Dimensions.get("window").width;
global.screenHeight = Dimensions.get("window").height;

export default function Chat({groupRef, navigation, showImage, itemsT, isDM, userPermissions}) {

    // eslint-disable-next-line no-unused-vars
    const [recipients, setRecipients] = useState("");
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [select, setSelect] = useState(false);

    const [visible, setVisible] = React.useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);
    const [inputVal, setInputVal] = useState('');

    const {user} = useContext(AuthUserContext);
    const currentUser = user.toJSON();
    const [messages, setMessages] = useState([]);
    const [messagesCopy, setMessagesCopy] = useState([]);
    const [chatImage, setChatImage] = React.useState("");
    const [chatImageName, setChatImageName] = React.useState("");
    const [items, setItems] = useState(itemsT);
    const [showDropDown, setShowDropDown] = useState(false);
    const showSearchDialog = () => setSearchVisible(true);
    const hideSearchDialog = () => setSearchVisible(false);
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [deleteVisible, setDeleteVisible] = useState(false); //Whether the data is loading
    const showDeleteDialog = () => setDeleteVisible(true);
    const hideDeleteDialog = () => setDeleteVisible(false);

    useEffect(() => {
        groupRef.get().then(
            (group) => {
                let receip = "";
                let mems = group.data().members;
                setMembers(group.data().members);
                for (let i = 0; i < mems.length; i++) {
                    if (i === mems.length-1) {
                        receip = receip + "," + mems[i];
                    }
                    else {
                        receip = receip + "," + mems[i];
                    }
                    setRecipients(receip);
                }
            },
            (error) => {
                alert(error);
            }
        );
    }, []);

    useEffect(() => {
        groupRef.collection('members').doc(currentUser.email).onSnapshot((snapshot) => {
            setChatImage(snapshot.get('chatImage'));
            setChatImageName(snapshot.get('actualImageName'));
        })
        const messagesListener = groupRef
            .collection('messages')
            .where('recipients', 'array-contains', user.toJSON().email)
            .orderBy('createdAt', 'desc')
            .onSnapshot(
                (querySnapshot) => {
                    const messages = querySnapshot.docs.map((doc) => {
                        const firebaseData = doc.data();

                        const data = {
                            _id: doc.id,
                            createdAt: new Date().getTime(),
                            text: '',
                            ...firebaseData,
                        };

                        if (!firebaseData.system) {
                            data.user = {
                                ...firebaseData.user,
                                name: firebaseData.user.email,
                            };
                        }

                        return data;
                    });

                    setMessages(messages);
                    setMessagesCopy(messages);
                    if (loading) {
                        setLoading(false);
                    }
                },
                (error) => {
                    alert(error);
                }
            );

        return messagesListener;
    }, []);

    function applySearch() {
        let newMessages = [];
        for (let i = 0; i < messagesCopy.length; i++) {
            if (!messagesCopy[i].deletedOrMissing && messagesCopy[i].text.includes(searchTerm)) {
                newMessages.push(messagesCopy[i])
                console.log(messagesCopy[i])
            }
        }
        setMessages(newMessages);
    }

    function handleSend(messages) {
        const text = messages[0].text;
        let recipientsValues = recipients.split(',');
        recipientsValues.shift();

        groupRef
            .collection('messages')
            .add({
                text,
                image: '',
                createdAt: new Date().getTime(),
                deletedOrMissing: false,
                imageName: '',
                user: {
                    _id: currentUser.uid,
                    email: currentUser.email,
                    avatar: chatImage
                },
                recipients: recipientsValues,
            })
            .then(console.log('Message sent: ' + text), (error) => {
                alert(error);
            });
    }

    function updateChatFirebase(image, chatImage, imageName) {
        let recipientsValues = recipients.split(',');
        recipientsValues.shift();
        groupRef
            .collection('messages')
            .add({
                text: "",
                image: image,
                imageName: imageName,
                deletedOrMissing: false,

                createdAt: new Date().getTime(),
                user: {
                    _id: currentUser.uid,
                    email: currentUser.email,
                    avatar: chatImage
                },
                recipients: recipientsValues,
            })
            .then(console.log('Image sent'), (error) => {
                alert(error);
            });
    }

    function renderMessage(props) {
        return (
                <Message
                    {...props}
                    position={props.currentMessage.user.email === currentUser.email ? 'right' : 'left'}
                />
        );
    }

    function renderMessageImage(props) {
        return (
            // <MessageImage
            //     {...props}
            //     imageStyle={{
            //         width: screenWidth * 0.29,
            //         height: screenHeight * 0.29,
            //         resizeMode: "center"
            //     }}
            // />
            <TouchableOpacity
                activeOpacity={1}
                onPress = {() => {
                    showImage(props.currentMessage.image, props.currentMessage.imageName)
                }}
            >
                <Image
                    style={styles.image}
                    source={{ uri: props.currentMessage.image }}
                />
            </TouchableOpacity>
        );
    }

    function renderBubble(props) {
        if (!props.currentMessage.deletedOrMissing) {
            if (Platform.OS === 'web') {
                if (props.currentMessage.user.email === currentUser.email) {
                    return (
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Bubble
                                {...props}
                                renderMessageImage={renderMessageImage}
                                position={props.currentMessage.user.email === currentUser.email ? 'right' : 'left'}
                                wrapperStyle={{
                                    right: {
                                        backgroundColor: '#6646ee',
                                        maxWidth: "75%"
                                    },
                                }}
                                textStyle={{
                                    right: {
                                        color: '#fff'
                                    },
                                }}
                            />
                            <CheckboxCustom
                                select={select}
                                add={() => {
                                    if (global.selectedMsgs === []) {
                                        global.selectedMsgs = [props.currentMessage]
                                    }
                                    else {
                                        global.selectedMsgs = [...selectedMsgs, props.currentMessage];
                                    }
                                }}
                                remove={() => {
                                    let selectedMsgsTemp = [];
                                    for (let i = 0; i < global.selectedMsgs.length; i++) {
                                        if(global.selectedMsgs[i]._id !== props.currentMessage._id) {
                                            selectedMsgsTemp.push(global.selectedMsgs[i]);
                                        }
                                    }
                                    global.selectedMsgs = selectedMsgsTemp;
                                }}
                            />
                        </View>
                    );
                }
                else {
                    return (
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            {
                                isDM ? <CheckboxCustom
                                    select={select}
                                    add={() => {
                                        if (global.selectedMsgs === []) {
                                            global.selectedMsgs = [props.currentMessage]
                                        }
                                        else {
                                            global.selectedMsgs = [...selectedMsgs, props.currentMessage];
                                        }
                                    }}
                                    remove={() => {
                                        let selectedMsgsTemp = [];
                                        for (let i = 0; i < global.selectedMsgs.length; i++) {
                                            if(global.selectedMsgs[i]._id !== props.currentMessage._id) {
                                                selectedMsgsTemp.push(global.selectedMsgs[i]);
                                            }
                                        }
                                        global.selectedMsgs = selectedMsgsTemp;
                                    }}
                                /> : null
                            }

                            <Bubble
                                {...props}
                                renderMessageImage={renderMessageImage}
                                position={props.currentMessage.user.email === currentUser.email ? 'right' : 'left'}
                                wrapperStyle={{
                                    left: {
                                        maxWidth: "75%"
                                    },
                                }}
                                textStyle={{
                                    right: {
                                        color: '#fff',
                                    },
                                }}
                            />
                        </View>
                    );
                }
            }
            else {
                if (props.currentMessage.user.email === currentUser.email) {
                    return (
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Bubble
                                {...props}
                                position={props.currentMessage.user.email === currentUser.email ? 'right' : 'left'}
                                wrapperStyle={{
                                    right: {
                                        backgroundColor: '#6646ee',
                                    },
                                }}
                                textStyle={{
                                    right: {
                                        color: '#fff',
                                    },
                                }}
                            />
                            <CheckboxCustom
                                select={select}
                                add={() => {
                                    if (global.selectedMsgs === []) {
                                        global.selectedMsgs = [props.currentMessage]
                                    }
                                    else {
                                        global.selectedMsgs = [...selectedMsgs, props.currentMessage];
                                    }
                                }}
                                remove={() => {
                                    let selectedMsgsTemp = [];
                                    for (let i = 0; i < global.selectedMsgs.length; i++) {
                                        if(global.selectedMsgs[i]._id !== props.currentMessage._id) {
                                            selectedMsgsTemp.push(global.selectedMsgs[i]);
                                        }
                                    }
                                    global.selectedMsgs = selectedMsgsTemp;
                                }}
                            />
                        </View>
                    );
                }
                else {
                    return (
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            {
                                isDM ?
                                    <CheckboxCustom
                                        select={select}
                                        add={() => {
                                            if (global.selectedMsgs === []) {
                                                global.selectedMsgs = [props.currentMessage]
                                            }
                                            else {
                                                global.selectedMsgs = [...selectedMsgs, props.currentMessage];
                                            }
                                        }}
                                        remove={() => {
                                            let selectedMsgsTemp = [];
                                            for (let i = 0; i < global.selectedMsgs.length; i++) {
                                                if(global.selectedMsgs[i]._id !== props.currentMessage._id) {
                                                    selectedMsgsTemp.push(global.selectedMsgs[i]);
                                                }
                                            }
                                            global.selectedMsgs = selectedMsgsTemp;
                                        }}
                                    /> : null
                            }
                            <Bubble
                                {...props}
                                position={props.currentMessage.user.email === currentUser.email ? 'right' : 'left'}
                                wrapperStyle={{
                                    right: {
                                        backgroundColor: '#6646ee',
                                    },
                                }}
                                textStyle={{
                                    right: {
                                        color: '#fff',
                                    },
                                }}
                            />
                        </View>
                    );
                }
            }
        }
        else {
            return (
                <Bubble
                    {...props}
                    position = {props.currentMessage.user.email === currentUser.email ? 'right' : 'left'}
                    wrapperStyle={{
                        left: {
                            backgroundColor: '#d6d6d6',
                        },
                        right: {
                            backgroundColor: '#d6d6d6',
                        },
                    }}
                    textStyle={{
                        left: {
                            color: '#000000',
                            fontStyle: 'italic'
                        },
                        right: {
                            color: '#000000',
                            fontStyle: 'italic'
                        }
                    }}
                    timeTextStyle={{ left: { color: 'black' },right: { color:'black'} }}
                />
            );
        }

    }

    function renderComposer(props) {
        return (
            <View style = {styles.horzRow}>
                <Composer
                    {...props}
                    disableComposer={recipients.length === 0}
                />
                <View style = {{flexDirection: 'row', width: "20%"}}>
                    <IconButton
                        icon="magnify"
                        size={32}
                        color="#000000"
                        disabled={recipients.length === 0}
                        style = {styles.searchButton}
                        onPress = {() => {
                            showSearchDialog();
                        }}
                    />
                    <IconButton
                        icon="image"
                        size={32}
                        color="#000000"
                        disabled={recipients.length === 0}
                        style = {styles.imageButton}
                        onPress = {() => {
                            navigation.navigate('ImageSelector', {
                                comingFrom: "Chat",
                                chatImage: chatImage,
                                updateChatFirebase: updateChatFirebase,
                                groupRef: groupRef,
                            })
                        }}
                    />
                </View>
            </View>
        );
    }

    function renderLoading() {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6646ee" />
            </View>
        );
    }

    function ButtonContainer() {
            if (select) {
                return (
                    <View
                        style={styles.buttonContainer}
                    >
                        <Button
                            mode={"contained"}
                            style={styles.button}
                            onPress={() => {
                                setMessages(JSON.parse(JSON.stringify(messages)));
                                setSelect(!select)
                            }}
                        >
                            Disable message selection
                        </Button>
                        <Button
                            style={styles.dmButton}
                            mode={"contained"}
                            onPress={() => {
                                showDeleteDialog();
                            }}
                        >
                            Delete selected messages
                        </Button>
                    </View>
                )
            }
            else {
                return (
                    <View
                        style={styles.buttonContainer}
                    >
                        <Button
                            mode={"contained"}
                            style={styles.button}
                            onPress={() => {
                                setMessages(JSON.parse(JSON.stringify(messages)));
                                setSelect(!select)
                            }}
                        >
                            Enable message selection
                        </Button>
                    </View>
                )
            }
    }

    function SearchBar() {
        if (searchTerm.length === 0) {
            return null;
        }
        else {
            return (
                <View style = {styles.searchButtonContainer}>
                    <Button
                        color="#000"
                        onPress={() => {
                            setSearchTerm(searchTerm);
                            showSearchDialog();
                        }}
                    >
                        Edit Search
                    </Button>
                    <View style = {{width: screenWidth * 0.02}}/>
                    <Button
                        color="#000"
                        onPress={() => {
                            setSearchTerm("");
                            setMessages(messagesCopy);
                        }}
                    >
                        Clear Search
                    </Button>
                </View>
            );
        }
    }

    return (
        <Provider>
            <View style={styles.chatContainer}>
                <View style={styles.recipientsContainer}>
                    <View style = {isDM || userPermissions.addRecipients ? styles.dropDownContainerDM : styles.dropDownContainer}>
                        {items != null ?
                        <DropDown
                            label={"Select Recipients..."}
                            list={items}
                            visible={showDropDown}
                            showDropDown={() => setShowDropDown(true)}
                            onDismiss={() => setShowDropDown(false)}
                            multiSelect
                            dropDownStyle={styles.shareDropdown}
                            setValue={setRecipients}
                            value={recipients}
                        /> : null
                        }
                    </View>
                    {isDM || userPermissions.addRecipients ?
                        <IconButton
                            icon="account-multiple-plus"
                            size={28}
                            color="#000"
                            onPress={() => {
                                showDialog();
                            }}
                        />
                        :
                        null
                    }
                    <Portal>
                        <Dialog visible={visible} onDismiss={hideDialog} style = {styles.addWindow}>
                            <Dialog.Title>Add a User to the Group</Dialog.Title>
                            <Dialog.Content>
                                <TextInput
                                    onChangeText={(text) => setInputVal(text)}
                                    label="User's Email"
                                />
                            </Dialog.Content>
                            <Dialog.Actions>
                                <View style = {styles.buttonContainerAddDialog}>
                                    <Button
                                        mode="contained"
                                        style={styles.searchButtonDialog}
                                        disabled = {inputVal.length === 0}
                                        onPress={() => {
                                            groupRef
                                                .update({
                                                    members:
                                                        firebase.firestore.FieldValue.arrayUnion(inputVal),
                                                        numMembers: firebase.firestore.FieldValue.increment(1),
                                                }).then(() => {
                                                groupRef.collection('members').doc(inputVal).set({
                                                    isDM: false,
                                                    chatImage: "https://firebasestorage.googleapis.com/v0/b/improving-dungeon-minion-5e.appspot.com/o/default_character.png?alt=media&token=84c93a85-ce56-45a7-9b01-0df6",
                                                    actualImageName: "default_character.png",
                                                    imageUUID: ""
                                                })
                                            })
                                                .then(() => {
                                                    hideDialog();
                                                    let itemsCopy;
                                                    if (items != null) {
                                                        itemsCopy = JSON.parse(JSON.stringify(items));
                                                        itemsCopy.push({
                                                            value: inputVal, label: inputVal
                                                        })
                                                    }
                                                    else {
                                                        itemsCopy = [];
                                                        itemsCopy.push({
                                                            value: inputVal, label: inputVal
                                                        });
                                                    }

                                                    setItems(itemsCopy);
                                                    let recipientsValues = recipients.split(',');
                                                    if (members.length === recipientsValues.length) {
                                                        setRecipients(JSON.parse(JSON.stringify(recipients)) + "," + inputVal);
                                                    }
                                                    setMembers([...members, inputVal]);
                                                });
                                        }}
                                    >
                                        Add
                                    </Button>
                                    <View style={styles.space} />
                                    <Button
                                        mode="contained"
                                        style={styles.searchButtonDialog}
                                        onPress={() => {
                                            hideDialog();
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </View>
                            </Dialog.Actions>
                        </Dialog>
                        <Dialog
                            visible={searchVisible}
                            onDismiss={hideSearchDialog}
                            style = {styles.searchWindow}
                        >
                            <View style = {styles.searchTitleContainer}>
                                <Dialog.Title>
                                    Search Chat
                                </Dialog.Title>
                            </View>
                            <TextInput
                                style={styles.searchBar}
                                label="Search"
                                placeholder={"Enter search term..."}
                                value={searchTerm}
                                autoCapitalize={false}
                                onChangeText={(text) =>
                                    setSearchTerm(text)
                                }
                            />
                            <Dialog.Actions>
                                <View style = {styles.buttonContainerDialog}>
                                    <Button
                                        mode="contained"
                                        style={styles.searchButtonDialog}
                                        disabled={searchTerm == null || searchTerm.length === 0}
                                        onPress={() => {
                                            hideSearchDialog();
                                            applySearch();
                                        }}
                                    >
                                        Submit
                                    </Button>
                                    <View style={styles.space} />
                                    <Button
                                        mode="contained"
                                        style={styles.searchButtonDialog}
                                        onPress={() => {
                                            setSearchTerm("");
                                            hideSearchDialog();
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </View>
                            </Dialog.Actions>
                            <View/>
                        </Dialog>
                            <Dialog
                                visible={deleteVisible}
                                onDismiss={hideDeleteDialog}
                                style={styles.assignWindow}
                            >
                                <Dialog.Title
                                    style={styles.assignTitle}
                                >
                                    Are you sure you want to delete these chat messages?
                                </Dialog.Title>
                                <Dialog.Content>
                                    <Text
                                        style={styles.assignTitle}
                                    >
                                        NOTE: If you delete these chat messages you will not be able to recover them.
                                    </Text>
                                </Dialog.Content>
                                <Dialog.Actions>
                                    <View style={styles.assignButtonContainer}>
                                        <Button
                                            mode="contained"
                                            style={styles.assignButton}
                                            onPress={() => {
                                                let messagesTemp = [];
                                                let selectedMsgsIDs = [];
                                                for (let i = 0; i < global.selectedMsgs.length; i++) {
                                                    selectedMsgsIDs.push(global.selectedMsgs[i]._id);
                                                }
                                                for (let j = 0; j < messages.length; j++) {
                                                    if (!selectedMsgsIDs.includes(messages[j]._id)) {
                                                        messagesTemp.push(messages[j])
                                                        setMessages(messagesTemp);
                                                    }
                                                    else {
                                                        groupRef.collection('messages').doc(messages[j]._id).get().then((snapshot) => {
                                                            if (snapshot.get('image') === '') {
                                                                groupRef.collection('messages').doc(snapshot.id).update({
                                                                    deletedOrMissing: true,
                                                                    text: "This message has been deleted",
                                                                })
                                                            }
                                                            else {
                                                                groupRef.collection('messages').doc(snapshot.id).update({
                                                                    deletedOrMissing: true,
                                                                    text: "This image has been deleted",
                                                                    image: ''
                                                                })
                                                            }

                                                        })
                                                    }
                                                }
                                                global.selectedMsgs = [];
                                                setMessages(messagesTemp);
                                                hideDeleteDialog();
                                            }}
                                        >
                                            Yes
                                        </Button>
                                        <View style={styles.assignGap}/>
                                        <Button
                                            mode="contained"
                                            style={styles.assignButton}
                                            onPress={hideDeleteDialog}
                                        >
                                            No
                                        </Button>
                                    </View>
                                </Dialog.Actions>
                            </Dialog>
                    </Portal>
                </View>
                <SearchBar/>
                <GiftedChat
                    messages={messages}
                    onSend={handleSend}
                    user={{_id: currentUser.uid}}
                    renderBubble={renderBubble}
                    placeholder= {recipients.length === 0 ? "Chat disabled. Please select recipients." : "Type your message here..."}
                    showUserAvatar
                    onPressAvatar={() => {
                        showImage(chatImage, chatImageName)
                    }}
                    renderMessage={renderMessage}
                    renderLoading={renderLoading}
                    renderComposer = {renderComposer}
                />
                {Platform.OS === "android" && <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={screenHeight * 0.11} />}
                <ButtonContainer/>

            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    assignGap: {
        width: screenWidth * 0.04
    },
    assignWindow: {
        width: screenWidth * 0.525,
        alignSelf: 'center',
        marginTop: screenHeight * -0.1663829787234
    },
    assignTitle: {
        alignSelf: 'center'
    },
    assignButtonContainer: {
        justifyContent: 'center',
        marginBottom: screenHeight * 0.020363829787234,
        width: "100%",
        flexDirection: 'row',
    },
    assignButton: {
        width: screenWidth * 0.1
    },
    addWindow: {
        marginTop: screenHeight * -0.323829787234,
        width: "70%",
        alignSelf: 'center',
        paddingBottom: screenHeight * 0.02
    },
    space: {
        width: screenWidth * 0.0225056264066017,
        height: screenHeight * 0.0398936170212766,
    },
    buttonContainerDialog: {
        width: "100%",
        flexDirection: 'row',
        marginTop: screenHeight * 0.015,
        justifyContent: 'center'
    },
    buttonContainerAddDialog: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'center'
    },
    searchBar: {
        width: "90%",
        marginLeft: screenWidth * 0.02425
    },
    searchTitleContainer: {
        width: "100%",
        alignItems: 'center'
    },
    searchWindow: {
        width: "50%",
        alignSelf: 'center',
        marginTop: screenHeight * -0.323829787234,
        paddingBottom: screenHeight * 0.02
    },
    searchButtonDialog: {
        width: "25%"
    },
    searchButtonContainer: {
        flexDirection: 'row',
        marginLeft: screenWidth * 0.041,
        marginTop: screenHeight * 0.002
    },
    closeButton: {
        position: 'absolute',
        left: screenWidth * 0.3,
        top: screenHeight * -0.0035
    },
    button: {
        marginLeft: screenWidth * 0.015,
        marginRight: screenWidth * 0.015,
        marginTop: screenHeight * 0.020363829787234/2
    },
    dmButton: {
        marginLeft: screenWidth * 0.015,
        marginRight: screenWidth * 0.015,
        marginTop: screenHeight * 0.020363829787234/3
    },
    buttonContainer: {
        marginBottom: screenHeight * 0.010363829787234
    },
    shareDropdown: {
        marginTop: screenHeight * -0.020363829787234
    },
    image: {
        width: 150,
        height: 100,
        borderRadius: 13,
        margin: 3,
        resizeMode: 'cover',
    },
    imageActive: {
        position: 'absolute',
        top: 0,
        left: 0,
        resizeMode: 'contain',
    },
    horzRow: {
        flexDirection: 'row',
        width: "85%",
        alignItems: 'flex-end'
    },
    gap: {
        height: screenHeight * 0.398936170212766
    },
    imageButton: {
        marginLeft: 0,
        marginRight: 0,
        flex: 1,
        marginBottom: screenHeight * -0.005,
        marginTop: screenHeight * -0.005
    },
    searchButton: {
        marginLeft: 0,
        marginRight: 0,
        flex: 1,
        marginBottom: screenHeight * -0.005,
        marginTop: screenHeight * -0.005
    },
    chatContainer: {
        // backgroundColor: "#FFF",
        flex: 1,
    },
    dropDownContainer: {
        width: "98.15%"
    },
    dropDownContainerDM: {
        width: "88%"
    },
    dropDownItem: {
        justifyContent: 'flex-start',
    },
    loadingContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    recipientsContainer: {
        flexDirection: 'row',
        marginTop: screenHeight * 0.010363829787234,
        marginLeft: screenWidth * 0.004,
        ...(Platform.OS !== 'android' && {
            zIndex: 10,
        }),
    },

});
