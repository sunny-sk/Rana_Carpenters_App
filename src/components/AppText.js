import React from 'react';
import {Text, StyleSheet, Platform} from 'react-native';
import colors from '../constants/colors';

const AppText = ({children, style, ...otherProps}) => {
  return (
    <>
      <Text {...otherProps} style={{...styles.text, ...style}}>
        {children}
      </Text>
    </>
  );
};

export default AppText;

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    color: colors.dark,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
  },
});
