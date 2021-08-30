import React, {useContext, useState} from 'react';
import {Dimensions, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Card, Text, Button} from 'react-native-paper';
import {AuthUserContext} from "../navigation/AuthUserProvider";
import firebase from 'firebase';
import 'firebase/firestore';

global.screenWidth = Dimensions.get("window").width;
global.screenHeight = Dimensions.get("window").height;

export default function ImageCard({image, onSelect, shareImage, groupRef, editName, resetSelect, metadata}) {
    const {user} = useContext(AuthUserContext);

    function deleteImage() {
        console.log(image.imageNameStatic)
        groupRef.collection('characters').onSnapshot((snapshot) => {
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
        groupRef.collection('members').doc(user.toJSON().email).onSnapshot((snapshot) => {
            if (snapshot.get('uuid') === image.uuid) {
                groupRef.collection('members').doc(user.toJSON().email).update({
                    chatImage: "https://firebasestorage.googleapis.com/v0/b/improving-dungeon-minion-5e.appspot.com/o/default_character.png?alt=media&token=84c93a85-ce56-45a7-9b01-0df6e257c6db",
                    actualImageName: "default_character.png",
                    imageUUID: ""
                });
                groupRef.collection('messages').onSnapshot((snapshot) => {
                    snapshot.docs.map((doc) => {
                        if (doc.get('user').email === user.toJSON().email) {
                            groupRef.collection('messages').doc(doc.id).update({
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

        groupRef.collection('messages').onSnapshot((snapshot) => {
            snapshot.docs.map((doc) => {
                if (doc.get('image') === image.uri) {
                    groupRef.collection('messages').doc(doc.id).update({
                        image: "",
                        imageName: "",
                        text: "This image no longer exists",
                        deletedOrMissing: true
                    })
                }
            })
        })
            groupRef.collection('members').doc(user.toJSON().email).collection('images').onSnapshot((snapshot) => {
                snapshot.docs.map((doc2) => {
                    if (doc2.get('uuid') === image.uuid) {
                        groupRef.collection('members').doc(user.toJSON().email).collection('images').doc(doc2.id).delete();
                    }
                })
            })
            groupRef.collection('imageCanBeShared').doc(image._id).onSnapshot((doc3) => {
                if (doc3.get('numShared') === 1) {
                    groupRef.collection('imageCanBeShared').doc(doc3.id).delete().then(() => {
                        firebase.storage().ref("/" + image.imageNameStatic).delete();
                    })
                    groupRef.collection('notes').onSnapshot((snapshot) => {
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
                    groupRef.collection('imageCanBeShared').doc(image._id).update({
                        numShared: firebase.firestore.FieldValue.increment(-1),
                        sharedWith: firebase.firestore.FieldValue.arrayRemove(user.toJSON().email)
                    })
                }
                resetSelect(image)
            })
    }

    return (
        <Card elevation={4} style={styles.card}>
            <Card.Content>
                <View style = {styles.imageContainer}>
                    <Text
                        style = {styles.imageTitle}>
                        {image.imageName}
                    </Text>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress = {() => {
                            onSelect({image})
                        }}
                    >
                        <Image
                            source={{uri: image.uri}}
                            style={styles.thumbnail}
                        />
                    </TouchableOpacity>
                    <View style = {styles.buttonContainer}>
                        <Button
                            onPress={() => {
                                editName({image})
                            }}
                        >
                            Edit Name
                        </Button>
                        <Button
                            onPress={() => {
                            shareImage({image})
                        }}>
                            Share
                        </Button>
                        <Button
                            onPress={deleteImage}>
                            Delete
                        </Button>
                    </View>
                </View>
            </Card.Content>
        </Card>
    );
}

const styles = StyleSheet.create({
    imageTitle: {
        width: screenWidth * 0.25,
        fontSize: 14.5,
        textAlign: 'center'
    },
    card: {
        elevation: 4,
        flex: 1,
        marginBottom: screenHeight * 0.0066489361702128,
        marginTop: screenHeight * 0.0066489361702128,
        marginLeft: screenWidth * 0.0037509377344336,
        marginRight: screenWidth * 0.0037509377344336,
        // paddingTop: screenHeight * 0.0265957446808512,
        // paddingBottom: screenHeight * 0.0265957446808512,
        // paddingRight: screenWidth * 0.0150037509377344,
        // paddingLeft: screenWidth * 0.0150037509377344,
    },
    thumbnail: {
        width: screenWidth * 0.25,
        height: screenHeight * 0.35,
        resizeMode: "center"
    },
    buttonContainer: {
        flexDirection: 'row'
    },
    imageContainer: {
        width: screenWidth * 0.25,
    },
});