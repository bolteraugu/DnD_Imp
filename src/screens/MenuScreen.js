import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {AuthUserContext} from '../navigation/AuthUserProvider';
import {
  Title,
  Button,
  Portal,
  Provider as PaperProvider,
  Dialog,
  Text,
  IconButton,
  TextInput,
} from 'react-native-paper';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Spinner from '../components/Spinner';
import Colors from '../utils/colors';

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
  const [groupName, setGroupName] = useState('');
  const [storedAccountType, setStoredAccountType] = useState('');
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
        })
        .then(
          (docRef) => {
            docRef.collection('messages').add({
              text: `You have joined the group ${groupName}.`,
              createdAt: new Date().toString(),
            });

            firebase
              .firestore()
              .collection('group-logs')
              .doc(docRef.id)
              .set({
                groupName: groupName,
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
              .then(navigation.navigate('Home'));
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

  return (
    <PaperProvider>
      <View style={styles.wrapper}>
        <Title style={styles.title}>My Groups</Title>
        <ScrollView>
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
                        if (doc.get('numMembers') === 0) {
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
                <Portal>
                  <Dialog
                    visible={editVisible}
                    onDismiss={hideEditDialog}
                    style={styles.popUpEditWindow}
                  >
                    <Dialog.Title style={styles.popUpTitle}>
                      Edit group name
                    </Dialog.Title>
                    <Dialog.Content style={styles.popUpContent}>
                      <TextInput
                        placeholder="New group name"
                        //value={newGroupName}
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
                            .firestore()
                            .collection('group-logs')
                            .doc(item._id)
                            .collection('logs')
                            .add({
                              text: `User ${
                                user.toJSON().email
                              } edited group name from ${
                                item.name
                              } to ${newGroupName}. The group name changed has been reflected
                                                                            in the corresponding document in group-logs too.`,
                              date: new Date().toString(),
                            })
                            .then(() => {
                              firebase
                                .firestore()
                                .collection('groups')
                                .doc(item._id)
                                .update({
                                  name: newGroupName,
                                })
                                .then(() => {
                                  firebase
                                    .firestore()
                                    .collection('group-logs')
                                    .doc(item._id)
                                    .update({
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
                    <Text
                      visible={warningVisible}
                      style={styles.warningMessage}
                    >
                      {' '}
                      NOTE: You are the last player in this group. Leaving it
                      will delete all data (characters, notes, messages etc.)
                    </Text>
                    <Dialog.Actions>
                      <Button
                        mode="contained"
                        style={styles.popUpButtons}
                        onPress={() =>
                          // Got some help for this from here: https://stackoverflow.com/questions/47860812/deleting-all-documents-in-firestore-collection
                          firebase
                            .firestore()
                            .collection('groups')
                            .doc(item._id)
                            .collection('messages')
                            .onSnapshot((snapshot) => {
                              snapshot.docs.forEach((doc) => {
                                firebase
                                  .firestore()
                                  .collection('groups')
                                  .doc(item._id)
                                  .collection('messages')
                                  .doc(doc.id)
                                  .delete();
                              });
                            }) &&
                          firebase
                            .firestore()
                            .collection('groups')
                            .doc(item._id)
                            .update({
                              members:
                                firebase.firestore.FieldValue.arrayRemove(
                                  user.toJSON().email
                                ),
                              numMembers:
                                firebase.firestore.FieldValue.increment(-1),
                            })
                            .then(() => {
                              firebase
                                .firestore()
                                .collection('group-logs')
                                .doc(item._id)
                                .collection('logs')
                                .add({
                                  text: `User ${
                                    user.toJSON().email
                                  } has left the group.`,
                                  date: new Date().toString(),
                                })
                                .then(() =>
                                  firebase
                                    .firestore()
                                    .collection('groups')
                                    .doc(item._id)
                                    .get()
                                    .then((doc) => {
                                      if (doc.get('numMembers') === 0) {
                                        firebase
                                          .firestore()
                                          .collection('group-logs')
                                          .doc(item._id)
                                          .collection('logs')
                                          .add({
                                            text: 'The group has been deleted.',
                                            date: new Date().toString(),
                                          })
                                          .then(() => {
                                            firebase
                                              .firestore()
                                              .collection('groups')
                                              .doc(item._id)
                                              .delete()
                                              .then(() => hideDialog());
                                          });
                                      }
                                    })
                                );
                            })
                        }
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
              showDeleteDialog();
            }}
          >
            Delete your account
          </Button>
          <Portal>
            <Dialog
              visible={deleteVisible}
              onDismiss={hideDeleteDialog}
              style={styles.popUpWindow}
            >
              <Dialog.Title style={styles.popUpTitle}>
                Are you sure you want to delete your account?
              </Dialog.Title>
              <Dialog.Actions>
                <Button
                  mode="contained"
                  style={styles.popUpButtons}
                  onPress={() => {
                    try {
                      user.delete();

                      firebase
                        .firestore()
                        .collection('user-logs')
                        .doc('user_deletion')
                        .collection('logs')
                        .doc(user.toJSON().email)
                        .get()
                        .then((snapshot) => {
                          setStoredAccountType(snapshot.get('accountType'));
                        });

                      firebase
                        .firestore()
                        .collection('user-logs')
                        .doc('user_deletion')
                        .collection('logs')
                        .doc(user.toJSON().email)
                        .set({
                          text: `User ${user.toJSON().email} was deleted.`,
                          accountType: storedAccountType,
                          deletedOn: new Date().toString(),
                        });
                    } catch (e) {
                      console.log(e);
                      alert(e);
                    }
                  }}
                >
                  Yes
                </Button>
                <View style={styles.space} />
                <Button
                  mode="contained"
                  style={styles.popUpButtons}
                  onPress={hideDeleteDialog}
                >
                  No
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </ScrollView>
      </View>
    </PaperProvider>
  );
}

MenuScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  createGroupInput: {
    width: '65%',
  },

  createGroupButton: {
    paddingTop: 10,
    paddingRight: 7,
    width: '35%',
  },

  createGroupContainer: {
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 5,
  },

  groupContainer: {
    justifyContent: 'center',
    height: 60,
    width: '65.8%',
    backgroundColor: Colors.white,
    elevation: 4,
    margin: 5,
  },

  editIcon: {
    position: 'absolute',
    right: 10,
  },

  popUpContent: {
    width: '100%',
    height: '30%',
  },

  deleteAccount: {
    marginTop: 400,
  },

  popUpWindow: {
    width: '40%',
    alignItems: 'center',
    alignSelf: 'center',
  },

  popUpEditWindow: {
    width: '40%',
    height: 225,
    alignItems: 'center',
    alignSelf: 'center',
  },

  warningMessage: {
    marginBottom: 20,
    marginLeft: 10,
  },

  popUpTitle: {
    marginTop: 10,
  },

  space: {
    width: 30,
    height: 30,
  },

  popUpButtons: {
    width: '25%',
    marginBottom: 5,
  },

  popUpEditButtons: {
    width: '25%',
    marginBottom: -35,
  },

  row: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },

  buttonItem: {
    width: '34.2%',
    height: '91%',
    paddingTop: 10,
    marginTop: 4,
    position: 'absolute',
    right: 0,
    elevation: 5,
    paddingVertical: 13,
  },

  container: {
    width: '80%',
    margin: 5,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },

  title: {
    alignSelf: 'center',
  },
  wrapper: {
    alignSelf: 'center',
    paddingTop: 100,
    width: 500,
  },
});
