import React, {useState, useEffect, useContext} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Button, Dialog, Portal, Provider, TextInput} from 'react-native-paper';
import CharacterCard from '../components/CharacterCard';
import Chat from '../components/Chat';
import CharacterTemplate from '../utils/character_template.json';
import Spinner from '../components/Spinner';
import firebase from 'firebase';
import 'firebase/firestore';
import ModalDropdown from "react-native-modal-dropdown";
import {AuthUserContext} from "../navigation/AuthUserProvider";

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
  }, [groupRef, loading]);

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
    const newCharacters = [...characters];
    newCharacters[index][field] = isInt ? Number(text) : text;
    setCharacters(newCharacters);
  }

  let index = 0;
  return (
      <View>
    <View style={styles.wrapper}>
      <View style={styles.charactersContainer}>
        <FlatList
          data={characters}
          keyExtractor={(item) => item._id}
          renderItem={({item}) => (
            <CharacterCard
              character={item}
              characterIndex={index++}
              groupRef={groupRef}
              onChange={updateCharacter}
              onRacePopUp={(createRaceIndexVal) => {
                setCreateRaceIndex(createRaceIndexVal)
                showRaceDialog()
              }}
              navigation={navigation}
            />
          )}
          ListFooterComponent={
            <Button mode="contained" onPress={addCharacter}>
              Add New Character
            </Button>
          }
        />
      </View>
      <Chat groupRef={groupRef} />
    </View>
        <Provider>
          <Portal>
            <Dialog
                visible={raceVisible}
                onDismiss={hideRaceDialog}
                style={styles.popUpCreateRaceWindow}
            >
              <Dialog.Title style={styles.popUpTitle}>
                Create new race
              </Dialog.Title>
              <Dialog.Content style={styles.popUpContent}>
                <TextInput
                    placeholder="New race name"
                    clearButtonMode="while-editing"
                    onChangeText={(text) => setNewRaceName(text)}
                />
              </Dialog.Content>
              <Dialog.Actions>
                <Button
                    mode="contained"
                    style={styles.popUpRaceButtons}
                    disabled={newRaceName.length === 0}
                    onPress={() => {
                      firebase
                          .firestore()
                          .collection('members')
                          .doc(user.toJSON().email)
                          .update({
                            races: firebase.firestore.FieldValue.arrayUnion(newRaceName),
                            numCreatedRaces: firebase.firestore.FieldValue.increment(1)
                          })
                          .then(() => {
                            updateCharacter(createRaceIndex, 'char_race', newRaceName, false);
                            hideRaceDialog();
                          });
                      // });
                    }}
                >
                  Create
                </Button>
                <View style={styles.space} />
                <Button
                    mode="contained"
                    style={styles.popUpRaceButtons}
                    onPress={hideRaceDialog}
                >
                  Cancel
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </Provider>
      </View>
  );
}

DMScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  space: {
    width: 30,
    height: 30,
  },
  popUpRaceButtons: {
    width: '25%',
    marginBottom: -35,
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
    height: 230,
    alignItems: 'center',
    alignSelf: 'center',
  },
  popUpContent: {
    width: '100%',
    height: '30%',
  },

});
