import React, {useState, useEffect, useContext} from 'react';
import {Dimensions, FlatList, Image, ScrollView, StyleSheet, View} from 'react-native';
import {Button, Dialog, IconButton, Portal, Provider, TextInput, Title} from 'react-native-paper';
import CharacterCard from '../components/CharacterCard';
import Chat from '../components/Chat';
import CharacterTemplate from '../utils/character_template.json';
import Spinner from '../components/Spinner';
import firebase from 'firebase';
import 'firebase/firestore';
import {AuthUserContext} from "../navigation/AuthUserProvider";
import { KeyboardAvoidingView } from 'react-native';
import {useFocusEffect} from "@react-navigation/native";

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
  const [items, setItems] = useState(null);
  // const showRaceDialog = () => setRaceVisible(true);
  // const hideRaceDialog = () => setRaceVisible(false);
  // const [raceVisible, setRaceVisible] = useState(false);
    const showImageDialog = () => setImageVisible(true);
    const hideImageDialog = () => setImageVisible(false);
    const [imageVisible, setImageVisible] = useState(false);
    const [imageToShow, setImageToShow] = useState("");
    const [nameToShow, setNameToShow] = useState("");
  const [newRaceName, setNewRaceName] = useState('');
  const [createRaceIndex, setCreateRaceIndex] = useState('');
  const {user} = useContext(AuthUserContext);
  const [isDM, setIsDM] = useState(false);
    const [chatImage, setChatImage] = useState(false);
  global.showSettingsDialog = () => {showDialog()};

  useEffect(() => {
      groupRef.onSnapshot((snapshot) => {
          const itemsTemp = [];
          snapshot.get('members').forEach((mem) => {
              if (mem !== user.toJSON().email) {
                  itemsTemp.push({
                      value: mem, label: mem
                  })
                  setItems(itemsTemp);
              }
          })
      })
    groupRef.collection('members').doc(user.toJSON().email).onSnapshot((ss) => {
      setIsDM(ss.get('isDM'));
      setChatImage(ss.get('chatImage'))
      if (ss.get('isDM')) {
        const characterListener = groupRef.collection('characters').onSnapshot(
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
        return characterListener;
      }
      else {
        const characterListener = groupRef.collection('characters').onSnapshot(
            (querySnapshot) => {
              const characters = querySnapshot.docs.map((doc) => {
                if (doc.get('assignedTo') === user.toJSON().email) {
                  const data = {
                    _id: doc.id,
                    ...doc.data(),
                  };
                  return data;
                }
              });
              setCharacters(characters.filter(function( element ) {
                return element !== undefined;
              }));

              if (loading) {
                setLoading(false);
              }
            },
            (error) => {
              alert(error);
            }
        );
        return characterListener;
      }
    })


    //DM View - old code (works if firestore structure characters are separated by being put in different collections rather than using assignedTo field
    // groupRef.get().then((snapshot) => {
    //   setMembers(snapshot.get('members'))
    // })
    // let chars = [];
    // groupRef.collection('members').onSnapshot((snapshot) => {
    //     snapshot.forEach((doc) => {
    //       groupRef.collection('members').doc(doc.id).collection('characters').onSnapshot((doc) => {
    //         const charactersTemp = doc.docs.map((doc) => {
    //           const data = {
    //             _id: doc.id,
    //             ...doc.data(),
    //           };
    //           chars.push(data)
    //           return data;
    //         });
    //         setCharacters(chars)
    //       })
    //     })
    //       if (loading) {
    //         setLoading(false);
    //       }
    //     },
    //     (error) => {
    //       alert(error);
    //     }
    // );

    // DM View - oldest code
    // const characterListener = groupRef.collection('characters').onSnapshot(
    //   (querySnapshot) => {
    //     const characters = querySnapshot.docs.map((doc) => {
    //       const data = {
    //         _id: doc.id,
    //         ...doc.data(),
    //       };
    //       return data;
    //     });
    //     setCharacters(characters);
    //
    //     if (loading) {
    //       setLoading(false);
    //     }
    //   },
    //   (error) => {
    //     alert(error);
    //   }
    // );
  }, []);

  if (loading) {
    return <Spinner />;
  }

  function addCharacter() {
    groupRef
        .collection('characters')
        .add(CharacterTemplate)
        .then((char) => {
          char.update({
            assignedTo: user.toJSON().email
          })
        })
        .then(console.log('Successfully added character'), (error) =>
            alert(error)
        );
  }

  function updateCharacter(index, field, text, isInt) {
    const newCharacters = [...characters];
    newCharacters[index][field] = isInt ? Number(text) : text;
    setCharacters(newCharacters);
  }

  function ButtonContainer() {
      if (isDM) {
          return (
              <View>
                  <Button
                      mode="contained"
                      style={styles.popUpEditButtons}
                      onPress={() => {
                          hideDialog();
                          navigation.navigate('ImageSelector', {
                              comingFrom: "DMScreen",
                              groupRef: groupRef,
                              chatImage: chatImage
                          })
                      }}
                  >
                      Change chat profile picture
                  </Button>
                  <Button
                      style={styles.popUpEditButtons}
                      mode={"contained"}
                      onPress={() => {
                          groupRef.collection('messages').get().then((snapshot) => {
                              snapshot.docs.forEach(doc => {
                                  doc.ref.delete();
                              })
                          }).then(() => {
                              hideDialog();
                          })
                      }}
                  >
                      Delete all messages
                  </Button>
              </View>
          )
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
                          chatImage: chatImage
                      })
                  }}
              >
                  Change chat profile picture
              </Button>
          )
      }
  }

  let index = 0;
  if (characters == null || characters.length === 0) {
    return (
        <View style={styles.wrapper}>
          <View style={styles.charactersContainer}>
            <View>
              <Button
                  mode="contained" onPress={addCharacter}>
                Add New Character
              </Button>
            </View>
          </View>
          <Chat groupRef={groupRef} />
        </View>
    );
  }
  else {
    return (
        <Provider>
          <KeyboardAvoidingView
              behavior = {'height'}>
            <View style={styles.wrapper}>
              <View style={styles.charactersContainer}>
                <ScrollView>
                  <FlatList
                      data={characters}
                      removeClippedSubviews={true}
                      keyExtractor={(item) => item._id}
                      renderItem={({ item }) => (
                          <CharacterCard
                              character={item}
                              index={index++}
                              groupRef={groupRef}
                              onChange={updateCharacter}
                              navigation={navigation}
                          />
                      )}
                      ListFooterComponent={
                        <View style = {styles.gap}>
                          <Button
                              mode="contained" onPress={addCharacter}>
                            Add New Character
                          </Button>
                        </View>
                      }
                  />
                  <Portal>
                    <Dialog
                        visible={visible}
                        onDismiss={hideDialog}
                        style={isDM ? styles.popUpDMEditWindow : styles.popUpEditWindow}
                    >
                        <View
                            style = {styles.horzRow}
                        >
                              <Dialog.Title style={styles.popUpTitle}>
                                Settings
                              </Dialog.Title>
                            <IconButton
                                icon="keyboard-backspace" //Getting the back icon image
                                size={36} //Setting the size
                                color="#6646ee" //And the color
                                style = {styles.backButton}
                                onPress={() => {
                                    hideDialog()
                                }}
                            />
                        </View>
                      <Dialog.Actions>
                          <View style = {isDM ? styles.centerViewDM : styles.centerView}>
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
                                <IconButton
                                    icon="keyboard-backspace" //Getting the back icon image
                                    size={38} //Setting the size
                                    color="#6646ee" //And the color
                                    style = {styles.FSImageBackButton}
                                    onPress={() => {
                                        hideImageDialog()
                                    }} //When clicked on make it go back to the previous route
                                />
                                <View style = {styles.centerFSImageTitle}>
                                    <Title
                                        style = {styles.helpTitle}
                                    >
                                        {nameToShow !== "" ? nameToShow : ""}
                                    </Title>
                                </View>
                            </View>
                            <Image
                                source={imageToShow !== "" ? {uri: imageToShow} : {uri: ""}}
                                style={styles.fullSizeImage}
                            />
                            <View/>
                        </Dialog>

                    </Portal>
                </ScrollView>
              </View>
              <Chat
                  navigation={navigation}
                  groupRef={groupRef}
                  itemsT={items}
                  showImage={(image, name) => {
                      setImageToShow(image);
                      setNameToShow(name);
                      showImageDialog();
                  }}
              />
            </View>
          </KeyboardAvoidingView>
        </Provider>
    );
  }
  //       <Provider>
  //         <Portal>
  //           <Dialog
  //               visible={raceVisible}
  //               onDismiss={hideRaceDialog}
  //               style={styles.popUpCreateRaceWindow}
  //           >
  //             <Dialog.Title style={styles.popUpTitle}>
  //               Create new race
  //             </Dialog.Title>
  //             <Dialog.Content style={styles.popUpContent}>
  //               <TextInput
  //                   placeholder="New race name"
  //                   clearButtonMode="while-editing"
  //                   onChangeText={(text) => setNewRaceName(text)}
  //               />
  //             </Dialog.Content>
  //             <Dialog.Actions>
  //               <Button
  //                   mode="contained"
  //                   style={styles.popUpRaceButtons}
  //                   disabled={newRaceName.length === 0}
  //                   onPress={() => {
  //                     firebase
  //                         .firestore()
  //                         .collection('members')
  //                         .doc(user.toJSON().email)
  //                         .update({
  //                           races: firebase.firestore.FieldValue.arrayUnion(newRaceName),
  //                           numCreatedRaces: firebase.firestore.FieldValue.increment(1)
  //                         })
  //                         .then(() => {
  //                           updateCharacter(createRaceIndex, 'char_race', newRaceName, false);
  //                           hideRaceDialog();
  //                         });
  //                     // });
  //                   }}
  //               >
  //                 Create
  //               </Button>
  //               <View style={styles.space} />
  //               <Button
  //                   mode="contained"
  //                   style={styles.popUpRaceButtons}
  //                   onPress={hideRaceDialog}
  //               >
  //                 Cancel
  //               </Button>
  //             </Dialog.Actions>
  //           </Dialog>
  //         </Portal>
  //       </Provider>
}

DMScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
    fullSizeWindow: {
        width: screenWidth * 0.973,
        height: screenHeight * 0.90,
        marginTop: screenHeight * 0.00133829787234
    },
    fullSizeImage: {
        width: screenWidth * 0.973,
        height: screenHeight * 0.80,
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
        width: '55%'
    },
    backButton: {
        position: 'absolute',
        left: 10,
        top: 5
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
        height: "33%"
    },
  gap: {
    height: screenHeight * 0.398936170212766
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
