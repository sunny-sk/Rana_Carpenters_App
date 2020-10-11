import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Alert,
  Vibration,
  PermissionsAndroid,
} from 'react-native';

import RNFetchBlob from 'rn-fetch-blob';
import Icon from './Icon';
import colors from '../constants/colors';
import {useNetInfo} from '@react-native-community/netinfo';
const WIDTH = Dimensions.get('screen').width;
const CarouselItem = ({imageUrl, ...props}) => {
  const [connection, setConnection] = useState(true);
  const netInfo = useNetInfo();
  const android = RNFetchBlob.android;
  const [isDownLoading, setIsDownLoading] = useState(false);
  const [imgError, setImageError] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const handleDownload = async () => {
    // if device is android you have to ensure you have permission
    let dirs = RNFetchBlob.fs.dirs;

    const imageName = imageUrl.split('/')[imageUrl.split('/').length - 1];
    setIsDownLoading(true);
    RNFetchBlob.config({
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mime: 'image/png',
        description: 'A product image',
        path: dirs.DownloadDir + '/carpenter/' + imageName,
      },
    })
      .fetch('GET', imageUrl)
      .then((res) => {
        setIsDownLoading(false);
        Vibration.vibrate(500);
        Alert.alert(
          'Product Design download successfully',
          'Press ok to view image',
          [
            {
              text: 'OK',
              onPress: () => {
                android.actionViewIntent(
                  dirs.DownloadDir + '/carpenter/' + imageName,
                  'image/png',
                );
              },
            },
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
          ],
          {cancelable: true},
        );
      })

      .catch((error) => {
        setIsDownLoading(false);
        Alert.alert(
          'Downloading error',
          'Failed to save Image: ' + error.message,
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
      });
  };

  useEffect(() => {
    setConnection(!connection);
  }, [netInfo]);
  const donwLoadImage = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (granted === 'granted') {
        handleDownload();
      } else {
        return false;
      }
    } catch (error) {}
  };

  const checkNet = () => {
    if (
      (netInfo.type === 'unknown' || netInfo.type !== 'unknown') &&
      netInfo.isInternetReachable === false
    ) {
      return null;
    }
    return (
      <View style={{}}>
        <TouchableOpacity
          style={styles.downLoadBtn}
          disabled={isDownLoading}
          onPress={donwLoadImage}>
          {isDownLoading ? (
            <ActivityIndicator size={'small'} color="#fff" />
          ) : (
            <Icon
              from="MaterialCommunityIcons"
              name="download-circle-outline"
              bgColor="transparent"
              color={colors.light}
              size={40}
            />
          )}
        </TouchableOpacity>
      </View>
    );
  };

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
            source={
              !imageUrl
                ? require('../assets/images/not-found.png')
                : {uri: imageUrl}
            }
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
            <Image
              resizeMode="cover"
              style={styles.image}
              source={{uri: imageUrl}}
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
            {checkNet()}
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
