import {Dimensions, FlatList, Image, StyleSheet, View} from "react-native";
import React, {useEffect, useState} from "react";
import Spinner from "../components/Spinner";
import {FAB, IconButton, Portal, Provider, Text, Title, Dialog} from "react-native-paper";
import colors from "../utils/colors";
import NoteImageCardUnused from "../components/NoteImageCard(unused)";

global.screenWidth = Dimensions.get("window").width;
global.screenHeight = Dimensions.get("window").height;

export default function EditNotesScreen({navigation, route}) {
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([]);
    const [visible, setVisible] = useState(false);
    const [helpVisible, setHelpVisible] = useState(false);
    const [imageToShow, setImageToShow] = useState(null);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);
    const showHelpDialog = () => setHelpVisible(true);
    const hideHelpDialog = () => setHelpVisible(false);

    useEffect(() => {
            setLoading(true)
            global.groupRef.collection('notes').doc(global.noteToEdit._id).collection('images').onSnapshot((snapshot) => {
                let imagesTemp = [];
                snapshot.docs.map((doc) => {
                    const data = {
                        _id: doc.id,
                        ...doc.data(),
                    };
                    imagesTemp.push(data)
                })
                setImages(imagesTemp)
            })
            if (loading) {
                setLoading(false);
            }
    }, [])

    if (loading) {
        return <Spinner />;
    }

    function onImageChange(image, editingName, name) {
        if (editingName) {
            const newImages = [...images];
            for (let i = 0; i < images.length; i++) {
                if(newImages[i]._id === image._id) {
                    newImages[i]['imageName'] = name
                    setImages(newImages);
                    global.groupRef.collection('notes').doc(global.noteToEdit._id).collection('images').doc(image._id).update({
                        imageName: name
                    })
                }
            }
        }
        else {
            global.groupRef.collection('notes').doc(global.noteToEdit._id).collection('images').doc(image._id).set({
                imageName: image.imageName,
                imageNameStatic: image.imageNameStatic,
                uri: image.uri
            })
        }
    }

    return (
        <Provider>
            <View style = {styles.totalContainer}>
                <FlatList
                    data={images} //Data of the flatList is the notes
                    keyExtractor={(item) => item._id}
                    style = {styles.noteImagesList}
                    numColumns={4}
                    renderItem={(
                        {item} //Render each item with the title and content
                    ) =>
                        <NoteImageCardUnused
                            note = {global.noteToEdit}
                            image = {item}
                            showFullImage = {(image) => {
                                setImageToShow(image)
                                showDialog();
                            }}
                        />
                    }
                />
                <FAB
                    style={styles.plusFAB}
                    small icon="plus"
                    onPress={() => {
                        navigation.navigate('ImageSelector', {
                            comingFrom: "NotesScreen",
                            onImageChangeFirebase: onImageChange,
                            groupRef: global.groupRef,
                        })
                    }} />
                <FAB
                    style={styles.helpFAB}
                    small icon="help"
                    onPress={() => {
                        showHelpDialog()
                    }}
                />
            </View>
            <Portal>
                <Dialog
                    visible={visible}
                    onDismiss={hideDialog}
                    style = {styles.fullSizeWindow}
                >
                        <View style = {styles.headingRow}>
                            <IconButton
                                icon="keyboard-backspace" //Getting the back icon image
                                size={38} //Setting the size
                                color="#6646ee" //And the color
                                style = {styles.FSImageBackButton}
                                onPress={() => {
                                    hideDialog()
                                }} //When clicked on make it go back to the previous route
                            />
                            <View style = {styles.centerFSImageTitle}>
                            <Title
                                style = {styles.helpTitle}
                            >
                                {imageToShow != null ? imageToShow.imageName : ""}
                            </Title>
                            </View>
                        </View>
                    <Image
                        source={imageToShow != null ? {uri: imageToShow.uri} : {uri: ""}}
                        style={styles.fullSizeImage}
                    />
                    <View/>
                </Dialog>
            </Portal>
            <Portal>
                <Dialog
                    visible={helpVisible}
                    onDismiss={() => {
                        hideHelpDialog()
                    }}
                    style = {styles.shareWindow}
                >
                        <View style = {styles.headingRow}>
                            <IconButton
                                icon="keyboard-backspace" //Getting the back icon image
                                size={30} //Setting the size
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
                                    Adding images to notes
                                </Title>
                            </View>
                        </View>
                        <Text style = {styles.body}>
                            Unfortunately images can't be directly embedded into notes. However, you can add images to notes by clicking the + icon in the bottom left.
                            You can edit the name of the image in the image selector screen and add a textual reference to it e.g. "inserted image1.jpg here" which is a
                            viable alternative to embedding images.
                        </Text>
                </Dialog>
            </Portal>
        </Provider>
    )

}

const styles = StyleSheet.create({
    shareWindow: {
        width: "60%",
        height: "34%",
        alignSelf: 'center',
        marginTop: screenHeight * -0.20363829787234,
        paddingLeft: screenWidth * 0.02363829787234/2,
        paddingRight: screenWidth * 0.02363829787234/2,
        paddingTop: screenHeight * 0.0419013976912623/2,
        paddingBottom: screenHeight * 0.0419013976912623/2
    },
    fullSizeWindow: {
        width: screenWidth * 0.95,
        height: screenHeight * 0.81,
        marginTop: screenHeight * 0.02363829787234
    },
    fullSizeImage: {
        width: screenWidth * 0.95,
        height: screenHeight * 0.71,
        marginTop: screenHeight * 0.02363829787234,
        resizeMode: "center"
    },
    thumbnail: {
        width: screenWidth * 0.25,
        height: screenHeight * 0.35,
        resizeMode: "center"
    },
    body: {
        marginTop: screenHeight * 0.03,
        marginLeft: screenWidth * 0.008,
        marginRight: screenWidth * 0.008,
        fontSize: 17
    },
    centerTitle: {
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 32
    },
    backButton: {
        flex: 1,
        alignSelf: 'center',
    },
    centerFSImageTitle: {
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 40,
    },
    FSImageBackButton: {
        flex: 1,
        alignSelf: 'center',
        marginTop: screenHeight * 0.02363829787234,
        marginLeft: screenWidth * 0.01363829787234,
    },
    headingRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: screenHeight * 0.04,
        marginTop: screenHeight * 0.015
    },
    helpTitle: {
        alignSelf: 'center',
        fontSize: 23
    },
    noteImagesList: {
        marginLeft: screenWidth * 0.075,
        marginRight: screenWidth * 0.075,
        marginTop: screenHeight * 0.0115957446808511,
    },
    totalContainer: {
        width: "100%",
        height: "100%"
    },
    plusFAB: {
        //Absolute so it ignores it's parents positoning and instead is positioned bottom left corner with a margin of 20.
        backgroundColor: colors.primary,
        bottom: 0,
        left: 0,
        marginLeft: screenWidth * 0.0150037509377344,
        marginRight: screenWidth * 0.0150037509377344,
        marginTop: screenHeight * 0.0265957446808511,
        marginBottom: screenHeight * 0.0265957446808511,
        position: 'absolute',
    },
    helpFAB: {
        //Absolute so it ignores it's parents positoning and instead is positioned bottom left corner with a margin of 20.
        backgroundColor: colors.primary,
        bottom: 0,
        right: 0,
        marginLeft: screenWidth * 0.0150037509377344,
        marginRight: screenWidth * 0.0150037509377344,
        marginTop: screenHeight * 0.0265957446808511,
        marginBottom: screenHeight * 0.0265957446808511,
        position: 'absolute',
    }
})