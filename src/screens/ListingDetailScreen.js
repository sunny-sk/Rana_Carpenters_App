import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  Linking,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import Share from 'react-native-share';
import {AppText, Icon} from '../components';
import colors from '../constants/colors';
import Carousel from '../components/Carousel';
import url from '../helper/url';
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
      // Linking.openURL(
      //   `whatsapp://send?text=*Rana Carpenters*\n${detail.title}\n\nclick below to open design \n------------------------------------\n${detail.share_url}`,
      // );
      const fs = RNFetchBlob.fs;

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
            .then((res) => {
              fs.unlink(imagePath);
            })
            .catch((err) => {
              err && console.log(err);
            });
          return;
        });
    } catch (error) {}
  };

  return (
    <View style={{flex: 1}}>
      {detail && (
        <>
          <StatusBar
            // translucent
            animated={true}
            barStyle="light-content"
            backgroundColor={colors.dark}
          />
          <Carousel {...props} images={detail.more_images} />
          <ScrollView>
            <View key={Math.random().toString()} style={styles.detailContainer}>
              <AppText style={styles.title}>{detail.title}</AppText>
              <AppText style={styles.date}>{`${new Date(
                detail.createdAt,
              ).getDate()}/${new Date(detail.createdAt).getMonth()}/${new Date(
                detail.createdAt,
              ).getFullYear()}`}</AppText>
              <AppText style={styles.price}>{detail.description}</AppText>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: colors.light,
                  marginVertical: 3,
                }}></View>
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
});
