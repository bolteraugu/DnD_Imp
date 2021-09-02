import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, FlatList, View, Dimensions, Platform} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {AuthUserContext} from '../navigation/AuthUserProvider';
import {
  Title,
  Button,
  Portal,
  Provider,
  Dialog,
  Text,
  IconButton,
  TextInput,
} from 'react-native-paper';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Spinner from '../components/Spinner';
import Colors from '../utils/colors';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {warning} from "react-native-gifted-chat/lib/utils";

global.screenWidth = Dimensions.get("window").width;
global.screenHeight = Dimensions.get("window").height;
global.selectedMsgs = [];

export default function MenuScreen({navigation}) {
  const {user} = useContext(AuthUserContext);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [warningVisible, setWarning] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const showDeleteDialog = () => setDeleteVisible(true);
  const hideDeleteDialog = () => setDeleteVisible(false);
  const [editVisible, setEditVisible] = useState(false);
  const showEditDialog = () => setEditVisible(true);
  const hideEditDialog = () => setEditVisible(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [groupToEdit, setGroupToEdit] = useState('');
  const [groupName, setGroupName] = useState('');
  const [groupToLeave, setGroupToLeave] = useState(null);
  const [deletePhrase, setDeletePhrase] = useState('');

  /**
   * Create a new Firestore collection to save threads
   */
  function handleButtonPress() {
    if (groupName.length > 0) {
      firebase
        .firestore()
        .collection('groups')
        .add({
            name: groupName,
            members: [user.toJSON().email],
            numMembers: 1,
            addRecipients: false,
            viewAllNotes: false,
            shareNotesSharedToThem: false,
            deleteOwnCharacters: false,
            viewAllCharacters: false,
        }).then((docRef) => {
                firebase
                    .firestore()
                    .collection('group-logs')
                    .doc(docRef.id)
                    .set({
                        groupName: groupName,
                    }).then(() => {
                    docRef.collection('members').doc(user.toJSON().email).set({
                        isDM: true,
                        chatImage: "https://firebasestorage.googleapis.com/v0/b/improving-dungeon-minion-5e.appspot.com/o/default_character.png?alt=media&token=84c93a85-ce56-45a7-9b01-0df6",
                        actualImageName: "default_character.png",
                        imageUUID: ""
                    })
                })
                    .then(() => {
                        firebase
                            .firestore()
                            .collection('group-logs')
                            .doc(docRef.id)
                            .collection('logs')
                            .add({
                                text: `The group has been created by ${
                                    user.toJSON().email
                                }.`,
                                createdAt: new Date().toString(),
                            });
                    })
                    .then(() => {
                        setGroupName("");
                        navigation.navigate('Home');
                    });
          },
          (error) => {
            alert(error);
          }
        );
    }
  }

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('groups')
      .where('members', 'array-contains', user.toJSON().email)
      .onSnapshot(
        (querySnapshot) => {
          const groups = querySnapshot.docs.map((documentSnapshot) => {
            return {
              _id: documentSnapshot.id,
              // give defaults
              name: '',
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
  }, [loading, user]);

  if (loading) {
    return <Spinner />;
  }

  async function LeaveGroup(groupID, deletedMessage) {
      await firebase.firestore().collection('groups').doc(groupID).collection('members').doc(user.toJSON().email).get().then((doc) => {
                  if (doc.get('isDM')) {
                      firebase.firestore().collection('groups').doc(groupID).collection('members').get().then((members) => {
                          let breakLoop = false;
                          members.docs.forEach((membersDoc) => {
                              if (membersDoc.id !== user.toJSON().email && !breakLoop) {
                                  firebase.firestore().collection('groups').doc(groupID).collection('characters').get().then((char) => {
                                      char.docs.forEach(async (charDoc) => {
                                          await firebase.firestore().collection('groups').doc(groupID).get().then((d) => {
                                              if (charDoc.get('assignedTo').length === 0 || charDoc.get('assignedTo') === membersDoc) {
                                                  firebase.firestore().collection('groups').doc(groupID).collection('characters').doc(charDoc.id).update({
                                                      canAssign: (d.get('numMembers')-2 > 0)
                                                  })
                                              }
                                              else {
                                                  firebase.firestore().collection('groups').doc(groupID).collection('characters').doc(charDoc.id).update({
                                                      canAssign: (d.get('numMembers')-3 > 0)
                                                  })
                                              }
                                          })
                                      })
                                  }).then(() => {
                                      firebase.firestore().collection('groups').doc(groupID).update({
                                          members:
                                              firebase.firestore.FieldValue.arrayRemove(
                                                  user.toJSON().email
                                              ),
                                          numMembers:
                                              firebase.firestore.FieldValue.increment(-1),
                                      })
                                  }).then(() => {
                                      firebase.firestore().collection('groups').doc(groupID).collection('members').doc(user.toJSON().email).update({
                                          isDM: false
                                      }).then(() => {
                                          firebase.firestore().collection('groups').doc(groupID).collection('members').doc(membersDoc.id).update({
                                              isDM: true
                                          }).then(async () => {
                                              if (deletedMessage.length === 0) {
                                                  await firebase.firestore().collection('groups').doc(groupID).get().then(async (d) => {
                                                      console.log([...d.get('members').filter(val => val !== user.toJSON().email)]);
                                                      firebase.firestore().collection('groups').doc(groupID).collection('messages').add({
                                                          text: `${user.toJSON().email} has left the group.`,
                                                          createdAt: new Date().getTime(),
                                                          recipients: [...d.get('members').filter(val => val !== user.toJSON().email)],
                                                          deletedOrMissing: false,
                                                          system: true
                                                      })
                                                  })
                                              }
                                          }).then(async () => {
                                              await firebase.firestore().collection('groups').doc(groupID).get().then(async (d) => {
                                                  console.log([...d.get('members').filter(val => val !== user.toJSON().email)]);
                                                  firebase.firestore().collection('groups').doc(groupID).collection('messages').add({
                                                      text: `${membersDoc} has been assigned DM due to ${user.toJSON().email}, the current DM, leaving the group.`,
                                                      createdAt: new Date().getTime(),
                                                      recipients: [...d.get('members').filter(val => val !== user.toJSON().email)],
                                                      deletedOrMissing: false,
                                                      system: true
                                                  })
                                              })
                                          }).then(() => {
                                              breakLoop = true;
                                          })
                                      })
                                  })
                              }
                          })
                      })
                  }
                  else {
                      firebase.firestore().collection('groups').doc(groupID).collection('characters').get().then((char) => {
                          char.docs.forEach((charDoc) => {
                              firebase.firestore().collection('groups').doc(groupID).get().then((d) => {
                                  if (charDoc.get('assignedTo').length === 0) {
                                      firebase.firestore().collection('groups').doc(groupID).collection('characters').doc(charDoc.id).update({
                                          canAssign: (d.get('numMembers')-2 > 0)
                                      })
                                  }
                                  else {
                                      firebase.firestore().collection('groups').doc(groupID).collection('characters').doc(charDoc.id).update({
                                          canAssign: (d.get('numMembers')-3 > 0)
                                      })
                                  }
                              })
                          })
                      }).then(() => {
                          firebase.firestore().collection('groups').doc(groupID).update({
                              members:
                                  firebase.firestore.FieldValue.arrayRemove(
                                      user.toJSON().email
                                  ),
                              numMembers:
                                  firebase.firestore.FieldValue.increment(-1),
                          })
                      }).then(async () => {
                          if (deletedMessage.length === 0) {
                              await firebase.firestore().collection('groups').doc(groupID).get().then(async (d) => {
                                  firebase.firestore().collection('groups').doc(groupID).collection('messages').add({
                                      text: `${user.toJSON().email} has left the group.`,
                                      createdAt: new Date().getTime(),
                                      recipients: [...d.get('members').filter(val => val !== user.toJSON().email)],
                                      deletedOrMissing: false,
                                      system: true
                                  })
                              })
                          }
                      })
                  }
              }).then(() => {
                  firebase.firestore().collection('group-logs').doc(groupID).collection('logs').add({
                      text: `User ${user.toJSON().email} has left the group.`,
                      date: new Date().toString(),
                  })
              }).then(() => {
                hideDialog();
            })
  }

  async function DeleteGroup(groupID) {
      firebase.firestore().collection('group-logs').doc(groupID).collection('logs').add({
          text: `User ${
              user.toJSON().email
          } has left the group.`,
          date: new Date().toString(),
      }).then(async () => {
          await deleteCollection(groupID, 'members', 'images');
          await deleteCollection(groupID, 'characters', 'weapons');
          await deleteCollection(groupID, 'characters', 'armor');
          await deleteCollection(groupID, 'characters', 'possessions');
          await deleteCollection(groupID, 'characters', 'spells');
          await deleteCollection(groupID, 'messages', '');
          await deleteCollection(groupID, 'notes', '');
          await deleteCollection(groupID, 'members', '');
          await deleteCollection(groupID, 'characters', '');
          firebase.firestore().collection('groups').doc(groupID).delete().then(() => {
              firebase.firestore().collection('group-logs').doc(groupID).collection('logs').add({
                  text: 'The group has been deleted.',
                  date: new Date().toString(),
              }).then(() => {
                  hideDialog();
              })
          })
      })
  }

  async function deleteCollection(groupID, path1, path2) {
      if (path2.length !== 0) {
          console.log(path2);
          await firebase.firestore().collection('groups').doc(groupID).collection(path1).get().then(async (doc1) => {
              for (const item of doc1.docs) {
                  await firebase.firestore().collection('groups').doc(groupID).collection(path1).doc(item.id).collection(path2).get().then(val => {
                      val.docs.forEach((val) => {
                          console.log(val.id);
                          console.log(path2);
                          firebase.firestore().collection('groups').doc(groupID).collection(path1).doc(val.id).collection(path2).doc(val.id).delete()
                      })
                  })
              }
          })
      }
      else {
          await firebase.firestore().collection('groups').doc(groupID).collection(path1).get().then(val => {
              val.docs.forEach((val) => {
                  firebase.firestore().collection('groups').doc(groupID).collection(path1).doc(val.id).delete()
              })
          })
      }
  }

    async function UpdateGroup(groupID) {
        //Things to do:
        //Reduce numMembers and remove them from members array
        //Need to switch DM if user is DM
        //Need to delete all images, not used in chat profile, messages or for characters.
        //Recalculate CanAssign
        //Unassign all characters (add a chat message explaining situation)
        //Keep notes because of view all notes permission
        //Keep messages (so other users who are still in the group don't get confused)
        //Goal of this is to preserve the group, so remaining members can play without inconvenience, and also to notify the users what has happened.

        //Order to do it in:
        //Let the user know what is going on
        //Need to delete all images, not used in chat profile, messages, notes or for characters.
        //Unassigning Characters
        //Recalculate CanAssign
        //Switch DM
        //Reduce numMembers and remove them from members array

        const groupRef = firebase.firestore().collection('groups').doc(groupID);
        //Let the user know what is going on
        await firebase.firestore().collection('groups').doc(groupID).get().then(async (d) => {
                    groupRef.collection('members').doc(user.toJSON().email).collection('images').get().then((image) => {
                        image.docs.forEach((imageDoc) => {
                            console.log('test');
                            //Checking if image is chat image
                            groupRef.collection('members').doc(user.toJSON().email).get().then((mem) => {
                                if (mem.get('chatImage') !== imageDoc.get('uri')) {
                                    //Checking if image has been sent in chat
                                    let isInChat = false;
                                    groupRef.collection('messages').where('recipients', 'array-contains', user.toJSON().email).get().then((v) => {
                                        v.docs.forEach((message) => {
                                            if (!message.get('system') && message.get('image') === imageDoc) {
                                                isInChat = true;
                                            }
                                        })
                                    }).then(() => {
                                        if (!isInChat) {
                                            let isInNotes = false;
                                            //Checking if image has been used in notes
                                            groupRef.collection('notes').get().then((snapshot) => {
                                                snapshot.docs.forEach((doc) => {
                                                    if (doc.get('content').includes('<img src ="' + image.uri + '">')) {
                                                        isInNotes = true;
                                                    }
                                                })
                                            }).then(() => {
                                                if (!isInNotes) {
                                                    let isInChar = false;
                                                    //Checking if image has been used for characters
                                                    groupRef.collection('characters').get().then((c) => {
                                                        c.docs.forEach((cDoc) => {
                                                            if (cDoc.get('imageUUID') === imageDoc.get('uuid')) {
                                                                isInChar = true;
                                                            }
                                                        })
                                                    }).then(() => {
                                                        if (!isInChar) {
                                                            groupRef.collection('members').doc(user.toJSON().email)
                                                                .collection('images').doc(imageDoc.id).delete();
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        })
                    }).then(() => {
                        //Unassigning Characters
                        groupRef.collection('characters').where('assignedTo', "==", user.toJSON().email).get().then((character) => {
                            character.docs.forEach((characterDoc) => {
                                groupRef.collection('characters').doc(characterDoc.id).update({
                                    assignedTo: ""
                                })
                            })
                        }).then(async() => {
                            await firebase.firestore().collection('groups').doc(groupID).get().then(async (d) => {
                                //Explaining to the user what has happened
                                groupRef.collection('messages').add({
                                    text: `${user.toJSON().email} has left the group and deleted their account. Any characters assigned to them have been unassigned. Any images ${user.toJSON().email} had have been removed unless they were set to their profile, set to any characters, embedded in any notes or sent in chat. Any messages they sent and notes they have created have been preserved to avoid confusion.`,
                                    createdAt: new Date().getTime(),
                                    recipients: [...d.get('members').filter(val => val !== user.toJSON().email)],
                                    deletedOrMissing: false,
                                    system: true
                                }).then(() => {
                                    //Removing them from members array, reducing numMembers and switching DM if applicable.
                                    LeaveGroup(groupID, "rr")
                                })
                            })
                        })
                    })
        })

    }

  return (
    <Provider>
        <KeyboardAwareScrollView>
      <View style={styles.wrapper}>
        <Title style={styles.title}>My Groups</Title>
          <FlatList
            data={groups}
            keyExtractor={(item) => item._id}
            renderItem={({item}) => (
              <View style={styles.row}>
                <View style={styles.groupContainer}>
                  <Title
                    onPress={() => navigation.navigate('DM', {group: item})}
                    style={styles.container}
                    numberOfLines={1}
                    title={item.name}
                  >
                    {item.name}
                  </Title>
                  <IconButton
                    style={styles.editIcon}
                    icon="square-edit-outline"
                    size={30}
                    color="#000000"
                    onPress={() => {
                        setGroupToEdit(item);
                        setNewGroupName(item.name);
                      showEditDialog();
                    }}
                  />
                </View>
                <Button
                  mode="contained"
                  style={styles.buttonItem}
                  onPress={() =>
                    firebase
                      .firestore()
                      .collection('groups')
                      .doc(item._id)
                      .get()
                      .then((doc) => {
                          setGroupToLeave(item);
                        if (doc.get('numMembers') === 1) {
                          setWarning(true);
                        } else {
                          setWarning(false);
                        }
                        showDialog();
                      })
                  }
                >
                  Leave group
                </Button>
              </View>
            )}
          />
          <View style={styles.createGroupContainer}>
            <TextInput
              style={styles.createGroupInput}
              placeholder="Group Name"
              value={groupName}
              onChangeText={(text) => setGroupName(text)}
              clearButtonMode="while-editing"
            />
            <Button
              mode="contained"
              onPress={() => handleButtonPress()}
              style={styles.createGroupButton}
            >
              Create Group
            </Button>
          </View>
          <Button
              style={styles.deleteAccount}
              onPress={() => {
                  setDeletePhrase("");
                  showDeleteDialog();
              }}
          >
              Delete your account
          </Button>
      </View>
            <Portal>
                <Dialog
                    visible={editVisible}
                    onDismiss={hideEditDialog}
                    style={Platform.OS === 'ios' ? styles.popUpEditWindowIOS : styles.popUpEditWindowAndroid}
                >
                    <Dialog.Title style={styles.popUpTitle}>
                        Edit group name
                    </Dialog.Title>
                    <Dialog.Content style={styles.popUpContent}>
                        <TextInput
                            defaultValue={groupToEdit.name}
                            placeholder="New group name"
                            clearButtonMode="while-editing"
                            onChangeText={(text) => setNewGroupName(text)}
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button
                            mode="contained"
                            style={styles.popUpEditButtons}
                            disabled={newGroupName.length === 0}
                            onPress={() => {
                                firebase
                                    .firestore().collection('group-logs').doc(groupToEdit._id).collection('logs').add({
                                        text: `User ${
                                            user.toJSON().email
                                        } edited group name from ${
                                            groupToEdit.name
                                        } to ${newGroupName}. The group name changed has been reflected
                                                                            in the corresponding document in group-logs too.`,
                                        date: new Date().toString(),
                                    })
                                    .then(() => {
                                        firebase.firestore().collection('groups').doc(groupToEdit._id).update({
                                                name: newGroupName,
                                            })
                                            .then(() => {
                                                firebase.firestore().collection('group-logs').doc(groupToEdit._id).update({
                                                        groupName: newGroupName,
                                                    })
                                                    .then(() => hideEditDialog());
                                            });
                                    });
                            }}
                        >
                            Submit
                        </Button>
                        <View style={styles.space} />
                        <Button
                            mode="contained"
                            style={styles.popUpEditButtons}
                            onPress={hideEditDialog}
                        >
                            Cancel
                        </Button>
                    </Dialog.Actions>
                </Dialog>
                <Dialog
                    visible={visible}
                    onDismiss={hideDialog}
                    style={styles.popUpWindow}
                >
                    <Dialog.Title style={styles.popUpTitle}>
                        Are you sure you want to leave this group?
                    </Dialog.Title>
                    {!warningVisible ?
                        <Text
                            visible={!warningVisible}
                            style={styles.warningMessage}
                        >
                            NOTE: If you leave when you are the DM of this group then another group member will become DM.
                        </Text>
                        :
                        <Text
                            visible={warningVisible}
                            style={styles.warningMessageBold}
                        >
                            NOTE: You are the last player in this group. Leaving it will delete the group and all data within it (characters, notes, images, messages etc.).
                            You will not be able to recover the deleted data.
                        </Text>
                    }
                    <Dialog.Actions>
                        <Button
                            mode="contained"
                            style={styles.popUpButtons}
                            onPress={async () => {
                                //If user isn't last in the group then all we need to do is remove them from the group members and numShared since I want it so that
                                //if a user leaves a group, they can rejoin it (assuming it still exists) and there data will still be there. The only difference is
                                //that if they are DM then DM will be assigned to another player and when they rejoin they will be a player character (though the
                                //current DM can set them back to the DM (so the change is reversible.
                                if (!warningVisible) {
                                    await LeaveGroup(groupToLeave._id, "");
                                }
                                else {
                                    await DeleteGroup(groupToLeave._id);
                                }

                                //Need to send message in chat to let users know, I should also send message in chat when people join the group
                                //And I should delete the initial message that is sent when the group is created.
                            }}
                        >
                            Yes
                        </Button>
                        <View style={styles.space} />
                        <Button
                            mode="contained"
                            style={styles.popUpButtons}
                            onPress={hideDialog}
                        >
                            No
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <Portal>
                <Dialog
                    visible={deleteVisible}
                    onDismiss={hideDeleteDialog}
                    style={Platform.OS === 'ios' ? styles.deletePopUpWindowIOS : styles.deletePopUpWindow}
                >
                    <Dialog.Title style={styles.popUpTitle}>
                        Are you sure you want to delete your account?
                    </Dialog.Title>
                    <Text
                        style={styles.warningMessageBold}
                    >
                        PLEASE NOTE: Deleting your account means you will be removed from any groups you are a part of and some of your data in these groups will be deleted
                        (data that your group members don't have access to or don't need). Any groups that you are the sole member of will also be deleted. You will not be
                        able to recover your account or any deleted data. To confirm you want to delete your account please type the phrase "I want my account to be deleted"
                        (case-sensitive) in the text input below.
                    </Text>
                    <TextInput
                        style = {{width: "75%"}}
                        onChangeText={(text) => {
                            setDeletePhrase(text);
                        }}
                    />
                    <Dialog.Actions>
                        <Button
                            mode="contained"
                            disabled={deletePhrase !== "I want my account to be deleted"}
                            style={styles.deletePopUpButtons}
                            onPress={async () => {
                                const g = await firebase.firestore().collection('groups')
                                    .where('members', 'array-contains', user.toJSON().email).get();
                                    for (const groupDoc of g.docs) {
                                            //Any groups they are the last of run delete group code
                                            if (groupDoc.get('numMembers') > 1) {
                                                await UpdateGroup(groupDoc.id);
                                            }
                                            else {
                                                //Otherwise remove all their spells, weapons, armor etc. from any group they are in.
                                                await DeleteGroup(groupDoc.id);
                                            }
                                        }
                                    try {
                                        const userEmail = await JSON.parse(JSON.stringify(user.toJSON().email));
                                        await user.delete().then(() => {
                                            firebase
                                                .firestore()
                                                .collection('user-logs')
                                                .doc('user_deletion')
                                                .collection('logs')
                                                .doc(userEmail)
                                                .set({
                                                    text: `User ${userEmail} was deleted.`,
                                                    deletedOn: new Date().toString(),
                                                });
                                        }).then(() => {
                                            hideDeleteDialog();
                                        })
                                    }
                                    catch (e) {
                                        console.log(e);
                                        alert(e);
                                    }
                            }}
                        >
                            Delete
                        </Button>
                        <View style={styles.space} />
                        <Button
                            mode="contained"
                            style={styles.deletePopUpButtons}
                            onPress={hideDeleteDialog}
                        >
                            Cancel
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </KeyboardAwareScrollView>
    </Provider>
  );
}

MenuScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  createGroupInput: {
    width: '60.4%',
    marginLeft: screenWidth * -0.0042010502625656
  },

  createGroupButton: {
    paddingTop: screenHeight * 0.0132978723404255,
    paddingRight: screenWidth * 0.0052513128282071,
      marginLeft: screenWidth * -0.002,
    width: screenWidth * 0.16,
  },

  createGroupContainer: {
    flexDirection: 'row',
    marginLeft: screenWidth * 0.0075018754688672,
    marginTop: screenHeight * 0.0066489361702128,
      marginBottom: screenHeight * 0.0486489361702128,
  },

  groupContainer: {
    justifyContent: 'center',
    height: screenHeight * 0.0797872340425532,
    width: '65.8%',
    backgroundColor: Colors.white,
    elevation: 4,
    marginBottom: screenHeight * 0.0066489361702128,
    marginTop: screenHeight * 0.0066489361702128,
    marginLeft: screenWidth * 0.0037509377344336,
    marginRight: screenWidth * 0.0037509377344336,
  },

  editIcon: {
    position: 'absolute',
    right: screenWidth * 0.0145018754688672,
  },

  popUpContent: {
    width: '100%',
    height: '30%',
  },

  deleteAccount: {
      alignSelf: 'center',
      bottom: screenHeight * 0.02,
      marginBottom: screenHeight * 0.03,
  },

  popUpWindow: {
    width: '50%',
    alignItems: 'center',
    alignSelf: 'center',
  },

    deletePopUpWindowIOS: {
        width: '70%',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: screenHeight * -0.47563829787234
    },

    deletePopUpWindow: {
        width: '70%',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 0
    },

    deletePopUpButtons: {
        width: screenWidth * 0.13,
        marginTop: screenHeight * 0.022489361702128,
        marginBottom: screenHeight * 0.022489361702128,
    },

  popUpEditWindowIOS: {
    width: '50%',
    height: screenHeight * 0.2992021276595745,
    alignItems: 'center',
    alignSelf: 'center',
      marginTop: screenHeight * -0.44363829787234
  },
    popUpEditWindowAndroid: {
        width: '50%',
        height: screenHeight * 0.2992021276595745,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 0
    },

  warningMessage: {
    marginBottom: screenHeight * 0.0265957446808511,
    marginLeft: screenWidth * 0.0075018754688672,
      textAlign: 'center'
  },

    warningMessageBold: {
        marginBottom: screenHeight * 0.0265957446808511,
        marginLeft: screenWidth * 0.0075018754688672,
        fontWeight: 'bold',
        color: 'red',
        textAlign: 'center'
    },

  popUpTitle: {
    marginTop: screenHeight * 0.0132978723404255,
  },

  space: {
    width: screenWidth * 0.0225056264066017,
    height: screenHeight * 0.0398936170212766,
  },

  popUpButtons: {
    width: screenWidth * 0.07,
    marginBottom: screenHeight * 0.022489361702128,
  },

  popUpEditButtons: {
      width: screenWidth * 0.07,
    marginBottom: screenHeight * -0.0465425531914894,
  },

    popUpEditButtonsContainer: {
        width: '70%',
        marginBottom: screenHeight * 0.0066489361702128,
    },

  row: {
    flexDirection: 'row',
    width: screenWidth * 0.432
  },

  buttonItem: {
      width: screenWidth * 0.16,
    height: '91%',
    justifyContent: 'center',
    paddingTop: screenHeight * 0.0132978723404255,
    marginTop: screenHeight * 0.0053191489361702,
    position: 'absolute',
    right: 0,
    elevation: 5,
    paddingVertical: screenHeight * 0.0172872340425532,
  },

  container: {
    width: '80%',
    marginBottom: screenHeight * 0.0066489361702128,
    marginTop: screenHeight * 0.0066489361702128,
    marginLeft: screenWidth * 0.0037509377344336,
    marginRight: screenWidth * 0.0037509377344336,
    paddingHorizontal: screenWidth * 0.0075018754688672,
    paddingVertical: screenHeight * 0.0199468085106383,
  },

  title: {
    alignSelf: 'center',
    fontSize: 26,
    marginBottom: screenHeight * 0.066489361702128
  },
  wrapper: {
    alignSelf: 'center',
    marginTop: screenHeight * 0.0829787234042553,
    width: screenWidth * 0.4550937734433608,
  },
});
