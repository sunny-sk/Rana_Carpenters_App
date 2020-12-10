/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Pressable,
  View,
  StatusBar,
  Vibration,
  Alert,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import colors from '../constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';
import RNFetchBlob from 'rn-fetch-blob';
import {useNetInfo} from '@react-native-community/netinfo';
const dirs = RNFetchBlob.fs.dirs;
const ViewImageScreen = ({route, navigation}) => {
  const android = RNFetchBlob.android;
  const [isDownLoading, setIsDownLoading] = useState(false);
  const [connection, setConnection] = useState(true);
  const netInfo = useNetInfo();
  const [imgUrl, setImgUrl] = useState(route.params.imgUrl);
  useEffect(() => {
    const {imgUrl: _imgUrl} = route.params;
    setImgUrl(_imgUrl);
  }, [route.params]);

  const handleDownload = async () => {
    // if device is android you have to ensure you have permission

    const imageName = imgUrl.split('/')[imgUrl.split('/').length - 1];
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
      .fetch('GET', imgUrl)
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

  const downloadImageHandler = async () => {
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

  useEffect(() => {
    setConnection(!connection);
  }, [netInfo]);
  const checkNet = () => {
    if (
      (netInfo.type === 'unknown' || netInfo.type !== 'unknown') &&
      netInfo.isInternetReachable === false
    ) {
      return null;
    } else {
      if (isDownLoading) {
        return <ActivityIndicator size="small" color={colors.white} />;
      } else {
        return (
          <Pressable
            android_ripple={{color: 'white', borderless: true}}
            onPress={downloadImageHandler}
            disabled={isDownLoading}
            style={styles.closeIcon}>
            <MaterialCommunityIcons
              name="download-circle-outline"
              size={30}
              color={colors.white}
            />
          </Pressable>
        );
      }
    }
  };

  return (
    <>
      <StatusBar backgroundColor={colors.dark} barStyle="light-content" />
      {/* TODO: add image zoomer */}
      <View style={styles.container}>
        {imgUrl ? (
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            style={styles.image}
            source={{uri: imgUrl, priority: FastImage.priority.high}}
          />
        ) : (
          //TODO:// Show no image here
          <></>
        )}
      </View>
      <View
        style={{
          position: 'absolute',
          marginTop: 25,
          width: '100%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            paddingVertical: 30,
          }}>
          <Pressable
            android_ripple={{color: 'white', borderless: true}}
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.closeIcon}>
            <MaterialCommunityIcons
              name="close"
              size={30}
              color={colors.white}
            />
          </Pressable>
          {checkNet()}
        </View>
      </View>
    </>
  );
};

export default ViewImageScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    flex: 1,
  },
  closeIcon: {
    borderRadius: 50,
    padding: 5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
