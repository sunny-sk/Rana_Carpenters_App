import React from 'react';
import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
const AppActivityIndicator = ({visible = false}) => {
  if (!visible) {
    return null;
  }
  return (
    <View style={styles.con}>
      <LottieView
        autoPlay={true}
        loop={true}
        duration={750}
        source={require('../animationFiles/spinnerNormal.json')}
      />
    </View>
  );
};

export default AppActivityIndicator;

const styles = StyleSheet.create({
  con: {flex: 1},
});
