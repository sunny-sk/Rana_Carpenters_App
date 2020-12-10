/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  StatusBar,
  ToastAndroid,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import Share from 'react-native-share';
import {AppText, Icon, Carousel} from '../components';
import colors from '../constants/colors';
import url from '../helper/url';
import {formatDate} from '../helper/HelperMethods';
const fs = RNFetchBlob.fs;
const ListingDetailScreen = ({route, ...props}) => {
  const [detail, setDetails] = useState(undefined);
  useEffect(() => {
    const data = route.params;
    let index = -1;
    if (data.more_images.length === 0) {
      data.more_images.push({imgUrl: data.imgUrl, _id: data.imgUrl});
    } else {
      data.more_images.map((e, i) => {
        if (e.imgUrl === data.imgUrl) {
          index = i;
        }
      });
      if (index < 0) {
        data.more_images.push({imgUrl: data.imgUrl, _id: data.imgUrl});
      }
    }

    setDetails(data);
  }, [route.params]);

  const onShare = async () => {
    try {
      let imagePath = null;
      RNFetchBlob.config({
        fileCache: true,
      })
        .fetch('GET', url._inventoryBase + detail.imgUrl)
        // the image is now dowloaded to device's storage
        .then((resp) => {
          // the image path you can use it directly with Image component
          imagePath = resp.path();
          return resp.readFile('base64');
        })
        .then((base64Data) => {
          const shareOptions = {
            title: 'Share via whatsapp',
            message: `*Rana Carpenters*\n${detail.title}\n\nclick below to open design on browser \n------------------------------------\n${detail.share_url}`,
            url: `data:image/png;base64,${base64Data}`,
            social: Share.Social.WHATSAPP,
            filename: 'test', // only for base64 file in Android
          };
          Share.shareSingle(shareOptions)
            .then((_res) => {
              fs.unlink(imagePath);
            })
            .catch((err) => {
              err && console.log('wdf', err);
            });
          return;
        })
        .catch((_err) => {
          ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
        });
    } catch (error) {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={{flex: 1}}>
      {detail && (
        <>
          <StatusBar backgroundColor={colors.light} barStyle="dark-content" />
          <Carousel {...props} images={detail.more_images} />
          <ScrollView>
            <View key={'random_key'} style={styles.detailContainer}>
              <AppText style={styles.title}>{detail.title}</AppText>
              <AppText style={styles.date}>
                {formatDate(detail.createdAt)}
              </AppText>
              <AppText style={styles.price}>{detail.description}</AppText>
              <View style={styles.devider} />
              <View style={styles.shareContainer}>
                <AppText style={{paddingRight: 10, fontSize: 18}}>
                  share
                </AppText>
                <TouchableOpacity onPress={onShare}>
                  <Icon
                    from="FontAwesome"
                    name="whatsapp"
                    bgColor="#4FCE5D"
                    size={40}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default React.memo(ListingDetailScreen);

const styles = StyleSheet.create({
  detailContainer: {
    padding: 20,
  },
  date: {fontSize: 14, marginTop: 5, color: colors.medium},
  image: {
    width: '100%',
    height: 300,
  },
  userListContainer: {
    marginVertical: 30,
  },
  price: {
    color: colors.secondry,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  shareContainer: {
    flexDirection: 'row',

    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical: 5,
  },
  title: {
    fontSize: 19,

    fontWeight: '500',
  },
  devider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
    marginVertical: 3,
  },
});
