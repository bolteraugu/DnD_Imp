import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {Card, Paragraph, Button} from 'react-native-paper';

export default function NoteCard({title, content}) {
  return (
    <Card elevation={4} style={styles.card}>
      <Card.Title title={title} />
      <Card.Content>
        <Paragraph>{content}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button onPress={console.log('edit')}>Edit</Button>
        <Button onPress={console.log('delete')}>Delete</Button>
      </Card.Actions>
    </Card>
  );
}

global.screenWidth = Dimensions.get("window").width;
global.screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  card: {
    elevation: 4,
    flex: 1,
    margin: 5,
    padding: 20,
  },
});
