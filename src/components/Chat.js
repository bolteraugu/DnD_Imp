import React, { useState, useEffect, useContext } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { AuthUserContext } from "../navigation/AuthUserProvider";
import { ActivityIndicator, StyleSheet, View, Platform } from "react-native";
import {
  IconButton,
  Button,
  Portal,
  Dialog,
  Provider,
  TextInput,
} from "react-native-paper";
import { GiftedChat, Bubble, Send } from "react-native-gifted-chat";
import firebase from "firebase";
import "firebase/firestore";

export default function Chat({ groupRef }) {
  useEffect(() => {
    groupRef.get().then(
      (group) => {
        const members = group.data().members;
        setRecipients(members);
        setMembers(members);
      },
      (error) => {
        alert(error);
      }
    );
  }, []);

  // eslint-disable-next-line no-unused-vars
  const [recipients, setRecipients] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const [inputVal, setInputVal] = useState("");

  const { user } = useContext(AuthUserContext);
  const currentUser = user.toJSON();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const messagesListener = groupRef
      .collection("messages")
      .where("recipients", "array-contains", user.toJSON().email)
      .orderBy("createdOn", "desc")
      .onSnapshot(
        (querySnapshot) => {
          const messages = querySnapshot.docs.map((doc) => {
            const firebaseData = doc.data();

            const data = {
              _id: doc.id,
              text: "",
              createdOn: new Date().getTime(),
              ...firebaseData,
            };

            if (!firebaseData.system) {
              data.user = {
                ...firebaseData.user,
                name: firebaseData.user.email,
              };
            }

            return data;
          });

          setMessages(messages);
          if (loading) {
            setLoading(false);
          }
        },
        (error) => {
          alert(error);
        }
      );

    return messagesListener;
  }, []);

  function handleSend(messages) {
    const text = messages[0].text;

    groupRef
      .collection("messages")
      .add({
        text,
        createdOn: new Date().getTime(),
        user: {
          _id: currentUser.uid,
          email: currentUser.email,
        },
        recipients: recipients,
      })
      .then(console.log("Message sent: " + text), (error) => {
        alert(error);
      });
  }

  function renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#6646ee",
          },
        }}
        textStyle={{
          right: {
            color: "#fff",
          },
        }}
      />
    );
  }

  function renderSend(props) {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <IconButton icon="send" size={32} color="#6646ee" />
        </View>
      </Send>
    );
  }

  function renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6646ee" />
      </View>
    );
  }

  return (
    <Provider>
      <View style={styles.chatContainer}>
        <View style={styles.recipientsContainer}>
          <DropDownPicker
            placeholder="Select Recipients"
            multipleText="%d recipients"
            items={members.map((member) => {
              return {
                label: member,
                value: member,
              };
            })}
            defaultValue={members}
            multiple={true}
            min={0}
            max={10}
            containerStyle={styles.dropDownContainer}
            itemStyle={styles.dropDownItem}
            onChangeItem={(item) => setRecipients(item)}
          />
          <IconButton
            icon="account-multiple-plus"
            size={28}
            color="#000"
            onPress={showDialog}
          />
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>Add a User to the Group</Dialog.Title>
              <Dialog.Content>
                <TextInput
                  onChangeText={(text) => setInputVal(text)}
                  label="User's Email"
                />
              </Dialog.Content>
              <Dialog.Actions>
                <Button
                  onPress={() => {
                    groupRef
                      .update({
                        members: firebase.firestore.FieldValue.arrayUnion(
                          inputVal
                        ),
                        numMembers: firebase.firestore.FieldValue.increment(1)
                      })
                      .then(() => {
                        hideDialog()
                        setRecipients([...recipients, inputVal]);
                        setMembers([...members, inputVal]);
                      });
                  }}
                >
                  Add
                </Button>
                <Button onPress={hideDialog}>Cancel</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
        <GiftedChat
          messages={messages}
          onSend={handleSend}
          user={{ _id: currentUser.uid }}
          renderBubble={renderBubble}
          placeholder="Type your message here..."
          showUserAvatar
          renderSend={renderSend}
          renderLoading={renderLoading}
        />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  chatContainer: {
    // backgroundColor: "#FFF",
    flex: 1,
  },
  dropDownContainer: {
    flex: 1,
  },
  dropDownItem: {
    justifyContent: "flex-start",
  },
  loadingContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  recipientsContainer: {
    flexDirection: "row",
    ...(Platform.OS !== "android" && {
      zIndex: 10,
    }),
  },
});
