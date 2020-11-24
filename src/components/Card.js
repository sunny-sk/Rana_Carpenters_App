import React from 'react';
import {StyleSheet, View, Image, TouchableWithoutFeedback} from 'react-native';
import colors from '../constants/colors';
import {formatDate} from '../helper/HelperMethods';
import AppText from './AppText';
const Card = ({title, subTitle, imgUrl, onPress, item}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Image style={styles.image} source={{uri: imgUrl}} />
        <View style={styles.detailsContainer}>
          <AppText style={styles.title}>{title}</AppText>
          <AppText style={styles.date}>{formatDate(item.createdAt)}</AppText>
          <AppText style={styles.subTitle}>{subTitle}</AppText>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    width: '98%',
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
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  date: {
    fontSize: 12,
    marginVertical: 4,
    color: '#2B3252',
    fontWeight: '700',
  },
  image: {
    width: '100%',
    height: 200,
  },
  title: {
    fontWeight: 'bold',
    color: colors.secondry,
  },
  subTitle: {
    fontWeight: '600',
    color: colors.medium,
    fontSize: 12,
  },
});
