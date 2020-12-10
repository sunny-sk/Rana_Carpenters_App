/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, StatusBar, Text, View} from 'react-native';
import colors from '../constants/colors';
import {useNetInfo} from '@react-native-community/netinfo';
const STATUS_BAR_HEIGHT = StatusBar.currentHeight;
const OfflineNotice = () => {
  const netInfo = useNetInfo();
  if (
    (netInfo.type === 'unknown' || netInfo.type !== 'unknown') &&
    netInfo.isInternetReachable === false
  ) {
    return (
      <>
        <StatusBar backgroundColor={colors.light} barStyle={'dark-content'} />
        <View style={styles.container}>
          <View style={styles.info}>
            <Text style={{fontSize: 18, color: '#fad744'}}>
              No Internet Connection
            </Text>
          </View>
        </View>
      </>
    );
  }
  return null;
};

export default OfflineNotice;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    height: STATUS_BAR_HEIGHT + 30,
    position: 'absolute',
    width: '100%',
    zIndex: 10,
  },
  info: {
    backgroundColor: colors.secondry2,
    height: STATUS_BAR_HEIGHT + 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
