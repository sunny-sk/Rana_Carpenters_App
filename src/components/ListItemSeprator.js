import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from '../constants/colors';
const ListItemSeprator = (props) => {
  return (
    <View style={{backgroundColor: colors.white}}>
      <View style={styles.seprator}></View>
    </View>
  );
};

export default ListItemSeprator;

const styles = StyleSheet.create({
  seprator: {
    width: '90%',
    marginLeft: '5%',
    height: 1,
    backgroundColor: colors.light,
  },
});
