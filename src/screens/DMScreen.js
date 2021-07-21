import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import CharacterCard from '../components/CharacterCard';
import Chat from '../components/Chat';
import CharacterTemplate from '../utils/character_template.json';
import Spinner from '../components/Spinner';
import firebase from 'firebase';
import 'firebase/firestore';
import ModalDropdown from "react-native-modal-dropdown";

export default function DMScreen({route, navigation}) {
  const {group} = route.params;

  const groupRef = firebase.firestore().collection('groups').doc(group._id);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

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

  var index = 0;
  return (
    <View style={styles.wrapper}>
      <View style={styles.charactersContainer}>
        <FlatList
          data={characters}
          keyExtractor={(item) => item._id}
          renderItem={({item}) => (
            <CharacterCard
              character={item}
              index={index++}
              groupRef={groupRef}
              onChange={updateCharacter}
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
  );
}

DMScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  charactersContainer: {
    flex: 2,
  },
  wrapper: {
    flexDirection: 'row',
    height: '100%',
  },
});
