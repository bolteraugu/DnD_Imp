import React from 'react';
import {ActivityIndicator, Dimensions, StyleSheet} from 'react-native';

import SafeView from './SafeView';
import Colors from '../utils/colors';

global.screenWidth = Dimensions.get("window").width;
global.screenHeight = Dimensions.get("window").height;

export default function Spinner() {
  return (
    <SafeView style={styles.container}>
      <ActivityIndicator size="large" color={Colors.secondary} />
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
