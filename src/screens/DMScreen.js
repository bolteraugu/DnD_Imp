import React, {useState, useEffect, useContext} from 'react';
import {Dimensions, FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {Button, Dialog, Portal, Provider, TextInput} from 'react-native-paper';
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

  const groupRef = firebase.firestore().collection('groups').doc(group._id);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const showRaceDialog = () => setRaceVisible(true);
  const hideRaceDialog = () => setRaceVisible(false);
  const [raceVisible, setRaceVisible] = useState(false);
  const [newRaceName, setNewRaceName] = useState('');
  const [createRaceIndex, setCreateRaceIndex] = useState('');
  const {user} = useContext(AuthUserContext);

  useEffect(() => {
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
  }, []);

  if (loading) {
    return <Spinner />;
  }

  function addCharacter() {
    groupRef
      .collection('characters')
      .add(CharacterTemplate)
      .then(console.log('Successfully added character'), (error) =>
        alert(error)
      );
  }

  function updateCharacter(index, field, text, isInt) {
    console.log(field)
    const newCharacters = [...characters];
    newCharacters[index][field] = isInt ? Number(text) : text;
    setCharacters(newCharacters);
  }

  let index = 0;
  return (
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
            </ScrollView>
          </View>
          <Chat groupRef={groupRef} />
        </View>
      </KeyboardAvoidingView>
  );
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
