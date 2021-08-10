import React from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity} from 'react-native';

import Colors from '../utils/colors';

global.screenWidth = Dimensions.get("window").width;
global.screenHeight = Dimensions.get("window").height;

export default function AppButton({title, onPress, color = 'primary'}) {
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: Colors[color]}]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 25,
    justifyContent: 'center',
    marginVertical: screenHeight * 0.0132978723404255,
    paddingTop: screenHeight * 0.0199468085106383,
    paddingBottom: screenHeight * 0.0199468085106383,
    paddingLeft: screenWidth * 0.0112528132033008,
    paddingRight: screenWidth * 0.0112528132033008,
    width: '100%',
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});
