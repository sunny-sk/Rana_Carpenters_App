import React, {useState, useEffect} from 'react';
import {StyleSheet, Linking} from 'react-native';
import Screen from '../../components/Screen';
import colors from '../../constants/colors';
import {getAllDetails} from '../../helper/Api';
import AboutUsScreenView from './AboutUsScreenView';

const Index = () => {
  const [callModalVisible, setCallModalVisible] = useState(false);
  const [details, setDetails] = useState({
    email: 'desk.carpenter@gmail.com',
    name: 'Rana Carpenters',
    website: 'https://ranacarpenters.web.app/',
    phoneNumbers: [
      {
        phone: '9891521824',
        phoneOwner: 'Suresh Rana',
      },
      {
        phone: '9711427145',
        phoneOwner: 'Vijay Rana',
      },
    ],
    appShareLink: null,
  });
  const onCall = (number) => {
    Linking.openURL(`tel:${number}`);
  };
  const fetchAllDetails = async () => {
    try {
      const response = await getAllDetails();
      console.log('[About Index] detail fetched');
      if (response.success && response.details.length > 0) {
        const {details} = response;
        if (details.length > 0) {
          setDetails({
            email: details[0].email,
            name: details[0].name,
            phoneNumbers: details[0].phoneNumbers,
            website: details[0].website,
            appShareLink: details[0].appShareLink,
          });
        }
      }
    } catch (error) {}
  };

  const onMailTo = () => {
    Linking.openURL(`mailto:${details.email}`);
  };

  const openWebsite = () => {
    Linking.openURL(details.website);
  };

  const onAppShare = () => {
    Linking.openURL(
      `whatsapp://send?text=*Rana Carpenters*\nclick below to download our android application\n------------------------------------\n${details.appShareLink}`,
    );
  };

  useEffect(() => {
    fetchAllDetails();
  }, []);

  return (
    <Screen style={styles.screen}>
      <AboutUsScreenView
        onMailTo={onMailTo}
        details={details}
        onOpenWebsite={openWebsite}
        onCall={onCall}
        onAppShare={onAppShare}
        callModalVisible={callModalVisible}
        setCallModalVisible={(e) => setCallModalVisible(e)}
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
