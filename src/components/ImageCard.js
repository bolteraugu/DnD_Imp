import React, {useContext, useState} from 'react';
import {Dimensions, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Card, Text, Button} from 'react-native-paper';
import {AuthUserContext} from "../navigation/AuthUserProvider";
import firebase from 'firebase';
import 'firebase/firestore';

global.screenWidth = Dimensions.get("window").width;
global.screenHeight = Dimensions.get("window").height;

export default function ImageCard({image, onSelect, shareImage, editName, showConfirmationDialog}) {

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
                            onPress={() => {
                                showConfirmationDialog(image);
                            }}>
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