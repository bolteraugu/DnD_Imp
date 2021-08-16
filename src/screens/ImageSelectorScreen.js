import {Button, Dialog, FAB, Portal, Provider, Text, TextInput} from 'react-native-paper';
import {Dimensions, FlatList, Image, Platform, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import * as ImagePicker from 'expo-image-picker';
import {AuthUserContext} from "../navigation/AuthUserProvider";
import ImageCard from "../components/ImageCard";
import DropDown from "react-native-paper-dropdown";
import firebase from "firebase";
import colors from "../utils/colors";
import { v4 as uuidv4 } from 'uuid';

global.screenWidth = Dimensions.get("window").width;
global.screenHeight = Dimensions.get("window").height;

export default function ImageSelectorScreen({navigation, route}) {
    const {user} = useContext(AuthUserContext);
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([]);
    const [imagesMetaData, setImagesMetaData] = useState([]);
    const [selectedImage, setSelectedImage] = useState("");
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
    const [items, setItems] = useState("");
    let membersTemp = [];

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', e => {
            setLoading(true)
            route.params.groupRef.get().then((snapshot) => {
                setMembers(snapshot.get('members'))
            })
            route.params.groupRef.collection('members').doc(user.toJSON().email).collection('images').onSnapshot((querySnapshot) => {
                let images = []
                querySnapshot.docs.map((doc) => {
                    if (route.params.character.imageName !== "https://firebasestorage.googleapis.com/v0/b/improving-dungeon-minion-5e.appspot.com/o/default_character.png?alt=media&token=84c93a85-ce56-45a7-9b01-0df6") {
                        if (doc.get('uri') === route.params.character.imageName) {
                            setSelectedImage(route.params.character.imageName)
                        }
                    } else {
                        setSelectedImage("")
                    }
                    const data = {
                        _id: doc.id,
                        ...doc.data(),
                    };
                    images.push(data)
                });
                setImages(images)
            });
            route.params.groupRef.collection('imageCanBeShared').onSnapshot((querySnapshot) => {
                let imagesMetaData = []
                querySnapshot.docs.map((doc) => {
                    const data = {
                        _id: doc.id,
                        ...doc.data(),
                    };
                    imagesMetaData.push(data)
                });
                setImagesMetaData(imagesMetaData)
            });
            if (loading) {
                setLoading(false);
            }
        })
        return unsubscribe;
    })

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

        const imageName = pickerResult.uri.split('/').slice(-1)[0]

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
                imageNameStatic: uuid
            }).then((docRef) => {
            route.params.groupRef.onSnapshot((snapshot) => {
                route.params.groupRef.collection('imageCanBeShared').doc(docRef.id).set({
                    numShared: 1,
                    sharedWith: new Array(user.toJSON().email)
                })

            })
        }).then(() => {
            setSelectedImage(url)
        })
    };

    function onSelect(image) {
        setSelectedImage(image.image.uri)
    }

    function confirmImage() {
        route.params.onImageChange(route.params.index, 'imageName', selectedImage, true)
        route.params.onImageChangeLocal('imageName', selectedImage, false)
        route.params.onImageChangeFirebase('imageName', selectedImage)
        navigation.goBack()
    }

    function ShowImages() {
        if (images.length === 0) {
            return (
                <View>
                    <Text style={styles.emptyMessage}>You currently do not have any images. Click the button below to
                        upload one.</Text>
                    <Button
                        mode="contained"
                        onPress={openImagePickerAsync}
                        style={styles.uploadImageButton}
                    >
                        Upload an image
                    </Button>
                </View>
            );
        } else {
            let index = 0;
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
                                <View style={[item.uri === selectedImage ? styles.border : styles.empty]}>
                                    <ImageCard
                                        image={item}
                                        onSelect={onSelect}
                                        groupRef={route.params.groupRef}
                                        metadata={imagesMetaData[index++]}
                                        resetSelect={(image) => {
                                            if (image.uri === selectedImage) {
                                                setSelectedImage("")
                                            }
                                        }}
                                        editName={(imageToEdit) => {
                                            setImageToEdit(imageToEdit)
                                            setName(imageToEdit.image.imageName)
                                            showEditNameDialog()
                                        }}
                                        shareImage={(imageToShare) => {
                                            setImageToS(imageToShare)
                                            membersTemp = []
                                            console.log("te")
                                            for (let i = 0; i < imagesMetaData.length; i++) {
                                                if (imagesMetaData[i]._id === imageToShare.image._id) {
                                                    if (imagesMetaData[i].numShared !== members.length) {
                                                        for (let j = 0; j < members.length; j++) {
                                                            if (!imagesMetaData[i].sharedWith.includes(members[j])) {
                                                                membersTemp.push({
                                                                    value: members[j], label: members[j]
                                                                })
                                                                setItems(membersTemp)
                                                            }
                                                            showDialog()
                                                        }
                                                    } else {
                                                        showNoShareDialog();
                                                    }
                                                }
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
                            style={styles.confirmCancelButton}
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
                            dropDownStyle={styles.shareDropdown}
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
                                    const peopleToShare = recipients.split(',')
                                    for (let i = 1; i < peopleToShare.length; i++) {
                                        route.params.groupRef.collection('members').doc(peopleToShare[i]).collection('images').doc(imageToS.image._id).set({
                                            imageName: imageToS.image.imageName,
                                            imageNameStatic: imageToS.image.imageName,
                                            uri: imageToS.image.uri
                                        })
                                        route.params.groupRef.collection('imageCanBeShared').doc(imageToS.image._id).update({
                                                numShared: firebase.firestore.FieldValue.increment(1),
                                                sharedWith: firebase.firestore.FieldValue.arrayUnion(peopleToShare[i])
                                            })
                                    }
                                    hideDialog()
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
            <Portal>
                <Dialog
                    visible={editNameVisible}
                    onDismiss={hideEditNameDialog}
                    style={styles.shareWindow}
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
        </Provider>
    );
}

const styles = StyleSheet.create({
    empty: {
    },
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
