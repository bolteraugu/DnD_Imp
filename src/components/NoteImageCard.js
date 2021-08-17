import React, {useContext, useState} from 'react';
import {Dimensions, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Card, Text, Button, IconButton} from 'react-native-paper';
import {AuthUserContext} from "../navigation/AuthUserProvider";
import firebase from 'firebase';
import 'firebase/firestore';

global.screenWidth = Dimensions.get("window").width;
global.screenHeight = Dimensions.get("window").height;

export default function NoteImageCard({note, image, showFullImage}) {

    function deleteImage() {
        global.groupRef.collection('notes').doc(note._id).collection('images').doc(image._id).delete()
    }

    return (
        <Card elevation={4} style={styles.card}>
            <Card.Content>
                <View style = {styles.imageContainer}>
                    <Text
                        style = {styles.imageTitle}>
                        {image.imageName}
                    </Text>
                    <Image
                        source={{uri: image.uri}}
                        style={styles.thumbnail}
                    />
                    <View style = {styles.iconRow}>
                        <IconButton
                            icon="delete"
                            size={28}
                            color="#000"
                            style = {{flex: 1}}
                            onPress={deleteImage} //delete this image
                        />
                        <IconButton
                            icon="arrow-expand-all"
                            size={28}
                            color="#000"
                            style = {{flex: 1}}
                            onPress={() => {
                                showFullImage(image)
                            }}
                        />
                    </View>
                </View>
            </Card.Content>
        </Card>
    );
}

const styles = StyleSheet.create({
    iconRow: {
        flexDirection: 'row',
        height: screenHeight * 0.04,
        marginBottom: screenHeight * 0.02,
    },
    imageTitle: {
        width: screenWidth * 0.1752,
        fontSize: 12,
        textAlign: 'center'
    },
    card: {
        elevation: 4,
        width: screenWidth * 0.2052,
        marginBottom: screenHeight * 0.0066489361702128,
        marginTop: screenHeight * 0.0066489361702128,
        marginLeft: screenWidth * 0.0037509377344336,
        marginRight: screenWidth * 0.0037509377344336,
    },
    thumbnail: {
        width: screenWidth * 0.1752,
        height: screenHeight * 0.242,
        resizeMode: "center"
    },
    buttonContainer: {
        flexDirection: 'row'
    },
    imageContainer: {
        width: screenWidth * 0.1875,
    },
});