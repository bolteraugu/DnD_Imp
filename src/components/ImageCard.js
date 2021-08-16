import React, {useContext, useState} from 'react';
import {Dimensions, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Card, Text, Button} from 'react-native-paper';
import {AuthUserContext} from "../navigation/AuthUserProvider";
import firebase from "firebase";

global.screenWidth = Dimensions.get("window").width;
global.screenHeight = Dimensions.get("window").height;

export default function ImageCard({image, onSelect, shareImage, groupRef, editName, resetSelect}) {

    function deleteImage() {
        firebase.storage().ref("/" + image.imageNameStatic).delete().then(() => {
            groupRef
                .collection('images').doc(image._id)
                .delete()
        }).then(() => {
            groupRef.collection('characters').onSnapshot((snapshot) => {
                snapshot.docs.map((doc) => {
                    if (doc.get('imageName') === image.uri) {
                        doc.update({
                            imageName: "https://firebasestorage.googleapis.com/v0/b/improving-dungeon-minion-5e.appspot.com/o/default_character.png?alt=media&token=84c93a85-ce56-45a7-9b01-0df6e257c6db"
                        })
                    }
                })
            })
        }).then(() => {
            resetSelect()
        });
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
        marginBottom: screenHeight * -0.0266489361702128,
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
        resizeMode: "contain"
    },
    buttonContainer: {
        flexDirection: 'row'
    },
    imageContainer: {
        width: screenWidth * 0.25,
    },
});