import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import ListItem from '../../components/ListItem';
import colors from '../../constants/colors';
import Icon from '../../components/Icon';
import ListItemSeprator from '../../components/ListItemSeprator';
import {AppText} from '../../components';
import CallModal from '../../components/CallModal';

const AboutUsScreenView = ({
  onMailTo,
  details,
  onOpenWebsite,
  onAppShare,
  onCall,
  callModalVisible,
  setCallModalVisible,
}) => {
  useEffect((params) => {
    console.log('[About View] screen loaded');
  }, []);
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
          onPress={() => {
            setCallModalVisible(true);
          }}
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
        <AppText style={styles.version}>V1.0.0</AppText>
        <AppText style={styles.developedBy}>
          Developed by Smarty Devolopers{' '}
        </AppText>
      </View>
      <CallModal
        visible={callModalVisible}
        numbers={details.phoneNumbers}
        onPress={onCall}
        onClose={() => setCallModalVisible(false)}
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
