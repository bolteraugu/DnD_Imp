import React, {useState, useEffect, useContext} from 'react';
import {Dimensions, FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {Button, Dialog, IconButton, Portal, Provider, TextInput} from 'react-native-paper';
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
  const [members, setMembers] = useState(true);
  const showRaceDialog = () => setRaceVisible(true);
  const hideRaceDialog = () => setRaceVisible(false);
  const [raceVisible, setRaceVisible] = useState(false);
  const [newRaceName, setNewRaceName] = useState('');
  const [createRaceIndex, setCreateRaceIndex] = useState('');
  const {user} = useContext(AuthUserContext);
  const [isDM, setIsDM] = useState(false);
    const [chatImage, setChatImage] = useState(false);
  global.showSettingsDialog = () => {showDialog()};

  useEffect(() => {
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
                        style={styles.popUpEditWindow}
                    >
                        <View
                            style = {styles.horzRow}
                        >
                          <IconButton
                              icon="keyboard-backspace" //Getting the back icon image
                              size={36} //Setting the size
                              color="#6646ee" //And the color
                              style = {styles.backButton}
                              onPress={() => {
                                hideDialog()
                              }}
                          />
                          <Dialog.Title style={styles.popUpTitle}>
                            Settings
                          </Dialog.Title>
                        </View>
                      <Dialog.Actions>
                          <View style = {styles.centerView}>
                        <Button
                            mode="contained"
                            style={styles.popUpEditButtons}
                            onPress={() => {
                                navigation.navigate('ImageSelector', {
                                  comingFrom: "DMScreen",
                                  groupRef: groupRef,
                                    chatImage: chatImage
                                })
                            }}
                        >
                          Change chat profile picture
                        </Button>
                          </View>
                      </Dialog.Actions>
                    </Dialog>
                  </Portal>
                </ScrollView>
              </View>
              <Chat groupRef={groupRef} />
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
    popUpTitle: {
        marginLeft: screenWidth * 0.165,
        marginTop: screenHeight * 0.02
    },
    centerView: {
        width: "100%",
        alignContent: 'center',
        justifyContent: 'center'
    },
    popUpEditButtons: {
        marginBottom: screenHeight * 0.015,
        alignSelf: 'center',
        width: '55%',
    },
    backButton: {

    },
    horzRow: {
        flexDirection: 'row',
    },
    popUpEditWindow: {
        width: "50%",
        alignSelf: 'center',
        marginTop: screenHeight * -0.07,
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
    height: '100%',
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
