import {Button, Dialog, FAB, IconButton, Portal, Provider, Text, TextInput, Title} from "react-native-paper";
import React, {useContext, useEffect, useRef, useState} from "react";
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    TextInput as NativeTextInput,
    View
} from "react-native";
import Spinner from "../components/Spinner";
import RenderHtml from 'react-native-render-html';
import colors from "../utils/colors";

global.screenWidth = Dimensions.get("window").width;
global.screenHeight = Dimensions.get("window").height;

export default function ViewNotesScreen({navigation, route}) {
    const [loading, setLoading] = useState(true);
    const [note, setNote] = useState(route.params.note);

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

    return (
        <ScrollView
            style = {styles.previewContainer}
        >
            <View style = {styles.htmlView}>
                <RenderHtml
                    source={{
                        html: note.content.replace(/(?:\r\n|\r|\n)/g, '<br>')
                    }}
                    contentWidth={screenWidth * 0.55}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    previewContainer: {
        width: "90%",
        marginLeft: "5%",
        marginTop: "2.5%",
        marginBottom: "2.5%",
        backgroundColor: "#e4e4e4",
        borderRadius: 4,
        borderWidth: 1,
    },
    htmlView: {
        padding: "2.5%"
    }
})