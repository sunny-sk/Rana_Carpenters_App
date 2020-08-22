import React from 'react';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';
const AppActivityIndicator = ({visible = false}) => {
  if (!visible) return null;
  return (
    <View style={{flex: 1}}>
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
