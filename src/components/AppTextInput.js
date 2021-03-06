import React from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity, Dimensions} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import Colors from '../utils/colors';

global.screenWidth = Dimensions.get("window").width;
global.screenHeight = Dimensions.get("window").height;

export default function AppTextInput({
  leftIcon,
  width = '100%',
  rightIcon,
  handlePasswordVisibility,
  ...otherProps
}) {
  return (
    <View style={[styles.container, {width}]}>
      {leftIcon && (
        <MaterialCommunityIcons
          name={leftIcon}
          size={20}
          color={Colors.mediumGrey}
          style={styles.icon}
        />
      )}
      <TextInput
        style={styles.input}
        placeholderTextColor={Colors.mediumGrey}
        {...otherProps}
      />
      {rightIcon && (
        <TouchableOpacity onPress={handlePasswordVisibility}>
          <MaterialCommunityIcons
            name={rightIcon}
            size={20}
            color={Colors.mediumGrey}
            style={styles.rightIconStyles}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lightGrey,
    borderRadius: 25,
    flexDirection: 'row',
    marginVertical: screenHeight * 0.0132978723404255,
    paddingTop: screenHeight * 0.0199468085106383,
    paddingBottom: screenHeight * 0.0199468085106383,
    paddingLeft: screenWidth * 0.0112528132033008,
    paddingRight: screenWidth * 0.0112528132033008,
  },
  icon: {
    marginRight: screenWidth * 0.0075018754688672,
  },
  input: {
    color: Colors.black,
    fontSize: 18,
    width: '100%',
  },
  rightIconStyles: {
    alignSelf: 'center',
    position: 'absolute',
    right: screenWidth * 0.0225056264066017,
  },
});
