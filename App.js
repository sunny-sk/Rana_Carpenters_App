import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enableScreens} from 'react-native-screens';
import myTheme from './src/navigation/navigationTheme';
import AppNavigator from './src/navigation/AppNavigator';
import {getUniqueId} from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';
import NotifService from './src/pushNotification/NotifService';
import AsyncStorage from '@react-native-community/async-storage';
import {registerDeviceToGetNotifications} from './src/helper/Api';

enableScreens();
const App = () => {
  const notif = new NotifService();
  const registerDevice = async (token) => {
    try {
      let payload = {
        type: 'mobile',
        platformId: token.deviceId,
        pushToken: token.pushToken,
      };
      await registerDeviceToGetNotifications(payload);
    } catch (error) {}
  };

  const getToken = async () => {
    try {
      // await AsyncStorage.removeItem('fcmToken');
      let pushToken = await AsyncStorage.getItem('fcmToken');
      let newGeneratedToken = await messaging().getToken();
      let newPushToken = {
        deviceId: getUniqueId(),
        pushToken: newGeneratedToken,
      };

      if (pushToken) {
        // user has a device token
        let existedToken = JSON.parse(pushToken);
        if (JSON.stringify(newPushToken) === JSON.stringify(existedToken)) {
          console.log('push token not changed');
          return;
        } else {
          console.log('push token changed');
          registerDevice(newPushToken);
          await AsyncStorage.setItem('fcmToken', JSON.stringify(newPushToken));
        }
      } else {
        console.log('registering new push token');
        registerDevice(newPushToken);
        await AsyncStorage.setItem('fcmToken', JSON.stringify(newPushToken));
      }
    } catch (error) {}
  };

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      getToken();
    } else {
    }
  };

  const regiterDeviceForNotiHandler = async () => {
    try {
      requestUserPermission();
    } catch (error) {}
  };

  const show = async (remoteMessage) => {
    try {
      const {
        title,
        message,
        subText = '',
        bigText = '',
        sound,
        vibrate,
      } = remoteMessage.data;
      // console.log('show -> remoteMessage', remoteMessage);
      notif.localNotif('sample.mp4', title, message, subText, bigText, vibrate);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    regiterDeviceForNotiHandler();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(show);
    return unsubscribe;
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={myTheme}>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
