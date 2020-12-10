import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import NotifService from './NotifService';
// Register background handler
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  const notif = new NotifService();
  const {
    title,
    message,
    subText = '',
    bigText = '',
    sound = 'sample.mp4',
    vibrate,
  } = remoteMessage.data;
  notif.localNotif(sound, title, message, subText, bigText, vibrate);
});
AppRegistry.registerComponent(appName, () => App);
