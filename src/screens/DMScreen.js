import React, {useState, useEffect, useContext} from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    Keyboard,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import {Button, Dialog, IconButton, Portal, Provider, Text, TextInput, Title, Checkbox} from 'react-native-paper';
import CharacterCard from '../components/CharacterCard';
import Chat from '../components/Chat';
import CharacterTemplate from '../utils/character_template.json';
import Spinner from '../components/Spinner';
import firebase from 'firebase';
import 'firebase/firestore';
import {AuthUserContext} from "../navigation/AuthUserProvider";
import DropDown from "react-native-paper-dropdown";
import {Picker} from "@react-native-picker/picker";
import "../screens/NotesScreen"
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import colors from "../utils/colors";

global.screenWidth = Dimensions.get("window").width;
global.screenHeight = Dimensions.get("window").height;

export default function DMScreen({route, navigation}) {
  const {group} = route.params;
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const [visible, setVisible] = useState(false);
  const groupRef = firebase.firestore().collection('groups').doc(group._id);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inChangeDM, setInChangeDM] = useState(false);
    const [changePermissions, setChangePermissions] = useState(false);
    const [userPermissions, setUserPermissions] = useState(group);
  const [items, setItems] = useState(null);
  const [itemsWeb, setItemsWeb] = useState(null)
    const showImageDialog = () => setImageVisible(true);
    const hideImageDialog = () => setImageVisible(false);
    const [imageVisible, setImageVisible] = useState(false);
    const [imageToShow, setImageToShow] = useState("");
    const [nameToShow, setNameToShow] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const {user} = useContext(AuthUserContext);
  const [isDM, setIsDM] = useState(false);
  const [newDM, setNewDM] = useState("");
  const [chatImage, setChatImage] = useState("");
  const [chatImageName, setChatImageName] = useState("");
    const [chatImageUUID, setChatImageUUID] = useState("");
    const [assignVisible, setAssignVisible] = useState(false); //Whether the data is loading
    const showAssignDialog = () => setAssignVisible(true);
    const hideAssignDialog = () => setAssignVisible(false);
    const [assignItems, setAssignItems] = useState([]);
    const [assignItemsWeb, setAssignItemsWeb] = useState([]);
    const [showAssignDropDown, setShowAssignDropDown] = useState(false);
    const [recipients, setRecipients] = useState("");
    const [recipientsWeb, setRecipientsWeb] = useState("");
    const [assignCharacter, setAssignCharacter] = useState("");
    const [charIndex, setCharIndex] = useState("");
    const [deleteVisible, setDeleteVisible] = useState(false); //Whether the data is loading
    const showDeleteDialog = () => setDeleteVisible(true);
    const hideDeleteDialog = () => setDeleteVisible(false);
    const [deleteChar, setDeleteChar] = useState("");
    const [deleteAllVisible, setDeleteAllVisible] = useState(false); //Whether the data is loading
    const showDeleteAllDialog = () => setDeleteAllVisible(true);
    const hideDeleteAllDialog = () => setDeleteAllVisible(false);
    let assignIndex = 0;
    const [helpVisible, setHelpVisible] = useState(false);
    const hideHelpDialog = () => setHelpVisible(false);
    const showHelpDialog = () => setHelpVisible(true);
    const [helpTab, setHelpTab] = useState("Characters");

  global.showSettingsDialog = () => {
      Keyboard.dismiss();
      if (Platform.OS === 'web') {
          if (itemsWeb != null && itemsWeb.length !== 0) {
              setNewDM(itemsWeb[0]);
          }
      }
      showDialog();
      hideHelpDialog();
  };

    global.ShowHelpDM = () => {
        Keyboard.dismiss();
        setHelpTab("Characters");
        showHelpDialog();
    };

  global.navigateToNotes = () => {
      navigation.navigate('Notes', {
          groupRef: groupRef,
          isDM: isDM,
          userPermissions: userPermissions
      })
  };

  function updateCharacterFirebase(character) {
      groupRef
          .collection('characters')
          .doc(character._id)
          .update(character)
          .then(console.log('Successfully updated character'), (error) =>
              console.log('Failed to update character: ' + error)
          );
  }

  useEffect(() => {
      let isMounted = true;
      groupRef.onSnapshot((snapshot) => {
          if (isMounted) {
              const itemsTemp = [];
              const itemsWebTemp = [];
              const assignItemsWebTemp = [];
              let count = 0;
              setUserPermissions(snapshot.data());
              if (snapshot.get('members') != null) {
                  snapshot.get('members').forEach((mem) => {
                      if (mem !== user.toJSON().email) {
                          itemsTemp.push({
                              value: mem, label: mem
                          });
                          itemsWebTemp.push(mem);
                          assignItemsWebTemp.push(mem);
                          setItems(itemsTemp);
                          setAssignItems(itemsTemp);
                          setAssignItemsWeb(assignItemsWebTemp);
                          setItemsWeb(itemsWebTemp);
                          if (Platform.OS === 'web' && count === 0) {
                              count++;
                          }
                      }
                  })
                  groupRef.collection('members').doc(user.toJSON().email).onSnapshot((ss) => {
                      setIsDM(ss.get('isDM'));
                      setChatImage(ss.get('chatImage'));
                      setChatImageName(ss.get('actualImageName'));
                      setChatImageUUID(ss.get('imageUUID'));
                      if (ss.get('isDM')) {
                          groupRef.collection('characters').onSnapshot(
                              (querySnapshot) => {
                                  const characters = querySnapshot.docs.map((doc) => {
                                      const data = {
                                          _id: doc.id,
                                          ...doc.data(),
                                      };
                                      return data;
                                  });
                                  setCharacters(characters);

                                  if (loading) {
                                      setLoading(false);
                                  }
                              },
                              (error) => {
                                  alert(error);
                              }
                          );
                      }
                      else {
                          const characterListener = groupRef.collection('characters').onSnapshot(
                              (querySnapshot) => {
                                  let index = 0;
                                  const characters = querySnapshot.docs.map((doc) => {
                                      if (doc.get('assignedTo') === user.toJSON().email || userPermissions.viewAllCharacters) {
                                          const data = {
                                              _id: doc.id,
                                              index: index++,
                                              ...doc.data(),
                                          };
                                          return data;
                                      }
                                  });
                                  let charactersTemp = [];
                                  for (let i = 0; i < characters.length; i++) {
                                      if (characters[i] !== undefined && characters[i].assignedTo === user.toJSON().email) {
                                          charactersTemp.push(characters[i])
                                      }
                                  }
                                  for (let i = 0; i < characters.length; i++) {
                                      if (characters[i] !== undefined && !charactersTemp.includes(characters[i])) {
                                          charactersTemp.push(characters[i])
                                      }
                                  }
                                  setCharacters(charactersTemp);

                                  if (loading) {
                                      setLoading(false);
                                  }
                              },
                              (error) => {
                                  alert(error);
                              }
                          );
                      }
                  })
              }
      }
    })
      return () => { isMounted = false }
  }, []);

  if (loading) {
    return <Spinner />;
  }

  function deleteCharacter(character) {
      setLoading(true);
        groupRef
            .collection('characters')
            .doc(character._id)
            .delete()
            .then(console.log('Successfully deleted character'), (error) =>
                console.log('Failed to delete character: ' + error)
            ).then(() => {
                setLoading(false);
        });
  }

  function addCharacter() {
      if (isDM) {
          setLoading(true);
          groupRef
              .collection('characters')
              .add(CharacterTemplate)
              .then((char) => {
                  char.update({
                      assignedTo: ""
                  }).then(() => {
                      char.update({
                          canAssign: (assignItems.length > 0)
                      });
                  });
              }).then(() => {
              setLoading(false);
          })
              .then(console.log('Successfully added character'), (error) =>
                  alert(error)
              )
      }
      else {
          setLoading(true);
          console.log(assignItems.length);
          groupRef
              .collection('characters')
              .add(CharacterTemplate)
              .then((char) => {
                  char.update({
                      assignedTo: user.toJSON().email
                  }).then(() => {
                      char.update({
                          canAssign: (assignItems.length > 1)
                      });
                  });
              }).then(() => {
              setLoading(false);
          })
              .then(console.log('Successfully added character'), (error) =>
                  alert(error)
              );
      }

  }

  function updateCharacter(index, field, text) {
    const newCharacters = [...characters];
    newCharacters[index][field] = text;
    setCharacters(newCharacters);
  }

  function ButtonContainer() {
      if (isDM) {
          if (!inChangeDM && !changePermissions) {
              return (
                  <View style = {styles.dmButtonContainer}>
                      <Button
                          mode="contained"
                          style={styles.popUpEditButtons}
                          onPress={() => {
                              hideDialog();
                              navigation.navigate('ImageSelector', {
                                  comingFrom: "DMScreen",
                                  groupRef: groupRef,
                                  chatImage: chatImage,
                                  actualImageName: chatImageName,
                                  imageUUID: chatImageUUID
                              })
                          }}
                      >
                          Change chat profile picture
                      </Button>
                      <Button
                          style={styles.popUpEditButtons}
                          mode={"contained"}
                          onPress={() => {
                              showDeleteAllDialog();
                          }}
                      >
                          Delete all messages
                      </Button>
                      <Button
                          style={styles.popUpEditButtons}
                          mode={"contained"}
                          disabled = {items == null}
                          onPress={() => {
                              setInChangeDM(true);
                          }}
                      >
                          Change Dungeon Master
                      </Button>
                      <Button
                          style={styles.popUpEditButtons}
                          mode={"contained"}
                          onPress={() => {
                              setChangePermissions(true);
                          }}
                      >
                          Change player characters' permissions
                      </Button>
                  </View>
              )
          }
          else if (changePermissions) {
              return (
                  <View>
                      <View
                          style = {Platform.OS === 'web' ? styles.changePermissionsContainer : styles.changePermissionsContainer}
                      >
                          <View style={styles.checkboxContainer}>
                              <Text style={styles.checkboxText}>Can add recipients to the group</Text>
                              <Checkbox.Android
                                  status={userPermissions != null && userPermissions.addRecipients ? 'checked' : 'unchecked'}
                                  onPress={() => {
                                      let userPermissionsCopy = JSON.parse(JSON.stringify(userPermissions));
                                      userPermissionsCopy.addRecipients = !userPermissionsCopy.addRecipients
                                      setUserPermissions(userPermissionsCopy);
                                  }}
                              />
                          </View>
                          <View style={styles.checkboxContainer}>
                              <Text style={styles.checkboxText}>Can view and edit anyone's notes</Text>
                              <Checkbox.Android
                                  status={userPermissions != null && userPermissions.viewAllNotes ? 'checked' : 'unchecked'}
                                  onPress={() => {
                                      let userPermissionsCopy = JSON.parse(JSON.stringify(userPermissions));
                                      userPermissionsCopy.viewAllNotes = !userPermissionsCopy.viewAllNotes
                                      setUserPermissions(userPermissionsCopy);
                                  }}
                              />
                          </View>
                          <View style={styles.checkboxContainer}>
                              <Text style={styles.checkboxText}>Can share notes shared to them</Text>
                              <Checkbox.Android
                                  status={userPermissions != null && userPermissions.shareNotesSharedToThem ? 'checked' : 'unchecked'}
                                  onPress={() => {
                                      let userPermissionsCopy = JSON.parse(JSON.stringify(userPermissions));
                                      userPermissionsCopy.shareNotesSharedToThem = !userPermissionsCopy.shareNotesSharedToThem
                                      setUserPermissions(userPermissionsCopy);
                                  }}
                              />
                          </View>
                          <View style={styles.checkboxContainer}>
                              <Text style={styles.checkboxText}>Can delete their own characters</Text>
                              <Checkbox.Android
                                  status={userPermissions != null && userPermissions.deleteOwnCharacters ? 'checked' : 'unchecked'}
                                  onPress={() => {
                                      let userPermissionsCopy = JSON.parse(JSON.stringify(userPermissions));
                                      userPermissionsCopy.deleteOwnCharacters = !userPermissionsCopy.deleteOwnCharacters
                                      setUserPermissions(userPermissionsCopy);
                                  }}
                              />
                          </View>
                          <View style={styles.checkboxContainer}>
                              <Text style={styles.checkboxText}>Can view other players characters</Text>
                              <Checkbox.Android
                                  status={userPermissions != null && userPermissions.viewAllCharacters ? 'checked' : 'unchecked'}
                                  onPress={() => {
                                      let userPermissionsCopy = JSON.parse(JSON.stringify(userPermissions));
                                      userPermissionsCopy.viewAllCharacters = !userPermissionsCopy.viewAllCharacters
                                      setUserPermissions(userPermissionsCopy);
                                  }}
                              />
                          </View>
                          <View style = {{flexDirection: "row", marginTop: screenHeight * 0.025}}>
                              <Button
                                  style = {{width: screenWidth * 0.1}}
                                  mode = "contained"
                                  onPress = {() => {
                                      groupRef.update({
                                          addRecipients: userPermissions.addRecipients,
                                          viewAllNotes: userPermissions.viewAllNotes,
                                          shareNotesSharedToThem: userPermissions.shareNotesSharedToThem,
                                          deleteOwnCharacters: userPermissions.deleteOwnCharacters,
                                          viewAllCharacters: userPermissions.viewAllCharacters
                                      }).then(() => {
                                          setChangePermissions(false);
                                          hideDialog();
                                      })
                                  }}
                              >
                                  Change
                              </Button>
                              <View style = {styles.buttonGap}/>
                              <Button
                                  mode = "contained"
                                  style = {{width: screenWidth * 0.1}}
                                  onPress = {() => {
                                      setChangePermissions(false)
                                  }}
                              >
                                  Cancel
                              </Button>
                          </View>
                      </View>
                  </View>
                )
          }
          else {
              return (
                  <View>
                      <View
                        style = {Platform.OS === 'web' ? styles.dmSubmitButtonContainerWeb : styles.dmSubmitButtonContainer}
                      >
                          <Button
                            disabled = {newDM.length === 0}
                            style = {{width: screenWidth * 0.1}}
                            mode = "contained"
                            onPress = {() => {
                                setIsDM(false)
                                groupRef.collection('members').doc(user.toJSON().email).update({
                                    isDM: false
                                }).then(() => {
                                    groupRef.collection('members').doc(newDM).update({
                                        isDM: true
                                    })
                                })
                                setInChangeDM(false);
                                hideDialog();
                            }}
                          >
                              Change
                          </Button>
                          <View style = {styles.buttonGap}/>
                          <Button
                              mode = "contained"
                              style = {{width: screenWidth * 0.1}}
                              onPress = {() => {
                                setInChangeDM(false)
                              }}
                          >
                              Cancel
                          </Button>
                      </View>
                  </View>
              )
          }
      }
      else {
          return (
              <Button
                  mode="contained"
                  style={styles.popUpEditButtons}
                  onPress={() => {
                      hideDialog();
                      navigation.navigate('ImageSelector', {
                          comingFrom: "DMScreen",
                          groupRef: groupRef,
                          chatImage: chatImage,
                          actualImageName: chatImageName,
                          imageUUID: chatImageUUID
                      })
                  }}
              >
                  Change chat profile picture
              </Button>
          )
      }
  }

  if (characters == null || characters.length === 0) {
    return (
        <Provider>
            <View style={styles.wrapper}>
                <View style={styles.charactersContainer}>
                    <View>
                        <Button
                            mode="contained"
                            onPress={addCharacter}
                            style = {{marginLeft: screenWidth * 0.0037509377344336, marginRight: screenWidth * 0.0037109377344336, marginTop: screenHeight * 0.0046489361702128}}
                        >
                            Add New Character
                        </Button>
                    </View>
                </View>
                <Chat
                    navigation={navigation}
                    groupRef={groupRef}
                    itemsT={items}
                    isDM={isDM}
                    userPermissions={userPermissions}
                    showImage={(image, name) => {
                        setImageToShow(image);
                        setNameToShow(name);
                        showImageDialog();
                    }}
                />
            </View>
            <Portal>
                <Dialog
                    visible={visible}
                    onDismiss={() => {
                        setInChangeDM(false);
                        setChangePermissions(false);
                        hideDialog();
                    }}
                    style={isDM ? (inChangeDM ? styles.popUpChangeDMEditWindow : (changePermissions ? styles.permissionsWindow : styles.popUpDMEditWindow)) : styles.popUpEditWindow}
                >
                    <View
                        style = {styles.horzRow}
                    >
                        <Dialog.Title style={styles.popUpTitle}>
                            {inChangeDM ? "Change this group's Dungeon Master (DM)" : userPermissions ? "Change player characters' permissions" : "Settings"}
                        </Dialog.Title>

                        <IconButton
                            icon="close" //Getting the back icon image
                            size={36} //Setting the size
                            color="#a60000" //And the color
                            style = {styles.exitButton}
                            onPress={() => {
                                setInChangeDM(false);
                                setChangePermissions(false);
                                hideDialog()
                            }}
                        />
                    </View>
                    <Dialog.Actions>
                        <View style = {isDM ? styles.centerViewDM : styles.centerView}>
                            {inChangeDM && items != null ?
                                <View style = {styles.dropdown}>
                                    <Text
                                        style = {styles.changeDMWarning}
                                    >
                                        Please note that a group can only have one DM. Therefore changing the DM to another group member means you will become a player
                                        character and will have the default player permissions.
                                    </Text>
                                    {Platform.OS === 'web' ?
                                        <Picker
                                            selectedValue={newDM}
                                            onValueChange={(itemValue, itemIndex) => {
                                                setNewDM(itemValue)
                                            }}
                                            style={styles.totalDropdownStyle}
                                        >
                                            {
                                                itemsWeb.map((mem) => {
                                                    return (
                                                        <Picker.Item label={mem} value={mem}/>
                                                    );
                                                })
                                            }
                                        </Picker>
                                        :
                                        <View style = {{marginTop: screenHeight * 0.015}}>
                                            <DropDown
                                                label={"Please select user..."}
                                                list={items}
                                                visible={showDropDown}
                                                showDropDown={() => {
                                                    setShowDropDown(true);
                                                }}
                                                onDismiss={() => setShowDropDown(false)}
                                                dropDownStyle={Platform.OS === 'ios' ? styles.shareDropdownIOS : styles.shareDropdown}
                                                setValue={setNewDM}
                                                value={newDM}
                                            />
                                        </View>
                                    }
                                </View>
                                :
                                null
                            }
                            <ButtonContainer/>
                        </View>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <Portal>
                <Dialog
                    visible={imageVisible}
                    onDismiss={hideImageDialog}
                    style = {styles.fullSizeWindow}
                >
                    <View style = {styles.headingRow}>
                        <View style = {styles.centerFSImageTitle}>
                            <Title
                                style = {styles.helpTitle}
                            >
                                {nameToShow !== "" ? nameToShow : ""}
                            </Title>
                        </View>
                        <IconButton
                            icon="close" //Getting the back icon image
                            size={38} //Setting the size
                            color="#a60000" //And the color
                            style = {styles.exitButtonWeb}
                            onPress={() => {
                                hideImageDialog()
                            }} //When clicked on make it go back to the previous route
                        />
                    </View>
                    <Image
                        source={imageToShow !== "" ? {uri: imageToShow} : {uri: ""}}
                        style={styles.fullSizeImage}
                    />
                    <View/>
                </Dialog>
            </Portal>
            <Portal>
                <Dialog
                    visible={helpVisible}
                    onDismiss={hideHelpDialog}
                    style={styles.helpWindow}
                >
                    <View style = {{alignSelf: 'center'}}>
                        <Dialog.Title
                            style={styles.helpWindowTitle}
                        >
                            Group Overview Screen Help
                        </Dialog.Title>
                    </View>
                    <IconButton
                        icon="close" //Getting the back icon image
                        size={36} //Setting the size
                        color="#a60000" //And the color
                        style = {styles.exitButtonHelp}
                        onPress={() => {
                            hideHelpDialog()
                        }}
                    />
                    <Text
                        style={styles.helpTextBold}
                    >
                        Please note that this help window is available on every screen by clicking on the help icon in the top right corner. The information shown in this window differs depending on the screen you are on.
                    </Text>
                    <View style = {styles.tabContainer}>
                        <TouchableOpacity
                            style = {helpTab === 'Characters' ? styles.currentTab : styles.otherTab}
                            onPress={() => setHelpTab('Characters')}
                        >
                            <Text style = {helpTab === 'Characters' ? styles.mainTabText : styles.otherTabText}>General</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style = {helpTab === 'Chat' ? styles.currentTab : styles.otherTab}
                            onPress={() => setHelpTab('Chat')}
                        >
                            <Text style = {helpTab === 'Chat' ? styles.mainTabText : styles.otherTabText}>Chat</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style = {helpTab === 'Default Permissions' ? styles.currentTab : styles.otherTab}
                            onPress={() => setHelpTab('Default Permissions')}
                        >
                            <Text style = {helpTab === 'Default Permissions' ? styles.mainTabText : styles.otherTabText}>Permissions</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style = {helpTab === 'Settings' ? styles.currentTab : styles.otherTab}
                            onPress={() => setHelpTab('Settings')}
                        >
                            <Text style = {helpTab === 'Settings' ? styles.mainTabText : styles.otherTabText}>Settings</Text>
                        </TouchableOpacity>
                    </View>

                    <Dialog.Content>
                        {helpTab === 'Characters' ?
                            <Text>
                                - To create a new character click the add new character button. There is no limit to the number of characters you can create.{'\n\n'}

                                - To view a character's image in it's full resolution you can click on the image. To delete a character press the delete
                                button.{'\n\n'}

                                - To see the full details of a character view the 'Full Character Sheet' screen click the 'Full Character Sheet' button.
                                You can change a character's image in this screen.{'\n\n'}

                                - To hide a character from your current view press the hide button. If you want to show the character again then click the black show
                                button that is visible when the character is hidden.{'\n\n'}

                                - To assign/unassign a player character to/from a character use the assign and unassign buttons. Multiple player characters can't be
                                assigned to the same character. Assigning a player character to the character gives them access to view and edit the character. {'\n\n'}

                                - Dungeon Master's can't assign characters to themselves and characters they created will be unassigned. Characters player characters create will
                                be assigned to themselves. There is no limit to the number of characters a player character is assigned to.{'\n\n'}

                                - To access the notes screen click the notes icon in between the help icon and the settings icon.{'\n\n'}

                                - People can be added to the group by clicking the plus person icon button in the top right corner of the screen and submitting
                                their email in the text input provided. There is no limit to the number of members that can be in a group. People that are added to
                                a group will be a player character as a group can only have one Dungeon Master.
                            </Text>
                            :
                            helpTab === 'Chat' ?
                                <Text>
                                    - To send a text message in chat type the message in the text input and press the send button.{'\n\n'}

                                    - If you would like to send an image click the image icon in the text input. Clicking this will take you to the 'Image Selector'
                                    screen where you can upload and select a new image or select one you have used in this past.{'\n\n'}

                                    - By default, when you send a message it will send it to all group members. To specify what members you want to send it to you
                                    can use the select recipients dropdown at the top of the chat window.{'\n\n'}

                                    - You can see the full resolution of your chat profile image or images you send in chat by clicking on the image.{'\n\n'}

                                    - The chat is also searchable. Clicking on the search icon will show a window where you can submit a search term (case-sensitive).
                                    Once submitted only messages that contain the search term will be shown. To clear the search term (i.e. show all messages) you
                                    can click the clear search button and to edit the search you can click the edit search button.{'\n\n'}

                                    - To delete messages click the enable message selection button which will allow you to select messages by showing checkboxes
                                    next to the messages. Any selected messages (messages with the checkbox checked) will be deleted when the delete selected
                                    messages button is clicked. Messages that are deleted, show the text "This message has been deleted" to avoid group members
                                    getting confused. To disable message selection click the disable message selection button.{'\n\n'}

                                    - The chat is also searchable. Clicking on the search icon will show a window where you can submit a search term (case-sensitive).
                                    Once submitted only messages that contain the search term will be shown. To clear the search term (i.e. show all messages) you
                                    can click the clear search button and to edit the search you can click the edit search button.
                                </Text>
                                :
                                helpTab === 'Default Permissions' ?
                                    <Text style = {{marginBottom: screenHeight * -0.012}}>
                                        <Text style={{fontWeight: "bold"}}>Dungeon Master's permissions:{'\n'}</Text>
                                        - Can view, edit, hide, assign, unassign and delete any character.{'\n'}
                                        - Can add people to the group.{'\n'}
                                        - Can view, edit, share and delete any note.{'\n'}
                                        - Can change who the dungeon master is.{'\n'}
                                        - Can change player characters' default permissions.{'\n'}
                                        - Can delete all chat messages at once.{'\n'}
                                        - Can edit the group name.{'\n'}
                                        - Can leave the group.{'\n'}
                                        - Has access to all chat features (to learn about the chat features click on the 'Chat' tab of this window).{'\n'}
                                        - Can only see and delete messages that are sent to them.{'\n'}
                                        - Can set their chat profile image.{'\n'}
                                        - Can upload, share, delete and edit the name of images.{'\n\n'}

                                        <Text style={{fontWeight: "bold"}}>Player characters' default permissions:{'\n'}</Text>
                                        - Can view, edit and hide any characters assigned to them.{'\n'}
                                        - Can view and edit any note created by them or shared to them.{'\n'}
                                        - Can share any note they created but can't share notes that were shared to them.{'\n'}
                                        - Can edit the group name.{'\n'}
                                        - Can leave the group.{'\n'}
                                        - Has access to all chat features.{'\n'}
                                        - Can only see messages that are sent to them and can only delete messages they send.{'\n'}
                                        - Can set their chat profile image.{'\n'}
                                        - Can upload, share, delete and edit the name of images.
                                    </Text>
                                    :
                                    <Text>
                                        The settings can be accessed by clicking on the settings cog icon in the top right corner of the screen.{'\n\n'}
                                        <Text style={{fontWeight: "bold"}}>Settings available to the Dungeon Master and player characters:{'\n'}</Text>
                                        - Change chat profile picture. Clicking this button will take you to the 'Image Selector' screen where you can upload and
                                        select a new image or select one you have used in this past. Submitting the selected image will change your chat profile
                                        image (the image that shows up next to your chat messages).{'\n\n'}

                                        <Text style={{fontWeight: "bold"}}>Settings available only to the Dungeon Master:{'\n'}</Text>
                                        - Delete all chat messages. This setting deletes all messages in the chat permanently. Unlike deleting selected messages,
                                        this does not change the text to "This message has been deleted" but instead permanently deletes them. As there is no limit
                                        to the number of messages that can be stored, it is advised to only use this feature when it is needed.{'\n'}
                                        - Change dungeon master. This setting is for changing the group's Dungeon Master and since a group can only have one Dungeon
                                        Master, the existing Dungeon Master will become a player character when the change is applied.{'\n'}
                                        - Change player character's permissions. This setting allows the default permissions for player characters to be changed.
                                        The change in default permissions is applied to all existing player characters and any future ones that join the group. The
                                        specific permissions that can be set are self-explanatory but it is important to note that enabling the 'Can view other
                                        players' characters' include unassigned characters and does not include editing or deleting the characters (i.e. read-only
                                        view).
                                    </Text>
                        }
                    </Dialog.Content>
                </Dialog>
            </Portal>
        </Provider>
    );
  }
  else {
      let index = 0;
    return (
        <Provider>
            <KeyboardAwareScrollView>
            <View style={styles.wrapper}>
              <View style={styles.charactersContainer}>
                  <FlatList
                      data={characters}
                      removeClippedSubviews={true}
                      keyExtractor={(item) => item._id}
                      renderItem={({ item }) => (
                          <CharacterCard
                              isDM={isDM}
                              character={item}
                              index={index++}
                              showConfirmationDialog={(character) => {
                                  setDeleteChar(character);
                                  showDeleteDialog();
                              }}
                              updateCanAssign={(character, index) => {
                                  let canAssign = assignItemsWeb.length > 0;
                                  updateCharacter(index, 'canAssign', canAssign);
                                  updateCharacterFirebase(character);
                              }}
                              showAssign={(character, index) => {
                                  setAssignCharacter(character);
                                  setCharIndex(index);
                                  if (Platform.OS === 'web') {
                                      setRecipientsWeb(assignItemsWeb.filter(val => val !== character.assignedTo)[0])
                                  }
                                  showAssignDialog();
                              }}
                              userPermissions={userPermissions}
                              showImage={(image, name) => {
                                  setImageToShow(image);
                                  setNameToShow(name);
                                  showImageDialog();
                              }}
                              groupRef={groupRef}
                              onChange={updateCharacter}
                              navigation={navigation}
                          />
                      )}
                      ListFooterComponent={
                        <View style = {styles.gap}>
                          <Button
                              style = {{marginLeft: screenWidth * 0.0037509377344336, marginRight: screenWidth * 0.0037109377344336, marginTop: screenHeight * 0.0046489361702128}}
                              mode="contained"
                              onPress={addCharacter}
                          >
                            Add New Character
                          </Button>
                        </View>
                      }
                  />
              </View>
              <Chat
                  navigation={navigation}
                  groupRef={groupRef}
                  itemsT={items}
                  isDM={isDM}
                  userPermissions={userPermissions}
                  showImage={(image, name) => {
                      setImageToShow(image);
                      setNameToShow(name);
                      showImageDialog();
                  }}
              />
            </View>
        </KeyboardAwareScrollView>
            <Portal>
                <Dialog
                    visible={assignVisible}
                    onDismiss={hideAssignDialog}
                    style={styles.assignWindow}
                >
                    <Dialog.Title
                        style={styles.assignTitle}>
                        Assign a user to this character
                    </Dialog.Title>
                    <Dialog.Content>
                        {Platform.OS === 'web' ?
                                <Picker
                                    selectedValue={recipientsWeb}
                                    onValueChange={(itemValue, itemIndex) => {
                                        setRecipientsWeb(itemValue)
                                    }}
                                    style={styles.iosDropdownStyle}
                                >
                                    {
                                        assignItemsWeb.map((mem) => {
                                            if (mem !== assignCharacter.assignedTo) {
                                                return (
                                                    <Picker.Item label={mem} value={mem} key={assignIndex++}/>
                                                );
                                            }
                                        })
                                    }
                                </Picker>
                            :

                            <DropDown
                                label={"Please select a user..."}
                                list={assignItems.filter(val => val.label !== assignCharacter.assignedTo)}
                                visible={showAssignDropDown}
                                showDropDown={() => setShowAssignDropDown(true)}
                                onDismiss={() => setShowAssignDropDown(false)}
                                dropDownStyle={styles.shareDropdown}
                                setValue={setRecipients}
                                value={recipients}
                            />
                        }
                    </Dialog.Content>
                    <Dialog.Actions>
                        <View style={styles.assignButtonContainer}>
                            <Button
                                mode="contained"
                                style={styles.assignButton}
                                disabled={Platform.OS === 'web'
                                    ? recipientsWeb == null || recipientsWeb.length === 0
                                    : recipients == null || recipients.length === 0
                                }
                                onPress={() => {
                                    if (Platform.OS === 'web') {
                                        let canAssign = assignItemsWeb.filter(val => val !== recipientsWeb).length > 0
                                        updateCharacter(charIndex, 'canAssign', canAssign);
                                        updateCharacter(charIndex, 'assignedTo', recipientsWeb);
                                        groupRef
                                            .collection('characters')
                                            .doc(assignCharacter._id)
                                            .update(assignCharacter)
                                            .then(console.log('Successfully updated character'), (error) =>
                                                console.log('Failed to update character: ' + error)
                                            );
                                        setRecipientsWeb("");
                                        hideAssignDialog();
                                    }
                                    else {
                                        let canAssign = assignItemsWeb.filter(val => val !== recipients).length > 0
                                        updateCharacter(charIndex, 'canAssign', canAssign);
                                        updateCharacter(charIndex, 'assignedTo', recipients);
                                        groupRef
                                            .collection('characters')
                                            .doc(assignCharacter._id)
                                            .update(assignCharacter)
                                            .then(console.log('Successfully updated character'), (error) =>
                                                console.log('Failed to update character: ' + error)
                                            );
                                        setRecipients("");
                                        hideAssignDialog();
                                    }
                                }}
                            >
                                Assign
                            </Button>
                            <View style={styles.assignGap}/>
                            <Button
                                mode="contained"
                                style={styles.assignButton}
                                onPress={hideAssignDialog}
                            >
                                Cancel
                            </Button>
                        </View>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <Portal>
                <Dialog
                    visible={deleteVisible}
                    onDismiss={hideDeleteDialog}
                    style={styles.assignWindow}
                >
                    <Dialog.Title
                        style={styles.assignTitle}
                    >
                        Are you sure you want to delete this character?
                    </Dialog.Title>
                    <Dialog.Content>
                        <Text
                            style={styles.assignTitle}
                        >
                            NOTE: If you delete this character you will not be able to recover it. It will also be deleted for any user who has access to it.
                        </Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <View style={styles.assignButtonContainer}>
                            <Button
                                mode="contained"
                                style={styles.assignButton}
                                onPress={() => {
                                    hideDeleteDialog();
                                    deleteCharacter(deleteChar);
                                }}
                            >
                                Yes
                            </Button>
                            <View style={styles.assignGap}/>
                            <Button
                                mode="contained"
                                style={styles.assignButton}
                                onPress={hideDeleteDialog}
                            >
                                No
                            </Button>
                        </View>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <Portal>
                <Dialog
                    visible={visible}
                    onDismiss={() => {
                        setInChangeDM(false);
                        setChangePermissions(false);
                        hideDialog();
                    }}
                    style={isDM ? (inChangeDM ? styles.popUpChangeDMEditWindow : (changePermissions ? styles.permissionsWindow : styles.popUpDMEditWindow)) : styles.popUpEditWindow}
                >
                    <View
                        style = {styles.horzRow}
                    >
                        <Dialog.Title style={styles.popUpTitle}>
                            {inChangeDM ? "Change this group's Dungeon Master (DM)" : userPermissions ? "Change player characters' permissions" : "Settings"}
                        </Dialog.Title>

                        <IconButton
                            icon="close" //Getting the back icon image
                            size={36} //Setting the size
                            color="#a60000" //And the color
                            style = {styles.exitButton}
                            onPress={() => {
                                setInChangeDM(false);
                                setChangePermissions(false);
                                hideDialog()
                            }}
                        />
                    </View>
                    <Dialog.Actions>
                        <View style = {isDM ? styles.centerViewDM : styles.centerView}>
                            {inChangeDM && items != null ?
                                <View style = {styles.dropdown}>
                                    <Text
                                        style = {styles.changeDMWarning}
                                    >
                                        Please note that a group can only have one DM. Therefore changing the DM to another group member means you will become a player
                                        character and will have the default player permissions.
                                    </Text>
                                    {Platform.OS === 'web' ?
                                        <Picker
                                            selectedValue={newDM}
                                            onValueChange={(itemValue, itemIndex) => {
                                                setNewDM(itemValue)
                                            }}
                                            style={styles.totalDropdownStyle}
                                        >
                                            {
                                                itemsWeb.map((mem) => {
                                                    return (
                                                        <Picker.Item label={mem} value={mem}/>
                                                    );
                                                })
                                            }
                                        </Picker>
                                        :
                                        <View style = {{marginTop: screenHeight * 0.015}}>
                                            <DropDown
                                                label={"Please select user..."}
                                                list={items}
                                                visible={showDropDown}
                                                showDropDown={() => {
                                                    setShowDropDown(true);
                                                }}
                                                onDismiss={() => setShowDropDown(false)}
                                                dropDownStyle={styles.shareDropdown}
                                                setValue={setNewDM}
                                                value={newDM}
                                            />
                                        </View>
                                    }
                                </View>
                                :
                                null
                            }
                            <ButtonContainer/>
                        </View>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <Portal>
                <Dialog
                    visible={deleteAllVisible}
                    onDismiss={hideDeleteAllDialog}
                    style={styles.assignWindow}
                >
                    <Dialog.Title
                        style={styles.assignTitle}
                    >
                        Are you sure you want to delete all chat messages?
                    </Dialog.Title>
                    <Dialog.Content>
                        <Text
                            style={styles.assignTitle}
                        >
                            NOTE: If you delete all chat messages you will not be able to recover them.
                        </Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <View style={styles.assignButtonContainer}>
                            <Button
                                mode="contained"
                                style={styles.assignButton}
                                onPress={() => {
                                    groupRef.collection('messages').get().then((snapshot) => {
                                        snapshot.docs.forEach(doc => {
                                            doc.ref.delete();
                                        })
                                    }).then(() => {
                                        hideDeleteAllDialog();
                                        hideDialog();
                                    })
                                }}
                            >
                                Yes
                            </Button>
                            <View style={styles.assignGap}/>
                            <Button
                                mode="contained"
                                style={styles.assignButton}
                                onPress={hideDeleteAllDialog}
                            >
                                No
                            </Button>
                        </View>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <Portal>
                <Dialog
                    visible={imageVisible}
                    onDismiss={hideImageDialog}
                    style = {styles.fullSizeWindow}
                >
                    <View style = {styles.headingRow}>
                        <View style = {styles.centerFSImageTitle}>
                            <Title
                                style = {styles.helpTitle}
                            >
                                {nameToShow !== "" ? nameToShow : ""}
                            </Title>
                        </View>
                        <IconButton
                            icon="close" //Getting the back icon image
                            size={38} //Setting the size
                            color="#a60000" //And the color
                            style = {styles.exitButtonWeb}
                            onPress={() => {
                                hideImageDialog()
                            }} //When clicked on make it go back to the previous route
                        />
                    </View>
                    <Image
                        source={imageToShow !== "" ? {uri: imageToShow} : {uri: ""}}
                        style={styles.fullSizeImage}
                    />
                    <View/>
                </Dialog>
            </Portal>
            <Portal>
                <Dialog
                    visible={helpVisible}
                    onDismiss={hideHelpDialog}
                    style={styles.helpWindow}
                >
                    <View style = {{alignSelf: 'center'}}>
                        <Dialog.Title
                            style={styles.helpWindowTitle}
                        >
                            Group Overview Screen Help
                        </Dialog.Title>
                    </View>
                    <IconButton
                        icon="close" //Getting the back icon image
                        size={36} //Setting the size
                        color="#a60000" //And the color
                        style = {styles.exitButtonHelp}
                        onPress={() => {
                            hideHelpDialog()
                        }}
                    />
                    <Text
                        style={styles.helpTextBold}
                    >
                        Please note that this help window is available on every screen by clicking on the help icon in the top right corner. The information shown in this window differs depending on the screen you are on.
                    </Text>
                    <View style = {styles.tabContainer}>
                        <TouchableOpacity
                            style = {helpTab === 'Characters' ? styles.currentTab : styles.otherTab}
                            onPress={() => setHelpTab('Characters')}
                        >
                            <Text style = {helpTab === 'Characters' ? styles.mainTabText : styles.otherTabText}>General</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style = {helpTab === 'Chat' ? styles.currentTab : styles.otherTab}
                            onPress={() => setHelpTab('Chat')}
                        >
                            <Text style = {helpTab === 'Chat' ? styles.mainTabText : styles.otherTabText}>Chat</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style = {helpTab === 'Default Permissions' ? styles.currentTab : styles.otherTab}
                            onPress={() => setHelpTab('Default Permissions')}
                        >
                            <Text style = {helpTab === 'Default Permissions' ? styles.mainTabText : styles.otherTabText}>Permissions</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style = {helpTab === 'Settings' ? styles.currentTab : styles.otherTab}
                            onPress={() => setHelpTab('Settings')}
                        >
                            <Text style = {helpTab === 'Settings' ? styles.mainTabText : styles.otherTabText}>Settings</Text>
                        </TouchableOpacity>
                    </View>

                    <Dialog.Content>
                        {helpTab === 'Characters' ?
                            <Text>
                                - To create a new character click the add new character button. There is no limit to the number of characters you can create.{'\n\n'}

                                - To view a character's image in it's full resolution you can click on the image. To delete a character press the delete
                                button.{'\n\n'}

                                - To see the full details of a character view the 'Full Character Sheet' screen click the 'Full Character Sheet' button.
                                You can change a character's image in this screen.{'\n\n'}

                                - To hide a character from your current view press the hide button. If you want to show the character again then click the black show
                                button that is visible when the character is hidden.{'\n\n'}

                                - To assign/unassign a player character to/from a character use the assign and unassign buttons. Multiple player characters can't be
                                assigned to the same character. Assigning a player character to the character gives them access to view and edit the character. {'\n\n'}

                                - Dungeon Master's can't assign characters to themselves and characters they created will be unassigned. Characters player characters create will
                                be assigned to themselves. There is no limit to the number of characters a player character is assigned to.{'\n\n'}

                                - To access the notes screen click the notes icon in between the help icon and the settings icon.{'\n\n'}

                                - People can be added to the group by clicking the plus person icon button in the top right corner of the screen and submitting
                                their email in the text input provided. There is no limit to the number of members that can be in a group. People that are added to
                                a group will be a player character as a group can only have one Dungeon Master.
                            </Text>
                            :
                            helpTab === 'Chat' ?
                                <Text>
                                    - To send a text message in chat type the message in the text input and press the send button.{'\n\n'}

                                    - If you would like to send an image click the image icon in the text input. Clicking this will take you to the 'Image Selector'
                                    screen where you can upload and select a new image or select one you have used in this past.{'\n\n'}

                                    - By default, when you send a message it will send it to all group members. To specify what members you want to send it to you
                                    can use the select recipients dropdown at the top of the chat window.{'\n\n'}

                                    - You can see the full resolution of your chat profile image or images you send in chat by clicking on the image.{'\n\n'}

                                    - The chat is also searchable. Clicking on the search icon will show a window where you can submit a search term (case-sensitive).
                                    Once submitted only messages that contain the search term will be shown. To clear the search term (i.e. show all messages) you
                                    can click the clear search button and to edit the search you can click the edit search button.{'\n\n'}

                                    - To delete messages click the enable message selection button which will allow you to select messages by showing checkboxes
                                    next to the messages. Any selected messages (messages with the checkbox checked) will be deleted when the delete selected
                                    messages button is clicked. Messages that are deleted, show the text "This message has been deleted" to avoid group members
                                    getting confused. To disable message selection click the disable message selection button.{'\n\n'}

                                    - The chat is also searchable. Clicking on the search icon will show a window where you can submit a search term (case-sensitive).
                                    Once submitted only messages that contain the search term will be shown. To clear the search term (i.e. show all messages) you
                                    can click the clear search button and to edit the search you can click the edit search button.
                                </Text>
                                :
                                helpTab === 'Default Permissions' ?
                                    <Text style = {{marginBottom: screenHeight * -0.012}}>
                                        <Text style={{fontWeight: "bold"}}>Dungeon Master's permissions:{'\n'}</Text>
                                        - Can view, edit, hide, assign, unassign and delete any character.{'\n'}
                                        - Can add people to the group.{'\n'}
                                        - Can view, edit, share and delete any note.{'\n'}
                                        - Can change who the dungeon master is.{'\n'}
                                        - Can change player characters' default permissions.{'\n'}
                                        - Can delete all chat messages at once.{'\n'}
                                        - Can edit the group name.{'\n'}
                                        - Can leave the group.{'\n'}
                                        - Has access to all chat features (to learn about the chat features click on the 'Chat' tab of this window).{'\n'}
                                        - Can only see and delete messages that are sent to them.{'\n'}
                                        - Can set their chat profile image.{'\n'}
                                        - Can upload, share, delete and edit the name of images.{'\n\n'}

                                        <Text style={{fontWeight: "bold"}}>Player characters' default permissions:{'\n'}</Text>
                                        - Can view, edit and hide any characters assigned to them.{'\n'}
                                        - Can view and edit any note created by them or shared to them.{'\n'}
                                        - Can share any note they created but can't share notes that were shared to them.{'\n'}
                                        - Can edit the group name.{'\n'}
                                        - Can leave the group.{'\n'}
                                        - Has access to all chat features.{'\n'}
                                        - Can only see messages that are sent to them and can only delete messages they send.{'\n'}
                                        - Can set their chat profile image.{'\n'}
                                        - Can upload, share, delete and edit the name of images.
                                    </Text>
                                    :
                                    <Text>
                                        The settings can be accessed by clicking on the settings cog icon in the top right corner of the screen.{'\n\n'}
                                        <Text style={{fontWeight: "bold"}}>Settings available to the Dungeon Master and player characters:{'\n'}</Text>
                                        - Change chat profile picture. Clicking this button will take you to the 'Image Selector' screen where you can upload and
                                        select a new image or select one you have used in this past. Submitting the selected image will change your chat profile
                                        image (the image that shows up next to your chat messages).{'\n\n'}

                                        <Text style={{fontWeight: "bold"}}>Settings available only to the Dungeon Master:{'\n'}</Text>
                                        - Delete all chat messages. This setting deletes all messages in the chat permanently. Unlike deleting selected messages,
                                        this does not change the text to "This message has been deleted" but instead permanently deletes them. As there is no limit
                                        to the number of messages that can be stored, it is advised to only use this feature when it is needed.{'\n'}
                                        - Change dungeon master. This setting is for changing the group's Dungeon Master and since a group can only have one Dungeon
                                        Master, the existing Dungeon Master will become a player character when the change is applied.{'\n'}
                                        - Change player character's permissions. This setting allows the default permissions for player characters to be changed.
                                        The change in default permissions is applied to all existing player characters and any future ones that join the group. The
                                        specific permissions that can be set are self-explanatory but it is important to note that enabling the 'Can view other
                                        players' characters' include unassigned characters and does not include editing or deleting the characters (i.e. read-only
                                        view).
                                    </Text>
                        }
                    </Dialog.Content>
                </Dialog>
            </Portal>
        </Provider>
    );
  }
}

DMScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
    exitButtonHelp: {
        left: screenWidth * 0.765,
        top: screenHeight * -0.02,
        position: 'absolute'
    },
    helpWindow: {
        width: screenWidth * 0.805,
        alignSelf: 'center',
        marginTop: screenHeight * 0.03
        //height : screenHeight * 0.575
    },
    helpWindowTitle: {
        alignSelf: 'center',
        textAlign: 'center'
    },
    helpTextBold: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: screenHeight * 0.02,
        marginLeft: screenWidth * 0.02,
        marginRight: screenWidth * 0.02,
    },
    tabContainer: {
        flexDirection: 'row',
        width: "100%",
        height: screenHeight * 0.06,
        backgroundColor: "#f7f7f7",
        marginBottom: screenHeight * 0.03
    },
    currentTab: {
        flex: 1,
        borderBottomWidth: 2,
        borderColor: "black",
        justifyContent: 'center',
        textAlign: 'center'
    },
    otherTab: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        borderBottomWidth: 1,
        borderColor: colors.primary,
    },
    otherTabText: {
        fontSize: 13,
        color: colors.primary,
        textAlign: 'center'
    },
    mainTabText: {
        fontSize: 13,
        color: "black",
        textAlign: 'center'
    },
    iosDropdownStyle: {
        width: screenWidth * 0.3345843960990248,
        height: screenHeight * 0.0598404255319149,
        marginLeft: screenWidth * 0.08,
        marginBottom: screenHeight * 0.033,
        flex: 1,
        color: "#787878"
    },
    shareDropdownIOS: {
        marginTop: screenHeight * -0.00463829787234,
    },
    assignGap: {
        width: screenWidth * 0.04
    },
    assignWindow: {
        width: screenWidth * 0.525,
        alignSelf: 'center',
        marginTop: screenHeight * -0.1663829787234
    },
    assignTitle: {
        alignSelf: 'center',
        textAlign: 'center'
    },
    assignButtonContainer: {
        justifyContent: 'center',
        marginBottom: screenHeight * 0.020363829787234,
        width: "100%",
        flexDirection: 'row',
    },
    assignButton: {
        width: screenWidth * 0.1
    },
    permissionsWindow: {
        width: "50%",
        alignSelf: 'center',
        marginTop: screenHeight * -0.07,
        height: "53%"
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignSelf: 'center'
    },
    checkboxText: {
        marginTop: screenHeight * 0.0079787234042553,
        marginLeft: screenWidth * 0.0045011252813203,
    },
    changePermissionsContainer: {
        alignSelf: 'center',
        flexDirection: 'column',
        marginTop: screenHeight * -0.105,
    },
    totalDropdownStyle: {
        marginTop: screenHeight * 0.048
    },
    shareDropdown: {
        marginTop: screenHeight * -0.020363829787234
    },
    buttonGap: {
        width: screenWidth * 0.0390037509377344
    },
    dropdown: {
        alignSelf: 'center',
        width: "85%",
        marginTop: screenHeight * 0.05
    },
    dmSubmitButtonContainer: {
        flexDirection: 'row',
        marginTop: screenHeight * 0.02,
        alignSelf: 'center'
    },
    dmSubmitButtonContainerWeb: {
        flexDirection: 'row',
        marginTop: screenHeight * 0.04,
        alignSelf: 'center'
    },
    changeDMWarning: {
        textAlign: 'center',
        marginTop: screenHeight * -0.113
    },
    dmButtonContainer: {
      marginTop: screenHeight * -0.06
    },
    fullSizeWindow: {
        width: screenWidth * 0.973,
        height: screenHeight * 0.83,
        marginTop: screenHeight * 0.0253829787234
    },
    fullSizeImage: {
        width: screenWidth * 0.973,
        height: screenHeight * 0.75,
        marginTop: screenHeight * 0.01163829787234,
        resizeMode: "center"
    },
    FSImageBackButton: {
        flex: 1,
        alignSelf: 'center',
        marginTop: screenHeight * 0.01163829787234,
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
    centerFSImageTitle: {
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 40,
    },
    centerViewDM: {
        marginTop: screenHeight * -0.045,
        width: "100%",
        alignContent: 'center',
        justifyContent: 'center',
    },
    centerView: {
        width: "100%",
        alignContent: 'center',
        justifyContent: 'center',
    },
    popUpEditButtons: {
        marginBottom: screenHeight * 0.015,
        alignSelf: 'center',
        width: '70%'
    },
    backButton: {
        position: 'absolute',
        left: screenWidth * 0.0075018754688672,
        top: screenHeight * 0.0066489361702128
    },
    exitButton: {
        position: 'absolute',
        right: screenWidth * -0.005,
        top: screenHeight * -0.014
    },
    exitButtonWeb: {
        marginRight: screenWidth * -0.001,
        marginTop: screenHeight * -0.023
    },
    horzRow: {
        height: "50%",
        flexDirection: 'row',
        width: "100%",
        alignContent: 'center',
        justifyContent: 'center',
    },
    popUpEditWindow: {
        width: "50%",
        alignSelf: 'center',
        marginTop: screenHeight * -0.07,
        height: "25%"
    },
    popUpDMEditWindow: {
        width: "50%",
        alignSelf: 'center',
        marginTop: screenHeight * -0.07,
        height: "46%"
    },
    popUpChangeDMEditWindow: {
        width: "50%",
        alignSelf: 'center',
        marginTop: screenHeight * -0.07,
        height: "42.3%"
    },
  space: {
    width: screenWidth * 0.0225056264066017,
    height: screenHeight * 0.0398936170212766,
  },
  popUpRaceButtons: {
    width: '25%',
    marginBottom: screenHeight * -0.0465425531914894,
  },
  charactersContainer: {
    flex: 2,
  },
  wrapper: {
    flexDirection: 'row',
      height: screenHeight * 0.89
  },
  popUpCreateRaceWindow: {
    width: '40%',
    height: screenHeight * 0.3058510638297872,
    alignItems: 'center',
    alignSelf: 'center',
  },
  popUpContent: {
    width: '100%',
    height: '30%',
  },

});
