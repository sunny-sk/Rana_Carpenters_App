import React from 'react';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';
const NotFound = () => {
  return (
    <View style={{flex: 1}}>
      <LottieView
        style={{transform: [{scale: 1 + 0.1}]}}
        autoPlay={true}
        loop={true}
        source={require('../animationFiles/not-found.json')}
      />
    </View>
  );
};

export default NotFound;
