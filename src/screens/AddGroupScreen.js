import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Title, TextInput, Button } from "react-native-paper";
import { AuthUserContext } from "../navigation/AuthUserProvider";
import * as firebase from "firebase";
import "firebase/firestore";

/**
 * This screen has a text input for users to create a new group that they are the only member of.
 * @param {*} param0
 */
export default function AddGroupScreen({ navigation }) {
  const [groupName, setGroupName] = useState("");
  const { user } = useContext(AuthUserContext);
  /**
   * Create a new Firestore collection to save threads
   */
  function handleButtonPress() {
    if (groupName.length > 0) {
      firebase
        .firestore()
        .collection("groups")
        .add({
          name: groupName,
          members: [user.toJSON().email],
        })
        .then(
          (docRef) => {
            docRef.collection("messages").add({
              text: `You have joined the group ${groupName}.`,
              createdAt: new Date().getTime(),
              system: true,
            });
            navigation.navigate("Home");
          },
          (error) => {
            alert(error);
          }
        );
    }
  }
  return (
    <View style={styles.rootContainer}>
      <View style={styles.innerContainer}>
        <Title>Create a new group</Title>
        <TextInput
          name="Group Name"
          value={groupName}
          onChangeText={(text) => setGroupName(text)}
          clearButtonMode="while-editing"
        />
        <Button
          mode="contained"
          style={styles.buttonContainer}
          onPress={() => handleButtonPress()}
          disabled={groupName.length === 0}
        >
          Create
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 5,
  },
  innerContainer: {
    justifyContent: "center",
    width: 500,
  },
  rootContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
  },
});
