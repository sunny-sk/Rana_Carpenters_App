import React, {useState} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';

import Icon from './Icon';
import FastImage from 'react-native-fast-image';

import colors from '../constants/colors';
const WIDTH = Dimensions.get('screen').width;
const CarouselItem = ({imageUrl, ...props}) => {
  const [imgError, setImageError] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  return (
    <View style={styles.upperContainer}>
      <View style={styles.container}>
        <>
          <Image
            resizeMode="cover"
            style={{...styles.image, display: 'none'}}
            onLoad={() => {
              setIsImageLoading(true);
            }}
            onLoadEnd={() => {
              setIsImageLoading(false);
            }}
            onLoadStart={() => {
              setIsImageLoading(true);
            }}
            onError={(err) => {
              setIsImageLoading(false);
              setImageError(true);
            }}
            source={{uri: imageUrl}}
          />
          {isImageLoading ? (
            <>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator color="red" size="large" />
              </View>
            </>
          ) : imgError ? (
            <Image
              resizeMode="cover"
              style={styles.image}
              source={require('../assets/images/not-found.png')}
            />
          ) : (
            <FastImage
              style={styles.image}
              source={{uri: imageUrl, priority: FastImage.priority.normal}}
            />
          )}
        </>
        {!imgError && !isImageLoading && (
          <View style={styles.btns}>
            <View style={{marginVertical: 5}}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('viewImageScreen', {
                    imgUrl: imageUrl,
                  });
                }}>
                <Icon
                  from="MaterialCommunityIcons"
                  name="arrow-expand-all"
                  bgColor="rgba(0,0,0,0.6)"
                  color={colors.light}
                  size={40}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default CarouselItem;

const styles = StyleSheet.create({
  upperContainer: {
    height: 330,
  },
  container: {
    overflow: 'hidden',
    height: 300,
    width: WIDTH,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
    backgroundColor: 'white',
  },
  image: {
    height: '100%',
    width: '100%',
    flex: 1,
  },
  btns: {
    position: 'absolute',
    right: '5%',
    width: '90%',
    alignItems: 'flex-end',
    bottom: 10,
  },
  downLoadBtn: {
    height: 40,
    width: 40,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 20,
    justifyContent: 'center',
  },
});
