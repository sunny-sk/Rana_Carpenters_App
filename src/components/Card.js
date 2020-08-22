import React from 'react';
import {StyleSheet, View, Image, TouchableWithoutFeedback} from 'react-native';
import colors from '../constants/colors';
import AppText from './AppText';
const Card = ({title, subTitle, imgUrl, onPress, item}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Image style={styles.image} source={{uri: imgUrl}} />
        <View style={styles.detailsContainer}>
          <AppText style={styles.title}>{title}</AppText>
          <AppText style={styles.date}>{`${new Date(
            item.createdAt,
          ).getDate()}/${new Date(item.createdAt).getMonth()}/${new Date(
            item.createdAt,
          ).getFullYear()}`}</AppText>
          <AppText style={styles.subTitle}>{subTitle}</AppText>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
  },
  detailsContainer: {
    padding: 20,
  },
  date: {
    fontSize: 12,
    marginVertical: 4,
    color: '#2B3252',
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
    fontWeight: 'bold',
    color: colors.medium,
    fontSize: 15,
  },
});
