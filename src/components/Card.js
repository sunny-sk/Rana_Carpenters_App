/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

import colors from '../constants/colors';
import AppText from './AppText';
const Card = ({ title, subTitle, imgUrl, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress} style={{ height: '100%' }}>
      <View style={{ ...styles.card, width: '98%', height: 230 }}>
        <FastImage
          style={{ ...styles.image }}
          source={{
            uri: imgUrl,
            priority: FastImage.priority.high,
          }}
        />
        <View style={styles.detailsContainer}>
          <LinearGradient
            style={{
              flex: 1,
              paddingVertical: 10,
              paddingHorizontal: 10,
              justifyContent: 'flex-end',
            }}
            colors={[
              'rgba(0,0,0,0.0)',
              'rgba(0,0,0,0.0)',
              'rgba(0,0,0,0.0)',
              'rgba(0,0,0,0.1)',
              'rgba(0,0,0,0.2)',
              'rgba(0,0,0,0.3)',
              'rgba(0,0,0,0.4)',
              'rgba(0,0,0,0.6)',
              'rgba(0,0,0,0.8)',
              '#000000',
            ]}>
            <AppText style={styles.title}>{title}</AppText>
            {/* <AppText style={styles.date}>{formatDate(item.createdAt)}</AppText> */}
            <AppText style={styles.subTitle}>{subTitle}</AppText>
          </LinearGradient>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default React.memo(Card);

const styles = StyleSheet.create({
  card: {
    marginLeft: '1%',
    overflow: 'hidden',
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    shadowOffset: {
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 2,
  },
  detailsContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    // backgroundColor: 'rgba(1,0,0,0.5)',
    height: '80%',
    justifyContent: 'flex-end',
  },
  date: {
    fontSize: 12,
    marginVertical: 4,
    color: '#2B3252',
    fontWeight: '700',
  },
  image: {
    width: '100%',
    height: 230,
  },
  title: {
    fontWeight: 'bold',
    color: colors.white,
  },
  subTitle: {
    color: colors.light,
    opacity: 0.8,
    fontSize: 12,
  },
});
