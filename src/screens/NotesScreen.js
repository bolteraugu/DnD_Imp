import React, { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";
import colors from "../utils/colors";
import Spinner from "../components/Spinner";
import { StyleSheet, View, FlatList } from "react-native";
import {
  Button,
  Portal,
  Dialog,
  TextInput,
  FAB,
  Provider,
} from "react-native-paper";

export default function NotesScreen({ route }) {
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const [inputTitle, setInputTitle] = useState("");
  const [inputContent, setInputContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { charRef } = route.params;

  // Load data from firebase
  useEffect(() => {
    const notesListener = charRef.collection("notes").onSnapshot(
      (querySnapshot) => {
        const notes = querySnapshot.docs.map((doc) => {
          const data = {
            _id: doc.id,
            ...doc.data(),
          };
          return data;
        });
        setNotes(notes);

        if (loading) {
          setLoading(false);
        }
      },
      (error) => {
        alert(error);
      }
    );
    return notesListener;
  }, []);

  if (loading) {
    return <Spinner />;
  }

  // Edit Current Notes

  // Delete Notes

  return (
    <Provider>
      <View style={styles.wrapper}>
        <FlatList
          data={notes}
          renderItem={({ item }) => (
            <NoteCard title={item.title} content={item.content} />
          )}
        />
        <FAB style={styles.fab} small icon="plus" onPress={showDialog} />
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Create a New Note</Dialog.Title>
            <Dialog.Content>
              <TextInput
                onChangeText={(text) => setInputTitle(text)}
                label="Title"
              />
              <TextInput
                onChangeText={(text) => setInputContent(text)}
                label="Content"
                multiline={true}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Cancel</Button>
              <Button
                onPress={() => {
                  charRef
                    .collection("notes")
                    .add({
                      title: inputTitle,
                      content: inputContent,
                    })
                    .then(hideDialog, (error) => {
                      alert(error);
                    });
                }}
              >
                Add
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  fab: {
    backgroundColor: colors.primary,
    bottom: 0,
    left: 0,
    margin: 20,
    position: "absolute",
  },
  wrapper: {
    backgroundColor: colors.white,
    height: "100%",
    padding: 5,
  },
});
