import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { AuthUserContext } from "../navigation/AuthUserProvider";
import { Title, Button, Portal, Provider as PaperProvider, Dialog, Text } from "react-native-paper";
import firebase from "firebase/app";
import 'firebase/firestore';
import Spinner from "../components/Spinner";
import Colors from "../utils/colors";

export default function MenuScreen({ navigation }) {
    const { user } = useContext(AuthUserContext);
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = React.useState(false);
    const [warningVisible, setWarning] = useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    useEffect(() => {
        const unsubscribe = firebase
            .firestore()
            .collection("groups")
            .where("members", "array-contains", user.toJSON().email)
            .onSnapshot(
                (querySnapshot) => {
                    const groups = querySnapshot.docs.map((documentSnapshot) => {
                        return {
                            _id: documentSnapshot.id,
                            // give defaults
                            name: "",
                            ...documentSnapshot.data(),
                        };
                    });

                    setGroups(groups);

                    if (loading) {
                        setLoading(false);
                    }
                },
                (error) => {
                    alert(error);
                }
            );
        return () => unsubscribe();
    }, []);

    if (loading) {
        return <Spinner />;
    }

    return (
        <PaperProvider>
            <View style={styles.wrapper}>
                <Title style={styles.title}>My Groups</Title>
                <ScrollView>
                    <FlatList
                        data={groups}
                        keyExtractor={(item) => item._id}
                        ListFooterComponent={() => (
                            <Button
                                mode="contained"
                                onPress={() => navigation.navigate("AddGroup")}
                                style={styles.button}
                            >
                                Create Group
                            </Button>
                        )}
                        renderItem={({ item }) => (
                            <View style = {styles.row} >
                                <Title
                                    onPress={() => navigation.navigate("DM", { group: item })}
                                    style={styles.container}
                                    title={item.name}>{item.name}
                                </Title>
                                <Button mode="contained"
                                        style = {styles.buttonItem}
                                        onPress={ () =>
                                            firebase.firestore().collection("groups").doc(item._id).get().then(doc => {
                                                if (doc.get("numMembers") === 0) {
                                                    setWarning(true)
                                                }
                                                else {
                                                    setWarning(false)
                                                }
                                                showDialog()
                                            })
                                        }
                                >
                                    Leave group
                                </Button>
                                <Portal>
                                    <Dialog visible={visible} onDismiss={hideDialog} style={styles.popUpWindow}>
                                        <Dialog.Title style={styles.popUpTitle}>Are you sure you want to leave this group?</Dialog.Title>
                                        <Text visible={warningVisible} style={styles.warningMessage}> NOTE: You are the last player in this group. Leaving it will delete all data (characters, notes, messages etc.)</Text>
                                        <Dialog.Actions>
                                            <Button mode="contained"
                                                    style={styles.popUpButtons}
                                                    onPress={ () =>
                                                        // Got some help for this from here: https://stackoverflow.com/questions/47860812/deleting-all-documents-in-firestore-collection
                                                        firebase.firestore().collection("groups").doc(item._id).collection("messages").onSnapshot((snapshot) =>
                                                            {
                                                                snapshot.docs.forEach((doc) => {
                                                                    firebase.firestore().collection("groups").doc(item._id).collection("messages").doc(doc.id).delete()
                                                                })
                                                            }
                                                        ) &&
                                                        firebase.firestore().collection("groups").doc(item._id).update(
                                                            {
                                                                members:firebase.firestore.FieldValue.arrayRemove(user.toJSON().email),
                                                                numMembers: firebase.firestore.FieldValue.increment(-1)
                                                            }
                                                        ).then( () => {
                                                            firebase.firestore().collection("logs").doc(item.name + " - " + item._id).collection("logs_for_groups").add({
                                                                text: `User ${user.toJSON().email} has left the group.`,
                                                                createdAt: new Date().toString(),
                                                        }).then( () =>
                                                            firebase.firestore().collection("groups").doc(item._id).get().then(doc => {
                                                                if (doc.get("numMembers") === 0) {
                                                                    firebase.firestore().collection("logs").doc(item.name + " - " + item._id).collection("logs_for_groups").add({
                                                                        text: `The group has been deleted.`,
                                                                        createdAt: new Date().toString(),
                                                                    }).then(() => {
                                                                        firebase.firestore().collection("groups").doc(item._id).delete().then(() => hideDialog())
                                                                    })
                                                                }
                                                            }
                                                            ))
                                                    })}>
                                                Yes
                                            </Button>
                                            <View style = {styles.space}/>
                                            <Button mode = "contained"
                                                    style={styles.popUpButtons}
                                                    onPress={hideDialog}>
                                                No
                                            </Button>
                                        </Dialog.Actions>
                                    </Dialog>
                                </Portal>
                            </View>
                        )}
                    />
                </ScrollView>
            </View>
        </PaperProvider>
    );
}

MenuScreen.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    popUpWindow: {
        width: "40%",
        alignItems: 'center',
        alignSelf: 'center'
    },

    warningMessage: {
        marginBottom: 20,
      marginLeft: 10
    },

    popUpTitle: {
        marginTop: 10
    },

    space: {
        width: 30,
        height: 30
    },

    popUpButtons: {
        width: "25%",
        marginBottom: 5
    },
    row: {
        flex: 1,
        flexDirection: "row",
        width: "100%"
    },
    buttonItem: {
        paddingVertical: 13
    },
    button: { margin: 5 },
    container: {
        width: "67%",
        backgroundColor: Colors.white,
        elevation: 4,
        margin: 5,
        paddingHorizontal: 10,
        paddingVertical: 15,
    },
    title: {
        alignSelf: "center",
    },
    wrapper: {
        alignSelf: "center",
        paddingTop: 100,
        width: 500,
    },
});
