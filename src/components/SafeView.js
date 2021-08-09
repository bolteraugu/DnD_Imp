import React from 'react';
import {View, StyleSheet, SafeAreaView, Dimensions} from 'react-native';
import Constants from 'expo-constants';

global.screenWidth = Dimensions.get("window").width;
global.screenHeight = Dimensions.get("window").height;

export default function SafeView({children, style}) {
  return (
    <SafeAreaView style={[styles.safeAreaContainer, style]}>
      <View style={[styles.container, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeAreaContainer: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
});
