import React, {useContext} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {Card, Paragraph, Button} from 'react-native-paper';
import {AuthUserContext} from "../navigation/AuthUserProvider";

global.screenWidth = Dimensions.get("window").width;
global.screenHeight = Dimensions.get("window").height;

export default function NoteCard({title, content, groupRef, note, navigation, onChange, index, shareNote}) {
    const {user} = useContext(AuthUserContext);
    function deleteNote() {
        groupRef
            .collection('notes')
            .doc(note._id)
            .delete()
            .then(console.log('Successfully deleted note'), (error) =>
                console.log('Failed to delete note: ' + error)
            );
    }

    return (
        <Card elevation={4} style={styles.card}>
            <Card.Title title={title} />
            <Card.Actions>
                <Button onPress={ () => {
                    navigation.navigate('ViewNote',
                        {
                            groupRef: groupRef,
                            note: note,
                        }
                    )
                }
                }>
                    View
                </Button>
                <Button onPress={ () => {
                    navigation.navigate('EditNote',
                        {
                            groupRef: groupRef,
                            note: note,
                            executeOnChange: onChange,
                            index: index
                        }
                    )
                }
                }>
                    Edit
                </Button>
                <Button onPress={() => {
                    shareNote({note})
                }}>
                    Share
                </Button>
                <Button onPress={deleteNote}>Delete</Button>
            </Card.Actions>
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        elevation: 4,
        flex: 1,
        marginBottom: screenHeight * 0.0066489361702128,
        marginTop: screenHeight * 0.0066489361702128,
        marginLeft: screenWidth * 0.0037509377344336,
        marginRight: screenWidth * 0.0037509377344336,
        paddingTop: screenHeight * 0.0265957446808512,
        paddingBottom: screenHeight * 0.0265957446808512,
        paddingRight: screenWidth * 0.0150037509377344,
        paddingLeft: screenWidth * 0.0150037509377344,
    },
});
