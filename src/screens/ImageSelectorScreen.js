import {Button, Dialog, FAB, IconButton, Portal, Provider, Text, TextInput} from 'react-native-paper';
import {
    Dimensions,
    FlatList,
    Image,
    Keyboard, Linking,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import * as ImagePicker from 'expo-image-picker';
import {AuthUserContext} from "../navigation/AuthUserProvider";
import ImageCard from "../components/ImageCard";
import DropDown from "react-native-paper-dropdown";
import firebase from "firebase";
import colors from "../utils/colors";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

global.screenWidth = Dimensions.get("window").width;
global.screenHeight = Dimensions.get("window").height;

export default function ImageSelectorScreen({navigation, route}) {
    const {user} = useContext(AuthUserContext);
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState("");
    const [selectedImageName, setSelectedImageName] = useState("");
    const [selectedImageUUID, setSelectedImageUUID] = useState("");
    const [selectedImageFN, setSelectedImageFN] = useState(null);
    const [imageToS, setImageToS] = useState([]);
    const [imageToEdit, setImageToEdit] = useState([]);
    const [name, setName] = useState("");
    const [members, setMembers] = useState([]);
    const [visible, setVisible] = useState(false); //Whether the data is loading
    const [noShareVisible, setNoShareVisible] = useState(false); //Whether the data is loading
    const [editNameVisible, setEditNameVisible] = useState(false); //Whether the data is loading
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);
    const showNoShareDialog = () => setNoShareVisible(true);
    const hideNoShareDialog = () => setNoShareVisible(false);
    const showEditNameDialog = () => setEditNameVisible(true);
    const hideEditNameDialog = () => setEditNameVisible(false);
    const [showDropDown, setShowDropDown] = useState(false);
    const [recipients, setRecipients] = useState("");
    const [avatars, setAvatars] = useState([]);
    const [items, setItems] = useState("");
    const [deleteI, setDeleteI] = useState(null);
    const [deleteVisible, setDeleteVisible] = useState(false); //Whether the data is loading
    const showDeleteDialog = () => setDeleteVisible(true);
    const hideDeleteDialog = () => setDeleteVisible(false);
    let membersTemp = [];
    const [helpVisible, setHelpVisible] = useState(false);
    const showHelpDialog = () => setHelpVisible(true);
    const hideHelpDialog = () => setHelpVisible(false);

    global.ShowHelpImageSelector = () => {
        Keyboard.dismiss();
        showHelpDialog();
    };

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            navigation.addListener('focus', e => {
                setLoading(true)
                route.params.groupRef.get().then((snapshot) => {
                    setMembers(snapshot.get('members'))
                })
                route.params.groupRef.collection('messages').onSnapshot((snapshot) => {
                    const avatars = snapshot.docs.map((doc) => {
                        const data = {
                            _id: doc.id,
                            ...doc.data(),
                        };
                        return data;
                    })
                    setAvatars(avatars)
                })
                route.params.groupRef.collection('members').doc(user.toJSON().email).collection('images').onSnapshot((querySnapshot) => {
                    let images = []
                    querySnapshot.docs.map((doc) => {
                        if (route.params.comingFrom === 'MainScreen') {
                            if (route.params.character.imageName !== "https://firebasestorage.googleapis.com/v0/b/improving-dungeon-minion-5e.appspot.com/o/default_character.png?alt=media&token=84c93a85-ce56-45a7-9b01-0df6") {
                                if (doc.get('uuid') === route.params.character.imageUUID) {
                                    setSelectedImage(route.params.character.imageName);
                                    setSelectedImageName(route.params.character.actualImageName);
                                    setSelectedImageUUID(route.params.character.imageUUID);
                                }
                            }
                        } else if (route.params.comingFrom === 'DMScreen') {
                            if (route.params.chatImage !== "https://firebasestorage.googleapis.com/v0/b/improving-dungeon-minion-5e.appspot.com/o/default_character.png?alt=media&token=84c93a85-ce56-45a7-9b01-0df6") {
                                if (doc.get('uri') === route.params.chatImage) {
                                    setSelectedImage(route.params.chatImage);
                                    setSelectedImageName(route.params.actualImageName);
                                    setSelectedImageUUID(route.params.imageUUID);
                                }
                            } else {
                                setSelectedImage("")
                            }
                        }
                        const data = {
                            _id: doc.id,
                            ...doc.data(),
                        };
                        images.push(data)
                    });
                    setImages(images)
                });
                if (loading) {
                    setLoading(false);
                }
            })
        }
        return () => { isMounted = false }
    })

    function deleteImage(image) {
        console.log(image.imageNameStatic)
        route.params.groupRef.collection('characters').onSnapshot((snapshot) => {
            snapshot.docs.map((doc) => {
                if (doc.get('imageUUID') === image.uuid) {
                    groupRef.collection('characters').doc(doc.id).update({
                        imageName: "https://firebasestorage.googleapis.com/v0/b/improving-dungeon-minion-5e.appspot.com/o/default_character.png?alt=media&token=84c93a85-ce56-45a7-9b01-0df6e257c6db",
                        actualImageName: "default_character.png",
                        imageUUID: ""
                    })
                }
            })
        })
        route.params.groupRef.collection('members').doc(user.toJSON().email).onSnapshot((snapshot) => {
            if (snapshot.get('uuid') === image.uuid) {
                route.params.groupRef.collection('members').doc(user.toJSON().email).update({
                    chatImage: "https://firebasestorage.googleapis.com/v0/b/improving-dungeon-minion-5e.appspot.com/o/default_character.png?alt=media&token=84c93a85-ce56-45a7-9b01-0df6e257c6db",
                    actualImageName: "default_character.png",
                    imageUUID: ""
                });
                route.params.groupRef.collection('messages').onSnapshot((snapshot) => {
                    snapshot.docs.map((doc) => {
                        if (!doc.get('system') && doc.get('user').email === user.toJSON().email) {
                            route.params.groupRef.collection('messages').doc(doc.id).update({
                                user: {
                                    uid: user.toJSON().uid,
                                    email: user.toJSON().email,
                                    avatar: "https://firebasestorage.googleapis.com/v0/b/improving-dungeon-minion-5e.appspot.com/o/default_character.png?alt=media&token=84c93a85-ce56-45a7-9b01-0df6e257c6db"
                                }
                            })
                        }
                    })
                })
            }
        });

        route.params.groupRef.collection('messages').onSnapshot((snapshot) => {
            snapshot.docs.map((doc) => {
                if (!doc.get('system') && doc.get('image') === image.uri) {
                    route.params.groupRef.collection('messages').doc(doc.id).update({
                        image: "",
                        imageName: "",
                        text: "This image no longer exists",
                        deletedOrMissing: true
                    })
                }
            })
        })
        if (image.numShared === 1) {
            firebase.storage().ref("/" + image.imageNameStatic).delete();
            route.params.groupRef.collection('notes').onSnapshot((snapshot) => {
                snapshot.docs.map(async (doc) => {
                    let content = await doc.get('content')
                    //console.log('<img src ="' + image.uri + '">');
                    let newContent = content.replace(/<img src="' + image.uri + '">/g,'The image ' + image.imageName + ' has been deleted');
                    groupRef.collection('notes').doc(doc.id).update({
                        content: newContent
                    })
                })
            })
        }
        else {
            let sharedWith = [];
            for (let i = 0; i < image.sharedWith.length; i++) {
                if (image.sharedWith[i] !== user.toJSON().email) {
                    sharedWith.push(image.sharedWith[i]);
                }
            }
            for (let i = 0; i < sharedWith.length; i++) {
                route.params.groupRef.collection('members').doc(sharedWith[i]).collection('images').onSnapshot((snapshot) => {
                    snapshot.docs.map((doc2) => {
                        if (doc2.get('uuid') === image.uuid) {
                            route.params.groupRef.collection('members').doc(user.toJSON().email).collection('images').doc(doc2.id).update({
                                numShared: firebase.firestore.FieldValue.increment(-1),
                                sharedWith: firebase.firestore.FieldValue.arrayRemove(user.toJSON().email)
                            });
                        }
                    })
                })
            }
        }
        route.params.groupRef.collection('members').doc(user.toJSON().email).collection('images').onSnapshot((snapshot) => {
            snapshot.docs.map((doc2) => {
                if (doc2.get('uuid') === image.uuid) {
                    route.params.groupRef.collection('members').doc(user.toJSON().email).collection('images').doc(doc2.id).delete();
                }
            })
        })
        if (route.params.comingFrom === "MainScreen" || route.params.comingFrom === 'DMScreen') {
            if (image.uri === selectedImage) {
                setSelectedImage("");
                setSelectedImageName("");
                setSelectedImageUUID("")
            }
        } else {
            if (selectedImageFN != null && image.uri === selectedImageFN.uri) {
                setSelectedImageFN(null)
            }
        }
    }

    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    let openImagePickerAsync = async () => {
        if (Platform.OS !== "web") {
            let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (permissionResult.granted === false) {
                alert('Permission to access camera roll is required!');
                return;
            }
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();

        if (pickerResult.cancelled === true) {
            return;
        }

        //const imageName = pickerResult.uri.split('/').slice(-1)[0]

        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", pickerResult.uri, true);
            xhr.send(null);
        });

        const uuid = uuidv4();
        const ref = firebase.storage().ref().child(uuid);
        const snapshot = await ref.put(blob);
        const url = await snapshot.ref.getDownloadURL()
        route.params.groupRef
            .collection('members').doc(user.toJSON().email).collection('images')
            .add({
                //Add the title and the content
                uri: url,
                imageName: uuid,
                imageNameStatic: uuid,
                uuid: uuid,
                numShared: 1,
                sharedWith: new Array(user.toJSON().email)
            }).then((docRef) => {
            if (route.params.comingFrom === 'NotesScreen' || route.params.comingFrom === 'Chat') {
                route.params.groupRef.collection('members').doc(user.toJSON().email).collection('images').doc(docRef.id).onSnapshot((snapshot) => {
                    setSelectedImageFN(snapshot.data())
                })
            }
        }).then(() => {
            if (route.params.comingFrom === 'MainScreen' || route.params.comingFrom === 'DMScreen') {
                setSelectedImage(url);
                setSelectedImageName(uuid);
                setSelectedImageUUID(uuid);
            }
        })
    };

    function onSelect(image) {
        if (route.params.comingFrom === 'MainScreen' || route.params.comingFrom === 'DMScreen') {
            setSelectedImage(image.image.uri);
            setSelectedImageName(image.image.imageName);
            setSelectedImageUUID(image.image.uuid);
        } else {
            setSelectedImageFN(image.image)
        }
    }

    function confirmImage() {
        if (route.params.comingFrom === "MainScreen") {
            route.params.onImageChange(route.params.index, 'imageName', selectedImage);
            route.params.onImageChange(route.params.index, 'actualImageName', selectedImageName);
            route.params.onImageChange(route.params.index, 'imageUUID', selectedImageUUID);
            route.params.onImageChangeLocal('imageName', selectedImage);
            route.params.onImageChangeLocal('actualImageName', selectedImageName);
            route.params.onImageChangeLocal('imageUUID', selectedImageUUID);
            route.params.onImageChangeFirebase('imageName', selectedImage);
            route.params.onImageChangeFirebase('actualImageName', selectedImageName);
            route.params.onImageChangeFirebase('imageUUID', selectedImageUUID);
            navigation.goBack();
        } else if (route.params.comingFrom === 'DMScreen') {
            for (let i = 0; i < avatars.length; i++) {
                if (!avatars[i].system && avatars[i].user.email === user.toJSON().email) {
                    route.params.groupRef.collection('messages').doc(avatars[i]._id).update({
                        user: {
                            avatar: selectedImage,
                            uid: user.toJSON().uid,
                            email: user.toJSON().email
                        }
                    })
                }
            }
            route.params.groupRef.collection('members').doc(user.toJSON().email).update({
                chatImage: selectedImage,
                actualImageName: selectedImageName,
                imageUUID: selectedImageUUID
            })
            navigation.goBack()
        } else if (route.params.comingFrom === 'Chat') {
            route.params.updateChatFirebase(selectedImageFN.uri, route.params.chatImage, selectedImageFN.imageName)
            navigation.goBack()
        } else {
            route.params.onImageChangeFirebase(selectedImageFN);
            navigation.goBack()
        }
    }

    function ShowImages() {
        if (images.length === 0) {
            return (
                <View>
                    <Text style={styles.emptyMessage}>You currently do not have any images. Click the button below to
                        upload one.</Text>
                    <Button
                        mode="contained"
                        onPress={async () => {
                            await openImagePickerAsync();
                        }}
                        style={styles.uploadImageButton}
                    >
                        Upload an image
                    </Button>
                </View>
            );
        } else {
            return (
                <View>
                    <ScrollView>
                        <FlatList
                            data={images} //Data of the flatList is the notes
                            keyExtractor={(item) => item._id}
                            horizontal={true}
                            renderItem={(
                                {item} //Render each item with the title and content
                            ) =>
                                <View
                                    style={[(((route.params.comingFrom === 'MainScreen' || route.params.comingFrom === 'DMScreen') && (item.uuid === selectedImageUUID)) ||
                                        ((route.params.comingFrom === 'NotesScreen' || route.params.comingFrom === 'Chat') && selectedImageFN != null && item.uuid === selectedImageFN.uuid)) ?
                                        styles.border : styles.empty]}>
                                    <ImageCard
                                        image={item}
                                        showConfirmationDialog={(image) => {
                                            setDeleteI(image);
                                            showDeleteDialog();
                                        }}
                                        onSelect={onSelect}
                                        editName={(imageToEdit) => {
                                            setImageToEdit(imageToEdit)
                                            setName(imageToEdit.image.imageName)
                                            showEditNameDialog()
                                        }}
                                        shareImage={(imageToShare) => {
                                            setImageToS(imageToShare)
                                            membersTemp = []
                                            setItems("");
                                            for (let j = 0; j < members.length; j++) {
                                                if (!imageToShare.image.sharedWith.includes(members[j])) {
                                                    membersTemp.push({
                                                        value: members[j], label: members[j]
                                                    })
                                                    setItems(membersTemp)
                                                }
                                            }
                                            if (membersTemp.length === 0) {
                                                showNoShareDialog();
                                            } else {
                                                showDialog();
                                            }
                                        }
                                        }
                                    />
                                </View>
                            }
                        />
                    </ScrollView>
                    <View style={styles.horizontalButtonLayout}>
                        <Button
                            mode="contained"
                            onPress={openImagePickerAsync}
                            style={styles.uploadImageButton}
                        >
                            Upload an image
                        </Button>
                        <Button
                            mode="contained"
                            onPress={confirmImage}
                            style={[(((route.params.comingFrom === 'MainScreen' || route.params.comingFrom === 'DMScreen') && selectedImage.length === 0) ||
                                ((route.params.comingFrom === 'NotesScreen' || route.params.comingFrom === 'Chat') && selectedImageFN == null)) ? styles.disabledButton : styles.confirmCancelButton]}
                            disabled={(route.params.comingFrom === 'MainScreen' || route.params.comingFrom === 'DMScreen') ? selectedImage.length === 0 : selectedImageFN == null}
                        >
                            Confirm
                        </Button>
                        <Button
                            mode="contained"
                            style={styles.confirmCancelButton}
                            onPress={() => {
                                navigation.goBack()
                            }}
                        >
                            Cancel
                        </Button>
                    </View>
                </View>
            )
        }
    }

    return (
        <Provider>
            <View style={styles.wrapper}>
                <ShowImages/>
            </View>
            <Portal>
                <Dialog
                    visible={noShareVisible}
                    onDismiss={hideNoShareDialog}
                    style={styles.shareWindow}
                >
                    <Dialog.Title
                        style={styles.shareTitle}>There are no users you can share this image to.</Dialog.Title>
                    <Dialog.Actions>
                        <View style={styles.buttonContainer}>
                            <Button
                                mode="contained"
                                style={styles.button}
                                onPress={() => {
                                    hideNoShareDialog()
                                }}
                            >
                                OK
                            </Button>
                        </View>
                    </Dialog.Actions>
                </Dialog>
                <Dialog
                    visible={visible}
                    onDismiss={hideDialog}
                    style={styles.shareWindow}
                >
                    <Dialog.Title
                        style={styles.shareTitle}>
                        Share this image to user(s)
                    </Dialog.Title>
                    <Dialog.Content>
                        <DropDown
                            label={"Please select users..."}
                            list={items}
                            visible={showDropDown}
                            showDropDown={() => setShowDropDown(true)}
                            onDismiss={() => setShowDropDown(false)}
                            multiSelect
                            dropDownStyle={Platform.OS === 'ios' ? styles.shareDropdownIOS : styles.shareDropdown}
                            setValue={setRecipients}
                            value={recipients}
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <View style={styles.buttonContainer}>
                            <Button
                                mode="contained"
                                style={styles.button}
                                disabled={recipients.length === 0}
                                onPress={() => {
                                    const id = uuidv4();
                                    const peopleToShare = recipients.split(',')
                                    const peopleWhoHaveIt = [...imageToS.image.sharedWith];
                                    const numPeople = imageToS.image.numShared + (peopleToShare.length - 1);
                                    for (let i = 1; i < peopleToShare.length; i++) {
                                        peopleWhoHaveIt.push(peopleToShare[i])
                                    }
                                    for (let i = 0; i < imageToS.image.sharedWith.length; i++) {
                                        route.params.groupRef.collection('members').doc(imageToS.image.sharedWith[i]).collection('images').doc(imageToS.image._id).update({
                                            numShared: numPeople,
                                            sharedWith: peopleWhoHaveIt
                                        }).then(() => {
                                            for (let i = 1; i < peopleToShare.length; i++) {
                                                route.params.groupRef.collection('members').doc(peopleToShare[i]).collection('images').doc(imageToS.image._id).set({
                                                    imageName: imageToS.image.imageName,
                                                    imageNameStatic: imageToS.image.imageNameStatic,
                                                    uri: imageToS.image.uri,
                                                    uuid: id,
                                                    numShared: numPeople,
                                                    sharedWith: peopleWhoHaveIt
                                                })
                                            }
                                        }).then(() => {
                                            setRecipients("")
                                            hideDialog()
                                        })
                                    }
                                }}
                            >
                                Share
                            </Button>
                            <View style={styles.gap}/>
                            <Button
                                mode="contained"
                                style={styles.button}
                                onPress={hideDialog}
                            >
                                Cancel
                            </Button>
                        </View>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <KeyboardAwareScrollView>
            <Portal>
                <Dialog
                    visible={editNameVisible}
                    onDismiss={hideEditNameDialog}
                    style={Platform.OS === 'ios' ? styles.editWindowIOS : styles.editWindow}
                >
                    <Dialog.Title
                        style={styles.shareTitle}>Edit image's name</Dialog.Title>
                    <Dialog.Content>
                        <TextInput
                            label="Name" // Label of the text input
                            placeholder={"Please enter a new name..."}
                            defaultValue={imageToEdit.length !== 0 && imageToEdit.image.imageName}
                            style={styles.input}
                            onChangeText={(name) => setName(name)} // userEmail is the new text when the text is changed, set email to this. Then value will be changed too.
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <View style={styles.buttonContainer}>
                            <Button
                                mode="contained"
                                style={styles.button}
                                disabled={name.length === 0}
                                onPress={() => {
                                    if (route.params.comingFrom === 'NotesScreen' || route.params.comingFrom === 'Chat') {
                                        if (selectedImageFN != null && imageToEdit.image.uri === selectedImageFN.uri) {
                                            let imageTemp = imageToEdit.image;
                                            imageTemp.imageName = name;
                                            setSelectedImageFN(imageTemp);
                                        }
                                    } else {
                                        if (selectedImageUUID !== "" && imageToEdit.image.uuid === selectedImage.uuid) {
                                            setSelectedImageName(name);
                                        }
                                        if (route.params.comingFrom === 'MainScreen') {
                                            route.params.groupRef.collection('characters').onSnapshot((snapshot) => {
                                                snapshot.docs.forEach((doc) => {
                                                    if (doc.get('imageUUID') === imageToEdit.image.uuid) {
                                                        route.params.groupRef.collection('characters').doc(doc.id).update({
                                                            actualImageName: name
                                                        })
                                                    }
                                                })
                                            })
                                        } else {
                                            groupRef.collection('members').doc(user.toJSON().email).onSnapshot((snapshot) => {
                                                if (snapshot.get('imageUUID') === image.uuid) {
                                                    groupRef.collection('members').doc(user.toJSON().email).update({
                                                        actualImageName: name
                                                    });
                                                }
                                            })
                                        }
                                    }
                                    for (let i = 0; i < images.length; i++) {
                                        if (images[i]._id === imageToEdit.image._id) {
                                            images[i]['imageName'] = name;
                                        }
                                    }
                                    route.params.groupRef.collection('messages').onSnapshot((snapshot) => {
                                        snapshot.docs.forEach((doc) => {
                                            if (!doc.get('system') && doc.get('user').email === user.toJSON().email && doc.get('image') === imageToEdit.image.uri) {
                                                route.params.groupRef.collection('messages').doc(doc.id).update({
                                                    imageName: name
                                                })
                                            }
                                        })
                                    })
                                    route.params.groupRef.collection('members').doc(user.toJSON().email).collection('images').doc(imageToEdit.image._id).update({
                                        imageName: name
                                    })
                                    hideEditNameDialog()
                                }}
                            >
                                Confirm
                            </Button>
                            <View style={styles.gap}/>
                            <Button
                                mode="contained"
                                style={styles.button}
                                onPress={hideEditNameDialog}
                            >
                                Cancel
                            </Button>
                        </View>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            </KeyboardAwareScrollView>
            <Portal>
                <Dialog
                    visible={deleteVisible}
                    onDismiss={hideDeleteDialog}
                    style={styles.assignWindow}
                >
                    <Dialog.Title
                        style={styles.assignTitle}
                    >
                        Are you sure you want to delete this image?
                    </Dialog.Title>
                    <Dialog.Content>
                        <Text
                            style={styles.assignTitle}
                        >
                            NOTE: If you delete this note you will not be able to recover it.
                        </Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <View style={styles.assignButtonContainer}>
                            <Button
                                mode="contained"
                                style={styles.assignButton}
                                onPress={() => {
                                    deleteImage(deleteI);
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
                            Image Selector Screen Help
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
                            - In this screen you can upload a new image to your gallery by clicking the 'Upload an Image' button and you can select and
                            confirm an image from it.{'\n\n'}

                            - If you are using this app on an Android or IOS device clicking on the 'Upload an Image' button will ask you if the app can have access
                            to your device's storage. It requires this permission so it can open the file picker, which lets you choose the image to upload. So, you
                            must allow the app access to your device's storage if you want to upload an image.
                            {'\n\n'}

                            - After choosing an image from the file picker, the image will be added to your gallery. You can share, delete and edit the name of
                            any images in your gallery using the text buttons on the image cards.{'\n\n'}

                            - When you share an image with a player, you share a copy of it, unlike sharing notes where you share a reference.This means that if you
                            edit the image's name or delete it, this edit/delete will only be applied to your copy of the image, not the copies of the image created
                            from sharing it. However, when images are shared, the sharing metadata (who has the image been shared with) is copied as well, and changes to this metadata apply
                            to all copies. This means when you share an image to a player, all other players who have a copy of the image can no longer share it
                            to that player. {'\n\n'}

                            -You can choose what image to select by clicking on the associated image card. A red outline surrounds the selected image. If you clicked
                            the 'Change Chat Profile Picture' button in Settings or the 'Change Image' button in the Full Character Sheet then your chat profile's
                            /character's current image will be the selected image when you navigate to this screen. {'\n\n'}

                            -When you confirm an image, the image will be used depending on the purpose of navigating to this screen. For example, if you are setting
                            your chat's profile picture then the confirmed image will become your chat's profile picture whereas if you are embedding an image into
                            a note then the confirmed image will be embedded into the note.
                        </Text>
                    </Dialog.Content>
                </Dialog>
            </Portal>
        </Provider>
    );
}

const styles = StyleSheet.create({
    exitButton: {
        left: screenWidth * 0.685,
        top: screenHeight * -0.02,
        position: 'absolute'
    },
    helpWindow: {
        width: screenWidth * 0.725,
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
    shareDropdownIOS: {
        marginTop: screenHeight * -0.00463829787234,
    },
    assignGap: {
        width: screenWidth * 0.04
    },
    assignWindow: {
        width: screenWidth * 0.525,
        alignSelf: 'center',
        marginTop: screenHeight * -0.1663829787234
    },
    assignTitle: {
        alignSelf: 'center',
        textAlign: 'center'
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
    empty: {},
    border: {
        borderWidth: 2,
        borderColor: "#f02816",
    },
    confirmCancelButton: {
        backgroundColor: "#000000",
        marginTop: screenHeight * 0.020363829787234,
        marginLeft: screenWidth * 0.0077509377344336,
        width: screenWidth * 0.12
    },
    disabledButton: {
        marginTop: screenHeight * 0.020363829787234,
        marginLeft: screenWidth * 0.0077509377344336,
        width: screenWidth * 0.12
    },
    largerGap: {
        width: screenWidth * 0.15
    },
    buttonGap: {
        height: screenHeight * 0.1
    },
    horizontalButtonLayout: {
        flexDirection: 'row'
    },
    verticalButtonLayout: {
        flexDirection: 'column'
    },
    emptyMessage: {
        paddingTop: screenHeight * 0.0132978723404256,
        paddingLeft: screenWidth * 0.0075018754688672,
        fontSize: 20,
    },
    wrapper: {
        backgroundColor: colors.white,
        height: '100%',
        paddingBottom: screenHeight * 0.0066489361702128,
        paddingTop: screenHeight * 0.0066489361702128,
        paddingLeft: screenWidth * 0.0037509377344336,
        paddingRight: screenWidth * 0.0037509377344336,
    },
    shareWindow: {
        width: "50%",
        alignSelf: 'center',
        marginTop: screenHeight * -0.20363829787234
    },
    editWindow: {
        width: "50%",
        alignSelf: 'center',
        marginTop: screenHeight * -0.04363829787234
    },
    editWindowIOS: {
        width: "50%",
        alignSelf: 'center',
        marginTop: screenHeight * -0.44363829787234
    },
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
        flexDirection: 'row',
    },
    gap: {
        width: screenWidth * 0.04
    },
    shareDropdown: {
        marginTop: screenHeight * -0.020363829787234,
    },
    uploadImageButton: {
        marginTop: screenHeight * 0.020363829787234,
        marginLeft: screenWidth * 0.0037509377344336,
        width: "20%",
    }

});
