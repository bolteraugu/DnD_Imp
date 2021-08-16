import {Dimensions, FlatList, StyleSheet, View} from "react-native";
import React, {useEffect, useState} from "react";
import Spinner from "../components/Spinner";
import {FAB} from "react-native-paper";
import colors from "../utils/colors";
import NoteImageCard from "../components/NoteImageCard";

global.screenWidth = Dimensions.get("window").width;
global.screenHeight = Dimensions.get("window").height;

export default function EditNotesScreen({navigation, route}) {
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', e => {
            setLoading(true)
            global.groupRef.collection('notes').doc(global.noteToEdit._id).onSnapshot((snapshot) => {
                setImages(snapshot.get('images'))
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
        <View style = {styles.totalContainer}>
            <FlatList
                data={images} //Data of the flatList is the notes
                keyExtractor={(item) => item._id}
                renderItem={(
                    {item} //Render each item with the title and content
                ) =>
                    <NoteImageCard
                        note = {global.noteToEdit}
                        image = {global.image}
                    />

                }
            />
            <FAB
                style={styles.plusFAB}
                small icon="plus"
                onPress={() => {
                }} />
            <FAB
                style={styles.helpFAB}
                small icon="help"
                onPress={() => {

                }} />
        </View>
    )

}

const styles = StyleSheet.create({
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