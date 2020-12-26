/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import AsyncStorage from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging';
import { NavigationContainer } from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { getUniqueId } from 'react-native-device-info';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import SplashScreen from 'react-native-splash-screen';

import NotifService from './NotifService';
import { registerDeviceToGetNotifications } from './src/helper/Api';
import AppNavigator from './src/navigation/AppNavigator';
import myTheme from './src/navigation/navigationTheme';
import { OnBoardingScreen } from './src/screens';
const Stack = createStackNavigator();
enableScreens();
const App = () => {
  const [isFirstLanuch, setIsFirstLaunch] = useState(null);
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
      // await AsyncStorage .removeItem('fcmToken');
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
          registerDevice(existedToken);
          console.log('push token not changed');
          return;
        } else {
          console.log('push token changed');
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
      notif.localNotif('sample.mp4', title, message, subText, bigText, vibrate);
    } catch (error) {}
  };

  useEffect(() => {
    regiterDeviceForNotiHandler();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(show);
    return unsubscribe;
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if (value) {
        setIsFirstLaunch(false);
      } else {
        AsyncStorage.setItem('alreadyLaunched', 'asdf');
        setIsFirstLaunch(true);
      }
    });
  }, []);

  // useEffect(() => SplashScreen.hide(), []);
  if (isFirstLanuch) {
    return (
      <SafeAreaProvider>
        <NavigationContainer theme={myTheme}>
          <Stack.Navigator>
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="onBoardingScreen"
              component={OnBoardingScreen}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="MainApp"
              component={AppNavigator}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  } else {
    return (
      <SafeAreaProvider>
        <NavigationContainer theme={myTheme}>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
};

export default App;
