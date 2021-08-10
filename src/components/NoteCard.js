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
      marginBottom: screenHeight * 0.0066489361702128,
      marginTop: screenHeight * 0.0066489361702128,
      marginLeft: screenWidth * 0.0037509377344336,
      marginRight: screenWidth * 0.0037509377344336,
    paddingTop: screenHeight * 0.0265957446808512,
      paddingBottom: screenHeight * 0.0265957446808512,
      paddingRight: screenWidth * 0.0150037509377344,
      paddingLeft: screenWidth * 0.0150037509377344,
  },
});
