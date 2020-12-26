import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Linking,
  RefreshControl,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import Share from 'react-native-share';

import { Screen } from '../../components';
import colors from '../../constants/colors';
import {
  EMAIL,
  LOGO_BASE_64,
  NAME,
  PHONE_NUMBERS,
  WEBSITE,
} from '../../constants/contants';
import { getAllDetails } from '../../helper/Api';
import AboutUsScreenView from './AboutUsScreenView';
const Index = () => {
  const [callModalVisible, setCallModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState({
    email: EMAIL,
    name: NAME,
    website: WEBSITE,
    phoneNumbers: PHONE_NUMBERS,
    appShareLink: null,
  });
  const onCall = (number) => Linking.openURL(`tel:${number}`);
  const onMailTo = () => Linking.openURL(`mailto:${details.email}`);
  const openWebsite = () => Linking.openURL(details.website);

  const fetchAllDetails = async (cb) => {
    try {
      const response = await getAllDetails();
      if (response.success && response.details.length > 0) {
        const { details: _details } = response;
        if (_details.length > 0) {
          setDetails({
            email: _details[0].email,
            name: _details[0].name,
            phoneNumbers: _details[0].phoneNumbers,
            website: _details[0].website,
            appShareLink: _details[0].appShareLink,
          });
        }
        cb();
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const onAppShare = () => {
    Share.open({
      message: `*Rana Carpenters*\n\nclick below to download our application\n------------------------------------\n${details.appShareLink}`,
      title: '',
      url: LOGO_BASE_64,
    })
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
    // Linking.openURL(
    //   `whatsapp://send?text=*Rana Carpenters*\n\nclick below to download our android application\n------------------------------------\n${details.appShareLink}`,
    // );
  };

  const onRefresh = () => {
    fetchAllDetails(() => {
      ToastAndroid.showWithGravity(
        'Details fetched successfully',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    });
  };

  useEffect(() => {
    fetchAllDetails(() => {});
  }, []);

  const keyExtractor = (list) => list + Math.random().toString();

  const renderItem = () => (
    <AboutUsScreenView
      onMailTo={onMailTo}
      details={details}
      onOpenWebsite={openWebsite}
      onCall={onCall}
      onAppShare={onAppShare}
      callModalVisible={callModalVisible}
      setCallModalVisible={setCallModalVisible}
    />
  );

  return (
    <Screen style={styles.screen}>
      <FlatList
        data={[1]}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
      />
    </Screen>
  );
};

export default Index;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
});
