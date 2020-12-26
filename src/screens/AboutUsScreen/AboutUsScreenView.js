import React from 'react';
import { StyleSheet, View } from 'react-native';

import {
  AppText,
  CallModal,
  Icon,
  ListItem,
  ListItemSeprator,
} from '../../components';
import colors from '../../constants/colors';

const AboutUsScreenView = ({
  onMailTo,
  details,
  onOpenWebsite,
  onAppShare,
  onCall,
  callModalVisible,
  setCallModalVisible,
}) => {
  const onOpen = () => {
    setCallModalVisible(true);
  };
  const onClose = () => {
    setCallModalVisible(false);
  };

  return (
    <>
      <View style={styles.container}>
        <ListItem
          onPress={onMailTo}
          title={details.name}
          subTitle={details.email}
          imgUrl={require('../../assets/images/icon.png')}
        />
      </View>
      <View style={styles.container}>
        <ListItem
          onPress={onOpen}
          title={'Make a call'}
          iconComponent={
            <Icon
              size={35}
              color={colors.light}
              name={'call-sharp'}
              bgColor={colors.secondry}
              from={'Ionicons'}
            />
          }
        />
        <ListItemSeprator />
        <ListItem
          onPress={onOpenWebsite}
          title={'Visit website'}
          iconComponent={
            <Icon
              size={35}
              color={colors.light}
              name={'web'}
              bgColor={colors.primary}
              from={'MaterialCommunityIcons'}
            />
          }
        />
        {details.appShareLink && (
          <>
            <ListItemSeprator />
            <ListItem
              onPress={onAppShare}
              title={'Share'}
              iconComponent={
                <Icon
                  size={35}
                  color={colors.light}
                  name={'share-variant'}
                  bgColor={colors.secondry2}
                  from={'MaterialCommunityIcons'}
                />
              }
            />
          </>
        )}
      </View>
      <View style={styles.aboutContainer}>
        <AppText style={styles.version}>V1.2.0</AppText>
        <AppText style={styles.developedBy}>
          Copyright © 2020. All rights reserved
        </AppText>
      </View>
      <CallModal
        visible={callModalVisible}
        numbers={details.phoneNumbers}
        onPress={onCall}
        onClose={onClose}
      />
    </>
  );
};

export default React.memo(AboutUsScreenView);

const styles = StyleSheet.create({
  aboutContainer: {
    width: '100%',
    alignItems: 'center',
  },

  container: {
    marginVertical: 20,
  },
  version: {
    fontSize: 14,
  },
  developedBy: {
    fontSize: 12,
    marginVertical: 5,
  },
});
