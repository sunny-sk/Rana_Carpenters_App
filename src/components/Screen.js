import React from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const Screen = ({ children, style }) => {
  return (
    <SafeAreaView style={[styles.screen]}>
      <View style={[styles.view, style]}>{children}</View>
    </SafeAreaView>
  );
};

export default Screen;

const styles = StyleSheet.create({
  screen: {
    paddingTop: Platform.OS !== 'android' ? STATUSBAR_HEIGHT : 0,
    height: '100%',
    flex: 1,
  },
  view: {
    flex: 1,
  },
});
