import React from 'react';
import {StyleSheet, Image, TouchableHighlight, View} from 'react-native';
import AppText from './AppText';
import colors from '../constants/colors';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Entypo from 'react-native-vector-icons/Entypo';
const ListItem = ({
  imgUrl,
  title,
  subTitle,
  iconComponent,
  onPress,
  style,
  renderRightAction,
}) => {
  return (
    <Swipeable renderRightActions={renderRightAction}>
      <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
        <View style={[styles.container, style]}>
          {iconComponent}
          {imgUrl && <Image style={styles.image} source={imgUrl} />}
          <View style={{...styles.detailsContainer}}>
            <AppText numberOfLines={1} style={styles.title}>
              {title}
            </AppText>
            {subTitle && (
              <AppText numberOfLines={2} style={styles.subTitle}>
                {subTitle}
              </AppText>
            )}
          </View>
          <Entypo name="chevron-small-right" color={colors.medium} size={25} />
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 35,
    backgroundColor: colors.white,
  },
  title: {
    fontWeight: '600',
    fontSize: 17,
  },
  subTitle: {
    color: colors.medium,
    fontSize: 15,
  },
  detailsContainer: {
    marginLeft: 10,
    flex: 1,
    justifyContent: 'center',
  },
});
